
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
      2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0,
      2, 5, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0,
      2, 1, 1, 9, 9, 9, 1, 1, 9, 9, 1, 9, 9, 1, 9, 9, 9, 9, 9, 0,
      2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0,
      2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0,
      2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 9, 0,
      2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0,
      2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0,
      2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 0,
      2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0,
      2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0,
      2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 9, 0,
      2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0,
      2, 9, 9, 9, 9, 9, 9, 0, 1, 2, 9, 9, 9, 9, 9, 3, 9, 9, 9, 0,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0];

  this.collision_map = [
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
      2, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
      2, 5, 3, 0, 0, 0, 5, 3, 0, 0, 15, 0, 0, 15, 0, 0, 0, 0, 0, 8,
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 8,
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 8,
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 8,
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
      2, 0, 0, 0, 0, 0, 0, 9, 1, 3, 0, 0, 0, 0, 0, 17, 0, 0, 0, 8,
      1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  this.height = this.rows * this.tile_size;
  this.width = this.columns * this.tile_size;
};

Game.World.prototype = {
  constuctor : Game.World,
  collideWithobject:function(object) {
    
    var value, top, right, bottom, left;
    
  
    
    top = Math.floor(object.getTop() / this.tile_size);
    left = Math.floor(object.getLeft() / this.tile_size);
    value = this.collision_map[top * this.columns + left];
    this.collider.collide(value, object, left * this.tile_size, top * this.tile_size, this.tile_size);
    
  
    
    top    = Math.floor(object.getTop()    / this.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_size);
    value  = this.collision_map[top * this.columns + right];
    this.collider.collide(value, object, right * this.tile_size, top * this.tile_size, this.tile_size);

  

    bottom = Math.floor(object.getBottom() / this.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_size);
    value  = this.collision_map[bottom * this.columns + left];
    this.collider.collide(value, object, left * this.tile_size, bottom * this.tile_size, this.tile_size);

  

    bottom = Math.floor(object.getBottom() / this.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_size);
    value  = this.collision_map[bottom * this.columns + right];
    this.collider.collide(value, object, right * this.tile_size, bottom * this.tile_size, this.tile_size);

  },
  update:function() {
    this.player.y_velocity += this.gravity;
    this.player.update();
    this.player.x_velocity *= this.friction;
    this.player.y_velocity *= this.friction;
    this.collideWithobject(this.player);
  }

};

Game.World.Collider = function() {
  this.collide = function(value, object, tile_x, tile_y, tile_size) {
    switch(value) {
      case  1: this.collidePlatformTop      (object, tile_y); break;
      case  2: this.collidePlatformRight    (object, tile_x + tile_size); break;
      case  3: if (this.collidePlatformTop  (object, tile_y)) return;
               this.collidePlatformRight    (object, tile_x + tile_size); break;
      case  4: this.collidePlatformBottom   (object, tile_y + tile_size); break;
      case  5: if (this.collidePlatformTop  (object, tile_y)) return;
               this.collidePlatformBottom   (object, tile_y + tile_size); break;
      case  6: if (this.collidePlatformRight(object, tile_x + tile_size)) return;
               this.collidePlatformBottom   (object, tile_y + tile_size); break;
      case  7: if (this.collidePlatformTop  (object, tile_y)) return;
               if (this.collidePlatformRight(object, tile_x + tile_size)) return;
               this.collidePlatformBottom   (object, tile_y + tile_size); break;
      case  8: this.collidePlatformLeft     (object, tile_x); break;
      case  9: if (this.collidePlatformTop  (object, tile_y)) return;
               this.collidePlatformLeft     (object, tile_x); break;
      case 10: if (this.collidePlatformLeft (object, tile_x)) return;
               this.collidePlatformRight    (object, tile_x + tile_size); break;
      case 11: if (this.collidePlatformTop  (object, tile_y)) return;
               if (this.collidePlatformLeft (object, tile_x)) return;
               this.collidePlatformRight    (object, tile_x + tile_size); break;
      case 12: if (this.collidePlatformLeft (object, tile_x)) return;
               this.collidePlatformBottom   (object, tile_y + tile_size); break;
      case 13: if (this.collidePlatformTop  (object, tile_y)) return;
               if (this.collidePlatformLeft (object, tile_x)) return;
               this.collidePlatformBottom   (object, tile_y + tile_size); break;
      case 14: if (this.collidePlatformLeft (object, tile_x)) return;
               if (this.collidePlatformRight(object, tile_x)) return;
               this.collidePlatformBottom   (object, tile_y + tile_size); break;
      case 15: if (this.collidePlatformTop  (object, tile_y)) return;
               if (this.collidePlatformLeft (object, tile_x)) return;
               if (this.collidePlatformRight(object, tile_x + tile_size)) return;
               this.collidePlatformBottom   (object, tile_y + tile_size); break;
      case 16: this.collideLoveInterest     (object, tile_x + tile_size); break;
      case 17: if (this.collideEnemyTop     (object, tile_y)) return;
               if (this.collideEnemyRight   (object, tile_x + tile_size)) return;
               this.collideEnemyLeft        (object, tile_x); break; 
    }
  }
};
Game.World.Collider.prototype = {
  constructor : Game.World.Collider,
  collidePlatformBottom:function(object, tile_bottom) {
    if(object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
      object.setTop(tile_bottom);
      object.y_velocity = 0;
      return true;
    }return false;
  },
  collidePlatformLeft:function(object, tile_left){
    if(object.getRight() > tile_left && object.getOldRight() <= tile_left){
      object.setRight(tile_left -0.01);
      object.x_velocity = 0;
      return true;
    }return false;
  },
  collidePlatformTop:function(object, tile_top){
    if(object.getBottom() > tile_top && object.getOldBottom() <= tile_top){
      object.setBottom(tile_top - 0.01);
      object.y_velocity = 0;
      object.jumping = false;
      return true;
    }return false;
  },
  collidePlatformRight:function(object, tile_right){
    if(object.getLeft() < tile_right && object.getOldLeft() >= tile_right){
      object.setLeft(tile_right);
      object.x_velocity = 0;
      return true;
    }return false;
  },
  collideLoveInterest:function(object, tile_right){
    if(object.getLeft() < tile_right && object.getOldLeft() >= tile_right){
      object.setLeft(tile_right);
      object.x_velocity = 0;
      object.x += 1;
      alert("Horray, you did the thing!");
      return true;
    }return false;
  },
  collideEnemyTop:function(object, tile_top){
    if(object.getBottom() < tile_top && object.getOldBottom() <= tile_top){
      object.setBottom(tile_top - 0.01);
      object.x_velocity = 0;
      object.x += 2
      alert("Whoops, you did a bad thing, restart.");
      return true;
    }return false;
  },
  collideEnemyRight:function(object, tile_right){
    if(object.getLeft() < tile_right && object.getOldLeft() >= tile_right){
      object.setLeft(tile_right + 2);
      object.x_velocity = 0;
      alert("Whoops, you did a bad thing, restart.");
      return true;
    }return false;
  },
  collideEnemyLeft:function(object, tile_left){
    if(object.getRight() > tile_left && object.getOldRight() >= tile_left){
      object.setRight(tile_left - 2);
      object.x_velocity = 0;
      alert("Whoops, you did a bad thing, restart.")
      return true;
    }return false;
  }
};
Game.World.Object = function(x, y, width, height) {
  this.height = height;
  this.width  = width;
  this.x      = x;
  this.x_old  = x;
  this.y      = y;
  this.y_old  = y;
};

Game.World.Object.prototype = {
  constructor : Game.World.Object,

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
  Game.World.Object.call(this, 51, 625, 45, 45);
  this.color = "red";
  this.jumping = true;
  this.x_velocity = 0;
  this.y_velocity = 0;
};
Game.World.Player.prototype = {
  jump:function() {
    console.log("jump");
    if (!this.jumping) {
      this.jumping = true;
      this.y_velocity -= 50;
    }
  },
  game_win:function(){
    if(game.world.player.x > 96 && game.world.player.y > 46) {
      console.log("Congrats You did the thing!")
    }
  },
  moveLeft:function()  { this.x_velocity -= 0.5; console.log("move left"); },
  moveRight:function() { this.x_velocity += 0.5; console.log("move right");},
  update:function() {
    this.x_old = this.x;
    this.y_old = this.y;
    this.x += this.x_velocity;
    this.y += this.y_velocity;
  }
};

const Controller = function() {
  this.left = new Controller.ButtonPress();
  this.right = new Controller.ButtonPress();
  this.up = new Controller.ButtonPress();
  
  this.keyDown = function(type, key_code) {
    var key_state = (type == "keydown")?true:false;
    switch(key_code) {
      case 65: this.left.getInput(key_state); break;
      case 68: this.right.getInput(key_state); break;
      case 87: this.up.getInput(key_state);
    }
  };
};
Controller.prototype = {
  constructor : Controller
};
Controller.ButtonPress = function() {
  this.active = this.key_state = false;
};
Controller.ButtonPress.prototype = {
  constructor : Controller.ButtonPress,
  getInput : function(key_down) {
    if (this.key_down != key_down) this.active = key_down;
    this.keyDown = key_down
  }
};
var controller = new Controller();

Object.assign(Game.World.Player.prototype, Game.World.Object.prototype);
Game.World.Player.prototype.constructor = Game.World.Player;
