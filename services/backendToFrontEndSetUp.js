import {addCardList} from "../utils/addCardList.js"
import {addCardInCardList} from "../utils/addCardInCardList.js"
import {addNewCheckList, addCheckListItem} from "../utils/popUpSetUp.js"


const cardListContainer = document.querySelector(".cardlist-container")
const addCardListBtnContainer = document.querySelector(".add-cardlist")
const popUpEleRef = document.querySelector('.card-popup')

function backendToFrontEndSetUp(socketData){

    if(socketData.type == "trello-update"){
        console.log("inside backendToFrontEndSetUp")
        console.log(socketData)

        console.log(socketData.data.action.type)


        //handeling cardList crud responses from backend

        // 1. createNewCardList

        if(socketData.data.action.type=="createList"){
            console.log(socketData.data.action.data.list.id)
            console.log(socketData.data.action.data.list.name)

            const id   = socketData.data.action.data.list.id
            const name = socketData.data.action.data.list.name

            addCardListFromBackend(name,cardListContainer,addCardListBtnContainer,id)
        }

        if(socketData.data.action.type=="updateList"){

            console.log("inside updateList")
            console.log(socketData)

            // action_renamed_list means rename cardlist
            if(socketData.data.action.display.translationKey=="action_renamed_list"){

                const cardListId = socketData.data.action.data.list.id
                const newName = socketData.data.action.data.list.name
                renameCardListFromBackend(cardListId, newName)
            }

            // action_archived_list means delete cardlist
            if(socketData.data.action.display.translationKey=="action_archived_list"){

                const cardListId = socketData.data.action.data.list.id
                deleteCardListFromBackEnd(cardListId)
            }
            
        }

        //2. handeling cards crud responses from backend

        //2.1 create card

        if(socketData.data.action.type=="createCard"){

            const cardId = socketData.data.action.data.card.id
            const cardName = socketData.data.action.data.card.name

            const cardListId = socketData.data.action.data.list.id

            addCardFromBackend(cardId, cardListId, cardName)

        }

        if(socketData.data.action.type=="updateCard"){


            //2.2 delete card
            if(socketData.data.action.display.translationKey=="action_archived_card"){

                const cardId = socketData.data.action.data.card.id
                const cardName = socketData.data.action.data.card.name

                console.log("cardId",cardId)
                console.log("cardName",cardName)

                const cardListId = socketData.data.action.data.list.id

                console.log("cardListId",cardListId)

                deleteCardFromBackend(cardId,cardListId)

            }

            //2.3 rename card

             if(socketData.data.action.display.translationKey=="action_renamed_card"){

                console.log("inside if of rename card")

                const cardId = socketData.data.action.data.card.id
                const newCardName = socketData.data.action.data.card.name

                console.log("cardId",cardId)
                console.log("cardName",newCardName)

                const cardListId = socketData.data.action.data.list.id

                console.log("cardListId",cardListId)

                renameCardFromBackend(cardId, cardListId, newCardName)

            }
        }


        //3. handeling checklists CRUD operations from backend

        //3.1 add new checklist from backend

        if(socketData.data.action.type=="addChecklistToCard"){
            const cardId = socketData.data.action.data.card.id
            const cardName = socketData.data.action.data.card.name

            console.log("cardId",cardId)
            console.log("cardName",cardName)

            const checkListId = socketData.data.action.data.checklist.id
            const checkListName = socketData.data.action.data.checklist.name

            console.log("checkListId",checkListId)
            console.log("checkListName",checkListName)

            addCheckListFromBackend(checkListId, checkListName, cardId)
        }

        //3.2 rename checklist
         if(socketData.data.action.type=="updateChecklist"){

            console.log("updatechecklist if")
            const cardId = socketData.data.action.data.card.id
            const cardName = socketData.data.action.data.card.name

            console.log("cardId",cardId)
            console.log("cardName",cardName)

            const checkListId = socketData.data.action.data.checklist.id
            const newCheckListName = socketData.data.action.data.checklist.name

            console.log("checkListId",checkListId)
            console.log("checkListName",newCheckListName)


            renameCheckListFromBackend(checkListId, newCheckListName)

            // addCheckListFromBackend(checkListId, checkListName, cardId)
        }

        //3.3 delete checklist
         if(socketData.data.action.type=="removeChecklistFromCard"){

            const checkListId = socketData.data.action.data.checklist.id
            console.log("checkListId",checkListId)

            deleteCheckListFromBackend(checkListId)

            // addCheckListFromBackend(checkListId, checkListName, cardId)
        }



        //4. handeling checkItems CRUD operations from backend 

        //4.1 adding checkItem from backend

        if(socketData.data.action.type=="createCheckItem"){
            const cardId = socketData.data.action.data.card.id
            const cardName = socketData.data.action.data.card.name

            console.log("cardId",cardId)
            console.log("cardName",cardName)

            const checkListId = socketData.data.action.data.checklist.id
            const checkListName = socketData.data.action.data.checklist.name

            console.log("checkListId",checkListId)
            console.log("checkListName",checkListName)


            const checkListItemId = socketData.data.action.data.checkItem.id
            const checkListItemName = socketData.data.action.data.checkItem.name

            console.log("checkListItemId",checkListItemId)
            console.log("checkListItemName",checkListItemName)

            // addCheckListFromBackend(checkListId, checkListName, cardId)

            addCheckListItemFromBackend(checkListId, checkListItemId, checkListItemName, cardId)
        }


        //4.2 renaming checkItem from backend
        if(socketData.data.action.type=="updateCheckItem"){

            const checkListId = socketData.data.action.data.checklist.id

            console.log("checkListId",checkListId)


            const checkListItemId = socketData.data.action.data.checkItem.id
            const checkListItemNewName = socketData.data.action.data.checkItem.name

            console.log("checkListItemId",checkListItemId)
            console.log("checkListItemNewName",checkListItemNewName)


            renameCheckListItemFromBackend(checkListId, checkListItemId, checkListItemNewName)

            // addCheckListFromBackend(checkListId, checkListName, cardId)
        }


         //4.3 deleting checkItem from backend
        if(socketData.data.action.type=="deleteCheckItem"){

            const checkListId = socketData.data.action.data.checklist.id
            console.log("checkListId",checkListId)

            const checkListItemId = socketData.data.action.data.checkItem.id
            console.log("checkListItemId",checkListItemId)


            deleteCheckItemFromBackEnd(checkListId, checkListItemId)


            // renameCheckListItemFromBackend(checkListId, checkListItemId, checkListItemNewName)

            // addCheckListFromBackend(checkListId, checkListName, cardId)
        }


    }
}






//cardList crud methods when data comes from backend.

// add cardlist to clone website when we add cardlist to official trello website

function addCardListFromBackend(name,cardListContainer,addCardListBtnContainer,cardListId){

    addCardList(name,cardListContainer,addCardListBtnContainer,cardListId)

}

// rename cardlist to clone website when we rename cardlist from official trello website

function renameCardListFromBackend(cardListId, newName){

    const cardListDomId = "cardlist" + "-" + cardListId
    const cardListEle = cardListContainer.querySelector(`#${cardListDomId}`)
    const cardName = cardListEle.querySelector(".cardname")

    cardName.textContent = newName

}

// delete cardlist to clone website when we delete cardlist from official trello website

function deleteCardListFromBackEnd(cardListId){

    const cardListDomId = "cardlist" + "-" + cardListId
    const cardListEle = cardListContainer.querySelector(`#${cardListDomId}`)

    if(cardListEle){
        cardListEle.remove()
    }
}



// card crud methods when data comes from backend.

// add card to clone website from trello official website

function addCardFromBackend(cardId, cardListId, cardName){

    const cardListDomId = "cardlist" + "-" + cardListId

    const cardListEle = cardListContainer.querySelector(`#${cardListDomId}`)

    const addCardBtnContainer = cardListEle.querySelector(".new-card-input")

    const cardDomId = "card" + "-" + cardId

    console.log(cardDomId)


    console.log(cardListContainer)

    console.log(cardListEle)

    if(!cardListEle.querySelector(`#${cardDomId}`)){
        console.log(cardListEle.querySelector(`#${cardDomId}`))
        console.log("called addCardFromBackend")
        addCardInCardList(cardListEle,cardName,addCardBtnContainer,cardId)
        return
    }

}


// delete card to clone website from trello official website

function deleteCardFromBackend(cardId, cardListId){
    const cardListDomId = "cardlist" + "-" + cardListId
    const cardDomId = "card" + "-" + cardId

    const cardList = cardListContainer.querySelector(`#${cardListDomId}`)

    const card = cardList.querySelector(`#${cardDomId}`)

    if(card){
        card.remove()
    }
}


// rename card to clone from trello official website

function renameCardFromBackend(cardId, cardListId, newCardName){
    const cardListDomId = "cardlist" + "-" + cardListId
    const cardDomId = "card" + "-" + cardId

    const cardList = cardListContainer.querySelector(`#${cardListDomId}`)

    const card = cardList.querySelector(`#${cardDomId}`)

    const nameEle = card.querySelector(".cardItem")

    nameEle.textContent = newCardName
}




// handeling checklists CRUD operations from backend

//1. add checklist from backend

function addCheckListFromBackend(checkListId, checkListName, cardId){

    // const allCheckListsContainer = popUpEleRef.querySelector(".checklists-container")

    addNewCheckList(checkListName, checkListId, [], cardId)

}

//2. rename checklist from backend

function renameCheckListFromBackend(checkListId, newCheckListName){

    const checkListDomId = "checklist" + "-" + checkListId

    const allCheckListsContainer = popUpEleRef.querySelector(".checklists-container")

    const updatedCheckListEle = allCheckListsContainer.querySelector(`#${checkListDomId}`)

    const checkListName = updatedCheckListEle.querySelector(".checklistname")

    checkListName.textContent = newCheckListName

    console.log(allCheckListsContainer)
}

//3. delete checklist from backend

function deleteCheckListFromBackend(checkListId){

    const checkListDomId = "checklist" + "-" + checkListId

    const allCheckListsContainer = popUpEleRef.querySelector(".checklists-container")

    const checkListToDelete = allCheckListsContainer.querySelector(`#${checkListDomId}`)

    if(checkListToDelete){
        checkListToDelete.remove()
    }
    
}


// handeling checkItems CRUD operations from backend

//1. add checkItem from backend

function addCheckListItemFromBackend(checkListId, checkItemId, checkItemName, cardId){

    // addCheckListFromBackend(checkListId, checkListName, cardId)

    const allCheckListsContainer = popUpEleRef.querySelector(".checklists-container")

    console.log(allCheckListsContainer)

    const updatedCheckListDomId = "checklist" + "-" + checkListId

    const updatedCheckListEle = allCheckListsContainer.querySelector(`#${updatedCheckListDomId}`)

    const insertBeforeBtn = updatedCheckListEle.querySelector(".add-checklist")

    console.log("updatedCheckListEle,updatedCheckListEle",updatedCheckListEle)

    console.log("insertBeforeBtn",insertBeforeBtn)


    addCheckListItem(updatedCheckListEle, checkItemName, insertBeforeBtn, checkItemId, cardId)

}


function renameCheckListItemFromBackend(checkListId, checkListItemId, checkListItemNewName){
    const allCheckListsContainer = popUpEleRef.querySelector(".checklists-container")

    const updatedCheckListDomId = "checklist" + "-" + checkListId
    const updatedCheckListEle = allCheckListsContainer.querySelector(`#${updatedCheckListDomId}`)

    const updatedCheckListItemDomId = "checklist" + "-" + "item" +"-" + checkListItemId
    const updatedCheckListItemEle = updatedCheckListEle.querySelector(`#${updatedCheckListItemDomId}`)

    const nameEleOfUpdatedCheckListItem = updatedCheckListItemEle.querySelector(".task")

    nameEleOfUpdatedCheckListItem.textContent = checkListItemNewName
 
}



function deleteCheckItemFromBackEnd(checkListId, checkListItemId){
    const allCheckListsContainer = popUpEleRef.querySelector(".checklists-container")

    const deleteCheckListDomId = "checklist" + "-" + checkListId
    const deleteCheckListEle = allCheckListsContainer.querySelector(`#${deleteCheckListDomId}`)

    const deleteCheckListItemDomId = "checklist" + "-" + "item" +"-" + checkListItemId
    const deleteCheckListItemEle = deleteCheckListEle.querySelector(`#${deleteCheckListItemDomId}`)

    if(deleteCheckListItemEle){
        deleteCheckListItemEle.remove()
    }
}



export {backendToFrontEndSetUp}