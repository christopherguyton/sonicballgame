import Paddle from '/js/paddle.js';
import InputHandler from '/js/input.js';
import Ball from '/js/ball.js';
import Ring from '/js/ring.js';
import { buildLevel, level1 } from '/js/levels.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

}

start() {
    this.gamestate = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    let rings = buildLevel(this, level1);
  

    this.gameObjects = [this.ball, this.paddle, ...rings];
    new InputHandler(this.paddle, this);
}

update(deltaTime) {
    if(this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU) return;
    this.gameObjects.forEach((object) => object.update(deltaTime));
    this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
}

draw(ctx) {

    this.gameObjects.forEach(object => object.draw(ctx));
    if(this.gamestate == GAMESTATE.PAUSED) {
    ctx.rect(0,0, this.gameWidth, this.gameHeight);
    ctx.fillStyle ="rgba(0,0,0)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }
    if(this.gamestate == GAMESTATE.MENU) {
        ctx.rect(0,0, this.gameWidth, this.gameHeight);
        ctx.fillStyle ="rgba(0,0,0)";
        ctx.fill();
    
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("TO START, PRESS SPACEBAR", this.gameWidth / 2, this.gameHeight / 2);
        }
}

togglePause() {
    if(this.gamestate == GAMESTATE.PAUSED) {
        this.gamestate = GAMESTATE.RUNNING;
    } else {
        this.gamestate = GAMESTATE.PAUSED;
    }
}

toggleStart() {
    if (this.gamestate == GAMESTATE.MENU) {
        this.gamestate = GAMESTATE.RUNNING; 
    }
}
}
