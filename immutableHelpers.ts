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
            console.log(finalSortedArray.filter((el: any) => JSON.parse(el).y == element))
            if(finalSortedArray.filter((el: any) => JSON.parse(el).y === element).length === 5){
                returnWinState = true
            }
            console.log(finalSortedArray.filter((el: any) => {
                JSON.parse(el).y === element
            }))
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
            console.log(finalSortedArray.filter((el: any) => JSON.parse(el).x == element))
            if(finalSortedArray.filter((el: any) => JSON.parse(el).x === element).length === 5){
                console.log('check')
                returnWinState = true
            }
            console.log(finalSortedArray.filter((el: any) => {
                JSON.parse(el).x === element
            }))
        })
    }
    catch {
        null
    }
    return returnWinState
}

export const algoDiag = (winRow: string[]): boolean => {
    let returnWinState: boolean = false 
    try{
        const finalSortedArray: any = [...new Set(winRow)]
        if(finalSortedArray.length === 5){
            console.log('check')
            returnWinState = true
        }
    }
    catch {
        null
    }
    return returnWinState
}