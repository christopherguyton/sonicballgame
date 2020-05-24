import Paddle from '/js/paddle.js';
import InputHandler from '/js/input.js';
import Ball from '/js/ball.js';
import Ring from '/js/ring.js';
import {buildLevel,
    level1, level2, level3} from '/js/levels.js';

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
        this.gamestate = GAMESTATE.MENU;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        this.rings = [];
        this.gameObjects = [];
        this.tries = 3;
        this.levels = [level1, level2, level3]
        this.currentLevel = 0;
        new InputHandler(this.paddle, this);
    }

    start() {

        this.rings = buildLevel(this, this.levels[this.currentLevel]);
        this.gameObjects = [this.ball, this.paddle];

    }

    update(deltaTime) {

        if (this.tries === 0) this.gamestate = GAMESTATE.GAMEOVER;
        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) return;
        if (this.rings.length === 0) {
           this.currentLevel++;
           this.ball.reset();
           this.start();
        }
        [...this.gameObjects, ...this.rings].forEach(object => object.update(deltaTime));
        this.gameObjects.forEach((object) => object.update(deltaTime));
        this.rings = this.rings.filter(object => !object.markedForDeletion);
    }

    draw(ctx) {

        [...this.gameObjects, ...this.rings].forEach(object => object.draw(ctx));
        this.gameObjects.forEach(object => object.draw(ctx));
        if (this.gamestate == GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("GAME PAUSED", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate == GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("TO START, PRESS SPACEBAR", this.gameWidth / 2, this.gameHeight / 2);
            ctx.fillText("WHILE PLAYING, PRESS ENTER TO PAUSE", this.gameWidth / 2, this.gameHeight / 1.5);
        }
        if (this.gamestate == GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate == GAMESTATE.RUNNING) {
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "right";
            ctx.fillText("LIVES: " + this.tries, this.gameWidth, this.gameHeight);
        }
    }

    togglePause() {
        if (this.gamestate == GAMESTATE.PAUSED) {
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