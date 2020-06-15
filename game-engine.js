// game-engine.js is responsible for updating the game basically an over complicated set interval.
//but it means the game will run at a constant speed and is better for different cpu capabilites
//https://gameprogrammingpatterns.com/game-loop.html

const Engine = function(time_step, update, render) {
    this.accumulated_time = 0;
    this.animation_frame_request = undefined,
    this.time = undefined,
    this.time_step = time_step, //30 frames per second
    this.updated = false; // if the update function has been called or not
    this.update = update; //update function
    this,render = render;// render function
    this.run = function(time_stamp){// one cycle of the game loop
        this.accumulated_time += time_stamp - this.time;
        this.time = time_stamp;
        //if the device is slow we need to make sure no more than a few frames pass before the next update else the Cpu may overload
        if (this.accumulated_time >= this.time_step * 3) {
            this.accumulated_time = this.time_step;
        }
    
    //must wait for window to be ready to draw and requestAnimationFrame
    //so check to see that enough time has passed
        while(this.accumulated_time >= this.time_step) {
            this.accumulated_time -= this.time_step;
            this.update(time_stamp);
            this.updated = true; // allows for game to draw again
        }
        if (this.updated) {
            this.updated = false;
            this.render(time_stamp);
        }
        this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
    }
    this.handleRun = (time_step) => {this.run(time_step); };
};
Engine.prototype = {
    constructor : Engine,
    start:function() {
        this.accumulated_time = this.time_step;
        this.time = window.performance.now();
        this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
    },
    stop:function(){window.cancelAnimationFrame(this.animation_frame_request);}
};