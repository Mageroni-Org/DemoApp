// crear un servidor web utilizando express
const express = require('express');
const app = express();
const port = 3000;

// importar el modulo ejs
const ejs = require('ejs');

// configurar el motor de plantillas ejs
app.set('view engine', 'ejs');

// agregar el middleware express.urlencoded para parsear el cuerpo de la petición
app.use(express.urlencoded({extended: true}));

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


// agregar metodo post para agregar un contacto
app.post('/contactAdd', (req, res) => {
    // imprimir contacto en la linea de comandos
    console.log("Imprimiendo el contacto: ");
    console.log(req.body);
    // crear un objeto de la clase Contact con los datos del cuerpo de la petición
    let newContact = new Contact(req.body.name, req.body.id, req.body.company);
    // agregar el objeto a la lista de contactos
    contactList.push(newContact);
    // redirige al home page
    res.redirect('/');
}
);

// crear una ruta para renderizar la vista de la tabla de contactos
app.get('/contactList', (req, res) => {
    // renderizar la vista contactList.ejs pasando la lista de contactos como variable
    res.render('contactList', {contacts: contactList});
}
);
