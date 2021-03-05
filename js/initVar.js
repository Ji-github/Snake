//游戏区域的大小
var td = 30;  //宽度，列数
var tr = 30;  //高度，行数

//每个方块的宽度
var squareWidth = 20;

//游戏区域一开始的坐标
var positionX = 200;
var positionY = 100;

//蛇移动的时间间隔
var intervalTime = 300;


//创建一个基础的方块构造函数
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}
Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * squareWidth + 'px';
    this.viewContent.style.top = y * squareWidth + 'px';
}

//创建元素
var Ground = tool.single(Square); //整个游戏的场景，包含所有的元素，是个单例
var Floor = tool.extends(Square); //地板
var Wall = tool.extends(Square);  //围墙

var SnakeHead = tool.single(Square);  //蛇头
var SnakeBody = tool.extends(Square); //蛇身
var Snake = tool.single();    //蛇
var Food = tool.single(Square);    //食物

var Game=tool.single(); //游戏的元素对象


//给小方块身上打上一个标签，用于与蛇头进行碰撞，根据标签类型做不同的处理
var collideType = {
    move: 'move',
    eat: 'eat',
    die: 'die'
}

