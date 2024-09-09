import {
  CARD_FACE,
  CARD_HEIGHT,
  CARD_LOCATION,
  CARD_WIDTH,
  PLAYER,
} from '../../globals/const';
import { ValuesOf } from '../../globals/types';
import Card from '../Card';

const CARD_LIMIT = 6;
const CARD_SPACING = 10;

class Hand {
  scene;
  player;
  cards: Card[] = [];
  container: Phaser.GameObjects.Container | null = null;
  position: { x: number; y: number } = { x: 0, y: 0 };

  constructor(
    scene: Phaser.Scene,
    { player }: { player: ValuesOf<typeof PLAYER> }
  ) {
    this.scene = scene;
    this.player = player;

    this.createHandContainer();

    this.scene.events.on('ACTIONS.CARD_DRAW.END', this.addCardToHand, this);
  }

  createHandContainer = () => {
    const x = window.innerWidth / 2;
    const y = this.player === PLAYER.A ? window.innerHeight : 0;
    this.position = { x, y };

    this.container = this.scene.add.container(this.position.x, this.position.y);
  };

  addCardToHand = (player: ValuesOf<typeof PLAYER>, card: Card) => {
    if (player !== this.player) return;

    const localX = this.getNextCardPositionX();
    card.object!.setPosition(localX, 0);

    this.cards.push(card);
    this.container?.add(card.object!);
    card.changeLocation(CARD_LOCATION.HAND);

    if (player === PLAYER.A) card.flip(CARD_FACE.FRONT);

    this.recenterHand();

    card.object!.on('pointerdown', () => {
      const i = this.cards.findIndex((c) => c === card);
      this.cards.splice(i, 1);
      this.container?.remove(card.object!);

      card.object!.off('pointerdown');
      card.object!.off('pointerover');
      card.object!.off('pointerout');
      card.object!.setDisplaySize(CARD_WIDTH, CARD_HEIGHT);

      this.scene.events.emit('ACTIONS.CARD_PLACE', this.player, card);
    });
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
