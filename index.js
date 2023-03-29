// crear un servidor web utilizando express
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

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
    console.log(req.body);
    // agregar contacto a la lista
    contactList.push(new Contact(req.body.name, req.body.id, req.body.company));
    // redirige al home page
    res.redirect('/');
    
    }
);

// agregar ruta de contactList hacia contactList.ejs usando EJS
app.get('/contactList', (req, res) => {
    res.render('contactList.ejs', {contactList: contactList});
    }
);

