import TileMap from "./TileMap";
import * as HELPER from './helper'
import * as TYPES from './types'


const state: TYPES.iState = {
    currentColorState: TYPES.TILECOLOR.BLACK,
    winState: false,
    mapOfBoard: {}
}



document.body.onload = main

function main(): void {
    let {currentColorState, mapOfBoard} = state
    const grid = new TileMap(10);
    mapOfBoard = HELPER.mapBoard(10)

    document.body.append(grid.element)

    const root = document.getElementById('root')
    root?.addEventListener('click', function(e){
        handleClick(e)
    })

    function handleClick(e?: Event): void {
        const el: HTMLElement = e?.target as HTMLElement
        if(el.classList.contains('tile')){
            const coOrdinate: string = el.dataset.coOrdinate as string
            if(HELPER.checkIfTileIsEmpty(mapOfBoard, coOrdinate)){
                const checkMatchProps : TYPES.CheckMatchProps = {
                    map: mapOfBoard,
                    currentTile: coOrdinate,
                    boardSize: 10
                }
                
                el.classList.add(currentColorState.toLowerCase())
                mapOfBoard[coOrdinate] = currentColorState as TYPES.TILECOLOR
                currentColorState = HELPER.toggleColor(currentColorState)
                

                if(HELPER.checkIfMatchInNeighbour(checkMatchProps)){
                    const checkWinProps: TYPES.CheckWinProps = {
                        tileForCheck: coOrdinate,
                        boardLength: 10,
                        mapOfBoard: mapOfBoard,
                        n: 0,
                        winDirection: HELPER.checkMatchDirections(checkMatchProps)
                    }
                        console.log(HELPER.checkForWin(checkWinProps))
                }
            }
        }
    }
}








