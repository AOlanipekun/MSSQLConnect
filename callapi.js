
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var DOMParser = require('xmldom').DOMParser;
var express = require('express');
var app = require('express')();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5002));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({// to support URL-encoded bodies
    extended: true
}));

app.get('/', function (req, res) {
    res.send('<body><head><link href="favicon.ico" rel="shortcut icon" />\
    </head><body><h1>Awesome!</h1><p>The server is set up. \
    Go ahead and configure your apps to make calls to: \
    <ul><li> <a href="#">https://' + req.headers.host + '</a></li></ul> \
    </p></body></html>');
});

app.get('/getdb', function (req, res) {
    getTokenFromDb(function (done) {
        console.log("sms meter:" + done + ' \r\n');
        // send records as a response
        res.send(done);
    });
});

//to get the token information from the db
//remember to change ip to live ip for deployment

function getTokenFromDb(done) {
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: '****',
        server: 'localhost',
        database: 'testdb',
        options: { "trustServerCertificate": true }
    };

    // connect to your database
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            return;
        }

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select * from testTable', function (err, recordset) {


            if (err) {
                console.log(err);
                return;
            }

            // send records as a response
            done(recordset);

        });
    });
}


//The 404 Route (ALWAYS Keep this as the last route)
app.get('/*', function (req, res) {
    res.status(404).send('This API is a server based application that Only \
     GET record from DB and send directly to the meter ');
});
app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port') + ' \r\n');
});
