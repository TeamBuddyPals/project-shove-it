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
        this.load.image("tile", "./src/boilerplate/assets/tile.png");
        this.load.image("wall", "./src/boilerplate/assets/wall.png");
    }

    create(): void {
        let p1Sprite = this.physics.add.sprite(512, 592, 'greenbox');
        let p1LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let p1RightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player1 = new Player(p1Sprite, p1LeftKey, p1RightKey);

        let p2Sprite = this.physics.add.sprite(768, 592, 'redbox');
        let p2LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        let p2rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.player2 = new Player(p2Sprite, p2LeftKey, p2rightKey);

        let playerGroup = this.physics.add.group();
        playerGroup.add(this.player1.sprite);
        playerGroup.add(this.player2.sprite);
        this.physics.add.collider(this.player1.sprite, this.player2.sprite);

        let leftWall = this.physics.add.staticSprite(8, 360, 'wall');
        leftWall.setBounceX(0);
        leftWall.setImmovable(true);
        let rightWall = this.physics.add.staticSprite(1272, 360, 'wall');
        rightWall.setBounceX(0);
        rightWall.setImmovable(true);

        let wallGroup = this.physics.add.staticGroup();
        wallGroup.add(leftWall);
        wallGroup.add(rightWall);

        this.physics.add.collider(playerGroup, wallGroup);

        // this.createTile();
    }

    private createTile() {
        let bomb = this.physics.add.sprite(this.generatorRandomXCoord(), 0, 'tile');
        bomb.setVelocity(0, 250);
        bomb.setAcceleration(0, 0);
        bomb.setGravity(0, 0);
        this.bombs.push(bomb);
    }

    update(): void {
        this.player1.update();
        this.player2.update();

        for (const bomb of this.bombs) {
            if (bomb.y > 800) {
                let x = this.generatorRandomXCoord();
                bomb.setPosition(x, 0);
            }
        }
    }

    private generatorRandomXCoord() {
        return 32;
        // return Math.floor(Math.random() * Math.floor(16)) * 64;
    }
}
