import { COLORS } from '../../globals/colors';
import { ValuesOf } from '../../globals/types';
import EventsCenter from '../../utils/EventsCenter';
import { MOUSE_EVENTS, MOUSE_STATE } from './events';

const ASPECT_RATIO = 86 / 128;
const SIZE = 48;

class Cursor {
  scene!: Phaser.Scene;
  container!: Phaser.GameObjects.Container;
  cursor!: Phaser.GameObjects.Image;
  ignoreNextChange: boolean = false;

  states: Record<
    ValuesOf<typeof MOUSE_STATE>,
    Phaser.GameObjects.Graphics | null
  > = {
    [MOUSE_STATE.DEFAULT]: null,
    [MOUSE_STATE.SUMMON]: null,
    [MOUSE_STATE.SET]: null,
  };

  particles!: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.scene.input.manager.canvas.style.cursor = 'none';
    this.scene.input.mouse!.disableContextMenu();

    this.container = this.scene.add.container(-100, -100);

    this.createCursors();

    this.createParticles();

    this.createListeners();

    this.scene.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      this.container.setPosition(p.x, p.y);
    });
  }

  createCursors() {
    this.cursor = this.scene.add
      .image(0, 0, 'cursor')
      .setOrigin(0)
      .setDisplaySize(SIZE * ASPECT_RATIO, SIZE);

    this.states[MOUSE_STATE.SUMMON] = this.scene.add.graphics();

    this.states[MOUSE_STATE.SUMMON]!.fillStyle(COLORS.LIGHT_TEAL);
    this.states[MOUSE_STATE.SUMMON]!.fillRoundedRect(15, -15, 15, 25, 2);

    this.states[MOUSE_STATE.SET] = this.scene.add.graphics();

    this.states[MOUSE_STATE.SET]!.fillStyle(COLORS.LIGHT_TEAL);
    this.states[MOUSE_STATE.SET]!.fillRoundedRect(10, -7.5, 25, 15, 2);

    this.container.add(this.states[MOUSE_STATE.SUMMON]!);
    this.container.add(this.states[MOUSE_STATE.SET]!);
    this.container.add(this.cursor);

    this.states[MOUSE_STATE.SUMMON]!.setVisible(false);
    this.states[MOUSE_STATE.SET]!.setVisible(false);
  }

  createListeners() {
    EventsCenter.on(
      MOUSE_EVENTS.CHANGE_STATE,
      (state: ValuesOf<typeof MOUSE_STATE>) => {
        if (state === MOUSE_STATE.SET || state === MOUSE_STATE.SUMMON) {
          console.log('STARTING', state);
          this.particles?.setVisible(true);
        } else {
          this.particles?.setVisible(false);
        }

        if (
          state === MOUSE_STATE.SET &&
          this.states[MOUSE_STATE.SET]?.visible
        ) {
          this.states[MOUSE_STATE.SET]?.setVisible(false);
          this.states[MOUSE_STATE.SUMMON]?.setVisible(true);
          return;
        }

        for (const [s, o] of Object.entries(this.states)) {
          o?.setVisible(s === state);
        }
      }
    );
  }

  createParticles() {
    this.particles = this.scene.add.particles(0, 0, 'particle-gold', {
      x: 0,
      y: 0,
      speed: { min: 100, max: 100 },
      lifespan: 500,
      scale: { start: 0.1, end: 0 },
      gravityY: 100,
      angle: { min: 0, max: 360 },
      blendMode: 'SOFT_LIGHT',
      quantity: 3,
      alpha: 0.5,
    });

    this.container.add(this.particles);

    this.particles.start();
    this.particles.setVisible(false);
  }
}

export default Cursor;
