// crear un servidor web utilizando express
const express = require('express');
const app = express();
const port = 3000;

// importar express.urlencoded() para parsear el cuerpo de la petición
const urlencoded = express.urlencoded({extended: false});

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
app.post('/contactAdd', urlencoded, (req, res) => {
    // imprimir contacto en la linea de comandos
    console.log("Imprimiendo el contacto: ");
    console.log(req.body);
    // crear un objeto de Contact con los datos del formulario
    let newContact = new Contact(req.body.name, req.body.id, req.body.company);
    // agregar el contacto a la lista
    contactList.push(newContact);
    // redirige al home page
    res.redirect('/');
}
);

// agregar ruta de contactList que renderiza contactList.ejs
app.get('/contactList', (req, res) => {
    // pasar la lista de contactos como un parametro al template
    res.render('contactList', {contactList: contactList});
}
);
