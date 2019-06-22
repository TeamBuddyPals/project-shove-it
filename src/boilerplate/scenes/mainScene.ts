import {Player} from "../player";
import {LevelManager} from "../levels/levelManager";

export class MainScene extends Phaser.Scene {
    private _player1: Player;
    private _player2: Player;
    private _levelManager: LevelManager;
    private _playerPhysicsGroup: Phaser.Physics.Arcade.Group;

    constructor() {
        super({
            key: "MainScene"
        });
    }

    preload(): void {
        this.load.image("greenbox", "./src/boilerplate/assets/greenbox.png");
        this.load.image("redbox", "./src/boilerplate/assets/redbox.png");

        this._playerPhysicsGroup = this.physics.add.group();
        this._levelManager = new LevelManager(this, this._playerPhysicsGroup);
        this._levelManager.preload()
    }

    create(): void {
        //setup players
        let p1Sprite = this.physics.add.sprite(512, 592, 'greenbox');
        let p1LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let p1RightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this._player1 = new Player(p1Sprite, p1LeftKey, p1RightKey, "player1");
        console.log(this._player1.getSprite());

        let p2Sprite = this.physics.add.sprite(768, 592, 'redbox');
        let p2LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        let p2rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this._player2 = new Player(p2Sprite, p2LeftKey, p2rightKey, "_player2");

        this._playerPhysicsGroup.add(this._player1.getSprite());
        this._playerPhysicsGroup.add(this._player2.getSprite());
        this.physics.add.collider(this._player1.getSprite(), this._player2.getSprite());

        this._levelManager.create(); //todo how can i have phaser do this instead of doing it manually?
        this.physics.add.collider(this._playerPhysicsGroup, this._levelManager.sideWallPhysicsGroup);
    }

    private playerCollision(sprite1, sprite2) {
        console.log("collision detected between " + sprite1.name + " and " + sprite2.name);
        this.scene.restart();
    }

    update(): void {
        //todo is there a way to tell phaser to call update on these objects instead of us having to do it manually?
        this._player1.update();
        this._player2.update();
        this._levelManager.update();
        this.physics.add.overlap(this._playerPhysicsGroup, this._levelManager.getAllTileSprites(), this.playerCollision, null, this);
    }
}
