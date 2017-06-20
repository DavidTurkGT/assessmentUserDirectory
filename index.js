const express = require("express");
const mustacheExpress = require("mustache-express");

const app = express();

const data = require("./data");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static("public"));

app.get("/",function(req, res){
  res.send("Please visit /directory");
});

app.get("/directory", function(req, res){
  res.render("index", data);
});

app.listen(3000,function(){
  console.log("App running on localhost:3000");
})
