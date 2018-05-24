document.getElementById('run').addEventListener('click', main);

function main(){
    var p = document.getElementById('p').value;
    var m = document.getElementById('m').value;
    var q = document.getElementById('q').value;
    
    var a = generatMatrix(p, m);
    var b = generatMatrix(m, q);
    var g = generatMatrix(m, p);
    var h = generatMatrix(q, m);
}

function generatMatrix(x, y){
    var genArray = new Array();
    genArray.length = x;
    
    var min = -1;
    var max = 1;
    
    for(var row = 0; row < x; row++){
        genArray[row] = new Array();
        genArray[row].length = y;
        for(var column = 0; column < y; column++){
            genArray[row][column] = min + Math.random() * (max - min);
        }
    }
    
    return genArray;
}


