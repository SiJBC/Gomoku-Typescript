import TileMap from "./TileMap";
import { TILECOLOR, toggleColor, mapBoard, MapBoard, returnNeighbours, checkIfTileIsEmpty, checkIfMatchInNeighbour, checkMatchDirections, checkHorizontalWin, WINCONDITIONS, checkVerticalWin, checkDiagonalNeWin, checkDiagonalNwWin  } from './helper';

interface iState{
    currentColorState: string,
    winState: boolean,
    mapOfBoard: MapBoard
}

const state: iState = {
    currentColorState: TILECOLOR.BLACK,
    winState: false,
    mapOfBoard: {}
}



document.body.onload = main

function main(): void {
    let {currentColorState, mapOfBoard} = state
    const grid = new TileMap(10);
    mapOfBoard = mapBoard(10)

    document.body.append(grid.element)

    const root = document.getElementById('root')
    root?.addEventListener('click', function(e){
        handleClick(e)
    })

    function handleClick(e?: Event): void {
        const el: HTMLElement = e?.target as HTMLElement
        if(el.classList.contains('tile')){
            const coOrdinate: string = el.dataset.coOrdinate as string
            if(checkIfTileIsEmpty(mapOfBoard, coOrdinate)){
                if(currentColorState === TILECOLOR.BLACK){
                    el.classList.add('black')
                    currentColorState = toggleColor(currentColorState)
                    mapOfBoard[coOrdinate] = TILECOLOR.BLACK
                    if(checkIfMatchInNeighbour(mapOfBoard, coOrdinate, 10)){
                        if(checkMatchDirections(mapOfBoard, coOrdinate, 10) === WINCONDITIONS.HORIZONTAL){
                            console.log(checkHorizontalWin(coOrdinate, 10,  mapOfBoard, 0))
                        }
                        if(checkMatchDirections(mapOfBoard, coOrdinate, 10) === WINCONDITIONS.VERTICAL){
                            console.log(checkVerticalWin(coOrdinate, 10,  mapOfBoard, 0))
                        }
                        if(checkMatchDirections(mapOfBoard, coOrdinate, 10) === WINCONDITIONS.DIAGONALNE){
                            console.log(checkDiagonalNeWin(coOrdinate, 10,  mapOfBoard, 0))
                        }
                        if(checkMatchDirections(mapOfBoard, coOrdinate, 10) === WINCONDITIONS.DIAGONALNW){
                            console.log(checkDiagonalNwWin(coOrdinate, 10,  mapOfBoard, 0))
                        }
                    }
                }
                else
                {
                    el.classList.add('white')
                    currentColorState = toggleColor(currentColorState)
                    mapOfBoard[coOrdinate] = TILECOLOR.WHITE
                    if(checkIfMatchInNeighbour(mapOfBoard, coOrdinate, 10)){
                        console.log(checkMatchDirections(mapOfBoard, coOrdinate, 10))
                    }
                }
            }
        }
    }
}








