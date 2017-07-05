const express = require("express");
const mustacheExpress = require("mustache-express");

const app = express();

let data = {};

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");
app.set('layout','layout');

app.use(express.static("public"));

const getAllData = (req, res, next) =>{
  //Setting up MongoDB
  var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

  // Connection URL
  var url = 'mongodb://localhost:27017/userDirectory';

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    getData(db, () => {
      db.close();
      next();
    });
  });

  var getData = function(db, callback) {
    let users = db.collection('users');
    users.find({}).toArray().then( (users) => {
      data = users;
      callback();
    })
  }
}

const getUnemployed = (req, res, next) => {
  //Setting up MongoDB
  var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

  // Connection URL
  var url = 'mongodb://localhost:27017/userDirectory';

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    getData(db, () => {
      db.close();
      next();
    });
  });

  var getData = function(db, callback) {
    console.log("Running getData...");
    let users = db.collection('users');
    let promise = users.find({job: null}).toArray().then( (users) => {
      data = users;
      console.log("Data stored");
      callback();
    })
  }
};

const getEmployed = (req, res, next) => {
  //Setting up MongoDB
  var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

  // Connection URL
  var url = 'mongodb://localhost:27017/userDirectory';

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    getData(db, () => {
      db.close();
      next();
    });
  });

  var getData = function(db, callback) {
    console.log("Running getData...");
    let users = db.collection('users');
    let promise = users.find({job: {$not: {$eq: null}} }).toArray().then( (users) => {
      data = users;
      console.log("Data stored");
      callback();
    })
  }
};


app.get("/", function(req, res){
  res.redirect("/directory");
  // console.log("Data: ", data);
  // res.send("Data received!");
});

app.get("/directory", getAllData, function(req, res){
  res.render("index", {title: "All users", users: data});
});

app.get("/directory/forhire", getUnemployed, (req, res) => {
  res.render("index", {title: "Available for Hire", users: data});
});

app.get("/directory/employed", getEmployed, (req, res) => {
  res.render("index", {title: "Employed", users: data});
});

app.get("/directory/:topic/:filter", (req, res) => {
  switch (req.params.topic) {
    case "country":
      title = "Users from " + req.params.filter;
      //Setting up MongoDB
      var MongoClient = require('mongodb').MongoClient
      , assert = require('assert');

      // Connection URL
      var url = 'mongodb://localhost:27017/userDirectory';

      // Use connect method to connect to the server
      MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        getData(db, () => {
          db.close();
          res.render("index",{title: title, users: data});
        });
      });

      var getData = function(db, callback) {
        console.log("Running getData...");
        let users = db.collection('users');
        let promise = users.find({"address.country": req.params.filter}).toArray().then( (users) => {
          data = users;
          console.log("Data stored");
          callback();
        })
      }
      break;
    case "skills":
      title = "Users with skill: " + req.params.filter;
      //Setting up MongoDB
      var MongoClient = require('mongodb').MongoClient
      , assert = require('assert');

      // Connection URL
      var url = 'mongodb://localhost:27017/userDirectory';

      // Use connect method to connect to the server
      MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        getData(db, () => {
          db.close();
          res.render("index",{title: title, users: data});
        });
      });

      var getData = function(db, callback) {
        console.log("Running getData...");
        let users = db.collection('users');
        let promise = users.find({"skills": req.params.filter}).toArray().then( (users) => {
          data = users;
          console.log("Data stored");
          callback();
        })
      }
      break;
    default:
      res.redirect("/directory");
      break;
  }
});

app.listen(3000,function(){
  console.log("App running on localhost:3000");
})
