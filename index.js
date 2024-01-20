// crear un servidor web utilizando express
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// configurar la ruta raiz hacia index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
}
);

// iniciar el servidor web
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);

// agregar ruta de contactAdd hacia contactAdd.html
app.get('/contactAdd', (req, res) => {
    res.sendFile(__dirname + '/views/contactAdd.html');
}
);

// crear clase de Contact con atributos name id y company
class Contact {
    constructor(name, id, company) {
        this.name = name;
        this.id = id;
        this.company = company;
    }
}

// crear lista de contactos
let contactList = [];

// usar body-parser como middleware
app.use(bodyParser.urlencoded({extended: true}));

// agregar metodo post para agregar un contacto
app.post('/contactAdd', (req, res) => {
    // imprimir contacto en la linea de comandos
    console.log("Imprimiendo el contacto: ");
    console.log(req.body);
    // crear un objeto de Contact con los datos del formulario
    let newContact = new Contact(req.body.name, req.body.id, req.body.company);
    // agregar el contacto a la lista de contactos
    contactList.push(newContact);
    // redirige al home page
    res.redirect('/');
}
);

// agregar ruta de contactList hacia contactList.ejs
app.get('/contactList', (req, res) => {
    // renderizar la vista de contactList.ejs y pasar la lista de contactos como parametro
    res.render('contactList', {contactList: contactList});
}
);
