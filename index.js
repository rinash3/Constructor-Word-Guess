var Word = require("./word.js");
var inquirer = require("inquirer")

var wordToSelect = ["cat", "dog", "beaver", "duck", "sloth", "ladybug", "stork", "dingo", "tapir", "moose", "skink", "goose", "marmoset", "dolphin", ];
var display = "";
var finalWord;
var leftToGuess;
var lives = 10;

function startGame() {
  randomWord = "";
   var r = parseInt(Math.floor(Math.random() * (wordToSelect.length)))
   randomWord = wordToSelect[r]
    finalWord = new Word(randomWord)
    leftToGuess = finalWord.letterArr.length
}

function gameOver() {
    {
        console.log("Game over.")
        inquirer.prompt([{
            type: "confirm",
            name: "playAgain",
            message: "Would you like to play again?"
        }]).then(function (response) {
            if (response.playAgain) {
                startGame()
                print()
                askGuess();
            } else {
                console.log("Ok, see you around!")
            }
        })
    }
}

function displayWord() {
    display = finalWord.createWordString()
    console.log(display);
    finalWord.compare = display
}


function askGuess() {
    inquirer.prompt([{
        type:"input",
        name: "ask",
        message: "Guess a letter"
    }]).then(function (response) {
        var input = response.ask
        if (lives > 0) {
            if (input.length === 1) {
                finalWord.guessCheck(input)
                display = finalWord.createWordString()

                if (finalWord.compare === display) {
                    console.log("There is no", input, "in the word")
                    lives--
                    console.log("You have", lives, "guesse(s) remaining.")
                    if (lives === 0) {
                        gameOver()
                    } else {
                        print()
                        askGuess()
                    }
                   
                }else {
                    console.log("Good guess!")
                    leftToGuess--
                    print();
                    if (leftToGuess === 0) {

                        console.log("Great Job!");
                        startGame()
                        print();
                        askGuess();
                    } else {
                        askGuess()
            }
           }

            } else if (input.length === 0) {
                consoel.log("Please select a letter.");
                askGuess()
            } else {
                console.log("One letter at a time please.")
                askGuess()
      }


        } else {
            gameOver()
        }
    })
}

function print() {
    console.log("\n")
 
    displayWord()
  
    console.log("\n")
}
startGame()
print()
askGuess();