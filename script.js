/* ================== OPENING SCREEN ================== */
const openingImage = document.querySelector('#opening-image');
const openingText = document.querySelector('#opening-text');

// Order the cuts #1 #2 #3 #4 #5 #6.
const openingCuts = [
    {
        image: './assets/images/cut1-earth.png',
        text: `
            <p id="first-verb">year 2026,</p>
            <p>Earth is no longer habitable.</p>
            <p>The last survivors of humanity wander through deep space, searching for a new home.</p>
        `
    },
    {
        image: './assets/images/cut2-yosea.png',
        text: `
            <p>Humanity discovered</p>
            <p>One final posibility.</p>

            <p class="highlight-word" id="highlight-yosea">yosea.</p>
            <p>within the NGC 1052-DF2 galaxy.</p>
            <p>The last hope for mankind.</p>
        `
    },
    {
        image: './assets/images/cut3-honran.png',
        text: `
            <p>But humanity was not alone.</p>
            <p>Ancient entities already ruled the path to YOSEA.</p>
            <p class="highlight-word" id="highlight-honran">honran.</p>
            <p>Biomechanical organisms that evolved beyond human understanding.</p>
        `
    },
    {
        image: './assets/images/cut4-suhohack.png',
        text: `
            <p>Humanity answered with</p>
            <p>its final creation.</p>

            <p class="highlight-word" id="highlight-suho">suho hack.</p>
            <p>An immortal biomechanical weapon</p>
            <p>built to resist Honran</p>
            <p>and guide mankind to YOSEA.</p>
        `
    },
    {
        image: './assets/images/cut6-goal.png',
        text: `
            <p>Can humanity survive...</p>

            <p>before HONRAN evolves again?</p>

            <p class="highlight-word">Destination: YOSEA</p>
        `
    },
    {
        image: './assets/images/cut5-war.png',
        text: `
            <p>The war has begun.</p>

            <p>But HONRAN continues</p>
            <p>to evolve faster than expected.</p>

            <p>Humanity's fate now rests</p>
            <p>on SUHO HACK.</p>
        `
    }
];

let currentCut = 0;

// Opening sound
let openingSoundStarted = false;

// Show cuts.
function showOpeningCut() {
    openingImage.src = openingCuts[currentCut].image;
    openingText.innerHTML = openingCuts[currentCut].text;
    // // Play Opening sound
    // openingSound.play();
}

// When the page starts, show the first cut.
showOpeningCut();

// Increasing zoom speed.
openingImage.style.animationDuration = '6s';

// Cut #6 white-fade
const whiteFade = document.querySelector('#white-fade');
// function nextOpeningCut() {
//     currentCut++;
//     if (currentCut >= openingCuts.length) {
//         whiteFade.classList.add('fade-active');

//         setTimeout(() => {
//             showIntroScreen();
//         }, 2000);

//         return;
//     }

//     showOpeningCut();
// }



/* ================== INTRO SCREEN ================== */

const startBtn = document.querySelector('#start-btn');
const introScreen = document.querySelector('#intro-screen');
const gameBoard = document.querySelector('#game-board');
const openingScreen = document.querySelector('#opening-screen');
const skipOpeningBtn = document.querySelector('#skip-opening-btn');

// Opening cut skip
skipOpeningBtn.addEventListener('click', nextOpeningCut);

function nextOpeningCut() {
    // Opening sound play
    if (!openingSoundStarted) {
        openingSound.play();
        openingSoundStarted = true;
    }
    currentCut++;

    if (currentCut >= openingCuts.length) {
        showIntroScreen();
        return;
    }
    showOpeningCut();
}

function showIntroScreen() {
    // Pause Openign Sound
    openingSound.pause();
    openingSound.currentTime = 0;

    openingScreen.style.display = 'none';
    introScreen.style.display = 'flex';

    // Play Intro sound
    introSound.play();
}

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
    // Pause intro sound
    introSound.pause();
    introSound.currentTime = 0;

    introScreen.style.display = 'none';
    gameBoard.style.display = 'block';
    gameRunning = true;
    // // Play background music
    // bgm.play();
}


/* ===================== GAMEBOARD ===================== */
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');

    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';

    gameBoard.appendChild(star);
}

for (let i = 0; i < 50; i++) {
    createStar();
}


/* ===================== PLAYER ===================== */

// Life Hud
const lifeFill = document.querySelector('#life-fill');
const maxLife = 15;
let life = maxLife;

// WIN SCREEN
const winScreen = document.querySelector('#win-screen');
const playAgainBtn = document.querySelector('#play-again-btn');
const winScore = 10; // adjusting and testing winning score.

// Scoring
const lifeElement = document.querySelector('#life');
// let life = 15;
const scoreElement = document.querySelector('#score');
let score = 0;

const player = document.querySelector('#player');
let playerEle = 50;

// Final score
const gameOverScore = document.querySelector('#game-over-score');
const winScoreElement = document.querySelector('#win-score');

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

    if (playerEle > 95) {
        playerEle = 95;
    }

    player.style.left = playerEle + 'vw';
}

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

    // Laser sound effect
    laserSound.currentTime = 0;
    laserSound.play();

    canShoot = false;

    const bullet = document.createElement('div');
    bullet.classList.add('bullet');

    // Positioning bullet
    bullet.style.left = playerEle + 'vw';
    bullet.style.bottom = '12vh';

    // Add bullet to Gameboard
    gameBoard.appendChild(bullet);

    // Bullet movement
    let bulletEle = 10;
    const bulletMove = setInterval(() => {
        bulletEle += 3;
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
                // Hitting effect for enemies
                createHitEffect(
                    enemyRect.left + enemyRect.width / 2 - 5,
                    enemyRect.top + enemyRect.height / 2 - 5
                );

                // Result of the hit
                enemy.remove();
                bullet.remove();
                score++;
                scoreElement.textContent = score;
                if (score >= winScore) {
                    winGame();
                }

                // Increasing enemy speed getting scores.
                enemySpeed = 1 + Math.sqrt(score) * 0.2;

                clearInterval(bulletMove);
            }
        });
    }, 20);

    // Shooting bullet more cooldowned.
    setTimeout(() => {
        canShoot = true;
    }, 200);
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

    // Range for shooting and player attacked. If not adjust, be attacked above the range of the player body.
    const playerHitbox = {
        left: playerRect.left + playerRect.width * 0.25,
        right: playerRect.right - playerRect.width * 0.25,
        top: playerRect.top + playerRect.height * 0.25,
        bottom: playerRect.bottom - playerRect.height * 0.25
    };

    const enemyHitbox = {
        left: enemyRect.left + enemyRect.width * 0.2,
        right: enemyRect.right - enemyRect.width * 0.2,
        top: enemyRect.top + enemyRect.height * 0.2,
        bottom: enemyRect.bottom - enemyRect.height * 0.2
    };

    if (
        playerHitbox.left < enemyHitbox.right &&
        playerHitbox.right > enemyHitbox.left &&
        playerHitbox.top < enemyHitbox.bottom &&
        playerHitbox.bottom > enemyHitbox.top
    ) {
        console.log('Hit!');
        life--;
        lifeFill.style.width = (life / maxLife) * 100 + '%';

        // GET ATTACKED
        gameBoard.classList.add('shake');
        setTimeout(() => {
            gameBoard.classList.remove('shake');
        }, 250);

        if (life <= 0) {
            gameOver();
        }

        enemy.remove();
        return true;
    }

    return false;
}

// Hitting effect
function createHitEffect(x, y) {
    const effect = document.createElement('div');

    effect.classList.add('hit-effect');

    effect.style.left = x + 'px';
    effect.style.top = y + 'px';

    gameBoard.appendChild(effect);

    setTimeout(() => {
        effect.remove();
    }, 200);

    // Hitting sound effect
    hitSound.currentTime = 0;
    hitSound.play();
}

/* ===================== GAMEOVER ===================== */

// Gameover
const gameOverScreen = document.querySelector('#game-over-screen');
function gameOver() {
    // console.log('Game stopped');
    gameRunning = false;
    gameBoard.style.display = 'none';
    gameOverScore.textContent = score; // Show final score
    gameOverScreen.style.display = 'flex';

    // Gameoversound
    bgm.pause();
    gameOverSound.play();
}

// Connect to Restart button.
const restartBtn = document.querySelector('#restart-btn');
restartBtn.addEventListener('click', restartGame);
function restartGame() {
    location.reload();
}


/* ===================== ENDGAME ===================== */

function winGame() {
    gameRunning = false;
    gameBoard.style.display = 'none';
    winScoreElement.textContent = score; // Show final score
    winScreen.style.display = 'flex';

    // Winning sound
    bgm.pause();
    winSound.play();
}

playAgainBtn.addEventListener('click', restartGame);


/* ===================== SOUNDS ===================== */
const laserSound = new Audio('./assets/sounds/laser.mp3');
const hitSound = new Audio('./assets/sounds/hit.mp3');
const gameOverSound = new Audio('./assets/sounds/gameover.mp3');
const winSound = new Audio('./assets/sounds/win.mp3');
const bgm = new Audio('./assets/sounds/bgm.mp3');
const openingSound = new Audio('./assets/sounds/opening.mp3');
const introSound = new Audio('./assets/sounds/intro.mp3');

openingSound.loop = true;
openingSound.volume = 0.4;

introSound.loop = true;
introSound.volume = 0.4;

// bgm.loop = true;
// bgm.volume = 0.4;