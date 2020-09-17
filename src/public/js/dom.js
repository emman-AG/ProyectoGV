var dispositivo = document.getElementsByName('op1');
var hadsof = document.getElementsByName('hs');
var hslaptop = document.getElementsByName('hslaptop');

console.log(dispositivo);

function hadware(){

    if(hslaptop[0].hidden==true){
        hslaptop[0].hidden=false;
        hslaptop[1].hidden=true;
    } 
    if(hslaptop[0].hidden==true && dispositivo[2].cheked==true){
        hslaptop[0].hidden=false;
        hslaptop[1].hidden=true;
    }    
    
}

function software() {
    if(hslaptop[1].hidden==true){
        hslaptop[1].hidden=false;
        hslaptop[0].hidden=true;
    }
}

function hs() {
    hadsof[0].hidden=false;
}