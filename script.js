import {addCardList} from "./utils/addCardList.js"
import {addCardInCardList} from './utils/addCardInCardList.js'
import {popUpSetUp} from "./utils/popUpSetUp.js"
import {deleteElement} from "./utils/delete.js"
import {fetchCardLists} from "./services/fetchCardLists.js"
import {backendToFrontEndSetUp} from "./services/backendToFrontEndSetUp.js"


//run this on browser and see all front-end console.log() there, In vscode running script.js will give error document not found from document.querySelector(".cardlist-container")

const socket = new WebSocket("ws://localhost:3000")


socket.onopen = () => {
    console.log("WebSocket connected")
}

socket.onmessage = (event) => {

    const data = JSON.parse(event.data)

    console.log("data recieved from backed")
    console.log(data)

    if(data.type === "trello-update"){

        backendToFrontEndSetUp(data)
        // loadCardLists()
    }
}

socket.onclose = () => {
    console.log("WebSocket disconnected")
}

socket.onerror = (error) => {
    console.log("WebSocket error:", error)
}




// // add a new cardlist via add btn, no api
const cardListContainer = document.querySelector(".cardlist-container")
const addCardListContainer = document.querySelector(".add-cardlist")

const addCardListAddBtn = document.querySelector(".add-cardlist .add-cardlist-btn")
const addCardListInputBox = document.querySelector(".add-cardlist .input-box")

addCardListAddBtn.addEventListener("click",()=>{

    const inputBoxValue = addCardListInputBox.value

    addCardList(inputBoxValue,cardListContainer,addCardListContainer)
    addCardListInputBox.value=""
})

addCardListInputBox.addEventListener("keydown",(event)=>{

    const inputBoxValue = addCardListInputBox.value
    if(event.key == "Enter"){
        addCardList(inputBoxValue,cardListContainer,addCardListContainer)
        
        addCardListInputBox.value=""
    }

})





// //popup setup call
popUpSetUp()
console.log("popup-setup")



//adding event on cardList-container to delete cardlist

cardListContainer.addEventListener("click",(event)=>{
    if(!event.target.classList.contains("delete-cardlist")){
        return
    }

    const element = event.target

    console.log("Cliked delete cardlist")
    const greatGrandparent = element.parentElement.parentElement.parentElement
    console.log(greatGrandparent)

    deleteElement(greatGrandparent)
})



//adding event to delete card

cardListContainer.addEventListener("click",(event)=>{
    if(!event.target.classList.contains("delete-card")){
        return
    }

    const element = event.target
    const grandParent = element.parentElement.parentElement


    deleteElement(grandParent)
})




//load all cardLists

async function loadCardLists(){

    console.log("Initial render")

    // cardListContainer.innerHTML = ""

    const data = await fetchCardLists()
    const cardListsData = await data.json()

    console.log("cardListsData",cardListsData)

    for(const cardlists of cardListsData){

        const cardListName = cardlists["name"]
        const cardListId = cardlists["id"]

        addCardList(
            cardListName,
            cardListContainer,
            addCardListContainer,
            cardListId
        )

    }
}

loadCardLists()

