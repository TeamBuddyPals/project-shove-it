import {MainGameplayScene} from "./mainGameplayScene";

export class MenuScene extends Phaser.Scene {

    private _skipMenu = false;
    private _leftSelectorImage: Phaser.Physics.Arcade.Sprite;
    private _leftSelectorAnimation: Phaser.GameObjects.GameObject;
    private _rightSelectorImage: Phaser.Physics.Arcade.Sprite;
    private _rightSelectorAnimation: Phaser.GameObjects.GameObject;
    private _currentMenuSelection: MenuSelection = MenuSelection.Play;


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

        this.load.spritesheet('selectorSpriteSheet',
            './src/boilerplate/assets/image/spritesheet/tile-mine.png',
            {frameWidth: 64}
        );
    }

    create(): void {
        this.add.image(650, 200, 'title');
        this.add.image(650, 415, 'play');
        this.add.image(650, 515, 'options');
        this.add.image(650, 615, 'exit');

        this._leftSelectorImage = this.physics.add.sprite(425, 415, 'selector');
        this._rightSelectorImage = this.physics.add.sprite(875, 415, 'selector');

        this.anims.create({
            key: 'selectorAnimation',
            frames: this.anims.generateFrameNumbers('selectorSpriteSheet', {start: 0, end: 4}),
            frameRate: 12,
            repeat: -1
        });

        this.input.keyboard.on('keydown_UP', this.upSelection, this);
        this.input.keyboard.on('keydown_DOWN', this.downSelection, this);
        this.input.keyboard.on('keydown_SPACE', this.selectOption, this);
        this.input.keyboard.on('keydown_ENTER', this.selectOption, this);
    }

    update(): void {
        this._leftSelectorAnimation = this._leftSelectorImage.anims.play('selectorAnimation', true);
        this._rightSelectorAnimation = this._rightSelectorImage.anims.play('selectorAnimation', true);
    }

    private upSelection(event) {
        let currentY = this._leftSelectorImage.y;
        if (currentY < 450) {
            return;
        }
        this._leftSelectorImage.setY(currentY - 100);
        this._rightSelectorImage.setY(currentY - 100);
        this._currentMenuSelection--;
    }

    private downSelection(event) {
        let currentY = this._leftSelectorImage.y;
        if (currentY > 600) {
            return;
        }
        this._leftSelectorImage.setY(currentY + 100);
        this._rightSelectorImage.setY(currentY + 100);
        this._currentMenuSelection++;
    }

    private selectOption(event) {
        console.log("menu option selected");
        if (this._currentMenuSelection === MenuSelection.Play) {
            this.scene.start("MainGameplayScene");
        } else if (this._currentMenuSelection === MenuSelection.Options) {
            //todo implement this
        } else {
            this.game.destroy(true);
        }
    }
}

enum MenuSelection {
    Play,
    Options,
    Exit
}