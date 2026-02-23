const grid = document.getElementById('grid');
let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

function renderBoard() {
    grid.innerHTML = '';
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if(board[i][j] !== 0) {
                cell.textContent = board[i][j];
            }
            grid.appendChild(cell);
        }
    }
}

const tilesCount = Math.floor(Math.random() * 3) + 1; // 1, 2 или 3

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