import {render} from './helper'
import * as TYPES from './types'


const state: TYPES.iState = {
    currentColorState: TYPES.TILECOLOR.BLACK,
    gameLogicState: TYPES.DYNAMICTEXT.DEFAULT,
    mapOfBoard: {},
    boardArrMap: [],
    boardLength: 6,
    winRow: [],
    emptyTiles: 0,
}


document.body.onload = main

function main(): void {
    render(state)
}










