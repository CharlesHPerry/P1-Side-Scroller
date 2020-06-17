# P1-Side-Scroller
Side scrolling platformer where you are a cute little ghost person searching for your cute ghost love, but to find them you must traverse a hostle 2D envoroment.
## Main goals
- Create a side scrolling platformer where the player has the ability to jump to reach higher platforms, avoid "enemies" and clear gaps in platforms.
- Have two end game states, one of "Win" and "Lose" the win condition will be met when the player character collides with the "Love Interest" character. The "Lose" condiction will be met when the player character collides with an "enemy" that is blocking the path to the "Love Interest"
- The game should have the allusion of gravity, I plan to have the game check if the player is colliding with a platform, and if not, have the player y cordinates decrement. "jumping" should pause the "gravity" for a short time and at the same time should increment the players y cordinate by a set ammount.
## Strech Goals
- have the enemies move back and forth
- impliment "spike traps" that if the player touches it will end the game too
- impliment a key that needs to be collected to be able to unlock a cage that the "Love Intrest" is in so you can win.
![wire frame drawing] (IMG_5435.JPG)

## Current State of game
-As it stands the game has completed the main goals of the game, however the game still has a while to go before it is a enjoyable game to play, there is a substantial graphical glitch that is a result of the way that I have tried to go about implimenting the background image of the game. If I were to instead of trying to use transparent tiles to fill out the tile_map switch them out for tiles with custom designs on them to create a interesting world enviroment. The reason this behind this is that tile objects and the player object are drawing onto the canvas, but nowhere in my code do I have a function that can specifically target the player objects past drawings and remove them. However, the player object does not draw over any other objects and so the trail of past player drawings is not noticable.

- A second area of improvement for the game is the visual representaion of the Win and Lose conditions, currently they are meerly window alerts that inform the user if they have reached the goal or if the player has run into an enemy. This is compounded by the fact that if you run into either of the messages it fires the collision detection multiple times meaning that you need to reload the browser before you can continue moving. Most likely I will just have the player object sent back to the starting position so that they can restart without having to interupt gameplay. On acheiving the goal of the game I will most likely impliment a congratulatory visual that will also include a restart button.

## Photos of Game Play
![gameplay image] (GAMEPLAY_IMG.png)
![gameplay image2] (gameplay_img2.png)

- Overall, currently the game needs work, but it doesnt require much in the way of new logic to be able to be considered a decent and fun game to play, after I complete some updates to the win states and I have better sprite sheet I can overhaul the graphics of the game and make it look special.