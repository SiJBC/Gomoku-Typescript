import * as TYPES from './types'

export const cleanUp = (sortedArray?: string[], referenceObject?: TYPES.MapBoard, winRow?: string[]): void => {
    winRow = []
    sortedArray = []
    referenceObject = {}  
}

export const horizontalWinAlg = ( sortedArray?: string[], referenceObject?: TYPES.MapBoard, winRow?: string[]): void => {
    if(sortedArray && referenceObject && winRow){
    sortedArray.forEach((element: any) => {
        const {x,y} = JSON.parse(element.coordinate)
        const left = JSON.stringify({x:x - 1,y:y})
        if(referenceObject.hasOwnProperty(left)){
            winRow.push(left)
            const right = JSON.stringify({x:x+1, y:y})
            if(referenceObject.hasOwnProperty(right)){
                winRow.push(right)
            }
        } 
    })
    }
}

export const verticalWinAlg = ( sortedArray?: string[], referenceObject?: TYPES.MapBoard, winRow?: string[]): void => {
    if(sortedArray && referenceObject && winRow){
    sortedArray.forEach((element: any) => {
        const {x,y} = JSON.parse(element.coordinate)
        const up = JSON.stringify({x:x,y:y-1})
        if(referenceObject.hasOwnProperty(up)){
            winRow.push(up)
            const down = JSON.stringify({x:x, y:y+1})
            if(referenceObject.hasOwnProperty(down)){
                winRow.push(down)
            }
        } 
    })
    }
}
// diagonalNEWinAlg
export const diagonalNEWinAlg = ( sortedArray?: string[], referenceObject?: TYPES.MapBoard, winRow?: string[]): void => {
    let diagonalNEWin = false
    if(sortedArray && referenceObject && winRow){
    sortedArray.forEach((element: any) => {
        const {x,y} = JSON.parse(element.coordinate)
        const upLeft = JSON.stringify({x:x+1,y:y+1})
        if(referenceObject.hasOwnProperty(upLeft)){
            winRow.push(upLeft)
            const downRight = JSON.stringify({x:x-1, y:y-1})
            if(referenceObject.hasOwnProperty(downRight)){
                winRow.push(downRight)
            }
        } 
    })
    }
}

export const diagonalNWWinAlg = ( sortedArray?: string[], referenceObject?: TYPES.MapBoard, winRow?: string[]): void => {
    if(sortedArray && referenceObject && winRow){
    sortedArray.forEach((element: any) => {
        const {x,y} = JSON.parse(element.coordinate)
        const upRight = JSON.stringify({x:x+1,y:y-1})
        if(referenceObject.hasOwnProperty(upRight)){
            winRow.push(upRight)
            const downLeft = JSON.stringify({x:x-1, y:y+1})
            if(referenceObject.hasOwnProperty(downLeft)){
                winRow.push(downLeft)
            }
        } 
    })
    }
}

export const updateBoardArray = (state: TYPES.iState, coOrdinate: string, color: TYPES.TILECOLOR): void => {
    const {x,y} = JSON.parse(coOrdinate)
    state.boardArrMap.forEach((tile) => {
        const temp = JSON.parse(tile.coordinate)
        if(temp.x === x && temp.y === y){
            tile.state = color
        }
    })    
}