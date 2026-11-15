import {API_KEY,TOKEN} from "../config.js"

//get all ChecklistData, It return checklists and checkItems


function fetchCardCheckLists(cardId) {
    const url =`https://api.trello.com/1/cards/${cardId}/checklists?checkItems=all&key=${API_KEY}&token=${TOKEN}`
    const response = fetch(url)

    return response
}

export {fetchCardCheckLists}