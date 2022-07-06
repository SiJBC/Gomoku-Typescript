export enum STATUS {
    WHITE = 'WHITE',
    BLACK = 'BLACK',
    EMPTY = 'EMPTY'
}


export default class Tile {
    status: STATUS
    coordinate: string
    element: HTMLElement

    constructor(coordinate: string, status: STATUS) {
        this.status = status
        this.coordinate = coordinate;
        this.element = document.createElement('div');
        this.element.classList.add('tile');
        this.element.setAttribute('data-co-ordinate', this.coordinate);
        this.element.classList.add('tile')
        this.element.addEventListener('click', () => {
            console.log(this.coordinate)
        })
    }

    handleClick() {
        if (this.status === STATUS.EMPTY) return
        this.element.classList.remove(this.status.toLowerCase())
        this.status =
          this.status === STATUS.WHITE ? STATUS.WHITE : STATUS.BLACK
        this.element.classList.add(this.status.toLowerCase())
      }

}