// GLOBAL VARIABLES
//================================================================

// Arrays and variables for holding data
var wordOptions = ["odells", "newbelgium", "avery", "lefthand", "baere", "denverbeercompany", "littlemachine", "newimage", "blackshirt", "black sky", "trve", "cerebral", "fermaentra", "hogshead", "joyride", "mockery", "prost", "renegade", "upslope", "wynkoop"];
var selectedWord = "";
var lettersInWord = [];
var blanksAndSuccesses = [];
var wrongLetters = [];
var numBlanks = 0;

// Gamecounter variables
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;


// FUNCTIONS
//===============================================================
// Create a function to show underscores for each letter in our random word.
function startGame() {
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  lettersInWord = selectedWord.split("");
  numBlanks = lettersInWord.length;

  // Reset Counters
  guessesLeft = 9;
  wrongLetters = [];
  blanksAndSuccesses = [];

  // Populate the dashes for our word
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  // Change HTML to reflect game conditions
  document.getElementById("selected-word").innerHTML = blanksAndSuccesses.join(" ");

  document.getElementById("guesses-left").innerHTML = guessesLeft;
  document.getElementById("win-count").innerHTML = winCount;
  document.getElementById("loss-count").innerHTML = lossCount;

  // Testing / Debugging
  console.log(selectedWord);
  console.log(lettersInWord);
  console.log(numBlanks);
  console.log(blanksAndSuccesses);

};

function checkLetters(letter) {
  // Check to see if guessed letter is in word
  var isLetterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (selectedWord[i] === letter) {
      isLetterInWord = true;
    }
  }

  // Check where in the word the letter is found and populate in our blanksAndSuccesses array
  if (isLetterInWord) {
    for (var i = 0; i < numBlanks; i++) {
      if (selectedWord[i] === letter) {
        blanksAndSuccesses[i] = letter;
      }
    }

    // Letter wasn't found
  } else {
    wrongLetters.push(letter);
    guessesLeft--;
  }

  // Testing / Debugging
  console.log(blanksAndSuccesses);
}

function roundComplete() {
  console.log("Wins: " + winCount + " | Losses: " + lossCount + " | Guesses Left: " + guessesLeft);

  document.getElementById("guesses-left").innerHTML = guessesLeft;
  document.getElementById("selected-word").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("wrong-letters").innerHTML = wrongLetters.join(" ");

  if (lettersInWord.toString() === blanksAndSuccesses.toString()) {
    winCount++;
    alert("You Won!")

    document.getElementById("win-count").innerHTML = winCount;
    startGame();
  } else if (guessesLeft === 0) {
    lossCount++;
    alert("You Lost!");

    document.getElementById("loss-count").innerHTML = lossCount;
    startGame();
  }
}

// MAIN PROCESS
//==================================================================

// Initiates the code for the first time
startGame();

// Registers key clicks
document.onkeyup = function(event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();

}
