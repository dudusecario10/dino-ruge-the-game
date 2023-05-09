var trex,trexCorrendo,chao,imagemChao,subchao,nuvem,imagemnuvem,cacto,escolhercacto,imagemfim,imagemreniciar;

var  imagemcacto1,imagemcacto2,imagemcacto3,imagemcacto4,imagemcacto5,imagemcacto6;

var   sompulo,somMorendo,somcheckpoint;




const jogar = 1;
const encerrar = 0;
var estadoJogo = jogar;


  function preload(){
  
trexCorrendo = loadAnimation("trex1.png","trex2.png","trex3.png")
imagemChao = loadImage("ground2.png")
    imagemnuvem = loadImage("cloud.png")
imagemcacto1 = loadImage("obstacle1.png")
imagemcacto2 = loadImage("obstacle2.png")
imagemcacto3 = loadImage("obstacle3.png")
imagemcacto4 = loadImage("obstacle4.png")
imagemcacto5 = loadImage("obstacle5.png")
imagemcacto6 = loadImage("obstacle6.png")
    imagemfim = loadImage("gameOver.png")
    imagemreniciar = loadImage("restart.png")
    
    
    sompulo = loadSound("jump.mp3")
    somMoremdo = loadSound("die.mp3")
    somcheckpoint = loadSound("checkPoint.mp3")
trexColidiu = loadAnimation("trex_collided.png")

  }

function setup() {
 createCanvas(600,200)
  trex = createSprite(50,100,20,40)
  trex.addAnimation("correndo",trexCorrendo)
  trex.addAnimation("colidiu",trexColidiu)
  trex.scale = 0.5
  
  
  
  chao = createSprite(200,180,500,10)
  chao.addAnimation("chao",imagemChao)
  
  subchao = createSprite(200,190,500,10)
  subchao.visible = false
  
  fimdejogo = createSprite(300,80,30,30)
   fimdejogo.addAnimation("fimdejogo",imagemfim)
   fimdejogo.scale = 0.5
  reniciar = createSprite(300,120,30,30)
   reniciar.addAnimation("reniciar",imagemreniciar)
reniciar.scale = 0.5   
   
tempoJogo = 0;
  
 trex.setCollider("circle", 0,0,40)
  trex.debug = false
  
  grupodeCactos = new Group();
   grupodeNuvens = new Group ();
}

function draw() {
  background(180)
 text("Tempo :"+ tempoJogo,500,30) 
  
  
  if(estadoJogo == jogar){
    
    tempoJogo = tempoJogo + 1;
    
    
    if(tempoJogo > 0 && tempoJogo % 100 ==0){
      somcheckpoint.play()
    }
    

    
    fimdejogo.visible = false
    reniciar.visible = false
    
     chao.velocityX = -(3 + tempoJogo / 100)

    
      if(chao.x < 0){
   
    chao.x = chao.width / 2
  }
  
  if(keyDown("space") && trex.y > 161){
    trex.velocityY = - 10
    sompulo.play()
 }
 
 
     
    gerarNuvens()
    

  gerarcactos()
    
    
    
    if(grupodeCactos.isTouching(trex)){
      estadoJogo = encerrar;
      
     //tempoJogo 
    }
     
    
 
  }else if(estadoJogo == encerrar){
   //somMorendo.play() 
     
     chao.velocityX = 0
    fimdejogo.visible = true
    reniciar.visible = true
    
    
    
    grupodeCactos.setVelocityXEach(0);
  grupodeNuvens.setVelocityXEach(0);
    
grupodeCactos.setLifetimeEach(-1);
  grupodeNuvens.setLifetimeEach(-1);   
    
    
    trex.changeAnimation("colidiu",trexColidiu)
   } 
    
   
   trex.velocityY = trex.velocityY + 0.5
   
  
  
  
  
 
  

  
  
  
  trex.collide(subchao)
  
  if(mousePressedOver(reniciar)  ){
    console.log("clicou")
    
    restart()
  }
  
  drawSprites()
 
}

function restart (){
  estadoJogo = jogar
  fimdejogo.visible = false;
  reniciar.visible = false;
  
  grupodeCactos.destroyEach()
  grupodeNuvens.destroyEach()
   trex.changeAnimation("correndo",trexCorrendo)
}




  function gerarcactos(){
  if(frameCount % 60 == 0 ){
        cacto = createSprite(600,165, 10, 40)
cacto.velocityX = -3
 cacto.velocityX = -(3 + tempoJogo / 100)   
       escolhercacto = Math.round(random(1,6))
  
  switch(escolhercacto){
    case 1 : cacto.addImage(imagemcacto1)
    break;
    case 2 : cacto.addImage(imagemcacto2)
    break;
       case 3 : cacto.addImage(imagemcacto3)
    break;
       case 4 : cacto.addImage(imagemcacto4)
    break;
       case 5 : cacto.addImage(imagemcacto5)
    break;
       case 6 : cacto.addImage(imagemcacto6)
    break;
    default : break
  }
  cacto.scale = 0.4  
   cacto.lifetime = 300; 
     grupodeCactos.add(cacto);
    
    
    
    
    
    
    
    
    
    
  }
    
    
  
  }

function gerarNuvens(){
  if(frameCount % 60 == 0 ){
     nuvem = createSprite(600,100, 50, 10)
nuvem.velocityX = -3

    nuvem.addAnimation("nuvem pessando", imagemnuvem)
nuvem.y = Math.round(random(60, 100))
    
    trex.depth = trex.depeth
    
    trex.depth = trex.depeth + 1
    
    
    nuvem.scale = 0.4
    nuvem.lifetime = 300;
   grupodeNuvens.add(nuvem)
    
    
    
  }


 
}




