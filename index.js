const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse the request body
app.use(express.urlencoded({extended: true}));

// Connect to the database
mongoose.connect('mongodb://localhost:27017/contactDB', {useNewUrlParser: true, useUnifiedTopology: true});

// Define the contact schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

// Create the contact model
const Contact = mongoose.model('Contact', contactSchema);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Add contact route
app.get('/contacts/add', (req, res) => {
    res.sendFile(__dirname + '/views/contactAdd.html');
});

// Post contact route
app.post('/contacts', (req, res) => {
    // Get the contact details from the request body
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    // Create a new contact document
    const newContact = new Contact({
        name: name,
        email: email,
        phone: phone
    });

    // Save the contact to the database
    newContact.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Contact added successfully');
            res.redirect('/contacts');
        }
    });
});

// List contacts route
app.get('/contacts', (req, res) => {
    // Find all the contacts in the database
    Contact.find({}, (err, contacts) => {
        if (err) {
            console.log(err);
        } else {
            // Render the contact list page with the contacts data
            res.render('contactList', {contacts: contacts});
        }
    });
});

// Update contact route
app.put('/contacts/:id', (req, res) => {
    // Get the contact id from the request parameters
    const id = req.params.id;

    // Get the updated contact details from the request body
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    // Find and update the contact document by id
    Contact.findByIdAndUpdate(id, {name: name, email: email, phone: phone}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Contact updated successfully');
            res.redirect('/contacts');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
