// Obtener elementos del HTML
const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const materia1 = document.getElementById("materia1");
const materia2 = document.getElementById("materia2");
const materia3 = document.getElementById("materia3");
const lista = document.getElementById("lista");
const btnLimpiarTodo = document.getElementById("btnLimpiarTodo");

// Obtener los alumnos guardados
let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

// Mostrar los alumnos al cargar la página
mostrarAlumnos();

// Evento del formulario
formulario.addEventListener("submit", function (evento) {

    // Evitar que la página se recargue
    evento.preventDefault();

    // Obtener valores numéricos
    const n1 = parseFloat(materia1.value);
    const n2 = parseFloat(materia2.value);
    const n3 = parseFloat(materia3.value);

    // Calcular el promedio (redondeado a 1 decimal)
    const promedio = parseFloat(((n1 + n2 + n3) / 3).toFixed(1));

    // Evaluar estado: Aprobado si es mayor o igual a 7
    const estado = promedio >= 7 ? "Aprobado" : "Reprobado";

    // Crear objeto alumno
    const alumno = {
        id: Date.now(),
        nombre: nombre.value,
        materia1: n1,
        materia2: n2,
        materia3: n3,
        promedio: promedio,
        estado: estado
    };

    // Agregar al arreglo
    alumnos.push(alumno);

    // Guardar en localStorage
    guardarEnLocalStorage();

    // Actualizar vista y limpiar campos
    mostrarAlumnos();
    formulario.reset();

});

// Función para mostrar la lista de alumnos
function mostrarAlumnos() {

    lista.innerHTML = "";

    if (alumnos.length === 0) {
        lista.innerHTML = "<p style='text-align:center; color:#888; margin-top:15px;'>No hay alumnos registrados.</p>";
        return;
    }

    alumnos.forEach(function (alumno) {

        const elemento = document.createElement("div");
        const esAprobado = alumno.estado === "Aprobado";

        // Asignar clases dinámicas para CSS
        elemento.classList.add("alumno", esAprobado ? "aprobado" : "reprobado");

        elemento.innerHTML = `
            <div class="alumno-header">
                <strong>${alumno.nombre}</strong>
                <button class="btn-eliminar" onclick="eliminarAlumno(${alumno.id})">Eliminar</button>
            </div>
            
            <div class="notas-detalles">
                Materia 1: ${alumno.materia1} | Materia 2: ${alumno.materia2} | Materia 3: ${alumno.materia3}
            </div>

            <div class="resultado">
                <span>Promedio: ${alumno.promedio}</span>
                <span class="badge ${esAprobado ? 'aprobado' : 'reprobado'}">${alumno.estado}</span>
            </div>
        `;

        lista.appendChild(elemento);

    });

}

// Función para eliminar un solo alumno por su ID
function eliminarAlumno(id) {
    alumnos = alumnos.filter(alumno => alumno.id !== id);
    guardarEnLocalStorage();
    mostrarAlumnos();
}

// Botón para borrar todos los registros
btnLimpiarTodo.addEventListener("click", function () {
    if (alumnos.length > 0 && confirm("¿Estás seguro de que deseas eliminar a todos los alumnos?")) {
        alumnos = [];
        guardarEnLocalStorage();
        mostrarAlumnos();
    }
});

// Función auxiliar para actualizar LocalStorage
function guardarEnLocalStorage() {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
}