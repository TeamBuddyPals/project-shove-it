import {Tile} from "./tile";

export class TileFormation {
    private _tiles: Array<Tile>;

    constructor(tiles: Array<Tile>) {
        if (tiles) {
            this._tiles = tiles;
        } else {
            this._tiles = [];
        }
    }

    update() {
        for (const tile of this._tiles) {
            tile.update();
        }
    }
}