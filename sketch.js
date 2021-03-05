var astronaut, astronautImage;
var backgroundImage, coinImage;
var coin, lavaImage, lavaGroup;
var asteroidImage, holeImage, lives;
var holeGroup, asteroidGroup, gameState = "play";
var coinGroup, coins = 0, resetButton;
var resetButtonImage;

function preload(){
  astronautImage = loadImage("astronaut.jpg");
  backgroundImage = loadImage("background.jpg");
  coinImage = loadImage("coin.jpg");
  lavaImage = loadImage("lava.jpg");
  asteroidImage = loadImage("asteroid.png");
  holeImage = loadImage("hole.png");
  resetButtonImage = loadImage("reset.png");
}

function setup() {
  createCanvas(800, 400);
  Background = createSprite(400, 200, 800, 400);
  astronaut = createSprite(200, 200);
  //resetButton = createSprite(400, 200);
  //coin = createSprite(350, 200);
  //lava = createSprite(450, 100);
  //asteroid = createSprite(600, 300);
  //hole = createSprite(700, 100);
  Background.addImage(backgroundImage);
  astronaut.addImage(astronautImage);
  //resetButton.addImage(resetButtonImage);
  //coin.addImage(coinImage);
  //lava.addImage(lavaImage);
  //asteroid.addImage(asteroidImage);
  //hole.addImage(holeImage);
  Background.scale = 2.6;
  astronaut.scale = 0.3;
  //resetButton.scale = 0.1;
  //coin.scale = 0.2;
  //lava.scale = 0.2;
  //asteroid.scale = 0.09;
  //hole.scale = 0.2;
  //resetButton.visible = true;
  //resetButton.debug = true;

  lavaGroup = new Group();
  holeGroup = new Group();
  asteroidGroup = new Group();
  coinGroup = new Group();
}
function draw(){
  background(backgroundImage);
  drawSprites();

  if(gameState === "play"){
    spawnCoin();
    spawnLava();
    spawnHole();
    spawnAsteroids();

    textSize(15);
    fill("white");
    textAlign(CENTER);
    text("Coins: " + coins, 50, 20);

    astronaut.y = mouseY;
    Background.velocityX = -2;

    if(asteroidGroup.isTouching(astronaut) || holeGroup.isTouching(astronaut) || lavaGroup.isTouching(astronaut)){
      gameState = "end";
    }

    if(coinGroup.isTouching(astronaut)){
      coinGroup.destroyEach();
      coins += 1;
    }

    //astronaut.debug = true;
    astronaut.setCollider("rectangle", 0, 0, 180, 280);

    if(Background.x < 0){
      Background.x = Background.width/2;
    }
  }

  if(gameState === "end"){
    background("black");
    textSize(50);
    fill("red");
    textAlign(CENTER);
    text("You lose!", 400, 200);
    //resetButton.visible = true;
  }
}

function spawnLava(){
  //increase the rate the obstacles spawn as the game progresses.
  if(frameCount % 150 === 0){
    var lava = createSprite(800, random(100, 300), 50, 50);
    lava.velocityX = -2;
    lava.addImage(lavaImage);
    lava.scale = 0.1;
    lavaGroup.add(lava);
  }
}

function spawnHole(){
  if(frameCount % 250 === 0){
    var hole = createSprite(800, random(100, 300), 50, 50);
    hole.velocityX = -2;
    hole.setCollider("circle", 0, 0, 150);
    hole.addImage(holeImage);
    hole.scale = 0.1;
    holeGroup.add(hole);
  }
}

function spawnAsteroids(){
  if(frameCount % 350 === 0){
    var asteroid = createSprite(800, random(100, 300), 50, 50);
    asteroid.velocityX = -2;
    //asteroid.debug = true;
    asteroid.setCollider("rectangle", 0, 0, 1400, 1400);
    asteroid.addImage(asteroidImage);
    asteroid.scale = 0.05;
    asteroidGroup.add(asteroid);
  }
}

function spawnCoin(){
  if(frameCount % 300 === 0){
    var coin = createSprite(800, random(100, 300), 50, 50);
    coin.velocityX = -2;
    coin.addImage(coinImage);
    coin.scale = 0.2;
    coinGroup.add(coin);
  }
}