// crear una funcion para ordenar la lista de contactos por nombre
function sortContactsByName() {
    // obtener la referencia a la tabla de contactos
    let table = document.getElementById("contact-table");
    // obtener la referencia al cuerpo de la tabla
    let tbody = table.tBodies[0];
    // obtener la referencia a las filas de la tabla
    let rows = tbody.rows;
    // convertir las filas en un array
    let rowArray = Array.from(rows);
    // ordenar el array por el texto de la primera celda de cada fila (el nombre del contacto)
    rowArray.sort((a, b) => {
        let nameA = a.cells[0].textContent;
        let nameB = b.cells[0].textContent;
        return nameA.localeCompare(nameB);
    });
    // vaciar el cuerpo de la tabla
    tbody.innerHTML = "";
    // agregar las filas ordenadas al cuerpo de la tabla
    for (let row of rowArray) {
        tbody.appendChild(row);
    }
}

// crear una funcion para activar o desactivar el dark mode
function toggleDarkMode() {
    // obtener la referencia al elemento body
    let body = document.body;
    // alternar la clase dark-mode en el elemento body
    body.classList.toggle("dark-mode");
}

// agregar un manejador de evento para el boton de ordenar
$("#sort-button").click(sortContactsByName);

// agregar un manejador de evento para el boton de dark mode
$("#dark-button").click(toggleDarkMode);
