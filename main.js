// Global Variables
var scale = 64;
var playerHealth = 10;
var maxHealth = 10;
var level = 0;
var maxLevel = 3;
var score = 0;
var paused = 0;
var audio = new Audio('sounds/Path to Lake Land.ogg');
var boom = new Audio('sounds/boom6.wav');
// Timeout Functions
var timeouts = 0;
// Game Maps/Levls
var PortraitMaps = [
    {
        cols: 9,
        rows: 16,
        exit: [4,1],
        player: [4,13],
        navy: [4,3,90],
        fire: [null],
        target: [5,6],
        tiles: [
            4, 34, 34, 34, 34, 34, 34, 34, 5,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            52, 7, 9, 73, 73, 73, 6, 7, 53,
            40, 24, 97, 73, 73, 73, 38, 24, 39,
            36, 55, 57, 73, 73, 73, 54, 56, 37,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            20, 2, 2, 2, 2, 2, 2, 2, 21,
        ],
        getTile: function (col, row) {
            return this.tiles[row * this.cols + col];
        }
    },
    {
        cols: 9,
        rows: 16,
        exit: [4,1],
        player: [4,13],
        navy: [4,3,90],
        fire: [4,9,90],
        target: [5,6],
        tiles: [
            4, 34, 34, 34, 34, 34, 34, 34, 5,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            52, 7, 9, 73, 73, 73, 73, 73, 17,
            40, 24, 97, 73, 73, 73, 73, 73, 17,
            36, 55, 57, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            20, 2, 2, 2, 2, 2, 2, 2, 21,
        ],
        getTile: function (col, row) {
            return this.tiles[row * this.cols + col];
        }
    },
    {
        cols: 9,
        rows: 16,
        exit: [4,1],
        player: [4,13],
        navy: [4,3,90],
        fire: [3,9,180],
        target: [5,6],
        tiles: [
            4, 34, 34, 34, 34, 34, 34, 34, 5,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            52, 7, 9, 73, 73, 73, 73, 73, 17,
            40, 24, 97, 73, 73, 73, 73, 73, 17,
            36, 55, 57, 73, 73, 73, 6, 7, 53,
            19, 73, 73, 73, 73, 73, 38, 24, 39,
            19, 73, 73, 73, 73, 73, 54, 56, 37,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 17,
            20, 2, 2, 2, 2, 2, 2, 2, 21,
        ],
        getTile: function (col, row) {
            return this.tiles[row * this.cols + col];
        }
    }
];
var LandscapeMaps = [
    {
        cols: 16,
        rows: 9,
        exit: [14,4],
        player: [2,2],
        navy: [11,4,180],
        fire: [null],
        target: [5,7],
        tiles: [
            4, 34, 34, 34, 34, 34, 37, 24, 36, 34, 34, 34, 34, 34, 34, 5,
            19, 73, 73, 73, 73, 73, 22, 24, 41, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 54, 56, 57, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            52, 7, 9, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            40, 24, 97, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            40, 24, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 21
        ],
        getTile: function (col, row) {
            return this.tiles[row * this.cols + col];
        }
    },
    {
        cols: 16,
        rows: 9,
        exit: [14,4],
        player: [2,2],
        navy: [11,4,180],
        fire: [7,5,180],
        target: [5,6],
        tiles: [
            4, 34, 34, 34, 34, 34, 37, 24, 36, 34, 34, 34, 34, 34, 34, 5,
            19, 73, 73, 73, 73, 73, 22, 24, 41, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 54, 56, 57, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            52, 7, 9, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            40, 24, 97, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            40, 24, 41, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            40, 24, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 21
        ],
        getTile: function (col, row) {
            return this.tiles[row * this.cols + col];
        }
    },
    {
        cols: 16,
        rows: 9,
        exit: [14,4],
        player: [2,2],
        navy: [12,4,180],
        fire: [4,2,90],
        target: [5,6],
        tiles: [
            4, 34, 34, 34, 34, 34, 34, 34, 37, 24, 36, 34, 34, 34, 34, 5,
            19, 73, 73, 73, 73, 73, 73, 73, 22, 24, 41, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73,73, 73, 54, 56, 57, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            52, 7, 9, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            40, 24, 97, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            40, 24, 41, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
            40, 24, 52, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 21
        ],
        getTile: function (col, row) {
            return this.tiles[row * this.cols + col];
        }
    }
];
/*
 * Initializes the game on page load, master controller of the application.
 */
$(document).ready(function() {
    $("span:last").text(score);
    adjustWorld();
    $(window).resize(function() {
        console.log("resized");
        adjustWorld();
    });
});
/*
 * Adjusts the game world elements to a new display
 */
function adjustWorld() {
    audio.play();
    var currentMap;
    if ($(window).width() < $(window).height()) {
        console.log("Portrait mode");
        scale = $(window).width() / 9;
        cleanMap();
        currentMap = PortraitMaps[level];
        drawMap(currentMap, scale);
    } else {
        console.log("Landscape mode");
        scale = $(window).width() / 16;
        cleanMap();
        currentMap = LandscapeMaps[level];
        drawMap(currentMap, scale);
    }
}

/*
 * Draws the world map tiles to the viewport
 */
function drawMap(map, myScale) {
    for (var c = 0; c < map.cols; c++) {
        for (var r = 0; r < map.rows; r++) {
            var tile = map.getTile(c, r);
            var leftPos = c*myScale;
            var topPos = r*myScale;
            if (tile === 73) { // 73 = Water and non colidable
                $("#world").append(
                    "<div id='tile"+c+r+"'class='backLayer' " +
                    "style='z-index: 5; left: "+ leftPos +"px; top: "+ topPos +"px;" +
                    "background-size: " + myScale + "px " + myScale + "px; \
                    width: " + myScale + "px; \
                    height: " + myScale + "px;    \
                    '></div>"
                );
                $("#tile"+c+r).css("background-image", "url('images/tile_"+tile+".png')");
                $("#tile"+c+r).onTap(function(event) {
                    movePlayerTo(event);
                });
            } else if (tile === 97) { // Cannoneers tile, set up timed shooting from here.
                $("#world").append(
                    "<div id='tile"+c+r+"'class='backLayer'" +
                    "style='left: "+ leftPos +"px; top: "+ topPos +"px;" +
                    "background-size: " + myScale + "px " + myScale + "px; \
                    width: " + myScale + "px; \
                    height: " + myScale + "px;    \
                    '></div>"
                );
                $("#tile"+c+r).css("background-image", "url('images/tile_"+tile+".png')");
            } else {
                $("#world").append(
                    "<div id='tile"+c+r+"'class='backLayer'" +
                    "style='left: "+ leftPos +"px; top: "+ topPos +"px;" +
                    "background-size: " + myScale + "px " + myScale + "px; \
                    width: " + myScale + "px; \
                    height: " + myScale + "px;    \
                    '></div>"
                );
                $("#tile"+c+r).css("background-image", "url('images/tile_"+tile+".png')");
            }
            // Print objects at their tile locations
            if (c === map.exit[0] && r === map.exit[1]) {
                drawExit(leftPos, topPos, myScale);
            }
            if (c === map.player[0] && r === map.player[1]) {
                drawPlayer(leftPos, topPos, myScale);
            }
            if (c === map.target[0] && r === map.target[1]) {
                drawTarget(leftPos, topPos, myScale);
            }
            if (map.fire !== null) {
                if (c === map.fire[0] && r === map.fire[1]) {
                    drawFireShip(leftPos, topPos, map.fire[2], myScale);
                }
            }
            if (map.navy !== null) {
                if (c === map.navy[0] && r === map.navy[1]) {
                    drawNavyPatrol(leftPos, topPos, map.navy[2], myScale);
                }
            }
        }
    }
};

/*
 * Destroys the current world elements.
 */
function cleanMap() {
    // CLear all the timeout functions present
    for (var i = 0; i < timeouts; i++) {
        clearTimeout(i);
    }
    timeouts = 0;
    $("#world").empty();
}

/*
 * Draws the player to the game world and defines player interactions.
 */
function drawPlayer(startX, startY, scale) {
    var height = Math.floor(scale + scale/2);
    $("#world").append(
        "<div id='player' style='left: "+ startX +"px; top: "+ startY +"px; \
        background-size: "+scale+"px " + height + "px;     \
        width: " + height + "px;    \
        height: " + height + "px;    \
        '></div>"
    );
    var playerShip = $("#player");
    jQuery.data(playerShip, "values", {
        health: playerHealth
    });
    $( "span:first" ).text( jQuery.data( playerShip, "values" ).health );
    playerShip.onCollision(function(otherObject) {
        if (otherObject.hasClass('enemyCannonBall')) {
            console.log('animating1');
            var leftPos = $('#player').position().left + (scale/2);
            var topPos = $('#player').position().top + (scale/2);
            explosionAnimation(leftPos, topPos, scale);
            damagePlayer(3);
        } else {
            playerShip.speed(0);
        }
    });
}

/*
 * Draws a Navy Patrol boat to the game world and defines its interactions.
 */
function drawNavyPatrol(startX, startY, heading, scale) {
    var height = Math.floor(scale + scale/2);
    $("#world").append(
        "<div value='10' class='enemyNavyShip' id='navy' \
        style='left: "+ startX +"px; top: "+ startY +"px; \
        background-size: "+scale+"px " + height + "px;     \
        width: " + height + "px;    \
        height: " + height + "px;    \
        '></div>"
    );
    var thisShip = $("#navy");
    var alive = true;
    jQuery.data(thisShip, "values", {
        health: 10
    });
    if (heading === 90) {
        thisShip.css("transform", "rotate("+heading+270+"deg)");
    }
    thisShip.moveTo(heading);
    thisShip.speed(0.2);
    thisShip.autoBounceOff(true);
    thisShip.onCollision(function(otherObject) {
        if (otherObject.hasClass('playerCannonBall')) {
            var currentHealth = jQuery.data(thisShip, "values").health;
            newHealth = currentHealth - 3;
            if (newHealth < 0) {
                newHealth = 0;
            }
            jQuery.data(thisShip, "values", {
                health: newHealth
            });
            console.log('hit! health now: ' + jQuery.data(thisShip, "values").health);
            if (newHealth <= 7 && newHealth >= 5) {
                this.css("background-image", "url('images/ship (11).png')");
            } else if (newHealth <= 4 && newHealth >= 1) {
                this.css("background-image", "url('images/ship (17).png')");
            } else if (newHealth < 1 && alive === true) {
                alive = false;
                this.css("background-image", "url('images/ship (23).png')");
                thisShip.speed(0);
                updateScore(100);
                timeouts++; // Increment the number of timeouts we need to clean up
                setTimeout(function () {
                    // On death, drop Money object collectable that increments score
                    var leftPos = thisShip.position().left + (scale/2);
                    var topPos = thisShip.position().top + (scale/2);
                    thisShip.remove();
                    drawMoneyDrop(leftPos, topPos, scale);
                }, 1000);
            }
        } else if (otherObject.hasClass('backLayer')) {
            var facing = getRotationDegrees(this);
            facing += 180;
            this.css("transform", "rotate("+facing+"deg)");
        }
    });
    // On player tap shoot a cannonball towards this boat.
    makePlayerShootable(thisShip);
    // Shoot at the player 10 times with a delay
    for (var start = 1; start < 10; start++) {
        shootPlayer(start);
    }
    function shootPlayer(start) {
        timeouts++; // Increment the number of timeouts we need to clean up
        shootingPlayer = setTimeout(function () {
            // Only shoot if this ship is still alive
            if (jQuery.data(thisShip, "values").health > 1) {
                console.log('navy shoots!');
                var pleftPos = $("#player").position().left + (scale/2);
                var ptopPos = $("#player").position().top + (scale/2);
                var leftPos = thisShip.position().left + (scale/2);
                var topPos = thisShip.position().top + (scale/2);
                var direction = calculateAngle(ptopPos, topPos, pleftPos, leftPos);
                direction+=90;
                $("#world").append("<div class='enemyCannonBall' id='enemyCannonBall"+start+"' style='left: "+ leftPos +"px; top: "+ topPos +"px;'></div>");
                $("#enemyCannonBall" + start).moveTo(direction);
                $("#enemyCannonBall" + start).onCollision(function(otherObject) {
                    $("#enemyCannonBall" + start).remove();
                });
            }
        }, 3500 * start);
    }
}

/*
 * Draws a Fire Patrol boat to the game world and defines its interactions.
 */
function drawFireShip(startX, startY, heading, myScale) {
    var height = Math.floor(scale + scale/2);
    $("#world").append(
        "<div value='10' class='enemyFireShip' id='fire' \
        style='left: "+ startX +"px; top: "+ startY +"px; \
        background-size: "+scale+"px " + height + "px;     \
        width: " + height + "px;    \
        height: " + height + "px;    \
        '></div>"
    );
    var thisShip = $("#fire");
    var alive = true;
    jQuery.data(thisShip, "values", {
        health: 9
    });
    if (heading === 90) {
        thisShip.css("transform", "rotate("+heading+270+"deg)");
    }
    thisShip.moveTo(heading);
    thisShip.speed(0.3);
    thisShip.autoBounceOff(true);
    thisShip.onCollision(function(otherObject) {
        if (otherObject.hasClass('playerCannonBall')) {
            var leftPos = thisShip.position().left + (scale/2);
            var topPos = thisShip.position().top + (scale/2);
            var currentHealth = jQuery.data(thisShip, "values").health;
            newHealth = currentHealth - 3;
            if (newHealth < 0) {
                newHealth = 0;
            }
            jQuery.data(thisShip, "values", {
                health: newHealth
            });
            console.log('hit! health now: ' + jQuery.data(thisShip, "values").health);
            if (newHealth <= 7 && newHealth >= 5) {
                this.css("background-image", "url('images/ship (9).png')");
            } else if (newHealth <= 4 && newHealth >= 1) {
                this.css("background-image", "url('images/ship (15).png')");
            } else if (newHealth < 1 && alive === true) {
                alive = false;
                this.css("background-image", "url('images/ship (21).png')");
                thisShip.speed(0);
                updateScore(100);
                timeouts++; // Increment the number of timeouts we need to clean up
                setTimeout(function () {
                    // On death, drop Money object collectable that increments score
                    thisShip.remove();
                    drawChaserShip(leftPos, topPos, scale);
                }, 1000);
            }
        } else if (otherObject.is('#player')) {
            var leftPos = $('#player').position().left + (scale/2);
            var topPos = $('#player').position().top + (scale/2);
            var facing  = getRotationDegrees(this);
            facing += 180;
            this.css("transform", "rotate("+facing+"deg)");
            explosionAnimation(leftPos, topPos, scale);
            damagePlayer(3);
        } else if (otherObject.hasClass('backLayer')) {
            var facing  = getRotationDegrees(this);
            facing += 180;
            this.css("transform", "rotate("+facing+"deg)");
        }
    });
    // On player tap shoot a cannonball towards this boat.
    makePlayerShootable(thisShip);
}

/*
 * Draws a flaming ship that chases the player and explodes on impact
 */
function drawChaserShip(startX, startY, myScale) {
    var height = Math.floor(scale - scale/5);
    var width = Math.floor(scale/2);
    $("#world").append(
        "<div value='10' class='enemyChaserShip' id='chaser' \
        style='left: "+ startX +"px; top: "+ startY +"px; \
        background-size: "+width+"px " + height + "px;     \
        width: " + height + "px;    \
        height: " + height + "px;    \
        '></div>"
    );
    var thisShip = $("#chaser");
    makePlayerShootable(thisShip);
    // Orient to the player 10 times with a delay
    for (var start = 1; start < 10; start++) {
        orientPlayer(start);
    }
    function orientPlayer(start) {
        timeouts++; // Increment the number of timeouts we need to clean up
        setTimeout(function () {
            var leftPos = $("#player").position().left;
            var topPos = $("#player").position().top;
            var angle = calculateAngle(topPos, startY, leftPos, startX);
            angle += 270;
            angle %= 360;
            thisShip.css("transform", "rotate("+angle+"deg)");
        }, 1000 * start);
    }
    thisShip.moveTo($("#player"));
    thisShip.speed(0.1);
    thisShip.onCollision(function(otherObject) {
        if (otherObject.hasClass('playerCannonBall')) {
            var leftPos = thisShip.position().left;
            var topPos = thisShip.position().top;
            thisShip.remove();
            drawMoneyDrop(leftPos, topPos, scale);
        } else if (otherObject.is('#player')) {
            var leftPos = $('#player').position().left + (scale/2);
            var topPos = $('#player').position().top + (scale/2);
            explosionAnimation(leftPos, topPos, scale);
            damagePlayer(5);
            thisShip.remove();
        }
    });
}

/*
 * Draws the level exit to the game world.
 */
function drawExit(leftPos, topPos, myScale) {
    topPos-=myScale/3;
    $("#world").append(
        "<div class='levelExit' " +
        "style='z-index: 10; left: "+ leftPos +"px; top: "+ topPos +"px;" +
        "background-size: " + myScale + "px " + myScale + "px; \
        width: " + myScale + "px; \
        height: " + myScale + "px;    \
        '></div>"
    );
    $(".levelExit").onTap(function(event) {
        movePlayerTo(event);
    });
    $(".levelExit").onCollision(function(otherObject) {
        if (otherObject.is('#player')) {
            console.log('level complete!');
            level++;
            if (level >= maxLevel) {
                alert('Congratulations! You beat every level! Final Score: ' + score);
                resetGame();
            }
            adjustWorld();
        }
    });
}

/*
 * Draws a target square that triggers a cannon shot at the player
 */
function drawTarget(leftPos, topPos, myScale) {
    $("#world").append(
        "<div class='targetSquare' " +
        "style='z-index: 10; left: "+ leftPos +"px; top: "+ topPos +"px;" +
        "background-size: " + myScale + "px " + myScale + "px; \
        width: " + myScale + "px; \
        height: " + myScale + "px;    \
        '></div>"
    );
    $(".targetSquare").onCollision(function(otherObject) {
        var fireFromLeft = leftPos - scale*2;
        var fireFromTop = topPos + scale/2;
        if (otherObject.is('#player')) {
            $("#world").append("<div class='enemyCannonBall' id='enemyCannonBall"+99+"' style='left: "+ fireFromLeft +"px; top: "+ fireFromTop +"px;'></div>");
            $("#enemyCannonBall" + 99).moveTo(90);
            $("#enemyCannonBall" + 99).onCollision(function(otherObject) {
                $("#enemyCannonBall" + 99).remove();
            });
            $("#enemyCannonBall" + 99).speed(0.2);
            this.remove();
        }
    });
}

/*
 * Draws a collectable moneyDrop to the game world
 */
function drawMoneyDrop(leftPos, topPos, myScale) {
    $("#world").append("<div class='moneyDrop' style='left: "+ leftPos +"px; top: "+ topPos +"px;'></div>");
    $(".moneyDrop").onCollision(function(otherObject) {
        if (otherObject.is('#player')) {
            score += 100;
            $("span:last").text(score);
            this.remove();
        }
    });
}

/*
 * Draws an exploision animation to the game world
 */
function explosionAnimation(leftPos, topPos, myScale) {
    $("#world").append("<div class='cannonExplosion' style='left: "+ leftPos +"px; top: "+ topPos +"px;'></div>");
    $(".cannonExplosion").animate({
        opacity: 0.50,
        height: myScale,
        width: myScale
    }, 1000, function() {
        // Animation complete.
        $(".cannonExplosion").remove();
    });
}

/*
 * Attach onTap player shoot action to this object
 */
function makePlayerShootable(object) {
    object.onTap(function(event) {
        var pleftPos = $("#player").position().left + (scale/2);
        var ptopPos = $("#player").position().top + (scale/2);
        var leftPos = object.position().left + (scale/2);
        var topPos = object.position().top + (scale/2);
        var direction = calculateAngle(topPos, ptopPos, leftPos, pleftPos);
        direction+=90;
        $("#world").append("<div class='playerCannonBall' style='left: "+ pleftPos +"px; top: "+ ptopPos +"px;'></div>");
        $(".playerCannonBall").moveTo(direction);
        $(".playerCannonBall").onCollision(function(otherObject) {
            this.remove();
            boom.play();
            explosionAnimation(leftPos, topPos, scale);
        });
    });
}

/*
 * Moves and orientates the player towards an event (eg: onTap)
 */
function movePlayerTo(event) {
    var leftPos = $("#player").position().left;
    var topPos = $("#player").position().top;
    var angle = calculateAngle(event.clientY, topPos, event.clientX, leftPos);
    // fix our orientation
    angle += 270;
    angle %= 360;
    $("#player").css("transform", "rotate("+angle+"deg)");
    $("#player").moveTo(event.clientX, event.clientY);
    $("#player").speed(0.5);
}

/*
 * Calculates the angle from element a to element b
 */
function calculateAngle(aY, bY, aX, bX) {
    var angle;
    angle = Math.atan2(aY - bY, aX - bX);
    angle = angle * (180 / Math.PI);
    if(angle < 0){
        angle += 360;
    }
    return angle;
}

/*
 * Calculates the current rotation of an element (eg a ships heading)
 */
function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    //return (angle < 0) ? angle + 360 : angle;
    return angle;
}

/*
 * Updates the Player Score, congratulates milestones
 */
function damagePlayer(value) {
    boom.play();
    playerHealth -= value;
    if (playerHealth < 0) {
        playerHealth = 0;
    }
    console.log('hit! player health now: ' + playerHealth);
    if (playerHealth <= 7 && playerHealth >= 5) {
        $('#player').css("background-image", "url('images/ship (8).png')");
    } else if (playerHealth <= 4 && playerHealth >= 1) {
        $('#player').css("background-image", "url('images/ship (14).png')");
    } else if (playerHealth < 1) {
        $('#player').css("background-image", "url('images/ship (20).png')");
        $('#player').speed(0);
        alert('Game Over! Final Score: ' + score);
        resetGame();
    }
    $("span:first").text(playerHealth);
}

/*
 * Updates the Player Score, congratulates milestones
 */
function updateScore(value) {
    score += value;
    $("span:last").text(score);
}

/*
 * Opens Help window
 */
function openHelp() {
    alert('Help Menu \n \
            Tap to move or fire on enemy ships, watch for returning fire! \n \
            Your objective: Make it to the level exit - the Golden Star. \n \
            Blue Ships: Fire at you - Drops: 100 Points. \n \
            Red Ships: Damage on contact - Drops: Another ship! \n \
            Small Ship: Damage on contact - Drops: 100 Points. \n \
            Red Target: Triggers Cannoneer fire on contact, careful! \n \
            Small Golden Star: Points, pick these up!');
}

/*
 * Resets the game world
 */
function resetGame() {
    location.reload();
}

/*
 * Pauses the game
 */
function pauseGame() {
    alert('Game Paused.\n Continue?');
}
