// Define variáveis para o estado do jogo
let board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
let currentPlayer = 0; // 0 para o jogador A, 1 para o jogador B

// Função para renderizar o tabuleiro
function renderBoard() {
    const mancalaBoard = document.getElementById('mancala-board');
    mancalaBoard.innerHTML = '';

    for (let i = 0; i < board.length; i++) {
        const pit = document.createElement('div');
        pit.className = 'pit';
        pit.textContent = board[i];
        pit.dataset.index = i;
        pit.addEventListener('click', () => move);
        pit.addEventListener('click', () => move(parseInt(pit.dataset.index)));
        
        if (i === 6 || i === 13) {
            pit.classList.add('mancala');
        }

        if (currentPlayer === 0 && i < 6 || currentPlayer === 1 && i > 6 && i < 13) {
            pit.classList.add('player-A');
        } else {
            pit.classList.add('player-B');
        }

        mancalaBoard.appendChild(pit);
    }
}

// Função para mover as pedras
function move(index) {
    if ((currentPlayer === 0 && index >= 6) || (currentPlayer === 1 && index < 6) || board[index] === 0) {
        return; // Não permitir mover pedras de mancalas ou dos poços do oponente ou poços vazios
    }

    let stones = board[index];
    board[index] = 0;
    let i = index;

    while (stones > 0) {
        i = (i + 1) % 14;
        if (currentPlayer === 0 && i === 13 || currentPlayer === 1 && i === 6) {
            continue; // Ignorar a mancala do oponente
        }
        board[i]++;
        stones--;
    }

    // Capturar pedras se a última pedra cair em um poço vazio próprio
    if ((currentPlayer === 0 && i < 6 && board[i] === 1) || (currentPlayer === 1 && i > 6 && board[i] === 1)) {
        const oppositeIndex = 12 - i;
        board[currentPlayer === 0 ? 6 : 13] += board[oppositeIndex] + 1;
        board[i] = 0;
        board[oppositeIndex] = 0;
    }

    // Verificar se o jogo terminou
    if (board.slice(0, 6).every(stones => stones === 0) || board.slice(7, 13).every(stones => stones === 0)) {
        endGame();
        return;
    }

    // Trocar de jogador, exceto se o último movimento foi para a própria mancala
    if (currentPlayer === 0 && i !== 6 || currentPlayer === 1 && i !== 13) {
        currentPlayer = 1 - currentPlayer;
    }

    // Atualizar o tabuleiro
    renderBoard();
}

// Função para finalizar o jogo
function endGame() {
    const mancalaBoard = document.getElementById('mancala-board');
    const result = document.createElement('div');
    const playerAStones = board[6];
    const playerBStones = board[13];
    
    result.textContent = `Player A: ${playerAStones} stones | Player B: ${playerBStones} stones`;
    mancalaBoard.innerHTML = '';
    mancalaBoard.appendChild(result);
}

// Iniciar o jogo
renderBoard();
