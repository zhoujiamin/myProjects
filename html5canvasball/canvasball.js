var ball={
	x:512,
	y:100,
	g:2,
	Vx:-4,
	Vy:-4,
	R:20,
	color:"rgb(0,102,153)"
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
         ball.Vy=-ball.Vy;
	}
	if(ball.y<ball.R){
         ball.y= ball.R;
         ball.Vy=-ball.Vy/2;  //减缓速度
	}
	if(ball.x>=WIDTH-ball.R){
         ball.x=WIDTH-ball.R;
         ball.Vx=-ball.Vx;
	}
	if(ball.x<ball.R){
         ball.x= ball.R;
         ball.Vx=-ball.Vx;
	}

}