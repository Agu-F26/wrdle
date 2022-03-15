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
    console.log(puntaje,"-",tiempo);
    puntaje = puntaje - (tiempo / 2);
    console.log(puntaje,"/",intentos);
    puntaje = puntaje / intentos;
    puntaje = puntaje.toFixed(0);
    puntajeString = puntaje + " puntos.";
    if (puntaje > 0) return puntajeString;
    else return "Sin puntos.";
    
}

let indice = 0;
let palabraFormada = "";
let palabraCorrecta = palabra[numeroRandom(0, palabra.length)];
let existe = false;
let vidas = 6;
let correcta = false;
var tiempoA = ""
let start = false;
var correctas = [false, false, false, false, false, false];

console.log(palabraCorrecta); //ACORDATE DE BORRAR ESTO!!!

document.addEventListener("keypress", function(event) {
    if (start == false){
        tiempoA = new Date();
        start = true;
        console.log(start,tiempoA);
    }
    if(indice < 6 && event.key != "Enter" && event.key != "Backspace"){
        console.log(indice,event.key);
        if(correctas[indice] == false){
            document.getElementById(indice).innerHTML = event.key;
            document.getElementById(indice).style.color = "white";
            indice++;          
        }
        else{
            console.log("else ingreso");
            for(let i = indice; i < 7; i++){
                if(correctas[i] == false){
                    console.log(i, correctas[i] == false)
                    document.getElementById(i).innerHTML = event.key;
                    document.getElementById(i).style.color = "white";
                    indice = i + 1;
                    break;
                }
            }
        }
    }        
});

document.addEventListener("keydown", function(event) {
    if(indice > 0 && event.key == "Backspace" && vidas > 0 && !correcta){
        console.log(indice,event.key);
        console.log("xd");
        if(correctas[indice-1] == false){
            console.log("entre if");
            indice--;
            document.getElementById(indice).style.color = "rgba(255,255,255,0.1)";
        }
        else{
            console.log("asdasd");
            for(let i = indice-1; i > -1; i--){
                if(correctas[i] == false){
                    console.log(i, correctas[i] == false)
                    document.getElementById(i).style.color = "rgba(255,255,255,0.1)";
                    indice = i;
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

        if(palabraFormada == palabraCorrecta){
            correcta = true;
            var tiempoB = new Date();
            var tiempo = stringTiempo(calculaTiempo(tiempoA, tiempoB));
            let puntaje = calculaPuntaje(calculaTiempo(tiempoA,tiempoB),vidas);

            document.getElementById("timer").innerHTML = tiempo;
            document.getElementById("score").innerHTML = puntaje;

            //console.log(calculaTiempo(tiempoA, tiempoB));
            document.getElementById("body").style.backgroundColor = "#022100";
            document.getElementById("vidas").style.backgroundColor = "transparent";
            document.getElementById("vidas").style.opacity = "0";
            setTimeout(() => {
                console.log(document.getElementById("vidas").innerHTML)
                document.getElementById("vidas").innerHTML = "a"
                document.getElementById("vidas").innerHTML = "<a href=\"\"><img src=\"style/arrow-repeat.svg\" alt=\"\"></a>"
            }, 400);
            
            setTimeout(() => {
                document.getElementById("vidas").style.opacity = "1";
                document.getElementById("timer").style.opacity = "1";
                document.getElementById("score").style.opacity = "1";
            }, 800);
        }
        else vidas--;   

        

        

        console.log("Correcta:",palabraFormada == palabraCorrecta);
        console.log("Forma:",palabraFormada);
        console.log("Era:",palabraCorrecta);
        console.log("Quedan",vidas,"vidas.");
    }

    if(event.key == "Enter" && indice == 6 && vidas == 0){
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

