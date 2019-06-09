import {Player} from "../player";

export class MainScene extends Phaser.Scene {
    private player1;
    private player2;

    constructor() {
        super({
            key: "MainScene"
        });
    }

    preload(): void {
        this.load.image("greenbox", "./src/boilerplate/assets/greenbox.png");
        this.load.image("redbox", "./src/boilerplate/assets/redbox.png");
    }

    create(): void {
        var p1Sprite = this.physics.add.sprite(100, 450, 'greenbox');
        var p1LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        var p1RightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player1 = new Player(p1Sprite, p1LeftKey, p1RightKey);

        var p2Sprite = this.physics.add.sprite(200, 450, 'redbox');
        var p2LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        var p2rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.player2 = new Player(p2Sprite, p2LeftKey, p2rightKey);

        this.physics.add.collider(this.player1.sprite, this.player2.sprite);
    }

    update(): void {
        this.player1.update();
        this.player2.update();
    }
}
