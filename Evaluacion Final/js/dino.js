
var sueloY = 22;
var velY = 0;
var impulso = 900;
var gravedad = 2500;
var dinoPosX = 42;
var dinoPosY = sueloY;
var sueloX = 0;
var velEscenario = 1280/3;
var gameVel = 1;
var puntaje = 0;
var parado = false;
var saltando = false;
var tiempoHastaObstaculo = 2;
var tiempoObstaculoMin = 0.7;
var tiempoObstaculoMax = 1.8;
var obstaculoPosY = 16;
var obstaculos = [];
var tiempoHastaNube = 0.5;
var tiempoNubeMin = 0.7;
var tiempoNubeMax = 2.7;
var maxNubeY = 270;
var minNubeY = 100;
var nubes = [];
var velNube = 0.5;
var escenario;
var dino;
var textoPuntaje;
var suelo;
var gameOver;
var tiempo = new Date();
var deltaTiempo = 0;

if(document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(Init,1);
}else {
    document.addEventListener("DOMContentLoaded", Init);
}

function Init() {
    tiempo = new Date();
    inicio();
    bucle();
}

function bucle() {
    deltaTiempo = (new Date() - tiempo) / 1000;
    tiempo = new Date();
    actualizar()
    requestAnimationFrame(bucle);
}


function inicio() {
    gameOver = document.querySelector(".game-over");
    botones = document.querySelector(".botones");
    instrucciones = document.getElementById("instruccion");
    suelo = document.querySelector(".suelo");
    escenario = document.querySelector(".escenario");
    textoPuntaje = document.querySelector(".puntaje");
    dino = document.querySelector(".dino");
    document.addEventListener("keydown", barraEsp);
}

function barraEsp(ev) {
    if(ev.keyCode == 32) {
        saltar();
    }
}

function saltar() {
    if(dinoPosY === sueloY) {
        saltando = true;
        velY = impulso;
        dino.classList.remove("dino-corriendo")
    }
}



function actualizar() {

    if(parado) return;

    moverSuelo();
    moverDino();
    decidirCrearObstaculos();
    decidirCrearNubes();
    moverObstaculos();
    moverNubes();
    detectarColision();

    velY -= gravedad * deltaTiempo;
}

function moverSuelo() {
    sueloX += calcularDesplazamiento();
    suelo.style.left = -(sueloX % escenario.clientWidth) + "px";
}

function calcularDesplazamiento() {
    return velEscenario * deltaTiempo * gameVel;
}

function moverDino() {
    dinoPosY += velY * deltaTiempo;
    if(dinoPosY < sueloY) {
        tocarSuelo();
    }
    dino.style.bottom = dinoPosY + "px";
}

function tocarSuelo() {
    dinoPosY = sueloY;
    velY = 0;
    if(saltando) {
        dino.classList.add("dino-corriendo");
    }
    saltando = false;
}

function decidirCrearObstaculos() {
    tiempoHastaObstaculo -= deltaTiempo;
    if(tiempoHastaObstaculo <= 0) {
        crearObstaculo();
    }
}

function decidirCrearNubes() {
    tiempoHastaNube -= deltaTiempo;
    if(tiempoHastaNube <= 0) {
        crearNube();
    }
}

function crearObstaculo() {
    var obstaculo = document.createElement("div");
    escenario.appendChild(obstaculo);
    obstaculo.classList.add("cactus");
    if(Math.random() > 0.5) obstaculo.classList.add("cactus2");
    obstaculo.posX = escenario.clientWidth;
    obstaculo.style.left = escenario.clientWidth + "px";
    obstaculos.push(obstaculo);
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel;
}

function crearNube() {
    var nube = document.createElement("div");
    escenario.appendChild(nube);
    nube.classList.add("nube");
    nube.posX = escenario.clientWidth;
    nube.style.left = escenario.clientWidth+"px";
    nube.style.bottom = minNubeY + Math.random() * (maxNubeY-minNubeY)+"px";
    nubes.push(nube);
    tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax-tiempoNubeMin) / gameVel;
}

function moverObstaculos() {
    for(var i = obstaculos.length - 1; i >= 0; i--) {
        if(obstaculos[i].posX < -obstaculos[i].clientWidth) {
            obstaculos[i].parentNode.removeChild(obstaculos[i]);
            obstaculos.splice(i, 1);
            ganarPuntos();
        }else{
            obstaculos[i].posX -= calcularDesplazamiento();
            obstaculos[i].style.left = obstaculos[i].posX + "px";
        }
    }
}

function moverNubes() {
    for (var i = nubes.length - 1; i >= 0; i--) {
        if(nubes[i].posX < -nubes[i].clientWidth) {
            nubes[i].parentNode.removeChild(nubes[i]);
            nubes.splice(i, 1);
        }else{
            nubes[i].posX -= calcularDesplazamiento() * velNube;
            nubes[i].style.left = nubes[i].posX + "px";
        }
    }
}

function ganarPuntos() {
    puntaje++;
    textoPuntaje.innerText = puntaje;
    if(puntaje == 5){
        gameVel = 1.5;
        escenario.classList.add("mediodia");
    }else if(puntaje == 10) {
        gameVel = 2;
        escenario.classList.add("tarde");
    } else if(puntaje == 20) {
        gameVel = 3;
        escenario.classList.add("noche");
    }
    suelo.style.animationDuration = (3/gameVel)+"s";
}

function detectarColision() {
    for(var i = 0; i < obstaculos.length; i++) {
        if(obstaculos[i].posX > dinoPosX + dino.clientWidth) {
            break;
        }else{
            if(esColision(dino, obstaculos[i], 10, 30, 15, 20)) {
                GameOver();
            }
        }
    }
}

function esColision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
        (aRect.left + paddingLeft > (bRect.left + bRect.width))
    );
}

function GameOver() {
    estrellarse();
    gameOver.style.display = "block";
    botones.style.display = "block";

}

function estrellarse() {
    dino.classList.remove("dino-corriendo");
    dino.classList.add("dino-estrellado");
    parado = true;
}

function menuAnterior() {
    window.location.href ="juegos.html";
}

function reiniciar() {
    window.location.reload(true);
}
function desaparecerOP() {
    instrucciones.style.display = "none";
}
setTimeout(desaparecerOP, 5000)

