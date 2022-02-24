const piedra = "rock";
const papel = "paper";
const tijeras = "scissors";

const empate = 0;
const ganar = 1;
const perder = 2;

var piedraBot = document.getElementById("piedra");
var papelBot = document.getElementById("papel");
var tijeraBot = document.getElementById("tijera");
var textoResultado = document.getElementById("texto-inicio");
var imagenYO = document.getElementById("imagenYO");
var imagenPC = document.getElementById("imagenPC");

piedraBot.addEventListener("click",()=> {
    jugar(piedra)

});
papelBot.addEventListener("click", () => {
    jugar(papel)

});
tijeraBot.addEventListener("click", () => {
    jugar(tijeras)

});

function jugar(opcionesUsuario) {
    imagenYO.src = "img/"+opcionesUsuario+".svg";

    textoResultado.innerHTML = "¡Piedra Papel o tijera!";

    var intervalo = setInterval(function() {
        var opcionesMaquina = calcularPC();
        imagenPC.src = "img/"+opcionesMaquina+".svg";
    }, 150);

    setTimeout(function(){

        clearInterval(intervalo);

        var opcionesMaquina = calcularPC();
        var resultado = calcularResultado(opcionesUsuario, opcionesMaquina);
    
        imagenPC.src = "img/"+opcionesMaquina+".svg";
    
        switch(resultado) {
            case empate:
                textoResultado.innerHTML = "¡Empate!";
                break;
            case ganar:
                textoResultado.innerHTML = "¡Ganaste!";
                break;
            case perder:
                textoResultado.innerHTML = "¡Perdiste!";
                break;
        }

    }, 2000); 

}

function calcularPC () {
    var numero = Math.floor(Math.random() * 3);

    switch(numero) {
        case 0:
            return piedra;
        case 1:
            return papel;
        case 2:
            return tijeras;
    }

}

function calcularResultado (opcionesUsuario, opcionesMaquina) {
    if(opcionesUsuario === opcionesMaquina) {
        return empate;

    }else if(opcionesUsuario === piedra) {

        if(opcionesMaquina === papel) return perder;
        if(opcionesMaquina === tijeras) return ganar;
   
    }else if(opcionesUsuario === papel) {

        if(opcionesMaquina === tijeras) return perder;
        if(opcionesMaquina === piedra) return ganar;

    }else if(opcionesUsuario === tijeras) {

        if(opcionesMaquina === piedra) return perder;
        if(opcionesMaquina === papel) return ganar;
    }
}

function menuAnterior() {
    window.location.href ="juegos.html";
}