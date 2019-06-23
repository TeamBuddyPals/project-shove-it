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

        this.load.image("title", "./src/boilerplate/assets/title.png");
    }

    create(): void {
        let titleImage = this.add.image(650, 200, 'title');
        this.add.text(650, 375, 'Play', { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '40px' });
        this.add.text(650, 450, 'Options', { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '40px' });
        this.add.text(650, 525, 'Exit', { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '40px' });
    }

    update(): void {

    }
}