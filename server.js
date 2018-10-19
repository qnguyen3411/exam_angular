const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var uniqueValidator = require('mongoose-unique-validator');

const app = express();

app.use(express.static(__dirname + '/./public/dist/public'));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/pets');
mongoose.Promise = global.Promise;


function arrayLimit(val) {
  return val.length <= 3;
}
const PetSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Name is required'], minlength: [3, 'Name gotta be at least 3 letters'], unique:[true, 'Pet name already exist']},
  type: {type: String, required: [true, 'Type is required'], minlength: [3, 'Type gotta be at least 3 letters']},
  description: {type: String, required: [true, 'Description is required'], minlength: [3, 'Description gotta be at least 3 letters']},
  skills: {
    type: [String], validate: [arrayLimit, `Too many skillz `]
  },
  likes: {type: Number, default: 0, min: [0, "WHAT ARE YOU DOING"]}
})
PetSchema.plugin(uniqueValidator, { message: 'Pet name gotta be unique.' });




const Pet = mongoose.model('pet', PetSchema);

app.get('/api/pets', (req, res) => {
  Pet.find().then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    res.json({status: "error", data: err});
  })
})

app.get('/api/pets/:id', (req, res) => {
  Pet.findById(req.params.id).then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    res.json({status: "error", data: err});
  })
})

app.post('/api/pets', (req, res) => {
  Pet.create(req.body).then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    const errMessages = Object.keys(err.errors)
      .map(key => ({tag: key, message: err.errors[key].message}));
    res.json({status: "error", data: errMessages});
  });
})

app.put('/api/pets/:id', (req, res) => {
  Pet.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true, context: 'query'})
  .then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    const errMessages = Object.keys(err.errors)
      .map(key => ({tag: key, message: err.errors[key].message}));
    res.json({status: "error", data: errMessages});
  });
})

app.delete('/api/pets/:id', (req, res) => {
  Pet.findByIdAndDelete(req.params.id)
  .then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    res.json({status: "error", data: err});
  })
})

app.all("*", (req,res) => {
  res.sendFile(__dirname + "/./public/dist/public/index.html")
});


app.listen(8000, () => {
  console.log("LISTENING AT PORT 8000")
})