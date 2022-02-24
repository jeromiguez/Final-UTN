function divNombre(texto) {
    document.getElementById("valNombre").innerHTML = texto;
}
function divPass(texto) {
    document.getElementById("valPass").innerHTML = texto;
}


function formularioVal() {
    var campoNombre = document.getElementById("nombre");
    var campoClave = document.getElementById("pass");
    var valido = true;
    
    if(campoNombre.value.trim() == "") {
        divNombre("Debe ingresar un nombre");
        valido = false;
    }else{
        if(campoNombre.value.length < 4) {
            divNombre("El nombre debe tener mas de 4 caracteres");
            valido = false;
        }else{
            if(validarClave(campoClave.value) == false){
                divPass("La clave debe contener al menos 1 numero, 1 mayuscula, 1 minuscula y tener al menos 8 caracteres");
                valido = false;
            }
        }
    }
    return valido;
}
            

function validarClave(passVal) {
    var passPatron = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if(passPatron.test(passVal)) {
        return true;
    }else{
        return false;
    }
}

$(document).ready(function(){
    $(".marioGame").hide();
    $("p").fadeOut(2500);
    $(".papelGame").on("click", function() {
        window.location.href ="pipati.html"
    })

    $(".dinoGame").on("click", function() {
        window.location.href ="dino.html"
    })

    $(".snakeGame").on("click", function() {
        window.location.href ="snake.html"
    })

    $(".marioGame").on("click", function() {
        window.location.href ="mario.html"
    })
})

document.addEventListener("keydown", teclasMario);

function teclasMario(ev) {
    if(ev.keyCode == 74) {
        apareceMario();
    }

}

function apareceMario() {
    $(".marioGame").fadeIn(4000);
}
