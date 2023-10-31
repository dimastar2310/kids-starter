

//board
let board;
let boardWidth = 360;
let boardHight = 640;
let context; //used for drawing on canvas ,its comes from canvas


//bird 
let birdWidth = 34; //width/height ration = 408/288 = 17/12
let birdHight = 24;
let birdX = boardWidth/8;
let birdY = boardHight/2;
let birdImg;
//bird as object 
let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    hight : birdHight
}
//pipes
let pipeArray = [];
let pipeWidth = 64; //widht/hight ratio = 384/3072 = > 1/8
let pipeHight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;
//physics 
let velocityX = -2; //pipes moving left speed



//wait for everything to be loaded 
window.onload = function() {
        board = document.getElementById("board");
        board.height = boardHight;
        board.width = boardWidth;
        context = board.getContext("2d"); //used for drawing on board
        
        //draw flapy bird

        //context.fillStyle = "green";
        //context.fillRect(bird.x ,bird.y,bird.width,bird.hight);

        //load images
        birdImg = new Image();
        birdImg.src = "./data/flappybird.png";
        birdImg.onload = function(){
        context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.hight);
        }

        topPipeImg = new Image();
        topPipeImg.src = "./data/toppipe.png";

        bottomPipeImg = new Image();
        bottomPipeImg.src = "./data/bottompipe.png";



        //requestAnimationFrame(update);
        //i need this function to be first
        //window.console.log("iam at on load");
        update();
        setInterval(placePipes,1500); //every 1.5 seconds

} 

//draw canvas over and over again
function update(){
     //console.log("12121212");
     requestAnimationFrame(update);
     //clear previous frame
     context.clearRect(0, 0, board.width, board.height);

     //bird
     context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.hight);
     //pipes
     for(let i = 0;i < pipeArray.length;i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.hight);
     }

}
function placePipes(){
    let randomPipeY = pipeY - pipeHight/4 - Math.random()*(pipeHight/2);
    let openingSpace = board.height/4;


    let topPipe = {
        img : topPipeImg,
        x:pipeX,
        y:randomPipeY,
        width:pipeWidth,
        hight:pipeHight,
        passed : false
    }
    pipeArray.push(topPipe);
    
    let bottompipe = {
       img:bottomPipeImg ,
       x : pipeX,
       y : randomPipeY + pipeHight + openingSpace,
       width : pipeWidth , 
       hight : pipeHight ,
       passed : false
    }
    pipeArray.push(bottompipe);

     
}