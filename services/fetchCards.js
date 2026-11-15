import {API_KEY,TOKEN,BOARD_ID} from "../config.js"

//get Cards of cardlist


function fetchCards(cardlistId){
    if(!cardlistId){
        return
    }
    const url = `https://api.trello.com/1/lists/${cardlistId}/cards?key=${API_KEY}&token=${TOKEN}`
    const data = fetch(url)

    return data
}

// fetchCards("6ab0c5f4971b01c62976eb71").then((res)=>res.json()).then((data)=>console.log(data))


export {fetchCards}