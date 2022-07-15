Author Simon Colman
Assignment 1 submission cosc360 University of New England.

A digital version of the popular board game Gomoku.

Gomoku or 5 in a row is an abstract strategy board game. It is traditionally played with black and white stones on a Go board. 

The this digital version of the game requires node.js to be installed to run.

To run the game open the root folder of the application:

* use npm install or yarn add 
* then npm or yarn start
* the game can be easily edited in the app.ts file to alter the size of the board.
* don't forget to push start

For the boards algorithm to run the minimum row length is 6 but board length theoretically has no maximum. I encourage you to test the limit of the browser capacity and once the application has loaded the game engine will function with a constant time complexity regardless of the size of the board. 

To manipulate the board size in the code is simple using the initialState object in the app.ts file. 

Try anySize > 6 just remember to press Start to begin the game. 

const state: TYPES.iState = {
    currentColorState: TYPES.TILECOLOR.BLACK,
    gameLogicState: TYPES.DYNAMICTEXT.DEFAULT,
    mapOfBoard: {},
**  boardLength: 6, *******
    winRow: [],
    emptyTiles: 0,
}

Additionally the board can be resized by hovering on the different buttons Small Medium and Large in the user interface once the server has been run and the application has started.

The application will begin with black player going first, once black player has placed the stone onto the board white player will be able to go. Then the turns will continue to alternate until a winner or draw is reached. 

The application will prompt the player that's turn it is, as well if a win or draw state is reached.

In addition to the standard game play I have added in the following features. 

* The board is resizable by hovering over the different buttons. 
* On victory the winning chain of stones will animate
* For time complexity the game uses a constant time complexity that will maintain over all board sizes. This is achieved By mapping the board with an object and utilizing object search notation of object['key'] which has a time complexity of 1(c). The only iteration is done by checking if there is a matching neighbour to the last stone placed but because the number of neighbours is constant as well the time complexity of the application remains at c. 
* The winning algorithm will only check if there is a match in the neighboring stones of the last stone placed. 



