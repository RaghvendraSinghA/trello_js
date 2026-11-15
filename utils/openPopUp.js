import {popUpSetUp,addNewCheckList,addCheckListItem} from "./popUpSetUp.js"
import {createChecklist} from "../services/checkListCrudMethods.js"

function openPopUp(inputBoxNameData, popUpRef, cardCheckListsAndCheckItems, cardId) {

    popUpRef.classList.add("show")
    
    // console.log("cardId",cardId)
    // console.log("cardName",inputBoxNameData)
    console.log("cardCheckListsAndCheckItems from popup",cardCheckListsAndCheckItems)


    popUpRef.innerHTML = `
        <div class="container">

            <div class="cardname-and-close">
                <div class="popup-cardname">${inputBoxNameData}</div>
                <div class="close-btn">X</div>
            </div>

            <input class="add-new-checklist-input-box" placeholder="Enter name of new checklist">
            <div class="popup-add-checklist"> Add new checklist</div>
            
            <div class ="checklists-container">

               
            </div>
        </div>`


    for(const cardCheckListsAndCheckItem of cardCheckListsAndCheckItems){
        const cardCheckListName = cardCheckListsAndCheckItem["name"]
        const cardCheckListId = cardCheckListsAndCheckItem["id"]
        const checkItems = cardCheckListsAndCheckItem["checkItems"]

        console.log("cardCheckListId",cardCheckListId,cardCheckListName)

        addNewCheckList(cardCheckListName,cardCheckListId,checkItems,cardId)
    }

    //event listener to add new checklist
    const addCheckListBtn = popUpRef.querySelector(".popup-add-checklist")
    const addCheckListInputBox = popUpRef.querySelector(".add-new-checklist-input-box")

    addCheckListBtn.addEventListener("click",async()=>{
        const checklistname = addCheckListInputBox.value

        addCheckListInputBox.value=""
        const checkList = await createChecklist(cardId,checklistname)
        const checkListId = checkList["id"]
        // const checkListName = checkList["name"]
        const checkListItems = checkList["checkItems"]
        
        addNewCheckList(checklistname,checkListId,checkListItems,cardId)
    })

    addCheckListInputBox.addEventListener("keydown",async(event)=>{

        if(event.key == "Enter"){
            const checklistname = addCheckListInputBox.value

            addCheckListInputBox.value=""
            const checkList = await createChecklist(cardId,checklistname)
            const checkListId = checkList["id"]
        // const checkListName = checkList["name"]
            const checkListItems = checkList["checkItems"]
        
            addNewCheckList(checklistname,checkListId,checkListItems,cardId)
        }
    })

    



    //event listener to close pop-up
    popUpRef.addEventListener("click", closePopUp)
}


function closePopUp(event) {

    if (!event.target.classList.contains("close-btn")) {
        return
    }
    const popUp = document.querySelector(".card-popup")
    popUp.classList.toggle("show")
}


export { openPopUp }