const snake_js = require("./snake");
Object.getOwnPropertyNames(snake_js).map(p => global[p] = snake_js[p]);
const sprites_js = require("./sprites");
Object.getOwnPropertyNames(sprites_js).map(p => global[p] = sprites_js[p]);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Constant that represents the art grid size
const BITS = 16;

// Scale factor
const SCALE_FACTOR = 2;

const CELL_SIZE = Math.round(BITS * SCALE_FACTOR);

// Dynamically size canvas based on engine constants before grid calculations
canvas.width = CELL_SIZE * (COLS + 1);
canvas.height = CELL_SIZE * ROWS;

// Disable image smoothing for pixelated effect on ImageBitmaps
ctx.imageSmoothingEnabled = false;

// Constant that represents the frame rate
const FRAME_RATE = 240;

// Mutable state
let state = initialState();

// Canvas dimensions
const CANVAS_WIDTH = Number(canvas.width);
const CANVAS_HEIGHT = Number(canvas.height);
// Size of each grid cell
const GRID_WIDTH = CELL_SIZE;
const GRID_HEIGHT = CELL_SIZE;

// Position helpers
// for entire square
// -Takes a coordinate and resizes it for the canvas
const x = col => Math.round(col * GRID_WIDTH);
const y = row => Math.round(row * GRID_HEIGHT);

// Draws a ImageBitmap sprite on a position
const drawImageBitmapSprite = sprite => position => {
  ctx.drawImage(
	  sprite,
	  x(position.x), y(position.y),
    GRID_WIDTH, GRID_HEIGHT
  );
}

const drawBird = state => sprites => (birdName, birdIndex) => {
  const birdCoord = state.birds[birdIndex];

  // Draw the main sprite
  drawImageBitmapSprite(sprites[birdName])(birdCoord);
  // Add the mask if frightened
  if (isFrightened(state)(birdIndex)){
    drawImageBitmapSprite(sprites[birdName+"SCARED"])(birdCoord);
  }
};

// Game loop draw
const draw = sprites => state => {
  // clear
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  // Draw lives
  state.lives.forEach(position => drawImageBitmapSprite(sprites["LIVE"])(position));

  // Check crash/loose or win game states before drawing:
  // - Paths
  // - Maze
  // - Apples
  // - Eggs
  // - Snake
  // - Birds

  // add crash
  if (state.snake.length == 0){
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.fillRect(0, 0, x(COLS), CANVAS_HEIGHT);

    return ;
  }
  // add win
  if ((state.apples.length == 0) && (state.eggs.length == 0)){
    // If all apples have been collected, the screen flashes green
    ctx.fillStyle = 'rgb(0,255,0)';
    ctx.fillRect(0, 0, x(COLS), CANVAS_HEIGHT);

    return ;
  }

  // draw paths
  ctx.fillStyle = 'rgb(96, 64, 32)';
  ctx.fillRect(0, 0, x(COLS), CANVAS_HEIGHT);
  
  // draw maze
  // - Walls have padding (visual) by default.
  // - Join fill is added to the wall if:
  //   - Wall exists north of it: WALL_UP_FILL
  //   - Wall exists west of it: WALL_SIDE_FILL
  WALLS[0].forEach(p1 => {
    const findPosition = position => WALLS[0].findIndex(p => p.x === position.x && p.y === position.y) !== -1;
    // Main wall
    drawImageBitmapSprite(sprites["WALL"])(p1);

    // Add wall fills to connect to other walls
    if (findPosition(makeMove(p1)(NORTH))) {
      drawImageBitmapSprite(sprites["WALL_UP_FILL"])(
        makeMove(p1)({ x: 0, y: -0.5 })
      );
    }
    if (findPosition(makeMove(p1)(WEST))) {
      drawImageBitmapSprite(sprites["WALL_SIDE_FILL"])(
        makeMove(p1)({ x: -0.5, y: 0 })
      );
    }
  })
  WALLS[1].forEach(position => drawImageBitmapSprite(sprites["BASKET"])(position));
  
  // Masks for berry bushes
  BERRY_MASKS[0].forEach(position => drawImageBitmapSprite(sprites["BLUEBERRY"])(position));
  BERRY_MASKS[1].forEach(position => drawImageBitmapSprite(sprites["RASPBERRY"])(position));

  // Draw apples
  state.apples.forEach(position => drawImageBitmapSprite(sprites["APPLE"])(position));

  // Draw eggs
  state.eggs.forEach(position => drawImageBitmapSprite(sprites["EGG"])(position));

  // Draw snake
  drawImageBitmapSprite(sprites["SNAKE"])(state.snake[0]);

  // Draw birds
  ["EAGLE", "SECY", "GUINE", "OWL"].forEach((birdName, birdIndex) => {
    drawBird(state)(sprites)(birdName, birdIndex);
  });
}

// Game loop update
const step = sprites => t1 => t2 => {
  const stepToUse = (t2 - t1 > FRAME_RATE) ? t2 : t1;
  if (t2 - t1 > FRAME_RATE) {
    state = next(state);
    draw(sprites)(state);
  } 
  window.requestAnimationFrame(step(sprites)(stepToUse));
}

// Key events (Procedure)
window.addEventListener('keydown', e => {
  e.preventDefault();

  const keyPattern = [NORTH, WEST, SOUTH, EAST];
  const keyBidings = [
    ["w", "a", "s", "d"],
    ["h", "j", "k", "l"]
  ];
  // Find triggered moves and enqueue them.
  // OBS: Each key press should trigger on only one bidding, but this can handle multiple.
  keyBidings.reduce((acc, keys) => {
    const moveIndex = keys.indexOf(e.key.toLowerCase());
    return (moveIndex != -1) ? acc.concat([keyPattern[moveIndex]]) : acc;
  }, []).forEach(move => {
    state = enqueue(state, move);
  });
});

// Main
// - Wait for sprites to load before starting the game loop
SPRITES(BITS).then(sprites => {
  draw(sprites)(state); window.requestAnimationFrame(step(sprites)(0));
});
