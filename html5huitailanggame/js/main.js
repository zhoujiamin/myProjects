(function(w) {
	//全局变量，红太狼，灰太狼的位置和速度

	//全局变量画布
	var c = document.getElementById("myCanvas");
	var cxt = c.getContext("2d");
	var WIDTH = c.width;
	var HEIGHT = c.height;

	//全局变量红太狼灰太狼的图片
	var backgroundLoad = false;
	var grayImg = new Image();
	grayImg.src = "./images/gray.png";
	var grayload = false;
	grayImg.onload = function() {
		grayload = true;
	};

	var redImg = new Image();
	redImg.src = "./images/red.png";
	var redload = false;
	redImg.onload = function() {
		redload = true;
	};
	var backgroundImg = new Image();
	backgroundImg.src = "./images/background.jpg";
	backgroundImg.onload = function() {
		backgroundLoad = true;
	};

	//红太狼，灰太狼的位置和速度
	var red = {
		speed: 256, // movement in pixels per second
		x: WIDTH / 2,
		y: HEIGHT / 2
	};
	var gray = {
		speed: 10,
		x: 0,
		y: 0,
		direction: [0, 1, 2, 3][Math.floor(Math.random() * 4)] //
	};
	var grayCaught = 0;

	//判断有无按键
	var keys = {};

	//初始时间，用于给灰太狼跑步用
	var time = 0;
	//初始化位置 第一次 和以后被抓到了之后 都要重新绘制
	function init() {
		gray.x = WIDTH / 2 - grayImg.width + (Math.random() - 0.5) * (WIDTH / 2);
		gray.y = HEIGHT / 2 - grayImg.height + (Math.random() - 0.5) * (HEIGHT / 2);
		/*red.x = WIDTH / 2 - redImg.width;
		red.y = HEIGHT / 2 - redImg.height;*/
		gray.direction = [0, 1, 2, 3][Math.floor(Math.random() * 4)];
		if (backgroundLoad) { //判断背景有没有画出来了
			cxt.drawImage(backgroundImg, 0, 0);
			if (redload) {
				cxt.drawImage(redImg, red.x, red.y);
			}
			if (grayload) {
				cxt.drawImage(grayImg, gray.x, gray.y);
			}
		}
		time = Date.now();
	}

	//改变位置
	function change(time) {
		if (keys[37] === true) {
			red.x = red.x - 5;
		}
		if (keys[38] === true) {
			red.y = red.y - 5;
		}
		if (keys[39] === true) {
			red.x = red.x + 5;
		}
		if (keys[40] === true) {
			red.y = red.y + 5;
		}
		red.x = red.x < 0 ? 0 : red.x;
		red.x = red.x > WIDTH - redImg.width ? WIDTH - redImg.width : red.x;
		red.y = red.y < 0 ? 0 : red.y;
		red.y = red.y > HEIGHT - redImg.height ? HEIGHT - redImg.height : red.y;
		switch (gray.direction) {
			case 0:
				gray.y = gray.y - time * gray.speed;
				break;
			case 1:
				gray.x = gray.x + time * gray.speed;
				break;
			case 2:
				gray.y = gray.y + time * gray.speed;
				break;
			case 3:
				gray.x = gray.x - time * gray.speed;
				break;
		}
		//如果灰太狼跑出边际 游戏结束
		if (gray.x < -grayImg.width || gray.y < -grayImg.height || gray.x > WIDTH || gray.y > HEIGHT) {
			//
			return true;
		}
	}

	function render() {
		//先判断有没有抓出了

		if (((red.x - gray.x) <= 30 && (red.x - gray.x) >= -30) && ((red.y - gray.y) <= 30 && (red.y - gray.y) >= -30)) {
			grayCaught++;

			gray.speed = 10 + gray.speed; //灰太狼加速
			init();
			return;
		} else {
			if (backgroundLoad) { //判断背景有没有画出来了
				cxt.drawImage(backgroundImg, 0, 0);
				if (grayload) {
					cxt.drawImage(grayImg, gray.x, gray.y);
				}
				if (redload) {
					cxt.drawImage(redImg, red.x, red.y);
				}
				scorerender();
			}

		}

	}

	function main() {
		var timenow = Date.now();
		var gameover = change((timenow - time) / 1000);
		if (gameover === true) {
			document.getElementById("over").style.display = "block";
			return;
		}
		time = timenow;
		render();
		requestAnimationFrame(main);
	}

	//得分更新
	function scorerender() {
		// Score
		cxt.fillStyle = "rgb(250, 250, 250)";
		cxt.font = "24px 微软雅黑";
		cxt.textAlign = "left";
		cxt.textBaseline = "top";
		cxt.fillText("女王大人，您已经打死了 " + grayCaught + " 只灰太狼", 10, 415);
	}



	//初始化函数，包括初始化背景，和人物，
	w.onload = function() {
		//添加监听事件	
		addEventListener("keydown", function(e) {
			keys[e.keyCode] = true;
		}, false);
		addEventListener("keyup", function(e) {
			delete keys[e.keyCode];
		}, false);
		init();
		main();

	};

	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
})(window);