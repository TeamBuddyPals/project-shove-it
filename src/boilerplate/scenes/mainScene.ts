import {Player} from "../player";

export class MainScene extends Phaser.Scene {
    private player1: Player;
    private player2: Player;
    private bombs: Array<Phaser.Physics.Arcade.Sprite> = [];

    constructor() {
        super({
            key: "MainScene"
        });
    }

    preload(): void {
        this.load.image("greenbox", "./src/boilerplate/assets/greenbox.png");
        this.load.image("redbox", "./src/boilerplate/assets/redbox.png");
        this.load.image("bomb", "./src/boilerplate/assets/bomb.png");
    }

    create(): void {
        let p1Sprite = this.physics.add.sprite(100, 450, 'greenbox');
        let p1LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let p1RightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player1 = new Player(p1Sprite, p1LeftKey, p1RightKey);

        let p2Sprite = this.physics.add.sprite(200, 450, 'redbox');
        let p2LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        let p2rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.player2 = new Player(p2Sprite, p2LeftKey, p2rightKey);

        this.physics.add.collider(this.player1.sprite, this.player2.sprite);

        this.createBomb();
        this.createBomb();
        this.createBomb();
        this.createBomb();
        this.createBomb();
    }

    private createBomb() {
        let bomb = this.physics.add.sprite(this.generatorRandomXCoord(), 0, 'bomb');
        bomb.setVelocity(0, 200);
        bomb.setAcceleration(0, 0);
        bomb.setGravity(0, 0);
        this.bombs.push(bomb);
    }

    update(): void {
        this.player1.update();
        this.player2.update();

        for (const bomb of this.bombs) {
            if (bomb.y > 650) {
                let x = this.generatorRandomXCoord();
                bomb.setPosition(x, 0);
            }
        }
    }

    private generatorRandomXCoord() {
        return Math.floor(Math.random() * Math.floor(800));
    }
}
