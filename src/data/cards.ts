import ancientElf from '../assets/cards/monsters/ancient-elf.jpg';
import armoredStarfish from '../assets/cards/monsters/armored-starfish.jpg';
import baronOfTheFiendSword from '../assets/cards/monsters/baron-of-the-fiend-sword.jpg';
import basicInsect from '../assets/cards/monsters/basic-insect.jpg';
import beaverWarrior from '../assets/cards/monsters/beaver-warrior.jpg';
import celticGuardian from '../assets/cards/monsters/celtic-guardian.jpg';
import clawReacher from '../assets/cards/monsters/claw-reacher.jpg';
import dissolverock from '../assets/cards/monsters/dissolverock.jpg';
import dragonZombie from '../assets/cards/monsters/dragon-zombie.jpg';
import { ValuesOf } from '../globals/types';
import { CARD_ATTRIBUTE, CARD_CATEGORY, CARD_TYPE } from './const';

export type CardData = {
  id: string;
  name: string;
  category: ValuesOf<typeof CARD_CATEGORY>;
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
    id: 'ancient-elf',
    name: 'Ancient Elf',
    category: CARD_CATEGORY.MONSTER,
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
    id: 'armored-starfish',
    name: 'Armored Starfish',
    category: CARD_CATEGORY.MONSTER,
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
    id: 'baron-of-the-fiend-sword',
    name: 'Baron of the Fiend Sword',
    category: CARD_CATEGORY.MONSTER,
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
    id: 'basic-insect',
    name: 'Basic Insect',
    category: CARD_CATEGORY.MONSTER,
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
    id: 'beaver-warrior',
    name: 'Beaver Warrior',
    category: CARD_CATEGORY.MONSTER,
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
    id: 'celtic-guardian',
    name: 'Celtic Guardian',
    category: CARD_CATEGORY.MONSTER,
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
    id: 'claw-reacher',
    name: 'Claw Reacher',
    category: CARD_CATEGORY.MONSTER,
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
    id: 'dissolverock',
    name: 'Dissolverock',
    category: CARD_CATEGORY.MONSTER,
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
    id: 'dragon-zombie',
    name: 'Dragon Zombie',
    category: CARD_CATEGORY.MONSTER,
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
