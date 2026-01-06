// Art "Sprite Sheet" loading
const SPRITES_INFO = {
  LIVE:           { x: 0, y: 0 },
  APPLE:          { x: 1, y: 0 },
  EGG:            { x: 2, y: 0 },

  BASKET:         { x: 0, y: 1 },
  WALL:           { x: 1, y: 1 },
  WALL_UP_FILL:   { x: 2, y: 1 },
  WALL_SIDE_FILL: { x: 3, y: 1 },
  BLUEBERRY:      { x: 4, y: 1 },
  RASPBERRY:      { x: 5, y: 1 },

  SNAKE:          { x: 0, y: 2 },

  GUINE:          { x: 1, y: 2 },
  SECY:           { x: 2, y: 2 },
  OWL:            { x: 3, y: 2 },
  EAGLE:          { x: 4, y: 2 },

  GUINESCARED:    { x: 5, y: 2 },
  SECYSCARED:     { x: 5, y: 2 },
  OWLSCARED:      { x: 6, y: 2 },
  EAGLESCARED:    { x: 7, y: 2 },
}
const SPRITES = async bits => {
  const img = document.getElementById('spritesheet');
  if (!img.complete) await new Promise(res => { img.onload = res; });
  const SPRITE_SHEET = await createImageBitmap(img);

  const entries = await Promise.all(Object.entries(SPRITES_INFO).map(
	async ([key, position]) => [key, await createImageBitmap(
	  SPRITE_SHEET,
	  position.x * bits, position.y * bits,
	  bits, bits,
    )]
  ));

  return Object.fromEntries(entries);
}

module.exports = {SPRITES}
