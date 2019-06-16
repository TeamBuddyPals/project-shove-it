import {Player} from "../player";

export class MainScene extends Phaser.Scene {
    private player1: Player;
    private player2: Player;
    private tiles: Array<Phaser.Physics.Arcade.Sprite> = [];
    private playerPhysicsGroup: Phaser.Physics.Arcade.Group;
    private sideWallPhysicsGroup: Phaser.Physics.Arcade.StaticGroup;
    private tilePhysicsGroup: Phaser.Physics.Arcade.StaticGroup;

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
        //setup players
        let p1Sprite = this.physics.add.sprite(512, 592, 'greenbox');
        let p1LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let p1RightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player1 = new Player(p1Sprite, p1LeftKey, p1RightKey, "player1");

        let p2Sprite = this.physics.add.sprite(768, 592, 'redbox');
        let p2LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        let p2rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.player2 = new Player(p2Sprite, p2LeftKey, p2rightKey, "player2");

        this.playerPhysicsGroup = this.physics.add.group();
        this.playerPhysicsGroup.add(this.player1.sprite);
        this.playerPhysicsGroup.add(this.player2.sprite);
        this.physics.add.collider(this.player1.sprite, this.player2.sprite);

        //setup side walls
        let leftWall = this.physics.add.staticSprite(8, 360, 'wall');
        leftWall.setBounce(0, 0);
        leftWall.setImmovable(true);
        leftWall.setName("leftwall")
        let rightWall = this.physics.add.staticSprite(1272, 360, 'wall');
        rightWall.setBounce(0, 0);
        rightWall.setImmovable(true);
        rightWall.setName("rightwall")

        this.sideWallPhysicsGroup = this.physics.add.staticGroup();
        this.sideWallPhysicsGroup.add(leftWall);
        this.sideWallPhysicsGroup.add(rightWall);
        this.tilePhysicsGroup = this.physics.add.staticGroup();

        //setup additional collision detection stuff
        this.physics.add.collider(this.playerPhysicsGroup, this.sideWallPhysicsGroup);
        this.physics.add.overlap(this.player1.sprite, this.tiles, this.playerCollision, null, this);
        this.physics.add.overlap(this.player2.sprite, this.tiles, this.playerCollision, null, this);

        //spawn tile groups every so often
        this.time.addEvent({
            delay: 2500,// ms
            callback: this.createTileGroup,
            callbackScope: this,
            loop: true
        });
    }

    private playerCollision(sprite1, sprite2) {
        console.log("collision detected between " + sprite1.name + " and " + sprite2.name);
    }

    private createTile(x: number, y: number) {
        let tile = this.physics.add.sprite(x, y, 'tile');
        tile.setVelocity(0, 250);
        tile.setAcceleration(0, 0);
        tile.setGravity(0, 0);
        tile.setName("tile");
        this.tiles.push(tile);
        return tile;
    }

    private createTileGroup() {
        let x = this.generatorRandomXCoord();
        let tile1 = this.createTile(x - 64, 0);
        let tile2 = this.createTile(x, 64);
        let tile3 = this.createTile(x, -64);
        let tile4 = this.createTile(x, 0);
        let tile5 = this.createTile(x + 64, 0);
        this.tilePhysicsGroup.add(tile1);
        this.tilePhysicsGroup.add(tile2);
        this.tilePhysicsGroup.add(tile3);
        this.tilePhysicsGroup.add(tile4);
        this.tilePhysicsGroup.add(tile5);
    }

    update(): void {
        this.player1.update();
        this.player2.update();
    }

    private generatorRandomXCoord() {
        return Math.floor(Math.random() * Math.floor(16)) * 64;
    }
}
