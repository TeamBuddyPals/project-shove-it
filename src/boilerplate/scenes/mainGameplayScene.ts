import {Player} from "../player";
import {LevelManager} from "../levels/levelManager";

export class MainGameplayScene extends Phaser.Scene {
    private _player1: Player;
    private _player2: Player;
    private _levelManager: LevelManager;
    private _playerPhysicsGroup: Phaser.Physics.Arcade.Group;
    private _playerExploding: boolean = false;
    private _soundEnabled: boolean = true;

    constructor() {
        super({
            key: "MainGameplayScene"
        });
        this._levelManager = new LevelManager(this);
    }

    preload(): void {
        this.load.image("greenbox", "./src/boilerplate/assets/image/greenbox.png");
        this.load.image("redbox", "./src/boilerplate/assets/image/redbox.png");

        this.load.spritesheet('explosionSpriteSheet',
            './src/boilerplate/assets/image/spritesheet/explosion.png',
            {frameWidth: 256}
        );

        this.load.audio('explosionSound', ['./src/boilerplate/assets/audio/explosion-short.mp3']);

        this._playerPhysicsGroup = this.physics.add.group();
        this._levelManager.preload();
    }

    create(): void {
        //setup players
        let p1Sprite = this.physics.add.sprite(512, 592, 'greenbox');
        let p1LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let p1RightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this._player1 = new Player(p1Sprite, p1LeftKey, p1RightKey, "player1");
        this._player1.sprite.setDisplaySize(64, 64);

        let p2Sprite = this.physics.add.sprite(768, 592, 'redbox');
        let p2LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        let p2rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this._player2 = new Player(p2Sprite, p2LeftKey, p2rightKey, "player2");
        this._player2.sprite.setDisplaySize(64, 64);

        this._playerPhysicsGroup.add(this._player1.sprite);
        this._playerPhysicsGroup.add(this._player2.sprite);
        this.physics.add.collider(this._player1.sprite, this._player2.sprite);

        this._levelManager.create();
        this.physics.add.collider(this._playerPhysicsGroup, this._levelManager.sideWallPhysicsGroup);

        this.anims.create({
            key: 'explosionAnimation',
            frames: this.anims.generateFrameNumbers('explosionSpriteSheet', {start: 1, end: 14}),
            frameRate: 25,
            repeat: 2
        });

        this.sound.add('explosionSound');
    }

    update(): void {
        this._player1.update();
        this._player2.update();
        this._levelManager.update();
        this.physics.overlap(this._playerPhysicsGroup, this._levelManager.getAllTileSprites(), this.playerDestroyed, this.checkIfPlayerHitBottomOfTile, this);
    }

    private checkIfPlayerHitBottomOfTile(sprite1, sprite2): boolean {
        let xDif = Math.abs(sprite1.x - sprite2.x);
        if (xDif < 64) {
            return true;
        }
        return false;
    }

    private playerDestroyed(sprite1, sprite2): void {
        console.log("collision detected between " + sprite1.name + " and " + sprite2.name);

        this._player1.sprite.on('animationcomplete', this.restart, this);
        this._player2.sprite.on('animationcomplete', this.restart, this);

        if (sprite1.name == 'player1' || sprite2.name == 'player1') {
            this._player1.sprite.anims.play('explosionAnimation', true);
        } else {
            this._player2.sprite.anims.play('explosionAnimation', true);
        }

        if (this._playerExploding === false && this._soundEnabled) {
            this.sound.play('explosionSound', {loop: false})
        }
        this._playerExploding = true;
    }

    private restart(): void {
        this._playerExploding = false;
        this.scene.restart();
    }
}
