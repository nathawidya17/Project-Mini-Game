document.addEventListener('DOMContentLoaded', () => {
    const mainMenu = document.getElementById('main-menu');
    const ticTacToeScreen = document.getElementById('tic-tac-toe-game-screen');
    const memoryGameScreen = document.getElementById('memory-game-screen');
    const allScreens = [mainMenu, ticTacToeScreen, memoryGameScreen];

    const playTicTacToeBtn = document.getElementById('play-tic-tac-toe');
    const playMemoryGameBtn = document.getElementById('play-memory-game');

    function showScreen(screenToShow) {
        allScreens.forEach(screen => screen.classList.add('hidden'));
        screenToShow.classList.remove('hidden');
    }

    playTicTacToeBtn.addEventListener('click', () => {
        showScreen(ticTacToeScreen);
        initTicTacToe(); 
    });

    playMemoryGameBtn.addEventListener('click', () => {
        showScreen(memoryGameScreen);
        initMemoryGame(); 
    });
    
    window.backToMenu = () => {
        showScreen(mainMenu);
    };
});