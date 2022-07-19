export default class Tile {
    coordinate: string
    element: HTMLElement

    constructor(coordinate: string) {
        this.coordinate = coordinate;
        this.element = document.createElement('div');
        this.element.classList.add('tile');
        this.element.setAttribute('id', this.coordinate)
        this.element.classList.add('tile')
    }
    
}