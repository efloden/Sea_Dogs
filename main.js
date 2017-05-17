var scale = 64;
// The Games tile map
function drawMap() {
    var map = {
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
            return this.tiles[row * map.cols + col];
        }
    }
    // $('#world').css("height", "512px");
    // $('#world').css("width", "512px");
    //$('#world').css("background-color","blue");
    $("#world").append("<div id='player' style='left: "+ 256 +"px; top: "+ 700 +"px; '></div>");
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
    $("#world").append("<div class='enemyShip' style='left: "+ 256 +"px; top: "+ 100 +"px; '></div>");
    $(".enemyShip").moveTo(90);
    $(".enemyShip").speed(0.1);
    $(".enemyShip").autoBounceOff(true);
    $(".enemyShip").onCollision(function(object) {
        this.css("transform", "rotate(90deg)");
    });
    $(".enemyShip").onTap(function(event) {
      $("#world").append("<div class='cannonBall'></div>");
      var leftPos = parseInt($(".enemyShip").css("left"), 10);
      var topPos = parseInt($(".enemyShip").css("top"), 10);
      $(".cannonBall").moveTo(leftPos, topPos);
    });
};
/*
 * Moves and orientates the player towards an event (eg: onTap)
 */
function movePlayerTo(event) {
    var leftPos = parseInt($("#player").css("left"), 10);
    var topPos = parseInt($("#player").css("top"), 10);
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
$(document).ready(function() {
    drawMap();
    var leftPos = parseInt($("#player").css("left"), 10);
    var topPos = parseInt($("#player").css("top"), 10);
    $('#fireCannon').onTap(function() {
        var leftPos = parseInt($("#player").css("left"), 10);
        var topPos = parseInt($("#player").css("top"), 10);
        var rot = getRotationDegrees($("#player"));
        rot += 180;
        rot %= 360;
        $("#world").append("<div class='cannonBall'></div>");
        $(".cannonBall").moveTo(rot);
    });
});
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
