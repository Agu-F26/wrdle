function numeroRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function calculaTiempo(t1, t2){
    let t3 = t2 - t1;
    return t3;
}

function stringTiempo(t){
    let tiempo = "";
    let m = 0;
    let s = 0;

    while(t > 1000){
        t = t-1000;
        s++;
    }
    while(s > 59){
        s = s-60;
        m++;
    }
    if(m > 0){
        if(m == 1) tiempo = "1 minuto "+ s +" segundos.";
        else tiempo = m + " minutos "+ s +" segundos.";
    }
    else{
        if(s == 1) tiempo = "1 segundo."
        else tiempo = s + " segundos.";
    }
    return tiempo;
}

function calculaPuntaje(tiempo,vidas){
    let puntaje = 100000;
    let intentos = 6 - vidas;
    let puntajeString = "";
    puntaje = puntaje - (tiempo / 2);
    puntaje = puntaje / intentos;
    puntaje = puntaje.toFixed(0);
    puntajeString = puntaje + " puntos.";
    if (puntaje > 0) return puntajeString;
    else return "Sin puntos.";
    
}

function extraeBest(cookie){
    let bestCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('best='))
    .split('=')[1];

    return bestCookie;
}

function setIndex(arregloCorrectas){
    let ultimaIncorrecta = -1;
    for(let i = 0; i < arregloCorrectas.length; i++){
        if(arregloCorrectas[i] == false) ultimaIncorrecta = i+1;
    }
    return ultimaIncorrecta;
}


let indice = 0;
let palabraFormada = "";
let palabraCorrecta = palabra[numeroRandom(0, palabra.length)];
let existe = false;
let vidas = 6;
let correcta = false;
var tiempoA = ""
let start = false;
let bestTime = -1;
var correctas = [false, false, false, false, false, false];
if(document.cookie != "")
bestTime = extraeBest(document.cookie);
else bestTime = 999999999999999;

console.log(palabraCorrecta);

document.getElementById(0).style.border = "solid white";

document.addEventListener("keypress", function(event) {
    if (start == false){
        tiempoA = new Date();
        start = true;
    }
    if(indice < 6 && event.key != "Enter" && event.key != "Backspace"){
        if(correctas[indice] == false){
            //console.log(indice);
            document.getElementById(indice).innerHTML = event.key;
            document.getElementById(indice).style.color = "white";
            indice++;
            console.log(indice,"++");
            if(correctas[indice] != true && indice < 6){
                document.getElementById(indice).style.border = "solid white";
                document.getElementById(indice - 1).style.border = "solid #000000";
            }
            else{
                document.getElementById(indice-1).style.border = "solid #000000";
                for(let i = indice; i < 7; i++){
                    if(correctas[i] == false){
                        //document.getElementById(i).innerHTML = event.key;
                        //document.getElementById(i).style.color = "white";
                        indice = i;
                        document.getElementById(indice).style.border = "solid white";
                        if(correctas[indice+1] != true && indice < 5) document.getElementById(indice + 1).style.border = "solid #000000";
                        break;
                    }
                }
            }
            
            //document.getElementById(indice).style.border = "solid white";
            //document.getElementById(indice - 1).style.border = "solid #7a7a7a";
        }/*
        else{
            console.log(indice);
            document.getElementById(indice).style.border = "solid #7a7a7a";
            for(let i = indice; i < 7; i++){
                if(correctas[i] == false){
                    document.getElementById(i).innerHTML = event.key;
                    document.getElementById(i).style.color = "white";
                    indice = i + 1;
                    document.getElementById(indice).style.border = "solid white";
                    if(correctas[indice+1] != true && indice < 5) document.getElementById(indice + 1).style.border = "solid #7a7a7a";
                    break;
                }
            }
        }*/
    }        
});

document.addEventListener("keydown", function(event) {
    if(indice > 0 && event.key == "Backspace" && vidas > 0 && !correcta){
        if(correctas[indice-1] == false){
            indice--;
            document.getElementById(indice).style.color = "rgba(255,255,255,0.1)";
            document.getElementById(indice).style.border = "solid white";
            if(correctas[indice+1] != true && indice < 5) document.getElementById(indice + 1).style.border = "solid #000000";
            //document.getElementById(indice + 1).style.border = "solid #000000";
        }
        else{
            document.getElementById(indice).style.border = "solid #000000";
            for(let i = indice-1; i > -1; i--){
                if(correctas[i] == false){
                    document.getElementById(i).style.color = "rgba(255,255,255,0.1)";
                    indice = i;
                    document.getElementById(indice).style.border = "solid white";
                    if(correctas[indice+1] != true && indice < 5) document.getElementById(indice + 1).style.border = "solid #000000";
                    break;
                }
            }
        }
    }

    if(event.key == "Enter" && vidas > 0 && !correcta && document.getElementById(5).innerHTML != "0"){
        
        
        document.getElementById("vidas").style.color = "transparent";
        if(vidas != 0){
            setTimeout(() => {
                document.getElementById("vidas").innerHTML = vidas;
                document.getElementById("vidas").style.color = "#c7c7c7";
            }, 400);
        }
        
        palabraFormada = "";
        for(let i = 0; i < 6; i++){
            let letra = document.getElementById(i).innerHTML;
            palabraFormada = palabraFormada + letra;
            if(letra == palabraCorrecta[i]){
                correctas[i] = true;
                document.getElementById(i).style.color = "#19f002";
                document.getElementById(i).style.backgroundColor = "#042101";
                document.getElementById(i).style.border = "solid #19f002";
            }
            else
            {
                for(let j = 0; j < 6; j++){
                    if(letra === palabraCorrecta[j]) existe = true;
                }
                if(existe){
                    document.getElementById(i).style.color = "#ffbf00";
                    document.getElementById(i).style.backgroundColor = "#302400";
                    document.getElementById(i).style.border = "solid #ffbf00";
                    existe = false;
                }
                else{
                    document.getElementById(i).style.color = "#ff0000";
                    document.getElementById(i).style.backgroundColor = "#300000";
                    document.getElementById(i).style.border = "solid #ff0000";
                }
            }
        }

        indice = setIndex(correctas);
        //document.getElementById(indice-1).style.border = "solid white";

        //ACA VA LA FUNCION PARA RESETEAR EL INDICE



        if(palabraFormada == palabraCorrecta){
            correcta = true;
            var tiempoB = new Date();

            if(calculaTiempo(tiempoA, tiempoB) < bestTime) {
                bestTime = calculaTiempo(tiempoA, tiempoB);
                document.cookie = "best=" + bestTime + "; Secure;";
            }

            var tiempo = stringTiempo(calculaTiempo(tiempoA, tiempoB));
            let puntaje = calculaPuntaje(calculaTiempo(tiempoA,tiempoB),vidas);

            document.getElementById("timer").innerHTML = "Tiempo actual: " + tiempo;
            document.getElementById("score").innerHTML = puntaje;
            document.getElementById("best-time").innerHTML = "Mejor tiempo: " + stringTiempo(bestTime);

            document.getElementById("body").style.backgroundColor = "#022100";
            document.getElementById("vidas").style.backgroundColor = "transparent";
            document.getElementById("vidas").style.opacity = "0";
            setTimeout(() => {
                document.getElementById("vidas").innerHTML = "a"
                document.getElementById("vidas").innerHTML = "<a href=\"\"><img src=\"style/arrow-repeat.svg\" alt=\"\"></a>"
            }, 400);
            
            setTimeout(() => {
                document.getElementById("vidas").style.opacity = "1";
                document.getElementById("timer").style.opacity = "1";
                document.getElementById("best-time").style.opacity = "1";
                document.getElementById("score").style.opacity = "1";
            }, 800);
        }
        else vidas--;
    }

    if(event.key == "Enter" && vidas == 0 && document.getElementById(5).innerHTML != "0"){
        document.getElementById("vidas").style.backgroundColor = "transparent";
        document.getElementById("vidas").style.opacity = "0";
        for(let i = 0; i < 6; i++){
            document.getElementById(i).style.color = "#c7c7c7";
            document.getElementById(i).style.backgroundColor = "#262626";
            document.getElementById(i).style.border = "solid #c7c7c7";
            document.getElementById(i).style.color = "transparent";
        }

        setTimeout(() => {
            document.getElementById(0).innerHTML = "0";       
            document.getElementById(1).innerHTML = "v";
            document.getElementById(2).innerHTML = "i";
            document.getElementById(3).innerHTML = "d";
            document.getElementById(4).innerHTML = "a";
            document.getElementById(5).innerHTML = "s";
            for(let i = 0; i < 6; i++){
                document.getElementById(i).style.color = "#c7c7c7";
            }
        }, 250);
        document.getElementById("body").style.backgroundColor = "#210000";
        setTimeout(() => {
            document.getElementById("vidas").innerHTML = "<a href=\"\"><img src=\"style/arrow-repeat.svg\" alt=\"\"></a>"
        }, 400);
        
        setTimeout(() => {
            document.getElementById("vidas").style.opacity = "1";
        }, 800);
    }
});

