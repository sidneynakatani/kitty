var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var _db;
var _collection;


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

app.get('/teste', function(req, res) {
  _collection.find({}, function(err, docs) {
    docs.each(function(err, doc) {
      if(doc) {
        res.write(JSON.stringify(doc) + "\n");
      }
      else {
        res.end();
      }
    });
  });
});

app.listen(port, function() {
     MongoClient.connect('mongodb://admin:zarman12@ds059205.mongolab.com:59205/ragdoll', function(err, db) {
          if(err) throw err;
	  _db = db;
	  _collection = db.collection("batch_document_insert_collection_safe");
	  console.log('Our app is running on http://localhost:' + port);
     })
});

