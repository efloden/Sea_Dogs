// Global Variables
var scale = 64;
var level = 1;

// Game Maps/Levls
var map1portrait = {
    cols: 9,
    rows: 16,
    tiles: [
        4, 34, 34, 34, 34, 34, 34, 34, 5,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 73, 17,
        20, 2, 2, 2, 2, 2, 2, 2, 21
    ],
    playerStart: { c: 5, r: 15 },
    getTile: function (col, row) {
        return this.tiles[row * map1portrait.cols + col];
    }
}
var map1landscape = {
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
        return this.tiles[row * map1landscape.cols + col];
    }
}
/*
 * Initializes the game on page load, master controller of the application.
 */
$(document).ready(function() {
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
        drawMap(map1portrait, scale);
        drawPlayer(200, 300);
        drawNavyPatrol(200, 100, 90);
    } else {
        console.log("Landscape mode");
        scale = $(window).width() / 16;
        cleanMap();
        drawMap(map1landscape, scale);
        drawPlayer(100, 100);
        drawNavyPatrol(200, 100, 90);
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
    $("#world").empty();
}

/*
 * Draws the player to the game world and defines player interactions.
 */
function drawPlayer(startX, startY) {
    $("#world").append("<div id='player' style='left: "+ startX +"px; top: "+ startY +"px; '></div>");
}

/*
 * Draws a Navy Patrol boat to the game world and defines its interactions.
 */
function drawNavyPatrol(startX, startY, heading, id) {
    $("#world").append("<div value='10' class='enemyNavyShip' id='navy' style='left: "+ startX +"px; top: "+ startY +"px; '></div>");
    var thisShip = $("#navy");
    console.log(thisShip);
    jQuery.data(thisShip, "values", {
        health: 10
    });
    console.log(jQuery.data(thisShip, "values").health);
    $(".enemyNavyShip").moveTo(heading);
    $(".enemyNavyShip").speed(0.1);
    $(".enemyNavyShip").autoBounceOff(true);
    $(".enemyNavyShip").onCollision(function(otherObject) {
        if (otherObject.hasClass('playerCannonBall')) {
            console.log('we hit a boat');
            this.css("background-image", "url('images/ship (11).png')");
        } else {
            var facing  = getRotationDegrees(this);
            facing += 90;
            this.css("transform", "rotate("+facing+"deg)");
        }
    });
    // On player tap shoot a cannonball towards this boat.
    $(".enemyNavyShip").onTap(function(event) {
        var pleftPos = $("#player").position().left + (scale/2);
        var ptopPos = $("#player").position().top + (scale/2);
        $("#world").append("<div class='playerCannonBall' style='left: "+ pleftPos +"px; top: "+ ptopPos +"px;'></div>");
        var leftPos = $(".enemyNavyShip").position().left + (scale/2);
        var topPos = $(".enemyNavyShip").position().top + (scale/2);
        $(".playerCannonBall").moveTo(leftPos, topPos);
        $(".playerCannonBall").onCollision(function(otherObject) {
            this.remove();
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
