
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]; 



const cardsContainer=document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];
let shuffledCards = [];
let countStars = 3;
const stars = document.querySelector(".stars");
let lastmoves = document.querySelector(".moves");
let lastcountStars = document.querySelector(".countStars");
let lastallSeconds = document.querySelector(".allSeconds");

// MODAL

var scoreModal = document.getElementById("score-modal");


/* Timer */
var timerVar = setInterval(clockTimer, 1000);
var allSeconds = 0;

function clockTimer() {
  ++allSeconds;
  var hour = Math.floor(allSeconds / 3600);
  var minute = Math.floor((allSeconds - hour * 3600) / 60);
  var seconds = allSeconds - (hour * 3600 + minute * 60);

  document.getElementById(`hour`).innerHTML = hour;
  document.getElementById(`minute`).innerHTML = minute;
  document.getElementById(`seconds`).innerHTML = seconds;
}

function clockStart() {
  timerVar = setInterval(countTimer, 1000);
}

function tpause() {
  clearInterval(timerVar);
}

function sreset() {
  allSeconds = -1;
  clockTimer();
}


//Initialize the game 
function init() {
const shuffeledCards = shuffle(icons);
   
for (let i = 0; i < icons.length; i++){
const card=document.createElement("li");
card.classList.add("card");
card.innerHTML = "<i class= '" + icons[i] + "'</i>";
cardsContainer.appendChild(card);

// add click event to each card	
click(card);  
 }
}
// click event
function click(card) {
//card click event
card.addEventListener("click", function (){
const currentCard = this;
const previousCard = openedCards[0];

// we have an existing opened card
if(openedCards.length === 1){ 
card.classList.add("open", "show", "disable");    
openedCards.push(this);     
	
// we should compare our two opened card
if(this.innerHTML === openedCards[0].innerHTML) {
currentCard.classList.add("match");
previousCard.classList.add("match"); 
  
//match
matchedCards.push(currentCard, previousCard);          
openedCards = []; 

//check if the game is over
isOver();
  
  
} else {

// wait 500ms, then do this
setTimeout(function(){
currentCard.classList.remove ("open","show", "disable");
previousCard.classList.remove ("open","show", "disable"); openedCards = []; 
  }, 500);

//new move
addMove(); 
 
}  
// we don't have opened card  
} else {
  
currentCard.classList.add("open", "show", "disable");    
openedCards.push(this);   
  
}
       
  });
 
}

    
function isOver() {
if(matchedCards.length === icons.length) {
alert("GAME OVER! YOU Won! Do You Want to Play Again? Your Stars are " +  countStars  +  ". Your moves are "   +  moves  + 
			 ". Your timing in seconds is "    +  allSeconds );
 clearInterval(timerVar); 
}
}
//add move
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0
function addMove() {
 moves++;
  movesContainer.innerHTML = moves;
 //set the rating 
rating();
}
//rating
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
        		            <li><i class="fa fa-star"></i></li>`;
function rating() {
  if (moves > 15) {
    countStars = 1;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  } else if (moves > 10) {
    countStars = 2;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
  } else {
    countStars = 3;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
        		                    <li><i class="fa fa-star"></i></li>`;
  }
}
//restart button
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function(){
// delete all cards 
 cardsContainer.innerHTML = " "; 
  // call init() to create new cards
  init();
  //reset any relatable variables
matchedCards=[];
moves = 0;
movesContainer.innerHTML = moves; 
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
        		                <li><i class="fa fa-star"></i></li>`;

});
//start the game fisrt time
init();

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
