var trex, trexrunning, cloud;
var trexcollided;
var ground, invisibleground, groundimage, cloudimage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var gamestate = "play";
var play = 1;
var end = 0;
var obstaclegroup, cloudgroup;
var gameover, gameoverimage;
var restart, restartimage

function preload(){
  trexrunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexcollided = loadAnimation("trex_collided.png");
  groundimage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  gameoverimage = loadImage("gameOver.png");
  restartimage = loadImage("restart.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50, height - 40, 20, 50);
  trex.addAnimation("running", trexrunning);
  trex.addAnimation("collided", trexcollided)
  trex.scale = 0.5;
  
  ground = createSprite(width/2, height - 50, width, 20);
  ground.addImage("ground", groundimage);
  ground.x = ground.width / 2;
  
  gameover = createSprite(width/2, height/2 - 40);
  gameover.addImage(gameoverimage);
  gameover.scale = 0.6;
  
  restart = createSprite(width/2, height/2);
  restart.addImage(restartimage);
  restart.scale = 0.4;
  
  obstaclegroup = createGroup();
  cloudgroup = createGroup();
  
  trex.setCollider("circle", 0, 0, 40);
  trex.debug = true;
  
  invisibleground = createSprite(width/2, height - 30, width, 10);
  invisibleground.visible = false;
  
}

function draw(){
  background(180);
  
  textSize(17);
  text("Score:" + score, 450, 50);
  
  if(gamestate === "play"){
  
  gameover.visible = false;
  restart.visible = false;
  
  if(touches.length > 0 || keyDown("space") && trex.y >= height - 120){
    trex.velocityY = -10;
    touches = [];
    
  }
    
  score = score + Math.round(frameCount / 60);
  
  
  ground.velocityX = -2;
  
  if(ground.x < 0){
    ground.x = ground.width / 2;
    
  }

  trex.velocityY = trex.velocityY + 0.8; 
     
  spawnClouds();
  
  createObstacles();
    
  if(obstaclegroup.isTouching(trex)){
    gamestate = end;
    
  }
    
  } else if(gamestate === end){
    ground.velocityX = 0;
    
    trex.changeAnimation("collided", trexcollided)
    
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    gameover.visible = true;
    restart.visible = true;
    
  }
  
  trex.collide(invisibleground);
  
  if(touches.length || keyDown("space")){
    reset();
    touches = [];
    
  }  

  drawSprites();

}

function spawnClouds(){
  if(frameCount % 60 === 0){
    cloud = createSprite(width + 30, height - 300, 40, 10);
    cloud.addImage(cloudimage);
    cloud.y = Math.round(random(10, 60));
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudgroup.add(cloud);
    
  }
  
  
  
}

function createObstacles(){
  if(frameCount % 60 === 0){
    var obstacle = createSprite(400, height - 60, 10, 40);
    obstacle.velocityX = -6;
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
    var selectsprites = Math.round(random(1, 6));
    
    switch(selectsprites){
        case 1 : obstacle.addImage(obstacle1);
        break;
        
        case 2 : obstacle.addImage(obstacle2);
        break;
        
        case 3 : obstacle.addImage(obstacle3);
        break;
        
        case 4 : obstacle.addImage(obstacle4);
        break;
        
        case 5 : obstacle.addImage(obstacle5);
        break;
        
        case 6 : obstacle.addImage(obstacle6);
        break;
        
        default:break;
    }
    
    obstaclegroup.add(obstacle);
    
  }
  
}