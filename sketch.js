var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,stone;
var score=0;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,400); 
  
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  //creating ground
  ground=createSprite(400,350,1000000000000,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
background("white");
  
 stroke("blue");
  textSize(20);
  fill("blue");
  text("Score:"+score,500,50); 

   stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:"+survivalTime,100,50);
  
  if(gameState===PLAY){
  if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -12;
   }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8  
   
    
    score = score + Math.round(frameCount/100000000000000);
    survivalTime=Math.ceil(frameCount/frameRate());
    
    if(foodGroup.isTouching(monkey)){
      score=score+2;
      foodGroup.destroyEach();
    }
    
     food();
     spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  }
  else if(gameState===END){
    ground.velocityX = 0;
      monkey.velocityY = 0;
    
     obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     obstacleGroup.destroyEach();
     foodGroup.destroyEach();
    background("yellow");
    
     ground.visible=false;
     monkey.visible=false;
   
    
    stroke("green");
    textSize(30);
    fill("green");
    text("Game Over!",250,200);
  }
  
  monkey.collide(ground); 
  
  drawSprites();
}
   function food(){
     if(frameCount%120===0){
var banana=createSprite(600,Math.round(random(120,200)),20,20);
     banana.addImage(bananaImage);  
     banana.scale=0.1;
     banana.velocityX=-4; 
     banana.lifetime=300;
       foodGroup.add(banana);  
       
     }
   }  

   function spawnObstacles(){
     if(frameCount%300===0){
       var stone=createSprite(600,330,50,50);
       stone.velocityX = -(6 + score/100);
       stone.addImage(obstacleImage);
       
       stone.scale = 0.2;
    stone.lifetime = 300;
   
   //add obstacle to the group
    obstacleGroup.add(stone);
     }
   }




