var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: 'bc5336851577a2cf1e01df99007fd2a538ef6298'
})


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


var server = app.listen(1320,"0.0.0.0", function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});
