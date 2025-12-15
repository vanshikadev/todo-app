console.log("welcome to js logic");
let inputBar = document.getElementById("inputBar");
let saveButton = document.getElementById("saveButton");
let todoData = document.getElementById("todo-data-list");
let todos=[];
let getTaskbutton = document.getElementById("getTask");


inputBar.addEventListener("keyup", ()=>{
    let inputText = inputBar.value.length;
    if(inputText==0)
    {
        if(saveButton.classList.contains("disabled"))
            {
            return;
        }
        else{
            saveButton.classList.add("disabled");
            return;
        }
    }
    else{
        saveButton.classList.remove("disabled");
    }
})

saveButton.addEventListener("click", ()=>{
    if(inputBar.value.length==0)
    {
        saveButton.classList.add("disabled")
        return;
    }
    let dataObject = {text:inputBar.value, status: 'In progress', buttonFinishText: 'Finish'}
    todos.push(dataObject);
    addItem(dataObject, todos.length);
    inputBar.value ='';
})


function renderDataList (todos){
    todoData.innerHTML = "";
    todos.forEach((element, index)=>{
        addItem(element, index+1)
    })
}
getTaskbutton.addEventListener("click",()=>{
    console.log("inside");
    todos= todos.filter((todo)=> todo.status != "Done");
    renderDataList(todos);
    })

function deleteButtonClicked (e) {
    deleteButton = e.target;
    indexToBeRemoved = Number(deleteButton.getAttribute("todo-indx"));
    todos.splice(indexToBeRemoved,1);
    renderDataList(todos);
}
function finishedButtonClicked (e){
    let finishButtonClicked = e.target;
    indexToFinish = Number(finishButtonClicked.getAttribute("todo-indx"));

    if(finishButtonClicked.textContent == 'Finish')
    {
        todos[indexToFinish].buttonFinishText = "Undo";
        todos[indexToFinish].status = "Done";
    }
    else if(finishButtonClicked.textContent =='Undo')
    {
        todos[indexToFinish].buttonFinishText = "Finish";
        todos[indexToFinish].status = "In progress";
    }
    todos.sort((a,b)=>{
        if (a.status == "Done"){
            return 1;
        }
        else
        {
            return -1;
        }

    })
    renderDataList(todos, todos.length);
}
function editButtonClicked(e){
    console.log("edited");
    let editbutton = e.target;
    let indexEditButtonClicked = Number(editbutton.getAttribute("todo-indx"));

    let divToRemove = document.querySelector(`div[todo-indx= "${indexEditButtonClicked}"]`);
    let inputToAdd = document.querySelector(`input[todo-indx= "${indexEditButtonClicked}"]`);

    divToRemove.style.display = "none";
    inputToAdd.type = "text";
    inputToAdd.value= divToRemove.textContent
}

function saveEditedText(e){
     let hiddenText = e.target;
    let indexHiddenText = Number(hiddenText.getAttribute("todo-indx"));

    let divToRemove = document.querySelector(`div[todo-indx= "${indexHiddenText}"]`);
    let inputToAdd = document.querySelector(`input[todo-indx= "${indexHiddenText}"]`);
    if (e.key === "Enter" )
    {
        if(inputToAdd.value){
        divToRemove.style.display = "block";
        divToRemove.textContent = inputToAdd.value;
        inputToAdd.type = "hidden";
        }
        else{
        divToRemove.style.display = "block";
        inputToAdd.type = "hidden";

        }
    }
}


function addItem(dataObject, count) {
    let mainBox = document.getElementById("todo-data-list")
    let todoData = document.createElement("div");
    let belowToDoData = document.createElement("div");
    let todoItems = document.createElement("div");
    let todoNo = document.createElement("div");
    let todoItem = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoActions = document.createElement("div");
    let buttonDelete = document.createElement("button");
    let buttonFinish = document.createElement("button");
    let buttonEdit = document.createElement("button");
    let hiddentText = document.createElement("input");
    let hr = document.createElement("hr");

    todoNo.textContent= `${count}.`;
    todoItem.textContent= dataObject.text;
    todoStatus.textContent= dataObject.status;
    buttonDelete.textContent="delete";
    buttonFinish.textContent= dataObject.buttonFinishText;
    buttonEdit.textContent = "Edit";
    hiddentText.type = "hidden"

    todoActions.appendChild(buttonDelete);
    todoActions.appendChild(buttonFinish);
    todoActions.appendChild(buttonEdit);
    todoItems.appendChild(todoNo);
    todoItems.appendChild(todoItem);
    todoItems.appendChild(hiddentText);
    todoItems.appendChild(todoStatus);
    todoItems.appendChild(todoActions);

    belowToDoData.appendChild(todoItems);
    todoData.appendChild(belowToDoData);
    todoData.appendChild(hr);
    mainBox.appendChild(todoData);
    
    buttonDelete.setAttribute("todo-indx",count-1 ); //setting attribute - while making that html 
    buttonDelete.onclick = deleteButtonClicked;

    buttonFinish.setAttribute("todo-indx",count-1 ); //setting attribute - while making that html 
    buttonFinish.onclick = finishedButtonClicked;

    buttonEdit.setAttribute("todo-indx",count-1 ); //setting attribute - while making that html 
    buttonEdit.onclick = editButtonClicked;
    todoItem.setAttribute("todo-indx",count-1);
    hiddentText.setAttribute("todo-indx", count-1);
    // todoData.setAttribute("id", "todo-data");

    hiddentText.onkeydown = saveEditedText;


    todoData.classList.add("todo-data")
    belowToDoData.classList.add("row");
    todoItems.classList.add("todo-items", "d-flex", "flex-wrap", "justify-content-around");
    todoNo.classList.add("todo-no");
    todoItem.classList.add("todo-item"); 
    todoStatus.classList.add("todo-status");
    todoActions.classList.add("todo-actions", "d-flex" ,"flex-wrap" ,"justify-content-start", "gap-2");
    buttonDelete.classList.add("delete", "btn", "btn-danger");
    buttonFinish.classList.add("finish", "btn", "btn-success");
    buttonEdit.classList.add("edit", "btn", "btn-warning");
    hiddentText.classList.add("todo-item", "form-control");

}








// const getTask= document.getElementById("getTask");
// getTask.addEventListener("click", ()=>{
//     console.log("clicked hahaha!!")
// }) 