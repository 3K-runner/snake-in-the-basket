const sprites = require("./sprites")
Object.getOwnPropertyNames(sprites).map(p => global[p] = sprites[p])

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// Constant that represents the art grid size
const BITS = 16

// Constant that represents the frame rate
const FRAME_RATE = 240

// Mutable state
let state = initialState()

// Position helpers
// for entire square
// -Takes a coordinate and resizes it for the canvas 
const x = c => Math.round(c * canvas.width / (COLS + 1)) 
const y = r => Math.round(r * canvas.height / ROWS) 
// for grid art
// -Takes a coordinate and applies the grid on it
const xg = bc => c => x(bc.x + c.x/BITS) 
const yg = br => r => y(br.y + r.y/BITS)

// Draws a sprite on a position
const drawSprite = sprite => position => {
  sprite.map(p => {
    ctx.fillStyle = p.colour;
    ctx.fillRect(
      xg(position)(p), yg(position)(p),
      x(p.l/BITS), y(1/BITS));
  });
};

// Draws a bird
const drawBird = state => (birdSprite, frightMask) => birdIndex => {
  const birdCoord = state.birds[birdIndex];

  // Draw the main sprite
  drawSprite(birdSprite)(birdCoord);
  // Add the mask if frightened
  if (isFrightened(state)(birdIndex)){
    drawSprite(frightMask)(birdCoord);
  }
};

// Game loop draw
const draw = state => {
  // clear
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // Draw lives
  state.lives.map(drawSprite(LIVE));

  // Check crash/loose or win game states before drawing:
  // - Paths
  // - Maze
  // - Snake
  // - Birds
  // - Apples
  // - Eggs

  // add crash
  if (state.snake.length == 0){
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.fillRect(0, 0, x(COLS), canvas.height);

    return ;
  }
  // add win
  if ((state.apples.length == 0) && (state.eggs.length == 0)){
    // If all apples have been collected, the screen flashes green
    ctx.fillStyle = 'rgb(0,255,0)'
    ctx.fillRect(0, 0, x(COLS), canvas.height);

    return ;
  }

  // draw paths
  ctx.fillStyle = 'rgb(96, 64, 32)'
  ctx.fillRect(0, 0, x(COLS), canvas.height)
  
  // draw maze
  // - Walls dont fill the grid by default.
  // - Fill is added by the type:
  //   0: No fill
  //   1: Fill on north and west
  //   2: Fill on west
  //   3: Fill on north
  WALLS[0].map(p1 => {
    SPRITE_WALL.map(p2 => {
      ctx.fillStyle = p2.colour
      ctx.fillRect(xg(p1)(p2), yg(p1)(p2), x(p2.l/BITS), y(p2.l/BITS))
    })
    switch (p1.type) {
    case 0:
    	break;
    case 1:
      drawSprite(WALL_NORTH)(p1);
    case 2:
    WALL_WEST.map(p2 => {
      ctx.fillStyle = p2.colour
      ctx.fillRect(xg(p1)(p2), yg(p1)(p2), x(4/BITS), y(p2.l/BITS))
    })
      break;
    case 3:
      drawSprite(WALL_NORTH)(p1);
      break;
    }
  })
  WALLS[1].map(p1 => {
    //Basic colour
    ctx.fillStyle = 'rgb(233,233,140)'
    ctx.fillRect(x(p1.x), y(p1.y), x(1), y(1))
    
    //Details
    drawSprite(BASKET)(p1);
  })
  WALLS[2].map(p1 => {
    //2x2 "pixels"
    ctx.fillStyle = 'rgb(30,30,255)'
    BLUEBERRY.map(p2 => {
      ctx.fillRect(xg(p1)(p2), yg(p1)(p2), x(2/BITS), y(2/BITS))
    })
  })
  WALLS[3].map(p1 => {
    //2x3 "pixels"
    RASPBERRY.map(p2 => {
      ctx.fillStyle = p2.colour
      ctx.fillRect(xg(p1)(p2), yg(p1)(p2), x(2/BITS), y(1/BITS))
    })
  })

  // draw snake
  drawSprite(SNAKE)(state.snake[0]);

  // draw Birds
  drawBird(state)(EAGLE, EAGLESCARED)(0);
  drawBird(state)(SECY, SECYSCARED)(1);
  drawBird(state)(GUINE, GUINESCARED)(2);
  drawBird(state)(OWL, OWLSCARED)(3);

  // Draw apples
  state.apples.map(drawSprite(APPLE));

  // Draw eggs
  state.eggs.map(drawSprite(EGG));
}
// Game loop update
const step = t1 => t2 => {
  if (t2 - t1 > FRAME_RATE) {
    state = next(state);
    draw(state);
    window.requestAnimationFrame(step(t2))
  } else {
    window.requestAnimationFrame(step(t1))
  }
}

// Key events
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'h':  state = enqueue(state, NORTH); break
    case 'a': case 'j':  state = enqueue(state, WEST);  break
    case 's': case 'k':  state = enqueue(state, SOUTH); break
    case 'd': case 'l':  state = enqueue(state, EAST);  break
    default:
    e.preventDefault()
    return
  }
})

// Main
draw(state); window.requestAnimationFrame(step(0))
