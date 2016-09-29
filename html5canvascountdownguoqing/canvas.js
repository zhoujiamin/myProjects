/*var WIDTH = 1024;
var HEIGHT = 768;

var R = 8;*/

var endDate = new Date();
//endDate.setDate(endDate.getDate()+1);
endDate=new Date('October 1,2016');
/*var Margin_TOP = 60;
var Margin_Left = 30;*/
var showTime = 0;

var ball = [];
var color = ["#FF0033", "#FFCC00", "#FF6666", "#ef3600", "#FFFF00", "#CC0033",
	"#FF9900", "#FF4040", "#a1f43d", "#ffed40"
];

function init() {
	WIDTH=document.body.clientWidth;
	HEIGHT=document.body.clientHeight;
    Margin_Left=Math.round(WIDTH/10);
    R=Math.round(WIDTH*4/5/108)-1;
    Margin_TOP=Math.round(HEIGHT/5);

	var canvas = document.getElementById("canvas");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	if (canvas.getContext("2d")) {
		var content = canvas.getContext("2d");
	} else {
		alert("当前浏览器不支持canvas,请更换浏览器");
		return false;
	}

	showTime = getCurrentShouwSeconds();
	setInterval(function() {
		render(content);
		update();
	}, 50);



}

function render(content) {

	content.clearRect(0, 0, WIDTH, HEIGHT);
	var hour = parseInt(showTime / 3600);
	var minute = parseInt((showTime - hour * 3600) / 60);
	var seconds = showTime % 60;

	renderDigi(Margin_Left, Margin_TOP, parseInt(hour / 10), content);
	renderDigi(Margin_Left + 15 * (R + 1), Margin_TOP, parseInt(hour % 10), content);
	renderDigi(Margin_Left + 30 * (R + 1), Margin_TOP, 10, content);
	renderDigi(Margin_Left + 39 * (R + 1), Margin_TOP, parseInt(minute / 10), content);
	renderDigi(Margin_Left + 54 * (R + 1), Margin_TOP, parseInt(minute % 10), content);
	renderDigi(Margin_Left + 69 * (R + 1), Margin_TOP, 10, content);
	renderDigi(Margin_Left + 78 * (R + 1), Margin_TOP, parseInt(seconds / 10), content);
	renderDigi(Margin_Left + 93 * (R + 1), Margin_TOP, parseInt(seconds % 10), content);

	for (var i = 0; i < ball.length; i++) {
		content.fillStyle = ball[i].Color;
		content.beginPath();
		content.arc(ball[i].X, ball[i].Y, R, 0, Math.PI * 2);
		content.closePath();
		content.fill();

	}


}
//显示数字
function renderDigi(x, y, num, content) {

	content.fillStyle = "#66CCCC";
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] === 1) {
				content.beginPath();
				content.arc(x + j * (R + 1) * 2 + (R + 1), y + i * (R + 1) * 2 + (R + 1), R, 0, Math.PI * 2);
				content.closePath();
				content.fill();
			}
		}
	}


}

//计算当前时间与ending时间的差
function getCurrentShouwSeconds() {
	var currTime = new Date();
	var ret = endDate.getTime() - currTime.getTime();
	ret = Math.round(ret / 1000);
	return ret > 0 ? ret : 0;
}

//update用于更新时间
function update() {
	var nextTime = getCurrentShouwSeconds();

	var nexthour = parseInt(nextTime / 3600);
	var nextminute = parseInt((nextTime - nexthour * 3600) / 60);
	var nextseconds = nextTime % 60;

	var hour = parseInt(showTime / 3600);
	var minute = parseInt((showTime - hour * 3600) / 60);
	var seconds = showTime % 60;
	if (nextseconds != seconds) {
		if (parseInt(nexthour / 10) != parseInt(hour / 10)) {
			addBall(Margin_Left, Margin_TOP, parseInt(nexthour / 10));
		}
		if (parseInt(nexthour % 10) != parseInt(hour % 10)) {
			addBall(Margin_Left + 15 * (R + 1), Margin_TOP, parseInt(nexthour % 10));
		}
		if (parseInt(nextminute / 10) != parseInt(minute / 10)) {
			addBall(Margin_Left + 39 * (R + 1), Margin_TOP, parseInt(nextminute / 10));
		}
		if (parseInt(nextminute % 10) != parseInt(minute % 10)) {
			addBall(Margin_Left + 54 * (R + 1), Margin_TOP, parseInt(nextminute % 10));
		}
		if (parseInt(nextseconds / 10) != parseInt(seconds / 10)) {
			addBall(Margin_Left + 78 * (R + 1), Margin_TOP, parseInt(nextseconds / 10));
		}
		addBall(Margin_Left + 93 * (R + 1), Margin_TOP, parseInt(nextseconds % 10));
		showTime = nextTime;

	}
	updateBall();

}

function addBall(x, y, num) {

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] === 1) {
				var aball = {
					X: x + j * (R + 1) * 2 + (R + 1),
					Y: y + i * (R + 1) * 2 + (R + 1),
					G: 1.5 + Math.random(),
					Vy: -5 + 5 * Math.random(),
					Vx: Math.pow(-1,Math.round(Math.random()))*4,
					Color: color[Math.floor(Math.random() * (10))]
				}
				ball.push(aball);
			}
		}
	}

}

function updateBall() {
	for (var i = 0; i < ball.length; i++) {
		ball[i].X = ball[i].X + ball[i].Vx;
		ball[i].Y = ball[i].Y + ball[i].Vy;
		ball[i].Vy = ball[i].Vy + ball[i].G;
		if (ball[i].Y >= HEIGHT - R) {
			ball[i].Y = HEIGHT - R;
			ball[i].Vy = -ball[i].Vy * 0.7; //0.7是摩擦系数
		}
	}


    //性能优化，删除不要的小球
	var ctx=0;
	for (var j = 0; j < ball.length; j++) {
		if ((ball[j].X+R>0)&& (ball[j].X-R<WIDTH) ) {
			ball[ctx]=ball[j];
			ctx++;
		} 	
	}
	ball.length=ctx;
    


}
window.onload = init;