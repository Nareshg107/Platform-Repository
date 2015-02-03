var express = require('express');
var router = express.Router();
var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

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



module.exports = router;
