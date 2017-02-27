const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const Memcached = require('memcached');
const memcached = new Memcached('memcached:11211');
const app = express();

var healthcheck = "healthy";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

var getRandomImage = function () {
    var files = fs.readdirSync(__dirname + '/img');
    return 'img/' + files[Math.floor(Math.random() * files.length)];
};


app.post('/', function(req, res) {
    memcached.set('name', req.body.name, 60 * 5, function (err) {
        if(err) console.log(err);
        res.render('index', {name: req.body.name, image: getRandomImage()});
    });
});
app.get('/', function (req, res) {
    memcached.get('name', function (err, data) {
        if(err) console.log(err);
        console.log(getRandomImage());
        res.render('index', {name: data, image: getRandomImage()});
    });
});
app.get('/healthcheck', function (req, res) {
	res.send(healthcheck);
});
app.get('/kill', function (req, res) {
    healthcheck = "unhealthy";
    res.send("Killed");
});
app.use('/img', express.static(__dirname + '/img'));



app.listen(3000);
console.log('App running at port: 3000');

