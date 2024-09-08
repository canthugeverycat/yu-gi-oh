import { COLORS } from '../../globals/colors';
import { CARD_HEIGHT, CARD_WIDTH, PLAYER } from '../../globals/const';
import { ValuesOf } from '../../globals/types';
import Card from '../Card';

type ZoneType = {
  container: Phaser.GameObjects.Container;
  slot: Phaser.GameObjects.Graphics;
  card: Card | null;
};

type FieldType = {
  container: Phaser.GameObjects.Container | null;
  monsters: ZoneType[];
  spelltrap: ZoneType[];
};

const CARD_SPACING = 20;
const CARD_SLOT_PADDING = 10;
const CARD_WIDTH_BF = CARD_WIDTH * 0.8;
const CARD_HEIGHT_BF = CARD_HEIGHT * 0.8;

class BattleField {
  scene;

  fields: Record<ValuesOf<typeof PLAYER>, FieldType> = {
    [PLAYER.A]: {
      container: null,
      monsters: [],
      spelltrap: [],
    },
    [PLAYER.B]: {
      container: null,
      monsters: [],
      spelltrap: [],
    },
  };

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.createField(PLAYER.A);
  }

  createField(player: ValuesOf<typeof PLAYER>) {
    const totalWidth =
      (CARD_WIDTH_BF + CARD_SPACING + CARD_SLOT_PADDING * 2) * 5;

    this.fields[player].container = this.scene.add.container(
      window.innerWidth / 2 - totalWidth / 2,
      window.innerHeight -
        (CARD_HEIGHT_BF * 2 + CARD_SPACING) -
        CARD_HEIGHT_BF / 2
    );

    for (let i = 0; i < 10; i++) {
      const color = i < 5 ? COLORS.WHITE : COLORS.GREEN;
      const x =
        (CARD_WIDTH_BF + CARD_SPACING + CARD_SLOT_PADDING * 2) * (i % 5);
      const y =
        i < 5 ? 0 : CARD_HEIGHT_BF + CARD_SPACING + CARD_SLOT_PADDING * 2;

      const container = this.scene.add.container(x, y);
      const slot = this.scene.add.graphics();
      slot
        .lineStyle(1, color, 0.3)
        .strokeRect(
          0,
          0,
          CARD_WIDTH_BF + CARD_SLOT_PADDING * 2,
          CARD_HEIGHT_BF + CARD_SLOT_PADDING * 2
        );
      container.add(slot);

      this.fields[player].container?.add(container);
      this.fields[player].monsters.push({ container, slot, card: null });
    }
  }
}

export default BattleField;
