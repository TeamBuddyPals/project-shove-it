import "phaser";
import {MainScene} from "./scenes/mainScene";

// main game configuration
const config: GameConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: "game",
    scene: MainScene,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {x: 0, y: 0},
            debug: false
        },
        forceX: true
    }
};

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    var game = new Game(config);
});
