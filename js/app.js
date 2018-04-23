// Declare variable for scores
let scoreVal = 0;

// Declare variable for collecting removed lives
let lostLives = [];

// Get characters'div
let characters = document.getElementById('characters');

// Get modals
let winningModal = document.getElementById('winningModal');
let losingModal = document.getElementById('losingModal');

// Creating Enemy class
let Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    this.x += 10 * this.speed * dt;
    // Handle collision with the Player
    if (parseInt(this.x) <= player.x + 60 && player.x <= parseInt(this.x) + 70 && this.y === player.y) {
        collision();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Creating Player class
let Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed1 = 85; // Move up and down
    this.speed2 = 100; // Move left and right
    this.sprite = 'images/char-boy.png';
    this.startX = 200;
    this.startY = 400;
}

Player.prototype.update = function() {
    
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function() {
    // Move player and prevent the player from moving outside of the canvas
    if (37 in keyClick && this.x > 0) {
        this.x -= this.speed2; // left
    }

    if (38 in keyClick && this.y > 0) {
        this.y -= this.speed1; // up
    }

    // When the player reaches the water, set its position to initial
    if (38 in keyClick && this.y < 49) {
        // To be sure that the player reached the water
        setTimeout(function() {
            reachedWater();
        }, 100);
    }

    if (39 in keyClick && this.x < 305) {
        this.x += this.speed2; //right
    }

    if (40 in keyClick && this.y < 400) {
        this.y += this.speed1; // down
    } 
};

// If the player reaches the water the game should be reset by moving the player back to the initial location
Player.prototype.reset = function() {
    this.x = this.startX;
    this.y = this.startY;
};

// Create Life class
let Life = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
}

Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 30, 45);
};

// Create Score class
let Score = function(x, y) {
    this.x = x;
    this.y = y;
    this.score = 'SCORES:  ' + scoreVal;
}

Score.prototype.render = function() {
    ctx.font="14px downloadedFont";
    ctx.fillText(this.score, this.x, this.y);
};

Score.prototype.update = function() {
    this.score = 'SCORES:  ' + scoreVal;
}

let Character = function(x, y, name) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-' + name + '.png';
}

Character.prototype.render = function() {
    ctxChar.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let TestCharacter = function(width, height, x, y) {
    Character.call(this, x, y);
    this.width = width;
    this.height = height;
}

TestCharacter.prototype.update = function() {
    const x = this;
    const y = this;
    const width = this;
    const height = this;
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop;
    elem.addEventListener('click', function(event) {
        var xx = event.pageX - elemLeft,
            yy = event.pageY - elemTop;
        console.log(xx, yy);
            if (xx > x.x && xx < x.x + width.width) {
                if (yy > y.y && yy < y.y + height.height) {
                    console.log('first char selected');
                }

                if (yy > y.y + height.height && yy < y.y + 2 * height.height) {
                    console.log('second char selected');
                }

                if (yy > y.y + 2 * height.height && yy < y.y + 3 * height.height) {
                    console.log('third char selected');
                }

                if (yy > y.y + 3 * height.height && yy < y.y + 4 * height.height) {
                    console.log('forth char selected');
                }

                if (yy > y.y + 4 * height.height && yy < y.y + 5 * height.height) {
                    console.log('fifth char selected');
                }
            }
    }, false);
}



// Instantiating my objects
const allEnemies = [new Enemy(-300, 60, 10), new Enemy(-100, 145, 15), new Enemy(-200, 230, 30)];

const player = new Player(200, 400);

let lives = [new Life(3, 540), new Life(36, 540), new Life(69, 540)];

const scores = new Score(310, 570);

const allCharacters = [
    new Character(0, 0, 'boy'),
    new Character(0, 100, 'cat-girl'),
    new Character(0, 200, 'horn-girl'),
    new Character(0, 300, 'pink-girl'),
    new Character(0, 400, 'princess-girl'),
];

// This object is used just to calculate coordinates for clicks when choosing a character
const testChar = new TestCharacter(64, 97, 0, 62);

// Open menu to choose a character
function showCharacters() {
    characters.style.visibility = 'visible';
}

// This listens for key presses and sends the keys to handleInput() method
const keyClick = {};
document.addEventListener('keydown', function(e) {
    keyClick[event.keyCode] = true;
    player.handleInput(keyClick[e.keyCode]);
});
document.addEventListener('keyup', (event) => {
    delete keyClick[event.keyCode];
});

function randomFunc(n) {
    return Math.floor(Math.random() * n);
}

// Starting positions of bugs on X-axis
const positionX = [-100, -200, -300, -400];

// Starting positions of bugs on Y-axis
const positionY = [60, 145, 230];

// Possible speeds of bugs
const speedOptions = [10, 20, 30, 40, 50];

// Show bugs non-stop
setInterval(function() {
    let enemyX = positionX[randomFunc(4)];
    let enemyY = positionY[randomFunc(3)];
    let enemySpeed = speedOptions[randomFunc(5)];
    allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed));
}, 800);

// When player reaches the water
function reachedWater() {
    player.reset();
    scoreVal += 100;
    playerWon();
}

// When collision happens
function collision() {
    // Move player to initial position
    player.reset();

    // Remove 1 life
    if (lives.length > 0) {
        let life = lives.pop();
        lostLives.push(life);
    }
    else {
        playerLost();
    }
    // Decrease scores
    if (scoreVal >= 500) {
        scoreVal -= 500;
    }
    else scoreVal = 0;
}

// When scores are 1000 game over, player wins
function playerWon() {
    if (scoreVal === 1000) {
        winningModal.style.display = 'block';
    }
}

// Game over, when there are no lives
function playerLost() {
    losingModal.style.display = 'block';
}

// Modal's button to reset the game
function playAgain() {
    winningModal.style.display = 'none';
    losingModal.style.display = 'none';
    startGame();
}

// Reset scores to 0 and lives to 3
function startGame() {
    scoreVal = 0;
    lives = lostLives.reverse();
    lostLives = [];
}

