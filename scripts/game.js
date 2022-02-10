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

scene("game", ({ levelId } = { levelId: 0 }) => {
  gravity(3200);
  const player = add([
    sprite("player_cube"),
    pos(-100, 750),
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
      player.jump(1020);
    }
  });
  player.onCollide("spike", () => {
    shake();
    go("lose");
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
scene("lose", () => {
  add([text("You Lose")]);
  onKeyPress(() => go("game"));
});
scene("win", () => {
  add([text("You Win")]);
  onKeyPress(() => go("game"));
});
go("game");
