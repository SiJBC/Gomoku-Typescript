import Tile from './Tile'

export default class Row {
    tiles: Tile[]
    element: HTMLElement

    constructor(lengthX: number, rowNumber: number) {
        this.tiles = Array.from({length: lengthX}).map((_, index) => {
            const tileCoordinate = `{"x":${index}, "y":${rowNumber}}`
            return new Tile(tileCoordinate)
        })
        this.element = document.createElement('div')
        this.element.classList.add('flex')
        this.element.append(...this.tiles.map(tile => tile.element))
    }
    
}