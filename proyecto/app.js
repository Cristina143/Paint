function bresenham(x1, y1, x2, y2, ctx) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;

    let err = dx - dy;

    while (true) {
        ctx.fillRect(x1, y1, 1, 1);

        if (x1 === x2 && y1 === y2) {
            break;
        }

        const e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }
}

function lineaDda(x1, y1, x2, y2, ctx, color, grosor) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var x = x1;
    var y = y1;

    if (Math.abs(dx) > Math.abs(dy))
        var pasos = Math.abs(dx);
    else
        var pasos = Math.abs(dy);

    if (pasos == 0) {
        ctx.fillStyle = color;
        ctx.fillRect(Math.round(x), Math.round(y), grosor, grosor);
    } else {
        var xInc = parseFloat(dx / pasos);
        var yInc = parseFloat(dy / pasos);
        console.log('Pasos antes del for: '+pasos);
        for (var i = 0; i <= pasos; i++) {
            console.log('i en el for: '+i);
            ctx.fillStyle = color;
            if (y >= 0) {
                ctx.fillRect(x, y, grosor, grosor);
            } else {
                ctx.fillRect(x, Math.abs(y), grosor, grosor);
            }
            x = parseFloat(x) + parseFloat(xInc);
            y = parseFloat(y) + parseFloat(yInc);
        }
    }
}

//cuadrado
function Cuadrado(x, y, x2, y2, ctx, color, grosor, angulo) {
    let length = Math.min(Math.abs(x2 - x), Math.abs(y2 - y));
    let centerX = (x + x2) / 2;
    let centerY = (y + y2) / 2;

    // Calcular los vértices del cuadrado a partir del centro, la longitud de un lado y el ángulo de rotación
    let points = [
        [centerX - length / 2, centerY - length / 2],
        [centerX + length / 2, centerY - length / 2],
        [centerX + length / 2, centerY + length / 2],
        [centerX - length / 2, centerY + length / 2]
    ];

    // Rotar los vértices del cuadrado
    let rotatedPoints = points.map(([px, py]) => {
        let dx = px - centerX;
        let dy = py - centerY;
        return [
            dx * Math.cos(angulo) - dy * Math.sin(angulo) + centerX,
            dx * Math.sin(angulo) + dy * Math.cos(angulo) + centerY
        ];
    });

    // Dibujar el cuadrado rotado
    for (let i = 0; i < rotatedPoints.length; i++) {
        let [xStart, yStart] = rotatedPoints[i];
        let [xEnd, yEnd] = rotatedPoints[(i + 1) % rotatedPoints.length];
        lineaDda(xStart, yStart, xEnd, yEnd, ctx, color, grosor);
    }
}

function Rombo(x, y, x2, y2, ctx, color, grosor, angulo) {
    let centerX = (x + x2) / 2;
    let centerY = (y + y2) / 2;
    let width = Math.abs(x2 - x);
    let height = Math.abs(y2 - y);
    let halfDiagonal = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));

    let rotatedPoints = [
        [centerX, centerY - halfDiagonal], // Punto superior
        [centerX + halfDiagonal, centerY], // Punto derecho
        [centerX, centerY + halfDiagonal], // Punto inferior
        [centerX - halfDiagonal, centerY] // Punto izquierdo
    ];

    ctx.beginPath();
    ctx.moveTo(rotatedPoints[0][0], rotatedPoints[0][1]);
    for (let i = 1; i < rotatedPoints.length; i++) {
        ctx.lineTo(rotatedPoints[i][0], rotatedPoints[i][1]);
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = grosor;
    ctx.stroke();
}

//rectangle
function Rectangulo(x, y, x2, y2, ctx, color, grosor, angulo) {
    let width = Math.abs(x2 - x);
    let height = Math.abs(y2 - y);
    let centerX = (x + x2) / 2;
    let centerY = (y + y2) / 2;

    // Calcula los puntos del rectángulo sin rotación
    let points = [
        [centerX - width / 2, centerY - height / 2], // Esquina superior izquierda
        [centerX + width / 2, centerY - height / 2], // Esquina superior derecha
        [centerX + width / 2, centerY + height / 2], // Esquina inferior derecha
        [centerX - width / 2, centerY + height / 2]  // Esquina inferior izquierda
    ];

    // Aplica la rotación a cada punto
    let rotatedPoints = points.map(([px, py]) => {
        let dx = px - centerX;
        let dy = py - centerY;
        return [
            dx * Math.cos(angulo) - dy * Math.sin(angulo) + centerX,
            dx * Math.sin(angulo) + dy * Math.cos(angulo) + centerY
        ];
    });

    // Dibuja las líneas del rectángulo
    for (let i = 0; i < rotatedPoints.length; i++) {
        let [xStart, yStart] = rotatedPoints[i];
        let [xEnd, yEnd] = rotatedPoints[(i + 1) % rotatedPoints.length];
        lineaDda(xStart, yStart, xEnd, yEnd, ctx, color, grosor);
    }
}


function Trapecio(x, y, x2, y2, ctx, color, grosor, angulo) {
    let width = Math.abs(x2 - x);
    let height = Math.abs(y2 - y);
    let xSign = Math.sign(x2 - x);
    let ySign = Math.sign(y2 - y);

    let x1 = x + width * xSign;
    let y1 = y + height * ySign;

    let centerX = (x + x1) / 2;
    let centerY = (y + y1) / 2;

    let points = [
        [x + width / 4, y],
        [x + width * 3 / 4, y],
        [x1, y1],
        [x, y1]
    ];
    let rotatedPoints = points.map(([px, py]) => {
        let dx = px - centerX;
        let dy = py - centerY;
        return [
            dx * Math.cos(angulo) - dy * Math.sin(angulo) + centerX,
            dx * Math.sin(angulo) + dy * Math.cos(angulo) + centerY
        ];
    });

    for (let i = 0; i < rotatedPoints.length; i++) {
        let [xStart, yStart] = rotatedPoints[i];
        let [xEnd, yEnd] = rotatedPoints[(i + 1) % rotatedPoints.length];
        lineaDda(xStart, yStart, xEnd, yEnd, ctx, color, grosor);
    }
}

function circuloIncremental(xc, yc, r, ctx, color, grosor) {
    let x = r;
    let y = 0;
    let error = 1 - r;

    while (x >= y) {
        // Dibuja los píxeles del círculo con el color y grosor especificados
        ctx.fillStyle = color;
        ctx.fillRect(xc + x, yc + y, grosor, grosor);
        ctx.fillRect(xc + y, yc + x, grosor, grosor);
        ctx.fillRect(xc - y, yc + x, grosor, grosor);
        ctx.fillRect(xc - x, yc + y, grosor, grosor);
        ctx.fillRect(xc - x, yc - y, grosor, grosor);
        ctx.fillRect(xc - y, yc - x, grosor, grosor);
        ctx.fillRect(xc + y, yc - x, grosor, grosor);
        ctx.fillRect(xc + x, yc - y, grosor, grosor);

        y++;
        if (error <= 0) {
            error += 2 * y + 1;
        } else {
            x--;
            error += 2 * (y - x) + 1;
        }
    }
}

function trazarPoligono( x1, y1, sides, ctx, color, grosor, x2, y2,  rotationAngle ) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    var R = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); // Calcula el radio a partir de los puntos extremos
    var rad = (2 * Math.PI) / sides;

    ctx.lineWidth = grosor;
    ctx.beginPath();
    var x, y, x0, y0;
    for (var i = 0; i <= sides; i++) {
        x = x1 + R * Math.cos(rad * i + rotationAngle); // Aplica el ángulo de rotación
        y = y1 + R * Math.sin(rad * i + rotationAngle);
        if (i > 0) {
            ctx.lineTo(x, y);
        } else {
            x0 = x;
            y0 = y;
        }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function elipsePuntoMedio(xc, yc, rx, ry, ctx, color, grosor, angulo) {
    var x, y, rx2, ry2, p1, p2;
    x = 0;
    y = ry;
    rx2 = Math.pow(rx, 2);
    ry2 = Math.pow(ry, 2);
    p1 = ry2 - (rx2 * ry) + (0.25 * rx2);
    while ((ry2 * x) < (rx2 * y)) {
        if (p1 < 0) {
            x++;
            p1 = p1 + (2 * ry2 * x) + ry2;
        } else {
            x++;
            y--;
            p1 = p1 + (2 * ry2 * x) - (2 * rx2 * y) + ry2;
        }
        // Aplicar el color y grosor antes de dibujar el punto
        ctx.fillStyle = color;
        ctx.fillRect(xc + x, yc + y, grosor, grosor);
        ctx.fillRect(xc - x, yc + y, grosor, grosor);
        ctx.fillRect(xc + x, yc - y, grosor, grosor);
        ctx.fillRect(xc - x, yc - y, grosor, grosor);
    }
    p2 = (ry2) * Math.pow((x + 0.5), 2) + (rx2) * Math.pow((y - 1), 2) - (rx2 * ry2);
    while (y > 0) {
        if (p2 > 0) {
            y--;
            p2 = p2 - (2 * rx2 * y) + rx2;
        } else {
            x++;
            y--;
            p2 = p2 + (2 * ry2 * x) - (2 * rx2 * y) + rx2;
        }
        // Aplicar el color y grosor antes de dibujar el punto
        ctx.fillStyle = color;
        ctx.fillRect(xc + x, yc + y, grosor, grosor);
        ctx.fillRect(xc - x, yc + y, grosor, grosor);
        ctx.fillRect(xc + x, yc - y, grosor, grosor);
        ctx.fillRect(xc - x, yc - y, grosor, grosor);
    }
}

function clearCanvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const basecolorInput = document.getElementById("color");
    var color = basecolorInput.value;

    const basewidthInput = document.getElementById("grosor");
    var grosor = basewidthInput.value;

    const sidefilter = document.getElementById("sidefilter");
    var sidenum = document.getElementById("sides").value;

    let isDrawing = false;
    let x1, y1;
    let tempX2, tempY2;
    let angle = 0;
    let selectedMode = null;

    let history = [];
    
    let currentDraw = [];
    let historyIndex = -1;

    let isMoving = false
    let selectedShape = null; 

    document.getElementById("lineaBtn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "linea";
    });
    document.getElementById("textBtn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "lapiz";
    });

    document.getElementById("cuadradoBtn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "cuadrado";
    });

    document.getElementById("rectBtn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "rectangulo";
    });
    document.getElementById("romboBtn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "rombo";
    });
    document.getElementById("trapbtn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "trapecio";
    });

    document.getElementById("circleBtn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "circulo";
    });

    this.getElementById("polybtn").addEventListener("click", function () {
        sidefilter.style.visibility = "visible";
        selectedMode = "poligono";
    });

    this.getElementById("ovalBtn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "ovalo";
    });

    document.getElementById("moveBtn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "move";
    });
    document.getElementById("resizeBtn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "resize";
    });
    //borrar
    document.getElementById("deletebtn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "delete";
    });
    document.getElementById("roteBtn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "rotate";
    });
    //sendBotton
    document.getElementById("sendbottom_btn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "bottom";
    });
    //sendfront
    document.getElementById("sendfront_btn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "front";
    });
    //sendBack
    document.getElementById("sendback_btn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "back";
    });
    //SendUp
    document.getElementById("sendup_btn").addEventListener("click", function () {
        sidefilter.style.visibility = "hidden";
        selectedMode = "up";
    });
    document.getElementById("un_Btn").addEventListener("click", function () {
        if (historyIndex > 0) {
            historyIndex--;
            printHistory();
        }
    });
    let changes = [];
    document.getElementById("clr_Btn").addEventListener("click", function () {
        clearCanvas(ctx, canvas);history = [];currentDraw = [];historyIndex = -1; changes = [];
    });
    
    
    document.getElementById("re_Btn").addEventListener("click", function () {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            //printHistory();
        }
    });

    document.getElementById("exportBtn").addEventListener("click", function () {
        const data = JSON.stringify(history);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "drawing.json";
        a.click();
    });

    document.getElementById("importBtn").addEventListener("click", function () {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.onchange = function (event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                history = JSON.parse(event.target.result);
                historyIndex = history.length - 1;
                printHistory();
            };
            reader.readAsText(file);
        };
        input.click();
    });
    
    
    document.getElementById("saveBtn").addEventListener("click", function () {
        const data = canvas.toDataURL("image/png");
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "white"; // Set the background color to white
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with white
        const a = document.createElement("a");
        a.href = data;
        a.download = "drawing.png";
        a.click();
    });

    document.getElementById("convert_to_pdf").addEventListener("click", function () {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("download.pdf");
    });
    

    this.getElementById("sides").addEventListener("change", function () {
        sidenum = document.getElementById("sides").value;
    });

    basecolorInput.addEventListener("change", function () {
        const colorInput = document.getElementById("color");
        color = colorInput.value;
    });

    basewidthInput.addEventListener("change", function () {
        const widthInput = document.getElementById("grosor");
        grosor = widthInput.value;
    });
    
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);

    canvas.addEventListener("touchstart", (event) => {event.preventDefault();event.stopPropagation();startDrawing(event.touches[0])});
    canvas.addEventListener("touchmove", (event) => {event.preventDefault();event.stopPropagation();draw(event.touches[0])});
    canvas.addEventListener("touchend", (event) => {event.preventDefault();event.stopPropagation();stopDrawing(event.changedTouches[0])});


    function getCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.round(event.clientX - rect.left);
        const y = Math.round(event.clientY - rect.top);
        return { x, y };
    }
    
    function startDrawing(event) {
        const { x, y } = getCoordinates(event);
        if (["move", "resize", "rotate"].includes(selectedMode)) {
            selectedShape = selectShape(x, y);
            isMoving = true;
        } else if (selectedMode === "delete") {
            const shape = selectShape(x, y);
            if (shape) {
                history.splice(history.indexOf(selectedShape), 1);
                printHistory();
            }
            if (shape === "lapiz") {
                changes.push(selectShape);
                history.splice(history.indexOf(selectedShape), 1);
                printHistory();
            }
        }else if (selectedMode === "bottom") {
            let shaped = selectShape(x, y, true);
            invert_position(shaped.index,0,history);
            printHistory();
            console.log(history);
        }else if (selectedMode === "front") {
            let shaped = selectShape(x, y, true);
            invert_position(shaped.index,historyIndex,history);
            printHistory();
            console.log(history);
        }else if (selectedMode === "back") {
            let shaped = selectShape(x, y, true);
            if (shaped.index <1){
                return;
            }
            invert_position(shaped.index,shaped.index-1,history);
            printHistory();
            console.log(history);
        }else if (selectedMode === "up") {
            let shaped = selectShape(x, y, true);
            if (shaped.index == historyIndex){
                return;
            }
            invert_position(shaped.index,shaped.index+1,history);
            printHistory();
            console.log(history);
        }else {
            isDrawing = true;
            [x1, y1, tempX2, tempY2] = [x, y, x, y];
        }
    }
    let currentfree = [];
    function draw(event) {
        const { x, y } = getCoordinates(event);
        if (isMoving && selectedShape) {
            if (selectedMode === "move") {
                moveShape(selectedShape, x, y);
            } else if (selectedMode === "resize") {
                resizeShape(selectedShape, x, y);
            } else if (selectedMode === "rotate") {
                rotateShape(selectedShape, x, y);
            }
            printHistory();
            drawPreview();
        } else if (isDrawing) {
            if (selectedMode === "lapiz") {
                currentfree.push({ type: "line", x1: tempX2, y1: tempY2, x2: x, y2: y, color: color, grosor: grosor });
                [tempX2, tempY2] = [x, y];
            } else {
                [tempX2, tempY2] = [x, y];
            }
            printHistory();
            drawPreview();
        }
    }

    function stopDrawing(event) {
        if (isMoving) {
            isMoving = false;
        } else if (isDrawing) {
            isDrawing = false;
            const { x: x2, y: y2 } = getCoordinates(event);
            const shape = { x1, y1, x2, y2, color, grosor, sides };
            const shapeTypes = {
                "linea": { ...shape, sides: 2, type: "linea"},
                "cuadrado": { ...shape, sides: 4, type: "cuadrado", angulo: 0},
                "rombo": { ...shape, sides: 4, type: "rombo", angulo: 0},
                "rectangulo": { ...shape, sides: 4, type: "rectangulo", angulo: 0},
                "trapecio": { ...shape, sides: 4, type: "trapecio", angulo: 0},
                "circulo": { ...shape, sides: 1, type: "circulo", r: Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) },
                "poligono": { ...shape, type: "poligono", sides: sidenum, points: calculatePolygonPoints(x1, y1, x2, y2, sidenum), angulo: 0},
                "ovalo": { ...shape, sides: 1, type: "ovalo", angulo: 0},
                "lapiz": {type: "lapiz", points: [...currentfree], angulo: 0}
            };
            
            console.log(history);
            currentfree = [];
            currentDraw.push(shapeTypes[selectedMode] || {});
            if (currentDraw.length > 0) {
                history.splice(historyIndex + 1);
                history.push(...currentDraw);
                historyIndex = history.length - 1;
                printHistory();
                currentDraw = [];
            }
        }
    }
    function drawShape(shape, ctx, color, grosor, x1, y1, x2, y2, sides, angulo, points) {
        switch (shape) {
            case "lapiz":
                points.forEach(draw => {
                    lineaDda(draw.x1, draw.y1, draw.x2, draw.y2, ctx, draw.color, draw.grosor);
                });
                break;
            case "linea":
                lineaDda(x1, y1, x2, y2, ctx, color, grosor);
                break;
            case "cuadrado":
                Cuadrado(x1, y1, x2, y2, ctx, color, grosor, angulo);
                break;
            case "rombo":
                Rombo(x1, y1, x2, y2, ctx, color, grosor, angulo);
            break;
            case "trapecio":
                Trapecio(x1, y1, x2, y2, ctx, color, grosor, angulo);
            break;
            case "rectangulo":
                Rectangulo(x1, y1, x2, y2, ctx, color, grosor, angulo);
                break;
            case "circulo":
                const r = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                circuloIncremental(x1, y1, r, ctx, color, grosor);
                break;
            case "poligono":
                trazarPoligono(x1, y1, sides, ctx, color, grosor, x2, y2, angulo);
                break;
            case "ovalo":
                elipsePuntoMedio(x1, y1, x2, y2, ctx, color, grosor, angulo);
                break;
            default:
                break;
        }
    }

    function drawPreview() {
        if (selectedMode === "poligono") {
            trazarPoligono(x1, y1, sidenum, ctx, color, grosor, tempX2, tempY2, angle);
        } else {
            drawShape(selectedMode, ctx, color, grosor, x1, y1, tempX2, tempY2, undefined, angle, currentfree);
        }
    }

    function printHistory() {
        clearCanvas(ctx, canvas);
        for (let i = 0; i <= historyIndex; i++) {
            const draw = history[i];
            drawShape(draw.type, ctx, draw.color, draw.grosor, draw.x1, draw.y1, draw.x2, draw.y2, draw.sides, draw.angulo, draw.points);
        }
    }
    function invert_position(historyIndex, position, history){ 
        var temp = history[historyIndex];
        history[historyIndex] = history[position];
        history[position] = temp;
    }

    function selectShape(x, y, inv) {
        // Recorre el array de formas
        
        for (let i = 0; i < history.length; i++) {
            const shape = history[i];
            // Comprueba si las coordenadas dadas están dentro de la forma
            if (isInsideShape(x, y, shape)) {
                if (inv===true){
                    return {shape: shape, index: i};
                }
                return shape;
            }
            if (shape.type ==="lapiz" ){
                for (let j = 0; j < shape.points.length; j++) {
                    const draw = shape.points[j];
                    if (isInsideShape(x, y, draw)) {
                        return shape;
                    }
                }
            }
        }
        return null;
    }

    function updatePolygonPoints(shape, dx, dy) {
        for (let i = 0; i < shape.points.length; i++) {
            shape.points[i].x += dx;
            shape.points[i].y += dy;
        }
    }

    function moveShape(shape, x, y) {
        const dx = x - shape.x1;
        const dy = y - shape.y1;
        shape.x1 += dx;
        shape.y1 += dy;
        shape.x2 += dx;
        shape.y2 += dy;

        if (shape.type === "poligono") {
            updatePolygonPoints(shape, dx, dy);
        }
    }

    function resizeShape(shape, x, y) {
        const scaleFactor = 0.1;
        const dx = (x - shape.x2) * scaleFactor;
        const dy = (y - shape.y2) * scaleFactor;

        shape.x2 += dx;
        shape.y2 += dy;

        if (shape.type === "poligono") {
            updatePolygonPoints(shape, dx, dy);
        }
    }
    function rotateShape(shape, x, y) {
        const scaleFactor = 0.1;
        const dx = (x - shape.x2)* scaleFactor;
        const dy = (y - shape.y2)* scaleFactor;

        shape.angulo = Math.atan2(dy, dx);

        if (shape.type === "linea") {
            const dx = x - shape.x1;
            const dy = y - shape.y1;
            shape.x1 += dx;
            shape.y1 += dy;
        }
    }

    function isInsideShape(x, y, shape) {
        switch (shape.type) {
            case "lapiz":
                for (let i = 0; i < shape.points.length; i++) {
                    const point = shape.points[i];
                    if (point.x1 === x && point.y1 === y ) {
                        console.log("punto");
                        return true;
                    }
                }
                break;
            case "linea":
                // Para una línea, comprobamos si el punto está cerca de la línea dentro de un cierto margen de error
                const dist = Math.abs((shape.y2 - shape.y1) * x - (shape.x2 - shape.x1) * y + shape.x2 * shape.y1 - shape.y2 * shape.x1) / Math.sqrt(Math.pow(shape.y2 - shape.y1, 2) + Math.pow(shape.x2 - shape.x1, 2));
                return dist <= 5; // Aquí, 5 es el margen de error
            case "cuadrado":
            case "rectangulo":
            case "rombo":
            case "trapecio":
                // Para un rectángulo o un cuadrado, puedes usar la misma lógica
                return x >= shape.x1 && x <= shape.x2 && y >= shape.y1 && y <= shape.y2;
            case "circulo":
                // Para un círculo, comprueba si la distancia al centro es menor o igual que el radio
                const dx = x - shape.x1;
                const dy = y - shape.y1;
                return Math.sqrt(dx * dx + dy * dy) <= shape.r;
            case "poligono":
                // Para un polígono, puedes usar el algoritmo de ray casting
                if (!shape.points) {
                    console.error('El polígono no tiene puntos definidos');
                    return false;
                }
                let inside = false;
                for (let i = 0, j = shape.points.length - 1; i < shape.points.length; j = i++) {
                    const xi = shape.points[i].x, yi = shape.points[i].y;
                    const xj = shape.points[j].x, yj = shape.points[j].y;

                    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                    if (intersect) inside = !inside;
                }
                return inside;
            case "ovalo":
                // Para un óvalo, puedes usar una versión modificada de la comprobación del círculo
                const dxOval = x - shape.x1;
                const dyOval = y - shape.y1;
                const width = shape.x2 - shape.x1;
                const height = shape.y2 - shape.y1;
                return (dxOval * dxOval) / (width * width) + (dyOval * dyOval) / (height * height) <= 1;
            default:
                return false;
        }
    }
    function calculatePolygonPoints(x1, y1, x2, y2, sides) {
        const points = [];
        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;
        const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 2;
        const angleStep = (2 * Math.PI) / sides;
    
        for (let i = 0; i < sides; i++) {
            const angle = i * angleStep;
            const pointX = centerX + radius * Math.cos(angle);
            const pointY = centerY + radius * Math.sin(angle);
            points.push({ x: pointX, y: pointY });
        }
    
        return points;
    }
});