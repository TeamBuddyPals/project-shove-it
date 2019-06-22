import {Tile} from "./tile";

export class LevelManager {
    private _scene: Phaser.Scene;
    private _tiles: Array<Tile> = [];
    private _sideWallPhysicsGroup: Phaser.Physics.Arcade.StaticGroup;
    private _tilePhysicsGroup: Phaser.Physics.Arcade.StaticGroup;
    private _playerPhysicsGroup: Phaser.Physics.Arcade.Group;

    constructor(scene: Phaser.Scene, playerPhysicsGroup: Phaser.Physics.Arcade.Group) {
        this._scene = scene;
        this._playerPhysicsGroup = playerPhysicsGroup;
    }

    preload() {
        this._scene.load.image("tile", "./src/boilerplate/assets/tile.png");
        this._scene.load.image("wall", "./src/boilerplate/assets/wall.png");
    }

    create() {
        //setup side walls
        let leftWall = this._scene.physics.add.staticSprite(8, 360, 'wall');
        leftWall.setBounce(0, 0);
        leftWall.setImmovable(true);
        leftWall.setName("leftwall")
        let rightWall = this._scene.physics.add.staticSprite(1272, 360, 'wall');
        rightWall.setBounce(0, 0);
        rightWall.setImmovable(true);
        rightWall.setName("rightwall")

        this._sideWallPhysicsGroup = this._scene.physics.add.staticGroup();
        this._sideWallPhysicsGroup.add(leftWall);
        this._sideWallPhysicsGroup.add(rightWall);
        this._tilePhysicsGroup = this._scene.physics.add.staticGroup();

        this._scene.time.addEvent({
            delay: 1500,// ms
            startAt: 0,
            callback: this.createTileGroup,
            callbackScope: this,
            loop: true
        });
        this._scene.time.addEvent({
            delay: 2500,// ms
            startAt: 1250,
            callback: this.createLeftWallTileGroup,
            callbackScope: this,
            loop: true
        });
        this._scene.time.addEvent({
            delay: 2500,// ms
            startAt: 0,
            callback: this.createRightWallTileGroup,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        //remove out of view _tiles
        var i = this._tiles.length;
        while (i--) {
            if (this._tiles[i].sprite.y > 800) {
                this._tiles.splice(i, 1);
            }
        }
    }

    public getAllTileSprites(): Array<Phaser.Physics.Arcade.Sprite> {
        let tileSprites = [];
        for (const tile of this._tiles) {
            tileSprites.push(tile.sprite);
        }
        return tileSprites;
    }

    get sideWallPhysicsGroup(): Phaser.Physics.Arcade.StaticGroup {
        return this._sideWallPhysicsGroup;
    }

    private generatorRandomXCoord() {
        return (6 + Math.floor(Math.random() * Math.floor(6))) * 64;
    }

    private createTile(x: number, y: number) {
        let tileSprite = this._scene.physics.add.sprite(x, y, 'tile');
        let tile = new Tile(tileSprite);
        this._tilePhysicsGroup.add(tile.sprite);
        this._scene.physics.add.existing(tile.sprite);
        this._tiles.push(tile);
        return tile;
    }

    private createTileGroup() {
        let x = this.generatorRandomXCoord();
        let tile1 = this.createTile(x - 64, -64);
        let tile2 = this.createTile(x, 0);
        let tile3 = this.createTile(x, -128);
        let tile4 = this.createTile(x, -64);
        let tile5 = this.createTile(x + 64, -64);
    }

    private createLeftWallTileGroup() {
        let tile1 = this.createTile(48, 0);
        let tile2 = this.createTile(48, -128);
        let tile3 = this.createTile(48, -64);
        let tile4 = this.createTile(112, -64);
        let tile5 = this.createTile(176, -64);
    }

    private createRightWallTileGroup() {
        let tile1 = this.createTile(1232, 0);
        let tile2 = this.createTile(1232, -128);
        let tile3 = this.createTile(1232, -64);
        let tile4 = this.createTile(1168, -64);
        let tile5 = this.createTile(1104, -64);
    }

}