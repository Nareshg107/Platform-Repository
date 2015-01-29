var express = require('express');
var router = express.Router();
var Converter=require("csvtojson").core.Converter;
var fs=require("fs");
var monk = require('monk');
var db = monk('localhost:27017/nodetest');
 var dateFormat = require('dateformat');
 var type = require('type-of-is');
 var mapreduce = require('mapred')();
 var random = require("node-random");
 var mongojs = require('mongojs');
var async = require("async");

var db1= mongojs('localhost:27017/nodetest',['tempDataViewList','temp_results']);

/* GET users listing. */
router.post('/saveCollection', function(req, res,next) {
	console.log("col name:"+req.param("collName"));
	var collection_name = req.param("collName");
	var collection_desc = req.param("collDesc");
  	console.log("file name12:"+req.files.myFile.name); 
  	try{
	var fileStream=fs.createReadStream(req.files.myFile.path);
	//new converter instance
	var csvConverter=new Converter({constructResult:true});
	//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){	
	try{
	console.log("p5:"+new Date());
	//jsonObj=null;
	var noOfRecs = jsonObj.length;
	console.log('noOfRecs'+noOfRecs);	
	if(noOfRecs==0)
		throw new Error('Application Error: File has no data to upload');
	//Identify dimensions and measures
	var xyAxis = getDimensionsandMeasures(jsonObj);
	var newDate = dateFormat();
	var user_id = req.session.userID;
	//duplicate check
    db1.collection('CollectionList').find({"collection_name":eval('/^'+collection_name+'/i')},{},function(err,docs){
    	console.log('inside dup check call back');
    	if(err) return next(err);
    	try{
			console.log('inside try::'+docs.length);
		    if(docs.length==0)
		 		{
		 			//insert collection
		 			  db.get("CollectionList").insert({"user_id":user_id,"collection_name":collection_name,"source":"CSV","description":collection_desc,
						"no_of_records":noOfRecs,"update_date":newDate,"status":"Processed",
						"xyAxis":xyAxis},function(err,doc){
						if(err) return next(err);		
						try{		
						console.log('Inside insert call back'+doc['_id']);
						//Add collection ID to all elements of the array
						var collection_id = doc['_id'];
						jsonObj.forEach(function(doc) {// #performance. Try avoiding the loop
							doc['collection_id']=collection_id;
						});
						console.log("loop done");
						db.get("CollectionData").insert(jsonObj,function(err)
			    		{
			    			if (err) return next(err);
			    			console.log("collection data inserted successfully:");
							res.send({success:true});
			    		});
						}
						catch(ex)
						{
							throw ex;
						}
							
						});
		 		}
		 		else
		 		{
		 			console.log('duplicate collection');
		 			//res.send({success:false,'msg':'Collection name already exists. Please enter a different name.'});
		 			throw new Error('Application Error: Collection name already exists. Please enter a different name');
		 		}
 	     }
 	catch(ex)
 	{
 		console.log('exception inside catch:'+ex.message); 
  		return next(ex);
 	}
    });
	//
}
catch(ex)
   {
   	console.log('exception inside catch:'+ex.message); 
   	 //ex.message="Application error"  ;	
   	 return next(ex);
   }

});	
fileStream.pipe(csvConverter);	
}
catch(ex)
{
  	console.log('exception inside catch:'+ex.message); 
  	return next(ex);
}

});
//delete collection
router.post('/deleteCollection', function(req, res,next) {
	console.log('inside delete:'+req.session.username);
	var collection_Id = req.param("coll_Id");
	//check for child dataviews
		db1.collection('DataViewList').find({'collecion_id':collection_Id}, function(err, doc){
		  if(err) return next(err);
			if(doc.length>0)
				throw new Error('Application Error: Cannot delete the collection. Dataviews exist on this collection');
			else
			{
				//var coll_Id = req.param("coll_Id");
		  	db.get("CollectionList").remove({_id: collection_Id}, function(err){
				if (err) return next(err);
				console.log('collection entry removed:');
				db1.collection("CollectionData").remove({'collection_id': mongojs.ObjectId(collection_Id)}, function(err){
					if (err) return next(err);
					console.log('delete success');

				});
				
			});
		res.send({success:true});
			}
});
});

//delete data view
router.post('/deleteDataView', function(req, res,next) {
var dataview_id = req.param("dataview_id");
  	db.get("DataViewList").remove({_id: dataview_id}, function(err){
		if (err) return next(err);		
	});
res.send({success:true});
	
});

router.get('/getCollectionList', function(req, res,next) {
	
	var user_id = req.session.userID;
	  db1.collection('CollectionList').find({"user_id":user_id},{"xyAxis":false},function(e,docs){
	  	 if(e)	return next(e);
    res.json(docs);
  })
});

router.get('/getDataViewList', function(req, res,next) {	
		var user_id = req.session.userID;
	   db1.collection('DataViewList').find({"user_id":user_id},{},function(e,docs){	  	
	  	 if(e) return next(e);	  
	  	 //set no of records
			async.each(docs,function(doc,callback)
				{
					try{
					var filterby = doc['filterby'];
				var coll_id = doc['collection_id'];
				console.log("filterby:"+filterby);
				var filterbyArr =filterby;// JSON.parse(filterby);
			     db1.collection("CollectionData").find({'collection_id':mongojs.ObjectId(coll_id)}, {'collection_id':false},function(err, docs){        
					      if(filterbyArr.length>0)
					      {
					      getFilterExpression(filterbyArr,function(err,filterExpression){
					      	if (err) return next(err);
					           console.log('filterExpression:'+filterExpression);
					           getfilteredData(docs,filterExpression,function(err,resultDataArr){
					           	if (err) return next(err);
						        doc['no_of_records']=resultDataArr.length;
					           });
						  	});
					     }
					     else
					     {
					     	doc['no_of_records']=docs.length;
					     }
					      callback();
					 });
			     }
						catch(ex)
						{
							return next(ex);
						}
				},function(err){
			   // console.log('inside async callback');
			    res.json(docs);
			  });
    
  });	

});



router.get('/getDimensionsAndMeasures', function(req, res,next) {
	var collection_id = req.param("collId");
	//collection_id="5489a42590f6b3740e6cd07c";
	var activity_type =req.param("activity_type");
	console.log("activity_type"+activity_type);
	//activity_type="modify";
	console.log('collection_i1:'+collection_id);
    db.get("CollectionList").findById(collection_id, function(err, doc){ 
    			if (err)  return next(err);
    	var jsonObj = doc["xyAxis"];
 			res.json(jsonObj);
	});

});

router.get('/visualizeData', function(req, res,next) {
	var coll_id = req.param("coll_id");
	var dimension = req.param("dimension");
	var measure = req.param("measure");
	var aggregation_type = req.param("aggregation_type");
	var resultDataArr =[];
	var filterby =[];
	 filterby=req.param("filterby");
	console.log("filterby:"+filterby);
    try{
	var filterbyArr = JSON.parse(filterby);
     	db1.collection("CollectionData").find({'collection_id':mongojs.ObjectId(coll_id)}, {'collection_id':false},function(err, docs){
     	  if (err) return next(err);
      try{	  
      var dataJsonArr = docs;
      if(filterbyArr.length>0)
      {
        getFilterExpression(filterbyArr,function(err,filterExpression){
      	if (err) return next(err);
      	try{
           console.log('filterExpression:'+filterExpression);
           getfilteredData(docs,filterExpression,function(err,resultDataArr){
           	if (err) return next(err);	  	
           	try{
     		db.get("tempDataViewList").insert(resultDataArr,function(err){//try javascript map reduce. write on ur own.
     		if (err) return next(err);
      		aggregateByMapReduce(dimension,measure,aggregation_type,function(err,docs){
      		if (err) return next(err);
     			res.json(docs);
		     });
		     });
     		}
           catch(ex)
				{
					return next(ex);
				}
           });
         }
           catch(ex)
				{
					return next(ex);
				}
	  	});
     }
     else
     {
     	 db.get("tempDataViewList").insert(docs,function(err){//try javascript map reduce. write on ur own.
     	 	if (err) {
	  			   console.log('error message:'+err.message);
	  			  return next(err);
	  			   }
      aggregateByMapReduce(dimension,measure,aggregation_type,function(err,docs){
      		if (err) {
	  			   console.log('error message:'+err.message);
	  			  return next(err);
	  			   }
     	console.log("docs1:::"+docs);
     	res.json(docs);
     });         
     });

     }
     }
     catch(ex)
		{
			throw ex;
		}
     });
	}
	catch(ex)
	{
		return next(ex);
	}
	
	
	
});

router.get('/getChartForDB', function(req, res,next) { 
	console.log("inside getChartForDB:");
	var dvID = req.param("dataview_id");
	console.log('dvID'+dvID);
	try{
	if(dvID!=null && dvID!=undefined&&dvID!='null' )
	{
	db.get("DataViewList").findById(dvID, function(err, doc){ 
	  	if (err) return next(err);
	  	try{
			              var dimension = doc['group_by'];
						  var measure = doc['measure'];
						  var aggregation_type = doc['aggregation_type'];
						  var coll_id = doc['collection_id'];
						  var filterby = doc['filterby'];
					      console.log("filterby:"+filterby);
						  var filterbyArr =filterby;// JSON.parse(filterby);
			     db1.collection("CollectionData").find({'collection_id':mongojs.ObjectId(coll_id)}, {'collection_id':false},function(err, docs){      
			     	if (err) return next(err);
			     try{
				      if(filterbyArr.length>0)
				      {
				      getFilterExpression(filterbyArr,function(err,filterExpression){
				      	if (err) return next(err);
				      	console.log('filterExpression:'+filterExpression);
				      	try{				        
					        getfilteredData(docs,filterExpression,function(err,resultDataArr){
					         if (err) return next(err); 
					         db.get("tempDataViewList").insert(resultDataArr,function(){//try javascript map reduce. write on ur own.
							         aggregateByMapReduce(dimension,measure,aggregation_type,function(err,docs){
									     	if (err) return next(err);
									     	res.json(docs);
									     });
							     });

					           });
				        }
					     catch(ex)
							{
								return next(ex);
							}
					  	});
				     }
				     else
				     {
				     	 db.get("tempDataViewList").insert(docs,function(){//try javascript map reduce. write on ur own.
				      aggregateByMapReduce(dimension,measure,aggregation_type,function(err,docs){
				     	if (err) return next(err);
				     	res.json(docs);
				     });         
				     });

				     }
			 	}
			     catch(ex)
					{
						return next(ex);
					}
			     });
			}
           catch(ex)
				{
					return next(ex);
				}
  });
}
else
{
	throw new Error('Application Error: Please select a data view');
}
}
catch(ex)
{
console.log('error message:'+ex.message);
	  			  return next(ex);
}
//
	
});


router.post('/saveDataViews', function(req, res) {	

	var dvName = req.param("dataViewName");
	var dvID = req.param("dataview_id");
	var coll_id = req.param("collId");	
	var filterby = req.param("filterby");
	var filterbyArr = JSON.parse(filterby);
	var dim = req.param("dimension");
	var measure = req.param("measure");
	var aggType = req.param("aggType");
	var chartType = req.param("chartType");	
	var dvDesc = req.param("dataViewDesc");  	
	var activity_type =req.param("activity_type");
	var user_id = req.session.userID;
	console.log('filterby:'+filterby+'activity_type:'+activity_type+"coll id:"+coll_id);
	try{
	var dataViewJson = {
	 	"collection_id" : coll_id,
 		"dataview_name" : dvName,
 		"filterby":filterbyArr,
 		"group_by":dim,
 		"measure":measure,
 		"aggregation_type":aggType,
 		"visualization_type":chartType,
 		"dataview_desc":dvDesc,
 		"update_date" : dateFormat,
 		"user_id":user_id
 		};
   if(activity_type=='create')
    {
    	//Duplicate check
    	db1.collection('DataViewList').find({"dataview_name":eval('/^'+dvName+'/i')},{},function(err,docs)
    	{
    		if (err) return next(err);
    	try{
    	if(docs.length==1)
    	{
    		console.log('duplicate data view:');
            res.send({success:false,'msg':'Data View Name already exists. Please enter a different Name'});
        }
    	else
 		 {
 		 db1.collection('CollectionList').findOne({_id:mongojs.ObjectId(coll_id)},{"collection_name":true},function(err,doc){
 		 	if (err) return next(err);
 		 	 dataViewJson["source"] = doc["collection_name"];
		    	db.get("DataViewList").insert(dataViewJson,function(err)
		    		{
		    			if (err) return next(err);
		    			console.log("insert success:");
						res.send({success:true});
		    		});
		    })
    	}
    }
    catch(ex)
		{
			return next(ex);
		}
    });
    }
    else
    {
    //Duplicate check
    	db1.collection('DataViewList').find({_id:{$ne:mongojs.ObjectId(dvID)},"dataview_name":eval('/^'+dvName+'/i')},{},function(err,docs){
    	if (err) return next(err);
    	if(docs.length==1)
    	{
    		console.log('duplicate data view:');
            res.send({success:false,'msg':'Data View Name already exists. Please enter a different Name'});
        }
    	else
 		 {
		db1.collection('DataViewList').update(
				{_id:mongojs.ObjectId(dvID)},
				dataViewJson,
				function (err) {
					if (err) return next(err);
					console.log("update success:");
					res.send({success:true});
			});
		}
	});
	
	}
}
catch(ex)
{
	return next(ex);
}

	});

router.get('/getDataViews', function(req, res,next) {
	var collection_id = req.param("collId");
	console.log('collection_id:'+collection_id);
	var activityType = req.param("activityType");
	var start =  req.param("start");
	var limit =  req.param("limit");
	if(start==null || start=='null')
		start=1;
	if(limit==null || limit=='null')
		limit=50;
	console.log("activityType:"+activityType);
	if(activityType=='create')
	{
 	db1.collection("CollectionData").find({'collection_id':mongojs.ObjectId(collection_id)}, {'collection_id':false},function(err, docs){
 	if(err) return next(err); 	
 	var resultJsonArr = addDataTypesJson(docs,start,limit);
 	console.log('resultJson length:'+resultJsonArr[1].length);
 	res.json(resultJsonArr); // to find size of a json object Object.keys(resultJson).length. not sure if it works in IE!		
	});
 }
 else
 {
 	var dataview_id = req.param("dataview_id");
 	console.log("dataview_id:"+dataview_id); 	
 	db1.collection('DataViewList').find({_id:mongojs.ObjectId(dataview_id)}, function(err, doc){ 
 		if(err) return next(err);
	var filterbyArr = doc["filterby"];
	if(filterbyArr==undefined || filterbyArr.length==0)
	{
		db1.collection("CollectionData").find({'collection_id':mongojs.ObjectId(collection_id)},{'collection_id':false}, function(err, docs){
	 	if(err) return next(err); 	
	 	var resultJsonArr = addDataTypesJson(docs,start,limit);
	 	res.json(resultJsonArr); // set doc[data], measures and dimensions in session		
		});		
	}
	else
	{
		getFilterExpression(filterbyArr,function(err,filterExpression){
			if (err) return next(err);
           console.log('filterExpression:'+filterExpression);
           db1.collection("CollectionData").find({'collection_id':mongojs.ObjectId(collection_id)},{'collection_id':false}, function(err, docs){
	 	if(err) return next(err); 	
           getfilteredData(docs,filterExpression,function(err,resultDataArr){
           	if (err) return next(err);
           	var resultJsonArr = addDataTypesJson(resultDataArr,start,limit);
			res.json(resultJsonArr); // set doc[data], measures and dimensions in session		
           });
       });
	      	
	  	});
	}
 	
	});
 }

});

/*router.get('/prepareModifyDataView', function(req, res) { // add filter
	var collection_id = req.param("collId");
	var dataview_id = req.param("dataview_id");
db.get("CollectionList").findById(collection_id, function(err, doc){ 
var filterbyArr = doc["dataViews"][dataview_id]["filterby"];
 getFilterExpression(filterbyArr,function(err,filterExpression){
 	if (err) return next(err);
           console.log('filterExpression:'+filterExpression);
           getfilteredData(doc["data"],filterExpression,function(err,resultDataArr){
           	if (err) return next(err);
			res.json(resultDataArr); // set doc[data], measures and dimensions in session		
           });
	      	
	  	});
 	
	});
	

});*/

function getfilteredData(dataArr,filterExpression,callback)
{
	console.log("inside getfilteredData:");
	try{
	var resultDataArr = dataArr.filter(function(item)
	      	{
	      		return eval(filterExpression);
	      	});
	callback(null,resultDataArr);
}
catch(ex)
{
  callback(ex,null);
}
}

function getDimensionsandMeasures(jsonObj)
{

	var firstElementJson = jsonObj[0];
	var dimArray =[];
	var measureArray = [];
	for(var attributename in firstElementJson){
    //console.log("attr type:"+type(firstElementJson[attributename]));
    //console.log("attr name:"+attributename+": "+firstElementJson[attributename]);    
    if(type(firstElementJson[attributename],Number))
    {
    	measureArray.push({"measure":attributename});
    	continue;

    }
    if(type(firstElementJson[attributename],String))
    {    	
    	dimArray.push({"dimension":attributename});
    }
    
}
var xyAxisJson = { 
             "dimensions":dimArray,
             "measures":measureArray
}

return xyAxisJson;
};

function addDataTypesJson(jsonObjArr,start,limit)
{
  console.log('start:'+start+':limit:'+limit+':jsonObjArr length:'+jsonObjArr.length);
	var firstElementJson = jsonObjArr[0];
	var dataTypeJson={};
	var resultJson={};
	for(var attributename in firstElementJson){
    //console.log("attr type:"+type(firstElementJson[attributename]));
    //console.log("attr name:"+attributename+": "+firstElementJson[attributename]);    
    if(type(firstElementJson[attributename],Number))
    {
    	dataTypeJson[attributename]="number";
    	continue;

    }
    if(type(firstElementJson[attributename],String))
    {    	
    	dataTypeJson[attributename]="string";
    	continue;
    }
    if(type(firstElementJson[attributename],Date))
    {    	
    	
    	dataTypeJson[attributename]="date";
    	
    	
    }
    
}
//resultArr.push({'total':jsonObjArr.length});
/*resultJson['total']=jsonObjArr.length;
resultJson['data']=[dataTypeJson,jsonObjArr.slice(start,limit)];*/
//resultArr.push(dataTypeJson);
//resultArr.push({'data':[dataTypeJson,jsonObjArr.slice(start-1,limit)]});
var resultArr=[];
resultArr=[dataTypeJson,jsonObjArr.slice(start,limit)];
console.log("end:");
return resultArr;

};


function aggregateByMapReduce(dimension,measure,aggType,callback){
try{
	console.log("inside aggregateByMapReduce:"+dimension+":"+measure+":"+aggType);	
	var reducer="";	
	var mapper = function () {		
	emit(this[key], this[value]);

};
 
 var mapperCount = function () {		
	emit(this[key], 1);

};
var reducerSum = function(dim, measure){		
 	return result = Array.sum(measure);
};
var reducerAvg = function(dim, measure){		
 	return result = Array.sum(measure)/measure.length;
};
var reducerCount = function(dim, count){		
 	return result = Array.sum(count);
};
var reducerMin = function(dim, values){		
 	var result = values[0];
 	values.forEach(function(value){	
         if(value<result)
         	result=value;
 	});
 	return result;
};
var reducerMax = function(dim, values){		
 	var result = values[0];
 	values.forEach(function(value){	
         if(value>result)
         	result=value;
 	});
 	return result;
};
	if(aggType=="Sum")
		reducer=reducerSum;
	if(aggType=="Avg")
		reducer=reducerAvg;
	if(aggType=="Min")
		reducer=reducerMin;
	if(aggType=="Max")
		reducer=reducerMax;
	if(aggType=="Count")
	{
		mapper = mapperCount;
		reducer=reducerCount;
	}

	console.log("reducer:"+reducer);

db1.tempDataViewList.mapReduce(
mapper,
reducer,
{
out : "temp_results",
scope:{key: dimension,value:measure} 
},
function()
{
	db1.temp_results.find(function (err, docs) {
if(err)
{
 callback(err,null);
 return;
}
console.log("temp results::"+JSON.stringify(docs));
db1.tempDataViewList.remove({});
	//res.json(docs);
	callback(null,docs);
});
	
}
);
}
catch(ex)
{
  callback(err,null);
}

}

router.post('/saveClientDetails', function(req, res,next) {
    	
	var activityType = req.body.activityType;
	var clientName = req.body.name;
	var client_id = req.body._id;
    console.log("activity type:"+activityType);
    console.log("client_id:"+client_id);
    var reqBodyJson = req.body;  
     
   /* var activityType = reqBodyJson['activityType'];
    console.log("activity type1:"+req.body.activityType*/  
   delete reqBodyJson['activityType'];
   delete reqBodyJson['_id'];
    console.log("client json1:"+JSON.stringify(req.body));
    console.log("client json2:"+JSON.stringify(reqBodyJson));
    if(activityType=='create')
    {
    	//Duplicate check
    	db1.collection('clientList').find({"name":eval('/^'+clientName+'/i')},{},function(err,docs){
    		if (err) return next(err);
    	if(docs.length==1)
    	{
    		console.log('duplicate client');
            res.send({success:false,'msg':'Client Name already exists. Please enter a different Name'});
        }
    	else
 		 {
    	db.get("clientList").insert(reqBodyJson,function(err)
    		{
    			if (err) return next(err);
    			console.log("insert success:");
				res.send({success:true});
    		}
    		);
    	}
	});
    }
    else
    {
    console.log("inside else");
    //Duplicate check
    	db1.collection('clientList').find({_id:{$ne:mongojs.ObjectId(client_id)},"name":eval('/^'+clientName+'/i')},{},function(err,docs){
    		if (err) return next(err);
    	if(docs.length==1)
    	{
    		console.log('duplicate client1');
            res.send({success:false,'msg':'Client Name already exists. Please enter a different Name'});
        }
    	else
 		 {
			db1.collection('clientList').update(
				{'_id':mongojs.ObjectId(client_id)},
				reqBodyJson,
				function (err) {
					if (err) return next(err);
					console.log("update success:");
					res.send({success:true});
			 });
	}
	});
	}
});

router.post('/saveUserDetails', function(req, res,next) {
	//console.log("user json:"+JSON.stringify(req.body));
	var activityType = req.body.activityType;
	var username = req.body.userId;
	var user_id = req.body._id;
	var client_id = '549d01d20f1f486415b0f165';//get this from session
    console.log("activity type:"+activityType);
    console.log("user_id:"+user_id);
    var reqBodyJson = req.body;   
   delete reqBodyJson['activityType'];
   delete reqBodyJson['_id'];
   reqBodyJson['client_id']=client_id;
   
   //return next(new Error('test error user'));
    if(activityType=='create')
    {
    	//Duplicate check
    	db1.collection('userList').find({"userId":eval('/^'+username+'/i')},{},function(err,docs){
    		if (err) return next(err);
    	if(docs.length==1)
    	{
    		console.log('duplicate user');
            res.send({success:false,'msg':'User Name already exists. Please enter a different Name'});
        }
    	else
 		 {
    	db.get("userList").insert(reqBodyJson,function(err)
    		{
    			if (err) return next(err);
    			console.log("insert success:");
				res.send({success:true});
    		}
    		);
    	}
    });
    }
    else
    {
    //Duplicate check
    	db1.collection('userList').find({_id:{$ne:mongojs.ObjectId(user_id)},"userId":eval('/^'+username+'/i')},{},function(err,docs){
    		if (err) return next(err);
    	if(docs.length==1)
    	{
    		console.log('duplicate user');
            res.send({success:false,'msg':'User Name already exists. Please enter a different Name'});
        }
    	else
 		 {
	db1.collection('userList').update(
				{_id:mongojs.ObjectId(user_id)},
				reqBodyJson,
				function (err) {
					if (err) return next(err);
					console.log("update success:");
					res.send({success:true});
			});
		}
	});
	
	}
});

router.get('/getClientList', function(req, res,next) {
	  db.get("clientList").find({},{},function(err,docs){
	  	if (err) return next(err);
    res.json(docs);
  })
});

router.get('/getUserList', function(req, res,next) {
	  db.get("userList").find({},{},function(err,docs){
	  	if (err) return next(err);
    res.json(docs);
  })
});
router.get('/getUserData', function(req, res,next) {
	var user_id = req.param("user_id");
	//user_id = '54916edbabd11f401003328c';
	console.log('user_id:'+user_id);
 	db.get("userList").findById(user_id, function(err, doc){
 		if (err) return next(err);
 	res.json(doc); 	
	});

});
router.get('/getClientData', function(req, res,next) {
	var client_id = req.param("client_id");
	//user_id = '54916edbabd11f401003328c';
	console.log('client_id2:'+client_id);
	db.get("clientList").findById(client_id, function(err, doc){
 		if (err) return next(err);
 	res.json(doc); 	
	});

});
//delete user
router.post('/deleteUser', function(req, res,next) {
	console.log('inside deleteuser:');
	var user_id = req.param("user_id");
  	db.get("userList").remove({_id: user_id}, function(err){
		if (err) return next(err);
		
	});
  });

	//delete client
router.post('/deleteClient', function(req, res,next) {
	console.log('inside delete client:');
	var client_id = req.param("client_id");
  	db.get("clientList").remove({_id: client_id}, function(err){
		if (err) return next(err);
		
	});
//db.get("CollectionList").insert({"collection_name":collection_name,"source":"CSV","description":collection_desc,"no_of_records":noOfRecs,"update_date":newDate,"data":jsonObj});
console.log("p6:"+new Date());
res.send({success:true});
});

 /*function getDVList(docs,callback){
 	
 	try {
 	var jsonArr=[];
 	var error;
 	docs.forEach(function(doc) {
 	var dvJsonObj = doc["dataViews"];
   // console.log("dvJsonObj::"+ dvJsonObj);
    for(var attributename in dvJsonObj){
    	console.log("attribute Name:"+attributename);
    	//get no of records
    	var innerJson = dvJsonObj[attributename];    	
 		var filterbyArr = innerJson["filterby"];
	if(filterbyArr==undefined || filterbyArr.length==0)
	{  		
        innerJson['no_of_records'] = doc["data"].length;
         jsonArr.push(innerJson);
	}
	else
	{
         getFilterExpression(filterbyArr,function(err,filterExpression){
         	if (err) return next(err);
           console.log('filterExpression1:'+filterExpression);
           getfilteredData(doc["data"],filterExpression,function(err,resultDataArr){   
           if (err) return next(err);        	
           	innerJson['no_of_records'] = resultDataArr.length;
         	jsonArr.push(innerJson);		
           });
	      	
	  	});
          
      }    	
   
		}
});
 	
	  	
	  	callback(null,jsonArr);
	  }
	  catch(ex)
	  {
        callback(ex,null);
	  }


	  };

	  function getDVAttributes(docs,dvID,callback){
	  	try{
		 	var dvAttrJson; 	 	
		 	for(var i=0;i<docs.length;i++) {
		 	var dvJsonObj = docs[i]["dataViews"];
		    console.log("dvJsonObj::"+ dvJsonObj);
		    if(dvJsonObj && dvJsonObj[dvID])
		    {
		    	dvAttrJson=dvJsonObj[dvID];
		    	break;
		    }    
		}
		callback(null,dvAttrJson);
        }
        catch(ex)
        {
        	callback(ex,null);
        }

	  };

	   function deleteDV(docs,dataview_id,callback){
	   	console.log("inside deleteDV"+dataview_id);
	   	try{
 		var dvJsonObj = docs[0]["dataViews"];
     	delete dvJsonObj[dataview_id];    
	  	callback(null,dvJsonObj);
	  }
	  catch(ex)
	  {
	  	callback(ex,null);
	  }
	  };*/

	  function getFilterJson(filterbyArr,callback)
	  {
	  	var filterJsonObj ={};
	  	filterbyArr.forEach(function(eachJsonObj){	 	
	 		var filterField = eachJsonObj["property"];
	 		var filterOperator = '$'+eachJsonObj["operator"];
	 		var filterValue = eachJsonObj["value"];
            filterJsonObj[filterField]={filterOperator:filterValue};
	 });
	  	callback(filterJsonObj);
	  }

	   function getFilterExpression(filterbyArr,callback)
	  {
	  	try{
	  	var expressionMap = {
	  		"gt":">",
	  		"gte":">=",
	  		 "lt": "<",
	  		 "lte": "<=",
	  		 "ne":"!=",
	  		 "eq":"=="

	  	}	
	  	var filterExpression ="";
	  	var count=1;
	  	filterbyArr.forEach(function(eachJsonObj){	 	
	 		var filterField = eachJsonObj["property"];
	 		var filterOperator = eachJsonObj["operator"];
	 		var filterValue = eachJsonObj["value"];
	 		var exp = "item['"+filterField+"']"+expressionMap[filterOperator]+filterValue;
	 		if(filterOperator=='like')
	 			exp="item['"+filterField+"'].match(/"+filterValue+".*/i)";
	 		if(count>1)
			filterExpression= filterExpression+' && '+exp;
			else
				filterExpression=exp;

			count++;

           
	 });
	  	callback(null,filterExpression);
	  }
	  catch(ex)
	  {
	  	console.log('inside getFilterExpression catch block'+ex.message);
	  	callback(ex,null);
	  }
	  };
	 router.get('/testUrl', function(req, res) 
	  {
	  	var newDate = dateFormat();
	  	 db.get("CollectionList").insert({"user_id":user_id,"collection_name":"mycoll12","source":"CSV","description":"test with 1m records",
				"no_of_records":921600,"update_date":newDate,"status":"Processed","data":jsonObj,
				"xyAxis":xyAxis},function(){
				res.send({success:true});
				});
	  	/*var collection_id=req.param("collection_id"); 
	  	var filterbyArr = [//{"operator":"gt","value":"1000","property":"salary"},
	  	{"operator":"like","value":"fr","property":"name"}
	  	];
     db1.collection('CollectionList').findOne({_id:mongojs.ObjectId(collection_id)},{"data":true,"_id":false},function(err,doc){	  
     // console.log("collname::"+JSON.stringify(doc)+":"+doc["data"]);  	
      var dataJsonArr = doc["data"];
      getFilterExpression(filterbyArr,function(filterExpression){
           console.log('filterExpression:'+filterExpression);
           var resultDataArr = dataJsonArr.filter(function(item)
	      	{
	      		console.log("item::"+JSON.stringify(item));
	      		console.log("item salary:"+item["Salary"]);	
	      		return eval(filterExpression);
	      	});
            console.log("result array:"+resultDataArr);
     res.send(resultDataArr);
	  	});


     }
     );*/
	  	/*var s = "hello world!";
		if (s.match("/hello.*")) {
		  res.send("success");
		}
		else
			res.send("failure1");*/

	  });

router.get('/appList', function(req, res,next) {	
	 db.get('app').find({'apptype':'Custom'},{},function(err,docs){
	 	if(err) return next(err);
		 console.log("app collection list :"+docs); 
		 res.json(docs);
	 });

});

router.get('/prepackagedAppList', function(req, res,next) {
	 db.get('app').find({'apptype':'Pre-packaged'},{},function(err,docs){
	 	if(err) return next(err);
		 console.log("app collection list :"+docs); 
		 res.json(docs);
	 });

});

router.post('/saveApp', function(req, res,next) {
    
	console.log("saving app : ");

	var activityType = req.body.activityType;
	var app_id = req.body._id;  
	var reqBodyJson = req.body;  

    delete reqBodyJson['activityType'];
    delete reqBodyJson['_id'];

   // console.log("client json1:"+JSON.stringify(req.body));
  
    if(activityType=='create') {
    	db.get("app").insert(reqBodyJson,function(err){
    		if(err) return next(err);
    			console.log("insert success:");
				res.send({success:true});
    	});
    } else {
		db1.collection("app").update(
				{'_id':mongojs.ObjectId(app_id)},
				reqBodyJson,
				function (err) {
					if(err) return next(err);
					console.log("update success:");
					res.send({success:true});
		});
	} 
});

router.get('/getAppData', function(req, res, next) {
	var app_id = req.param("app_id");
	//user_id = '54916edbabd11f401003328c';
	console.log('app_id:'+app_id);
 	db.get("app").findById(app_id, function(err, doc){
 		if(err) return next(err);
 		res.json(doc); 	
	});

});

router.post('/deleteApp', function(req, res, next) {
	console.log('inside delete  app ');
	var app_id = req.param("app_id");
  	db.get("app").remove({_id: app_id}, function(err){
  		if(err) return next(err);
		
	});
  });

router.post('/login',function(req,res,next){
  console.log('inside login');
  var reqBodyJson = req.body;  
  var username = req.body.userName;
  var pwd = req.body.pwd;
  var clientLogin = req.param('clientloginId');
  var clientpwd = req.param('password');

console.log('username:'+username);
console.log('pwd:'+pwd);
//Authenticate
db1.collection('userList').find({"userId":username,"password":pwd},{},function(err,docs){
if(err) return next(err);	  
	console.log('user docs:'+docs.length);
 if(docs.length==1)
 {
 	var sid = req.sessionID;
 	var clientId = docs[0]['client_id'];
 	var userID =  docs[0]['_id'];
 	console.log("inside login userID:"+userID);
 	//var timeout = sess['expires'];
 	console.log("sess::"+req.sessionID+"client id:"+clientId);
	req.session.username=username;
	req.session.userID=userID;
	db1.collection('clientList').findOne({_id:mongojs.ObjectId(clientId)},{},function(err,clientDoc){	
    res.send({success:true,'sessionID':sid,'clientName':clientDoc['name']});	
	});
 }//
 else
 {
 	console.log("login failed");
    res.send({success:false,'msg':"Invalid user name or password"});
 }
});

});

router.get('/logout',function(req,res,next){
console.log('inside logout:'+req.session.username);
req.session.destroy(function(err){
	if(err) return next(err);
	console.log('logout error:'+err+":"+req.sessionID);
res.send({success:true});
});

});

/*function duplicateDVCheck(dvName,dvID,callback)
{
	console.log('duplicate check');
	db1.collection('CollectionList').find({},{"dataViews":true,"data":true,"_id":false},function(e,docs){	
	if(e)	  
	  	return next(e);  	
	  	var isDuplicate = 'N';
	  		getDVList(docs,function(err,results){
	  			if (err) {
	  			   console.log('error message:'+err.message);
	  			  return next(err);
	  			   }
              
              for(var i=0;i<results.length;i++)
              {
                   if(dvName.toUpperCase()==results[i]['dataview_name'].toUpperCase() && dvID!=results[i]['dataview_id'])
                   {
                   	isDuplicate='Y';
                   	break;
                   }
              }
	  		});
	  		console.log('isDuplicate:'+isDuplicate);
	  		callback(isDuplicate);
	  	
   
  });
}*/

router.get('/dashboardList', function(req, res,next) {
	 db.get('DashboardList').find({},{},function(err,docs){
	 	if(err) return next(err);
		 console.log("dashboard list :"+docs); 
		 res.json(docs);
	 });

});

router.post('/saveDashboard', function(req, res,next) {
    
	console.log("saving dashboard : ");
	var activityType = req.param("activityType");		  
  
    if(activityType=='create') {

		var reqBodyJson = req.body;
		console.log("dashboard json1:"+JSON.stringify(req.body));
    	db.get("DashboardList").insert(reqBodyJson,function(err){
    		if(err) return next(err);
    			console.log("insert success:");
				res.send({success:true});
    	});
    } else {

		var dashboard_id = req.param("dashboard_id");	
		var dashboardconfig = req.param("dashboardconfig");

		console.log("dashboardconfig"+dashboardconfig);

		db1.collection('DashboardList').update(
			{_id:mongojs.ObjectId(dashboard_id)},
			{ $set: { dashboardconfig : dashboardconfig}},
			function (err) {
				if(err) return next(err);
				console.log("update success1:");
				res.send({success:true});
		});
	} 
});

router.get('/getDashboardData', function(req, res,next) {
	var dashboard_id = req.param("dashboard_id");
	console.log('dashboard_id:'+dashboard_id);
 	db.get("DashboardList").findById(dashboard_id, function(err, doc){
 		if(err) return next(err);
 		res.json(doc); 	
	});

});

router.get('/getDashboardByName', function(req, res) {
	var dashboard_name = req.param("name");
	console.log('dashboard_name:--'+dashboard_name);
	db.get("DashboardList").find({name: dashboard_name}, function(err, doc){
		res.json(doc); 			
	});
});


router.post('/deleteDashboard', function(req, res) {
	console.log('inside delete  dashboard1:-- ');
	var dashboard_id = req.param("dashboard_id");
  	db.get("DashboardList").remove({_id: dashboard_id}, function(err){
  		if(err) return next(err);
        res.send({success:true});		
	});
  });

router.get('/getDataViewFilter', function(req, res,next) {
	var dataview_id = req.param("dataview_id");
	var collection_id = req.param("collection_id");

 	db.get("DataViewList").findById(dataview_id, function(err, doc){ 
 		if(err) return next(err);
		var filterbyArr = doc["filterby"];
		console.log(filterbyArr);
		res.json(filterbyArr);  
	});
});

router.get('/getDashboardByApp', function(req, res,next) {
	var app_id = req.param("app_id");
	db1.collection('app').findOne({_id:mongojs.ObjectId(app_id)},{"selecteddashboards":true,"_id":false},function(err,doc){
   		if(err) return next(err);
   		var insightLisrStr = doc['selecteddashboards'];
   		var insightListArr = insightLisrStr.split(',');
   		var resultJson = {};
   			insightListArr.forEach(function(insight){	
           resultJson[insight]=insight;
 	});
 		res.json(resultJson); 	
	});
});



module.exports = router;
