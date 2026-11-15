import {API_KEY,TOKEN,BOARD_ID} from "../config.js"

async function createChecklist(cardId, checkListName) {
    const url =
        `https://api.trello.com/1/cards/${cardId}/checklists` +
        `?key=${API_KEY}` +
        `&token=${TOKEN}` +
        `&name=${encodeURIComponent(checkListName)}`

    const response = await fetch(url, {
        method: "POST"
    });

    if (!response.ok) {
        throw new Error(await response.text())
    }

    return await response.json()
}

// createChecklist("6ab4f3fb5e26a9e536b932c4","chelist1").then((res)=>console.log(res))


async function deleteChecklist(checklistId) {
    const url =
        `https://api.trello.com/1/checklists/${checklistId}` +
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


// deleteChecklist("6ab0c5f5971b01c62976ebdc").then((res)=>console.log(res))


async function renameChecklist(idChecklist, newName) {
    const url =
        `https://api.trello.com/1/checklists/${idChecklist}` +
        `?key=${API_KEY}` +
        `&token=${TOKEN}` +
        `&name=${encodeURIComponent(newName)}`;

    const response = await fetch(url, {
        method: "PUT"
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}

// renameChecklist("6ab51645909fba88415291c1","yolo").then((res)=>console.log(res))



export {createChecklist,deleteChecklist,renameChecklist}