console.log("welcome to js logic");
let inputBar = document.getElementById("inputBar");
let saveButton = document.getElementById("saveButton");
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
            saveButton.classList.add("disabled")
            return;
        }
    }
    else{
        saveButton.classList.remove("disabled")
    }
})

saveButton.addEventListener("click", ()=>{
    todos.push(inputBar.value);
    addItem(inputBar.value, todos.length);
    inputBar.value ='';
})

function addItem(data, todoCount) {
    let mainBox = document.getElementById("maincontainer")
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

    todoNo.textContent= `${todoCount}.`;
    todoItem.textContent= data;
    todoStatus.textContent= "pending";
    buttonDelete.textContent="delete";
    buttonFinish.textContent="finish";

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