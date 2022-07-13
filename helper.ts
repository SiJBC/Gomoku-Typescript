import * as TYPES from './types';
import TileMap from "./TileMap";


export  const render = (state: TYPES.iState) =>{
    const grid = new TileMap(state.boardLength);
    state.mapOfBoard = mapBoard(state.boardLength)
    state.emptyTiles = state.boardLength * state.boardLength
    document.body.append(grid.element)
    const start = document.getElementById('start')
    const reset = document.getElementById('reset')
    start?.addEventListener('click', function(e){
        handleStart(state, e)
        start.classList.add('hidden')
        reset?.classList.remove('hidden')
    })
    reset?.addEventListener('click', function(e){
        handleReset(state)
        reset.classList.add('hidden')
        start?.classList.remove('hidden')
    })
    Array.from({length: 3}).forEach((_, i) => {
        const btn = document.getElementById(`${i + 1}`)
        btn?.addEventListener('mouseenter', function(e){
            handleHover(state, e)
        }
        )
    })
}

const handleReset = (state: TYPES.iState) => {
    location.reload()
}

const handleStart = (state: TYPES.iState, e: MouseEvent) => {
    
    state.gameLogicState = TYPES.DYNAMICTEXT.BLACK
    renderDynamicText(state)
    const root = document.getElementById('root')
    root?.classList.remove('no-drop')
    root?.classList.add('grabbing')
    Array.from({length: 3}).forEach((_, i) => {
        const el = document.getElementById(`${i + 1}`)
        el?.classList.add('hidden')
    })
    root?.addEventListener('click', (e) => handleClick(state, e))
}

const renderDynamicText = (state: TYPES.iState) => {
    const dynamicEl = document.querySelector('.dynamic-text-content')
    if(dynamicEl){
        Array.from({length: Object.values(TYPES.DYNAMICTEXT).length}).forEach((_, i) => {
            if(state.gameLogicState === Object.values(TYPES.DYNAMICTEXT)[i])
            {
                dynamicEl.innerHTML = Object.values(TYPES.DYNAMICTEXT)[i] 
            }
        })
    }
}


const handleHover = (state: TYPES.iState, e: MouseEvent) => {
    const target = e.target as any
    state.boardLength = Number(target.dataset.value)
    const root = document.getElementById('root')
    Array.from({length: 3}).forEach((_, i) => {
        const el = document.getElementById(`${i + 1}`)
        el?.classList.remove('focus')
    })
    target.classList.add('focus')
    document.body.removeChild(root as HTMLElement)
    render(state)
}

const handleClick =(state: TYPES.iState, e?: Event): void => {
    const el: HTMLElement = e?.target as HTMLElement
    if(el.classList.contains('tile')){
        const coOrdinate: string = el.dataset.coOrdinate as string
        if(checkIfTileIsEmpty(state.mapOfBoard, coOrdinate) && state.gameLogicState !== TYPES.DYNAMICTEXT.BLACKWIN && state.gameLogicState !== TYPES.DYNAMICTEXT.WHITEWIN){
            const checkMatchProps : TYPES.CheckMatchProps = {
                map: state.mapOfBoard,
                currentTile: coOrdinate,
                boardSize: state.boardLength
            }
            
            el.classList.add(state.currentColorState.toLowerCase())
            el.classList.add('no-drop')
            state.mapOfBoard[coOrdinate] = state.currentColorState as TYPES.TILECOLOR
            state.gameLogicState = state.currentColorState === TYPES.TILECOLOR.BLACK ? TYPES.DYNAMICTEXT.WHITE : TYPES.DYNAMICTEXT.BLACK
            renderDynamicText(state)
            state.currentColorState = toggleColor(state.currentColorState)
            
            if(!checkForDraw(state)){
                state.gameLogicState = TYPES.DYNAMICTEXT.DRAW;
                renderDynamicText(state)
            } 

            if(checkIfMatchInNeighbour(checkMatchProps)){
                const checkWinProps: TYPES.CheckWinProps = {
                    tileForCheck: coOrdinate,
                    boardLength: state.boardLength,
                    mapOfBoard: state.mapOfBoard,
                    n: 0,
                    winDirection: checkMatchDirections(checkMatchProps),
                    winRow: [coOrdinate]
                }
                console.log(checkWinProps)
                    if(checkForWin(checkWinProps)){
                        state.gameLogicState == TYPES.DYNAMICTEXT.WHITE ? state.gameLogicState = TYPES.DYNAMICTEXT.BLACKWIN : state.gameLogicState = TYPES.DYNAMICTEXT.WHITEWIN
                        renderDynamicText(state)                        
                    }
            }
        }
    }
}


const toggleColor = (arg: string): string => {
    return arg === TYPES.TILECOLOR.BLACK ? TYPES.TILECOLOR.WHITE : TYPES.TILECOLOR.BLACK
}

const checkIfMatchInNeighbour = (props: TYPES.CheckMatchProps): boolean => {
    const { map, currentTile, boardSize } = props
    return returnNeighbours(currentTile, boardSize).map((neighbour) => {
        return map[neighbour]
    }).includes(map[currentTile])
}

const checkMatchDirections = (props: TYPES.CheckMatchProps): TYPES.WINCONDITIONS | void => {
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
        if(x != currentX && y < currentY){
            return TYPES.WINCONDITIONS.DIAGONALNE
        }
        if(x != currentX && y > currentY){
            return TYPES.WINCONDITIONS.DIAGONALNW
        }
    }        
}

const checkForDraw = (state: TYPES.iState): number | boolean => {
        if(state.emptyTiles) state.emptyTiles = state.emptyTiles - 1;
        if(state.emptyTiles === 0)return false;     
        return true
}

const checkForWin = (props: TYPES.CheckWinProps): boolean => {
    let { tileForCheck, boardLength, mapOfBoard, n, originalTile, winDirection, propsDirectionCheck, winRow } = props
    let neighboursCheck: string | undefined;
    const directionCheck = originalTile != undefined ? JSON.parse(originalTile).x - JSON.parse(tileForCheck).x : 0
    // winning animations
    if(n == 4 && propsDirectionCheck == directionCheck){
        for(const el of winRow){
            let elEl = document.getElementById(el)
            elEl?.classList.add('win')
        }
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
                        .find((element: string) => JSON.parse(element).y === y && 
                        mapOfBoard[element] === colorForCheck && element !== originalTile)
                        break;
            case TYPES.WINCONDITIONS.VERTICAL:
                neighboursCheck = returnNeighbours(tileForCheck, boardLength)
                        .find((element: string) => JSON.parse(element).x === x && 
                        mapOfBoard[element] === colorForCheck && 
                        element !== originalTile)
                        break;
            case TYPES.WINCONDITIONS.DIAGONALNE:
                 neighboursCheck = returnNeighbours(tileForCheck, boardLength)
                        .find((element: string) => JSON.parse(element).y === y -1 
                        && ((JSON.parse(element).x === x + 1 || JSON.parse(element).x === x - 1))
                        && mapOfBoard[element] === colorForCheck 
                        && element !== originalTile)
                        break;
            case TYPES.WINCONDITIONS.DIAGONALNW:
                neighboursCheck = returnNeighbours(tileForCheck, boardLength)
                        .find((element: string) => JSON.parse(element).y === y +1 
                        && ((JSON.parse(element).x === x + 1 || JSON.parse(element).x === x - 1))
                        && mapOfBoard[element] === colorForCheck 
                        && element !== originalTile)
                        break;
        }

        if(neighboursCheck){
            winRow.push(neighboursCheck)
            const newProps: TYPES.CheckWinProps = {
                tileForCheck: neighboursCheck,
                boardLength: boardLength,
                mapOfBoard: mapOfBoard,
                n: n,
                originalTile: tileForCheck,
                winDirection: winDirection,
                propsDirectionCheck: directionCheck,
                winRow: winRow
            }
           return checkForWin(newProps)
        }
    }
    winRow.length = 0 // reset winRow
    return false
}

const checkIfTileIsEmpty = (map: TYPES.MapBoard, coOrdinate: string): boolean => {
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


const returnNeighbours = (selectedTile: string, boardLength: number): string[] => {
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
            `{"x":${x}, "y":${y-1}}`
        ]
    }
    if(x == 0 && y == range){
        return[
            `{"x":${x}, "y":${y-1}}`,
            `{"x":${x+1}, "y":${y-1}}`,
            `{"x":${x+1}, "y":${y}}`,
            `{"x":${x-1}, "y":${y}}`,

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



