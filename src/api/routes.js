const request = require('request');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

var api = require("./api.js")
api.init();

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/total/', (req, res) =>
        api.totalMinted().then(function(result) {
          res.send({"total" : result});
        }));

app.get('/api/owned/', (req, res) =>
        api.owned().then(function(result) {
          res.send({"owned" : result});
        }));

app.get('/api/ownedby/:address', (req, res) =>
        api.ownedBy(req.params["address"]).then(function(result) {
          res.send({"owned" : result});
        }));

app.get('/api/mint/:amount', (req, res) =>
        api.mint(req.params["amount"]).then(function(result) {
          res.send(result);
        }));

app.get('/api/transfer/:address/:amount', (req, res) =>
        api.transferTo(req.params["address"], req.params["amount"])
        .then(function(result) {
          res.send(result);
        }));

app.listen(3000, () => console.log('API active on port 3000!'))
