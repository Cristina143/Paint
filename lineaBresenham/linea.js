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

            lineaBresenham(x1,y1,x2,y2,ctx);
        
            //Los valores vuelven a su valor original
            bn=0;
            x1=0;
            y1=0;
        }
        
        ctx.closePath();
        ctx.stroke();

    });
}


function lineaBresenham(x1,y1,x2,y2,ctx){
    //ALGORITMO
    var x, y, ax, ay, s1, s2, temp, intercambio, p;
    
    x = x1;
    y = y1;
    ax = Math.abs(x2-x1);
    ay = Math.abs(y2-y1);
    s1 = signo(x2-x1);
    s2 = signo(y2-y1);

    if(ay>ax){
        temp=ax;
        ax=ay;
        ay=temp;
        intercambio = 1;
    }else{
        intercambio = 0;
    }

    p = 2*ay-ax;

    for(i=1;i<=ax;i++){
        if(y>=0){
            ctx.fillRect(x, y, 1, 1);
        }else{
            ctx.fillRect(x, Math.abs(y), 1, 1);

        }

        if(p>=0){
            if (intercambio==1){
                x= parseFloat(x) + parseFloat(s1);
            }else{
                y= parseFloat(y) + parseFloat(s2);
            }
                p = p - (2*ax);
        }
        
        if (intercambio==1){
            y=parseFloat(y) + parseFloat(s2);
        }else{
            x= parseFloat(x) + parseFloat(s1);
        }
        p = p + 2*ay;
    }

    /*
        p=2Deltay-deltax
        si p<0
            p-k + 1 = p-k + 2deltay
            x++;
        else 
            p-k+1= p-k + 2deltaY-2deltax
            x++
            y++
    */
}

function signo(num){
    var resultado;
    if(num<0)
        resultado=-1;
    if(num>0)
        resultado=1;
    if(num==0)
        resultado=0;

    return(resultado);
}
