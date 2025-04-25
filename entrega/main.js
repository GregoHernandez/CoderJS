// calculadora de indice de masa corporal en construccion
//no me funciona

//constructor
const Persona = function(nombre, peso, altura) {
    this.nombre = nombre;
    this.peso = peso;
    this.altura = altura;
    this.imc = calcularIMC(peso, altura);
};

// Función para calcular el IMC
function calcularIMC(peso, altura) {
    return parseFloat((peso / (altura * altura)).toFixed(2));
}

//----------------------------- DOM------------------------------------//

const formulario = document.getElementById("formularioIMC");
const resultado = document.getElementById("resultado");
const listaPersonas = document.getElementById("listaPersonas");
const botonLimpiar = document.getElementById("limpiarLista"); // Obtener el botón de limpiar

let personas = JSON.parse(localStorage.getItem("personas")) || [];
mostrarPersonas();

// Cargar datos desde un archivo JSON
async function cargarDatos() {
    try {
        const response = await fetch('datos.json'); // Asegúrate de que la ruta sea correcta
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }
        const data = await response.json();
        data.forEach(item => {
            let persona = new Persona(item.nombre, item.peso, item.altura);
            personas.push(persona);
        });
        localStorage.setItem("personas", JSON.stringify(personas));
        mostrarPersonas();
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

// Llamar a la función para cargar los datos
cargarDatos();

formulario.addEventListener("submit", function(event) {
    event.preventDefault(); 
    agregarPersona();
});

// Agregar persona
function agregarPersona() {
    let nombre = document.getElementById("nombre").value.trim();
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);
    
    if (isNaN(peso) || isNaN(altura) || nombre === "") {
        Swal.fire("Error", "Por favor, ingrese datos válidos.", "error");
        return;
    }
    
    let persona = new Persona(nombre, peso, altura);
    personas.push(persona);
    localStorage.setItem("personas", JSON.stringify(personas));
    
    mostrarPersonas();
    resultado.textContent = `IMC de ${persona.nombre}: ${persona.imc}`;
    formulario.reset();
}

// Mostrar personas en lista
function mostrarPersonas() {
    listaPersonas.innerHTML = "";
    personas.forEach(persona => {
        let li = document.createElement("li");
        li.textContent = `${persona.nombre} - IMC: ${persona.imc} - PESO: ${persona.peso} - ALTURA: ${persona.altura}`;
        listaPersonas.appendChild(li);
    });
}

// Limpiar lista
botonLimpiar.addEventListener("click", function() {
    personas = []; 
    localStorage.removeItem("personas"); 
    mostrarPersonas();
});
