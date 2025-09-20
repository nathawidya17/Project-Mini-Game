function initMemoryGame() {
    const memoryGameScreen = document.getElementById('memory-game-screen');
    
    memoryGameScreen.innerHTML = `
        <div id="memory-setup" class="bg-white p-8 rounded-2xl shadow-lg border-2 border-slate-100 text-center">
            <h2 class="text-3xl font-black text-yellow-500 mb-2">Game Memori</h2>
            <p class="text-slate-500 mb-8">Pilih tingkat kesulitan untuk memulai!</p>
            <div class="flex flex-col gap-4">
                <button data-difficulty="easy" class="difficulty-btn w-full bg-green-400 text-white font-bold text-lg p-4 rounded-xl shadow-md hover:bg-green-500 transition-transform hover:scale-105">Mudah (4 Pasang)</button>
                <button data-difficulty="medium" class="difficulty-btn w-full bg-yellow-400 text-white font-bold text-lg p-4 rounded-xl shadow-md hover:bg-yellow-500 transition-transform hover:scale-105">Sedang (8 Pasang)</button>
                <button data-difficulty="hard" class="difficulty-btn w-full bg-red-400 text-white font-bold text-lg p-4 rounded-xl shadow-md hover:bg-red-500 transition-transform hover:scale-105">Sulit (12 Pasang)</button>
            </div>
            <button id="memory-back-to-menu-from-setup" class="mt-8 bg-slate-400 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-500 transition-transform hover:scale-105">Kembali ke Menu</button>
        </div>

        <div id="memory-game-board-container" class="hidden bg-white p-6 rounded-2xl shadow-lg border-2 border-slate-100 text-center">
            <div class="flex justify-around items-center bg-yellow-50 p-3 rounded-xl mb-6 border-2 border-yellow-100">
                <div><span class="font-bold text-yellow-600">Langkah:</span> <span id="memory-moves" class="font-extrabold">0</span></div>
                <div><span class="font-bold text-yellow-600">Waktu:</span> <span id="memory-timer" class="font-extrabold">0s</span></div>
            </div>
            <div id="memory-board" class="grid gap-4 mb-4 perspective-1000"></div>
            <div id="memory-status" class="font-bold text-slate-600 min-h-[1.5rem] mb-4"></div>
            <button id="memory-back-to-game-setup" class="bg-slate-400 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-500 transition-transform hover:scale-105">Pilih Level Lain</button>
        </div>

        <div id="memory-win-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 hidden">
             <div class="bg-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm animate-fade-in">
                <div class="text-7xl mb-4 animate-float">🎉</div>
                <h3 class="text-3xl font-black text-yellow-500 mb-2">Hebat!</h3>
                <p class="text-slate-600 mb-6">Kamu menyelesaikan permainan dalam <strong id="final-moves">0</strong> langkah dan waktu <strong id="final-time">0s</strong>!</p>
                <div class="flex flex-col gap-3">
                    <button id="memory-play-again" class="w-full bg-yellow-400 text-white font-bold py-3 rounded-lg hover:bg-yellow-500 transition-transform hover:scale-105">Main Lagi</button>
                    <button id="memory-modal-back-to-menu" class="w-full bg-slate-200 text-slate-700 font-bold py-3 rounded-lg hover:bg-slate-300 transition-transform hover:scale-105">Menu Utama</button>
                </div>
            </div>
        </div>
    `;

    // Sisa kode JavaScript Game Memori (tidak perlu diubah)...
    const setupScreen = document.getElementById('memory-setup');
    const gameContainer = document.getElementById('memory-game-board-container');
    const board = document.getElementById('memory-board');
    const movesCounter = document.getElementById('memory-moves');
    const timerDisplay = document.getElementById('memory-timer');
    const statusDisplay = document.getElementById('memory-status');
    const winModal = document.getElementById('memory-win-modal');
    const difficultySettings = { easy: { pairs: 4, gridCols: 4, preview: 2000 }, medium: { pairs: 8, gridCols: 4, preview: 3500 }, hard: { pairs: 12, gridCols: 6, preview: 5000 } };
    const MASTER_EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];
    let currentDifficulty = 'medium';
    let cards = [];
    let firstCard, secondCard, lockBoard = false, moves = 0, matchesFound = 0, timer = 0, timerInterval;
    function startLevel(difficulty) { currentDifficulty = difficulty; const settings = difficultySettings[difficulty]; const selectedEmojis = MASTER_EMOJIS.slice(0, settings.pairs); cards = [...selectedEmojis, ...selectedEmojis]; board.className = 'grid gap-4 mb-4 perspective-1000'; board.classList.add(`grid-cols-${settings.gridCols}`); setupScreen.classList.add('hidden'); gameContainer.classList.remove('hidden'); startGame(); }
    function startGame() { moves = 0; matchesFound = 0; movesCounter.textContent = moves; winModal.classList.add('hidden'); resetBoardState(); createBoard(); previewCards(); }
    function createBoard() { shuffle(cards); board.innerHTML = ''; cards.forEach(emoji => { const cardElement = document.createElement('div'); cardElement.classList.add('card', 'aspect-square', 'cursor-pointer'); cardElement.dataset.emoji = emoji; cardElement.innerHTML = `<div class="card-inner w-full h-full relative"><div class="card-face card-front bg-yellow-200 rounded-lg flex items-center justify-center text-4xl font-black text-yellow-500">?</div><div class="card-face card-back bg-yellow-400 rounded-lg flex items-center justify-center text-5xl">${emoji}</div></div>`; cardElement.addEventListener('click', flipCard); board.appendChild(cardElement); }); }
    function previewCards() { lockBoard = true; statusDisplay.textContent = 'Hafalkan kartu-kartu ini!'; const allCards = document.querySelectorAll('#memory-board .card'); allCards.forEach(card => card.classList.add('flip')); const previewTime = difficultySettings[currentDifficulty].preview; setTimeout(() => { allCards.forEach(card => card.classList.remove('flip')); setTimeout(() => { lockBoard = false; startTimer(); statusDisplay.textContent = 'Sekarang, cari pasangannya!'; }, 600); }, previewTime); }
    function flipCard() { if (lockBoard || this === firstCard || this.classList.contains('flip')) return; this.classList.add('flip'); if (!firstCard) { firstCard = this; return; } secondCard = this; moves++; movesCounter.textContent = moves; lockBoard = true; checkForMatch(); }
    function checkForMatch() { firstCard.dataset.emoji === secondCard.dataset.emoji ? disableCards() : unflipCards(); }
    function disableCards() { firstCard.removeEventListener('click', flipCard); secondCard.removeEventListener('click', flipCard); matchesFound++; resetBoardState(); if (matchesFound === difficultySettings[currentDifficulty].pairs) { clearInterval(timerInterval); statusDisplay.textContent = 'Kamu Menang!'; document.getElementById('final-moves').textContent = moves; document.getElementById('final-time').textContent = `${timer}s`; setTimeout(() => winModal.classList.remove('hidden'), 500); } }
    function unflipCards() { setTimeout(() => { firstCard.classList.remove('flip'); secondCard.classList.remove('flip'); resetBoardState(); }, 1000); }
    function resetBoardState() { [firstCard, secondCard, lockBoard] = [null, null, false]; }
    function startTimer() { clearInterval(timerInterval); timer = 0; timerDisplay.textContent = `${timer}s`; timerInterval = setInterval(() => { timer++; timerDisplay.textContent = `${timer}s`; }, 1000); }
    function shuffle(array) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } }
    document.querySelectorAll('#memory-setup .difficulty-btn').forEach(button => { button.addEventListener('click', () => { startLevel(button.dataset.difficulty); }); });
    function goBackToSetup() { clearInterval(timerInterval); gameContainer.classList.add('hidden'); setupScreen.classList.remove('hidden'); }
    document.getElementById('memory-back-to-menu-from-setup').addEventListener('click', window.backToMenu);
    document.getElementById('memory-back-to-game-setup').addEventListener('click', goBackToSetup);
    document.getElementById('memory-modal-back-to-menu').addEventListener('click', window.backToMenu);
    document.getElementById('memory-play-again').addEventListener('click', () => { winModal.classList.add('hidden'); startGame(); });
}