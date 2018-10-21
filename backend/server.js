var express = require("express");
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
var http = require('http').Server(app)
var router = express.Router();

var CrimeData = require("./CrimeData.json");
app.use(cors())

router.get("/crime", function(req, res, next) {
	console.log("cds")
	res.json(CrimeData);
});

app.get('/crimedata', (req, res) => {
	console.log("Crime data sent")
	res.send(CrimeData)
})

const PORT = process.env.PORT || 3000;
	
var server = http.listen(PORT, () => {
    console.log('server is listening on port ', server.address().port)
})
