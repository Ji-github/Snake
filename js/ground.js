var ground = new Ground(positionX, positionY, td * squareWidth, tr * squareWidth);

ground.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.background = 'orange';

    document.body.appendChild(this.viewContent);

    this.squareTable = []


    for (var y = 0; y < tr; y++) {  //外层循环，走的是行数
        this.squareTable[y] = new Array(td);
        for (var x = 0; x < td; x++) { //里层循环，走的是列数
            if (x == 0 || x == td - 1 || y == 0 || y == tr - 1) {
                //这个条件成立说明走到了围墙身上
                var newSquare = SquareFactory.create('Wall', x, y, 'black');
            } else {
                var newSquare = SquareFactory.create('Floor', x, y, 'grey');
            }

            this.squareTable[y][x] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent);
        }
    }

    // console.log(this.squareTable);
}

//移除方块
ground.remove = function (x, y) {
    var curSquare = this.squareTable[y][x]; //对象
    //在dom中移除
    this.viewContent.removeChild(curSquare.viewContent);

    //数据中移除
    this.squareTable[y][x] = null;
}

//添加方块
ground.append = function (square) {
    //添加到DOM
    this.viewContent.appendChild(square.viewContent);

    //添加到数据里
    this.squareTable[square.y][square.x] = square;
}
