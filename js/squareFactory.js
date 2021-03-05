//1、创建管理者（构造函数）
function SquareFactory() {

}

SquareFactory.prototype.init = function (square, color, action) {
    square.viewContent.style.position = 'absolute';

    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.background = color;


    /*
        我让x代表列，y代表行
        left=列(x)*宽度 
        top=行(y)*高度 
     */
    square.viewContent.style.left = square.x * squareWidth + 'px';
    square.viewContent.style.top = square.y * squareWidth + 'px';

    square.collide = action;    //给小方块身上打上标签
}

//2、包装创建方块的构造函数（流水线，子工厂）
SquareFactory.prototype.Floor = function (x, y, color) {   //构造函数（一条流水线就是一个构造函数，用的话，需要new）
    var floor = new Floor(x, y, squareWidth, squareWidth);
    this.init(floor, color, collideType.move);
    return floor;
}

SquareFactory.prototype.Wall = function (x, y, color) {   //构造函数（一条流水线就是一个构造函数，用的话，需要new）
    var wall = new Wall(x, y, squareWidth, squareWidth);
    this.init(wall, color, collideType.die);
    return wall;
}

SquareFactory.prototype.SnakeHead = function (x, y, color) {   //构造函数（一条流水线就是一个构造函数，用的话，需要new）
    var snakeHead = new SnakeHead(x, y, squareWidth, squareWidth);
    this.init(snakeHead, color, collideType.die);
    snakeHead.upDate(x,y);
    return snakeHead;
}
SquareFactory.prototype.SnakeBody = function (x, y, color) {   //构造函数（一条流水线就是一个构造函数，用的话，需要new）
    var snakeBody = new SnakeBody(x, y, squareWidth, squareWidth);
    this.init(snakeBody, color, collideType.die);
    return snakeBody;
}
SquareFactory.prototype.Food = function (x, y, color) {   //构造函数（一条流水线就是一个构造函数，用的话，需要new）
    var food = new Food(x, y, squareWidth, squareWidth);
    this.init(food, color, collideType.eat);
    food.upDate(x,y);
    return food;
}
//...


//3、提供一个对外接口
SquareFactory.create = function (type, x, y, color) {
    if (typeof SquareFactory.prototype[type] == 'undefined') {
        //用户传入的流水线不存在
        throw 'no this type';
    }

    //继承，让流水线继承管理者
    SquareFactory.prototype[type].prototype = new SquareFactory();

    //new 
    return new SquareFactory.prototype[type](x, y, color); //实例
}

/* var newSquare = SquareFactory.create('Wall', x, y, 'black');
var newSquare = SquareFactory.create('Floor', 1, 2, 'grey'); */
