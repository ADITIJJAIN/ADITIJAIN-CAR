class Game {
  constructor() {}
  //BP
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  //BP
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  // TA
  start() {
  
    player= new Player();
    playerCount=player.getCount()

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

    fuelGroup=new Group()
    coinGroup=new Group()

    this.addSprites(fuelGroup,4,fuelImage,0.02)
    this.addSprites(coinGroup,19,coinImage,0.09)
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale){
    for(var i=0; i<numberOfSprites; i++){

      var x,y;
     x=random(width/2+150,width/2-150)
     y=random(-height*4.5, height-400)

    var sprite=createSprite(x,y)
    sprite.addImage("sprite",spriteImage)
    sprite.scale=scale
    spriteGroup.add(sprite)
  }
  }


  //BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  //SA
  play() {
    this.handleElements();
     Player.getPlayersInfo()

    if(allPlayers !== undefined){
      image(track,0,-height*5,width,height*6)
      var index=0
      for(var plr in allPlayers){

        index=index+1

        var x=allPlayers[plr].positionX
        var y=height-allPlayers[plr].positionY
        
        cars[index-1].position.x=x
        cars[index-1].position.y=y

       if(index===player.index){
        stroke(10)
        fill("black")
        ellipse(x,y,60,60)

        this.handleFuel(index)
        this.handleCoin(index)
      }
      }

      if(keyIsDown(UP_ARROW)){
        player.positionY+=10
        player.update()
      }
      drawSprites();
    }
      
    }

    handleFuel(index){
      cars[index-1].overlap(fuelGroup,function(collector,collected){
         
        player.fuel=185
        collected.remove()
      })
    }

    handleCoin(index){
      cars[index-1].overlap(coinGroup,function(collector,collected){

        player.score+=21 //21 is a random no//
        player.update()
        collected.remove()
      })
      
    }
  }

