export class MainScene extends Phaser.Scene {
  private player1;
  private player2;
  private p1leftKey;
  private p1rightKey;
  private p2rightKey;
  private p2leftKey;

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
    this.player1 = this.physics.add.sprite(100, 450, 'greenbox');
    this.player1.setBounce(0.1);
    this.player1.setCollideWorldBounds(true);
    this.player1.body.setGravityY(0);
    this.p1leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.p1rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.player2 = this.physics.add.sprite(200, 450, 'redbox');
    this.player2.setBounce(0.1);
    this.player2.setCollideWorldBounds(true);
    this.player2.body.setGravityY(0);
    this.p2leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.p2rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.physics.add.collider(this.player1, this.player2);
  }

  update(): void {
    if (this.p2leftKey.isDown) {
        this.player2.setAccelerationX(-300);
    } else if (this.p2rightKey.isDown) {
        this.player2.setAccelerationX(300);
    } else {
        this.player2.setAccelerationX(0);
    }
    if (this.p1leftKey.isDown) {
        this.player1.setAccelerationX(-300);
    } else if (this.p1rightKey.isDown) {
        this.player1.setAccelerationX(300);
    } else {
        this.player1.setAccelerationX(0);
    }
}
}
