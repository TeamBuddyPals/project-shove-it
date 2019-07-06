export class Player {
    private _sprite: Phaser.Physics.Arcade.Sprite;
    private _leftKey: Phaser.Input.Keyboard.Key;
    private _rightKey: Phaser.Input.Keyboard.Key;
    private _lastKeyCode: number;
    private _name: string;
    // Dash props
    private _dashKey: Phaser.Input.Keyboard.Key;
    private _isDashing: boolean = false;
    private _dashSpeed: number = 3000;
    private _dashCooldown: number = 1000;
    private _dashDuration: number = 120;
    private _canDash: boolean = true;
    // Movement Lock props
    private _mLockKey: Phaser.Input.Keyboard.Key;
    private _mlockDuration: number = 500;
    private _mlockCooldown: number = 1000;
    private _canMLock: boolean = true;
    private _isMLocking: boolean = false;

    constructor(sprite: Phaser.Physics.Arcade.Sprite,
                leftKey: Phaser.Input.Keyboard.Key,
                rightKey: Phaser.Input.Keyboard.Key,
                dashKey: Phaser.Input.Keyboard.Key,
                mLockKey: Phaser.Input.Keyboard.Key,
                name: string) {
        this._sprite = sprite;
        this._leftKey = leftKey;
        this._rightKey = rightKey;
        this._dashKey = dashKey;
        this._mLockKey = mLockKey;
        this._sprite.setCollideWorldBounds(true);
        this._sprite.setName(name)
    }

    get sprite(): Phaser.Physics.Arcade.Sprite {
        return this._sprite;
    }

    performMLock() {
        console.log('PERFORM - MLOCK');
        this._sprite.body.velocity.x = 0;
        this._sprite.body.immovable = true;
        this._isMLocking = true;
        this._canMLock = false;
        setTimeout(() => {
            console.log('MLOCK - DURATION EXPIRED');
            this._isMLocking = false;
            this._sprite.body.immovable = false;
        }, this._mlockDuration);
        this.coolDownMLock();
    }

    disableDash() {
        this._canDash = false;
    }

    enableDash() {
        this._canDash = true;
    }

    performDash() {
        console.log('DASH - PERFORM ');
        const currentVelocityX = this._sprite.body.velocity.x;
        if (this._leftKey.isDown) {
            console.log('DASH - LEFT DASH');
            this._sprite.setVelocityX( currentVelocityX - this._dashSpeed);
            this._isDashing = true;
            this._canDash = false;
            setTimeout( () => {
                this._isDashing = false;
            }, this._dashDuration);
            this.coolDownDash();
        } else if (this._rightKey.isDown) {
            console.log('DASH - RIGHT DASH');
            this._sprite.setVelocityX( currentVelocityX + this._dashSpeed );
            this._isDashing = true;
            this._canDash = false;
            setTimeout( () => {
                console.log('DASH - DURATION EXPIRED');
                this._isDashing = false;
            }, this._dashDuration);
            this.coolDownDash();
        }
    }

    private coolDownDash(): void {
        setTimeout(() => {
            console.log(`DASH - HAS COOLED DOWN`);
            this._canDash = true;
        }, this._dashCooldown);
    }

    private coolDownMLock(): void {
        setTimeout(() => {
            console.log(`MLOCK - HAS COOLED DOWN`);
            this._canMLock = true;
        }, this._mlockCooldown);
    }

    showDebugDetails(): void {
        console.log(`DEBUG - ${this._sprite.name}`);
        // console.log(this._sprite.body);
        // console.log(this._sprite.body.acceleration);
        console.log(this._sprite.body.velocity);
        // console.log(`lastKey: ${this._lastKeyCode}`);
        // console.log(`leftKeyDown: ${this._leftKey.isDown}`);
        // console.log(`rightKeyDown: ${this._rightKey.isDown}`);
    }

    update() {
        // CONTROL SCHEME - TWITCHY, RESPONSIVE
        this.showDebugDetails();
        if (!this._isMLocking) {
            if (!this._isDashing) {
                if (this._mLockKey.isDown && this._canMLock) {
                    this.performMLock();
                } else if (this._leftKey.isDown) {
                    if (this._dashKey.isDown && this._canDash) {
                        this.performDash();
                    } else {
                        if (this._sprite.body.velocity.x !== -600) {
                            this._sprite.setVelocityX(-600);
                        }
                    }
                } else if (this._rightKey.isDown) {
                    if (this._dashKey.isDown && this._canDash) {
                        this.performDash();
                    } else {
                        if (this._sprite.body.velocity.x !== 600) {
                            this._sprite.setVelocityX(600);
                        }
                    }
                } else {
                    this._sprite.setVelocityX(0);
                }
            }
        }
    }
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
