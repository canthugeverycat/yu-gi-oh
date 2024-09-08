import { data } from '../../data/cards';
import { CARD_HEIGHT, CARD_WIDTH, PLAYER } from '../../globals/const';
import { ValuesOf } from '../../globals/types';
import Card from '../Card';
import Hand from '../Hand';

const DECK_STEP = 1;

class Deck {
  scene;
  container: Phaser.GameObjects.Container;
  player;
  cards: Card[] = [];
  position;
  hoverText: Phaser.GameObjects.Text | null = null;
  showHoverText = false;

  constructor(
    scene: Phaser.Scene,
    { player }: { player: ValuesOf<typeof PLAYER> }
  ) {
    this.scene = scene;
    this.player = player;
    this.position =
      this.player === PLAYER.A
        ? {
            x: window.innerWidth - CARD_WIDTH - 30,
            y: window.innerHeight - CARD_HEIGHT - 30,
          }
        : {
            x: window.innerWidth - CARD_WIDTH - 30,
            y: 40,
          };

    this.container = this.scene.add.container(this.position.x, this.position.y);
  }

  createCards() {
    this.cards = data.map((d, i) => {
      const card = new Card(this.scene, d, {
        x: CARD_WIDTH / 2 - i * DECK_STEP,
        y: CARD_HEIGHT / 2 - i * DECK_STEP,
      });
      this.container.add(card.object!);

      return card;
    });

    this.shuffleDeck();

    this.createHitArea();
  }

  shuffleDeck() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  createHitArea() {
    const hitArea = this.scene.add
      .rectangle(0, 0, CARD_WIDTH, CARD_HEIGHT)
      .setInteractive({ useHandCursor: true, hitArea: true })
      .setOrigin(0)
      .setDepth(10)
      .setAlpha(1);
    this.container.add(hitArea);
    this.container.moveTo(hitArea, this.container.length - 1);

    hitArea.on('pointerover', (p: Phaser.Input.Pointer) => {
      this.hoverText
        ?.setPosition(p.x, p.y)
        .setVisible(true)
        .setText(`${this.cards.length} cards in deck`);
      this.showHoverText = true;
    });

    hitArea.on('pointerout', (p: Phaser.Input.Pointer) => {
      this.hoverText?.setVisible(false);
      this.showHoverText = false;
    });

    this.hoverText = this.scene.add
      .text(0, 0, `Cards in deck`)
      .setVisible(false)
      .setDepth(2)
      .setOrigin(0.5);

    this.scene.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      if (!this.hoverText) return;

      if (this.showHoverText) {
        this.hoverText.setPosition(p.x, p.y - 20);
      }
    });
  }

  drawCard(hand: Hand) {
    if (this.cards.length === 0) return;

    const card = this.cards.pop();

    if (!card || !card.object) return;

    const worldMatrix = this.container.getWorldTransformMatrix();
    const globalX = worldMatrix.tx + card.object.x * worldMatrix.scaleX;
    const globalY = worldMatrix.ty + card.object.y * worldMatrix.scaleY;

    this.container.remove(card.object);
    card.object.setPosition(globalX, globalY);

    const handX = hand.getNextCardPositionX(true);

    this.scene.tweens.add({
      targets: card.object,
      x: handX,
      y: this.player === PLAYER.A ? window.innerHeight : 0,
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        this.scene.events.emit('ACTIONS.CARD_DRAW.END', this.player, card);
      },
    });
  }
}

export default Deck;
