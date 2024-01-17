/* agregar el código para activar y desactivar el dark mode */

// seleccionar el elemento del botón o interruptor
const darkSwitch = document.getElementById('darkSwitch');

// agregar un evento click al botón o interruptor
darkSwitch.addEventListener('click', () => {
    // seleccionar el elemento del body
    const body = document.body;
    // obtener el valor actual del atributo data-theme
    const currentTheme = body.getAttribute('data-theme');
    // cambiar el valor del atributo data-theme entre light y dark
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
    }
});
