// Global Variables
var scale = 64;
var playerHealth = 10;
var maxHealth = 10;
var level = 1;
var score = 0;
// Timeout Functions
var timeouts = 0;
// Game Maps/Levls
var portraitMap1 = {
    cols: 9,
    rows: 16,
    tiles: [
        4, 34, 34, 34, 34, 34, 34, 34, 5,
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
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        20, 2, 2, 2, 2, 2, 2, 2, 21,
    ],
    playerStart: { c: 5, r: 15 },
    getTile: function (col, row) {
        return this.tiles[row * portraitMap1.cols + col];
    }
}
var landscapeMap1 = {
    cols: 16,
    rows: 9,
    tiles: [
        4, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 5,
        19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 17,
        20, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 21
    ],
    getTile: function (col, row) {
        return this.tiles[row * landscapeMap1.cols + col];
    }
}
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
function adjustWorld(map) {
    if ($(window).width() < $(window).height()) {
        console.log("Portrait mode");
        scale = $(window).width() / 9;
        cleanMap();
        drawMap(portraitMap1, scale);
        drawPlayer(200, 300, scale);
        drawNavyPatrol(200, 70, 90, scale);
    } else {
        console.log("Landscape mode");
        scale = $(window).width() / 16;
        cleanMap();
        drawMap(landscapeMap1, scale);
        drawPlayer(100, 100, scale);
        drawNavyPatrol(200, 100, 90, scale);
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
            var rightPos = r*myScale;
            if (tile === 73) { // 73 = Water and non colidable
                $("#world").append(
                    "<div id='tile"+c+r+"'class='backLayer' " +
                    "style='z-index: 5; left: "+ leftPos +"px; top: "+ rightPos +"px;" +
                    "background-size: " + myScale + "px " + myScale + "px; \
                    width: " + myScale + "px; \
                    height: " + myScale + "px;    \
                    '></div>"
                );
                $("#tile"+c+r).css("background-image", "url('images/tile_"+tile+".png')");
                $("#tile"+c+r).onTap(function(event) {
                    movePlayerTo(event);
                });
            } else {
                $("#world").append(
                    "<div id='tile"+c+r+"'class='backLayer'" +
                    "style='left: "+ leftPos +"px; top: "+ rightPos +"px;" +
                    "background-size: " + myScale + "px " + myScale + "px; \
                    width: " + myScale + "px; \
                    height: " + myScale + "px;    \
                    '></div>"
                );
                $("#tile"+c+r).css("background-image", "url('images/tile_"+tile+".png')");
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
            playerHealth -= 3;
            console.log('hit! player health now: ' + playerHealth);
            if (playerHealth <= 7 && playerHealth >= 5) {
                this.css("background-image", "url('images/ship (8).png')");
            } else if (playerHealth <= 4 && playerHealth >= 1) {
                this.css("background-image", "url('images/ship (14).png')");
            } else if (playerHealth < 1) {
                playerHealth = 0;
                this.css("background-image", "url('images/ship (20).png')");
                playerShip.speed(0);
            }
            $("span:first").text(playerHealth);
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
    jQuery.data(thisShip, "values", {
        health: 10
    });
    thisShip.css("transform", "rotate("+heading+270+"deg)");
    thisShip.moveTo(heading);
    thisShip.speed(0.2);
    thisShip.autoBounceOff(true);
    thisShip.onCollision(function(otherObject) {
        if (otherObject.hasClass('playerCannonBall')) {
            var currentHealth = jQuery.data(thisShip, "values").health;
            newHealth = currentHealth - 3;
            jQuery.data(thisShip, "values", {
                health: newHealth
            });
            console.log('hit! health now: ' + jQuery.data(thisShip, "values").health);
            if (newHealth <= 7 && newHealth >= 5) {
                this.css("background-image", "url('images/ship (11).png')");
            } else if (newHealth <= 4 && newHealth >= 1) {
                this.css("background-image", "url('images/ship (17).png')");
            } else if (newHealth < 1) {
                this.css("background-image", "url('images/ship (23).png')");
                thisShip.speed(0);
                updateScore(100);
                timeouts++; // Increment the number of timeouts we need to clean up
                setTimeout(function () {
                    thisShip.remove();
                }, 2000);
            }
        } else {
            var facing  = getRotationDegrees(this);
            facing += 180;
            this.css("transform", "rotate("+facing+"deg)");
        }
    });
    // On player tap shoot a cannonball towards this boat.
    thisShip.onTap(function(event) {
        var pleftPos = $("#player").position().left + (scale/2);
        var ptopPos = $("#player").position().top + (scale/2);
        var leftPos = thisShip.position().left + (scale/2);
        var topPos = thisShip.position().top + (scale/2);
        var direction = calculateAngle(topPos, ptopPos, leftPos, pleftPos);
        direction+=90;
        $("#world").append("<div class='playerCannonBall' style='left: "+ pleftPos +"px; top: "+ ptopPos +"px;'></div>");
        $(".playerCannonBall").moveTo(direction);
        $(".playerCannonBall").onCollision(function(otherObject) {
            this.remove();
        });
    });
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
                    this.remove();
                });
            }
        }, 3000 * start);
    }
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
function updateScore(value) {
    score += value;
    $("span:last").text(score);
}

/*
 * Opens Help window
 */
function openHelp() {
    alert('Help Menu \n Tap to move or fire on enemy ships, watch for returning fire!');
}

/*
 * Resets the game world
 */
function resetGame() {
    location.reload();
}

/*
 * Opens Help window
 */
function pauseGame() {
    alert('Game Paused.\n Continue?');
}
