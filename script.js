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

    function determineWinner(player, combo) {
        return combo.every((num) => player.getSelection().includes(num));
    };

    function playGame() {
        let isGameOver = false;
        // loop through winning combos, toggle gameOver if winner is determined or tie
        for (let combo in gameBoard) {
            if (gameFlow().determineWinner(playerOne, gameBoard[combo])) {
                console.log("Player One wins");
                isGameOver = true;
            } else if ((gameFlow().determineWinner(playerTwo, gameBoard[combo]))) {
                console.log("Player Two wins");
                isGameOver = true;
            } else if (playerOne.getSelection().length + playerTwo.getSelection().length >= 9) {
                console.log("It's a Tie!")
                isGameOver = true;
            };
        };
        return {isGameOver};
    };

    function runGameOver() {

    };

    return {determineWinner, playGame, runGameOver}
};

const gameDisplay = function() {
    const display = document.querySelector(".display");
    
    function showGrid() {
        // create 9 divs for tic tac toe grid
        for (let i = 0; i < 9; i++) {
            const gameSquare = document.createElement("div");
            gameSquare.classList.add("gameSquare");
            display.append(gameSquare);
        };
    };

    function assignSquare() {
        // select nodelist of all 9 divs
        // assign them id names based on gameBoard.gameSelection
        const box = display.querySelectorAll("div");
        for (let i = 0; i < box.length; i++) {
            box[i].id = gameBoard.gameSelection[i];
        };

        let playerOneTurn = true;
        // create gameInstance so new object (game) is not being created every loop
        const gameInstance = gameFlow();
        // loop through box nodelist to get individual divs
        // add event listener to each box that runs addSelection based on css id
        box.forEach(function(event) {
            event.addEventListener("click", function(button) {
                if (gameFlow().playGame().isGameOver === true) {
                    return;
                };
                if (playerOneTurn === true) {
                    event.textContent = "X";
                    playerOneTurn = false;
                    playerOne.addSelection(`${button.target.id}`)
                    // run game logic to check winner/tie after every click
                    gameInstance.playGame();
                } else if (playerOneTurn === false) {
                    event.textContent = "O";
                    playerOneTurn = true;
                    playerTwo.addSelection(`${button.target.id}`)
                    gameInstance.playGame();
                };
            });
        });
    };
        
    return {showGrid, display, assignSquare};
};