const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/contacts', { useNewUrlParser: true });

// Define the contact schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String }
});

// Define the contact model
const Contact = mongoose.model('Contact', contactSchema);

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define the CRUD routes for contacts
app.get('/contacts', (req, res) => {
    Contact.find({}, (err, contacts) => {
        if (err) {
        res.status(500).send('Error occurred: database error.');
        } else {
        res.json(contacts);
        }
    });
    });

app.post('/contacts', (req, res) => {
    const newContact = new Contact(req.body);
    newContact.save((err, savedContact) => {
        if (err) {
        res.status(500).send('Error occurred: database error.');
        } else {
        res.json(savedContact);
        }
    });
    }
);

// search contacts by id
app.get('/contacts/:id', (req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
        if (err) {
        res.status(500).send('Error occurred: database error.');
        } else {
        res.json(contact);
        }
    });
    }
);



