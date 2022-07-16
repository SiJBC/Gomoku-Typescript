export const algoHori = (winRow: string[]): boolean  => {
    let returnWinState: boolean = false 
    try{
        const finalSortedArray: any = [...new Set(winRow)]
        let potentialRowWins: any = [JSON.parse(finalSortedArray[0]).y]
        potentialRowWins[potentialRowWins] = JSON.parse(finalSortedArray[0]).y
            finalSortedArray.forEach((element: any) => {
                let el = JSON.parse(element).y
                if(!potentialRowWins.includes(el)){
                    potentialRowWins.push(el)
                } 
            })  
        potentialRowWins.forEach((element: any) => {
            if(finalSortedArray.filter((el: any) => JSON.parse(el).y === element).length === 5){
                console.log('algoHori')
                returnWinState = true

            }
        })
    }
    catch {
        null
    }
    return returnWinState
}

export const algoVert = (winRow: string[]): boolean => {
    let returnWinState: boolean = false 
    try{
        const finalSortedArray: any = [...new Set(winRow)]
        let potentialRowWins: any = [JSON.parse(finalSortedArray[0]).x]
        potentialRowWins[potentialRowWins] = JSON.parse(finalSortedArray[0]).x
            finalSortedArray.forEach((element: any) => {
                let el = JSON.parse(element).x
                if(!potentialRowWins.includes(el)){
                    potentialRowWins.push(el)
                } 
            })  
        potentialRowWins.forEach((element: any) => {
            if(finalSortedArray.filter((el: any) => JSON.parse(el).x === element).length === 5){
                console.log('algoVert')
                returnWinState = true
            }
        })
    }
    catch {
        null
    }
    return returnWinState
}


export const algoDiagNe = (winRow: string[]): boolean => {
    let returnWinState: boolean = false 
    try{
        const finalSortedArray: any = [...new Set(winRow)]
         finalSortedArray.sort((a: any, b: any) => {
            return JSON.parse(a).x - JSON.parse(b).x
         })
         for(let i = 1; i < finalSortedArray.length; i++){
            if((JSON.parse(finalSortedArray[i]).x - JSON.parse(finalSortedArray[i-1]).x !== 1)
            || (JSON.parse(finalSortedArray[i]).y - JSON.parse(finalSortedArray[i-1]).y !== 1)){
                finalSortedArray.remove(finalSortedArray[i])
            }
         }
        if(finalSortedArray.length === 5){
            console.log(finalSortedArray)
            console.log('algoDiagNe')
            returnWinState = true
        }
    }
    catch {
        null
    }
    return returnWinState
}

export const algoDiagNw = (winRow: string[]): boolean => {
    let returnWinState: boolean = false 
    try{
        const finalSortedArray: any = [...new Set(winRow)]
        finalSortedArray.sort((a: any, b: any) => {
            return JSON.parse(a).y - JSON.parse(b).y
         })
         for(let i = 0; i < finalSortedArray.length-1; i++){
            if(JSON.parse(finalSortedArray[i]).x - JSON.parse(finalSortedArray[i+1]).x !== 1){
                finalSortedArray.remove(finalSortedArray[i])
            }
         }
        if(finalSortedArray.length === 5){
            console.log('diagonalnw')
            returnWinState = true
        }
    }
    catch {
        null
    }
    return returnWinState
}