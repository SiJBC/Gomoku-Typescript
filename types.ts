export interface iState{
    currentColorState: TILECOLOR,
    gameLogicState: DYNAMICTEXT,
    boardLength: number,
    emptyTiles?: number,
    HashMap: HashMap,
}

export type HashMap = Map<string, string>

export type EventObject = {
    target: HTMLElement
}

export enum DIRECTIONCHECK{
    EAST = 'east',
    WEST = 'west',
    NORTH = 'north',
    SOUTH = 'south',
    NORTHEAST = 'northeast',
    NORTHWEST = 'northwest',
    SOUTHEAST = 'southeast',
    SOUTHWEST = 'southwest',
}
export interface TileCoordinates{
    x: number,
    y: number
}
export interface TileState{
    state: TILECOLOR,
    coordinate: string
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

