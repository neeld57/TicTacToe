var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvasLeft = canvas.offsetLeft;
var canvasTop  = canvas.offsetTop;
var region=20;
var regiontracking = [0,0,0,0,0,0,0,0,0,0];
var Ohere= [0,0,0,0,0,0,0,0,0,0];
var turncounter = 0;

function oneaway(){
    if((Ohere[1]+Ohere[2]+Ohere[3]) == 2 || (Ohere[4]+Ohere[5]+Ohere[6]) == 2 || (Ohere[7]+Ohere[8]+Ohere[9]) == 2
    ||(Ohere[1]+Ohere[4]+Ohere[7]) == 2 || (Ohere[2]+Ohere[5]+Ohere[8]) == 2 || (Ohere[3]+Ohere[6]+Ohere[9]) == 2 ||
        (Ohere[1]+Ohere[5]+Ohere[9]) == 2 || (Ohere[3]+Ohere[5]+Ohere[7]) == 2  ){
        return true;
    }
    return false;
}

function Owon(){
    if((Ohere[1]+Ohere[2]+Ohere[3]) == 3 || (Ohere[4]+Ohere[5]+Ohere[6]) == 3 || (Ohere[7]+Ohere[8]+Ohere[9]) == 3
        ||(Ohere[1]+Ohere[4]+Ohere[7]) == 3 || (Ohere[2]+Ohere[5]+Ohere[8]) == 3 || (Ohere[3]+Ohere[6]+Ohere[9]) == 3 ||
        (Ohere[1]+Ohere[5]+Ohere[9]) == 3 || (Ohere[3]+Ohere[5]+Ohere[7]) == 3  ){
        return true;
    }
    return false;
}

function reactOneAway(Ohere,equals){
    if((Ohere[1]+Ohere[2]+Ohere[3]) == equals){
        if(Ohere[1]==0) return 1;
        else if(Ohere[2]==0) return 2;
        else if(Ohere[3]==0) return 3;
    }
    if((Ohere[4]+Ohere[5]+Ohere[6]) == equals ){
        if(Ohere[4]==0) return 4;
        else if(Ohere[5]==0) return 5;
        else if(Ohere[6]==0) return 6;
    }
    if((Ohere[7]+Ohere[8]+Ohere[9]) == equals ){
        if(Ohere[7]==0) return 7;
        else if(Ohere[8]==0) return 8;
        else if(Ohere[9]==0) return 9;
    }
    if((Ohere[1]+Ohere[4]+Ohere[7]) == equals){
        if(Ohere[1]==0) return 1;
        else if(Ohere[4]==0) return 4;
        else if(Ohere[7]==0) return 7;
    }
    if((Ohere[2]+Ohere[5]+Ohere[8]) == equals){
        if(Ohere[2]==0) return 2;
        else if(Ohere[5]==0) return 5;
        else if(Ohere[8]==0) return 8;
    }
    if((Ohere[3]+Ohere[6]+Ohere[9]) == equals){
        if(Ohere[3]==0) return 3;
        else if(Ohere[6]==0) return 6;
        else if(Ohere[9]==0) return 9;
    }
    if((Ohere[1]+Ohere[5]+Ohere[9]) == equals){
        if(Ohere[1]==0) return 1;
        else if(Ohere[5]==0) return 5;
        else if(Ohere[9]==0) return 9;
    }
    if((Ohere[3]+Ohere[5]+Ohere[7]) == equals){
        if(Ohere[3]==0) return 3;
        else if(Ohere[5]==0) return 5;
        else if(Ohere[7]==0) return 7;
    }
    return 0;
}

function computerturn(){
    var didOwin = Owon();
    if(didOwin){
        setTimeout(function(){
            alert("YOU WON!");
            document.location.reload();
        },20);
    }
    if(turncounter==1){
        var keepzeroloop = true;
        while(keepzeroloop) {
            var corners = [[regiontracking[1],1], [regiontracking[3],3], [regiontracking[7],7], [regiontracking[9],9]];
            console.log(corners);
            var hold = Math.floor(Math.random()*4);
            console.log(hold);
            console.log(corners[hold][0]);
            console.log(corners[hold][1]);
            if(corners[hold][0]==0){
                switch(corners[hold][1]){
                    case 1: showX(1); regiontracking[1]=1; Ohere[1] = -1;console.log("picked 1"); keepzeroloop = false; break;
                    case 3: showX(3); regiontracking[3]=1; Ohere[3] = -1;console.log("picked 3");  keepzeroloop = false; break;
                    case 7: showX(7); regiontracking[7]=1; Ohere[7] = -1;console.log("picked 7"); keepzeroloop = false; break;
                    case 9: showX(9); regiontracking[9]=1;Ohere[9] = -1; console.log("picked 9"); keepzeroloop = false; break;
                }
            }
        }
    }
    if(turncounter==2){
        if(oneaway()){
            var numoneaway = reactOneAway(Ohere,2);
            showX(numoneaway);
            regiontracking[numoneaway] = 1;
            Ohere[numoneaway]=-1;
        }
        else{
            var firstgetAt = reactOneAway(Ohere,-1);
            showX(firstgetAt);
            regiontracking[firstgetAt] = 1;
            Ohere[firstgetAt]=-1;
        }
    }
    if(turncounter>2){
        var firstgetAt = reactOneAway(Ohere,-2);
        if(firstgetAt>0){
            showX(firstgetAt);
            regiontracking[firstgetAt] = 1;
            Ohere[firstgetAt]=-1;
            setTimeout(function(){
                alert("THE COMPUTER WON");
                document.location.reload();
            },20);
        }
        else if(oneaway()){
            var numoneaway = reactOneAway(Ohere,2);
            showX(numoneaway);
            regiontracking[numoneaway] = 1;
            Ohere[numoneaway]=-1;
        }
        else{
            var firstgetAt = reactOneAway(Ohere,-1);
            showX(firstgetAt);
            regiontracking[firstgetAt] = 1;
            Ohere[firstgetAt]=-1;
        }
    }
    var sum =0;
    for(var i =1; i<10;i++){
        sum+=regiontracking[i];
    }
    if(sum>8){
        setTimeout(function(){
            alert("IT WAS A TIE!");
            document.location.reload();},20
        );
    }
}

function placeinregion(placement){
    switch(placement){
        case 1 : drawO(100,100); regiontracking [1]=1;break;
        case 2:  drawO(100,300); regiontracking [2]=1;break;
        case 3:  drawO(100,500); regiontracking [3]=1;break;
        case 4:  drawO(300,100); regiontracking [4]=1;break;
        case 5:  drawO(300,300); regiontracking [5]=1;break;
        case 6:  drawO(300,500); regiontracking [6]=1;break;
        case 7:  drawO(500,100); regiontracking [7]=1;break;
        case 8:  drawO(500,300); regiontracking [8]=1;break;
        case 9:  drawO(500,500); regiontracking [9]=1;break;
    }
    Ohere[placement]=1;
    turncounter++;
    computerturn();
}
canvas.addEventListener('click',function seeclick(event){
    var x = event.clientX-canvasLeft;
    var y = event.clientY-canvasTop;
  //  console.log("x: " + x + " y: " + y);

        if (x<200){
            if(y<200) region =1;
            else if(y>200 && y<400) region =2;
            else region =3;
           }
        else if (x>200 && x<400){
            if(y<200) region =4;
            else if(y>200 && y<400) region =5;
            else region =6;
            }
        else if(x>=400){
            if(y<200) region = 7;
            else if(y>200 && y<400) region = 8;
            else region = 9;
            }
            placeinregion(region);
  //  console.log(region);
});
function drawO(x,y){
    ctx.beginPath();
    ctx.arc(x,y,80,0,Math.PI*2,true);
    ctx.fillStyle = "#ff00e1";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(x,y,60,0,Math.PI*2,true);
    ctx.fillStyle = "#ebecea";
    ctx.fill();
    ctx.closePath();
}
function drawX(x,y){
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+160,y+160);
    ctx.moveTo(x+160,y);
    ctx.lineTo(x,y+160);
    ctx.lineWidth=20;
    ctx.strokeStyle="#ff00e1";
    ctx.stroke();
}

function showX(regionnum){
    switch(regionnum) {
        case 1: drawX(20, 20); break;
        case 2: drawX(20,220);break;
        case 3: drawX(20, 420); break;
        case 4: drawX(220,20); break;
        case 5: drawX(220,220); break;
        case 6:drawX(220,420); break;
        case 7: drawX(420, 20); break;
        case 8: drawX(420,220); break;
        case 9: drawX(420, 420); break;
    }
}
function drawgrid(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.rect(x1,y1,x2,y2);
    ctx.fillStyle = "#00fcff";
    ctx.fill();
    ctx.closePath();
}
function draw(){
    ctx.clearRect(0,0,canvas.height,canvas.width);
    drawgrid(0,200,600,2);
    drawgrid(0,400,600,2);
    drawgrid(200,0,2,600);
    drawgrid(400,0,2,600);
  //  drawO(100,100);
  //  drawX(220,220);
}
draw();


