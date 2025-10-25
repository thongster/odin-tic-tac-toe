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
    let selection = [];
    const getSelection = () => selection;
    const addSelection = function(choice) {
        selection.push(choice);
    };
    const clearSelection = () => selection.splice(0, selection.length);
    return {name, getSelection, addSelection, clearSelection};
};

const players = {
    playerOne: "Player One",
    playerTwo: "Player Two"
};

const controlBoard = function() {
    const playerOneName = document.querySelector(".playerOneName");
    const playerOneInput = document.querySelector("#pOneName");
    const playerTwoName = document.querySelector(".playerTwoName");
    const playerTwoInput = document.querySelector("#pTwoName");

    playerOneName.addEventListener("submit", (e) => {
        e.preventDefault();
        players.playerOne = createPlayer(playerOneInput.value);
    });
    playerTwoName.addEventListener("submit", (e) => {
        e.preventDefault();
        players.playerTwo = createPlayer(playerTwoInput.value);
    });
};

// const playerOne = createPlayer("Toan");
// const playerTwo = createPlayer("Tuyen");

const gameFlow = function() {

    function determineWinner(player, combo) {
        return combo.every((num) => player.getSelection().includes(num));
    };

    // initialize before function to avoid repeating declaration
    let isGameOver = false;
    function playGame() {
        // loop through winning combos, toggle gameOver if winner is determined or tie
        if (isGameOver === false) {    
            for (let combo in gameBoard) {
                if (determineWinner(playerOne, gameBoard[combo])) {
                    console.log("Player One wins");
                    isGameOver = true;
                } else if ((determineWinner(playerTwo, gameBoard[combo]))) {
                    console.log("Player Two wins");
                    isGameOver = true;
                } else if (playerOne.getSelection().length + playerTwo.getSelection().length >= 9) {
                    console.log("It's a Tie!")
                    isGameOver = true;
                };
            };
        } else {
            return;
        };
        return {isGameOver};
    };

    function runGameOver() {
        // clear selection arrays
        playerOne.clearSelection();
        playerTwo.clearSelection();

        // clear dom
        const display = document.querySelector(".display");
        const box = display.querySelectorAll("div");
        box.forEach((square) => square.textContent = "");

    };

    return {determineWinner, playGame, runGameOver, getIsGameOver() {return isGameOver}}
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
                if (gameInstance.getIsGameOver() === true) return;
                
                // determine player turn
                let currentPlayer = playerOneTurn ? playerOne : playerTwo;
                // determine symbol
                let symbol = playerOneTurn ? "X" : "O";

                // if the space is empty, then allow edit of dom and addselection
                if (event.textContent === "") {
                    currentPlayer.addSelection(button.target.id)
                    event.textContent = symbol;
                }
                gameInstance.playGame();
                playerOneTurn = !playerOneTurn;
            });
        });
    };
        
    return {showGrid, assignSquare};
};

gameDisplay().showGrid()
gameDisplay().assignSquare()