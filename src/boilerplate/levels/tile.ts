export class Tile {
    private _sprite: Phaser.Physics.Arcade.Sprite;

    constructor(sprite: Phaser.Physics.Arcade.Sprite) {
        this._sprite = sprite;
        this._sprite.setVelocity(0, 250);
        this._sprite.setAcceleration(0, 0);
        this._sprite.setGravity(0, 0);
        this._sprite.setImmovable(true);
        this._sprite.setName("tile");
        this._sprite.body.checkCollision.right = true;
        this._sprite.body.checkCollision.left = true;
        this._sprite.body.checkCollision.up = false;
        this._sprite.body.checkCollision.down = false;
    }

    get sprite(): Phaser.Physics.Arcade.Sprite {
        return this._sprite;
    }

    update() {

    }
}