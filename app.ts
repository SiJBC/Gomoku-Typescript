import * as HELPER from './helper'
import * as TYPES from './types'


const state: TYPES.iState = {
    currentColorState: TYPES.TILECOLOR.BLACK,
    winState: false,
    mapOfBoard: {},
    boardLength: 20,
}


document.body.onload = main

function main(): void {
    HELPER.render(state)
}








