const gameBoard = {
gameSelection: ["topLeft", "topMiddle", "topRight", 
                "middleLeft", "middleMiddle", "middleRight", 
                "bottomLeft", "bottomMiddle", "bottomRight"],
comboOne: ["topLeft", "topMiddle", "topRight"],
comboTwo: ["middleLeft", "middleMiddle", "middleRight"],
comboThree: ["bottomLeft", "bottomMiddle", "bottomRight"],
comboFour: ["topLeft", "middleLeft", "bottomLeft"],
comboFive: ["topMiddle", "middleMiddle", "bottomMiddle"],
comboSix: ["topRight", "middleRight", "bottomRight"],
comboSeven: ["topLeft", "middleMiddle", "bottomRight"],
comboEight: ["topRight", "middleMiddle", "bottomLeft"],
};

function createPlayer(name) {
    let score = 0;
    let selection = [];
    const getScore = () => score;
    const addScore = () => score = score + 1;
    const getSelection = () => selection;
    const addSelection = function(choice) {
        selection.push(choice);
    };
    return {name, getScore, addScore, getSelection, addSelection};
};

const playerOne = createPlayer("Toan");
const playerTwo = createPlayer("Tuyen");

const gameFlow = function() {

    function playerChoice() {
        playerOne.addSelection(prompt("Player 1, choose: "));
        playerTwo.addSelection(prompt("Player 2, choose: "));
    };

    function determineWinner(player, combo) {
        return combo.every((num) => player.getSelection().includes(num));
    };

    function playGame() {
        let gameOver = false;
        while (gameOver === false) {
            gameFlow().playerChoice();
            // for "every" element in the selected combo, check if it includes the player selection
            for (let combo in gameBoard) {
                if (gameFlow().determineWinner(playerOne, gameBoard[combo])) {
                    console.log("Player One wins");
                    gameOver = true;
                    break;
                } else if ((gameFlow().determineWinner(playerTwo, gameBoard[combo]))) {
                    console.log("Player Two wins");
                    gameOver = true;
                    break;
                } else if (playerOne.getSelection().length + playerTwo.getSelection().length >= 9) {
                    console.log("It's a Tie!")
                    gameOver = true;
                    break;
                };
            };
        };
    }
    return {playerChoice, determineWinner, playGame}
};

const gameDisplay = function() {
    const display = document.querySelector(".display");
    
    function showGrid() {
    
        for (let i = 0; i < 9; i++) {
            const gameSquare = document.createElement("div");
            gameSquare.classList.add("gameSquare");
            display.append(gameSquare);
            if (i === 8) {
                return {gameSquare};
            }
        };

        return {gameSquare};
    };

    let box = display.querySelectorAll("div");
    for (let i = 0; i < box.length; i++) {
        box[i].id = gameBoard.gameSelection[i];
    };

    console.log(box);
    
    return {showGrid, display, box};
};