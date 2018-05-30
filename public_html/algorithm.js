document.getElementById('run').addEventListener('click', main);

function main(){
    var checkingAnswer = checkInput();
    
    if(!checkingAnswer)
        return;
    
    var p = document.getElementById('p').value;
    var m = document.getElementById('m').value;
    var q = document.getElementById('q').value;
    
    var a = generateMatrix(p, m);
    var b = generateMatrix(m, q);
    var g = generateMatrix(m, p);
    var h = generateMatrix(q, m);
  
    drawDoubleMatrix(a, "A");
    drawDoubleMatrix(b, "B");
    drawDoubleMatrix(g, "G");
    drawDoubleMatrix(h, "H");
    
    var c = calculateC(a, b, g, h);
    
    drawDoubleMatrix(c, "C");
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
    
    var r3s31 = 0;
    var r3s32 = 0;
    
    for(var i = 0; i < p; i++){
        c[i] = new Array();
        c[i].length = q;
        d[i] = new Array();
        d[i].length = q;
        for(var j = 0; j < q; j++){
            var answer = check(g, h, i, j);
            
            d[i][j] = calculateDkij(a, b, i, j);
            
            if(answer){
                c[i][j] = product(d[i][j]);
                r3s31++;
            }
            else{
                c[i][j] = sum(d[i][j]);
                r3s32++;
            }
        }
    }
    
    drawTripleMatrix(d, "D");
    
    var divRate = findDivRate(r3s31, r3s32);
    
    printMetric(divRate, "Коэффициент расхождения");
    
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
        dij[k] = a[i][k] * b[k][j];

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

function findLsum(r3s31, r3s32){
    var p = document.getElementById('p').value;
    var q = document.getElementById('q').value;
    var m = document.getElementById('m').value;
    
    var sum = document.getElementById('sum').value;
    var product = document.getElementById('product').value;
    var compare = document.getElementById('compare').value;
    
    var r = p * q;
    var lCompare = compare * m;
    var lCalculateDkij = product * m;
    var lProduct = product * m;
    var lSum = sum * m;
    
    var lSum = (lCompare + lCalculateDkij) * r + lProduct * r3s31 + lSum * r3s32;
    
    return lSum;
}

function findLavg(r3s31, r3s32){
    var p = document.getElementById('p').value;
    var q = document.getElementById('q').value;
    var m = document.getElementById('m').value;
    
    var sum = document.getElementById('sum').value;
    var product = document.getElementById('product').value;
    var compare = document.getElementById('compare').value;    
        
    var r = p * q;
    var l1s1 = compare * m;
    var l2s1 = product * m;
    var l3s1 = product * m;
    var l3s2 = sum * m;
    
    var lAvg = (1 / r) * ((l1s1 + l2s1) * r + l3s1 * Math.pow(r3s31, 2) 
             + l3s2 * Math.pow(r3s32, 2));
     
    return lAvg;
}

function findDivRate(r3s31, r3s32){
    var lSum = findLsum(r3s31, r3s32);
    var lAvg = findLavg(r3s31, r3s32);
    
    var divRate = lSum / lAvg;
    return divRate;
}

function drawDoubleMatrix(matrix, matrixName){
    addCennter(matrixName);
    
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

function drawTripleMatrix(matrix, matrixName){
    addCennter(matrixName);
    
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

function addCennter(name){
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

function printMetric(metric, metricName){
    addCennter(metricName + ": " + metric);
}

function checkInput(){
    var inputMas = new Array();
    inputMas.length = 3;
    inputMas[0] = document.getElementById('p').value;
    inputMas[1] = document.getElementById('m').value;
    inputMas[2] = document.getElementById('q').value;

    for(var iter = 0; iter < inputMas.length; iter++){
        if(inputMas[iter].search(/\D/) > -1){
            alert("Присутствие посторонних символов!");
            return(false);
        }

        var number = +(inputMas[iter]);
        if(number <= 0){
            alert("Неверное число в вводе или ввод не произведён!");
            return(false);
        }
    }
    return true;
}