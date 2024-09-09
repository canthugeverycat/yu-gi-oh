const ASPECT_RATIO = 86 / 128;
const SIZE = 48;

class Cursor {
    scene!: Phaser.Scene;
    container!: Phaser.GameObjects.Container;
    cursor!: Phaser.GameObjects.Image;
    hover!: Phaser.GameObjects.Graphics;
    rightClick!: Phaser.GameObjects.Graphics;
    ignoreNextChange: boolean = false;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.scene.input.manager.canvas.style.cursor = 'none';
        this.scene.input.mouse!.disableContextMenu();

        this.container = this.scene.add.container(-100, -100);

        this.createCursors();

        this.scene.input.on('pointermove', (p: Phaser.Input.Pointer) => {
            this.container.setPosition(p.x, p.y);
        });

        this.scene.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
            if (p.rightButtonDown()) {
                this.rightClick.setVisible(true);
            }
        });


        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.attributeName === 'style') {
                    const type = this.scene.input.manager?.canvas?.style?.cursor;

                    switch(type) {
                        case '':
                            this.hover.setVisible(false);
                            this.rightClick.setVisible(false);
                            break;
                        case 'pointer':
                            this.hover.setVisible(true);
                            this.rightClick.setVisible(false);
                            this.scene.input.manager.canvas.style.cursor = 'none';
                            break;
                    }
                }
            });
        });
        observer.observe(this.scene.input.manager.canvas, { attributes: true, attributeFilter: ['style'] });
    }

    createCursors() {
        this.cursor = this.scene.add.image(0, 0, 'cursor').setOrigin(0).setDisplaySize(SIZE*ASPECT_RATIO, SIZE);
        
        this.hover = this.scene.add.graphics();

        this.hover.fillStyle(0xffd700);
        this.hover.fillRoundedRect(0, 0, 20, 20, 10);

        this.rightClick = this.scene.add.graphics();

        this.rightClick.fillStyle(0xff0000);
        this.rightClick.fillRoundedRect(0, 0, 20, 20, 10);

        this.container.add(this.hover);
        this.container.add(this.rightClick);
        this.container.add(this.cursor);

        this.hover.setVisible(false);
        this.rightClick.setVisible(false);
    }
}

export default Cursor;