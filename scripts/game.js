kaboom()

// Load Assets
loadSprite("main_screen", "assets/sprites/main_screen.jpg")
loadSprite("map1", "assets/sprites/map1.jpg")
loadSprite("spike", "assets/sprites/spike.png")
loadSprite("triangle", "assets/sprites/triangle.png")
loadSprite("bean", "assets/sprites/bean.png")
// Background
const heightDiff = () => height() * .15;
const map1 = add([
    sprite('map1', {width: width(), height: height()}),
])

// Platform
const platform = add([
    rect(width(), 150),
    pos(0, height()- heightDiff()),
    outline(2),
    area(),
    solid(),
    color(200,200,200),
    
])

// Player
const player = add([
    sprite("bean"),
    pos(),
    body(), 
    area()
])

onKeyDown('space', () => {
    if (player.isGrounded()) {
        player.jump()
    }
})

// Obstacle 
loop(1, () => {add([
    sprite('spike'),
    area(),
    outline(4),
    pos(width(), height() - heightDiff()),
    origin("botleft"),
    color(255, 180, 255),
    move(LEFT, 240),
])});


const LEVELS = [
    ['']
]