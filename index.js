// crear un servidor web utilizando express
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// usar body-parser como middleware
app.use(bodyParser.urlencoded({extended: true}));

// usar ejs como motor de plantillas
app.set('view engine', 'ejs');

// configurar la ruta raiz hacia index.ejs
app.get('/', (req, res) => {
    res.render('index');
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


// agregar metodo post para agregar un contacto
app.post('/contactAdd', (req, res) => {
    // imprimir contacto en la linea de comandos
    console.log("Imprimiendo el contacto: ");
    console.log(req.body);
    // crear un nuevo objeto Contact con los datos del formulario
    let newContact = new Contact(req.body.name, req.body.id, req.body.company);
    // agregar el nuevo contacto a la lista de contactos
    contactList.push(newContact);
    // redirige al home page
    res.redirect('/');
}
);

// agregar ruta de contactList hacia contactList.ejs
app.get('/contactList', (req, res) => {
    // si no hay una variable de sesión para el modo, crearla con valor 'light'
    if (!req.session.mode) {
        req.session.mode = 'light';
    }
    // renderizar la vista contactList.ejs y enviar la lista de contactos y el modo como parametros
    res.render('contactList', {contacts: contactList, mode: req.session.mode});
}
);
