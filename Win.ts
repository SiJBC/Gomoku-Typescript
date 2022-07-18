import * as TYPES from './types'
export default class Win {
    target: string | undefined
    state: TYPES.iState
    x: number
    y:number
    n:number
    eastTile: string 
    westTile: string
    northTile: string
    southTile: string
    southeastTile: string
    northeastTile: string
    northwestTile: string
    southwestTile: string
    direction: TYPES.DIRECTIONCHECK
    winningRowArr: string


    constructor(state: TYPES.iState, e: TYPES.EventObject | undefined, direction : TYPES.DIRECTIONCHECK){
        this.direction = direction 
        this.target = e?.target?.id
        this.state = state
        this.x = this.target != undefined ? JSON.parse(this.target).x : 0
        this.y = this.target != undefined ? JSON.parse(this.target).y : 0
        this.n = 1
        this.eastTile = `{\"x\":${this.x+this.n}, \"y\":${this.y}}`
        this.westTile = `{\"x\":${this.x-this.n}, \"y\":${this.y}}`
        this.northTile = `{\"x\":${this.x}, \"y\":${this.y+this.n}}`
        this.southTile = `{\"x\":${this.x}, \"y\":${this.y-this.n}}`
        this.southeastTile = `{\"x\":${this.x+this.n}, \"y\":${this.y-this.n}}`
        this.northwestTile = `{\"x\":${this.x-this.n}, \"y\":${this.y+this.n}}`
        this.southwestTile = `{\"x\":${this.x-this.n}, \"y\":${this.y-this.n}}`
        this.northeastTile = `{\"x\":${this.x+this.n}, \"y\":${this.y+this.n}}`
        this.winningRowArr = `{\"x\":${this.x}, \"y\":${this.y}}`
    }

    checkDirection(): string | undefined{
        switch(this.direction){
            case "east":
                return this.eastTile
            case "west":
                return this.westTile
            case "north":
                return this.northTile
            case "south":
                return this.southTile
            case "southeast":
                return this.southeastTile
            case "northwest":
                return this.northwestTile
            case "southwest":
                return this.southwestTile
            case "northeast":
                return this.northeastTile
            default:
                return this.target
        }
    }

    resetN(){
        this.n = 1
    }

    setWinningRow(targetTile: string){
        return this.winningRowArr += '-' + targetTile
    }

    setN(){
        this.n = this.n + 1
        this.eastTile = `{\"x\":${this.x+this.n}, \"y\":${this.y}}`
        this.westTile = `{\"x\":${this.x-this.n}, \"y\":${this.y}}`
        this.northTile = `{\"x\":${this.x}, \"y\":${this.y+this.n}}`
        this.southTile = `{\"x\":${this.x}, \"y\":${this.y-this.n}}`
        this.southeastTile = `{\"x\":${this.x+this.n}, \"y\":${this.y-this.n}}`
        this.northwestTile = `{\"x\":${this.x-this.n}, \"y\":${this.y+this.n}}`
        this.southwestTile = `{\"x\":${this.x-this.n}, \"y\":${this.y-this.n}}`
        this.northeastTile = `{\"x\":${this.x+this.n}, \"y\":${this.y+this.n}}`
    }

    tileCheck(state: TYPES.iState):number {
        let targetTile: string | undefined = this.checkDirection()
        if(state.HashMap && targetTile != undefined){
            if(!state.HashMap.has(targetTile)){
                return 0
            }
            if(state.HashMap.get(targetTile) === state.currentColorState){ 
                this.setWinningRow(targetTile)
                return 1
            }
        }
        return 0
    }


    
    recursion(state: TYPES.iState, n?: number): number{
        if(this.n > 5){
            return 0
        }
        if(this.tileCheck(state) === 1){
            this.setN()
            return this.recursion(state, this.n)
        }else{
            return this.n
        }
    }
    

    get win(): number{
        let returnTotal = this.recursion(this.state, this.n)
        this.resetN()
        return returnTotal 
    }

}

