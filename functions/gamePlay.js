function moveKite(gameObject) {
  gameObject.kitePointX = gameObject.kiteSprite.x + gameObject.kiteXOffset;
  gameObject.kitePointY = gameObject.kiteSprite.y + gameObject.kiteYOffset;

  // move left
  if (
    gameObject.kiteSprite.x >= window.innerWidth / 1000 &&
    (
      (gameObject.xDirection === 'left') ||
      (
        gameObject.isPointerDown &&
        gameObject.pointerPositionX < gameObject.kiteSprite.x
      )
    )
  ) {
    gameObject.kiteSprite.x -= (window.innerWidth / 273);
  }

  // move right
  if (
        gameObject.kiteSprite.x <= window.innerWidth / 1.3 &&
        (
          (gameObject.xDirection === 'right') ||
          (gameObject.isPointerDown &&
            gameObject.pointerPositionX > (gameObject.kiteSprite.x + (gameObject.kiteSprite.width / 2)))
        )
  ) {
    gameObject.kiteSprite.x  += (window.innerWidth / 273);
  }

  // move up

  // move down

}

function detectCollision(gameObject, app) {
  const hitPoint = window.innerWidth / 90;
  if (gameObject.kitePointX - gameObject.boltX < hitPoint && gameObject.kitePointX - gameObject.boltX > -hitPoint) {
    gameObject.xTouching = true;
  }
  if (gameObject.kitePointY - gameObject.boltY < hitPoint && gameObject.kitePointY - gameObject.boltY > -hitPoint) {
    gameObject.yTouching = true;
  }
  if (gameObject.xTouching && gameObject.yTouching) {
    gameObject.xTouching = false;
    gameObject.yTouching = false;
    gameObject.kiteSprite.x = window.innerWidth / 1.3;
    gameObject.kiteSprite.y = window.innerHeight / 2.54;
    gameObject.kitePointX = gameObject.kiteSprite.x + gameObject.kiteXOffset;
    gameObject.kitePointY = gameObject.kiteSprite.y + gameObject.kiteYOffset;
    gameObject.isPointerDown = false;
    gameObject.xDirection = '';
    gameObject.gameOver = true;
  }
}

// 1366 768
function lightningStrike(gameObject, app) {
  const longArray = [
    124, 116,
    210, 174,
    159, 254,
    208, 310, // bolt tip
    126, 271,
    169, 196,
  ];
  const x = window.innerWidth;
  const y =  window.innerHeight;

  const relativeArray = [
    x / 11, y / 6.7,
    x / 6.5, y / 4.4,
    x / 8.6, y / 3,
    x / 6.6, y / 2.5, // bolt tip
    x / 10.8, y / 2.8,
    x / 8.1, y / 3.9,
  ]
  const potentialStartingPoints = [x / 1.17, x / 1.8, x / 11];

  const boltStartX = potentialStartingPoints[Math.round(Math.random() * 2)];
  const boltStartY = y / 6.7

  const boltTipX = boltStartX + (x / 16.3);
  const boltTipY =  y / 2.5;
  // 1366 768
  const superRelativeArray = [
    boltStartX, boltStartY,
    boltStartX + (x / 15.9), y / 4.4,
    boltStartX + (x / 39), y /3,
    boltTipX, boltTipY,
    boltStartX + (x / 683), y / 2.8,
    boltStartX + (x / 30.3), y / 3.9
  ];


  gameObject.lightning
    .beginFill(0x3500fa)
    .lineStyle(4, 0xffffff, 1)
    .drawPolygon(superRelativeArray)
    // .drawPolygon(relativeArray)
    .endFill();
    app.stage.addChild(gameObject.lightning);
    setTimeout(() => {
      // gameObject.boltX = 208; // bolt tip
      // gameObject.boltY = 310; // bolt tip
      // gameObject.boltX = window.innerWidth / 6.6; // bolt tip
      // gameObject.boltY = window.innerHeight / 2.5; // bolt tip
      gameObject.boltX = boltTipX;
      gameObject.boltY = boltTipY;
    }, 1);
}

function lightningStrikeEnd(gameObject, app) {
  app.stage.removeChild(gameObject.lightning);
  gameObject.boltX = NaN; // bolt tip
  gameObject.boltY = NaN; // bolt tip
  gameObject.lightning.clear();
}



export { moveKite, lightningStrike, lightningStrikeEnd, detectCollision };