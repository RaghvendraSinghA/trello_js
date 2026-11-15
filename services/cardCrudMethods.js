import {API_KEY,TOKEN,BOARD_ID} from "../config.js"


async function createCard(cardIdList, name) {
    const url =
        `https://api.trello.com/1/cards` +
        `?key=${API_KEY}` +
        `&token=${TOKEN}` +
        `&idList=${cardIdList}` +
        `&name=${encodeURIComponent(name)}`

    const response = await fetch(url, {
        method: "POST"
    });

    if (!response.ok) {
        throw new Error(await response.text())
    }

    return await response.json();
}


// createCard("6ab4cbf8d76d89d677a585be","ABX").then((res)=>console.log(res))


async function deleteCard(cardId) {
    const url =
        `https://api.trello.com/1/cards/${cardId}` +
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

// deleteCard("6ab4f0aca63f1547754e0b9a").then((res)=>console.log("DEL RES",res))



async function renameCard(idCard, newName) {
    const url =
        `https://api.trello.com/1/cards/${idCard}` +
        `?key=${API_KEY}` +
        `&token=${TOKEN}` +
        `&name=${encodeURIComponent(newName)}`

    const response = await fetch(url, {
        method: "PUT"
    });

    if (!response.ok) {
        throw new Error(await response.text())
    }

    return await response.json()
}


// renameCard("6ab4f3fb5e26a9e536b932c4","ZZZZZZXXXXX").then((res)=>console.log(res))



export {createCard,deleteCard,renameCard}