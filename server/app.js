var express = require("express");
var request = require("request");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next)
{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res, next) //returns the blogposts as JSON
{
  res.setHeader('Content-Type', 'application/json');
  request({
    uri: "https://jsonblob.com/api/jsonBlob/578bd07be4b0dc55a4e539a9",
    method: "GET",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }, function(error, response, body) {
    var json = JSON.parse(body);
    res.json(JSON.stringify(json.posts));
  });
});

app.post('/login', function (req, res, next)
{
  if(auth(req.param.user,req.param.pass)) res.send("success");
  else res.send("Wrong username or password");
});

app.post('/add', function (req, res, next) //edits and creates blogposts
{
  if(!auth(req.param.user,req.param.pass)) return;
  var json = "{\"posts\":[\"This blogpost is a test\",\"This is also a test\",\"TEST3\"]}"; //TODO: make this work: req.param.json;
  request({
    uri: "https://jsonblob.com/api/jsonBlob/578bd07be4b0dc55a4e539a9",
    method: "PUT",
    json: true,
    timeout: 10000,
    body: json,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    }, function(error, response, body) {
      res.send(error);
    });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Blog app listening on port 3000!');
});



function auth(user,pass) //checks if the user is logged in
{
  return true; //TODO: fix bug with params
  //return user=="test" && pass=="6655321";
}
