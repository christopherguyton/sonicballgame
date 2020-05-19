import Paddle from '/js/paddle.js';
import InputHandler from '/js/input.js';
import Ball from '/js/ball.js';
import Ring from '/js/ring.js';
import { buildLevel, level1 } from '/js/levels.js'

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

}

start() {
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    let rings = buildLevel(this, level1);
  

    this.gameObjects = [this.ball, this.paddle, ...rings];
    new InputHandler(this.paddle);
}

update(deltaTime) {
    /*this.paddle.update(deltaTime);
    this.ball.update(deltaTime);*/
    this.gameObjects.forEach((object) => object.update(deltaTime));
    this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
}

draw(ctx) {
  /*  this.paddle.draw(ctx);
    this.ball.draw(ctx);*/
    this.gameObjects.forEach(object => object.draw(ctx));
}
}
