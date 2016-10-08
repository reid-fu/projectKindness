var express = require('express');
var app = express();
var fs = require("fs");


app.get('/user/1', function (req, res) {
	console.log("Request received " + req);
	
	//send new request
   res.end("Access successful");
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})