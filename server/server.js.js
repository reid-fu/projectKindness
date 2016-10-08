var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: 'bc5336851577a2cf1e01df99007fd2a538ef6298'
})


app.post('/user/1', function (request, res) {
	request.on('data', function(chunk) {
		var body = [];
		body.push(chunk);
		var parameters = {
			text: Buffer.concat(body).toString()
		}
		alchemy_language.sentiment(parameters, function (err, response) {
		if (err)
			console.log('error:', err);
		else
			res.a
			console.log(JSON.stringify(response, null, 2));
		});
		console.log("Request received " + JSON.stringify(parameters.text));
		
	});
   res.end("Access successful");
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

