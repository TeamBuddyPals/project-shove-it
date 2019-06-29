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
        this._scene.load.image("tile-box", "./src/boilerplate/assets/image/tile-box.png");
        this._scene.load.image("tile-box2", "./src/boilerplate/assets/image/tile-box2.png");
        this._scene.load.image("tile-mine", "./src/boilerplate/assets/image/tile-mine.png");
        this._scene.load.image("wall", "./src/boilerplate/assets/image/wall.png");
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
            delay: 3200,// ms
            startAt: 1250,
            callback: this.spawnRandomFormation,
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

    private createTileAtPixelCoords(x: number, y: number, tileType: number) {
        var key;
        if (tileType === 1) {
            key = 'tile-box';
        } else if (tileType === 2) {
            key = 'tile-box2';
        } else if (tileType === 3) {
            key = 'tile-mine';
        } else {
            console.error("illegal tile type " + tileType);
            return;
        }

        let tileSprite = this._scene.physics.add.sprite(x, y, key);

        let tile = new Tile(tileSprite);
        this._tilePhysicsGroup.add(tile.sprite);
        this._scene.physics.add.existing(tile.sprite);
        this._tiles.push(tile);
        return tile;
    }

    private createTileAtGridCoords(x: number, y: number, tileType: number) {
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
        this.createTileAtPixelCoords((x * 64) + 64, (y * 64) + 64, tileType);
    }

    private spawnRandomFormation() {
        let random = this.getRandomInt(3);
        if (random == 0) {
            this.spawnCircleFormation();
        } else if (random == 1) {
            this.spawnSquaresFormation();
        } else {
            this.spawnHourglassFormation();
        }
    }

    private getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    private spawnFormationFromGrid(grid: number[][]) {
        let yOffset = grid.length;
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                if (grid[i][j] !== 0) {
                    this.createTileAtGridCoords(j, i - yOffset, grid[i][j]);
                }
            }
        }
    }

    private spawnCircleFormation() {
        let grid: number[][] = [
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2],
            [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2],
            [2, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 2],
            [2, 0, 0, 3, 0, 0, 0, 0, 3, 2, 3, 0, 0, 0, 0, 3, 0, 0, 2],
            [2, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 2],
            [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2],
            [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
        ];
        this.spawnFormationFromGrid(grid);
    }

    private spawnSquaresFormation() {
        let grid: number[][] = [
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 1, 3, 1, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.spawnFormationFromGrid(grid);
    }

    private spawnHourglassFormation() {
        let grid: number[][] = [
            [3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3],
            [3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3],
            [3, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 3],
            [3, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 3],
            [3, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 3],
            [3, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 3],
            [3, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 3],
            [3, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 3],
            [3, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 3],
            [3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3],
            [3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3]
        ];
        this.spawnFormationFromGrid(grid);
    }
}