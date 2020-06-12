let game = document.getElementById("game");
let ctx = game.getContext("2d");
game.width = 960;
game.height = 720;

//Map layout and collision logic
world = function() {
  var map = {
    cols: 20,
    rows: 15,
    tile_size: 48,
    tiles: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ] 

  };
  this.collisionMap = {
    cols: 20,
    rows: 15,
    tile_size: 48,
    tiles: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 9, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ] 
  };
}
world.prototype = {
  constuctor : world,
  collideWithPlatform:function(platform) {//check locations of the corners of each platform
    
    var top, right, bottom, left;
    
    //top left corner
    
    top = Math.floor(platform.getTop() / this.tile_size);
    left = Math.floor(platform.getLeft() / this.tile_size);
    value = this.collision_map[top * this.columns + left];
    this.collider.collide(value, platform, left * this.tile_size, top * this.tile_size, this.tile_size);
    
    //top right corner
    
    top    = Math.floor(platform.getTop()    / this.tile_size);
    right  = Math.floor(platform.getRight()  / this.tile_size);
    value  = this.collision_map[top * this.columns + right];
    this.collider.collide(value, platform, right * this.tile_size, top * this.tile_size, this.tile_size);

    //bottom left corner

    bottom = Math.floor(platform.getBottom() / this.tile_size);
    left   = Math.floor(platform.getLeft()   / this.tile_size);
    value  = this.collision_map[bottom * this.columns + left];
    this.collider.collide(value, platform, left * this.tile_size, bottom * this.tile_size, this.tile_size);

    //bottom right corner

    bottom = Math.floor(platform.getBottom() / this.tile_size);
    right  = Math.floor(platform.getRight()  / this.tile_size);
    value  = this.collision_map[bottom * this.columns + right];
    this.collider.collide(value, platform, right * this.tile_size, bottom * this.tile_size, this.tile_size);

  }

}
//----------Time for some collsion functions
//collison type based on collison_map values includes all possible collision border combinations
world.collider = function() {
  this.collide = function(value, platform, tile_x, tile_y, tile_size) {
    switch(value) {
      case  1: this.collidePlatformTop      (platform, tile_y            ); break;
      case  2: this.collidePlatformRight    (platform, tile_x + tile_size); break;
      case  3: if (this.collidePlatformTop  (platform, tile_y            )) return;// If there's a collision, we don't need to check for anything else.
               this.collidePlatformRight    (platform, tile_x + tile_size); break;
      case  4: this.collidePlatformBottom   (platform, tile_y + tile_size); break;
      case  5: if (this.collidePlatformTop  (platform, tile_y            )) return;
               this.collidePlatformBottom   (platform, tile_y + tile_size); break;
      case  6: if (this.collidePlatformRight(platform, tile_x + tile_size)) return;
               this.collidePlatformBottom   (platform, tile_y + tile_size); break;
      case  7: if (this.collidePlatformTop  (platform, tile_y            )) return;
               if (this.collidePlatformRight(platform, tile_x + tile_size)) return;
               this.collidePlatformBottom   (platform, tile_y + tile_size); break;
      case  8: this.collidePlatformLeft     (platform, tile_x            ); break;
      case  9: if (this.collidePlatformTop  (platform, tile_y            )) return;
               this.collidePlatformLeft     (platform, tile_x            ); break;
      case 10: if (this.collidePlatformLeft (platform, tile_x            )) return;
               this.collidePlatformRight    (platform, tile_x + tile_size); break;
      case 11: if (this.collidePlatformTop  (platform, tile_y            )) return;
               if (this.collidePlatformLeft (platform, tile_x            )) return;
               this.collidePlatformRight    (platform, tile_x + tile_size); break;
      case 12: if (this.collidePlatformLeft (platform, tile_x            )) return;
               this.collidePlatformBottom   (platform, tile_y + tile_size); break;
      case 13: if (this.collidePlatformTop  (platform, tile_y            )) return;
               if (this.collidePlatformLeft (platform, tile_x            )) return;
               this.collidePlatformBottom   (platform, tile_y + tile_size); break;
      case 14: if (this.collidePlatformLeft (platform, tile_x            )) return;
               if (this.collidePlatformRight(platform, tile_x            )) return;
               this.collidePlatformBottom   (platform, tile_y + tile_size); break;
      case 15: if (this.collidePlatformTop  (platform, tile_y            )) return;
               if (this.collidePlatformLeft (platform, tile_x            )) return;
               if (this.collidePlatformRight(platform, tile_x + tile_size)) return;
               this.collidePlatformBottom   (platform, tile_y + tile_size); break;
    }
  }
};
world.collider.prototype = {
  constructor : world.collider,
  collidePlatformBottom:function(platform, tile_bottom) {
    if(platform.getTop() < tile_bottom && platform.getOldTop() >= tile_bottom) {
      platform.setTop(tile_bottom);
      mainChar.y_velocity = 0;
      return true;
    }return false;
  },
  collidePlatformLeft:function(platform, tile_left){
    if(platform.getRight() < tile_bottom && platform.getOldRight() >= tile_left){
      platform.setRight(tile_left);
      mainChar.x_velocity = 0;
      return true;
    }return false;
  },
  collidePlatformTop:function(platform, tile_top){
    if(platform.getBottom() < tile_top && platform.getOldBottom() >= tile_top){
      platform.setBottom(tile_top);
      mainChar.y_velocity = 0;
      return true;
    }return false;
  },
  collidePlatformRight:function(platform, tile_right){
    if(platform.getLeft() < tile_right && platform.getOldLeft() >= tile_right){
      platform.setLeft(tile_right);
      mainChar.x_velocity = 0;
      return true;
    }return false;
  }
};
let world1 = new world();

// Object = function(x, y, color, width, height) {
//   this.x = x;
//   this.y = y;
//   this.width = width;
//   this.height = height;
//   this.color = color;
//   this.x_old = x;
//   this.y_old = y;
// };
// let platform = new Object(this.x, this.y, "grey", 48, 48,);
//time to handle the different sides of each platform
let platform = new Entity(48, 648, "grey", 48, 48);
platform.prototype = {
  constructor : platform,

  getBottom:   function()  { return this.y     + this.height; },
  getLeft:     function()  { return this.x;                   },
  getRight:    function()  { return this.x     + this.width;  },
  getTop:      function()  { return this.y;                   },
  getOldBottom:function()  { return this.y_old + this.height; },
  getOldLeft:  function()  { return this.x_old;               },
  getOldRight: function()  { return this.x_old + this.width;  },
  getOldTop:   function()  { return this.y_old                },
  setBottom:   function(y) { this.y     = y    - this.height; },
  setLeft:     function(x) { this.x     = x;                  },
  setRight:    function(x) { this.x     = x    - this.width;  },
  setTop:      function(y) { this.y     = y;                  },
  setOldBottom:function(y) { this.y_old = y    - this.height; },
  setOldLeft:  function(x) { this.x_old = x;                  },
  setOldRight: function(x) { this.x_old = x    - this.width;  },
  setOldTop:   function(y) { this.y_old = y;                  }

};

// Handles creation of new characters
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
};
let mainChar = new Entity(432, 0, "red", 48, 48);
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
    if (mainChar.y > 720 - 24 - 48) {
  
      mainChar.jumping = false;
      mainChar.y = 720 - 24 - 48;
      mainChar.y_velocity = 0;
  
    }
    // if mainChar is going off the left of the screen
    if (mainChar.x < -48) {  
        mainChar.x = 960;
    } else if (mainChar.x > 960) {// if mainChar goes past right boundary
  
      mainChar.x = -48;
  
    }
    mainChar.render();
    platform.render();
    world1.collide();
};
let gameTick = setInterval(gameLoop, 16)
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(gameLoop);