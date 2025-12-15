console.log("welcome to js logic");
let inputBar = document.getElementById("inputBar");
let saveButton = document.getElementById("saveButton");
let todoData = document.getElementById("todo-data-list");
let todos=[];

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
    let hr = document.createElement("hr");

    todoNo.textContent= `${count}.`;
    todoItem.textContent= dataObject.text;
    todoStatus.textContent= dataObject.status;
    buttonDelete.textContent="delete";
    buttonFinish.textContent= dataObject.buttonFinishText;

    todoActions.appendChild(buttonDelete);
    todoActions.appendChild(buttonFinish);
    todoItems.appendChild(todoNo);
    todoItems.appendChild(todoItem);
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
    todoData.setAttribute("id", "todo-data");


    todoData.classList.add("todo-data")
    belowToDoData.classList.add("row");
    todoItems.classList.add("todo-items", "d-flex", "flex-wrap", "justify-content-center");
    todoNo.classList.add("todo-no");
    todoItem.classList.add("todo-item"); 
    todoStatus.classList.add("todo-status");
    todoActions.classList.add("todo-actions", "d-flex" ,"flex-wrap" ,"justify-content-start", "gap-2");
    buttonDelete.classList.add("delete", "btn", "btn-danger");
    buttonFinish.classList.add("finish", "btn", "btn-success");

}








// const getTask= document.getElementById("getTask");
// getTask.addEventListener("click", ()=>{
//     console.log("clicked hahaha!!")
// }) 