import {API_KEY,TOKEN,BOARD_ID} from "../config.js"




async function addChecklistItem(checkListId, name) {
    const url =
        `https://api.trello.com/1/checklists/${checkListId}/checkItems` +
        `?key=${API_KEY}` +
        `&token=${TOKEN}` +
        `&name=${encodeURIComponent(name)}`

    const response = await fetch(url, {
        method: "POST"
    });

    if (!response.ok) {
        throw new Error(await response.text())
    }

    return await response.json()
}

// addChecklistItem("6ab5263da8b2e58294617b7b","Katli").then((res)=>console.log(res))


async function deleteChecklistItem(cardId, checkItemId) {
    const url =
        `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}` +
        `?key=${API_KEY}` +
        `&token=${TOKEN}`

    const response = await fetch(url, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error(await response.text())
    }

    return await response.json()
}

// deleteChecklistItem("6ab515f562f6b781282e11e2","6ab52e636cf439a82b26b185").then((res)=>console.log(res))

async function renameChecklistItem(cardId, checkItemId, newName) {
    const response = await fetch(
        `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?name=${encodeURIComponent(newName)}&key=${API_KEY}&token=${TOKEN}`,
        {
            method: "PUT"
        }
    )

    return await response.json()
}

// renameChecklistItem("6ab515f562f6b781282e11e2","6ab52f003210c22e18e5310f","KATEELG").then((res)=>console.log(res))

export {addChecklistItem,deleteChecklistItem,renameChecklistItem}