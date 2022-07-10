export interface iState{
    currentColorState: string,
    winState: boolean,
    mapOfBoard: MapBoard,
    boardLength: number
}

export interface TargetElement{
    value: number 
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
    originalTile?: string
    winDirection? : WINCONDITIONS | void | undefined
}

export interface CheckMatchProps {
    map: MapBoard, 
    currentTile: string, 
    boardSize: number
}