import { COLORS } from '../../globals/colors';
import { CARD_HEIGHT, CARD_WIDTH, PLAYER } from '../../globals/const';
import { ValuesOf } from '../../globals/types';
import Card from '../Card';

type ZoneType = { slot: Phaser.GameObjects.Graphics; card: Card | null };

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

    for (let x = 0; x < 10; x++) {
      const slot = this.scene.add.graphics();

      const color =
        x < 5
          ? COLORS.WHITE
          : COLORS.slot
              .lineStyle(1, COLORS.WHITE, 1)
              .strokeRect(
                (CARD_WIDTH_BF + CARD_SPACING + CARD_SLOT_PADDING * 2) * x,
                0,
                CARD_WIDTH_BF + CARD_SLOT_PADDING * 2,
                CARD_HEIGHT_BF + CARD_SLOT_PADDING * 2
              );

      this.fields[player].container?.add(slot);
      this.fields[player].monsters.push({ slot, card: null });
    }
  }
}

export default BattleField;
