function numeroRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let indice = 0;
let palabraFormada = "";
let palabraCorrecta = palabra[numeroRandom(0, palabra.length)];
let existe = false;
let vidas = 6;

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
    if(indice > 0 && event.key == "Backspace"){    
        console.log(indice,event.key);
        indice--;
        document.getElementById(indice).style.color = "transparent";
    }

    if(event.key == "Enter" && indice == 6){
        
        palabraFormada = "";
        for(let i = 0; i < 6; i++){
            let letra = document.getElementById(i).innerHTML;
            palabraFormada = palabraFormada + letra;
            if(letra === palabraCorrecta[i]){
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
        console.log("Correcta:",palabraFormada == palabraCorrecta);
        console.log("Forma:",palabraFormada);
        console.log("Era:",palabraCorrecta);
    }
});

