import Row from './Row'

export default class TileMap {
    rows: Row[]
    element: HTMLElement
    constructor(boardLength: number){
        if(boardLength < 6){
            throw new Error('Board length must be at least 6')
        }
        this.rows = Array.from({ length: boardLength }).map((_, index) => {
            return new Row(boardLength, index)
        })
        this.element = document.createElement('div')
        this.element.setAttribute('id', 'root')
        this.element.classList.add('no-drop')
        this.element.setAttribute('style', `height: ${boardLength * 3}rem; width: ${boardLength * 3}rem`)  
        this.element.append(...this.rows.map(row => row.element))
    }
}