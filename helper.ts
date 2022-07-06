
export enum TILECOLOR {
    WHITE = 'WHITE',
    BLACK = 'BLACK',
    EMPTY = 'EMPTY'
}

export interface MapBoard {
    [key: string]: TILECOLOR
}


export const colorTile  = (arg: string): string => {
    return arg === TILECOLOR.BLACK ? TILECOLOR.BLACK.toLowerCase() : TILECOLOR.WHITE.toLowerCase()
}

export const toggleColor = (arg: string): string => {
    return arg === TILECOLOR.BLACK ? TILECOLOR.WHITE : TILECOLOR.BLACK
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

export const returnNeighbours = (selectedTile: string): string[] => {
    console.log(selectedTile)
    const {x, y} = JSON.parse(selectedTile)
    if((x > 0 && x < 9) && (y > 0 && y < 9))
    {
        console.log('a')
            return [`{x:${x-1}, y:${y-1}}`,
                    `{x:${x-1}, y:${y}}`,
                    `{x:${x-1}, y:${y+1}}`,
                    `{x:${x}, y:${y-1}}`, 
                    `{x:${x}, y:${y+1}}`,
                    `{x:${x+1}, y:${y-1}}`,                    
                    `{x:${x+1}, y:${y}}`,
                    `{x:${x+1}, y:${y+1}}`]
    
    }
    if((x == 0) && (y > 0 && y < 9))
    {
        console.log('b')
            return [`{x:${x}, y:${y-1}}`,
                    `{x:${x}, y:${y+1}}`,
                    `{x:${x+1}, y:${y-1}}`,
                    `{x:${x+1}, y:${y}}`,
                    `{x:${x+1}, y:${y+1}}`,
            ]       
    
    }
    if((x > 0 && x < 9) && (y == 0))
    {
        console.log('c')
            return [
            `{x:${x-1}, y:${y}}`,
            `{x:${x-1}, y:${y+1}}`,
            `{x:${x}, y:${y+1}}`,
            `{x:${x+1}, y:${y}}`,
            `{x:${x+1}, y:${y+1}}`,
            ]       
    
    }

    if((x == 0) && (y == 0)){
        return[
            `{x:${x}, y:${y+1}}`,
            `{x:${x+1}, y:${y}}`,
            `{x:${x+1}, y:${y+1}}`,
        ]
    }
    if((x == 9) && (y > 0)){
        return[
            `{x:${x-1}, y:${y}}`,
            `{x:${x-1}, y:${y+1}}`,
            `{x:${x}, y:${y+1}}`,
        ]
    }
    return []
}



