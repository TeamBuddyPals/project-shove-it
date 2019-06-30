export class Player {
    private _sprite: Phaser.Physics.Arcade.Sprite;
    private _leftKey: Phaser.Input.Keyboard.Key;
    private _rightKey: Phaser.Input.Keyboard.Key;
    private _lastKeyCode: number;

    constructor(sprite: Phaser.Physics.Arcade.Sprite,
                leftKey: Phaser.Input.Keyboard.Key,
                rightKey: Phaser.Input.Keyboard.Key,
                name: string) {
        this._sprite = sprite;
        this._leftKey = leftKey;
        this._rightKey = rightKey;
        this._sprite.setCollideWorldBounds(true);
        this._sprite.setName(name)
        // this._sprite.body.on
    }

    get sprite(): Phaser.Physics.Arcade.Sprite {
        return this._sprite;
    }

    showDebugDetails(): void {
        console.log(this._sprite.body);
        console.log(this._sprite.body.acceleration);
        console.log(this._sprite.body.velocity);
        console.log(`lastKey: ${this._lastKeyCode}`);
        console.log(`leftKeyDown: ${this._leftKey.isDown}`);
        console.log(`rightKeyDown: ${this._rightKey.isDown}`);
    }

    update() {
        // CONTROL SCHEME - TWITCHY, RESPONSIVE
        if (this._leftKey.isDown) {
            this._sprite.setVelocityX(-600);
        } else if (this._rightKey.isDown) {
            this._sprite.setVelocityX(600);
        } else {
            this._sprite.setVelocityX(0);
        }

        // CONTROL SCHEME - SOME ACCELERATION 
        // if (this._leftKey.isDown && this._rightKey.isDown) {
        //     this._sprite.setAccelerationX(0);
        //     this._sprite.setVelocityX(0);
        // } else if (this._leftKey.isDown) {
        //     if (this._lastKeyCode && this._lastKeyCode === this._rightKey.keyCode) {
        //         this._sprite.setVelocityX(0);
        //         this._lastKeyCode = this._leftKey.keyCode; 
        //     }
        //     this._sprite.setAccelerationX(-800);
        //     this._lastKeyCode = this._leftKey.keyCode;
        // } else if (this._rightKey.isDown) {
        //     if (this._lastKeyCode && this._lastKeyCode === this._leftKey.keyCode) {
        //         this._sprite.setVelocityX(0);
        //         this._lastKeyCode = this._rightKey.keyCode; 
        //     }
        //     this._sprite.setAccelerationX(800);
        //     this._lastKeyCode = this._rightKey.keyCode;
        // } else {
        //         this._sprite.setAccelerationX(0);
        //         this._sprite.setVelocityX(0);
        // }
    }
}
