var express = require('express');
var router = express.Router();
var Converter=require("csvtojson").core.Converter;
var fs=require("fs");
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/SmartAPP');

/* GET home page. */
router.get('/', function(req, res) {
console.log("inside index js:");
sess=req.session;
console.log('username1:'+sess.username);
if(sess.username)
{
res.render('./index.html');
}
else{
res.render('./index.html');
//res.redirect('/app/view/home/LoginHome.js');
}

});






router.get('/uploadcsv', function(req, res) {
	

  res.render('uploadcsv', { title: 'Upload CSV3' });
  
});

router.post('/savecsv', function(req, res) {
	console.log("file path:"+req.files.myFile.path);
  console.log("file name:"+req.files.myFile.name);
 
    

  console.log("file type:"+req.files.myFile.type);  
  console.log("file date:"+req.files.myFile.lastModifiedDate);
  
/*	fs.readFile(req.files.myFile.path, function (err, data) {
	console.log("file data:"+data); 
  // ...
  var csvFileName =  "./uploads1/uploadedFileName.csv";
  console.log(" new file path:"+csvFileName);
 fs.writeFile(csvFileName, data, function (err) {
    //res.redirect("back");
  });*/

var fileStream=fs.createReadStream(req.files.myFile.path);
//new converter instance
var csvConverter=new Converter({constructResult:true});
//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
	console.log("json string:"+JSON.stringify(jsonObj));
    //create collection
  /*db.collection(req.files.myFile.name, function(err, collection){
     if (err) throw err;
      console.log("Created testCollection");
      collection.insert(jsonObj);
      console.log(collection);
  });*/
db.get(req.files.myFile.name).insert(jsonObj);
db.get("CollectionList").insert({"Name":req.files.myFile.name,"Source":"CSV","Description":"Test Data","No Of Records":"40","Upload Date":""});
   console.log("myjson:"+jsonObj); //here is your result json object
   //console.result
});

//read from file
console.log("here:");
fileStream.pipe(csvConverter);

 




  res.render('savecsv', { title: 'Save CSV' });
});

module.exports = router;
