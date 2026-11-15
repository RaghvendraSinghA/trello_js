import {openPopUp} from "./openPopUp.js"
import {fetchCardCheckLists} from "../services/fetchCardCheckLists.js"
import {deleteCard,renameCard} from "../services/cardCrudMethods.js"


async function addCardInCardList(cardListRefOfCard,inputBoxNameData,insertBeforeEle,cardId){

    console.log("called addCardInCardList")

    const cardCheckListsAndCheckItemsData = await fetchCardCheckLists(cardId)
    const cardCheckListsAndCheckItems = await cardCheckListsAndCheckItemsData.json()



    console.log("single card CheckListsAndCheckItems",cardCheckListsAndCheckItems)

    const card = document.createElement("div")
    card.classList.add("card")
    card.classList.add("carditem-and-delete")

    //added card id to do crud on it.
    card.id = "card" + "-" + cardId
    // console.log("called create card")
    card.innerHTML = `

         <div class="cardItem">${inputBoxNameData}</div>
        
                <div class="rename-and-delete">
                    <div class="rename">edit</div>
                    <div class="delete delete-card">x</div>
                </div>
    `


    // open popup
    card.addEventListener("click",(event)=>{

        if(event.target.classList.contains("delete")){
            //without this card was also opening when clicking delete icon of card.
            return
        }

        if(event.target.classList.contains("rename")){
            //without this card was also opening when clicking rename icon of card.
            return
        }
        const popUpRef = document.querySelector(".card-popup")
        // popUpRef.classList.remove("show")

        openPopUp(inputBoxNameData,popUpRef,cardCheckListsAndCheckItems,cardId)
    })



    //adding event listener to edit name of card and also on api
    const renameElement = card.querySelector(".rename")

    renameElement.addEventListener("click",(event)=>{
        const grandParent = event.target.parentElement.parentElement

        const name = grandParent.querySelector(".cardItem")

        const input = document.createElement("input")

        input.value = name.textContent
        name.replaceWith(input)

        input.focus()

        input.addEventListener("keydown", (event) => {

            if (event.key !== "Enter") {
                return
            }

            name.textContent = input.value

            renameCard(cardId,name.textContent)

            input.replaceWith(name)
        })
    })

    

    //delete card from cardListRefOfCard from API only

    card.querySelector(".delete-card").addEventListener("click",()=>{
        deleteCard(cardId)
    })


    //add card to its cardListRefOfCard container

    if(cardListRefOfCard.querySelector(`#${card.id}`)){
        //this check is card already in dom object.
        return
    }

    cardListRefOfCard.insertBefore(card,insertBeforeEle)

}

export{addCardInCardList}