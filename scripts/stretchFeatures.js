onUpdate(() => {
    if (reversePlayer) {
      camPos(reversePlayer.pos);
      addScore();
      if (reversePlayer.isGrounded()) {
        reversePlayer.angle = 0;
        jumping = false;
      }
      if (jumping) reversePlayer.angle += 500.2;
  
      reversePlayer.onCollide("platform", (p) => {
        if (player.pos.x + 32 === p.pos.x) {
          destroy(reversePlayer)
          camPos(player)
          attempts++;
          isNewLvl = false;
          go("game");
        }
      });
  
      onKeyDown("space", () => {
        if (reversePlayer.isGrounded()) {
          reversePlayer.jump(1050);
          jumping = true;
        }
      });
      
      reversePlayer.onCollide("spike", () => {
        destroy(reversePlayer)
        attempts++;
        shake();
        isNewLvl = false;
        go("game");
      });
      reversePlayer.onCollide("coin", (c) => {
        
        destroy(c);
        play("coin_sound");
      });
  
      reversePlayer.onCollide("portal", () => {
        destroy(reversePlayer)
        if (levelId + 1 < LEVELS.length) {
          go("game", {
            levelId: levelId + 1,
          });
          isNewLvl = true;
        } else {
          go("win");
        }
        
      });
    
  
    }
})


let firstCollide = true;
  player.onCollide("reversePortal", () => {
    console.log(player.pos);
    if(firstCollide) {
    destroy(player);
     reversePlayer = add([
      sprite("sapiens"),
      pos(1299.5, 800),
      area(),
      scale(1),
      origin("center"),
      rotate(0),
      // makes it respond to gravity and gives it jump method
      body(),
      move(LEFT, 500),
    ]);
    firstCollide = false;
   
  }
  });
