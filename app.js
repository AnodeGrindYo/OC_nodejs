const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Thing = require('./models/thing');

const app = express();

mongoose.connect('mongodb+srv://mragodoy:K92tCSHC89r9ykLR@cluster0.edinewt.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.error('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
});

app.use(bodyParser.json());

// add stuff
app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

// retrieve a particular stuff
app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
})

// modify a particular stuff
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

// delete a particular stuff
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

// get all stuff
app.use('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;