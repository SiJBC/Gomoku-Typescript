
import * as TYPES from './types';
import * as WIN from './winHelpers'
import TileMap from "./TileMap";
import TileInfo from './TileInfo';




export  const render = (state: TYPES.iState) => {
    const grid = new TileMap(state.boardLength);
    state.mapOfBoard = mapBoard(state.boardLength)
    state.HashMap = hashMap(state.boardLength)
    state.boardArrMap = arrayOfBoard(state.boardLength)
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


const checkForWin = (state: TYPES.iState, e?: Event): boolean => {
       
        // diagonal win conditions
        if(WIN.diagonalNEWinAlg(state, e) + WIN.diagonalSWWinAlg(state, e) === 6){
            return true
        }

        if(WIN.diagonalNWWinAlg(state, e) + WIN.diagonalSEWinAlg(state, e) === 6){
            return true
        }
    
        // vertical win conditions
        if(WIN.northWinAlg(state, e) + WIN.southWinAlg(state, e) === 6){
            return true
        }

        // horizontal win conditions
        if(WIN.eastWinAlg(state, e) + WIN.westWinAlg(state, e) === 6){
            return true
        }

        return false
}



const handleClick =(state: TYPES.iState, e?: Event): void => {
    const el: HTMLElement = e?.target as HTMLElement
    if(el.classList.contains('tile')){
        const coOrdinate: string = el.dataset.coOrdinate as string
        if(checkIfTileIsEmpty(state.mapOfBoard, coOrdinate) 
        && state.gameLogicState 
        !== TYPES.DYNAMICTEXT.BLACKWIN 
        && state.gameLogicState 
        !== TYPES.DYNAMICTEXT.WHITEWIN){            
            el.classList.add(state.currentColorState.toLowerCase())
            el.classList.add('no-drop')
            state.mapOfBoard[coOrdinate] = state.currentColorState as TYPES.TILECOLOR
            state.HashMap?.set(coOrdinate, state.currentColorState)
            if(!checkForDraw(state)){
                state.gameLogicState = TYPES.DYNAMICTEXT.DRAW;
                renderDynamicText(state)
            } 

            console.log(checkForWin(state, e))
            // // diagonal win conditions
            // console.log(WIN.diagonalNEWinAlg(state, e))
            // console.log(WIN.diagonalSWWinAlg(state, e))
            // console.log(WIN.diagonalNWWinAlg(state, e))
            // console.log(WIN.diagonalSEWinAlg(state, e))

            // // vertical win conditions
            // console.log(WIN.northWinAlg(state, e))
            // console.log(WIN.southWinAlg(state, e))

            // // horizontal win conditions
            // console.log(WIN.eastWinAlg(state, e) + WIN.westWinAlg(state, e) === 6)
            // if(WIN.eastWinAlg(state, e) + WIN.westWinAlg(state, e) === 6){
            //     const winText: TYPES.DYNAMICTEXT = state.currentColorState === TYPES.TILECOLOR.WHITE ? TYPES.DYNAMICTEXT.WHITEWIN : TYPES.DYNAMICTEXT.BLACKWIN
            //     state.gameLogicState = winText
            //     renderDynamicText(state)
            //     console.log(state)
            //     if(state.currentColorState === TYPES.TILECOLOR.WHITE){
            //         state.gameLogicState = TYPES.DYNAMICTEXT.WHITEWIN
            //         console.log(state.gameLogicState)
            //         renderDynamicText(state)        
            //     }else{
            //         state.gameLogicState = TYPES.DYNAMICTEXT.BLACKWIN;
            //         renderDynamicText(state)
            //     }
            // }
            // console.log(WIN.eastWinAlg(state, e))
            // console.log(WIN.westWinAlg(state, e))


            state.gameLogicState = state.currentColorState === TYPES.TILECOLOR.BLACK ? TYPES.DYNAMICTEXT.WHITE : TYPES.DYNAMICTEXT.BLACK
            renderDynamicText(state)

            // toggle color for next player
            state.currentColorState = toggleColor(state.currentColorState)

        }
    }
}


const toggleColor = (arg: string): string => {
    return arg === TYPES.TILECOLOR.BLACK ? TYPES.TILECOLOR.WHITE : TYPES.TILECOLOR.BLACK
}




const checkForDraw = (state: TYPES.iState): number | boolean => {
        if(state.emptyTiles) state.emptyTiles = state.emptyTiles - 1;
        if(state.emptyTiles === 0)return false;     
        return true
}



const checkIfTileIsEmpty = (map: TYPES.MapBoard, coOrdinate: string): boolean => {
    return map[coOrdinate] === TYPES.TILECOLOR.EMPTY
}

export const arrayOfBoard = (length: number): TYPES.TileState[] => {
    let array: TYPES.TileState[] = []
    for(let i = 0; i < length; i++){
        for(let j = 0; j < length; j++){
            array.push
            (new TileInfo(TYPES.TILECOLOR.EMPTY, {x: i, y: j}).values)
        }
    }
    return array
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

export const hashMap = (length: number): TYPES.HashMap => {
    const map: TYPES.HashMap = new Map<string, string>()
    for(let i = 0; i < length; i++){
        for(let j = 0; j < length; j++){
            map.set(`{"x":${i}, "y":${j}}`, TYPES.TILECOLOR.EMPTY) 
        }
    }
    return map
}


