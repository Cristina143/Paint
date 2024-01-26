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

            lineaDirecto(x1,y1,x2,y2,ctx);
        
            //Los valores vuelven a su valor original
            bn=0;
            x1=0;
            y1=0;
        }
        
        ctx.closePath();
        ctx.stroke();

    });
}


function lineaDirecto(x1,y1,x2,y2,ctx){
    var dx = x2-x1;
    var dy = y2-y1;

    if(Math.abs(dx) >= Math.abs(dy)){
        var m = dy/dx;
        b = y1-(m*x1);
        if(dx<0){
            dx = -1;
        }else{
            dx=1;
        }

        while(x1!=x2){
            x1 += dx;
            y1 = Math.round( m * x1 + b);
            if(y1>=0){
                ctx.fillRect(x1, y1, 1, 1);
            }else{
                ctx.fillRect(x1, Math.abs(y1), 1, 1);

            }

        }

    }else{
        
        if(dy!=0){
            var m = dx/dy;
            b = x1-(m*y1);
        if(dy<0){
            dy = -1;
        }else{
            dy = 1;
        }
        y1 = parseInt(y1);
        while(y1 != y2){
            y1 = y1 + dy;
            x1 = Math.round( (m * y1) + b);
            if(y1>=0){
                ctx.fillRect(x1, y1, 1, 1);
            }else{
                ctx.fillRect(x1, Math.abs(y1), 1, 1);
            }
        }
        }
    }
}
