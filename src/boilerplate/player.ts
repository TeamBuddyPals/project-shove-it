export class Player {
    sprite: Phaser.Physics.Arcade.Sprite;
    leftKey: Phaser.Input.Keyboard.Key;
    rightKey: Phaser.Input.Keyboard.Key;

    constructor(sprite: Phaser.Physics.Arcade.Sprite,
                leftKey: Phaser.Input.Keyboard.Key,
                rightKey: Phaser.Input.Keyboard.Key) {
        this.sprite = sprite;
        this.sprite.setBounce(0.1);
        this.sprite.setMass(0.25);
        this.sprite.setDragX(75);
        this.sprite.setMaxVelocity(800, 0);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setGravityY(0);

        this.leftKey = leftKey;
        this.rightKey = rightKey;
    }

    update() {
        if (this.leftKey.isDown) {
            this.sprite.setAccelerationX(-600);
        } else if (this.rightKey.isDown) {
            this.sprite.setAccelerationX(600);
        } else {
            this.sprite.setAccelerationX(0);
        }
    }
}
