
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

export const toggleColor = (arg: string): string => {
    return arg === TILECOLOR.BLACK ? TILECOLOR.WHITE : TILECOLOR.BLACK
}

export const checkIfMatchInNeighbour = (map: MapBoard, currentTile: string, boardSize: number): boolean => {
    return returnNeighbours(currentTile, boardSize).map((neighbour) => {
        return map[neighbour]
    }).includes(map[currentTile])
}

export const checkRepeatDirectionMatch = (currentDirection: WINCONDITIONS, tileCheck: string): boolean => {
    return true
}

export const checkMatchDirections = (map: MapBoard, currentTile: string, boardSize: number): WINCONDITIONS | void => {
    const matchingNeighbour: string | undefined = returnNeighbours(currentTile, boardSize).find((neighbour) => {
        return map[neighbour] === map[currentTile]
    })
        const {x, y} = JSON.parse(matchingNeighbour as string)
        const {x: currentX, y: currentY} = JSON.parse(currentTile)
        if(x === currentX){
            return WINCONDITIONS.VERTICAL
        }
        if(y === currentY){
            return WINCONDITIONS.HORIZONTAL
        }
        if(x > currentX && y > currentY){
            return WINCONDITIONS.DIAGONALNW
        }
        if(x < currentX && y < currentY){
            return WINCONDITIONS.DIAGONALNE
        }
        if(x > currentX && y < currentY){
            return WINCONDITIONS.DIAGONALNE
        }
        if(x < currentX && y > currentY){
            return WINCONDITIONS.DIAGONALNW
        }
}

export const checkIfTileIsEmpty = (map: MapBoard, coOrdinate: string): boolean => {
    return map[coOrdinate] === TILECOLOR.EMPTY
}

export const mapBoard = (length: number): MapBoard => {
    const map: MapBoard = {}
    for(let i = 0; i < length; i++){
        for(let j = 0; j < length; j++){
            map[`{"x":${i}, "y":${j}}`] = TILECOLOR.EMPTY
        }
    }
    return map
}


export const returnNeighbours = (selectedTile: string, boardLength: number): string[] => {
    const range = boardLength - 1
    const {x, y} = JSON.parse(selectedTile)
    if((x > 0 && x < range) && (y > 0 && y < range))
    { 
            return [`{"x":${x-1}, "y":${y-1}}`,
                    `{"x":${x-1}, "y":${y}}`,
                    `{"x":${x-1}, "y":${y+1}}`,
                    `{"x":${x}, "y":${y-1}}`, 
                    `{"x":${x}, "y":${y+1}}`,
                    `{"x":${x+1}, "y":${y-1}}`,                    
                    `{"x":${x+1}, "y":${y}}`,
                    `{"x":${x+1}, "y":${y+1}}`]
    
    }
    if((x == 0) && (y > 0 && y < range))
    {
            return [`{"x":${x}, "y":${y-1}}`,
                    `{"x":${x}, "y":${y+1}}`,
                    `{"x":${x+1}, "y":${y-1}}`,
                    `{"x":${x+1}, "y":${y}}`,
                    `{"x":${x+1}, "y":${y+1}}`,
            ]       
    }
    if((x > 0 && x < range) && (y == 0))
    {
            return [
            `{"x":${x-1}, "y":${y}}`,
            `{"x":${x-1}, "y":${y+1}}`,
            `{"x":${x}, "y":${y+1}}`,
            `{"x":${x+1}, "y":${y}}`,
            `{"x":${x+1}, "y":${y+1}}`,
            ]       
    }
    if((x == 0) && (y == 0)){
        return[
            `{"x":${x}, "y":${y+1}}`,
            `{"x":${x+1}, "y":${y}}`,
            `{"x":${x+1}, "y":${y+1}}`,
        ]
    }
    if((x == range) && (y > 0)){
        return[
            `{"x":${x-1}, "y":${y}}`,
            `{"x":${x-1}, "y":${y+1}}`,
            `{"x":${x}, "y":${y+1}}`,
        ]
    }
    if(x == 0 && y == range){
        return[
            `{"x":${x}, "y":${y-1}}`,
            `{"x":${x+1}, "y":${y-1}}`,
            `{"x":${x+1}, "y":${y}}`,
        ]
    }
    if(x == range && y == range){
        return[
            `{"x":${x-1}, "y":${y}}`,
            `{"x":${x-1}, "y":${y-1}}`,
            `{"x":${x}, "y":${y-1}}`,
        ]
    }
    return []
}



