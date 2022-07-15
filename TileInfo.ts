import * as TYPES from './types'

export default class TileInfo{
    currentColorState:  TYPES.TILECOLOR; 
    coordindate: TYPES.TileCoordinates

    constructor(currentColorState: TYPES.TILECOLOR, coordindate: TYPES.TileCoordinates){
        this.currentColorState = currentColorState;
        this.coordindate = coordindate;
    }
    get values (): TYPES.TileState{
        return {
            "state": this.currentColorState,
            "coordinate": JSON.stringify(this.coordindate)
        }
    }
}