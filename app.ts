import TileMap from "./TileMap";
import { TILECOLOR, colorTile, toggleColor, mapBoard, MapBoard } from './helper';

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
    console.log(mapOfBoard)


    document.body.append(grid.element)

    const root = document.getElementById('root')
    root?.addEventListener('click', function(e){
        const el: HTMLElement = e.target as HTMLElement
        if(el.classList.contains('tile')){
            const coOrdinate: string = el.dataset.coOrdinate as string
            if(currentColorState === TILECOLOR.BLACK){
                el.classList.add('black')
                currentColorState = toggleColor(currentColorState)
                mapOfBoard[coOrdinate] = TILECOLOR.BLACK
                console.log(mapOfBoard)
            }
            else
            {
                el.classList.add('white')
                currentColorState = toggleColor(currentColorState)
                mapOfBoard[coOrdinate] = TILECOLOR.WHITE
            }
        }
    })
}






