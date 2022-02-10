kaboom({
    background: [0, 0, 0, 0]
});

// Load Assets
loadSprite("main_screen", "assets/sprites/main_screen.jpg");
loadSprite("map1", "assets/sprites/map1.jpg");
// loadSprite("spike", "assets/sprites/spike.png");
loadSprite("spike", "assets/sprites/basic_spike.png");
loadSprite("triangle", "assets/sprites/triangle.png");
// loadSprite("bean", "assets/sprites/bean.png");
loadSprite("player_cube","assets/sprites/basic_cube.png" )
// loadSprite("grass", "assets/sprites/grass.png");
loadSprite("platform", "assets/sprites/basic_platform.png" )
// Background
// const heightDiff = () => height() * .15;

// Platform
// const platform = add([
//     rect(width(), 150),
//     pos(0, height()- heightDiff()),
//     outline(2),
//     area(),
//     solid(),
//     color(200,200,200),

// ])

// // Player
// const player = add([
//     sprite("bean"),
//     pos(20),
//     body(),
//     area()
// ])

// onKeyDown('space', () => {
//     if (player.isGrounded()) {
//         player.jump()
//     }
// })
// let spike;
// // Obstacle
// loop(5, () => {spike = add([
//     sprite('spike'),
//     area(),
//     outline(4),
//     pos(width(), height() - heightDiff()),
//     origin("botleft"),
//     color(255, 180, 255),
//     move(LEFT, 240),
//     "spike"
// ])});

const LEVELS = [
  [
    "                                                                                                                                        ",
    "                                                                                                                                        ",
    "                                                                                                                                        ",
    "                                                                                                                                        ",
    "                                                                                                                                        ",
    "                                                                                                                                        ",
    "                                                                                                                                        ",
    "                                                                                                                                        ",
    "                                                                                                                                        ",
    "                                                                                                                                        ",
    "                                                                                                                                        ",
    "                                                                                s                                              p        ",
    "                      s      ss          sss                 p         pp       p                   ppp                        p        ",
    "pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp",
  ],
];

const levelConf = {
  width: 64,
  height: 64,
  p: () => [sprite("platform"), solid(), area(), "platform"],
  s: () => [sprite("spike"), area(), "spike"],
};

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
    // the custom component we defined above
    // origin(""),
  ]);

  player.onUpdate(() => {
    camPos(player.pos);
  });
  onKeyDown("space", () => {
    if (player.isGrounded()) {
      player.jump(1010);
    }
  });
  player.onCollide("spike", () => {
    // const [x, y] = player.pos
    console.log(player.pos.y);

    // debug.log([x])
    // addKaboom(player.pos);
    shake();
    go("lose")
  });
  // add level to scene
  const level = addLevel(LEVELS[levelId ?? 0], levelConf);
});
scene("lose", () => {
	add([
		text("You Lose"),
	])
	onKeyPress(() => go("game"))
})
go("game");
