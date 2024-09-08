// Cards
export const CARD_ASPECT_RATIO = 417 / 614;
export const CARD_WIDTH = 100 as const;
export const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;
export const CARD_LOCATION = {
  DECK: 'deck',
  HAND: 'hand',
  GRAVEYARD: 'graveyard',
  FIELD: 'field',
};
export const CARD_FACE = {
  FRONT: 'front',
  BACK: 'back',
};
export const CARD_ORIENTATION = {
  ATTACK: 'attack',
  DEFENSE: 'defense',
};

// Player
export const PLAYER = { A: 'A', B: 'B' } as const;
