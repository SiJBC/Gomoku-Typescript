import {render} from './helper'
import * as TYPES from './types'


const state: TYPES.iState = {
    currentColorState: TYPES.TILECOLOR.BLACK,
    gameLogicState: TYPES.DYNAMICTEXT.DEFAULT,
    mapOfBoard: {},
    boardLength: 6,
    winRow: []
}


document.body.onload = main

function main(): void {
    render(state)
}








