var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: 'bc5336851577a2cf1e01df99007fd2a538ef6298'
})


var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));



app.get('/', function (request, res) {
		var parameters = {
			text: request.query.text
		};
		//alchemy call
		alchemy_language.sentiment(parameters, function (err, response) {
       if (err)
           console.log('error:', err);
       else
		   if(!("score" in response.docSentiment) && response.docSentiment.type == "neutral"){
			   res.end("0");
		   }else{
			   res.end(response.docSentiment.score);
		   }
    console.log(JSON.stringify(response, null, 2));
});
})


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);
