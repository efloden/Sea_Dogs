// Global Variables
var scale = 64;
var level = 1;
// Game Maps/Levls
var map1 = {
    cols: 8,
    rows: 14,
    tsize: 64,
    tiles: [
        4, 34, 34, 34, 34, 34, 34, 5,
        19, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 17,
        19, 73, 73, 73, 73, 73, 73, 17,
        20, 2, 2, 2, 2, 2, 2, 21
    ],
    getTile: function (col, row) {
        return this.tiles[row * map1.cols + col];
    }
}

/*
 * Initializes the game on page load, master controller of the application.
 */
$(document).ready(function() {
    drawMap(map1);
    drawPlayer(256, 700);
    drawNavyPatrol(256, 100, 90);
    $('#fireCannon').onTap(function() {
        var leftPos = $("#player").position().left;
        var topPos = $("#player").position().top;
        var rot = getRotationDegrees($("#player"));
        rot += 180;
        rot %= 360;
        $("#world").append("<div class='cannonBall'></div>");
        $(".cannonBall").moveTo(rot);
    });
});

/*
 * Draws the world map tiles to the viewport
 */
function drawMap(map) {
    for (var c = 0; c < map.cols; c++) {
        for (var r = 0; r < map.rows; r++) {
            var tile = map.getTile(c, r);
            var leftPos = c*scale;
            var rightPos = r*scale;
            if (tile === 73) { // 73 = Water and non colidable
                $("#world").append("<div id='tile"+c+r+"'class='backLayer' style='z-index: 5; left: "+ leftPos +"px; top: "+ rightPos +"px; '></div>");
                $("#tile"+c+r).css("background-image", "url('images/tile_"+tile+".png')");
                $("#tile"+c+r).onTap(function(event) {
                    movePlayerTo(event);
                });
            } else {
                $("#world").append("<div id='tile"+c+r+"'class='backLayer' style='left: "+ leftPos +"px; top: "+ rightPos +"px; '></div>");
                $("#tile"+c+r).css("background-image", "url('images/tile_"+tile+".png')");
            }
        }
    }
};

/*
 * Draws the player to the game world and defines player interactions.
 */
function drawPlayer(startX, startY) {
    $("#world").append("<div id='player' style='left: "+ startX +"px; top: "+ startY +"px; '></div>");
}

/*
 * Draws a Navy Patrol boat to the game world and defines its interactions.
 */
function drawNavyPatrol(startX, startY, heading) {
    $("#world").append("<div class='enemyShip' style='left: "+ startX +"px; top: "+ startY +"px; '></div>");
    $(".enemyShip").moveTo(heading);
    $(".enemyShip").speed(0.1);
    $(".enemyShip").autoBounceOff(true);
    $(".enemyShip").onCollision(function(object) {
        var facing  = getRotationDegrees(this);
        facing += 90;
        this.css("transform", "rotate("+facing+"deg)");
    });
    // On player tap shoot a cannonball towards this boat.
    $(".enemyShip").onTap(function(event) {
      $("#world").append("<div class='cannonBall'></div>");
      var leftPos = $(".enemyShip").position().left;
      var topPos = $(".enemyShip").position().top;
      $(".cannonBall").moveTo(leftPos, topPos);
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
    console.log("angle: " + angle);
    $("#player").css("transform", "rotate("+angle+"deg)");
    $("#player").moveTo(event.clientX, event.clientY);
    $("#player").speed(0.2);
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
