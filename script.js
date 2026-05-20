/* ================== INTRO SCREEN ================== */

const startBtn = document.querySelector('#start-btn');
const introScreen = document.querySelector('#intro-screen');
const gameBoard = document.querySelector('#game-board');

// Click START button and the screen will be changed to GameBoard.
startBtn.addEventListener('click', startGame);
function startGame() {
    introScreen.style.display = 'none';
    gameBoard.style.display = 'block';
}


/* ===================== PLAYER ===================== */

const player = document.querySelector('#player');
let playerEle = 50;

// Connect with Keydown for user.
document.addEventListener('keydown', movePlayer);
function movePlayer(event) {
    if (event.key === 'ArrowLeft') {
        playerEle -= 2;
    }

    if (event.key === 'ArrowRight') {
        playerEle += 2;
    }

    player.style.left = playerEle + 'vw';
}


// Create enemmy elements.
function createEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');

    enemy.style.left = Math.random() * 90 + 'vw';
    enemy.style.top = '0vh';

    gameBoard.appendChild(enemy);

    // Movement of enemy elements.
    let enemyEle = 0;

    const enemyMove = setInterval(() => {
        enemyEle += 1;
        enemy.style.top = enemyEle + 'vh';

        if (checkCollision(enemy)) {
            clearInterval(enemyMove);
        }

        if (enemyEle > 100) {
            enemy.remove();
            clearInterval(enemyMove);
        }
    }, 50);
}

// Create enemies infinitely.
setInterval(createEnemy, 500);

// Collision with enemies.
function checkCollision(enemy) {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    // Condition for collision.
    if (
        playerRect.left < enemyRect.right &&
        playerRect.right > enemyRect.left &&
        playerRect.top < enemyRect.bottom &&
        playerRect.bottom > enemyRect.top
    ) {
        console.log('Hit!');
        enemy.remove();
        return true;
    }
    return false;
}


