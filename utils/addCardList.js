import {fetchCards} from "../services/fetchCards.js"
import {addCardInCardList} from "./addCardInCardList.js"
import {postNewCardList} from "../services/cardListCrudMethods.js"
import {deleteCardList,renameCardList} from "../services/cardListCrudMethods.js"
import {createCard} from "../services/cardCrudMethods.js"


async function addCardList(data,container,addBtn,cardlistId){

    console.log("called addCardList")
    const cardListContainer = document.createElement("div")
    cardListContainer.classList.add("cardlist")

    if(!cardlistId){
        const newCardList = await postNewCardList(data)

        if(!newCardList){
            return
        }

        cardlistId = newCardList["id"]
        data = newCardList["name"]

    }

    if(data==""){
        data="Unknown card"
        return
    }

    cardListContainer.innerHTML = 
            `
            <!-- new changes -->

            <div class="cardname-and-delete">

                <div class="cardname">${data}</div>
                <div class="rename-and-delete">
                    <div class="rename">Edit</div>
                    <div class="delete delete-cardlist">X</div>
                </div>

            </div>

            <!-- till here -->

            <div class = "new-card-input">
                <div class="add-btn">+</div>
                <input class="input-box" placeholder="Add a card" >
            </div>  
            `
    //adding id to cardLists

    cardListContainer.id = "cardlist" + "-" +cardlistId

    //deleting cardLists data from API not layout.

    const deleteCardListBtn = cardListContainer.querySelector(".delete-cardlist")

    deleteCardListBtn.addEventListener("click",(event)=>{
        deleteCardList(cardlistId)
    })


    //fetching existing cards inside cardlists

    const insertCardBefore = cardListContainer.querySelector(".new-card-input")

    const cardsData = await fetchCards(cardlistId)

    if(!cardsData){
        return
    }
    const cards = await cardsData.json()
    console.log("Single cardList cardsData",cards)

    for(const card of cards){
        const cardId = card["id"]
        let cardName = card["name"]

        addCardInCardList(cardListContainer,cardName,insertCardBefore,cardId)
    }

    //adding new card via addbtn of cardList in api and layout both

    const addCardBtnInCardList = cardListContainer.querySelector(".add-btn")
    const parentOfAddBtn = addCardBtnInCardList.parentElement
    const inputBox = cardListContainer.querySelector(".input-box")
    
    addCardBtnInCardList.addEventListener("click",async()=>{
        const cardData = await createCard(cardlistId,inputBox.value)
        const cardId = cardData["id"]
        const cardName = cardData["name"]

        addCardInCardList(
         cardListContainer,
         cardName,         
         parentOfAddBtn,
         cardId
        )

        inputBox.value=""
    })

    inputBox.addEventListener("keydown",async(event)=>{

            if(event.key == "Enter"){
                const cardData = await createCard(cardlistId,inputBox.value)
                const cardId = cardData["id"]
                const cardName = cardData["name"]


               addCardInCardList(
                cardListContainer,
                cardName,         
                parentOfAddBtn,
                cardId
                ) 

                inputBox.value=""
            }
        })



    //rename cardlist
    const renameElement = cardListContainer.querySelector(".rename")

    renameElement.addEventListener("click",(event)=>{
        const grandParent = event.target.parentElement.parentElement

        const name = grandParent.querySelector(".cardname")

        const input = document.createElement("input")

        input.value = name.textContent
        name.replaceWith(input)

        input.focus()

        input.addEventListener("keydown", (event) => {

            if (event.key !== "Enter") {
                return
            }

            name.textContent = input.value
            renameCardList(cardlistId,name.textContent)
            input.replaceWith(name)
        })
    })

    //adding cardlist to its container
    if(container.querySelector(`#${cardListContainer.id}`)){
        // if cardlist already exist in its container then don't add it again
        return
    }
    container.insertBefore(cardListContainer,addBtn)

}


export { addCardList }