import {MainGameplayScene} from "./mainGameplayScene";

export class MenuScene extends Phaser.Scene {

    private _skipMenu = true;

    constructor() {
        super({
            key: "MenuScene"
        });
    }

    preload(): void {
        if (this._skipMenu) {
            this.scene.start("MainGameplayScene");
        }
    }

    create(): void {

    }

    update(): void {
    }
}