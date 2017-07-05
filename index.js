const express = require("express");
const mustacheExpress = require("mustache-express");

const app = express();

const data = require("./data");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static("public"));

//Setting up MongoDB
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});

app.get("/",function(req, res){
  res.redirect("/directory");
});

app.get("/directory", function(req, res){
  res.render("index", data);
});

app.listen(3000,function(){
  console.log("App running on localhost:3000");
})
