export class Tile {
    private _sprite: Phaser.Physics.Arcade.Sprite;

    constructor(sprite: Phaser.Physics.Arcade.Sprite) {
        this._sprite = sprite;
        this._sprite.setVelocity(0, 250);
        this._sprite.setAcceleration(0, 0);
        this._sprite.setGravity(0, 0);
        this._sprite.setName("tile");
    }

    update() {

    }
}