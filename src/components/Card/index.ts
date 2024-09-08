import ImageCardBack from '../../assets/cards/templates/card-back.png';
import { CardData } from '../../data/cards';
import {
  CARD_FACE,
  CARD_HEIGHT,
  CARD_LOCATION,
  CARD_WIDTH,
  PLAYER,
} from '../../globals/const';
import { ValuesOf } from '../../globals/types';

class Card {
  data;
  object: Phaser.GameObjects.Image | null = null;
  scene;
  location = CARD_LOCATION.DECK;
  face = CARD_FACE.BACK;
  owner;

  constructor(
    scene: Phaser.Scene,
    data: CardData,
    owner: ValuesOf<typeof PLAYER>,
    position: { x: number; y: number }
  ) {
    this.scene = scene;
    this.data = data;
    this.owner = owner;

    this.create(position);
  }

  create = ({ x, y }: { x: number; y: number }) => {
    const card = this.scene.add
      .image(x, y, 'card-back')
      .setDisplaySize(CARD_WIDTH, CARD_HEIGHT)
      .setInteractive({ useHandCursor: true });

    this.object = card;
  };

  private attachHandEvents = () => {
    const hoverInY = this.object!.y + (this.owner === PLAYER.A ? -1 * 50 : 10);
    const hoverOutY = this.object!.y;

    this.object!.on('pointerover', () => {
      this.scene.tweens.add({
        targets: this.object!,
        displayWidth: CARD_WIDTH * 1.1,
        displayHeight: CARD_HEIGHT * 1.1,
        y: hoverInY,
        duration: 300,
        ease: 'Power2',
      });
    });

    this.object!.on('pointerout', () => {
      this.scene.tweens.add({
        targets: this.object!,
        displayWidth: CARD_WIDTH,
        displayHeight: CARD_HEIGHT,
        y: hoverOutY,
        duration: 300,
        ease: 'Power2',
      });
    });
  };

  changeLocation(location: ValuesOf<typeof CARD_LOCATION>) {
    this.location = location;

    this.clearMouseEvents();

    if (location === CARD_LOCATION.HAND) this.attachHandEvents();
  }

  private clearMouseEvents() {
    this.object?.off('pointerover');
    this.object?.off('pointerout');
  }

  flip(face: ValuesOf<typeof CARD_FACE>, instant?: boolean) {
    const setFlip = () => {
      this.face = face;

      this.object
        ?.setTexture(
          face === CARD_FACE.FRONT ? `card-${this.data.id}` : ImageCardBack
        )
        .setDisplaySize(CARD_WIDTH, CARD_HEIGHT);
    };

    if (instant) setFlip();

    this.scene.tweens.add({
      targets: this.object,
      displayWidth: 0,
      duration: 150,
      ease: 'Power2',
      onComplete: () => {
        setFlip();
        this.scene.tweens.add({
          targets: this.object,
          displayWidth: CARD_WIDTH,
          duration: 500,
          ease: 'Power2',
        });
      },
    });
  }
}

export default Card;
