//All the variables are created
var kid, kidImage;
var ground, invisibleGround, groundImage;

var treasureGroup, coinImage, gemImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var restartImage, gameOverImage; 
var score;

//All the images are preloaded
function preload(){
  kidImage = loadImage("Images/kid.png");
  
  groundImage = loadImage("Images/Grass1.png");
  
  coinImage = loadImage("Images/coin.png");
  gemImage = loadImage("Images/gem.png");
  
  obstacle1 = loadImage("Images/monster.png");
  obstacle2 = loadImage("Images/bush.png");
  obstacle3 = loadImage("Images/cacti.png");

  restartImage = loadImage("Images/Restart.png");
  gameOverImage = loadImage("Images/gameOver.png");
  
}

function setup() {
  createCanvas(1000, 500);
  
  //The kid sprite has been set up
  kid = createSprite(50,180,22,52);
  kid.addImage("running", kidImage);
  kid.scale = 0.5;
  
  //The ground has been set up 
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.scale = 0.1;
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //the invisible ground has been created
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //the obstacles and the coin groups have been created
  treasureGroup = new Group();
  obstaclesGroup = new Group();
  
  //the score was set to 0
  score = 0;
}

function draw() {
  background("light blue");
  
  //score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 500,50);
  
  if(keyDown("space")) {
    kid.velocityY = -10;
  }
  
  kid.velocityY = kid.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  kid.collide(invisibleGround);
  spawnTreasure();
  spawnObstacles();

  if(kid.collide(treasureGroup)) {
    score = score + 1; 
  }

  //if(kid.collide(obstaclesGroup))
  drawSprites();
}


function spawnTreasure() {
  if(frameCount % 60 === 0) {
    var treasure = createSprite(600,165,10,40);
    treasure.velocityX = -4;
    
    //generate random treasures
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: treasure.addImage(coinImage);
              break;
      case 2: treasure.addImage(gemImage);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the treasures           
    treasure.scale = 0.05;
    treasure.lifetime = 300;
    //add each treasure to the group
    treasureGroup.add(treasure);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

