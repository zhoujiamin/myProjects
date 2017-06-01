import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import 'styles/App.scss'

let img = require('../images/1.jpg');

let position = {
    centerPos:{
        left:0,
        top:0
    },
    leftPos:{       //左分区位置
        left:[0,0],
        top:[0,0]
    },
    rightPos:{
        left:[0,0],
        top:[0,0]
    },
    topPos:{        //上分区的位置
        left:[0,0],
        top:[0,0]
    }
};

/**
 * 获取图片相关的数组
 * 图片的url信息最后出现在
 * imageData数组每一项的imgUrl
 */
let imageDataArr = require('../data/imageData.json');

let imageData = (function genImageURL(imageDataArr) {
    let imageArr = [];
        for (let singleImg of imageDataArr) {
            singleImg.imgUrl = require('../images/'+singleImg.file);
            imageArr.push(singleImg);
        }
    return imageArr;
})(imageDataArr);

/*
 * 图片组件
 */
class ImgFigure extends React.Component {

    /**
     * [handleClick 组件点击处理函数]
     * @return {[Undefined]}
     */
    handleClick(){
        if (this.props.arrange.isCenter === true) {
            this.props.inverse();
        }else {
            this.props.center();
        }
    }

    render() {
        var styleObj = {};
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

        if (this.props.arrange.rotate && this.props.arrange.rotate !== 0) {
            styleObj.transform = 'rotate(' + this.props.arrange.rotate + 'deg)';
        }

        if (this.props.arrange.isCenter) {
            styleObj.transform = 'translate(-50%,-50%)';
            styleObj.zIndex = 1000;
        }

        return (
            <figure style={styleObj} onClick={this.handleClick.bind(this)} className={this.props.arrange.isInverse ? 'is-inverse' : ''}>
               <img className="imgstyle" src={this.props.data.imgUrl} alt={this.props.data.title} />
                <figcaption>
                    <h2>{this.props.data.title}</h2>
                    <p className="img-des">{this.props.data.description}</p>
                </figcaption>
            </figure>
        );
    }
}

/*
 * 控制器组件
 */
class ControllerUnit extends React.Component {
    /**
     * [handleClick 组件点击处理函数]
     * @return {[Undefined]}
     */
    handleClick(){
        if (this.props.arrange.isCenter === true) {
            this.props.inverse();
        }else {
            this.props.center();
        }
    }

    render() {
        return (<span onClick={this.handleClick.bind(this)}
                className={this.props.arrange.isCenter ?
                    (this.props.arrange.isInverse ? 'ctrl-center ctrl-inverse' : 'ctrl-center') : ''} >
                    <img src="../images/箭头.svg"/>
                </span>)
    }
}

/*
 * 大组件
 */
class AppComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            imgPosArr:[
                /*pos:{
                    left:'0',
                    top:'0'
                },
                rotate:0
                isInverse:false/true,
                isCenter:false*/
            ]
        }
    }

    /**
     * [componentDidMount 初始化position，调用rearrange]
     * @return {[Undefined]}
     */
    componentDidMount() {
        var wrap = ReactDOM.findDOMNode(this.refs.warp),
            wrapHalfWidth = Math.floor((wrap.scrollWidth)/2),
            wrapHalfHeight = Math.floor((wrap.scrollHeight)/2);

        var img = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgHalfWidth = Math.floor((img.scrollWidth)/2),
            imgHalfHeight = Math.floor((img.scrollHeight)/2);

        position = {
            centerPos:{
                left:wrapHalfWidth,
                top:wrapHalfHeight
            },
            leftPos:{       //左分区位置
                left:[-imgHalfWidth,wrapHalfWidth-3*imgHalfWidth],
                top:[-imgHalfHeight,2*wrapHalfHeight-imgHalfHeight]
            },
            rightPos:{
                left:[imgHalfWidth+wrapHalfWidth,wrapHalfWidth*2-imgHalfWidth],
                top:[-imgHalfHeight,2*wrapHalfHeight-imgHalfHeight]
            },
            topPos:{        //上分区的位置
                left:[wrapHalfWidth-3*imgHalfWidth,imgHalfWidth+wrapHalfWidth],
                top:[-imgHalfHeight,wrapHalfHeight-3*imgHalfWidth]
            }
        };

        this.rearrange(0);
    }

    /**
     * [rearrange 重新布局所有图片]
     * @param  {[Number]} centerIndex [输入为中心图片的编号]
     * @return {[Undefined]}
     */
    rearrange(centerIndex) {
        var imgPosArr = this.state.imgPosArr;
        /*
         * 生成位置的函数
         */
        function getRangeRandom(low,heigh) {
            return Math.floor(Math.random() * (heigh - low) + low)
        }

        /*
         * 生成旋转角度
         * -30 - 30之间
         */
        function getRotate(){
            return Math.ceil(Math.random() * 60 - 30)
        }

        /*
         * 中间图片信息
         * 居中
         */
        var centerImg = imgPosArr.splice(centerIndex,1);
        centerImg[0] = {
            pos: position.centerPos,
            isCenter:true
        }

        /*
         * 上面图片信息
         * 1个/0个
         */
        var topNum = Math.floor(Math.random()*2);
        var topImgindex = Math.floor(Math.random()*(imgPosArr.length-topNum));
        var topImg = imgPosArr.splice(topImgindex,topNum);
        topImg.forEach(function (value) {
            value.pos = {
                left:getRangeRandom(position.topPos.left[0],
                    position.topPos.left[1]),
                right:getRangeRandom(position.topPos.top[0],
                    position.topPos.top[1])
            }

            value.rotate = getRotate();

            value.isCenter = false;
        });

        /*
         * 左右侧图片信息
         */
        let k = imgPosArr.length / 2;
        imgPosArr.forEach(function(value, index) {
            var pos = null;

            if(index < k){//左边
                pos = position.leftPos;
            }else {
                pos = position.rightPos;
            }

            value.pos = {
                left:getRangeRandom(pos.left[0],pos.left[1]),
                top:getRangeRandom(pos.top[0],pos.top[1])
            }

            value.rotate = getRotate();

            value.isCenter = false;
        });

        if(topNum>0){
            imgPosArr.splice(topImgindex,0,topImg[0]);
        }

        imgPosArr.splice(centerIndex,0,centerImg[0]);

        this.setState({
            imgPosArr:imgPosArr
        });
    }

    /**
     * [inverse 封装反转图片进行的操作]
     * @param  {[type]} index [图片编号]
     * @return {[Function]]}  [反转图片进行的操作]
     */
    inverse(index) {
        var that = this;
        return function() {
            var imgPosArr = that.state.imgPosArr;
            imgPosArr[index].isInverse = !imgPosArr[index].isInverse;
            that.setState({
                imgPosArr:imgPosArr
            })
        }
    }

    /**
     * [center 封装居中函数给子组件使用]
     * @param  {[Number]} index [居中图片的编号]
     * @return {[Undefined]}
     */
    center(index) {
        var that = this;
        return function() {
            that.rearrange(index);
        }
    }

    render() {
        let controllersUnits = [], imgFigures=[];

        imageData.forEach(function (value,index){
            if(!this.state.imgPosArr[index]){
                this.state.imgPosArr[index] = {
                    pos:{
                        left:50,
                        top:0
                    },
                    rotate:0,
                    isInverse:false,
                    isCenter:false
                }
            }
            imgFigures.push(<ImgFigure arrange={this.state.imgPosArr[index]} key={index} data={value}
                ref={'imgFigure'+index} inverse={this.inverse(index)} center={this.center(index)}/>);

            controllersUnits.push(<ControllerUnit arrange={this.state.imgPosArr[index]} key={index}
                inverse={this.inverse(index)} center={this.center(index)}/>);
        }.bind(this));

        /*for (let i = 0; i < imageData.length; i++){
            controllersUnits.push(<ControllerUnit/>);
        }*/
        return (
            <div className="wrap" ref="warp">
                <div className="img-wrap">
                    {imgFigures}
                </div>
                <nav className="controller-nav">
                    {controllersUnits}
                </nav>
            </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;

