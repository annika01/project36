//Create variables here

var dog, dogimg1, dogimg2, db, foods, foodstock, fedtime,lastfed, feed,addfood,foodobject,garden,wc,bedroom,gameState

function preload()
{
  //load images here
  dogimg1=loadImage("images/Dog.png")
  dogimg2=loadImage("images/happydog.png")
garden=loadImage("img/Garden.png")
bedroom=loadImage("img/Bed Room.png")
wc=loadImage("img/Wash Room.png")
}

function setup() {
	createCanvas(800, 700);
  db=firebase.database()
  dog=createSprite(450, 300)
  dog.addImage(dogimg1)
  dog.scale= 0.15
  db.ref("Food").on("value",readStock)
  foodobject=new Food()
  feed= createButton("feed the dog")
  feed.position(500,95)
  feed.mousePressed(feedDog)

  addfood= createButton("add food")
  addfood.position(600,95)
  addfood.mousePressed(addFood)
  
db.ref("gameState").on("value", function(data){
gameState=data.val()
})

}


function draw() { 
  background("yellow") 
  
currentTime= hour()
if(currentTime==(lastfed+1)){
  update("play")
foodobject.garden()

}
if(currentTime==(lastfed+2)){
  update("sleep")
foodobject.bedroom()
}

if(currentTime>(lastfed+2)&&currentTime<=(lastfed+4)){
  update("bath")
foodobject.washroom()

}
else{
  update("hungry")
foodobject.display()

}

if(gameState!=="hungry"){
  feed.hide()
  addfood.hide()
  dog.remove()
}
else{
  feed.show()
  addfood.show()
  dog.addImage(dogimg1)
}
  drawSprites();
  
  
  //add styles here

}
function readStock(data){
foods= data.val()
foodobject.updateFoodStock(foods)
}
function feedDog() {
  dog.addImage(dogimg2)
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
  db.ref("/").update({
    Food:foodobject.getFoodStock(),
    feedtime:hour(),
    gameState:"hungry"
  })
}
function addFood() {
  foods++
  db.ref("/").update({
Food: foods
  })
}
function update(state){
  db.ref("/").update({
    gameState:state
  })
}