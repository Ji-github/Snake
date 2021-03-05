//基础库，公用方法（继承，扩展，单例）

var tool = {
    inherit: function (target, origin) {    //target目标对象；origin源对象
        var F = function () { };
        F.prototype = origin.prototype;
        target.prototype = new F();
        target.prototype.constructor = target;
    },
    extends: function (origin) {
        var target=function(){
            origin.apply(this, arguments);
        };

        this.inherit(target,origin);

        return target;
    },
    single: function (origin) {
        var target=(function(){
            var instance;

            return function(){
                if(typeof instance == 'object'){
                    return instance;
                }

                origin && origin.apply(this, arguments);
                instance=this;
            }
        })();

        origin && this.inherit(target,origin);
        return target;
    }
}

function Square(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
Square.prototype.collide = function () {
    console.log('collide');
}


/* function Food() {

}
tool.inherit(Food, Square);
var f=new Food();
f.collide(); */

/* var Food=tool.extends(Square);
var f=new Food(10,10,100,100);
f.collide();
console.log(f);
var f1=new Food(20,20,200,200);

console.log(f==f1); //false */


/* var SnakeHead=tool.single(Square);
var s1=new SnakeHead(10,10,100,100);
var s2=new SnakeHead(20,20,200,200);

console.log(s1==s2); */

