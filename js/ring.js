import {
    detectCollision
} from '/js/collisiondetection.js';

export default class Ring {
    constructor(game, position) {
        
        this.image = document.getElementById('rings');
        this.markedForDeletion = false;
        this.game = game;
        this.position = position;
        this.width = 40;
        this.height = 40;
        
       
    }
    update() {
        if (detectCollision(this.game.ball, this)) {
            this.markedForDeletion = true;
        }
      
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    
    }
}