import {MainGameplayScene} from "./mainGameplayScene";

export class MenuScene extends Phaser.Scene {

    private _skipMenu = false;

    constructor() {
        super({
            key: "MenuScene"
        });
    }

    preload(): void {
        if (this._skipMenu) {
            this.scene.start("MainGameplayScene");
        }

        this.load.image("title", "./src/boilerplate/assets/image/menu/title.png");
        this.load.image("play", "./src/boilerplate/assets/image/menu/play.png");
        this.load.image("options", "./src/boilerplate/assets/image/menu/options.png");
        this.load.image("exit", "./src/boilerplate/assets/image/menu/exit.png");
        this.load.image("selector", "./src/boilerplate/assets/image/tile-mine.png");
    }

    create(): void {
        let titleImage = this.add.image(650, 200, 'title');
        let playImage = this.add.image(650, 415, 'play');
        let optionsImage = this.add.image(650, 515, 'options');
        let exitImage = this.add.image(650, 615, 'exit');

        let leftSelectorImage = this.add.image(500, 415, 'selector');
        let rightSelectorImage = this.add.image(800, 415, 'selector');
    }

    update(): void {

    }
}