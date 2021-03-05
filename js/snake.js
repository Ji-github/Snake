var snake = new Snake();
snake.head = null;    //蛇头
snake.tail = null;    //蛇尾

var directionNum = {
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    },
    bottom: {
        x: 0,
        y: 1
    }
}

snake.init = function () {
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'deeppink');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

    snake.head = snakeHead;    //蛇头
    snake.tail = snakeBody2;   //蛇尾

    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);


    //链表
    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;


    snake.direction = directionNum.right; //蛇要走的方向(默认往右)
}

// snake.init();

//获取蛇头要走到的下一个方块，根据方向获取到下一个方块
snake.getCollideSquare = function () {
    var nextSquare = ground.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];

    this.collideMethod[nextSquare.collide](nextSquare);
}
snake.collideMethod = {
    move: function (square, boolean) {
        // console.log('move');
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');

        //更新链表的关系
        newBody.next = snake.head.next;
        newBody.last = null;
        newBody.next.last = newBody;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        //创建一个新的蛇头
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'deeppink');

        //更新链表的关系
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        ground.remove(square.x, square.y);
        ground.append(newHead);

        if (!boolean) {
            //这个条件成立说明要继续走，需要删除最后一节身体
            var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'grey');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);
            snake.tail=snake.tail.last;
        }

    },
    eat: function (square) {
        this.move(square, true);
        // console.log('eat');

        createFood();

        game.score++;
    },
    die: function (square) {
        // console.log('die');
        game.over();
    }
}
