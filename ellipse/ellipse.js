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
            let h,k, radio; 
            h=(x1+x2)/2;
            k=(y1+y2)/2;
            radio=Math.sqrt( Math.pow(x1-h,2)+Math.pow(y1-k,2));
            ejex=Math.abs(x1-x2);
            ejey=Math.abs(y1-y2);
            if(ejex>=ejey){
                elipsePuntoMedio(h,k,radio,radio/2,ctx);  
            }else{
                elipsePuntoMedio(h,k,radio/2,radio,ctx); 
            }
            
            //Los valores vuelven a su valor original
            bn=0;
            x1=0;
            y1=0;
        }
        
        ctx.closePath();
        ctx.stroke();

    });
}

function elipsePuntoMedio(xc, yc, rx, ry, ctx){
    var x,y,rx2,ry2,p1,p2;
    x=0;
    y=ry;
    rx2=Math.pow(rx,2);
    ry2=Math.pow(ry,2);
    p1=ry2-(rx2*ry)+(0.25*rx2);
    while((ry2*x)<(rx2*y)){
        if(p1<0){ 
            x++;
            p1=p1+(2*ry2*x)+ry2;
        }
        else{
            x++; y--;
            p1=p1+(2*ry2*x)-(2*rx2*y)+ry2;
        }
        ctx.fillRect(xc+x, yc+y, 1, 1);
        ctx.fillRect(xc-x, yc+y, 1, 1);
        ctx.fillRect(xc+x, yc-y, 1, 1);
        ctx.fillRect(xc-x, yc-y, 1, 1);
    }
    p2=(ry2)*Math.pow((x+0.5),2)+(rx2)*Math.pow((y-1),2)-(rx2*ry2);
    while(y>0){
        if (p2>0){
            y--;
            p2=p2-(2*rx2*y) +rx2;
        }else{
            x++; 
            y--;
            p2=p2+ (2*ry2*x)-(2*rx2*y)+rx2;
        }
        ctx.fillRect(xc+x, yc+y, 1, 1);
        ctx.fillRect(xc-x, yc+y, 1, 1);
        ctx.fillRect(xc+x, yc-y, 1, 1);
        ctx.fillRect(xc-x, yc-y, 1, 1);
    }
}