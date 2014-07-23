
// Tools --------------------------------------------
var express         = require('express');
var app             = express();
var port            = process.env.PORT || 8080;
var mongoose        = require('mongoose');
var passport        = require('passport');
var flash           = require('connect-flash');

var morgan          = require('morgan');
var cookieparser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');

var configDB        = require('./config/database.js');

// Config ------------------------------------------

mongoose.connect(configDB.url);

// require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev'));         // log every request to the console
app.use(cookieparser());        // read cookies - needed for auth
app.use(bodyParser());          // get info from html forms

app.set('view engine', 'ejs');  // ejs for templating

// for passport
app.use(session({ secret: 'wat' })); // session secret
app.use(passport.initialize());
app.use(passport.session());        // persist login sessions
app.use(flash());                   // use connect-flash for flash messages stored in session

// Routes ------------------------------------------

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// Launch ------------------------------------------

app.listen(port);
console.log('Listen at port ' + port);

