// status clasının verisine erismek
const gameStatus = document.querySelector('.status');
console.log(gameStatus)

//Oyun durumu
let gameActive = true;

//Oynama Sirasi Baslangic degeri = X
let currentPlayer = "X";

// Boxların dizi hali
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Oyuncu ${currentPlayer} kazandi!`;
const drawMessage = () => `Berabere!`;
const currentPlayerTurn = () => currentPlayer==="X" ? `Oynama sirasi ${currentPlayer}'de `: `Oynama sirasi ${currentPlayer}'da`;
const gameStart = () => "Oyun Basladi Sira X'de"

//Oyun baslangıcı game status atama
gameStatus.innerHTML = gameStart();

// Oyun kazanma durumları
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//console.log(winningConditions.length);
//Oyuncu değiştiginde çagırılacak fonksiyon 
function handlePlayerChange() {
    currentPlayer = currentPlayer !== "X" ? "X" : "O";
    gameStatus.innerHTML = currentPlayerTurn();
}

//Oyun durum kontrolü
function handleResultValidation() {
    let roundWon = false;
    //winning conditions içindeki olasilik kadar bir döngü
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        //[0,3,6] i=4 için alacagı winCondition
        let a = gameState[winCondition[0]];
        //gameState[0] için a nın alacagı deger
        let b = gameState[winCondition[1]];
        //gameState[3] icin b nin alacagı deger
        let c = gameState[winCondition[2]];
        //gameState[6] icin c nin alacagı deger
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    //Oyun kazanıldıgında gameStatüse inner htmle winnig mesajı atama
    if (roundWon) {
        gameStatus.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    //Oyun berabere oldugunda gameStatüse inner htmle draw mesajı atama
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        gameStatus.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    //Kazanan ya da berabere oyun degilse oyuncu degisir
    handlePlayerChange();
}

//box tıklandıktan sonra cagırılacak fonksiyon
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
   //console.log(gameState);
}
//Tıklamayı kontrol eden fonksiyon
function handleCellClick(clickedCellEvent) {
    //console.log(parseInt(clickedCellEvent.target.getAttribute('data-index')));
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Basılan yere tekrar basılmaması saglayan if döngüsü
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameStatus.innerHTML = gameStart();
    document.querySelectorAll('.box').forEach(cell => cell.innerHTML = "");
}

// box a ya da restarta tıklandıgında cagırılacak fonksiyonlar
document.querySelectorAll('.box').forEach(cell => cell.addEventListener("click", handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);
 