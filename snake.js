const base = require('./base')
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])

// Constants 
// maze size
const COLS  = 20
const ROWS  = 14
// movement 
const NORTH = { x: 0, y:-1 } 
const SOUTH = { x: 0, y: 1 } 
const EAST  = { x: 1, y: 0 } 
const WEST  = { x:-1, y: 0 }
const STOP  = { x: 0, y: 0 } // Move Stop
// position
const WALLS  = [
  // Bush walls
  [{ x: 0, y: 0, type: 0 }, { x: 1, y: 0, type: 2 }, 
   { x: 2, y: 0, type: 2 }, { x: 3, y: 0, type: 2 },
   { x: 4, y: 0, type: 2 }, { x: 5, y: 0, type: 2 }, 
   { x: 6, y: 0, type: 2 }, { x: 7, y: 0, type: 2 },
   { x: 8, y: 0, type: 2 }, { x: 9, y: 0, type: 2 },
   { x:10, y: 0, type: 2 }, { x:11, y: 0, type: 2 },
   { x:12, y: 0, type: 2 }, { x:13, y: 0, type: 2 },
   { x:14, y: 0, type: 2 }, { x:15, y: 0, type: 2 },
   { x:16, y: 0, type: 2 }, { x:17, y: 0, type: 2 },
   { x:18, y: 0, type: 2 }, { x:19, y: 0, type: 2 },
   
   { x: 0, y: 1, type: 3 }, { x:19, y: 1, type: 3 },
   
   { x: 0, y: 2, type: 3 }, { x: 2, y: 2, type: 0 },
   { x: 3, y: 2, type: 2 }, { x: 5, y: 2, type: 0 },
   { x: 8, y: 2, type: 0 }, { x: 9, y: 2, type: 2 },
   { x:10, y: 2, type: 2 }, { x:11, y: 2, type: 2 },
   { x:14, y: 2, type: 0 }, { x:16, y: 2, type: 0 },
   { x:17, y: 2, type: 2 }, { x:19, y: 2, type: 3 },
   
   { x: 0, y: 3, type: 3 }, { x: 2, y: 3, type: 3 },
   { x: 3, y: 3, type: 1 }, { x: 5, y: 3, type: 3 },
   { x: 6, y: 3, type: 2 }, { x: 8, y: 3, type: 3 }, 
   { x: 9, y: 3, type: 1 }, { x:10, y: 3, type: 1 }, 
   { x:11, y: 3, type: 1 }, { x:13, y: 3, type: 0 },
   { x:14, y: 3, type: 1 }, { x:16, y: 3, type: 3 },
   { x:17, y: 3, type: 1 }, { x:19, y: 3, type: 3 },
   
   { x: 0, y: 4, type: 3 }, { x: 5, y: 4, type: 3 },
   { x:14, y: 4, type: 3 }, { x:19, y: 4, type: 3 },
   
   { x: 0, y: 5, type: 3 }, { x: 1, y: 5, type: 2 },
   { x: 2, y: 5, type: 2 }, { x: 3, y: 5, type: 2 },
   { x: 5, y: 5, type: 3 }, { x:14, y: 5, type: 3 },
   { x:16, y: 5, type: 0 }, { x:17, y: 5, type: 2 },
   { x:18, y: 5, type: 2 }, { x:19, y: 5, type: 1 },
   
   { x: 0, y: 7, type: 0 }, { x: 2, y: 7, type: 0 },
   { x: 3, y: 7, type: 2 }, { x: 5, y: 7, type: 0 },
   { x: 6, y: 7, type: 2 }, { x:13, y: 7, type: 0 },
   { x:14, y: 7, type: 2 }, { x:16, y: 7, type: 0 },
   { x:17, y: 7, type: 2 }, { x:19, y: 7, type: 0 },
   
   { x: 0, y: 8, type: 3 }, { x:19, y: 8, type: 3 },
   
   { x: 0, y: 9, type: 3 }, { x: 1, y: 9, type: 2 },
   { x: 3, y: 9, type: 0 }, { x: 5, y: 9, type: 0 },
   { x: 7, y: 9, type: 0 }, { x: 8, y: 9, type: 2 }, 
   { x: 9, y: 9, type: 2 }, { x:10, y: 9, type: 2 }, 
   { x:11, y: 9, type: 2 }, { x:12, y: 9, type: 2 },
   { x:14, y: 9, type: 0 }, { x:16, y: 9, type: 0 },
   { x:18, y: 9, type: 0 }, { x:19, y: 9, type: 1 },
   
   { x: 0, y:10, type: 3 }, { x: 5, y:10, type: 3 },
   { x: 9, y:10, type: 3 }, { x:10, y:10, type: 3 },
   { x:14, y:10, type: 3 }, { x:19, y:10, type: 3 },
   
   { x: 0, y:11, type: 3 }, { x: 2, y:11, type: 0 },
   { x: 3, y:11, type: 2 }, { x: 4, y:11, type: 2 },
   { x: 5, y:11, type: 1 }, { x: 6, y:11, type: 2 },
   { x: 7, y:11, type: 2 }, { x: 9, y:11, type: 3 },
   { x:10, y:11, type: 1 }, { x:12, y:11, type: 0 },
   { x:13, y:11, type: 2 }, { x:14, y:11, type: 1 },
   { x:15, y:11, type: 2 }, { x:16, y:11, type: 2 },
   { x:17, y:11, type: 2 }, { x:19, y:11, type: 3 },
   
   { x: 0, y:12, type: 3 }, { x:19, y:12, type: 3 },
   
   { x: 0, y:13, type: 3 }, { x: 1, y:13, type: 2 }, 
   { x: 2, y:13, type: 2 }, { x: 3, y:13, type: 2 },
   { x: 4, y:13, type: 2 }, { x: 5, y:13, type: 2 }, 
   { x: 6, y:13, type: 2 }, { x: 7, y:13, type: 2 },
   { x: 8, y:13, type: 2 }, { x: 9, y:13, type: 2 },
   { x:10, y:13, type: 2 }, { x:11, y:13, type: 2 },
   { x:12, y:13, type: 2 }, { x:13, y:13, type: 2 },
   { x:14, y:13, type: 2 }, { x:15, y:13, type: 2 },
   { x:16, y:13, type: 2 }, { x:17, y:13, type: 2 },
   { x:18, y:13, type: 2 }, { x:19, y:13, type: 1 },],

  // Basket
  [{ x: 7, y: 5 }, { x: 8, y: 5 }, { x:11, y: 5 }, { x:12, y: 5 }, 
   { x: 8, y: 6 }, { x:11, y: 6 }, { x: 8, y: 7 }, { x: 9, y: 7 }, 
   { x:10, y: 7 }, { x:11, y: 7 }]                                         
]
const INSIDE_BASKET = [{ x: 9, y: 5 }, { x:10, y: 5 },
                       { x: 9, y: 6 }, { x:10, y: 6 }]
const BERRY_MASKS = [
  // Blueberry
  [{ x: 4, y: 0 }, { x: 5, y: 3 }, { x: 4, y: 0 }, { x:17, y: 5 },
   { x: 4, y:11 }, { x: 8, y: 9 }, { x:14, y:13 }, { x:16, y: 9 }],
  
  // Raspberry
  [{ x:16, y: 0 }, { x: 1, y: 5 }, { x: 6, y: 7 }, { x: 14, y: 3 },
   { x:14, y:10 }, { x: 6, y:13 }]
]
const START_APPLES = [
   { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
   { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 },
   { x: 9, y: 1 }, { x:10, y: 1 }, { x:11, y: 1 }, { x:12, y: 1 },
   { x:13, y: 1 }, { x:14, y: 1 }, { x:15, y: 1 }, { x:16, y: 1 }, 
   { x:17, y: 1 }, { x:18, y: 1 },
                
   { x: 1, y: 2 }, { x: 4, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 }, 
   { x:12, y: 2 }, { x:13, y: 2 }, { x:15, y: 2 }, { x:18, y: 2 },
                
   { x: 1, y: 3 }, { x: 4, y: 3 }, { x:15, y: 3 }, { x:18, y: 3 },
                
   { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x:15, y: 4 }, 
   { x:16, y: 4 }, { x:17, y: 4 },
                
   { x: 4, y: 5 }, { x:15, y: 5 }, { x: 4, y: 6 }, { x:15, y: 6 },
   { x: 4, y: 7 }, { x:15, y: 7 },
                
   { x: 1, y: 8 }, { x: 2, y: 8 }, { x: 3, y: 8 }, { x: 4, y: 8 },
   { x:15, y: 8 }, { x:16, y: 8 }, { x:17, y: 8 }, { x:18, y: 8 },
                
   { x: 2, y: 9 }, { x: 4, y: 9 }, { x:15, y: 9 }, { x:17, y: 9 },
                
   { x: 2, y:10 }, { x: 3, y:10 }, { x: 4, y:10 }, { x: 6, y:10 },
   { x: 7, y:10 }, { x: 8, y:10 }, { x:11, y:10 }, { x:12, y:10 }, 
   { x:13, y:10 }, { x:15, y:10 }, { x:16, y:10 }, { x:17, y:10 },
                
   { x: 1, y:11 }, { x: 8, y:11 }, { x:11, y:11 }, { x:18, y:11 },
                
   { x: 1, y:12 }, { x: 2, y:12 }, { x: 3, y:12 }, { x: 4, y:12 },
   { x: 5, y:12 }, { x: 6, y:12 }, { x: 7, y:12 }, { x: 8, y:12 },
   { x: 9, y:12 }, { x:10, y:12 }, { x:11, y:12 }, { x:12, y:12 },
   { x:13, y:12 }, { x:14, y:12 }, { x:15, y:12 }, { x:16, y:12 }, 
   { x:17, y:12 }, { x:18, y:12 }]
                
const START_EGGS   = [{ x: 1, y: 4 }, { x: 1, y:10 }, 
                      { x:18, y: 4 }, { x:18, y:10 }]

const START_SNAKE  = [{ x: 9, y: 8 }] // Starting position

const START_BIRDS  = [{ x: 9, y: 5 }, 
                      { x:10, y: 6 }, 
                      { x: 9, y: 6 },
                      { x:10, y: 5 }]

const START_LIVES  = [{ x:20, y: 1 },
                      { x:20, y: 0 }]

const SCATTER_TARGETS = [{ x:20, y: 0 }, 
                         { x:20, y:15 }, 
                         { x:-1, y:15 },
                         { x:-1, y: 0 }]

// Point operation
const pointEqual = position1 => position2 => (position1.x == position2.x 
                                              && 
                                              position1.y == position2.y)

// Scale move by a factor
const scaleMove  = move => factor => ({
  x: move.x * factor,
  y: move.y * factor
})

// Returns a random position inside the game limits
const randomPosition = () => ({
  x: randomNumber(0)(COLS - 1),
  y: randomNumber(0)(ROWS - 1)
})

// Helper to map over birds
const mapFromBirdsList = func => START_BIRDS.map((_, i) => func(i))

// Boolean tests
// -foods
const wontEat          = state => p => !pointEqual(nextBite(state))(p)
const eggWillBeEaten   = state => state.eggs.some(pointEqual(nextBite(state))) 
// -snake state
// Check if any bird will eat the snake
const willSnakeBeEaten = state => mapFromBirdsList(index => 
  isFrightened(state)(index) 
    ? false
    : willBirdBeEaten(state)(index)
).some(a => a)
// -bird states
const willBirdBeEaten = state => i =>
  (pointEqual(nextBite(state))(state.birds[i])
    &&
    pointEqual(nextBeak(state)(i))(state.snake[0]))
  || 
  pointEqual(state.snake[0])(state.birds[i])
const isFrightened    = state => i => (state.frightened[i] != 0)
const isFrightOver    = state => i => (state.timegame - state.frightened[i]) > 15
// Bird waits before it starts moving in a new turn
const isTimeToPeck    = state => i => (state.timegame >= (i * 10))
// Alternates scatter and chase every 35 game ticks 
const areBirdsInScatterMode = state => ((Math.trunc(state.timegame / 35) % 2) == 0)
// -movement and position
const willAvoidMaze  = p => !(WALLS.flat().some(pointEqual(p)))
const isInsideBasket = p => INSIDE_BASKET.some(pointEqual(p))
// Birds cant turn around
const notOpositeMove = move1 => move2 =>
  (move1.x + move2.x != 0) || (move1.y + move2.y != 0)
// -game states
const gameWaiting   = state => (pointEqual(state.moves[0])(STOP)
                                &&
                                state.moves.length == 1)
const gameLost      = state => (state.lives.length == 0)
const gameWon       = state => (state.apples.length == 0 && state.eggs.length == 0)

// Functions that return updated states
// -moves (snake movement)
const nextMoves = state => (state.moves.length > 1) ? dropFirst(state.moves) : state.moves
// Adjust position within the game limits
const adjustPosition = position => ({
  x: adjustInterval(COLS)(position.x),
  y: adjustInterval(ROWS)(position.y)
})
// -snake
const nextBite  = state => adjustPosition(makeMove(state.snake[0])(state.moves[0]))
const nextSnake = state => willSnakeBeEaten(state)
  ? []
  : (willAvoidMaze(nextBite(state))
    ? [nextBite(state)]
    : state.snake)
// -pecks (bird movement)
const nextPeck = state => i => {
  // Preference in this order,
  // from highest to lowest
  const optionsPeck1 = [NORTH, WEST, SOUTH, EAST];
  // Avoids turning around (180)
  const optionsPeck2 = [...optionsPeck1].filter(notOpositeMove(state.pecks[i]));
  // Does not hit the maze walls
  const optionsPeck3 = [...optionsPeck2].filter(m => willAvoidMaze(makeMove(state.birds[i])(m)));
  
  const targetToUse = isFrightened(state)(i)
    ? randomPosition()
    : (areBirdsInScatterMode(state) 
      ? SCATTER_TARGETS[i]
      : chaseTarget(state)(i))
    
  // Orders the movements according to 
  // the distance from the bird to the target
  // From closest to furthest
  const optionsPeck4 = (optionsPeck3.length > 1)
    ? orderMoves([...optionsPeck3])(targetToUse)(state.birds[i])
    // If the bird is cornered, it will turn around
    : (optionsPeck3.length > 0
      ? optionsPeck3
      : scaleMove(state.pecks[i])(-1))

  // Avoid getting stuck in the basket
  if (isInsideBasket(state.birds[i]) && !isFrightened(state)(i)) {
    return NORTH;
  }

  // Returns "best" move
  return optionsPeck4[0];
}
const chaseTarget = state => i => {
  switch (i){
    case 0: return bird1Target(state);
    case 1: return bird2Target(state);
    case 2: return bird3Target(state)(2);
    case 3: return bird4Target(state)(0);
  }
}
// Offset move to the west if move is to north
const offsetMoveIfNorth = move => 
  pointEqual(move)(NORTH)  
    ? makeMove(move)(WEST)
    : move;
// peck from bird1, index (i) 0
const bird1Target = state => {
  // General movement rule
  //   Targets the snake
  return state.snake[0];
}
const bird2Target = state => {
  // General movement rule
  //   Trys to cath the snake ahead
  return makeMove(state.snake[0])(scaleMove(offsetMoveIfNorth(state.moves[0]))(2));
}
const bird3Target = state => index => {
  // General movement rule:
  //   Goes after the snake if distant,
  //   but goes to its scatter target if close

  // Calculates the distance
  const radiusPeck = distance(state.snake[0])(state.birds[index])
  
  return (radiusPeck <= 10) 
    ? SCATTER_TARGETS[index]
    : state.snake[0];
}
const bird4Target = state => index => {
  // General movement rule:
  //   Tries to assist the bird with the index
  //   by flanking the snake
  const target1 = makeMove(state.snake[0])(offsetMoveIfNorth(state.moves[0]))
  const target2 = state.birds[index]
  
  return makeMove(scaleMove(target1)(2))(scaleMove(target2)(-1))
}
const nextPecks = state => mapFromBirdsList(nextPeck(state))
// -birds state
const nextBeak = state => i => adjustPosition(makeMove(state.birds[i])(nextPeck(state)(i)))
const nextBird = state => i => (willBirdBeEaten(state)(i) && isFrightened(state)(i))
  ? START_BIRDS[i]
  : (isTimeToPeck(state)(i)
    ? nextBeak(state)(i)
    : state.birds[i])
const nextBirds = state => mapFromBirdsList(nextBird(state))
// -frightened state
const nextFright = state => i => 
  (isFrightOver(state)(i) || willBirdBeEaten(state)(i))
  ? 0
  : state.frightened[i]
const nextFrightened = state => {
  // If an egg will be eaten,
  // all birds become frightened
  const nextTimeFunction = eggWillBeEaten(state)
    ? (_ => state.timegame)
    : nextFright(state)

  return mapFromBirdsList(nextTimeFunction)
}
// -apples state
const nextApple = state => state.apples.filter(wontEat(state))
// -eggs state
const nextEgg   = state => state.eggs.filter(wontEat(state))
// -lives state
const nextLives = state => {
  return (state.lives.length > 0) ? dropFirst(state.lives) : []
}
// -time game state
const nextTimeGame  = state => (state.timegame + 1)

// Initial state
const initialState = () => ({
  moves:      [STOP], 
  snake:      START_SNAKE,
  pecks:      [STOP, STOP, STOP, STOP],
  birds:      START_BIRDS,
  frightened: [0, 0, 0, 0],
  apples:     START_APPLES,
  eggs:       START_EGGS,
  timegame:   0,
  lives:      START_LIVES
})

// Bird eats snake state
const eatenState = state => ({
  moves:      [NORTH], // Avoids game waiting
  snake:      START_SNAKE,
  pecks:      [STOP, STOP, STOP, STOP],
  birds:      START_BIRDS,
  frightened: [0, 0, 0, 0],
  apples:     state.apples,
  eggs:       state.eggs,
  timegame:   0,
  lives:      nextLives(state)
})

// Usual next state
const basicNextState = state => ({
  moves:      nextMoves(state),
  snake:      nextSnake(state),
  pecks:      nextPecks(state),
  birds:      nextBirds(state),
  frightened: nextFrightened(state),
  apples:     nextApple(state),
  eggs:       nextEgg(state),
  timegame:   nextTimeGame(state),
  lives:      state.lives
})

// Returns next game turn 
const next = state => state.snake.length == 0
  // If the snake was eaten,
  ? (gameLost(state) 
    ? initialState()
    : eatenState(state))           
  : (gameWon(state) || gameWaiting(state)        
    ? initialState()
    : basicNextState(state))

const enqueue = (state, move) => (state.moves.length < 4) ? merge(state)({ moves: state.moves.concat([move]) })
  : state

module.exports = { COLS, ROWS, EAST, NORTH, SOUTH, WEST, WALLS, BERRY_MASKS, initialState, enqueue, next }
