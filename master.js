
window.addEventListener("load", function(event){
    "use strict";
    // functions from the diffent files
    var keyDown = function(event) {
        controller.keyDown(event.type, event.keyCode);
    };
    var resize = function(event) {
        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
        display.render();
    };
    var render = function() {
        display.drawMap(game.world.map, game.world.columns);
        display.drawPlayer(game.world.player, game.world.player.color);
        display.render();
    };
    var update = function() {
        if (controller.left.active) {game.world.player.moveLeft();}
        if (controller.right.active) {game.world.player.moveRight();}
        if (controller.up.active) {game.world.player.jump(); controller.up.active = false;}
        game.update();
    };
    var display = new Display(document.querySelector("canvas"))
    var game =  new Game();
    var engine = new Engine(1000/30, render, update);
    // Initialize the game
    display.buffer.canvas.heigth = game.world.height;
    display.buffer.canvas.width = game.world.width;
    display.tile_sheet.image.addEventListener("load", function(event) {
        resize();
        engine.start();

    }, {once : true});
    display.tile_sheet.image.src = "final_tile_sheet.png";
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyDown);
    window.addEventListener("resize", resize);
});