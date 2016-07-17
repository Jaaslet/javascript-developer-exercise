var express = require("express");
var request = require("request");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res, next) {
  request({
    uri: "https://jsonblob.com/api/jsonBlob/578bd07be4b0dc55a4e539a9",
    method: "GET",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }, function(error, response, body) {
    json=JSON.parse(body);
    res.send(json.posts);
  });
});

app.post('/login', function (req, res, next) {
    if(auth(req.param.user,req.param.pass)) res.send("success");
    else res.send(req.param.user);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});



function auth(user,pass) //make sure the user is logged in
{
  return user=="test" && pass=="6655321";
}
