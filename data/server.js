var express = require("express");
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var router = express.Router();

var CrimeData = require("./CrimeData.json");

router.get("/crime", function(req, res, next) {
	console.log("cds")
	res.json(CrimeData);
});

app.get('/crimedata', (req, res) => {
	console.log("Crime data sent")
	res.send(CrimeData)
})

const PORT = process.env.PORT || 4008;
	
var server = http.listen(PORT, () => {
    console.log('server is listening on port ', server.address().port)
})
