//constructor
const Persona = function(nombre, peso, altura) {
    this.nombre = nombre;
    this.peso = peso;
    this.altura = altura;
    this.imc = calcularIMC(peso, altura);
};

const listaPersonas = [];

//funcion imc
function calcularIMC(peso, altura) {
    return (peso / (altura * altura));
}

//agregar
function agregarPersona() {
    let nombre = prompt("Ingrese su nombre:").trim();
    let peso = parseFloat(prompt("Ingrese su peso en kg:"));
    let altura = parseFloat(prompt("Ingrese su altura en metros (ejemplo: 1.80):"));
    
    if (isNaN(peso) || isNaN(altura) || nombre === "") {
        alert("Por favor, ingrese datos válidos.");
        return;
    }
    
    let persona = new Persona(nombre, peso, altura);
    listaPersonas.push(persona);
    alert(`Nombre: ${persona.nombre}, Peso: ${persona.peso}, Altura: ${persona.altura}, IMC: ${persona.imc}`);
}

//bucle
let continuar = true;
while (continuar){
    agregarPersona();
    continuar = confirm("Desea ingresar otra persona?");
}