var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');

var credentials = {
    key: privateKey,
    cert: certificate
};

var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
    api_key: 'bc5336851577a2cf1e01df99007fd2a538ef6298'
})


var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

//database stuff.
var mysql = require("mysql");
var con = mysql.createConnection({
    host: 'ngramcache.crdautjivo8k.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: "viralpanda",
    password: "viralIsCool",
    database: "cache0"
});


con.connect(function(err) {
    if (err) {
        console.log('Error connecting to Db' + err);
        throw err;
    }
    console.log('Connection established');
});

//db constants
var getQueryPrefix = "SELECT * FROM ngramsentiment WHERE ngram=";

var countPhra = require('./countPhrases2');

var lock = false;
app.get('/', function(request, res) {
    var arr = countPhra.count(request.query.text);
    console.log(arr);
    var func = function(callback) {
	var count = 0, average = 0;
        for (var i = 0; i < arr.length; i++) {
            console.log("Inside for loop, iteration " + i);
            var fun = function(index, callBack) {
		console.log("Inside fun, index %s", index);
                var ret = 0;
                var input = getQueryPrefix + con.escape(arr[index]);
                con.query(input, function(err, rows) {
                    if (err) throw err;
                    console.log(rows);
                    if (rows.length == 0) {
                        var parameters = {
                            text: "" + arr[index]
                        };
                        //alchemy call
                        alchemy_language.sentiment(parameters, function(err, response) {
                            if (err) {
                                console.log('error:', err);
                            } else {
				console.log("executing if");
                                var insertStmt = "insert into ngramsentiment values(" + con.escape(parameters.text) + ",";
                                if (!("score" in response.docSentiment) && response.docSentiment.type == "neutral") {
                                    insertStmt += "0);";
                                    ret = 0;
                                } else {
                                    insertStmt += (response.docSentiment.score * 1000000);
                                    insertStmt += ");";
                                    ret = response.docSentiment.score;
                                }
                                //console.log(insertStmt);
                                con.query(insertStmt);
				while(lock){}
				lock = true;
				count++;
				lock = false;
				callBack(ret);
                                //console.log(JSON.stringify(response, null, 2));
                            }
                        });
                    } else {
			console.log("Executing else");
                        if (rows[0].sentiment > 10) {
                            ret = (rows[0].sentiment / 1000000);
                        } else {
                            ret = (rows[0].sentiment);
                        }
			while(lock){}
			lock = true;
			count++;
			lock = false;
			callBack(ret);
                    }
                });
            };
            fun(i, function(value){
		console.log("ret = " + value);
	     	while(lock) {}
		lock = true;
		average += value;
		console.log("new avg = " + average);
		lock = false;});
       }
	while(count < arr.length - 1){ }
	callback();
    }

    func(function() {
        console.log("IN AVERAGE");
        res.end("" + average / arr.length);
    })
});


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, function() {
    var host = httpServer.address().address
    var port = httpServer.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});
httpsServer.listen(8443, function() {
    var host = httpsServer.address().address
    var port = httpsServer.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});
