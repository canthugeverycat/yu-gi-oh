import { CARD_FACE, CARD_LOCATION, CARD_WIDTH } from '../../globals/const';
import { PlayerType } from '../../globals/types';
import Card from '../Card';

const CARD_LIMIT = 6;
const CARD_SPACING = 10;

class Hand {
  scene;
  player;
  cards: Card[] = [];
  container: Phaser.GameObjects.Container | null = null;

  constructor(scene: Phaser.Scene, { player }: { player: PlayerType }) {
    this.scene = scene;
    this.player = player;

    this.createHandContainer();

    this.scene.events.on('ACTIONS.CARD_DRAW.END', this.addCardToHand, this);
  }

  createHandContainer = () => {
    const x = window.innerWidth / 2;
    const y = window.innerHeight;

    this.container = this.scene.add.container(x, y);

    const containerDebug = this.scene.add
      .rectangle(0, 0, 50, 50, 0xff0000)
      .setOrigin(0);

    this.container.add(containerDebug);
  };

  addCardToHand = (card: Card) => {
    const localX = this.getNextCardPositionX();
    card.object!.setPosition(localX, 0);

    this.cards.push(card);
    this.container?.add(card.object!);
    card.changeLocation(CARD_LOCATION.HAND);
    card.flip(CARD_FACE.FRONT);

    this.recenterHand();
  };

  getNextCardPositionX = (useGlobal?: boolean) => {
    const localX = this.cards.length * (CARD_WIDTH + CARD_SPACING);

    const centeredX = localX + CARD_WIDTH / 2;

    if (useGlobal) {
      const worldMatrix = this.container!.getWorldTransformMatrix();
      const globalX = worldMatrix.tx + centeredX * worldMatrix.scaleX;
      return globalX;
    }

    return centeredX;
  };

  recenterHand = () => {
    const totalWidth =
      this.cards.length * (CARD_WIDTH + CARD_SPACING) - CARD_SPACING;
    const x = window.innerWidth / 2 - totalWidth / 2;

    this.scene.tweens.add({
      targets: this.container,
      x: x,
      duration: 300,
      ease: 'Power2',
    });
  };
}

export default Hand;
