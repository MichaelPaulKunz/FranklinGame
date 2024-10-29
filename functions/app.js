import { initiateGraphics, eventListeners, resizeScreen } from './gameStage.js';
import { moveKite, lightningStrike, lightningStrikeEnd, detectCollision } from './gamePlay.js'

const Application = PIXI.Application;
const app = new Application(
  {
    transparent: true,
    antialias: true,
  }
);
const Graphics = PIXI.Graphics;

const kiteXOffset = 100;
const kiteYOffset = 15;

const gameObject = {
  isGameInProgress: false,
  gameOver: false,
  backgroundSprite: PIXI.Sprite.from("././images/bg1.jpeg"),
  cloudTexture: PIXI.Texture.from('././images/cloud-transparent.png'),
  kiteSprite: PIXI.Sprite.from('././images/kite-no-key.png'),
  lightning: new Graphics(),
  cloudSprites: [],
  xDirection: '',
  yDirection: '',
  isPointerDown: false,
  pointerPositionX: NaN,
  boltX: NaN,
  boltY: NaN,
  clock: 0,
  marker: 0,
  kitePointX: NaN,
  kitePointY: NaN,
  xTouching: false,
  yTouching: false,
  kiteXOffset: 100,
  kiteYOffset: 15
}


const startGameButton = document.createElement('button');
showStartButton();

function showStartButton() {
  startGameButton.addEventListener("click", startGame);
  startGameButton.innerText = "Start Game";
  startGameButton.classList.add('start-game-button');
  document.body.appendChild(startGameButton);
}

function startGame() {
  if (screen.orientation.type.includes('landscape')) {
    document.body.removeChild(startGameButton);
    document.body.appendChild(app.view);
    const elem = document.getElementsByTagName('canvas')[0];
    resizeScreen(elem);
    setTimeout(function() {
      gameObject.isGameInProgress = true;
      playGame();
    }, 100);
  } else {
    alert('switch to landscape view to play game')
  }
}

function playGame () {
  gameObject.kiteXOffset = window.innerWidth / 13.7;
  gameObject.kiteYOffset = window.innerHeight / 51.2;
  gameObject.marker = 0;
  gameObject.clock = 0;
  gameObject.xTouching = false;
  gameObject.yTouching = false;
  gameObject.gameOver = false;

  initiateGraphics(gameObject, app);
  eventListeners(gameObject);

  app.ticker.start();
  app.ticker.add(asynchronous);
}

function asynchronous(move) {
  gameObject.clock++;

  //handle lightning bolts
  if (gameObject.clock % 100 === 0) {
    gameObject.marker = gameObject.clock;
    lightningStrike(gameObject, app);
  }
  if (gameObject.clock === gameObject.marker + 25) {
    lightningStrikeEnd(gameObject, app);
    gameObject.marker = 0;
  }

  // move kite and collision point
  moveKite(gameObject);

  // determine if bolt is touching kite
  detectCollision(gameObject, app);

  // in the event of a collision
  if(gameObject.gameOver) {
    app.ticker.remove(asynchronous);
    app.ticker.stop();
    alert('you win');
  }
}

function endGame() {
  if (gameObject.isGameInProgress) {
    gameObject.cloudSprites = [];
    gameObject.cloudSprites.forEach(cloud => {
      console.log('removing clouds');
      app.stage.removeChild(cloud);
    });
    document.body.removeChild(app.view);
    document.body.appendChild(startGameButton);
    gameObject.isGameInProgress = false;
    app.ticker.remove(asynchronous);
    app.ticker.stop();
  }
}

// end game if window is resized
$(window).resize(function() {
  if (gameObject.isGameInProgress) {
    endGame(gameObject, app);
  }
});
