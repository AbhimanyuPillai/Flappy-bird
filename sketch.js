var backgroundImg,Background
var bird,birdImg1,f3Img
var p1,p2,p3,p4,q1,q2,q3,q4;
var topPipe,bottomPipe
var gameOver,gameOverImage
var bottomGroup,topGroup;
var reset,resetImg
var gameState= "play"
var coin,coinImg,coinGroup;
var score = 0
var wingSound,pointSound,dieSound;




function preload()
{
   backgroundImg = loadImage("Images/Background2.png")
   birdImg1 = loadImage("Images/f2.png")

   p1 = loadImage("Images/b1.png")
   p2 = loadImage("Images/b2.png")
   p3 = loadImage("Images/b3.png")
   p4 = loadImage("Images/b4.png")

   q1 = loadImage("Images/t1.png")
   q2 = loadImage("Images/t2.png")
   q3 = loadImage("Images/t4.png")
   q4 = loadImage("Images/t5.png")

   gameOverImage = loadImage("Images/gameover.png")

   resetImg = loadImage("Images/reset.png")

   coinImg = loadImage("Images/coin.png")

   wingSound = loadSound("sounds/sfx_wing.mp3")

   pointSound = loadSound("sounds/sfx_point.mp3")

   dieSound = loadSound("sounds/sfx_die.mp3")

   

}

function setup()
{
   createCanvas(1600,750)

   Background = createSprite(800,375,1600,750)
   Background.addImage(backgroundImg)
   Background.scale = 1.7

   bird = createSprite(400,330)
   bird.addImage(birdImg1)
   bird.setCollider("circle",0,0,20)

   gameOver = createSprite(800,375)
   gameOver.addImage(gameOverImage)
   gameOver.visible = false;

   bottomGroup = new Group()
   topGroup = new Group()
   coinGroup = new Group()

   reset = createSprite(800,500,20,20)
   reset.addImage(resetImg)
   reset.visible = false;



}

function draw()
{
    background("red")

    if (gameState === "play")
    {
        Background.velocityX = -(3+(score * 3))
        if(Background.x < 0)
        {
            Background.x = Background.width/2
        }
         
        if(keyDown(UP_ARROW))
        {
            bird.velocityY = -3
            wingSound.play()
        }
    
        if(keyDown(DOWN_ARROW))
        {
            bird.velocityY = 3
            wingSound.play()
            
        }
        spawnBottomPipes()

        spawnTopPipes()

        spawnCoin()

        if (bird.isTouching(coinGroup))
        {
            score = score + 1
            coinGroup.destroyEach()
            pointSound.play()
        }

        if (bird.isTouching(topGroup)|| bird.isTouching(bottomGroup))
        {
            topGroup.setVelocityXEach(0)
            bottomGroup.setVelocityXEach(0)
            coinGroup.setVelocityXEach(0)
            bird.velocityY = 0
           
            Background.velocityX = 0;
            topGroup.setLifetimeEach(-1)
            bottomGroup.setLifetimeEach(-1)
            coinGroup.setLifetimeEach(-1)

            dieSound.play()
           
            gameState = "end"
            
        }

      

    }

    if (gameState === "end")
    {
        gameOver.visible = true;
        reset.visible = true;

        if (mousePressedOver(reset))
        {
           restart()
        }

    }
    
    
    
    drawSprites()

    textSize(45);
    fill("red")
    text("Score :" + score,50,100)
    textSize(35)
    fill("blue")
    text("Made By - Abhimanyu",1250,725 )
}

function spawnBottomPipes()
{
  if(frameCount%80 === 0)
  {
  bottomPipe = createSprite(1500,700,50,50)
  bottomPipe.scale = 2
  bottomPipe.velocityX = -(4+(score * 2))

  var i = Math.round(random(1,4))
  switch(i)
  {
      case 1 : bottomPipe.addImage(p1);
      break;
      case 2 : bottomPipe.addImage(p2)
      break;
      case 3 : bottomPipe.addImage(p3)
      break;
      case 4 : bottomPipe.addImage(p4)
      break;
      default : break;
  }
  bottomPipe.lifetime = 400;
  bottomGroup.add(bottomPipe)
  }
}

function spawnTopPipes()
{
    if(frameCount%110 === 0)
    {
        topPipe = createSprite(1500,100)
        topPipe.scale = 2
        topPipe.velocityX = -(4+(score * 2))

        var a = Math.round(random(1,4))
        switch(a)
        {
            case 1 : topPipe.addImage(q1)
            break;
            case 2 : topPipe.addImage(q2)
            break;
            case 3 : topPipe.addImage(q3)
            break;
            case 4 : topPipe.addImage(q4)
            break;
            default : break;
        }
        topPipe.lifetime = 400;
        topGroup.add(topPipe)
    }
}

function spawnCoin()
{
    if(frameCount%180 === 0)
    {
    coin = createSprite(1500,100)
    coin.addImage(coinImg)
    coin.velocityX = -3
    coin.y = Math.round(random(100,600))
    coin.lifetime = 500;
    coinGroup.add(coin)
    }

}

function restart()
{
   gameState = "play"
   reset.visible = false;
   gameOver.visible = false;
   topGroup.destroyEach()
   bottomGroup.destroyEach()
   coinGroup.destroyEach()
   score = 0
}





