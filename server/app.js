var express = require("express");
var request = require("request");
var app = express();

app.get('/', function (req, res) {
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

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});



function auth(user,pass) //make sure the user is logged in
{
  return user=="test" && pass=="6655321";
}
