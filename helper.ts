
export enum TILECOLOR {
    WHITE = 'WHITE',
    BLACK = 'BLACK',
    EMPTY = 'EMPTY'
}

export interface MapBoard {
    [key: string]: TILECOLOR
}

export const toggleColor = (arg: string): string => {
    return arg === TILECOLOR.BLACK ? TILECOLOR.WHITE : TILECOLOR.BLACK
}

export const checkIfWin = (map: MapBoard): boolean => {
    return true
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
    console.log(selectedTile)
    const range = boardLength - 1
    console.log(range)
    const {x, y} = JSON.parse(selectedTile)
    if((x > 0 && x < range) && (y > 0 && y < range))
    {
            return [`{x:${x-1}, y:${y-1}}`,
                    `{x:${x-1}, y:${y}}`,
                    `{x:${x-1}, y:${y+1}}`,
                    `{x:${x}, y:${y-1}}`, 
                    `{x:${x}, y:${y+1}}`,
                    `{x:${x+1}, y:${y-1}}`,                    
                    `{x:${x+1}, y:${y}}`,
                    `{x:${x+1}, y:${y+1}}`]
    
    }
    if((x == 0) && (y > 0 && y < range))
    {
            return [`{x:${x}, y:${y-1}}`,
                    `{x:${x}, y:${y+1}}`,
                    `{x:${x+1}, y:${y-1}}`,
                    `{x:${x+1}, y:${y}}`,
                    `{x:${x+1}, y:${y+1}}`,
            ]       
    
    }
    if((x > 0 && x < range) && (y == 0))
    {
            return [
            `{x:${x-1}, y:${y}}`,
            `{x:${x-1}, y:${y+1}}`,
            `{x:${x}, y:${y+1}}`,
            `{x:${x+1}, y:${y}}`,
            `{x:${x+1}, y:${y+1}}`,
            ]       
    
    }
    if((x == 0) && (y == 0)){
        console.log('d')
        return[
            `{x:${x}, y:${y+1}}`,
            `{x:${x+1}, y:${y}}`,
            `{x:${x+1}, y:${y+1}}`,
        ]
    }
    if((x == range) && (y > 0)){
        console.log('e')
        return[
            `{x:${x-1}, y:${y}}`,
            `{x:${x-1}, y:${y+1}}`,
            `{x:${x}, y:${y+1}}`,
        ]
    }
    if(x == 0 && y == range){
        console.log('f')
        return[
            `{x:${x}, y:${y-1}}`,
            `{x:${x+1}, y:${y-1}}`,
            `{x:${x+1}, y:${y}}`,
        ]
    }
    if(x == range && y == range){
        console.log('f')
        return[
            `{x:${x-1}, y:${y}}`,
            `{x:${x-1}, y:${y-1}}`,
            `{x:${x}, y:${y-1}}`,
        ]
    }
    return []
}



