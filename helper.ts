import * as TYPES from './types';
import Win from './Win'
import TileMap from "./TileMap";

export  const render = (state: TYPES.iState) => {
    const grid = new TileMap(state.boardLength);
    state.HashMap = hashMap(state.boardLength)
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

const hashMap = (length: number): TYPES.HashMap => {
    const map: TYPES.HashMap = new Map<string, string>()
    for(let i = 0; i < length; i++){
        for(let j = 0; j < length; j++){
            map.set(`{"x":${i}, "y":${j}}`, TYPES.TILECOLOR.EMPTY) 
        }
    }
    return map
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
        if(checkIfTileIsEmpty(coOrdinate, state.HashMap) 
        && state.gameLogicState 
        !== TYPES.DYNAMICTEXT.BLACKWIN 
        && state.gameLogicState 
        !== TYPES.DYNAMICTEXT.WHITEWIN){            
            el.classList.add(state.currentColorState.toLowerCase())
            el.classList.add('no-drop')
            state.HashMap?.set(coOrdinate, state.currentColorState)
            if(!checkForDraw(state)){
                console.log('draw')
                state.gameLogicState = TYPES.DYNAMICTEXT.DRAW;
                console.log(state)
                renderDynamicText(state)
            } 
            else if(checkForWin(state, e)){
                state.gameLogicState = state.currentColorState === TYPES.TILECOLOR.BLACK ? TYPES.DYNAMICTEXT.BLACKWIN : TYPES.DYNAMICTEXT.WHITEWIN
                renderDynamicText(state)
            }
            else{
                state.gameLogicState = state.currentColorState === TYPES.TILECOLOR.BLACK ? TYPES.DYNAMICTEXT.WHITE : TYPES.DYNAMICTEXT.BLACK
                renderDynamicText(state)
                state.currentColorState = toggleColor(state.currentColorState)
            }
        }
    }
}

const toggleColor = (arg: TYPES.TILECOLOR): TYPES.TILECOLOR => {
    return arg === TYPES.TILECOLOR.BLACK ? TYPES.TILECOLOR.WHITE : TYPES.TILECOLOR.BLACK
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



const checkForWin = (state: TYPES.iState, e?: any): boolean => {

        const returnRowLength = (total:number, rowDirection: TYPES.DIRECTIONCHECK): number => {
            const row = new Win(state ,e, rowDirection)
            return row.win + total
        }

        const winByDirection = (directionA: TYPES.DIRECTIONCHECK, directionB: TYPES.DIRECTIONCHECK): boolean => {
            if(Object.values(TYPES.DIRECTIONCHECK).filter((direction: TYPES.DIRECTIONCHECK)  => ((direction === directionA) || (direction === directionB))).reduce(returnRowLength, 0) === 6){
                return true
            }
            return false
        }

        // horizontal win condition
        if(winByDirection(TYPES.DIRECTIONCHECK.EAST, TYPES.DIRECTIONCHECK.WEST)) return true;

        // vertical win condition
        if(winByDirection(TYPES.DIRECTIONCHECK.NORTH, TYPES.DIRECTIONCHECK.SOUTH)) return true;

        // diagonal North East - South West win condition
        if(winByDirection(TYPES.DIRECTIONCHECK.NORTHEAST, TYPES.DIRECTIONCHECK.SOUTHWEST)) return true;

        // diagonal North West - South East win condition
        if(winByDirection(TYPES.DIRECTIONCHECK.NORTHWEST, TYPES.DIRECTIONCHECK.SOUTHEAST)) return true;

        return false
}

const checkForDraw = (state: TYPES.iState): number | boolean => {
        if(state.emptyTiles) state.emptyTiles = state.emptyTiles - 1;
        if(state.emptyTiles === 0)return false;     
        return true
}

const checkIfTileIsEmpty = (coOrdinate: string, HashMap :TYPES.HashMap): boolean => {
    return HashMap.get(coOrdinate) === TYPES.TILECOLOR.EMPTY
}




