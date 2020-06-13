
const Game = function() {
  this.world = new Game.World();
  this.update = function() {
    this.world.update();
  };
};
Game.prototype = {constructor : Game};
//Map layout and collision logic
Game.World = function(friction = 0.9, gravity = 3) {
  this.collider = new Game.World.Collider();
  this.gravity = gravity;
  this.friction = friction;
  this.player = new Game.World.Player();
  this.columns = 20;
  this.rows = 15;
  this.tile_size = 48;
  this.map = [
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
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  this.collisionMap = [
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
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  this.height = this.rows * this.tile_size;
  this.width = this.columns * this.tile_size;
};

Game.World.prototype = {
  constuctor : Game.World,
  collideWithEntity:function(entity) {//check locations of the corners of each platform
    
    var value, top, right, bottom, left;
    
    //top left corner
    
    top = Math.floor(entity.getTop() / this.tile_size);
    left = Math.floor(entity.getLeft() / this.tile_size);
    value = this.collision_map[top * this.columns + left];
    this.collider.collide(value, entity, left * this.tile_size, top * this.tile_size, this.tile_size);
    
    //top right corner
    
    top    = Math.floor(entity.getTop()    / this.tile_size);
    right  = Math.floor(entity.getRight()  / this.tile_size);
    value  = this.collision_map[top * this.columns + right];
    this.collider.collide(value, entity, right * this.tile_size, top * this.tile_size, this.tile_size);

    //bottom left corner

    bottom = Math.floor(entity.getBottom() / this.tile_size);
    left   = Math.floor(entity.getLeft()   / this.tile_size);
    value  = this.collision_map[bottom * this.columns + left];
    this.collider.collide(value, entity, left * this.tile_size, bottom * this.tile_size, this.tile_size);

    //bottom right corner

    bottom = Math.floor(entity.getBottom() / this.tile_size);
    right  = Math.floor(entity.getRight()  / this.tile_size);
    value  = this.collision_map[bottom * this.columns + right];
    this.collider.collide(value, entity, right * this.tile_size, bottom * this.tile_size, this.tile_size);

  },
  update:function() {
    this.player.y_velocity += this.gravity;
    this.player.update();
    this.player.x_velocity *= this.friction;
    this.player.y_velocity *= this.friction;
    this.collideWithEntity(this.player);
  }

};
//----------Time for some collsion functions
//collison type based on collison_map values includes all possible collision border combinations
Game.World.Collider = function() {
  this.collide = function(value, entity, tile_x, tile_y, tile_size) {
    switch(value) {
      case  1: this.collidePlatformTop      (entity, tile_y); break;
      case  2: this.collidePlatformRight    (entity, tile_x + tile_size); break;
      case  3: if (this.collidePlatformTop  (entity, tile_y)) return;// If there's a collision, we don't need to check for anything else.
               this.collidePlatformRight    (entity, tile_x + tile_size); break;
      case  4: this.collidePlatformBottom   (entity, tile_y + tile_size); break;
      case  5: if (this.collidePlatformTop  (entity, tile_y)) return;
               this.collidePlatformBottom   (entity, tile_y + tile_size); break;
      case  6: if (this.collidePlatformRight(entity, tile_x + tile_size)) return;
               this.collidePlatformBottom   (entity, tile_y + tile_size); break;
      case  7: if (this.collidePlatformTop  (entity, tile_y)) return;
               if (this.collidePlatformRight(entity, tile_x + tile_size)) return;
               this.collidePlatformBottom   (entity, tile_y + tile_size); break;
      case  8: this.collidePlatformLeft     (entity, tile_x); break;
      case  9: if (this.collidePlatformTop  (entity, tile_y)) return;
               this.collidePlatformLeft     (entity, tile_x); break;
      case 10: if (this.collidePlatformLeft (entity, tile_x)) return;
               this.collidePlatformRight    (entity, tile_x + tile_size); break;
      case 11: if (this.collidePlatformTop  (entity, tile_y)) return;
               if (this.collidePlatformLeft (entity, tile_x)) return;
               this.collidePlatformRight    (entity, tile_x + tile_size); break;
      case 12: if (this.collidePlatformLeft (entity, tile_x)) return;
               this.collidePlatformBottom   (entity, tile_y + tile_size); break;
      case 13: if (this.collidePlatformTop  (entity, tile_y)) return;
               if (this.collidePlatformLeft (entity, tile_x)) return;
               this.collidePlatformBottom   (entity, tile_y + tile_size); break;
      case 14: if (this.collidePlatformLeft (entity, tile_x)) return;
               if (this.collidePlatformRight(entity, tile_x)) return;
               this.collidePlatformBottom   (entity, tile_y + tile_size); break;
      case 15: if (this.collidePlatformTop  (entity, tile_y)) return;
               if (this.collidePlatformLeft (entity, tile_x)) return;
               if (this.collidePlatformRight(entity, tile_x + tile_size)) return;
               this.collidePlatformBottom   (entity, tile_y + tile_size); break;
    }
  }
};
Game.World.Collider.prototype = {
  constructor : Game.World.Collider,
  collidePlatformBottom:function(entity, tile_bottom) {
    if(entity.getTop() < tile_bottom && entity.getOldTop() >= tile_bottom) {
      entity.setTop(tile_bottom);
      entity.y_velocity = 0;
      return true;
    }return false;
  },
  collidePlatformLeft:function(entity, tile_left){
    if(entity.getRight() > tile_left && entity.getOldRight() <= tile_left){
      entity.setRight(tile_left -0.01);
      entity.x_velocity = 0;
      return true;
    }return false;
  },
  collidePlatformTop:function(entity, tile_top){
    if(entity.getBottom() > tile_top && entity.getOldBottom() <= tile_top){
      entity.setBottom(tile_top - 0.01);
      entity.y_velocity = 0;
      entity.jumping = false;
      return true;
    }return false;
  },
  collidePlatformRight:function(entity, tile_right){
    if(entity.getLeft() < tile_right && entity.getOldLeft() >= tile_right){
      entity.setLeft(tile_right);
      entity.x_velocity = 0;
      return true;
    }return false;
  }
};
Game.World.Entity = function(x, y, width, height) {
  this.height = height;
  this.width  = width;
  this.x      = x;
  this.x_old  = x;
  this.y      = y;
  this.y_old  = y;
};

Game.World.Entity.prototype = {
  constructor : Game.World.Entity,

  getBottom:   function()  { return this.y + this.height;},
  getLeft:     function()  { return this.x;},
  getRight:    function()  { return this.x + this.width;},
  getTop:      function()  { return this.y;},
  getOldBottom:function()  { return this.y_old + this.height;},
  getOldLeft:  function()  { return this.x_old; },
  getOldRight: function()  { return this.x_old + this.width;},
  getOldTop:   function()  { return this.y_old },
  setBottom:   function(y) { this.y = y - this.height;},
  setLeft:     function(x) { this.x = x; },
  setRight:    function(x) { this.x = x - this.width;},
  setTop:      function(y) { this.y = y; },
  setOldBottom:function(y) { this.y_old = y - this.height;},
  setOldLeft:  function(x) { this.x_old = x;},
  setOldRight: function(x) { this.x_old = x - this.width;},
  setOldTop:   function(y) { this.y_old = y;}
};
Game.World.Player = function(x, y) {
  Game.World.Entity.call(this, 100, 100, 45, 45);
  this.color = "red";
  this.jumping = true;
  this.x_velocity = 0;
  this.y_velocity = 0;
};
Game.World.Player.prototype = {
  jump:function() {
    if (!this.jumping) {
      this.jumping = true;
      this.velocity_y -= 50;
    }
  },
  moveLeft:function()  { this.velocity_x -= 0.5; },
  moveRight:function() { this.velocity_x += 0.5; },
  update:function() {
    this.x_old = this.x;
    this.y_old = this.y;
    this.x += this.velocity_x;
    this.y += this.velocity_y;
  }
};
Entity.assign(Game.World.Player.prototype, Game.World.Entity.prototype);
Game.World.Player.prototype.constructor = Game.World.Player;

const Controller = function() {
  this.left = new Controller.ButtonPress();
  this.right = new Controller.ButtonPress();
  this.up = new Controller.ButtonPress();
  
  this.keyDown = function(type, key) {
    var key_state = (type == "keydown")?true:false;
    switch(key) {
      case "a": this.left.getInput(key_state); break;
      case "d": this.right.getInput(key_state); break;
      case "w": this.up.getInput(key_state);
    }
  };
};
Controller.prototype = {
  constuctor : Controller
};
Controller.ButtonPress = function() {
  this.active = this.key_state = false;
};
Controller.ButtonPress.prototype = {
  constructor : Controller.ButtonPress,
  getInput : function(key_down) {
    if (this.key_down != key_down) this.active = key_down;
    this.keydown = key_down
  }
};
var update = function() {
  if (controller.left.active) {game.world.player.moveLeft();}
  if (controller.right.active) {game.world.player.moveRight();}
  if (controller.up.active) {game.world.player.jump(); controller.up.active = false;}
  game.update();
};
var controller = new Controller();
//     left:false,
//     right:false,
//     up:false,
//     keyListener:function(event) {
  
//       var key_state = (event.type == "keydown")?true:false;
  
//       switch(event.key) {
  
//         case "a":// left key
//           controller.left = key_state;
//         break;
//         case "w":// up key
//           controller.up = key_state;
//         break;
//         case "d":// right key
//           controller.right = key_state;
//         break;
//       }
//     }
// };
// gameLoop = function() {
//     ctx.clearRect(0, 0, game.width, game.height);
//     if (controller.up && mainChar.jumping == false) {
  
//         mainChar.y_velocity -= 40;
//         mainChar.jumping = true;
//     }
//     if (controller.left) {
  
//         mainChar.x_velocity -= 0.5;
//     }
//     if (controller.right) {
  
//       mainChar.x_velocity += 0.5;
  
//     }
//     mainChar.y_velocity += 1.5;// gravity
//     mainChar.x += mainChar.x_velocity;
//     mainChar.y += mainChar.y_velocity;
//     mainChar.x_velocity *= 0.9;// makes motion seem more real
//     mainChar.y_velocity *= 0.9;// 
  
//     // if mainChar is falling below floor line
//     if (mainChar.y > 720 - 24 - 48) {
  
//       mainChar.jumping = false;
//       mainChar.y = 720 - 24 - 48;
//       mainChar.y_velocity = 0;
  
//     }
//     // if mainChar is going off the left of the screen
//     if (mainChar.x < -48) {  
//         mainChar.x = 960;
//     } else if (mainChar.x > 960) {// if mainChar goes past right boundary
  
//       mainChar.x = -48;
  
//     }
//     mainChar.render();
//     platform.render();
//     world1.collide();
// };
// let gameTick = setInterval(gameLoop, 16)
// window.addEventListener("keydown", controller.keyListener);
// window.addEventListener("keyup", controller.keyListener);
// window.requestAnimationFrame(gameLoop);
// let world1 = new world();

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
// let platform = new Entity(48, 648, "grey", 48, 48);

// function Entity(x, y, color, width, height) {
//     this.x = x;
//     this.x_velocity = 0;
//     this.y = y;
//     this.y_velocity = 0;
//     this.jumping = false;
//     this.color = color;
//     this.width = width;
//     this.height = height;
//     this.alive = true;
//     this.render = function(){
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// };

// let mainChar = new Entity(432, 0, "red", 48, 48);
// mainChar.x_velocity = 0;
// mainChar.y_velocity = 0;
// let game = document.getElementById("game");
// let ctx = game.getContext("2d");
// game.width = 960;
// game.height = 720;