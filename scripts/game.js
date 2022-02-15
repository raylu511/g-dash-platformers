kaboom({
  background: [0, 0, 0],
  crisp: true,
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
loadSound("coin_sound", "assets/sounds/coin_sound.mp3");

let isNewLvl = false;
let jumping;
// Game Scene
let score = 0;
let attempts = 1;
// Start Scene
scene("start", () => {
  const mainScreen = add([
    sprite("main_screen", { height: 1000, width: 1000 }),
    pos(width() / 2, height() / 2),
    origin("center"),
  ]);
  const start = add([
    text("Start"),
    origin("center"),
    pos(width() / 2, height() / 2 - 100),
    area(),
    scale(1),
    "start",
  ]);
  const rules = add([
    text("Rules", {
      size: 70,
      letterSpacing: 0,
    }),
    origin("center"),
    pos(width() / 2, height() / 2),
    area(),
    scale(1),
    "rules",
  ]);
  const developers = add([
    text("Developers", {
      size: 70,
      letterSpacing: -5,
    }),
    origin("center"),
    pos(width() / 2, height() / 2 + 100),
    area(),
    scale(1),
    "developers",
  ]);

  // Start logic
  start.onClick(() => go("game"));
  start.onUpdate(() => {
    if (start.isHovering()) {
      const t = time() * 10;
      start.color = rgb(
        wave(0, 255, t),
        wave(0, 255, t + 2),
        wave(0, 255, t + 4)
      );
      start.scale = vec2(1.2);
    } else {
      start.scale = vec2(1);
      start.color = rgb();
    }
  });

  // Rules logic
  rules.onClick(() => go("rules"));
  rules.onUpdate(() => {
    if (rules.isHovering()) {
      const t = time() * 10;
      rules.color = rgb(
        wave(0, 255, t),
        wave(0, 255, t + 2),
        wave(0, 255, t + 4)
      );
      rules.scale = vec2(1.2);
    } else {
      rules.scale = vec2(1);
      rules.color = rgb();
    }
  });

  // Developers Logic
  developers.onClick(() => go("developers"));
  developers.onUpdate(() => {
    if (developers.isHovering()) {
      const t = time() * 10;
      developers.color = rgb(
        wave(0, 255, t),
        wave(0, 255, t + 2),
        wave(0, 255, t + 4)
      );
      developers.scale = vec2(1.2);
    } else {
      developers.scale = vec2(1);
      developers.color = rgb();
    }
  });
});

// Game Scene
scene("game", ({ levelId } = { levelId: 0 }) => {
  layers(["bg", "game", "ui"], "game");
  if (!isNewLvl) score = 0;

  loop(3, () => {
    add([
      sprite("map1", {
        width: width() * width(),
        height: height(),
        flipY: true,
      }),
      layer("bg"),
      scale(5),
      pos(0, 0),
      area(),
      color(
        rgb(
          wave(0, 255, time()),
          wave(0, 255, time() + 2),
          wave(0, 255, time() + 4)
        )
      ),
      "map1",
    ]);
  });

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
  loop(3, () => {});
  const attemptsLabel = add([
    text(attempts, {
      size:50
    }),
    origin("center"),
    pos(width() / 2, 80),
    fixed(),
  ]);

  function addAttempt() {
    attemptsLabel.text = "Attempts " + attempts;
    // play("attempts")
  }

  addAttempt();

  const scoreLabel = add([
    text("Score " + score, {
      size:50
    }),
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
    if (player.isGrounded()) {
      player.angle = 0;
      jumping = false;
    }
    if (jumping) player.angle += 500.2;
  });

  // add level to scene
  const level = addLevel(LEVELS[levelId ?? 0], levelConf);
  onKeyDown("space", () => {
    if (player.isGrounded()) {
      player.jump(1050);
      jumping = true;
    }
  });

  player.onCollide("coin", (c) => {
    destroy(c);
    play("coin_sound");
  });

  player.onCollide("spike", () => {
    attempts++;
    shake();
    isNewLvl = false;
    go("game");
  });

  player.onCollide("platform", (p) => {
    if (player.pos.x + 32 === p.pos.x) {
      attempts++;
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
function late(t) {
  let timer = 0;
  return {
    add() {
      this.hidden = true;
    },
    update() {
      timer += dt();
      if (timer >= t) {
        this.hidden = false;
      }
    },
  };
}
// Rules Scene
scene("rules", () => {
  const mainScreen = add([
    sprite("main_screen", { height: 1200, width: width() }),
    pos(width() / 2, height() / 2),
    origin("center"),
  ]);
  add([text("Rules"), origin("center"), pos(width() / 2, height() / 12)]);
  add([
    text("Clear each level by reaching the portal at the end", {
      letterSpacing: 0,
      size: 30,
    }),
    lifespan(3),
    origin("center"),
    pos(width() / 2, height() / 2),
  ]);
  add([
    text("Each level comprises of different obstacles", {
      letterSpacing: 0,
      size: 30,
    }),
    lifespan(6),
    late(3),
    origin("center"),
    pos(width() / 2, height() / 2),
  ]);
  add([
    text("To avoid colliding with an obstacle", {
      letterSpacing: 0,
      size: 30,
    }),
    lifespan(9),
    late(6),
    origin("center"),
    pos(width() / 2, height() / 2),
  ]);
  add([
    text("Press 'spacebar' to jump over them", {
      letterSpacing: 0,
      size: 30,
    }),
    lifespan(12),
    late(9),
    origin("center"),
    pos(width() / 2, height() / 2),
  ]);
  const playAgain = add([
    text("Read Again", {
      letterSpacing: 0,
      lineSpacing: 0,
      size: 55,
    }),
    late(12),
    area(),
    origin("center"),
    pos(width() / 2 - 200, height() / 2),
  ]);
  const mainMenu = add([
    text("Go back", {
      letterSpacing: 0,
      size: 55,
    }),
    late(12),
    area(),
    origin("center"),
    pos(width() / 2 + 200, height() / 2),
  ]);
  playAgain.onClick(() => go("rules"));
  playAgain.onUpdate(() => {
    if (playAgain.isHovering()) {
      const t = time() * 10;
      playAgain.color = rgb(
        wave(0, 255, t),
        wave(0, 255, t + 2),
        wave(0, 255, t + 4)
      );
      playAgain.scale = vec2(1.2);
    } else {
      playAgain.scale = vec2(1);
      playAgain.color = rgb();
    }
  });
  mainMenu.onClick(() => go("start"));
  mainMenu.onUpdate(() => {
    if (mainMenu.isHovering()) {
      const t = time() * 10;
      mainMenu.color = rgb(
        wave(0, 255, t),
        wave(0, 255, t + 2),
        wave(0, 255, t + 4)
      );
      mainMenu.scale = vec2(1.2);
    } else {
      mainMenu.scale = vec2(1);
      mainMenu.color = rgb();
    }
  });
});

// Developer Scene
scene("developers", () => {
  const mainScreen = add([
    sprite("main_screen", { height: 1200, width: width() }),
    pos(width() / 2, height() / 2),
    origin("center"),
  ]);
  add([text("Developers"), origin("center"), pos(width() / 2, height() / 12)]);
});
// Win Scene
scene("win", () => {
  add([text("You Win"), pos(width() / 2, height() / 2), origin("center")]);
  score = 0;
  attempts = 1;
  onKeyPress(() => go("start"));
});

// Starts the start scene
go("start");
