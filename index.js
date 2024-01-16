// crear un servidor web utilizando express
const express = require('express');
const app = express();
const port = 3000;

// importar ejs
const ejs = require('ejs');

// configurar el motor de plantillas a ejs
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

// agregar ruta de contactAdd hacia contactAdd.ejs
app.get('/contactAdd', (req, res) => {
    res.render('contactAdd');
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

// agregar middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.json());

// agregar metodo post para agregar un contacto
app.post('/contactAdd', (req, res) => {
    // imprimir contacto en la linea de comandos
    console.log("Imprimiendo el contacto: ");
    console.log(req.body);
    // crear un nuevo objeto Contact con los datos de la solicitud
    let newContact = new Contact(req.body.name, req.body.id, req.body.company);
    // agregar el nuevo contacto a la lista de contactos
    contactList.push(newContact);
    // redirige al home page
    res.redirect('/');
}
);

// agregar ruta de contactList hacia contactList.ejs
app.get('/contactList', (req, res) => {
    // ordenar la lista de contactos por nombre
    contactList.sort((a, b) => a.name.localeCompare(b.name));
    // enviar la lista de contactos como parametro a la plantilla ejs
    res.render('contactList', {contactList: contactList});
}
);
