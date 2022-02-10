kaboom({
  background: [0, 0, 0, 0],
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
scene("game", ({ levelId } = { levelId: 0 }) => {
  const map1 = add([
    sprite("map1", { width: width() * width(), height: height() * 1.5 }),
  ]);
  gravity(3200);
  const player = add([
    sprite("sapiens"),
    pos(-50, 750),
    area(),
    scale(1),
    // makes it fall to gravity and jumpable
    body(),
    move(RIGHT, 500),
  ]);

  player.onUpdate(() => {
    camPos(player.pos);
  });

  // add level to scene
  const level = addLevel(LEVELS[levelId ?? 0], levelConf);
  onKeyDown("space", () => {
    if (player.isGrounded()) {
      player.jump(1050);
    }
  });
  player.onCollide("spike", () => {
    console.log(player);
    shake();
    go("game");
  });

  player.onCollide("platform", (p) => {
    if (player.pos.x + 64 === p.pos.x) {
      go("game");
    }
  });

  player.onCollide("portal", () => {
    if (levelId + 1 < LEVELS.length) {
      go("game", {
        levelId: levelId + 1,
      });
    } else {
      go("win");
    }
  });
});

// Win Scene
scene("win", () => {
  add([text("You Win")]);
  onKeyPress(() => go("game"));
});

// Starts the start scene
go("start");
