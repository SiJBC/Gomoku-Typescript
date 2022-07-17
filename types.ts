export interface iState{
    currentColorState: string,
    gameLogicState: DYNAMICTEXT,
    mapOfBoard: MapBoard,
    boardLength: number,
    emptyTiles?: number,
    HashMap?: HashMap,
}

export type HashMap = Map<string, string>
export interface TileCoordinates{
    x: number,
    y: number
}
export interface TileState{
    state: TILECOLOR,
    coordinate: string
}
export interface TargetElement{
    value: number 
}

export enum DYNAMICTEXT {
    WHITE = 'white player move',
    BLACK = 'black player move',
    BLACKWIN = 'black player has won',
    WHITEWIN = 'white player has won',
    DRAW = 'draw',
    DEFAULT = 'Select the board size'
}

export enum TILECOLOR {
    WHITE = 'WHITE',
    BLACK = 'BLACK',
    EMPTY = 'EMPTY'
}

export enum WINCONDITIONS {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
    DIAGONALNE = 'DIAGONALNE',
    DIAGONALNW = 'DIAGONALNW',
}
export interface MapBoard {
    [key: string]: TILECOLOR
}

