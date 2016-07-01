var ball={
	x:512,
	y:100,
	g:2,
	Vx:-4,
	Vy:-4,
	R:20,
	color:"rgb(0,102,153)",
	p:1
};
var WIDTH =1024;
var HEIGHT =768;

window.onload=init;
function init(){
	var canvas = document.getElementById("canvas");
	canvas.width=WIDTH;
	canvas.height=HEIGHT;
	if (canvas.getContext("2d")) {
		var content = canvas.getContext("2d");
	} else {
		alert("当前浏览器不支持canvas,请更换浏览器");
		return false;
	}
	
	
	setInterval(function(){
		render(content);
		update();
		},50);

	var button1=document.getElementById("button1");
	var button2=document.getElementById("button2");
	var button3=document.getElementById("button3");
	var button4=document.getElementById("button4");
	button1.onclick=function(){
		ball.p=1;
	}
	button2.onclick=function(){
		ball.p=0.8;
	}
	button3.onclick=function(){
		ball.p=0.6;
	}
	button4.onclick=function(){
		ball.p=0.2;
	}

}

function render(content){
	content.clearRect(0,0,WIDTH,HEIGHT);
	content.fillStyle=ball.color;
	content.beginPath();
	
    content.arc(ball.x,ball.y,ball.R,0,Math.PI*2);
    
    content.closePath();

    content.fill();

}

function update(){
	ball.x=ball.x+ball.Vx;
	ball.y=ball.y+ball.Vy;
	ball.Vy=ball.Vy+ball.g;
	if(ball.y>=HEIGHT-ball.R){
         ball.y=HEIGHT-ball.R;
         ball.Vy=-ball.Vy*ball.p;
	}
	if(ball.y<ball.R){
         ball.y= ball.R;
         ball.Vy=-ball.Vy*ball.p;  
	}
	if(ball.x>=WIDTH-ball.R){
         ball.x=WIDTH-ball.R;
         ball.Vx=-ball.Vx*ball.p;
	}
	if(ball.x<ball.R){
         ball.x= ball.R;
         ball.Vx=-ball.Vx*ball.p;
	}

}