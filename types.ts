export interface iState{
    currentColorState: string,
    gameLogicState: DYNAMICTEXT,
    mapOfBoard: MapBoard,
    boardLength: number,
    winRow?: string[]
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

export interface CheckWinProps {
    tileForCheck: string,
    boardLength: number,
    mapOfBoard: MapBoard,
    n: number,
    originalTile?: string,
    winDirection? : WINCONDITIONS | void | undefined
}

export interface CheckMatchProps {
    map: MapBoard, 
    currentTile: string, 
    boardSize: number
}