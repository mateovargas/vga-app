// Pull in required dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

var port = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the 'public' directory
app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//var db = require('./models');

// Set Handlebars as the view engine
var exphbs = require('express-handlebars');

//var allowCrossDomain = function (req, res, next) {
 //   res.header('Access-Control-Allow-Origin', "*");
   // res.header('Access-Control-Allow-Methods', 'GET');
    //res.header('Access-Control-Allow-Headers', 'Content-Type');
    //next();
//}


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// Import routes and give the server access to them
var routes = require('./controllers/appController.js');

app.use(routes);

app.use(cors());
//app.use(allowCrossDomain);

//db.sequelize.sync().then(function () {
    app.listen(port, function () {
        console.log('App listening on port: ' + port);
    });
//});