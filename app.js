var express = require('express');
var session = require('express-session');
var cors = require('cors')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var multer = require('multer');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
app.engine('html', require('ejs').renderFile);
//app.use(cors());

var allowCrossDomain = function(req, res, next) {
    console.log("inside allowCrossDomain");
    //res.header('Content-Type','application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,X-HTTP-Method-Override, Authorization,Origin,Accept-Version,Accept,Api-Version');      
   
      next();
};

//app.use(allowCrossDomain);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'somesecrettokenhere',
    resave: false,
     expires : new Date(Date.now() + 3600000), //1 Hour
  saveUninitialized: false}
  ));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({
 
          dest: './uploads/'
 
}));
 app.use(function(req, res, next) {
    console.log("inside default:"+req.sessionID+":username"+req.session.username+"url:"+req.url);
    console.log("req headers::"+JSON.stringify(req.headers));
    //console.log("req cookies::"+JSON.stringify(req.cookies['connect.sid'])); 
    var cookieSIDStr= req.cookies['connect.sid'];
    if(cookieSIDStr!=null)
    var sessIdfromCookie= cookieSIDStr.substr(2, cookieSIDStr.indexOf('.')-2);   
    console.log('sessIdfromCookie::'+sessIdfromCookie); 
    
     
    //res.header('Content-Type','application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,X-HTTP-Method-Override, Authorization,Origin,Accept-Version,Accept,Api-Version');
    res.locals={'reqSessionId':req.sessionID};
   // next();
    //res.write({'reqSessionId':req.sessionID});
   
   if(req.url=='/users/login'||req.sessionID==sessIdfromCookie)
   {
    console.log('valid session:');
      next();
  }
  else
  {
    console.log('invalid session:');
    res.send({success:false,'msg':'Invalid Session'});
}
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log('inside dev error block:'+err.message);
        var errMsg = err.message;
        console.log('case sensitive search:'+errMsg.match(/Application Error/i))
        if(errMsg.match(/Error/i))
        {        
            console.log('inside if');
            res.send({success:false,'msg':err.message});
        }
        else
        {
            console.log('inside else');
             res.send({success:false,'msg':'Unknown Exception Occured'});
         }
        /*res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });*/
    });
}

// production error handler
function errorHandler(err, req, res, next) {
    console.log('inside error handler:');
res.status(500);
res.render('app_error', { error: err });
}
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log('inside prod error block:');
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
