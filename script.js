/* ================== INTRO SCREEN ================== */

const startBtn = document.querySelector('#start-btn');
const introScreen = document.querySelector('#intro-screen');
const gameBoard = document.querySelector('#game-board');

// Stop the game when it gameovers.
let gameRunning = false;

// Shooting styling.
let canShoot = true;

// Enemy array
let enemies = [];

// Keymovement styling.
let leftPressed = false;
let rightPressed = false;

// Click START button and the screen will be changed to GameBoard.
startBtn.addEventListener('click', startGame);
function startGame() {
    introScreen.style.display = 'none';
    gameBoard.style.display = 'block';
    gameRunning = true;
}


/* ===================== PLAYER ===================== */

// Scoring
const lifeElement = document.querySelector('#life');
let life = 3;
const scoreElement = document.querySelector('#score');
let score = 0;

const player = document.querySelector('#player');
let playerEle = 50;

// Connect with Keydown for user.
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        leftPressed = true;
    }

    if (event.key === 'ArrowRight') {
        rightPressed = true;
    }
}

function handleKeyUp(event) {
    if (event.key === 'ArrowLeft') {
        leftPressed = false;
    }

    if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
}

// Creating game loop movement.
setInterval(updatePlayerMovement, 20);

function updatePlayerMovement(params) {
    if (leftPressed) {
        playerEle -= 1;
    }

    if (rightPressed) {
        playerEle += 1;
    }

    if (playerEle < 5) {
        playerEle = 5;
    }

    if (playerEle >95) {
        playerEle = 95;
    }

    player.style.left = playerEle + 'vw';
}


/*

document.addEventListener('keydown', movePlayer);
function movePlayer(event) {
    if (event.key === 'ArrowLeft') {
        playerEle -= 2;
    }

    if (event.key === 'ArrowRight') {
        playerEle += 2;
    }

    // Boundary
    if (playerEle < 5) {
        playerEle = 5;
    }

    if (playerEle > 95) {
        playerEle = 95;
    }

    player.style.left = playerEle + 'vw';
}

*/

// Shooting bullet

document.addEventListener('keydown', shootBullet);
function shootBullet(event) {
    // Condition for Space
    if (event.code !== 'Space') {
        return;
    }

    if (!canShoot) {
        return;
    }

    canShoot = false;

    const bullet = document.createElement('div');
    bullet.classList.add('bullet');

    // Positioning bullet
    bullet.style.left = playerEle + 'vw';
    bullet.style.bottom = '10vh';

    // Add bullet to Gameboard
    gameBoard.appendChild(bullet);

    // Bullet movement
    let bulletEle = 10;
    const bulletMove = setInterval(() => {
        bulletEle += 2;
        bullet.style.bottom = bulletEle + 'vh';

        // Boundary of screen for bullet
        if (bulletEle > 100) {
            bullet.remove();
            clearInterval(bulletMove);
        }

        enemies.forEach((enemy) => {
            const bulletRect = bullet.getBoundingClientRect();
            const enemyRect = enemy.getBoundingClientRect();

            // Condition of collisions.
            if (
                bulletRect.left < enemyRect.right &&
                bulletRect.right > enemyRect.left &&
                bulletRect.top < enemyRect.bottom &&
                bulletRect.bottom > enemyRect.top
            ) {
                enemy.remove();
                bullet.remove();
                score++;
                scoreElement.textContent = score;

                // Increasing enemy speed getting scores.
                enemySpeed = 1 + score * 0.1;

                clearInterval(bulletMove);
            }
        });
    }, 20);

    // Shooting bullet more cooldowned.
    setTimeout(() => {
        canShoot = true;
    }, 300);
}



/* ===================== ENEMY ===================== */

// Enemy speed. 
let enemySpeed = 1;

// Create enemy elements.
function createEnemy() {
    if (!gameRunning) {
        // console.log('Enemy spawn stopped');
        return;
    }

    const enemy = document.createElement('div');
    enemy.classList.add('enemy');

    enemy.style.left = Math.random() * 90 + 'vw';
    enemy.style.top = '0vh';

    gameBoard.appendChild(enemy);

    // Movement of enemy elements.
    let enemyEle = 0;

    const enemyMove = setInterval(() => {
        if (!gameRunning) {
            enemy.remove();
            clearInterval(enemyMove);
            return;
        }

        enemyEle += enemySpeed;
        enemy.style.top = enemyEle + 'vh';

        if (checkCollision(enemy)) {
            clearInterval(enemyMove);
        }

        if (enemyEle > 100) {
            enemy.remove();
            clearInterval(enemyMove);
        }
    }, 50);

    // When the enemies are created, to array.
    gameBoard.appendChild(enemy);
    enemies.push(enemy);

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
        // Score counting after the collision.
        console.log('Hit!');
        life--;
        lifeElement.textContent = life;
        // Condition for gameover.
        if (life <= 0) {
            gameOver();
        }
        enemy.remove();
        return true;
    }
    return false;
}


// Gameover
const gameOverScreen = document.querySelector('#game-over-screen');
function gameOver() {
    // console.log('Game stopped');
    gameRunning = false;
    gameBoard.style.display = 'none';
    gameOverScreen.style.display = 'block';
}

// Connect to Restart button.
const restartBtn = document.querySelector('#restart-btn');
restartBtn.addEventListener('click', restartGame);
function restartGame() {
    location.reload();
}
