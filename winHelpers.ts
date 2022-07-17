

import * as TYPES from './types'

// winning conditions use an algorithm from 3 functions 

// tileCheck
// winCheck
// recursiveTileCheck

// the tileCheck functions checks the next tile in one direction
// the recursion functions will repeat the check while it is true
// the win check returns the number of times the recursion function was true


// North East to South West diagonal 

const diagonalSwTileCheck = (map: Map<string, string> | undefined, color: string, targetTile: string, n: number): number => 
{
    const {x,y} = JSON.parse(targetTile)
    const swTile = `{\"x\":${x+n}, \"y\":${y+n}}`    
    if(map){
        if(!map.has(swTile)){
            return 0
        }
        if(map.get(swTile) === color){
            return 1
        }
    }
    return 0
}

export const diagonalSWWinAlg = (state: TYPES.iState, e: any): number => {
    let swVar = 1
    const target = e.target.id
    let numberOfTilesSW: number = 1
    swRecursion(state, target, swVar)
    return numberOfTilesSW
}

const swRecursion = (state: TYPES.iState, target: string, swVar: number): number => {
    if(diagonalSwTileCheck(state.HashMap, state.currentColorState, target, swVar) === 1){
        return swRecursion(state, target, swVar + 1)
    }else{
        return swVar
    }
}

const diagonalNeTileCheck = (map: Map<string, string> | undefined, color: string, targetTile: string, n: number): number => 
{
    const {x,y} = JSON.parse(targetTile)
    const neTile = `{\"x\":${x-n}, \"y\":${y-n}}`    
    if(map){
        if(!map.has(neTile)){
            return 0
        }
        if(map.get(neTile) === color){
            return 1
        }
    }
    return 0
}

const neRecursion = (state: TYPES.iState, target: string, neVar: number): number => 
{
    if(diagonalNeTileCheck(state.HashMap, state.currentColorState, target, neVar) === 1){
        return neRecursion(state, target, neVar + 1)
    }else{
        return neVar
    }
}

export const diagonalNEWinAlg = (state: TYPES.iState, e: any): number => {
    let neVar = 1
    const target = e.target.id
    const map: TYPES.HashMap | undefined = state.HashMap
    let numberOfTilesNE: number = neRecursion(state, target, neVar)    
    return numberOfTilesNE
}

// North West to South East diagonal

export const diagonalNWWinAlg = (state: TYPES.iState, e: any): number => {
    let nwVar = 1
    const target = e.target.id
    const map: TYPES.HashMap | undefined = state.HashMap
    let numberOfTilesNW: number = nwRecursion(state, target, nwVar)    
    return numberOfTilesNW
}

const diagonalNWTileCheck = (map: Map<string, string> | undefined, color: string, targetTile: string, n: number): number => {
    const {x,y} = JSON.parse(targetTile)
    const nwTile = `{\"x\":${x-n}, \"y\":${y+n}}`    
    if(map){
        if(!map.has(nwTile)){
            return 0
        }
        if(map.get(nwTile) === color){
            return 1
        }
    }
    return 0
}

const nwRecursion = (state: TYPES.iState, target: string, nwVar: number): number => {
    if(diagonalNWTileCheck(state.HashMap, state.currentColorState, target, nwVar) === 1){
        return nwRecursion(state, target, nwVar + 1)
    }else{
        return nwVar
    }
}

export const diagonalSEWinAlg = (state: TYPES.iState, e: any): number => {
    let seVar = 1
    const target = e.target.id  
    let numberOfTilesSE: number = seRecursion(state, target, seVar)    
    return numberOfTilesSE
}

const seRecursion = (state: TYPES.iState, target: string, seVar: number): number => {
    if(diagonalSeTileCheck(state.HashMap, state.currentColorState, target, seVar) === 1){
        return seRecursion(state, target, seVar + 1)
    }else{
        return seVar
    }
}

const diagonalSeTileCheck = (map: Map<string, string> | undefined, color: string, targetTile: string, n: number): number => {
    const {x,y} = JSON.parse(targetTile)
    const seTile = `{\"x\":${x+n}, \"y\":${y-n}}`    
    if(map){
        if(!map.has(seTile)){
            return 0
        }
        if(map.get(seTile) === color){
            return 1
        }
    }
    return 0
}

// South to North Vertical

const northTileCheck = (map: Map<string, string> | undefined, color: string, targetTile: string, n: number): number =>{
    const {x,y} = JSON.parse(targetTile)
    const northTile = `{\"x\":${x}, \"y\":${y+n}}`    
    if(map){
        if(!map.has(northTile)){
            return 0
        }
        if(map.get(northTile) === color){
            return 1
        }
    }
    return 0
}

const northRecursion = (state: TYPES.iState, target: string, nVar: number): number => {
    if(northTileCheck(state.HashMap, state.currentColorState, target, nVar) === 1){
        return northRecursion(state, target, nVar + 1)
    }else{
        return nVar
    }
} 

export const northWinAlg = (state: TYPES.iState, e: any): number => {
    let nVar = 1
    const target = e.target.id
    let numberOfTilesN: number = northRecursion(state, target, nVar)    
    return numberOfTilesN
}

const southTileCheck = (map: Map<string, string> | undefined, color: string, targetTile: string, n: number): number => {
    const {x,y} = JSON.parse(targetTile)
    const southTile = `{\"x\":${x}, \"y\":${y-n}}`    
    if(map){
        if(!map.has(southTile)){
            return 0
        }
        if(map.get(southTile) === color){
            return 1
        }
    }
    return 0
}

const southRecursion = (state: TYPES.iState, target: string, nVar: number): number => {
    if(southTileCheck(state.HashMap, state.currentColorState, target, nVar) === 1){
        return southRecursion(state, target, nVar + 1)
    }else{
        return nVar
    }
}

export const southWinAlg = (state: TYPES.iState, e: any): number => {
    let nVar = 1
    const target = e.target.id
    let numberOfTilesS: number = southRecursion(state, target, nVar)    
    return numberOfTilesS
}

export const westWinAlg = (state: TYPES.iState, e: any): number => {
    let wVar = 1
    const target = e.target.id
    let numberOfTilesW: number = wRecursion(state, target, wVar)    
    return numberOfTilesW
}

const wRecursion = (state: TYPES.iState, target: string, wVar: number): number => {
    if(westTileCheck(state.HashMap, state.currentColorState, target, wVar) === 1){
        return wRecursion(state, target, wVar + 1)
    }else{
        return wVar
    }
}

const westTileCheck = (map: Map<string, string> | undefined, color: string, targetTile: string, n: number): number => {
    const {x,y} = JSON.parse(targetTile)
    const westTile = `{\"x\":${x-n}, \"y\":${y}}`    
    if(map){
        if(!map.has(westTile)){
            return 0
        }
        if(map.get(westTile) === color){
            return 1
        }
    }
    return 0
}

export const eastWinAlg = (state: TYPES.iState, e: any): number => {
    let eVar = 1
    const target = e.target.id
    let numberOfTilesE: number = eRecursion(state, target, eVar)    
    return numberOfTilesE
}

const eRecursion = (state: TYPES.iState, target: string, eVar: number): number => {
    if(eastTileCheck(state.HashMap, state.currentColorState, target, eVar) === 1){
        return eRecursion(state, target, eVar + 1)
    }else{
        return eVar
    }
}

const eastTileCheck = (map: Map<string, string> | undefined, color: string, targetTile: string, n: number): number => {
    const {x,y} = JSON.parse(targetTile)
    const eastTile = `{\"x\":${x+n}, \"y\":${y}}`    
    if(map){
        if(!map.has(eastTile)){
            return 0
        }
        if(map.get(eastTile) === color){
            return 1
        }
    }
    return 0
}