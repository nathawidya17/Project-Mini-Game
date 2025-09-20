document.addEventListener('DOMContentLoaded', () => {
    // Referensi ke semua "layar" utama
    const mainMenu = document.getElementById('main-menu');
    const ticTacToeScreen = document.getElementById('tic-tac-toe-game-screen');
    const memoryGameScreen = document.getElementById('memory-game-screen');
    const allScreens = [mainMenu, ticTacToeScreen, memoryGameScreen];

    // Referensi ke tombol di menu utama
    const playTicTacToeBtn = document.getElementById('play-tic-tac-toe');
    const playMemoryGameBtn = document.getElementById('play-memory-game');

    /**
     * Fungsi untuk menampilkan layar yang dipilih dan menyembunyikan yang lain.
     * @param {HTMLElement} screenToShow - Elemen layar yang ingin ditampilkan.
     */
    function showScreen(screenToShow) {
        allScreens.forEach(screen => screen.classList.add('hidden'));
        screenToShow.classList.remove('hidden');
    }

    // Event listener untuk tombol "Main Tic Tac Toe"
    playTicTacToeBtn.addEventListener('click', () => {
        showScreen(ticTacToeScreen);
        initTicTacToe(); // Memanggil fungsi inisialisasi dari tic-tac-toe.js
    });

    // Event listener untuk tombol "Main Game Memori"
    playMemoryGameBtn.addEventListener('click', () => {
        showScreen(memoryGameScreen);
        initMemoryGame(); // Memanggil fungsi inisialisasi dari memory-game.js
    });
    
    // Membuat fungsi global agar bisa diakses dari file JS lain
    window.backToMenu = () => {
        showScreen(mainMenu);
    };
});