const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/./public/dist/public'));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/cakes');
mongoose.Promise = global.Promise;

app.get('/api/things', (req, res) => {

})

app.get('/api/things/:id', (req, res) => {

})

app.post('/api/things', (req, res) => {

})

app.put('/api/things/:id', (req, res) => {

})

app.delete('/api/things/:id', (req, res) => {

})

app.listen(8000, () => {
  console.log("LISTENING AT PORT 8000")
})