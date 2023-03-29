// crear app de express
const express = require('express');
const app = express();

// configurar app de express
app.set('port', process.env.PORT || 3000);

// middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));

// configurar EJS como motor de plantillas
app.set('view engine', 'ejs');

// iniciar servidor
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto', app.get('port'));
});

// configurar get y servir index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
}
);

// crear clase Contact
class Contact {
    constructor(name, lastname, position, company) {
        this.name = name;
        this.lastname = lastname;
        this.position = position;
        this.company = company;
    }
}

// crear lista de contactos
let contactList = [];

// agregar ruta para contactAdd.html
app.get('/contactAdd', (req, res) => {
    res.sendFile(__dirname + '/views/contactAdd.html');
});

// agregar ruta para contactList.ejs utilizando EJS
app.get('/contactList', (req, res) => {
    res.render('contactList', { contactList: contactList });
});

// agregar post para contactAdd e imprimir en la consola el valor del contacto
app.post('/contactAdd', (req, res) => {
    console.log(req.body);
    // crear un nuevo contacto
    let contact = new Contact(req.body.name, req.body.lastname, req.body.position, req.body.company);
    // agregar el contacto a la lista de contactos
    contactList.push(contact);
    // redireccionar a index.html
    res.redirect('/');
}
);





