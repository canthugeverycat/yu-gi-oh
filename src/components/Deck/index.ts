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
  countText: Phaser.GameObjects.Text | null = null;

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
      const card = new Card(this.scene, d, this.player, {
        x: CARD_WIDTH / 2 - i * DECK_STEP,
        y: CARD_HEIGHT / 2 - i * DECK_STEP,
      });
      this.container.add(card.object!);

      return card;
    });

    this.countText = this.scene.add
      .text(
        this.position.x + CARD_WIDTH / 2,
        this.player === PLAYER.A
          ? this.position.y + CARD_HEIGHT + 15
          : this.position.y - 20,
        `${this.cards.length}`
      )
      .setVisible(true)
      .setDepth(100)
      .setOrigin(0.5);

    this.shuffle();
  }

  shuffle() {
    const shuffled = [...this.cards];
    const indexes = this.cards.map((_, i) => i).slice(1);
    const swaps = [];

    for (let i = 1; i < shuffled.length; i++) {
      const index = indexes[Math.floor(Math.random() * indexes.length)];

      const selectedCard = shuffled.splice(index, 1)[0]; // Remove the selected element
      shuffled.splice(0, 0, selectedCard); // Insert it at index 0

      // Track the swap details
      swaps.push({
        target: selectedCard,
        from: index,
      });

      indexes.splice(
        indexes.findIndex((x) => x === index),
        1
      );
    }

    swaps.forEach((swap, i) => {
      const pos = { x: -CARD_WIDTH * 1.1, y: 0 };

      this.scene.tweens.add({
        targets: swap.target.object,
        y: swap.target.object!.y + pos.y,
        x: swap.target.object!.x + pos.x,
        displayHeight: CARD_HEIGHT * 1.1,
        displayWidth: CARD_WIDTH * 1.1,
        duration: 150,
        ease: 'Circ.easeInOut',
        yoyo: true,
        delay: i * 150,
        onYoyo: () => {
          this.container.remove(swap.target.object!);
          this.container.add(swap.target.object!);
        },
      });
    });

    this.cards = shuffled;

    this.scene.time.addEvent({
      delay: this.cards.length * 150,
      callback: () => {
        this.cards.forEach((card, i) => {
          this.container.remove(card.object!);

          const newX = CARD_WIDTH / 2 - i * DECK_STEP;
          const newY = CARD_HEIGHT / 2 - i * DECK_STEP;

          card.object!.setPosition(newX, newY);

          this.container.add(card.object!);
        });
      },
    });
  }

  drawCard(hand: Hand) {
    if (this.cards.length === 0) return;

    const card = this.cards.pop();

    if (!card || !card.object) return;

    this.countText!.setText(`${this.cards.length}`);

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

  drawCards(hand: Hand, count?: number) {
    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.drawCard(hand);
      },
      repeat: count ? count - 1 : 0,
    });
  }
}

export default Deck;
