import {API_KEY,TOKEN,BOARD_ID} from "../config.js"

async function postNewCardList(name) {

    if(!name){
        return
    }

    const url = new URL("https://api.trello.com/1/lists")

    url.searchParams.set("key", API_KEY)
    url.searchParams.set("token", TOKEN)
    url.searchParams.set("name", name)
    url.searchParams.set("idBoard", BOARD_ID)

    const response = await fetch(url, {
        method: "POST"
    })

    if (!response.ok) {
        throw new Error(await response.text())
    }

    return await response.json()
}




async function deleteCardList(idList) {
    console.log("called deletecardlist")
    const url = `https://api.trello.com/1/lists/${idList}?key=${API_KEY}&token=${TOKEN}`


    const isCardListClosedData = await closeCardList(idList)
    const isCardListClosed = await isCardListClosedData

    if(!isCardListClosed["closed"]){
        return
    }

    const response = await fetch(url, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error(await response.text())
    }

    return await response.json()
}

// deleteCardList("6ab4c3e54b90090fa67ee9c3").then((res)=>console.log(res))



async function closeCardList(idList) {
    const url =
        `https://api.trello.com/1/lists/${idList}` +
        `?key=${API_KEY}` +
        `&token=${TOKEN}` +
        `&closed=true`

    const response = await fetch(url, {
        method: "PUT"
    });

    if (!response.ok) {
        throw new Error(await response.text())
    }

    return await response.json()
}

// closeCardList("6ab4c34730a03e245e1de31d").then((res)=>console.log(res))


async function renameCardList(idList, newName) {
    const url =
        `https://api.trello.com/1/lists/${idList}` +
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

// renameCardList("6ab4cbf8d76d89d677a585be","testinrenam").then((res)=>console.log(res))


export {postNewCardList,deleteCardList,renameCardList}