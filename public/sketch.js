//canvas dimensions
const canvDim = 500;

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
let value
let myArrayFood = [
  'Mosca',      
  'Lagarto',       
  'Ups !!Sem comida disponível',    
]


//image
let imagedb = Math.floor(Math.random() * myArray.length);
let imagemAlternative =  myArray[imagedb]

let dbImage;
let imagem;
let imageFoodUpload;
let img;
let bg;
let showImgExplore = false;

/////////////Initial Score////////////////////////
let feedStart=0
let showerStart=0
let lifeStart=0
let reduceLife=0
let bothScoreFeed=0
let bothScoreShower=0
let bothScoreLife=0
let imageWidthToIncrease=0
let imageHeightToIncrease=0
let showText = false;
let showTextExplore = false;
let currentValue;
//////////////////////////// game over
let gameOverImg;
let surprises = ["novo alimento", "sofreu ataque"];
let currentSurprise;
let showSurprise = false;
let redBackground;
let count = 0;


let objScore = {}
function setup() {
  createCanvas(canvDim, canvDim);
  bg = loadImage("scenes/scenario1.jpg")

  //Initialize point if are null
  //my Scores by default
  feedScore = feedStart == 0 ||  feedStart ==  null || feedStart ==  undefined ?  20: feedStart 
  showerScore =  showerStart == 0 ||  showerStart ==  null || showerStart ==  undefined ? 10 : showerStart 
  lifeScore =  lifeStart == 0 ||  lifeStart ==  null || lifeStart ==  undefined ? 100 : lifeStart 
  checkButtonFeed()
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
    
   let imgWidth = (img.width / 8) + imageWidthToIncrease -3; 
   let imgHeigth= (img.height / 8) + imageHeightToIncrease -3;
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
  mylastmydle = canvDim - canvDim*0.73;
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
  explore = createButton('Explorar');
  feed.position(mymidle, canvDim - canvDim*0.08); 
  explore.position(mylastmydle, canvDim - canvDim*0.08);
  feed.mousePressed(toggleText)
  shower = createButton('Hygiene');
  shower.position(myothermydle, canvDim - canvDim*0.08);
  shower.mousePressed(increaseShower)
  explore.mousePressed(toggleTextExplore)
  feedAndGrow()
  exploreResult()
  
  
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
  uploadStratergy()
  console.log(feedScore);
}



function feedAndGrow() {
  push()
  if (showText) {
    fill(0);
    textSize(32);
    textFont("Georgia");
    textAlign(CENTER, CENTER);
    
      text("Comendo..."+currentValue, width/2, height/2);
      for (let i = 0; i < 200; i++) {
        stroke(random(255), random(255), random(255));
        line(random(width), random(height), random(width), random(height));
  }

  console.log("Sorted "+currentValue)

  }
  pop()
}
function exploreResult() {
  push()
  if (showSurprise) {
    fill(0);
    textSize(32);
    textFont("Georgia");
    textAlign(CENTER, CENTER);
    
     
      if(currentSurprise === "sofreu ataque"){
        text("Comendo..."+currentSurprise, width/2, height/2);
        for (let i = 0; i < 200; i++) {
          stroke(random(255), random(255), random(255));
          line(random(width), random(height), random(width), random(height));
          background("red")
        }
    }
    if (currentSurprise === "novo alimento") {
      text("Comendo..."+currentSurprise, width/2, height/2);
      for (let i = 0; i < 200; i++) {
        stroke(random(255), random(255), random(255));
        line(random(width), random(height), random(width), random(height));
        background("green")
    }
    
      
  }

  console.log("Sorted "+currentSurprise)

  }
  pop()
}

function toggleText() {
  showText = !showText;
  if(bothScoreLife < 100 && currentValue == "Mosca"  ){
    lifeScore += 30
    uploadStratergy()
  }
  if(imageHeightToIncrease < 150 && imageWidthToIncrease < 150 &&  currentValue == "Lagarto"){
    imageHeightToIncrease += 50
    imageWidthToIncrease += 50
    uploadStratergy()
    //console.log("image and height "+ imageHeightToIncrease, imageWidthToIncrease)
  }
  if (bothScoreLife > 0 && currentValue === "Ups !!Sem comida disponível") {
    lifeScore -= 10;
    uploadStratergy()
  }
  if (showText) {
    currentValue = random(myArrayFood);
    setTimeout(function() {
      showText = false;
    }, 100);
  }
  
}

function toggleTextExplore() {
  
  showSurprise = !showSurprise;
  if (showSurprise) {
    currentSurprise = random(surprises);
    push()
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(0, 0, 0);
    text("Surpresa: " + currentSurprise, width/2, height/2);
    console.log(currentSurprise)
    if (bothScoreLife <= 40 && currentSurprise === "sofreu ataque") {
      console.log("No desconto "+currentSurprise)
      lifeScore = 0;
      count += 1;
      console.log("Contando "+count)
      uploadStratergy()
      noLoop()
    }
    if (bothScoreLife > 50 && currentSurprise === "sofreu ataque") {
      console.log("No desconto "+currentSurprise)
      count += 1;
      console.log("Contando "+count)
      lifeScore -= 40;
      uploadStratergy()
    }
    if(count == 2){
      
      verifyWin()
    }
    setTimeout(function() {
      showSurprise = false;
    }, 100);
    pop()
  }
}


function verifyLifeToDown(){
  setInterval(function() {
      if (feedScore == 0 || showerScore == 0) {
      lifeScore -= 1;
      uploadStratergy()
    }
    }, 2000);
    verifyLifeToEnd()
    
  } 


function verifyWin(){
  alert("Parabéns o seu tamagochi consegui sobreviver e venceu!")
  removeElements()
  background("white")
  noLoop()
}


function verifyLifeToUp(){ 
    if(lifeScore < 100){
      if (bothScoreShower > 50 || feedScore > 50) {
        lifeScore++;
        uploadStratergy()
    }
  }
}


function verifyLifeToEnd(){
  if (lifeScore == 0) {
    removeElements();
    uploadStratergy()
    image(gameOverImg, (width-500)/2, (height-400)/2, 500, 400);
    noLoop()
  }
}





function increaseShower(){
  if(showerScore < 100){
    showerScore = 100
    uploadStratergy()
  }
}




function uploadStratergy() { 
  let data = {
    bothScoreFeed,
    bothScoreShower,
    bothScoreLife
  }
  httpPost("/upload/startergy/all","json",data,(response)=>{
     console.log("response : ", response)
  })
}


function getdata() {
  loadJSON('/getdata',(response)=>{
    let result = response
    console.log("Data come from back "+response)
    /*feedStart = result.message.feed
    showerStart = result.message.showe*/
    })
}


