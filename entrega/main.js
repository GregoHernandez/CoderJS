// calculadora de indice de masa corporal en construccion

//constructor
const Persona = function(nombre, peso, altura) {
    this.nombre = nombre;
    this.peso = peso;
    this.altura = altura;
    this.imc = calcularIMC(peso, altura);
};

//funcion imc
function calcularIMC(peso, altura) {
    return (peso / (altura * altura)).toFixed(2);
}
//----------------------------- DOM(dolor de huevo)------------------------------------//

const formulario = document.getElementById("formularioIMC");
const resultado = document.getElementById("resultado");
const listaPersonas = document.getElementById("listaPersonas");

let personas = JSON.parse(localStorage.getItem("personas")) || [];
mostrarPersonas();

formulario.addEventListener("submit", function(event) {
    event.preventDefault(); 
    agregarPersona();
});

//agregar
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

//mostrar personas en lista

function mostrarPersonas() {
    listaPersonas.innerHTML = "";
    personas.forEach(persona => {
        let li = document.createElement("li");
        li.textContent = `${persona.nombre} - IMC: ${persona.imc} - PESO:${persona.peso} - ALTURA:${persona.altura}`;
        listaPersonas.appendChild(li);
    });
}