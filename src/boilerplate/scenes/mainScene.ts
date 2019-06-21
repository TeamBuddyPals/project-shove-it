import {Player} from "../player";
import {LevelManager} from "../levels/levelManager";

export class MainScene extends Phaser.Scene {
    private player1: Player;
    private player2: Player;
    private levelManager: LevelManager;
    private playerPhysicsGroup: Phaser.Physics.Arcade.Group;

    constructor() {
        super({
            key: "MainScene"
        });
        this.levelManager = new LevelManager(this);
    }

    preload(): void {
        this.load.image("greenbox", "./src/boilerplate/assets/greenbox.png");
        this.load.image("redbox", "./src/boilerplate/assets/redbox.png");
        this.levelManager.preload()
    }

    create(): void {
        //setup players
        let p1Sprite = this.physics.add.sprite(512, 592, 'greenbox');
        let p1LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let p1RightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player1 = new Player(p1Sprite, p1LeftKey, p1RightKey, "player1");
        console.log(this.player1.getSprite());

        let p2Sprite = this.physics.add.sprite(768, 592, 'redbox');
        let p2LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        let p2rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.player2 = new Player(p2Sprite, p2LeftKey, p2rightKey, "player2");

        this.playerPhysicsGroup = this.physics.add.group();
        this.playerPhysicsGroup.add(this.player1.getSprite());
        this.playerPhysicsGroup.add(this.player2.getSprite());
        this.physics.add.collider(this.player1.getSprite(), this.player2.getSprite());

        this.levelManager.create(this.playerPhysicsGroup); //todo how can i have phaser do this instead of doing it manually?
    }

    update(): void {
        //todo is there a way to tell phaser to call update on these objects instead of us having to do it manually?
        this.player1.update();
        this.player2.update();
        this.levelManager.update();
    }
}
