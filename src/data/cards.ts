import ancientElf from '../assets/cards/monsters/ancient-elf.png';
import armoredStarfish from '../assets/cards/monsters/armored-starfish.png';
import baronOfTheFiendSword from '../assets/cards/monsters/baron-of-the-fiend-sword.jpg';
import basicInsect from '../assets/cards/monsters/basic-insect.png';
import beaverWarrior from '../assets/cards/monsters/beaver-warrior.png';
import celticGuardian from '../assets/cards/monsters/celtic-guardian.png';
import clawReacher from '../assets/cards/monsters/claw-reacher.png';
import dissolverock from '../assets/cards/monsters/dissolverock.png';
import dragonZombie from '../assets/cards/monsters/dragon-zombie.png';
import { ValuesOf } from '../globals/types';
import { CARD_ATTRIBUTE, CARD_TYPE } from './const';

export type CardData = {
  id: number;
  name: string;
  image: string;
  attribute: ValuesOf<typeof CARD_ATTRIBUTE>;
  type: ValuesOf<typeof CARD_TYPE>[];
  level: number;
  stats: {
    attack?: number;
    defense?: number;
  };
};

export const data: CardData[] = [
  {
    id: 93221206,
    name: 'Ancient Elf',
    attribute: CARD_ATTRIBUTE.LIGHT,
    type: [CARD_TYPE.SPELLCASTER, CARD_TYPE.NORMAL],
    level: 4,
    stats: {
      attack: 1450,
      defense: 1200,
    },
    image: ancientElf,
  },
  {
    id: 17535588,
    name: 'Armored Starfish',
    attribute: CARD_ATTRIBUTE.WATER,
    type: [CARD_TYPE.AQUA, CARD_TYPE.NORMAL],
    level: 4,
    stats: {
      attack: 850,
      defense: 1400,
    },
    image: armoredStarfish,
  },
  {
    id: 86325596,
    name: 'Baron of the Fiend Sword',
    attribute: CARD_ATTRIBUTE.DARK,
    type: [CARD_TYPE.FIEND, CARD_TYPE.NORMAL],
    level: 4,
    stats: {
      attack: 1550,
      defense: 800,
    },
    image: baronOfTheFiendSword,
  },
  {
    id: 89091579,
    name: 'Basic Insect',
    attribute: CARD_ATTRIBUTE.EARTH,
    type: [CARD_TYPE.INSECT, CARD_TYPE.NORMAL],
    level: 2,
    stats: {
      attack: 500,
      defense: 700,
    },
    image: basicInsect,
  },
  {
    id: 32452818,
    name: 'Beaver Warrior',
    attribute: CARD_ATTRIBUTE.EARTH,
    type: [CARD_TYPE.BEAST_WARRIOR, CARD_TYPE.NORMAL],
    level: 4,
    stats: {
      attack: 1200,
      defense: 1500,
    },
    image: beaverWarrior,
  },
  {
    id: 91152256,
    name: 'Celtic Guardian',
    attribute: CARD_ATTRIBUTE.EARTH,
    type: [CARD_TYPE.WARRIOR, CARD_TYPE.NORMAL],
    level: 4,
    stats: {
      attack: 1400,
      defense: 1200,
    },
    image: celticGuardian,
  },
  {
    id: 41218256,
    name: 'Claw Reacher',
    attribute: CARD_ATTRIBUTE.DARK,
    type: [CARD_TYPE.FIEND, CARD_TYPE.NORMAL],
    level: 3,
    stats: {
      attack: 1000,
      defense: 800,
    },
    image: clawReacher,
  },
  {
    id: 40826495,
    name: 'Dissolverock',
    attribute: CARD_ATTRIBUTE.EARTH,
    type: [CARD_TYPE.ROCK, CARD_TYPE.NORMAL],
    level: 3,
    stats: {
      attack: 900,
      defense: 1000,
    },
    image: dissolverock,
  },
  {
    id: 66672569,
    name: 'Dragon Zombie',
    attribute: CARD_ATTRIBUTE.DARK,
    type: [CARD_TYPE.ZOMBIE, CARD_TYPE.NORMAL],
    level: 3,
    stats: {
      attack: 1600,
      defense: 0,
    },
    image: dragonZombie,
  },
];
