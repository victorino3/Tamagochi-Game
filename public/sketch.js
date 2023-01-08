//canvas dimensions
const canvDim = 750;

//input boxes
var inputun, inputpass;
//another button
var mymidle,myothermydle,mylastmydle;
//button
var loginButton,RegisterButton,shower,feed,fight,explore;
//my Scores by default
let feedScore;
let showerScore;
let lifeScore;

//messages
var creatorLogin, UwULogin, loginM, wrong;


//Image array [fakeCode]
let myArray = [
  'ant1clear.png',      
  'beetle2.png',       
  'blackwidow.png',    
  'butterfly.png',     
  'centipede.png',     
  'rinobeetle.png',    
  'scorpion4clear.png',
  'spiderclear.png',
  'terrariumclear.png',
  'wolfie3.png'
]
//Generating food
let myArrayFood = [
  'ant1clear.png',      
  'beetle2.png',       
  'blackwidow.png',    
]

let imageFood = Math.floor(Math.random() * myArrayFood.length);
let imagemAlternativeFood =  myArrayFood[imageFood]

//image
let imagedb = Math.floor(Math.random() * myArray.length);
let imagemAlternative =  myArray[imagedb]

let dbImage;
let imagem;
let imageFoodUpload;
let img;
let bg;

/////////////Initial Score////////////////////////
let feedStart=0
let showerStart=0
let lifeStart=0
let bothScoreFeed=0
let bothScoreShower=0
let bothScoreLife=0
//////////////////////////// game over
let gameOverImg;
let objScore = {}
function setup() {
  createCanvas(canvDim, canvDim);
  bg = loadImage("scenes/scenario1.jpg")

  //Initialize point if are null
  //my Scores by default
  feedScore = feedStart == 0 ||  feedStart ==  null || feedStart ==  undefined ?  20: feedStart 
  showerScore =  showerStart == 0 ||  showerStart ==  null || showerStart ==  undefined ? 0 : showerStart 
  lifeScore =  lifeStart == 0 ||  lifeStart ==  null || lifeStart ==  undefined ? 80 : lifeStart 
  checkButtonFeed()
  //Data of previous session
  //input username
  inputun = createInput('victorino');
  inputun.position(canvDim * 1/2 - inputun.width / 2, canvDim * 1/4 - inputun.height / 2);
  
  //input password
  inputpass = createInput('123');
  inputpass.position(canvDim * 1/2 - inputpass.width / 2, canvDim * 1/2 - inputpass.height / 2);
  
  //login button
  loginButton = createButton('Login');
  RegisterButton = createButton('Register');
  loginButton.position(canvDim * 1/2 - loginButton.width * 2, canvDim * 3/4 - loginButton.height / 2);
  RegisterButton.position(canvDim * 1/2 + RegisterButton.width / 4, canvDim * 3/4 - RegisterButton.height / 2);
  loginButton.mousePressed(login);
  RegisterButton.mousePressed(Register);
  
}

function preload(dbImage) {
  let finalImage = dbImage ? dbImage : imagemAlternative
  console.log(dbImage)
  imagem = 'image/'+finalImage
  let food = 'image/'+imagemAlternativeFood
  imageFoodUpload = loadImage(`${food}`);
  img = loadImage(`${imagem}`);
  gameOverImg = loadImage('image/GAMEOVER3.png');
}

function draw() {
  bckg()
  push()
  textAlign(CENTER, CENTER);
  textSize(32);
  noStroke();
  fill(255);
  pop()
  
  push()
  if(creatorLogin == true) {
    text('Welcome back, Maddie!', canvDim / 2, canvDim / 2);
    
   let imgWidth = (img.width / 8) + bothScoreFeed -3; 
   let imgHeigth= (img.height / 8) + bothScoreShower -3;
   image(img, 0, height / 2,imgWidth ,imgHeigth);
  
   createAction()
   verifyLifeToDown()
  // verifyLifeToEnd()
  
  
  }else if(loginM == true) {
    text('Hi!', canvDim / 2, canvDim / 2);
    createAction()
   // verifyLifeToEnd()
   
  }else if(wrong == true) {
    text('Incorrect Username\nor Password', canvDim / 2, canvDim / 2);
  }
  pop()

  

}



function createAction(){

  //feed button
  mymidle = canvDim - canvDim*0.97;
  myothermydle = canvDim - canvDim*0.87;
  mylastmydle = canvDim - canvDim*0.75;
  //Square for score
  verifyLifeToDown()
  
  setInterval(verifyLifeToUp, 1000);
  //Feed score
  push()
  square(mymidle, 20, 40);
  textSize(20);
  bothScoreFeed = feedStart + feedScore
  text("F", mymidle + 10, 15);
  text(bothScoreFeed, mymidle + 1, 46);
  fill(0, 102, 153);
  pop()
  //shower score
  push()
  square(myothermydle, 20, 40);
  textSize(20);
  text("H", myothermydle + 10, 15);
  bothScoreShower = showerScore + showerStart
  text(bothScoreShower, myothermydle + 4, 46);
  fill(0, 102, 153);
  pop()

  //figth score
  push()
  square(mylastmydle, 20, 40);
  textSize(20);
  text("L", mylastmydle + 10, 15);
  bothScoreLife = lifeScore
  //console.log("Pre-Reducing",bothScoreLife)
  text(bothScoreLife, mylastmydle + 2, 46);
  fill(0, 102, 153);
  pop()
  //
 
  feed = createButton('Feed');
  fight = createButton('Fight');
  feed.position(mymidle, canvDim - canvDim*0.08);
  verifyHygieneToExplorar() 
  fight.position(mylastmydle, canvDim - canvDim*0.08);
  feed.mousePressed(feedAndGrow)
  
  
}

function verifyHygieneToExplorar(){
  if (bothScoreShower == 100) {
    explore = createButton("Explorar")
    explore.position(myothermydle, canvDim - canvDim*0.08);
  } else {

    shower = createButton('Hygiene');
    shower.position(myothermydle, canvDim - canvDim*0.08);
    shower.mousePressed(increaseShower)
  }
   
}
//reduce feed twice
function checkButtonFeed() {
  setTimeout(function() {
    if(!feed.mouseIsPressed ){
      reduceFeed();
    setTimeout(reduceFeed, 10000);
  }}, 10000);
  
 
}

function reduceFeed() {
  feedScore -= 5;
  console.log(feedScore);
}

function feedAndGrow(){
  
  image(imageFoodUpload, (width-500)/2, (height-400)/2, 500, 400);
   
 // imagemAlternativeFood
   
}



function verifyLifeToDown(){
  setInterval(function() {
      if (feedScore == 0 || showerScore == 0) {
      lifeScore -= 1;
    }
    }, 2000);
    verifyLifeToEnd()
    
  } 





function verifyLifeToUp(){ 
    if(lifeScore < 100){
      if (bothScoreShower > 50 || feedScore > 50) {
        lifeScore++;
    }
  }
}


function verifyLifeToEnd(){
  if (lifeScore == 0) {
    removeElements();
    image(gameOverImg, (width-500)/2, (height-400)/2, 500, 400);
    noLoop()
  }
}





function increaseShower(){
  if(showerScore < 100){
    showerScore = 100
  }
}




function uploadFeed() { 
  let data = {feedScore}
  httpPost("/upload/startergy/feed","json",data,(response)=>{
     console.log("response : ", response)
  })
}

function uploadShower() { 
  let data = {showerScore}
  httpPost("/upload/startergy/shower","json",data,(response)=>{
     console.log("response : ", response)
  })
}

function getdata() {
  loadJSON('/getdata',(response)=>{
    let result = response
    /*feedStart = result.message.feed
    showerStart = result.message.showe*/
    })
}


