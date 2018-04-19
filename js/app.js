// Creating Enemy class
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    this.x += 10 * this.speed *dt;
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
    this.startY = 390;
}

Player.prototype.update = function() {
    //console.log('hello');
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
        this.x = this.startX;
        this.y = this.startY;
    }

    if (39 in keyClick && this.x < 305) {
        this.x += this.speed2;
    }

    if (40 in keyClick && this.y < 390) {
        this.y += this.speed1;
    } 
};

// Instantiating my objects
const allEnemies = [new Enemy(-50, 60), new Enemy(-100, 145), new Enemy(-150, 225)];

const player = new Player(200, 390);

// This listens for key presses and sends the keys to handleInput() method
const keyClick = {};

document.addEventListener('keydown', function(e) {
    keyClick[event.keyCode] = true;
    player.handleInput(keyClick[e.keyCode]);
});

document.addEventListener('keyup', (event) => {
    delete keyClick[event.keyCode];
});
