function numeroRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function calculaTiempo(t1, t2){
    let t3 = t2 - t1;
    let m = 0;
    let s = 0;
    let tiempo = "";

    while(t3 > 1000){
        t3 = t3-1000;
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

let indice = 0;
let palabraFormada = "";
let palabraCorrecta = palabra[numeroRandom(0, palabra.length)];
let existe = false;
let vidas = 6;
let correcta = false;
let tiempoA = new Date();

console.log(palabraCorrecta); //ACORDATE DE BORRAR ESTO!!!

document.addEventListener("keypress", function(event) {
    if(indice < 6 && event.key != "Enter"){
        document.getElementById(indice).style.color = "white";
        console.log(indice,event.key);
        document.getElementById(indice).innerHTML = event.key;
        indice++;           
    }        
});

document.addEventListener("keydown", function(event) {
    if(indice > 0 && event.key == "Backspace" && vidas > 0 && !correcta){    
        console.log(indice,event.key);
        indice--;
        document.getElementById(indice).style.color = "transparent";
    }

    if(event.key == "Enter" && indice == 6 && vidas > 0 && !correcta){
        
        vidas--;
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
            let tiempoB = new Date();
            let tiempo = calculaTiempo(tiempoA, tiempoB);
            document.getElementById("timer").innerHTML = tiempo;

            //console.log(calculaTiempo(tiempoA, tiempoB));
            document.getElementById("body").style.backgroundColor = "#022100";
            document.getElementById("vidas").style.backgroundColor = "transparent";
            document.getElementById("vidas").style.opacity = "0";
            setTimeout(() => {
                console.log(document.getElementById("vidas").innerHTML)
                document.getElementById("vidas").innerHTML = "a"
                document.getElementById("vidas").innerHTML = "<a href=\"\"><img src=\"style/arrow-repeat.svg\" alt=\"\"></a>"
            }, 500);
            
            setTimeout(() => {
                document.getElementById("vidas").style.opacity = "1";
                document.getElementById("timer").style.opacity = "1";
            }, 800);
        }   

        

        

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
        }, 200);
        
        setTimeout(() => {
            document.getElementById("vidas").style.opacity = "1";
        }, 800);
        
        


    }
});

