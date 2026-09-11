// Obtener elementos del HTML
const formulario = document.getElementById("formulario");
const noControl = document.getElementById("noControl");
const nombre = document.getElementById("nombre");
const apellidoPaterno = document.getElementById("apellidoPaterno");
const apellidoMaterno = document.getElementById("apellidoMaterno");
const carrera = document.getElementById("carrera");
const lista = document.getElementById("lista");

// Obtener los alumnos guardados
let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

// Mostrar los alumnos al cargar la página
mostrarAlumnos();

// Evento del formulario
formulario.addEventListener("submit", function (evento) {

    // Evitar que la página se recargue
    evento.preventDefault();

    // Crear un objeto alumno con los nuevos campos
    const alumno = {
        noControl: noControl.value,
        nombre: nombre.value,
        apellidoPaterno: apellidoPaterno.value,
        apellidoMaterno: apellidoMaterno.value,
        carrera: carrera.value
    };

    // Agregar el alumno al arreglo
    alumnos.push(alumno);

    // Guardar en localStorage
    localStorage.setItem(
        "alumnos",
        JSON.stringify(alumnos)
    );

    // Mostrar nuevamente la lista
    mostrarAlumnos();

    // Limpiar formulario
    formulario.reset();

});

// Función para mostrar alumnos
function mostrarAlumnos() {

    lista.innerHTML = "";

    alumnos.forEach(function (alumno) {

        const elemento = document.createElement("div");

        elemento.classList.add("alumno");

        elemento.innerHTML = `
            <div class="no-control"><strong>No. Control:</strong> ${alumno.noControl}</div>
            <strong>${alumno.nombre} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}</strong>
            <p><strong>Carrera:</strong> ${alumno.carrera}</p>
        `;

        lista.appendChild(elemento);

    });

}