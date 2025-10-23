const gameBoard = {
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

    function playGame() {
        playerOne.addSelection(prompt("Player 1, 1st choice: "));
        playerTwo.addSelection(prompt("Player 2, 1st choice: "));
    }

    function contains(player, combo) {
        return combo.every((num) => player.getSelection().includes(num));
    };

    return {playGame, contains}
};

// for "every" element in the selected combo, check if it includes the player selection
for (let combo in gameBoard) {
    if (gameFlow().contains(playerOne, gameBoard[combo])) {
        console.log("Player One wins");
    } else if ((gameFlow().contains(playerTwo, gameBoard[combo]))) {
        console.log("Player Two wins");
    };
};
