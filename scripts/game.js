kaboom({
  background: [0, 0, 0],
  crisp: true
});

// Load Assets
loadSprite("main_screen", "assets/sprites/main_screen.jpg");
loadSprite("map1", "assets/sprites/map1.jpg");
loadSprite("spike", "assets/sprites/basic_spike.png");
loadSprite("triangle", "assets/sprites/triangle.png");
loadSprite("player_cube", "assets/sprites/basic_cube.png");
loadSprite("coin", "assets/sprites/coin.png");
loadSprite("platform", "assets/sprites/basic_platform.png");
loadSprite("portal", "assets/sprites/portal.png");
loadSprite("frenzy", "assets/sprites/geometry_frenzy.png");
loadSprite("lvl1_platform", "assets/textures/lvl1/lvl1_platform.png");
loadSprite("lvl1_spike", "assets/textures/lvl1/lvl1_spike.png");
loadSprite("sapiens", "assets/textures/cube_skins/sapiens.png");
let isNewLvl = false;
let jumping;
// Start Scene
scene("start", () => {
  const mainScreen = add([
    sprite("main_screen", { height: 1000, width: 1000 }),
    pos(width() / 2, height() / 2),
    origin("center"),
  ]);
  const button = add([
    text("Start"),
    origin("center"),
    pos(width() / 2, height() / 2),
    area(),
    scale(1),
    "button",
  ]);
  button.onClick(() => go("game"));
  button.onUpdate(() => {
    if (button.isHovering()) {
      const t = time() * 10;
      button.color = rgb(
        wave(0, 255, t),
        wave(0, 255, t + 2),
        wave(0, 255, t + 4)
      );
      button.scale = vec2(1.2);
    } else {
      button.scale = vec2(1);
      button.color = rgb();
    }
  });
});

// Game Scene
let score = 0;
let attempts = 0;
scene("game", ({ levelId } = { levelId: 0 }) => {
  layers([
    "bg",
    "game",
    "ui",
], "game")
  if(!isNewLvl) score = 0;

  loop(3, () => { add([
    sprite('map1', {
     width: width() * width(), height: height(), flipY: true
    }),
    layer('bg'),
    scale(5),
    
    color(rgb(
      wave(0, 255,time()),
      wave(0, 255, time()+ 2),
      wave(0, 255, time() + 4)
    )) 
    
  ])})
  
  
  gravity(3200);
  const player = add([
    sprite("sapiens"),
    pos(-50, 750),
    area(),
    scale(1),
    origin("center"),
    rotate(0),
    // makes it fall to gravity and jumpable
    body(),
    move(RIGHT, 500),
  ]);
  loop(3, () => { }) 
  const attemptsLabel = add([
    text(attempts),
    origin("center"),
    pos(width() / 2, 80),
    fixed(),
  ]);

  function addAttempt() {
    attempts++;
    attemptsLabel.text = "Attempts " + attempts;
    // play("attempts")
  }

  addAttempt();

  const scoreLabel = add([
    text("Score " + score),
    origin("center"),
    pos(250, 80),
    fixed(),
  ]);

  function addScore() {
    score++;
    scoreLabel.text = "Score " + score;
    // play("attempts")
  }

  // display attempts

  player.onUpdate(() => {
    camPos(player.pos);
    addScore();
    if(player.isGrounded()) {
      player.angle = 0;
      jumping = false;
    }
    if(jumping) player.angle += 26.2;
  });


  // add level to scene
  const level = addLevel(LEVELS[levelId ?? 0], levelConf);
  onKeyDown("space", () => {
    if (player.isGrounded()) {
      player.jump(1050);
      jumping = true;
    }
  });
  player.onCollide("spike", () => {
    console.log(player);
    shake();
    isNewLvl = false;
    go("game");
  });

  player.onCollide("platform", (p) => {
    if (player.pos.x + 32 === p.pos.x) {
      isNewLvl = false;
      go("game");
    }
  });

  player.onCollide("portal", () => {
    if (levelId + 1 < LEVELS.length) {
      go("game", {
        levelId: levelId + 1,
      });
      isNewLvl = true;
    } else {
      go("win");
    }
  });
});

// Win Scene
scene("win", () => {
  add([text("You Win")]);
  onKeyPress(() => go("start"));
  
});

// Starts the start scene
go("start");

