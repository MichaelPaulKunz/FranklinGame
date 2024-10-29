function resizeScreen(elem) {
  if (elem.requestFullScreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function positionBackground(gameObject) {
  const { backgroundSprite } = gameObject;
  backgroundSprite.width = window.innerWidth;
  backgroundSprite.height = window.innerHeight;
  backgroundSprite.interactive = true;
}

function positionClouds (gameObject) {
  const { cloudTexture, cloudSprites } = gameObject;
  //one
  const cloudSprite1 = new PIXI.Sprite(cloudTexture);
  cloudSprite1.width = window.innerWidth / 7;
  cloudSprite1.height = window.innerHeight / 7;
  cloudSprite1.x = window.innerWidth / 20;
  cloudSprite1.y = window.innerHeight / 90;
  //two
  const cloudSprite2 = new PIXI.Sprite(cloudTexture);
  cloudSprite2.width = window.innerWidth / 7;
  cloudSprite2.height = window.innerHeight / 7;
  cloudSprite2.x = window.innerWidth / 1.2;
  cloudSprite2.y = window.innerHeight / 90;
  //three
  const cloudSprite3 = new PIXI.Sprite(cloudTexture);
  cloudSprite3.width = window.innerWidth / 7;
  cloudSprite3.height = window.innerHeight / 7;
  cloudSprite3.x = window.innerWidth / 2;
  cloudSprite3.y = window.innerHeight / 90;
  cloudSprites.push(cloudSprite1);
  cloudSprites.push(cloudSprite2);
  cloudSprites.push(cloudSprite3);
}
function positionKite(gameObject) {
  const { kiteSprite } = gameObject;
  kiteSprite.y = window.innerHeight / 1.95;
  kiteSprite.x = window.innerWidth / 1.3;
  kiteSprite.width = window.innerWidth / 4.3;
  kiteSprite.height = window.innerHeight / 2.3;
}

function initiateGraphics(gameObject, app) {
  app.renderer.view.style.position = 'absolute';
  app.renderer.resize(window.innerWidth, window.innerHeight);
  positionBackground(gameObject);
  positionClouds(gameObject);
  app.stage.addChild(gameObject.backgroundSprite);
  positionKite(gameObject);
  gameObject.cloudSprites.forEach(cloud => {
    app.stage.addChild(cloud);
  });
  app.stage.addChild(gameObject.kiteSprite);
}

function eventListeners(gameObject) {
  document.addEventListener('pointerdown', function(e) {
    const { kiteSprite } = gameObject;
    gameObject.isPointerDown = true;
    gameObject.pointerPositionX = e.screenX;
  })

  document.addEventListener('pointerup', function() {
    gameObject.isPointerDown = false;
    gameObject.pointerPositionX = NaN;
  })

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
      gameObject.xDirection = 'right'
    }

    if(e.key === 'ArrowLeft') {
      gameObject.xDirection = 'left'
    }

    if(e.key === 'ArrowUp') {
      gameObject.yDirection = 'up'
    }

    if(e.key === 'ArrowDown') {
      gameObject.yDirection = 'down'
    }
  });

  document.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      gameObject.xDirection = '';
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      gameObject.yDirection = '';
    }
  });
}

export { resizeScreen, initiateGraphics, eventListeners };