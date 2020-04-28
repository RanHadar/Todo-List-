//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event Listeners
todoButton.addEventListener('click',addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterToDo);


//Functions

function addToDo(event){
    //Prevent form from submitting
    event.preventDefault();

    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    //Check Mark Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    //Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);
    //CLEAR Todo Inout value
    todoInput.value = "";

}

function deleteCheck(event){
    const item = event.target;
    console.log(item.classList[0]);
    //DELETE TODO
    if(item.classList[0] === 'trash-btn')
    {
        const todo = item.parentElement;
        //ANIMATION
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        todo.remove();
        
    }

    if(item.classList[0] === 'complete-btn')
    {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

function filterToDo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = "none";
                }
                break;

        }
    });

}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
}