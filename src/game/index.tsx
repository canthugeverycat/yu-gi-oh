import Phaser from 'phaser';
import { useEffect, useState } from 'react';

import ImageCardBack from '../assets/cards/templates/card-back.png';
import ImageCursor from '../assets/cursor/cursor.png';
import ImageParticleGold from '../assets/effects/particle-gold.png';
import BattleField from '../components/Battlefield';
import Cursor from '../components/Cursor';
import Deck from '../components/Deck';
import Hand from '../components/Hand';
import { data } from '../data/cards';
import { COLORS } from '../globals/colors';
import { PLAYER } from '../globals/const';
import styles from './index.module.scss';

const Game = () => {
  const [game, setGame] = useState<Phaser.Game | null>(null);

  const [playerHand, setPlayerHand] = useState<Hand | null>(null);
  const [playerDeck, setPlayerDeck] = useState<Deck | null>(null);

  const [oponentHand, setOponentHand] = useState<Hand | null>(null);
  const [oponentDeck, setOponentDeck] = useState<Deck | null>(null);

  const [battlefield, setBattlefield] = useState<BattleField | null>(null);

  const preload = function (this: Phaser.Scene) {
    this.load.image('cursor', ImageCursor);
    this.load.image('particle-gold', ImageParticleGold);
    this.load.image('card-back', ImageCardBack);

    data.forEach((d) => this.load.image(`card-${d.id}`, d.image));
  };

  const create = function (this: Phaser.Scene) {
    const battlefield = new BattleField(this);
    setBattlefield(battlefield);

    const pDeck = new Deck(this, { player: PLAYER.A });
    const pHand = new Hand(this, { player: PLAYER.A });
    pDeck.createCards();

    setPlayerDeck(pDeck);
    setPlayerHand(pHand);

    const oDeck = new Deck(this, { player: PLAYER.B });
    const oHand = new Hand(this, { player: PLAYER.B });
    oDeck.createCards();

    setOponentDeck(oDeck);
    setOponentHand(oHand);

    this.time.addEvent({
      delay: 2000,
      callback: () => {
        pDeck.drawCards(pHand, 5);
        oDeck.drawCards(oHand, 4);
      },
    });

    const cursor = new Cursor(this);
  };

  const update = function (this: Phaser.Scene) {
    // Game logic here
  };

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: COLORS.JET_BLACK,
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
    parent: 'game',
  };

  useEffect(() => {
    const g = new Phaser.Game(config);
    setGame(g);

    return () => g.destroy(true);
  }, []);

  return <div id="game" className={styles.container}></div>;
};

export default Game;
