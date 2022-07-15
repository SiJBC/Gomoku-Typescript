
export interface iState{
    currentColorState: string,
    gameLogicState: DYNAMICTEXT,
    mapOfBoard: MapBoard,
    boardLength: number,
    boardArrMap: TileState[]
    winRow?: string[]
    emptyTiles?: number,
    hashMap?: Map<string, string>,
}

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


export interface CheckWinProps {
    tileForCheck: string,
    boardLength: number,
    mapOfBoard: MapBoard,
    arrayOfBoard?: string[],
    n: number,
    originalTile?: string,
    winDirection? : WINCONDITIONS | void | undefined
    propsDirectionCheck?: number,
    winRow: any[],
}

export interface CheckMatchProps {
    map: MapBoard, 
    currentTile: string, 
    boardSize: number
}