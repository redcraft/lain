var express = require('express');
var bodyParser = require('body-parser');
var Memcached = require('memcached');
var memcached = new Memcached('memcached:11211');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.post('/', function(req, res) {
    memcached.set('name', req.body.name, 10, function (err) {
        if(err) console.log(err);
        res.render('index', {name: req.body.name});
    });
});
app.get('/', function (req, res) {
    memcached.get('name', function (err, data) {
        if(err) console.log(err);
        res.render('index', {name: data});
    });
});
app.listen(3000);
console.log('App running at port: 3000');

