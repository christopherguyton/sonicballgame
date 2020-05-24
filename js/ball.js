import {detectCollision} from '/js/collisiondetection.js';

export default class Ball {
    constructor(game) {
        this.image = document.getElementById('sonicBall');

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.speed = {x:2, y:2};
        this.position ={x: 250, y:400,};
        this.size = 60;

        this.game = game;
    }
    draw (ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);

    }
    update(deltaTime) {
      
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        //wall on left and right
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }

        // wall on top and bottom
        if (this.position.y + this.size > this.gameHeight || this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

        //check collision with paddle

if(detectCollision(this, this.game.paddle)) {

            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}