import {deleteElement} from "../utils/delete.js"
import {deleteChecklist,renameChecklist} from "../services/checkListCrudMethods.js"
import {addChecklistItem,deleteChecklistItem,renameChecklistItem} from "../services/checkListItemCrudMethods.js"

function popUpSetUp(){

    const popUpRef = document.querySelector(".card-popup")


    // added event listener to mark element done

     popUpRef.addEventListener("click",(event)=>{

        if(!event.target.classList.contains("checkbox")){
            return
        }

        const addBtn = event.target
        markCompleted(addBtn)
        
    })


    //added event listener to delete checklist


     popUpRef.addEventListener("click",(event)=>{

        if(!event.target.classList.contains("delete-checklist")){
            return
        }
        const greatGrandParent = event.target.parentElement.parentElement.parentElement

        deleteElement(greatGrandParent)        
        
    })



    //added event listener to delete checklistItem


     popUpRef.addEventListener("click",(event)=>{

        if(!event.target.classList.contains("delete-checklist-item")){
            return
        }
        const grandParent = event.target.parentElement.parentElement

        deleteElement(grandParent)        
        
    })


    //added event listener to rename checklistItem


     popUpRef.addEventListener("click",(event)=>{

        if(!event.target.classList.contains("rename")){
            return
        }

        const grandParent = event.target.parentElement.parentElement

        const name = grandParent.querySelector(".task")

        const input = document.createElement("input")

        if(name==null){
            return 
        }
        input.value = name.textContent
        name.replaceWith(input)

        input.focus()

        input.addEventListener("keydown", (event) => {

            if (event.key !== "Enter") {
                return
            }

            name.textContent = input.value

            input.replaceWith(name)
        })       
    })
}

function addNewCheckList(cardCheckListName,cardCheckListId,checkItems,cardId){

    // console.log("called add new checlist")

    if(cardCheckListName==""){
        return
    }

    const checkListsContainerRef = document.querySelector(".checklists-container")

    const checklist = document.createElement("div")
    checklist.classList.add("checklist")

    //adding checklistid to do crud on it

    checklist.id = "checklist" + "-" + cardCheckListId

    checklist.innerHTML = `
                    <div class="checklistname-and-delete">

                        <div class="checklistname">${cardCheckListName}</div>

                        <div class="rename-and-delete">
                            <div class="rename">edit</div>
                            <div class="delete delete-checklist">🗑️</div>
                        </div>

                    </div>

                    <div class="add-checklist add-checklist-item">
                        <div class="add">+</div>
                        <input class="input-box" placeholder="add checklist item">
                    </div>
    `

    // //do this in last
    // checkListsContainerRef.append(checklist)


    //adding event listener to delete checklist
    const deleteCheckListBtn = checklist.querySelector(".delete-checklist")

    deleteCheckListBtn.addEventListener("click",()=>{
        // deleteChecklist
        deleteChecklist(cardCheckListId)
    })


    //ading event listener to rename checklist

    const renameBtn = checklist.querySelector(".rename")
    const checklistname = checklist.querySelector(".checklistname")

    renameBtn.addEventListener("click",()=>{
        const input = document.createElement("input")

        input.value = checklistname.textContent
        checklistname.replaceWith(input)

        input.focus()

        input.addEventListener("keydown",async(event)=>{

            if(event.key != "Enter"){
                return
            }

            const newName = input.value
            checklistname.textContent = input.value

            input.replaceWith(checklistname)
            await renameChecklist(cardCheckListId,newName)

        })

    })

    //adding event listener to add new checklist-item.

    const addCheckListItemBtn = checklist.querySelector(".add")
    const inputBoxOfCheckList = checklist.querySelector(".input-box")
    const insertCheckItemBefore = checklist.querySelector(".add-checklist-item")

    addCheckListItemBtn.addEventListener("click",async()=>{
        const name = inputBoxOfCheckList.value
        inputBoxOfCheckList.value=""

        const checkItem = await addChecklistItem(cardCheckListId,name)
        //above addChecklistItem is post method to add new checklistitem to trello .
        addCheckListItem(checklist,name,insertCheckItemBefore,checkItem["id"],cardId)
    })


    inputBoxOfCheckList.addEventListener("keydown",async(event)=>{

        if(event.key == "Enter"){
            const name = inputBoxOfCheckList.value
            inputBoxOfCheckList.value=""

            const checkItem = await addChecklistItem(cardCheckListId,name)
            //above addChecklistItem is post method to add new checklistitem to trello .
            addCheckListItem(checklist,name,insertCheckItemBefore,checkItem["id"],cardId)
        }
    })


    //adding existing checkItems of current checklist inside it
    
    const insertBefore = checklist.querySelector(".add-checklist")
    
    for(const checkItem of checkItems){
        const checkItemName = checkItem["name"]
        const checkItemId = checkItem["id"]

        addCheckListItem(checklist,checkItemName,insertBefore,checkItemId,cardId)

    }
    //rename checklist


    //do this in last
    if(checkListsContainerRef.querySelector(`#${checklist.id}`)){
        //if checklist already exist then don't add to DOM, it prevents problem of circular 
        //request problem.
        return
    }
    checkListsContainerRef.append(checklist)
}


function addCheckListItem(checkListRef,checkItemName,insertBeforeItem,checkItemId,cardId){
    const newCheckList = document.createElement("div")
    newCheckList.classList.add("check-list-todo")

    //adding id to do crud on it

    newCheckList.id = "checklist-item"+ "-" +checkItemId
    
    newCheckList.innerHTML=`
                        <div class="checkbox-and-task">
                            <input class="checkbox" type="checkbox">
                            <div class="task">${checkItemName}</div>
                        </div>

                        <div class="rename-and-delete">
                            <div class="rename">edit</div>
                            <div class="delete delete-checklist-item">🗑️</div>
                        </div>
    `


    //adding event listener to delete current checklist item

    const checkItemDeleteBtn = newCheckList.querySelector(".delete-checklist-item")

    checkItemDeleteBtn.addEventListener("click",async()=>{
        await deleteChecklistItem(cardId,checkItemId)
    })

    //EVENT listener to rename checklistItem

    const renameBtn = newCheckList.querySelector(".rename")  
    const checkItem = newCheckList.querySelector(".task")  
    
    renameBtn.addEventListener("click",()=>{
        const input = document.createElement("input")
        input.value = checkItem.textContent

        checkItem.replaceWith(input)

        input.focus()

        input.addEventListener("keydown",async(event)=>{
            if(event.key != "Enter"){
                return
            }
            const newName = input.value

            checkItem.textContent = input.value

            input.replaceWith(checkItem)


            await renameChecklistItem(cardId,checkItemId,newName)
        })


    })

    if(checkListRef.querySelector(`#${newCheckList.id}`)){
        return
    }

    checkListRef.insertBefore(newCheckList,insertBeforeItem)
}



function markCompleted(element){

    const parent = element.parentElement
    const task = parent.querySelector(".task")
    task.classList.toggle("done")

}


export {popUpSetUp,addNewCheckList,addCheckListItem}