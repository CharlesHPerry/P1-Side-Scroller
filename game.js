let game = document.getElementById("game");
let ctx = game.getContext("2d");
game.width = 1000;
game.height = 700;

function Entity(x, y, color, width, height) {
    this.x = x;
    this.x_velocity = 0;
    this.y = y;
    this.y_velocity = 0;
    this.jumping = false;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.render = function(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
let mainChar = new Entity(576, 0, "red", 48, 48);
mainChar.x_velocity = 0;
mainChar.y_velocity = 0;
controller = {

    left:false,
    right:false,
    up:false,
    keyListener:function(event) {
  
      var key_state = (event.type == "keydown")?true:false;
  
      switch(event.key) {
  
        case "a":// left key
          controller.left = key_state;
        break;
        case "w":// up key
          controller.up = key_state;
        break;
        case "d":// right key
          controller.right = key_state;
        break;
      }
    }
};
gameLoop = function() {
    ctx.clearRect(0, 0, game.width, game.height);
    if (controller.up && mainChar.jumping == false) {
  
        mainChar.y_velocity -= 40;
        mainChar.jumping = true;
    }
    if (controller.left) {
  
        mainChar.x_velocity -= 0.5;
    }
    if (controller.right) {
  
      mainChar.x_velocity += 0.5;
  
    }
    mainChar.y_velocity += 1.5;// gravity
    mainChar.x += mainChar.x_velocity;
    mainChar.y += mainChar.y_velocity;
    mainChar.x_velocity *= 0.9;// makes motion seem more real
    mainChar.y_velocity *= 0.9;// 
  
    // if mainChar is falling below floor line
    if (mainChar.y > 700 - 24 - 48) {
  
      mainChar.jumping = false;
      mainChar.y = 700 - 24 - 48;
      mainChar.y_velocity = 0;
  
    }
    // if mainChar is going off the left of the screen
    if (mainChar.x < -48) {  
        mainChar.x = 1000;
    } else if (mainChar.x > 1000) {// if mainChar goes past right boundary
  
      mainChar.x = -48;
  
    }
    mainChar.render();
}
let gameTick = setInterval(gameLoop, 16)
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(gameLoop);