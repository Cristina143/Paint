var x1,y1,x2,y2,bn;
x1=0;
y1=0;
x2=0;
y2=0;
bn=0;

function myFunction(){
    var canvas  = document.getElementById('plano'),
    ctx = canvas.getContext('2d');
    
    //Estilo de las lineas que se trazaran en canvas
    ctx.lineWidth=1; 

    //Funcion que se ejecuta cada vez que se da click
    canvas.addEventListener("click",function(e){
        var xc = new Number();
        var yc = new Number();
        if (event.x != undefined && event.y != undefined){
            xc = event.x;
            yc = event.y;
        }else{// Firefox
            xc = event.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
            yc = event.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
        }

        //Se obtienen coordenadas (Considerando que (0,0) esta en la esquina superior izq)
        
        xc -= canvas.offsetLeft;
        yc -= canvas.offsetTop;
        
        ctx.beginPath();
        if(bn==0){ //Si no se ha dado click, se captura el primer punto
            x1=xc;
            y1=yc;
            bn=1;
            //alert("PUNTO 1: ("+x1+" , "+y1+")");
        }else if(bn==1){//Si ya se dio un click, se captura el segundo punto
            x2=xc;
            y2=yc; 
            
            //alert("PUNTO 2: ("+x2+" , "+y2+")");

            lineaDda(x1,y1,x2,y2,ctx);
        
            //Los valores vuelven a su valor original
            bn=0;
            x1=0;
            y1=0;
        }
        
        ctx.closePath();
        ctx.stroke();

    });
}

function lineaDda(x1,y1,x2,y2,ctx){
    var dx = x2-x1;
    var dy = y2-y1;
    var x = x1;
    var y = y1;

    if (Math.abs(dx) > Math.abs(dy))
        var pasos = Math.abs(dx);
    else
        var pasos = Math.abs(dy);
    
    if (pasos==0){
        ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
    }else{
        var xInc = parseFloat(dx/pasos);
        var yInc = parseFloat(dy/pasos);
        for (i=0; i<=pasos; i++){
            if(y>=0){
                ctx.fillRect(x, y, 1, 1);
            }else{
                ctx.fillRect(x, Math.abs(y), 1, 1);
            }
            x = parseFloat(x) + parseFloat(xInc);
            y = parseFloat(y) + parseFloat(yInc);
        }
    }
}