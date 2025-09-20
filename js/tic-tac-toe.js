function initTicTacToe() {
    const ticTacToeScreen = document.getElementById('tic-tac-toe-game-screen');
    
    ticTacToeScreen.innerHTML = `
        <div id="ttt-mode-selection" class="bg-white p-8 rounded-2xl shadow-lg border-2 border-slate-100 text-center animate-fade-in">
            <h1 class="text-3xl font-black text-teal-600 mb-2">Tic Tac Toe</h1>
            <p class="text-slate-500 mb-6">Atur permainanmu</p>
            <div class="space-y-4">
                <div>
                    <label for="ttt-board-size" class="block text-sm font-bold text-slate-700 mb-2">Ukuran Papan</label>
                    <input type="number" id="ttt-board-size" value="3" min="3" max="10" class="w-20 p-2 text-center border-2 border-slate-200 rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">Mode Permainan</label>
                    <div class="flex justify-center gap-2" id="ttt-mode-buttons">
                        <button data-mode="friend" class="flex-1 bg-slate-200 text-slate-700 font-bold p-3 rounded-lg hover:bg-slate-300 transition-colors">VS Teman</button>
                        <button data-mode="robot" class="flex-1 bg-slate-200 text-slate-700 font-bold p-3 rounded-lg hover:bg-slate-300 transition-colors">VS Robot</button>
                    </div>
                </div>
                <div id="ttt-difficulty-group" class="hidden">
                     <label class="block text-sm font-bold text-slate-700 mb-2">Tingkat Kesulitan</label>
                    <div class="flex justify-center gap-2" id="ttt-difficulty-buttons">
                        <button data-difficulty="easy" class="flex-1 bg-slate-200 text-slate-700 font-bold p-2 rounded-lg hover:bg-slate-300 transition-colors">Mudah</button>
                        <button data-difficulty="hard" class="flex-1 bg-slate-200 text-slate-700 font-bold p-2 rounded-lg hover:bg-slate-300 transition-colors">Sedang</button>
                        <button data-difficulty="difficult" class="flex-1 bg-slate-200 text-slate-700 font-bold p-2 rounded-lg hover:bg-slate-300 transition-colors">Sulit</button>
                    </div>
                </div>
                 <button id="ttt-back-to-menu-from-setup" class="w-full mt-4 bg-slate-400 text-white font-bold p-3 rounded-lg hover:bg-slate-500">Kembali</button>
            </div>
        </div>
        
        <div id="ttt-game-container" class="hidden bg-white p-6 rounded-2xl shadow-lg border-2 border-slate-100 text-center">
             <div class="flex justify-between items-center mb-4 px-3">
                <div class="text-center w-20"><div id="ttt-player-x-label" class="text-xs font-bold text-slate-500 uppercase">Player X</div><div id="ttt-score-x" class="text-2xl font-bold text-red-500">0</div></div>
                <div id="ttt-difficulty-display" class="text-xs font-bold text-slate-500 uppercase self-center"></div>
                <div class="text-center w-20"><div id="ttt-player-o-label" class="text-xs font-bold text-slate-500 uppercase">Player O</div><div id="ttt-score-o" class="text-2xl font-bold text-blue-500">0</div></div>
             </div>
             <div id="ttt-board-container" class="my-4 relative inline-block">
                <div id="ttt-board" class="p-2 bg-slate-100 rounded-lg border-2 border-slate-200 gap-1.5"></div>
                <div id="ttt-line-container" class="absolute top-0 left-0 w-full h-full pointer-events-none"></div>
             </div>
             <div id="ttt-status-display" class="font-bold my-4 min-h-[1.5rem]"></div>
             <div class="flex gap-3 justify-center mt-4">
                 <button id="ttt-back-button" class="px-5 py-2 text-sm font-bold bg-slate-400 text-white rounded-lg hover:bg-slate-500">Kembali</button>
             </div>
        </div>
        
        <div id="ttt-win-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 hidden">
             <div class="bg-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm animate-fade-in">
                <div id="ttt-winner-animation" class="text-7xl mb-4 animate-float"></div>
                <h3 id="ttt-modal-title" class="text-3xl font-black text-teal-600 mb-2"></h3>
                <p id="ttt-modal-score" class="text-slate-600 mb-6"></p>
                <div class="flex flex-col gap-3">
                    <button id="ttt-play-again" class="w-full bg-teal-400 text-white font-bold py-3 rounded-lg hover:bg-teal-500">Main Lagi</button>
                    <button id="ttt-modal-back-to-menu" class="w-full bg-slate-200 text-slate-700 font-bold py-3 rounded-lg hover:bg-slate-300">Menu Utama</button>
                </div>
            </div>
        </div>
    `;

    // Sisa kode JavaScript Tic Tac Toe (tidak perlu diubah)...
    const modeSelection = document.getElementById('ttt-mode-selection');
    const gameContainer = document.getElementById('ttt-game-container');
    const boardSizeInput = document.getElementById('ttt-board-size');
    const gameBoard = document.getElementById('ttt-board');
    const lineContainer = document.getElementById('ttt-line-container');
    const statusDisplay = document.getElementById('ttt-status-display');
    const scoreXDisplay = document.getElementById('ttt-score-x');
    const scoreODisplay = document.getElementById('ttt-score-o');
    const playerXLabel = document.getElementById('ttt-player-x-label');
    const playerOLabel = document.getElementById('ttt-player-o-label');
    const difficultyDisplay = document.getElementById('ttt-difficulty-display');
    const winModal = document.getElementById('ttt-win-modal');
    let gameActive, currentPlayer, gameState, gameMode, boardSize, winningConditions, scoredLines, scores, difficultyLevel;
    document.getElementById('ttt-mode-buttons').addEventListener('click', (e) => { if (e.target.tagName !== 'BUTTON') return; gameMode = e.target.dataset.mode; document.querySelectorAll('#ttt-mode-buttons button').forEach(b => b.classList.remove('bg-teal-400', 'text-white')); e.target.classList.add('bg-teal-400', 'text-white'); if (gameMode === 'robot') { document.getElementById('ttt-difficulty-group').classList.remove('hidden'); } else { document.getElementById('ttt-difficulty-group').classList.add('hidden'); startGame(); } });
    document.getElementById('ttt-difficulty-buttons').addEventListener('click', (e) => { if (e.target.tagName !== 'BUTTON') return; difficultyLevel = e.target.dataset.difficulty; document.querySelectorAll('#ttt-difficulty-buttons button').forEach(b => b.classList.remove('bg-teal-400', 'text-white')); e.target.classList.add('bg-teal-400', 'text-white'); startGame(); });
    function startGame() { modeSelection.classList.add('hidden'); gameContainer.classList.remove('hidden'); boardSize = parseInt(boardSizeInput.value); if (gameMode === 'robot') { playerXLabel.textContent = 'You'; playerOLabel.textContent = 'Robot'; difficultyDisplay.textContent = `Level: ${difficultyLevel}`; difficultyDisplay.classList.remove('hidden'); } else { playerXLabel.textContent = 'Player X'; playerOLabel.textContent = 'Player O'; difficultyDisplay.classList.add('hidden'); } createBoard(); restartGame(); }
    function createBoard(){gameBoard.innerHTML="";let cellSize=80,fontSize="2rem";if(boardSize<=3){cellSize=80;fontSize="2rem"}else if(boardSize<=5){cellSize=60;fontSize="1.5rem"}else if(boardSize<=7){cellSize=50;fontSize="1.2rem"}else{cellSize=40;fontSize="1rem"}const maxBoardSize=Math.min(.8*window.innerWidth,.6*window.innerHeight),maxCellSize=Math.floor((maxBoardSize-6*boardSize-24)/boardSize);if(maxCellSize<cellSize){cellSize=Math.max(maxCellSize,30);fontSize=cellSize<40?".8rem":cellSize<50?"1rem":"1.2rem"}document.documentElement.style.setProperty("--grid-size",boardSize);document.documentElement.style.setProperty("--cell-size",`${cellSize}px`);document.documentElement.style.setProperty("--font-size",fontSize);for(let i=0;i<boardSize*boardSize;i++){const cell=document.createElement("div");cell.classList.add("ttt-cell","bg-white","border-2","border-slate-200","rounded-md","flex","items-center","justify-center","font-black","cursor-pointer","hover:bg-slate-100","transition-colors");cell.setAttribute("data-cell-index",i);cell.addEventListener("click",handleCellClick);gameBoard.appendChild(cell)}}
    function restartGame(){winModal.classList.add('hidden');gameActive=!0;currentPlayer="X";winningConditions=generateWinningConditions();scoredLines=[];gameState=Array(boardSize*boardSize).fill("");scores={X:0,O:0};statusDisplay.innerHTML=`Giliran ${currentPlayer}`;lineContainer.innerHTML="";document.querySelectorAll(".ttt-cell").forEach(cell=>{cell.innerHTML="";cell.className="ttt-cell bg-white border-2 border-slate-200 rounded-md flex items-center justify-center font-black cursor-pointer hover:bg-slate-100 transition-colors"});updateScoreDisplay()}
    function handleCellClick(event){const clickedCell=event.target,clickedCellIndex=parseInt(clickedCell.getAttribute("data-cell-index"));if(""!==gameState[clickedCellIndex]||!gameActive)return;gameState[clickedCellIndex]=currentPlayer;clickedCell.innerHTML=currentPlayer;clickedCell.classList.remove("hover:bg-slate-100");clickedCell.classList.add("X"===currentPlayer?"text-red-500":"text-blue-500");checkResult();if("robot"===gameMode&&gameActive){robotMove()}}
    function checkResult(){let pointsThisTurn=0;winningConditions.forEach(winInfo=>{const condition=winInfo.combo,allOwned=condition.every(cellIndex=>gameState[cellIndex]===currentPlayer);if(!allOwned)return;let isExtension=!1;for(const scoredLine of scoredLines){if(scoredLine.orientation===winInfo.orientation&&condition.some(cellIndex=>scoredLine.cells.has(cellIndex))){isExtension=!0;break}}if(!isExtension){pointsThisTurn++;scoredLines.push({cells:new Set(condition),orientation:winInfo.orientation});drawStrikeLine(condition,currentPlayer)}});if(pointsThisTurn>0){scores[currentPlayer]+=pointsThisTurn;updateScoreDisplay()}if(!gameState.includes("")){gameActive=!1;statusDisplay.innerHTML="Permainan Selesai!";showWinModal();return}handlePlayerChange()}
    function handlePlayerChange(){currentPlayer=currentPlayer==="X"?"O":"X";statusDisplay.innerHTML=`Giliran ${currentPlayer}`}
    function updateScoreDisplay(){scoreXDisplay.textContent=scores.X;scoreODisplay.textContent=scores.O}
    function showWinModal(){const playerXName=gameMode==="robot"?"You":"Player X";const playerOName=gameMode==="robot"?"Robot":"Player O";let title,icon;if(scores.X>scores.O){title=`${playerXName} Menang!`;icon="🏆"}else if(scores.O>scores.X){title=`${playerOName} Menang!`;icon="🏆"}else{title="Permainan Seri!";icon="🤝"}document.getElementById('ttt-modal-title').textContent=title;document.getElementById('ttt-winner-animation').textContent=icon;document.getElementById('ttt-modal-score').textContent=`Skor Akhir: ${scores.X} - ${scores.O}`;winModal.classList.remove('hidden');}
    function drawStrikeLine(condition,player){const firstCell=document.querySelector(`.ttt-cell[data-cell-index='${condition[0]}']`),lastCell=document.querySelector(`.ttt-cell[data-cell-index='${condition[2]}']`);if(!firstCell||!lastCell)return;const startX=firstCell.offsetLeft+firstCell.offsetWidth/2,startY=firstCell.offsetTop+firstCell.offsetHeight/2,endX=lastCell.offsetLeft+lastCell.offsetWidth/2,endY=lastCell.offsetTop+lastCell.offsetHeight/2,length=Math.sqrt(Math.pow(endX-startX,2)+Math.pow(endY-startY,2)),angle=180*Math.atan2(endY-startY,endX-startX)/Math.PI,line=document.createElement("div");line.classList.add("strike-line","absolute","h-1.5","rounded-full");line.style.setProperty("--line-length",`${length}px`);line.style.left=`${startX}px`,line.style.top=`${startY}px`,line.style.transform=`rotate(${angle}deg)`;line.style.backgroundColor="X"===player?"#ef4444":"#3b82f6";lineContainer.appendChild(line)}
    function generateWinningConditions(){const conditions=[],size=boardSize;for(let r=0;r<size;r++)for(let c=0;c<size;c++)c<=size-3&&conditions.push({combo:[r*size+c,r*size+c+1,r*size+c+2],orientation:"horizontal"}),r<=size-3&&conditions.push({combo:[r*size+c,(r+1)*size+c,(r+2)*size+c],orientation:"vertical"}),r<=size-3&&c<=size-3&&conditions.push({combo:[r*size+c,(r+1)*size+c+1,(r+2)*size+c+2],orientation:"diagonal-down"}),r<=size-3&&c>=2&&conditions.push({combo:[r*size+c,(r+1)*size+c-1,(r+2)*size+c-2],orientation:"diagonal-up"});return conditions}
    function robotMove(){if("O"!==currentPlayer||!gameActive)return;statusDisplay.innerHTML="Robot berpikir...";const bestMoveIndex=findBestMove();if(bestMoveIndex!==-1){setTimeout(()=>{if(gameActive){const cellToPlay=document.querySelector(`.ttt-cell[data-cell-index='${bestMoveIndex}']`);handleCellClick({target:cellToPlay})}},400)}}
    function findBestMove(){switch(difficultyLevel){case"easy":return findEasyMove();case"hard":return findHardMove();case"difficult":return findDifficultMove();default:return findHardMove()}}
    function findEasyMove(){return Math.random()<.8?findRandomMove():findHardMove()}
    function findHardMove(){const winningMove=findStrategicMove("O");if(winningMove!==-1)return winningMove;const blockingMove=findStrategicMove("X");if(blockingMove!==-1)return blockingMove;if(boardSize%2!==0){const center=Math.floor(boardSize*boardSize/2);if(gameState[center]==="")return center}const corners=[0,boardSize-1,boardSize*(boardSize-1),boardSize*boardSize-1].filter(i=>i<boardSize*boardSize);const emptyCorners=corners.filter(i=>gameState[i]==="");if(emptyCorners.length>0)return emptyCorners[Math.floor(Math.random()*emptyCorners.length)];return findRandomMove()}
    function findDifficultMove(){let bestScore=-Infinity;let bestMove=-1;const emptySpots=gameState.map((val,idx)=>val===""?idx:null).filter(val=>val!==null);if(emptySpots.length===0)return-1;if(emptySpots.length>=boardSize*boardSize-1){return findHardMove()}for(const index of emptySpots){gameState[index]='O';const depth=boardSize>4?3:(boardSize>3?4:6);let moveScore=minimax(gameState,depth,!1);gameState[index]='';if(moveScore>bestScore){bestScore=moveScore;bestMove=index}}return bestMove}
    function minimax(board,depth,isMaximizing){const score=evaluateBoard(board);if(Math.abs(score)>=1e3||depth===0||!board.includes(""))return score;const emptySpots=board.map((val,idx)=>val===""?idx:null).filter(val=>val!==null);if(isMaximizing){let best=-Infinity;for(const index of emptySpots){board[index]='O';best=Math.max(best,minimax(board,depth-1,!1));board[index]=''}return best}else{let best=Infinity;for(const index of emptySpots){board[index]='X';best=Math.min(best,minimax(board,depth-1,!0));board[index]=''}return best}}
    function evaluateBoard(board){let score=0;winningConditions.forEach(winInfo=>{const line=winInfo.combo.map(index=>board[index]);const oCount=line.filter(s=>s==='O').length;const xCount=line.filter(s=>s==='X').length;if(oCount===3)score+=1e3;else if(oCount===2&&xCount===0)score+=10;else if(oCount===1&&xCount===0)score+=1;if(xCount===3)score-=1e3;else if(xCount===2&&oCount===0)score-=10;else if(xCount===1&&oCount===0)score-=1});return score}
    function findStrategicMove(playerSymbol){for(const winInfo of winningConditions){const condition=winInfo.combo;const symbols=condition.map(i=>gameState[i]);if(symbols.filter(s=>s===playerSymbol).length===2&&symbols.includes("")){const move=condition.find(i=>gameState[i]==="");let isExtension=scoredLines.some(line=>line.orientation===winInfo.orientation&&line.cells.has(move));if(!isExtension)return move}}return-1}
    function findRandomMove(){const empty=gameState.map((v,i)=>v===""?i:null).filter(v=>v!==null);return empty.length>0?empty[Math.floor(Math.random()*empty.length)]:-1}
    document.getElementById('ttt-back-to-menu-from-setup').addEventListener('click', window.backToMenu);
    document.getElementById('ttt-back-button').addEventListener('click', window.backToMenu);
    document.getElementById('ttt-modal-back-to-menu').addEventListener('click', window.backToMenu);
    document.getElementById('ttt-play-again').addEventListener('click', restartGame);
}