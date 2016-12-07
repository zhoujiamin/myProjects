##Promise Demo简介
demo地址：[Promise Demo](http://zhoujiamin.github.io/myProjects/promisedemo/promise.html)
###作者意图
学习了使用Promise来简化回调函数，使用链式写法来规范程序，使得程序清晰且容易维护。
理论参考了阮大大的[Promise对象](http://javascript.ruanyifeng.com/advanced/promise.html#toc10)。
动画参考了慕课网的[进击nodejs基础](http://www.imooc.com/video/11549)课程。该课程使用了bluebird引入了Promise，但目前浏览器都慢慢开始支持原生的Promise，所以不再需要引入别的库。
###代码简介
核心代码如下：

    function promiseAnimate(ball,distance){
        var promise = new Promise(function(resolve, reject) {
        function animate(){
            setTimeout(function(){
            //console.log(ball);
            var marginleft = parseInt(ball.style.marginLeft,10);
            //console.log(marginleft);
            if(marginleft===distance){
                resolve();//让状态改变
            }else{
                if(marginleft<distance){
                    marginleft++;
                }else{
                    marginleft--;
                }
                ball.style.marginLeft = marginleft+'px';
                animate();
            }
            },13);
        }
        animate(); 
        });
        return promise;
    }
    promiseAnimate(ball1,100)
        .then(function(){
            return promiseAnimate(ball2,200);
        }).then(function(){
            return promiseAnimate(ball3,300);
        }).then(function(){
            return promiseAnimate(ball3,150);
        }).then(function(){
            return promiseAnimate(ball2,150);
        }).then(function(){
            return promiseAnimate(ball1,150);
        });
