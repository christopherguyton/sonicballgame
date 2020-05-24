export function detectCollision(ball, gameObject) {
  let leftOfBall = ball.position.x;
  let rightOfBall = ball.position.x + ball.size;
  let topOfBall = ball.position.y;
  let bottomOfBall = ball.position.y + ball.size;

  let leftOfObject = gameObject.position.x;
  let rightOfObject = gameObject.position.x + gameObject.width;
  let topOfObject = gameObject.position.y;
  let bottomOfObject = gameObject.position.y + gameObject.height;

  if (leftOfBall < rightOfObject &&
    rightOfBall > leftOfObject &&
    topOfBall < bottomOfObject &&
    bottomOfBall > topOfObject) {
    return true;
  } else {
    return false;
  }
}