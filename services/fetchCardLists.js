import {API_KEY,TOKEN,BOARD_ID} from "../config.js"

//get CardLists

const url = 
`https://api.trello.com/1/boards/${BOARD_ID}/lists?key=${API_KEY}&token=${TOKEN}`


function fetchCardLists(){
    const res = fetch(url)
    return res
}

export {fetchCardLists}

