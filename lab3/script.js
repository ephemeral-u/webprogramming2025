const grid = document.getElementById('grid');
const modal = document.getElementById('gameOverModal');
const restartButton = document.getElementById('restartButton');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const playerName = document.getElementById('playerName');
const gameOverMessage = document.getElementById('gameOverMessage');
const scoreElement = document.querySelector('.score');
const undoBtn = document.getElementById('undoBtn');
const leaderboardModal = document.getElementById('leaderboardModal');
const leaderboardBtn = document.getElementById('leaderboardBtn');
const closeLeaderboardBtn = document.getElementById('closeLeaderboardBtn');
const leaderboardBody = document.getElementById('leaderboardBody');
const mobileUp = document.getElementById('mobileUp');
const mobileDown = document.getElementById('mobileDown');
const mobileLeft = document.getElementById('mobileLeft');
const mobileRight = document.getElementById('mobileRight');
let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
let score = 0;
let previousBoard = null;
let previousScore = 0;

function renderBoard() {
    grid.innerHTML = '';
    const gridWidth = grid.offsetWidth;
    const size = (gridWidth - 10 - 15) / 4; // 10 = padding (5+5), 15 = gap (5*3)
    
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-col', j);
            
            cell.style.width = size + 'px';
            cell.style.height = size + 'px';
            cell.style.transform = `translate(${5 + j * (size + 5)}px, ${5 + i * (size + 5)}px)`;
            
            if(board[i][j] !== 0) {
                cell.textContent = board[i][j];
                cell.setAttribute('data-value', board[i][j]);
            }
            
            grid.appendChild(cell);
        }
    }
    scoreElement.textContent = score;
}


function updatePositions() {
    const cells = document.querySelectorAll('.cell');
    const gridWidth = grid.offsetWidth;
    const size = (gridWidth - 10 - 15) / 4;
    
    cells.forEach(cell => {
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-col'));
        cell.style.transform = `translate(${5 + col * (size + 5)}px, ${5 + row * (size + 5)}px)`;
        
        if(board[row][col] !== 0) {
            cell.textContent = board[row][col];
            cell.setAttribute('data-value', board[row][col]);
        } else {
            cell.textContent = '';
            cell.removeAttribute('data-value');
        }
    });
}

loadGameState();

function moveUp() {
    savePreviousState();
    for(let col = 0; col < 4; col++) {
        let column = [];
        for(let row = 0; row < 4; row++) {
            if(board[row][col] !== 0) {
                column.push(board[row][col]);
            }
        }
        
        for(let i = 0; i < column.length - 1; i++) {
            if(column[i] === column[i + 1]) {
                column[i] *= 2;
                score += column[i];
                column.splice(i + 1, 1);
            }
        }
        
        while(column.length < 4) {
            column.push(0);
        }
        
        for(let row = 0; row < 4; row++) {
            board[row][col] = column[row];
        }
    }
    
    updatePositions();
    addNewTile();
    updatePositions();
    saveGameState();
}

function moveDown() {
    savePreviousState();
    for(let col = 0; col < 4; col++) {
        let column = [];
        for(let row = 3; row >= 0; row--) {
            if(board[row][col] !== 0) {
                column.push(board[row][col]);
            }
        }
        
        for(let i = 0; i < column.length - 1; i++) {
            if(column[i] === column[i + 1]) {
                column[i] *= 2;
                score += column[i];
                column.splice(i + 1, 1);
            }
        }
        while(column.length < 4) {
            column.push(0);
        }
        
        for(let row = 3; row >= 0; row--) {
            board[row][col] = column[3 - row];
        }
    }
    
    updatePositions();
    addNewTile();
    updatePositions();
    saveGameState();
}

function moveRight() {
    savePreviousState();
    for(let row = 0; row < 4; row++) {
        let line = [];
        for(let col = 3; col >= 0; col--) {
            if(board[row][col] !== 0) {
                line.push(board[row][col]);
            }
        }
        
        for(let i = 0; i < line.length - 1; i++) {
            if(line[i] === line[i + 1]) {
                line[i] *= 2;
                score += line[i];
                line.splice(i + 1, 1);
            }
        }
        while(line.length < 4) {
            line.push(0);
        }
        
        for(let col = 3; col >= 0; col--) {
            board[row][col] = line[3 - col];
        }
    }
    
    updatePositions();
    addNewTile();
    updatePositions();
    saveGameState();
}

function moveLeft() {
    savePreviousState();
    for(let row = 0; row < 4; row++) {
        let line = [];
        for(let col = 0; col < 4; col++) {
            if(board[row][col] !== 0) {
                line.push(board[row][col]);
            }
        }
        
        for(let i = 0; i < line.length - 1; i++) {
            if(line[i] === line[i + 1]) {
                line[i] *= 2;
                score += line[i];
                line.splice(i + 1, 1);
            }
        }
        while(line.length < 4) {
            line.push(0);
        }
        
        for(let col = 0; col < 4; col++) {
            board[row][col] = line[col];
        }
    }
    
    updatePositions();
    addNewTile();
    updatePositions();
    saveGameState();
}

function addNewTile() {
    let empty = [];
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if(board[i][j] === 0) {
                empty.push({i, j});
            }
        }
    }
    if(empty.length > 0) {
        let pos = empty[Math.floor(Math.random() * empty.length)];
        board[pos.i][pos.j] = Math.random() < 0.5 ? 2 : 4;
    }
}

function isGameOver() {
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if(board[i][j] === 0) {
                return false;
            }
        }
    }
    
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if(j < 3 && board[i][j] === board[i][j + 1]) {
                return false;
            }
            if(i < 3 && board[i][j] === board[i + 1][j]) {
                return false;
            }
        }
    }
    
    return true;
}

function restartGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    score = 0;
    previousBoard = null;
    previousScore = 0;
    
    const tilesCount = Math.floor(Math.random() * 3) + 1;
    for(let n = 0; n < tilesCount; n++) {
        let placed = false;
        while(!placed) {
            const i = Math.floor(Math.random() * 4);
            const j = Math.floor(Math.random() * 4);
            if(board[i][j] === 0) {
                board[i][j] = Math.random() < 0.5 ? 2 : 4;
                placed = true;
            }
        }
    }
    renderBoard();
    saveGameState();
    modal.style.display = 'none';
}

function savePreviousState() {
    previousBoard = JSON.parse(JSON.stringify(board));
    previousScore = score;
}

function undo() {
    if(previousBoard && !isGameOver()) {
        board = JSON.parse(JSON.stringify(previousBoard));
        score = previousScore;
        renderBoard();
        saveGameState();
    }
}

renderBoard();

document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowUp') {
        e.preventDefault();
        moveUp();
    }
    if(e.key === 'ArrowDown') {
        e.preventDefault();
        moveDown();
    }
    if(e.key === 'ArrowRight') {
        e.preventDefault();
        moveRight();
    }
    if(e.key === 'ArrowLeft') {
        e.preventDefault();
        moveLeft();
    }
    if(isGameOver()) {
        modal.style.display = 'flex';
    }
});
function addToLeaderboard(name, score) {
    const leaderboard = loadLeaderboard();
    const date = new Date().toLocaleDateString();
    leaderboard.push({ name, score, date });
    leaderboard.sort((a, b) => b.score - a.score);
    saveLeaderboard(leaderboard);
}

function displayLeaderboard() {
    const leaderboard = loadLeaderboard();
    leaderboardBody.innerHTML = '';
    
    leaderboard.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.score}</td>
            <td>${entry.date}</td>
        `;
        leaderboardBody.appendChild(row);
    });
}
function saveLeaderboard(leaderboard) {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}
function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    return leaderboard;
}

function saveGameState() {
    const gameState = {
        board: board,
        score: score,
        previousBoard: previousBoard,
        previousScore: previousScore
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

restartButton.addEventListener('click', restartGame);
undoBtn.addEventListener('click', undo);

saveScoreBtn.addEventListener('click', () => {
    if(playerName.value.trim() !== '') {
        addToLeaderboard(playerName.value.trim(), score);
        gameOverMessage.textContent = 'Ваш рекорд сохранен';
        playerName.style.display = 'none';
        saveScoreBtn.style.display = 'none';
    }
});
function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    if(savedState) {
        const gameState = JSON.parse(savedState);
        board = gameState.board;
        score = gameState.score;
        previousBoard = gameState.previousBoard;
        previousScore = gameState.previousScore;
        renderBoard();
    } else {
        const tilesCount = Math.floor(Math.random() * 3) + 1;
        for(let n = 0; n < tilesCount; n++) {
            let placed = false;
            while(!placed) {
                const i = Math.floor(Math.random() * 4);
                const j = Math.floor(Math.random() * 4);
                if(board[i][j] === 0) {
                    board[i][j] = Math.random() < 0.5 ? 2 : 4;
                    placed = true;
                }
            }
        }
        renderBoard();
    }
}


leaderboardBtn.addEventListener('click', () => {
    displayLeaderboard();
    leaderboardModal.style.display = 'flex';
});

closeLeaderboardBtn.addEventListener('click', () => {
    leaderboardModal.style.display = 'none';
});

mobileUp.addEventListener('click', () => {
    moveUp();
});

mobileDown.addEventListener('click', () => {
    moveDown();
});

mobileLeft.addEventListener('click', () => {
    moveLeft();
});

mobileRight.addEventListener('click', () => {
    moveRight();
});
window.addEventListener('load', () => {
    renderBoard();
});

window.addEventListener('resize', () => {
    renderBoard();
});