const Application = PIXI.Application;
const app = new Application(
  {
    width: 500,
    height: 500,
    transparent: true,
    antalias: true,
  }
);

// app.renderer.backgroundColor = 0x23395D;
// app.renderer.backgroundImage = './rain.gif'

app.renderer.resize(window.innerWidth, window.innerHeight);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;

const lightningCenter = new Graphics();
const lightningLeft = new Graphics();

const longArray = [
  124, 116,
  210, 174,
  159, 254,
  208, 310,
  126, 271,
  169, 196,
];

const longLeftArray = [
  124, 116,
  210, 174,
  159, 254,
  208, 310,
  126, 271,
  169, 196,
];

lightningCenter
  .beginFill(0x3500fa)
  .lineStyle(4, 0xffffff, 1)
  .drawPolygon([
    621, 121,
    589, 169,
    692, 186,
    577, 301,
    625, 232,
    539, 165
  ])
  .endFill();

  lightningLeft
  .beginFill(0x3500fa)
  .lineStyle(4, 0xffffff, 1)
  .drawPolygon(longArray)
  .endFill();
const boltX = 208;
const boltY = 310;
const kiteXOffset = 100;
const kiteYOffset = 15;
let kitePointX, kitePointY;
let xTouching = false;
let yTouching = false;

let centerWidth = window.innerWidth / 2;
let centerHeight = window.innerHeight / 2;
let widthOffset = 100;
let heightOffset = 100;
// let direction = 'left';

const rectangle = new Graphics();
rectangle
  .beginFill(0xAA33BB)
  // .lineStyle(4, 0xFFEA00, 1)
  .drawRect(centerWidth - widthOffset, centerHeight - heightOffset, 100, 100)
  .endFill();


const poly = new Graphics();
poly
  .beginFill(0xFF66FF)
  .lineStyle(4, 0xFFEA00, 1)
  .drawPolygon([
    600, 50,
    800, 150,
    900, 300,
    300, 100,
    190, 19
  ])
  .endFill();


const circle = new Graphics();
circle
  .beginFill(0x22AACC)
  .drawCircle(440, 200, 80)
  .endFill();


const line = new Graphics();
line
  .lineStyle(5, 0xFFEA00, 1)
  .moveTo(1500, 100)
  .lineTo(1500, 800)


app.stage.addChild(rectangle);
app.stage.addChild(poly);
app.stage.addChild(circle);
app.stage.addChild(line);

const torus = new Graphics();
torus
  .beginFill(0xFFFDDD)
  .drawTorus(100, 700, 80 ,100, Math.PI / 2)
  .endFill();
app.stage.addChild(torus);

const star = new Graphics();
star
  .beginFill(0xADADAD)
  .drawStar(900, 700, 300, 80)
  .endFill();

app.stage.addChild(star);

const style = new PIXI.TextStyle({
  fontFamily: 'Montserrat',
  fontSize: 48,
  fill: 'deepskyblue',
  stroke: '#ffffff',
  strokeThicknesss: 4,
  dropShadow: true,
  dropShadowDistance: 10,
  dropShadowAngle: Math.PI / 2,
  dropShadowBlur: 4,
  dropShadowColor: '#000000'
});
const myText = new PIXI.Text('Hello World!', style);
app.stage.addChild(myText);
setTimeout(() => {
  myText.text = "Text Changed!";
  app.stage.removeChild(star);
  // rectangle.x = 10;
}, 5000)


// setInterval(()=>{
//   app.stage.removeChild(rectangle);
//     if (centerWidth <= 100) {
//       direction = "right";
//     }
//     if (direction === 'left') {
//       rectangle.x = 10;
//     }
// }, 1000)

app.ticker.add(delta => loop(delta));

function loop(delta) {
  const rect = new Graphics();
  rect
    .beginFill(0xFFFFFF)
    .drawRect(Math.random() * app.screen.width, Math.random() * app.screen.height, 10, 10)
    .endFill();

    // app.stage.addChild(rect);
}

// const kiteTexture = PIXI.Texture.from('./kite.jpeg');
// const kiteSprite = new PIXI.Sprite(kiteTexture);
const kiteSprite = PIXI.Sprite.from("./kite.jpeg");
app.stage.addChild(kiteSprite);
// kiteSprite.width = 90;
// kiteSprite.height = 90;
// kiteSprite.scale.x = 0.5;
// kiteSprite.scale.y = 0.5;
kiteSprite.scale.set(0.5, 0.5);
kiteSprite.x = window.innerWidth - 200;
kiteSprite.y = window.innerHeight - 200;

let direction = 'left';
app.ticker.add(move => scroll(move));

function scroll(move) {
  if (rectangle.x <= -500) {
    direction = 'right';
  }

  if (rectangle.x >= 600) {
    direction = 'left';
  }
  if (direction === 'left') {
    rectangle.x = rectangle.x - 5;
  }

  if (direction === 'right') {
    rectangle.x = rectangle.x + 5;
  }
}

app.stage.addChild(lightningCenter);
app.stage.addChild(lightningLeft);
