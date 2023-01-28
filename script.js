let cells = document.querySelectorAll('.cell');
let player = document.querySelector('.player');
let playerTurn = "X";
let winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let gameEnded = false;
let tie = false;
let moveCount = 0;

function checkforWin(){
    winningCombinations.forEach(combination => {
        let check = combination.every(idx => cells[idx].innerHTML == playerTurn);
        if(check) {
            gameEnded = true;
            highlightCells(combination);
            showWinner();
        }
    });
}

function  highlightCells(combination){
    combination.forEach(idx => {
        cells[idx].classList.add('highlight');
    });
}

function showWinner() {
    let winner = playerTurn === "X" ? "Player 1" : "Player 2";
    document.querySelector('.restart-game').innerHTML = `${winner} wins! Click to restart`;
    document.querySelector('.restart-game').style.backgroundColor = "green";
}

function checkForTie() {
    if (moveCount === 9 && !gameEnded) {
        tie = true;
        document.querySelector('.restart-game').innerHTML = `Its a Tie! Click to restart`;
        document.querySelector('.restart-game').style.backgroundColor = "purple";
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if(cell.innerHTML !== "" || gameEnded) return;
        cell.innerHTML = playerTurn;
        moveCount++;
        checkforWin();
        checkForTie();
        if (!gameEnded && !tie) {
            playerTurn = playerTurn === "X" ? "O" : "X";
            player.innerHTML = `${playerTurn}'s turn`;
        }
    });
});

document.querySelector('.restart-game').addEventListener('click', () => {
    if(gameEnded || tie) {
        cells.forEach(cell => {
            cell.innerHTML = "";
            cell.classList.remove('highlight');
        });
        document.querySelector('.restart-game').innerHTML = "Restart Game";
        document.querySelector('.restart-game').style.backgroundColor = "#830402";
        playerTurn = "X";
        player.innerHTML = `${playerTurn}'s turn`;
        gameEnded = false;
        tie = false;
        moveCount = 0;
    }
});
