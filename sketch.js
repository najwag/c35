var ball, ballPositionRef;
var database;
var boxPosition;

function setup(){
    createCanvas(500,500);

    //to create or initialise the database --> firebase.database()
    database = firebase.database()

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //to refer to the database and listen to the changes happening 
    //to refer to the position of the box --> database.ref()
    ballPositionRef = database.ref('box/position')

    //to listen to the changes happening in the database --> var.on("value",function)
    ballPositionRef.on("value", readPosition)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    //refer to the database and update the change in position
    database.ref('box/position').set({
        'x':boxPosition.x + x,
        'y':boxPosition.y + y
    })
  }

function readPosition(data){        //data--> listened position change
//to store the listened information inside the boxPosition variable
boxPosition= data.val() //val() --> store something

//to store the ball's position to the box's position
ball.x = boxPosition.x;
ball.y = boxPosition.y
}
