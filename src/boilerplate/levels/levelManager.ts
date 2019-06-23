import {Tile} from "./tile";

export class LevelManager {
    private _scene: Phaser.Scene;
    private _tiles: Array<Tile> = [];
    private _sideWallPhysicsGroup: Phaser.Physics.Arcade.StaticGroup;
    private _tilePhysicsGroup: Phaser.Physics.Arcade.StaticGroup;

    constructor(scene: Phaser.Scene) {
        this._scene = scene;
    }

    preload() {
        this._scene.load.image("tile", "./src/boilerplate/assets/tile.png");
        this._scene.load.image("wall", "./src/boilerplate/assets/wall.png");
    }

    create() {
        //setup side walls
        let leftWall = this._scene.physics.add.staticSprite(16, 360, 'wall');
        leftWall.setBounce(0, 0);
        leftWall.setImmovable(true);
        leftWall.setName("leftwall")
        let rightWall = this._scene.physics.add.staticSprite(1264, 360, 'wall');
        rightWall.setBounce(0, 0);
        rightWall.setImmovable(true);
        rightWall.setName("rightwall")

        this._sideWallPhysicsGroup = this._scene.physics.add.staticGroup();
        this._sideWallPhysicsGroup.add(leftWall);
        this._sideWallPhysicsGroup.add(rightWall);
        this._tilePhysicsGroup = this._scene.physics.add.staticGroup();

        this._scene.time.addEvent({
            delay: 5000,// ms
            startAt: 1250,
            callback: this.spawnCircleFormation,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.removeOutOfViewTiles();
    }

    private removeOutOfViewTiles() {
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

    private createTileAtPixelCoords(x: number, y: number) {
        let tileSprite = this._scene.physics.add.sprite(x, y, 'tile');
        let tile = new Tile(tileSprite);
        this._tilePhysicsGroup.add(tile.sprite);
        this._scene.physics.add.existing(tile.sprite);
        this._tiles.push(tile);
        return tile;
    }

    private createTileAtGridCoords(x: number, y: number) {
        if (x < 0 || x > 18) {
            console.error("cannot spawn a tile at x coord " + x);
            return;
        }

        if (y > 10) {
            console.error("cannot spawn a tile at y coord " + y);
            return;
        }

        //64 pixels = size of a tile
        //32 pixels = width of a wall
        this.createTileAtPixelCoords((x * 64) + 64, (y * 64) + 64);
    }

    //todo make it so we can define this sort of thing in a file
    private spawnCircleFormation() {
        //left column
        this.createTileAtGridCoords(0, -11);
        this.createTileAtGridCoords(0, -10);
        this.createTileAtGridCoords(0, -9);
        this.createTileAtGridCoords(0, -8);
        this.createTileAtGridCoords(0, -7);
        this.createTileAtGridCoords(0, -6);
        this.createTileAtGridCoords(0, -5);
        this.createTileAtGridCoords(0, -4);
        this.createTileAtGridCoords(0, -3);
        this.createTileAtGridCoords(0, -2);
        this.createTileAtGridCoords(0, -1);

        //right column
        this.createTileAtGridCoords(18, -11);
        this.createTileAtGridCoords(18, -10);
        this.createTileAtGridCoords(18, -9);
        this.createTileAtGridCoords(18, -8);
        this.createTileAtGridCoords(18, -7);
        this.createTileAtGridCoords(18, -6);
        this.createTileAtGridCoords(18, -5);
        this.createTileAtGridCoords(18, -4);
        this.createTileAtGridCoords(18, -3);
        this.createTileAtGridCoords(18, -2);
        this.createTileAtGridCoords(18, -1);

        //left arc
        this.createTileAtGridCoords(6, -11);
        this.createTileAtGridCoords(5, -10);
        this.createTileAtGridCoords(4, -9);
        this.createTileAtGridCoords(4, -8);
        this.createTileAtGridCoords(3, -7);
        this.createTileAtGridCoords(3, -6);
        this.createTileAtGridCoords(3, -5);
        this.createTileAtGridCoords(4, -4);
        this.createTileAtGridCoords(4, -3);
        this.createTileAtGridCoords(5, -2);
        this.createTileAtGridCoords(6, -1);

        //right arc
        this.createTileAtGridCoords(12, -11);
        this.createTileAtGridCoords(13, -10);
        this.createTileAtGridCoords(14, -9);
        this.createTileAtGridCoords(14, -8);
        this.createTileAtGridCoords(15, -7);
        this.createTileAtGridCoords(15, -6);
        this.createTileAtGridCoords(15, -5);
        this.createTileAtGridCoords(14, -4);
        this.createTileAtGridCoords(14, -3);
        this.createTileAtGridCoords(13, -2);
        this.createTileAtGridCoords(12, -1);

        //center
        this.createTileAtGridCoords(9, -7);
        this.createTileAtGridCoords(9, -6);
        this.createTileAtGridCoords(9, -5);

    }
}