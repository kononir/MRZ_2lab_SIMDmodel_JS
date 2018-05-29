document.getElementById('run').addEventListener('click', main);

function main(){
    var p = document.getElementById('p').value;
    var m = document.getElementById('m').value;
    var q = document.getElementById('q').value;
    
    var a = generateMatrix(p, m);
    var b = generateMatrix(m, q);
    var g = generateMatrix(m, p);
    var h = generateMatrix(q, m);

    addMatrixName("A");
    drawDoubleMatrix(a);
    
    addMatrixName("B");
    drawDoubleMatrix(b);
    
    addMatrixName("G");
    drawDoubleMatrix(g);
    
    addMatrixName("H");
    drawDoubleMatrix(h);
    
    var c = calculateC(a, b, g, h);   
    
    addMatrixName("C");
    drawDoubleMatrix(c);
}

function generateMatrix(x, y){
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

function calculateC(a, b, g, h){
    var p = document.getElementById('p').value;
    var q = document.getElementById('q').value;
    
    var c = new Array();
    c.length = p;
    var d = new Array();
    d.length = p;
    
    for(var i = 0; i < p; i++){
        c[i] = new Array();
        c[i].length = q;
        d[i] = new Array();
        d[i].length = q;
        for(var j = 0; j < q; j++){
            var answer = check(g, h, i, j);
            d[i][j] = calculateDkij(a, b, i, j);
            
            answer ? c[i][j] = product(d[i][j]): c[i][j] = sum(d[i][j]);
        }
    }
    
    addMatrixName("D");
    drawTripleMatrix(d);
    
    return c;
}

function check(g, h, i, j){
    var m = document.getElementById('m').value;
    
    for(var x = 0; x < m; x++){
        if(g[x][i] < h[j][x])
            return true;
    }
    
    return false;
}

function calculateDkij(a, b, i, j){
    var m = b.length;
    
    var dij = new Array();
    dij.length = m;
    
    for(var k = 0; k < m; k++)
        dij[k] = a[i][k] + b[k][j];

    return dij;
}

function product(dij){
    var m = dij.length;
    
    var cij = 1;
    
    for(var k = 0; k < m; k++)
        cij *= dij[k];
    
    return cij;
}

function sum(dij){
    var m = dij.length;
    
    var cij = 0;
    
    for(var k = 0; k < m; k++)
        cij += dij[k];
    
    return cij;
}

function drawDoubleMatrix(matrix){
    var table = document.createElement("table");
    configureTable(table);
    
    var matrixX = matrix.length;
    var matrixY = matrix[0].length;
    
    var tableRow = document.createElement("tr");
    var tableHeader = document.createElement("th");
    var text = document.createTextNode("i\\j");
    tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);
    
    for(var colNum = 0; colNum < matrixY; colNum++){
        tableHeader = document.createElement("th");
        text = document.createTextNode(colNum.toString(10));
        tableHeader.appendChild(text);
        tableRow.appendChild(tableHeader);
    }
    
    table.appendChild(tableRow);
    
    var height = 50;

    for(var rowNum = 0; rowNum < matrixX; rowNum++){
        var tableRow = document.createElement("tr");
        var tableData = document.createElement("td");
        var text = rowNum.toString(10);
        tableData.innerHTML = text;
        tableData.setAttribute("height", height);
        tableRow.appendChild(tableData);
        
        table.appendChild(tableRow);
    }
    
    var tableRows = table.rows;
    
    for(var rowNum = 1; rowNum <= matrixX; rowNum++){
        var tableRow = tableRows[rowNum];
        for(var colNum = 0; colNum < matrixY; colNum++){           
            var tableData = document.createElement("td");
            var text = matrix[rowNum - 1][colNum].toString(10);
            tableData.innerHTML = text;
            tableData.setAttribute("height", height);
            tableRow.appendChild(tableData);           
        }
    }
    
    document.body.appendChild(table);
}

function drawTripleMatrix(matrix){
    var table = document.createElement("table");
    configureTable(table);
    
    var matrixX = matrix.length;
    var matrixY = matrix[0].length;
    var matrixZ = matrix[0][0].length;
    
    var tableRow = document.createElement("tr");
    var tableHeader = document.createElement("th");
    var text = document.createTextNode("i-j\\k");
    tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);
    
    for(var depthNum = 0; depthNum < matrixZ; depthNum++){
        tableHeader = document.createElement("th");
        text = document.createTextNode(depthNum.toString(10));
        tableHeader.appendChild(text);
        tableRow.appendChild(tableHeader);
    }
    
    table.appendChild(tableRow);
    
    var height = 50;

    for(var rowNum = 0; rowNum < matrixX; rowNum++){
        for(var colNum = 0; colNum < matrixY; colNum++){
            var tableRow = document.createElement("tr");
            var tableData = document.createElement("td");
            var text = rowNum.toString(10) + "-" + colNum.toString(10);
            tableData.innerHTML = text;
            tableData.setAttribute("height", height);
            tableRow.appendChild(tableData);

            table.appendChild(tableRow);
        }
    }
    
    var tableRows = table.rows;
    
    var tableRowNum = 1;
    for(var rowNum = 0; rowNum < matrixX; rowNum++){
        for(var colNum = 0; colNum < matrixY; colNum++, tableRowNum++){
            var tableRow = tableRows[tableRowNum];   
            for(var depthNum = 0; depthNum < matrixZ; depthNum++){
                var tableData = document.createElement("td");
                var text = matrix[rowNum][colNum][depthNum].toString(10);
                tableData.innerHTML = text;
                tableData.setAttribute("height", height);
                tableRow.appendChild(tableData);
            }
        }
    }
    
    document.body.appendChild(table);
}

function configureTable(table){
    var width = 1000;
    table.setAttribute("width", width);
    table.setAttribute("border", "1");
    table.setAttribute("bordercolor", "black");
    table.setAttribute("align", "center");
}

function addMatrixName(name){
    addDocumentVerticalSpaces(2);
    var paragraph = document.createElement("p");
    paragraph.setAttribute("align", "center");
    paragraph.innerHTML = name;
    document.body.appendChild(paragraph);
}

function addDocumentVerticalSpaces(number){
    for(var iter = 0; iter < number; iter++){
        var br = document.createElement("br");
        document.body.appendChild(br);
    }
}