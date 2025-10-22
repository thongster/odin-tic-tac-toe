const gameBoard = [
    {topLeft: false},
    {topMiddle: false},
    {topRight: false},
    {middleLeft: false},
    {middleMiddle: false},
    {middleRight: false},
    {bottomLeft: false},
    {bottomMiddle: false},
    {bottomRight: false}
];

function createPlayer(name) {
    let score = 0;
    let selection = [];

    const getScore = () => score;
    const addScore = () => score++;
    const getSelection = () => selection;
    
    const addSelection = (choice) => {
        selection.push(choice);
    };
    return { name, getScore, addScore, getSelection, addSelection };
};

const playerOne = createPlayer("Toan");
const playerTwo = createPlayer("Tuyen");

console.log(playerOne)
console.log(playerTwo)

const gameFlow = function() {

};

