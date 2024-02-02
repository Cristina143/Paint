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
            circuloIncremental(h,k,radio,ctx);
            //Los valores vuelven a su valor original
            bn=0;
            x1=0;
            y1=0;
        }
        
        ctx.closePath();
        ctx.stroke();

    });
}

function circuloIncremental(xc, yc, r, ctx){
    var tx, ty, dt, cc, ss, x, y, aux;
    dt=1/r;
    cc=Math.cos(dt);
    ss=Math.sin(dt);
    y=r; 
    x=0;
    while(y>=Math.abs(x)){
        tx=Math.round(x);
        ty=Math.round(y);
        
        ctx.fillRect(xc+tx,yc+ty,1,1);
        ctx.fillRect(xc-tx,yc+ty,1,1);
        ctx.fillRect(xc+tx,yc-ty,1,1);
        ctx.fillRect(xc-tx,yc-ty,1,1);
        ctx.fillRect(xc+ty,yc+tx,1,1);
        ctx.fillRect(xc+ty,yc-tx,1,1);
        ctx.fillRect(xc-ty,yc+tx,1,1);
        ctx.fillRect(xc-ty,yc-tx,1,1);
        aux=x;
        x=x*cc-y*ss;
        y=y*cc+aux*ss;
    }
}