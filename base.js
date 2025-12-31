const dropFirst = xs => xs.slice(1) 
// Combines two objects, replacing or adding values and properties of the second object to the first
const merge = o1 => o2 => Object.assign({}, o1, o2) 
// Random number within a range
const randomNumber = min => max => Math.floor(Math.random() * max) + min
const adjustInterval  = gameMapLimit => position => position < 0 
? (gameMapLimit - 1) 
: (position > (gameMapLimit - 1) 
    ? 0 
    : position) 
//Calculates the square of the distance between two given positions
const distance  = position1 =>  position2 => Math.trunc((position2.x - position1.x) ** 2 + (position2.y - position1.y) ** 2)
// Finds the smallest distance in relation to the birds
const orderMoves = moves => targetPosition => birdPosition => {
  
  // List of the distances
  const distances = moves.map(move => distance(targetPosition)({ x: birdPosition.x + move.x, y: birdPosition.y + move.y}))

  // Order the moves by their distances 
  const movementInOrder = [...moves].sort((a, b) => distances[moves.indexOf(a)] - distances[moves.indexOf(b)])

  return movementInOrder;
}

module.exports = { dropFirst, merge, adjustInterval, randomNumber, distance, orderMoves}
