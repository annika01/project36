class Food{

constructor(){

this.foodStock= 0
this.lastfed
this.image=loadImage("images/Milk.png")

}
updateFoodStock(foodStock){
    this.foodStock=foodStock
}

getFedtime(lastfed){

    this.lastfed= lastfed
}

deductFood(){
if(this.foodStock>0){
    this.foodStock--
}
}

getFoodStock(){

    return this.foodStock
}

display(){

var x= 80
var y=100
imageMode(CENTER)

if(this.foodStock!==0){
for(var i =0 ; i<this.foodStock;i++){
    if(i%10==0){
        x=80; 
        y=y+50
    }
    image(this.image, x,y,50,50)
     x=x+30
}
}

}
bedroom(){
    background(bedroom,550,500)
}

garden(){
    background(garden,550,500)
}

washroom(){
    background(wc,550,500)
}

}