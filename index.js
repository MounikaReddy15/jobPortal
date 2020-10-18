const express =  require('express');

const cookieParser = require('cookie-parser');

// to run express funct
const app= express(); 

const port = process.env.PORT || 9000;

//require express layout
//for dynamic scripts and styles
const expressLayouts = require('express-ejs-layouts');

const db = require("./config/mongoose");

//used for session cookie
const session = require('express-session');

//for authentication
const passport = require('passport');

const passportLocal = require('./config/passport-local-strategy');



//to store session info into the db
const MongoStore = require('connect-mongo')(session);

// flash-message
const flash = require('connect-flash');

// require the flash  middleware
const customMware = require('./config/middleware');

// for defining assets
const path = require('path');

app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

//folder for static files
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and script from the subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//add a middleware which takes session cookie and encrypts it
//mongo store is used to store the session in the db
app.use(
  session({
  name: 'techHire',
  //TODO change the secret before deployment in production mode
  secret: 'lifeis',
  saveUninitialized: false,
  resave: false,
  cookie: {
      //in millisecs
      maxAge: (1000*60*100)
  },
  store: new MongoStore({
      mongooseConnection: db,
      autoRemove: "disabled"
  },
  // callback func if connection is not established
      function(err) {
          console.log(err || "connect-mongodb setup ok");
      }
  )
})
);

// tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());

//setup current user usage
app.use(passport.setAuthenticatedUser);

// tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());

//setup current user usage
app.use(passport.setAuthenticatedUser);

// setup to use flash
// we need to put if after session use coz it uses session cookies
app.use(flash());
// to use flash-middleware
app.use(customMware.setFlash);

//we need to tell the app to use the exported router
app.use('/', require('./routes'));

//to make the app listen
app.listen(port, function(err){
    if(err) {
      console.log(`Error in running the server: ${err}`);
    }
     console.log(`Server is running on port: ${port}`);
});