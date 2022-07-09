import * as TYPES from './types';

export const toggleColor = (arg: string): string => {
    return arg === TYPES.TILECOLOR.BLACK ? TYPES.TILECOLOR.WHITE : TYPES.TILECOLOR.BLACK
}

export const checkIfMatchInNeighbour = (props: TYPES.CheckMatchProps): boolean => {
    const { map, currentTile, boardSize } = props
    return returnNeighbours(currentTile, boardSize).map((neighbour) => {
        return map[neighbour]
    }).includes(map[currentTile])
}

export const checkMatchDirections = (props: TYPES.CheckMatchProps): TYPES.WINCONDITIONS | void => {
    const { map, currentTile, boardSize } = props
    const matchingNeighbour: string | undefined = returnNeighbours(currentTile, boardSize).find((neighbour) => {
        return map[neighbour] === map[currentTile]
    })
    if(matchingNeighbour){
        const {x, y} = JSON.parse(matchingNeighbour as string)
        const {x: currentX, y: currentY} = JSON.parse(currentTile)
        if(x === currentX){
            return TYPES.WINCONDITIONS.VERTICAL
        }
        if(y === currentY){
            return TYPES.WINCONDITIONS.HORIZONTAL
        }
        if(x > currentX && y > currentY){
            return TYPES.WINCONDITIONS.DIAGONALNW
        }
        if(x < currentX && y < currentY){
            return TYPES.WINCONDITIONS.DIAGONALNE
        }
        if(x > currentX && y < currentY){
            return TYPES.WINCONDITIONS.DIAGONALNE
        }
        if(x < currentX && y > currentY){
            return TYPES.WINCONDITIONS.DIAGONALNW
        }
    }        
}

export const checkForWin = (props: TYPES.CheckWinProps): boolean => {
    let { tileForCheck, boardLength, mapOfBoard, n, originalTile, winDirection } = props
    let neighboursCheck: string | undefined;
    if(n == 4){
        return true
    }
    if(n != 4)
    {   
        n = n + 1
        const colorForCheck = mapOfBoard[tileForCheck]
        const {x, y} = JSON.parse(tileForCheck)
        switch(winDirection){
            case TYPES.WINCONDITIONS.HORIZONTAL:
                neighboursCheck = returnNeighbours(tileForCheck, boardLength)
                        .find((element: string) => JSON.parse(element).y === y && mapOfBoard[element] === colorForCheck && element !== originalTile)
                        break ;
            case TYPES.WINCONDITIONS.VERTICAL:
                neighboursCheck = returnNeighbours(tileForCheck, boardLength)
                        .find((element: string) => JSON.parse(element).x === x && 
                        mapOfBoard[element] === colorForCheck && 
                        element !== originalTile)
                        break;
            case TYPES.WINCONDITIONS.DIAGONALNE:
                 neighboursCheck = returnNeighbours(tileForCheck, boardLength)
                        .find((element: string) => JSON.parse(element).y === y -1 && mapOfBoard[element] === colorForCheck && element !== originalTile)
                        break;
            case TYPES.WINCONDITIONS.DIAGONALNW:
                neighboursCheck = returnNeighbours(tileForCheck, boardLength)
                        .find((element: string) => JSON.parse(element).y === y +1 && mapOfBoard[element] === colorForCheck && element !== originalTile)
                        break;
        }
        if(neighboursCheck){
            const newProps: TYPES.CheckWinProps = {
                tileForCheck: neighboursCheck,
                boardLength: boardLength,
                mapOfBoard: mapOfBoard,
                n: n,
                originalTile: tileForCheck,
                winDirection: winDirection
            }
           return checkForWin(newProps)
        }
    }
    return false
}

export const checkIfTileIsEmpty = (map: TYPES.MapBoard, coOrdinate: string): boolean => {
    return map[coOrdinate] === TYPES.TILECOLOR.EMPTY
}

export const mapBoard = (length: number): TYPES.MapBoard => {
    const map: TYPES.MapBoard = {}
    for(let i = 0; i < length; i++){
        for(let j = 0; j < length; j++){
            map[`{"x":${i}, "y":${j}}`] = TYPES.TILECOLOR.EMPTY
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



