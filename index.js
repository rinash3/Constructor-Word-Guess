var Word = require("./word.js");
var inquirer = require("inquirer")

var wordArray = ["sloth", "ladybug", "stork", "dingo", "tapir", "moose", "skink", "goose", "marmoset", "dolphin" ];
var randomWord = "";
var displayWord = "";
var finalWerd;
var leftToGuess;
var lives = 6

function newGame() {
    randomWord = "";
    var r = parseInt(Math.floor(Math.random() * (wordArray.length)))
    randomWord = wordArray[r]
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
                newGame()
                print()
                askGuess();
            } else {
                console.log("Ok,have a great day!")
            }
        })
    }
}

function displayWord() {
    displayWord = finalWord.createWordString()
    console.log(displayWord);
    finalWord.compare = displayWord
}


function askGuess() {
    inquirer.prompt([{
        name: "ask",
        message: "Guess a letter"
    }]).then(function (response) {
        var input = response.ask
        if (lives > 0) {
            if (input.length === 1) {
                finalWerd.guessCheck(input)
                displayWord = finalWerd.createWerdString()

                if (finalWerd.compare === displayWord) {
                    console.log("Nope, there is no", input, "in the word")
                    lives--
                    console.log("You have", lives, "guesse(s) remaining.")
                    if (lives === 0) {
                        gameOver()
                    } else {
                        print()
                        askGuess()
                    }
                   
                } else {
                    console.log("Good choice!")
                    leftToGuess--
                    print();
                    if (leftToGuess === 0) {

                        console.log("Great Job! Here's the next word:");
                        newGame()
                        print();
                        askGuess();
                    } else {
                        ToGuess()
                    }
                }

            } else if (input.length === 0) {
                consoel.log("Please choose a letter.");
                askGuess()
            } else {
                console.log("Pick one letter a a time please.")
                askGuess()
            }


        } else {
            gameOver()
        }
    })
}

function print() {
    console.log("\n")
    console.log("******************************************")
    displayWord()
    console.log("\n*****************************************")
    console.log("\n")
}
newGame()
print()
askGuess();