Author Simon Colman

A digital version of the popular board game Gomoku.

Gomoku or 5 in a row is an abstract strategy board game. It is traditionally played with black and white stones on a Go board. 

This digital version of the game requires node.js to be installed to run.

* to check if node is installed run the command node --v in the command line. If this command returns a version number node has been installed.

To run the game open the root folder of the application:

* use npm install or yarn add 
* then npm or yarn start
* the game can be easily edited in the app.ts file to alter the size of the board.
* Once the board length has been selected make sure you push start to begin the game

For the boards algorithm to run the minimum row length is 6 but board length theoretically has no maximum. I encourage you to test the limit of the browser capacity and once the application has loaded the game engine will function with a constant time complexity regardless of the size of the board. 

To manipulate the board size in the code is simple using the iState object in the app.ts file. 

const state: TYPES.iState = {
    currentColorState: TYPES.TILECOLOR.BLACK,
    gameLogicState: TYPES.DYNAMICTEXT.DEFAULT,
***boardLength: 6,***
    emptyTiles: 0,
    HashMap: new Map<string, string>(),
}

Additionally the board can be resized by hovering on the different buttons Small Medium and Large in the user interface once the server has been run and the application has started.

The application will begin with black player going first, once black player has placed the stone onto the board white player will be able to go. Then the turns will continue to alternate until a winner or draw is reached. 

The application will prompt the player that's turn it is, as well if a win or draw state is reached.

In addition to the standard game play I have added in the following features. 

* The board is resizable by clicking the different buttons increasing the ux capability. 
* For time complexity the game uses a constant time complexity to check if the win has been achieved. The only iteration is done by checking on initial render which makes the game time complexity at linear. This is achieved by utilizing map data structures, map data structures use the get() method that has a time complexity of 0(1). The algorithm will maximum check the nearest 5 tiles in any of 8 directions with each check have a (1) time complexity. So the time complexity will remain the same regardless of the size of the board. 




