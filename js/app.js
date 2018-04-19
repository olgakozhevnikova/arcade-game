// Creating Enemy class
var Enemy = function(x, y, speed) {
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
        console.log('collision');
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Creating Player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
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
    // Move player left, up, right, down and prevent the player from moving outside of the canvas
    if (37 in keyClick && this.x > 0) {
        this.x -= this.speed2;
    }

    if (38 in keyClick && this.y >= 50) {
        this.y -= this.speed1;
    }

    if (38 in keyClick && this.y < 50) {
        player.reset();
    }

    if (39 in keyClick && this.x < 305) {
        this.x += this.speed2;
    }

    if (40 in keyClick && this.y < 400) {
        this.y += this.speed1;
    } 
};

// If the player reaches the water the game should be reset by moving the player back to the initial location
Player.prototype.reset = function() {
    this.x = this.startX;
    this.y = this.startY;
}

// Instantiating my objects
const allEnemies = [new Enemy(-300, 60, 10), new Enemy(-100, 145, 15), new Enemy(-200, 230, 30)];

const player = new Player(200, 400);

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

const positionX = [-100, -200, -300, -400];

const positionY = [60, 145, 230];

const speedOptions = [10, 20, 30, 40, 50];

setInterval(function() {
    let enemyX = positionX[randomFunc(4)];
    let enemyY = positionY[randomFunc(3)];
    let enemySpeed = speedOptions[randomFunc(5)];
    allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed));
}, 800);
