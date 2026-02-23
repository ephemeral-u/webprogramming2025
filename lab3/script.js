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

function moveUp() {
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
    
    renderBoard();
}

function moveDown() {
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
    
    renderBoard();
}

function moveRight() {
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
    
    renderBoard();
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
});