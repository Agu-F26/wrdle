var sigoSinSaber = false;
var anterior = "";
function noTengoIdea(value){
    if (sigoSinSaber){
        anterior = anterior + value;
        document.getElementById("output").innerHTML = anterior;
    }
    else{
        document.getElementById("output").innerHTML = value;
        anterior = value;
    }
    sigoSinSaber = true;
}