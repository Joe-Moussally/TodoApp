const input = document.getElementsByTagName("input")[0];
const check = document.getElementsByClassName("fa-check");
const list = document.getElementById("todo-list-ul");
const done = document.getElementById("todo-list-done");


class todo {
    constructor(task,point,done,dayCreated,timeCreated){
        let today = new Date()
        this.task = task;
        this.point = point;
        this.done = done;
        this.dayCreated = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        this.timeCreated = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    }
}

//adding event listener to text input
$("input").on('keypress',function(e) {
    if(e.which == 13) {
        console.log(e,e.currentTarget.value)
        handleKeyPress(e.currentTarget.value)
        e.currentTarget.value = '';//clear input value
    }
});

//functions that handles on ENTER press to append to li
const handleKeyPress = (value) => {
    if (value == '') {
        return
    } else {
        addTodo(value);
    }
}

//function that appends the Todo content to ul tag
const addTodo = (task) => {
    let todoList = JSON.parse(localStorage.getItem('todos'));
    let temp = new todo(task,5,false);

    if (todoList === null) {
        todoArray = [];
    } else {
        todoArray = todoList;
    }
    
    todoArray.push(temp);
    console.log(todoArray)
    localStorage.setItem('todos',JSON.stringify(todoArray))
    refresh();

    console.log(temp.dayCreated,"ASD",temp.timeCreated)
    
    // $('#todo-list-ul').prepend('<li><span contentEditable="false">'+temp.task+'</span><i class="fa-solid fa-pen" onclick="handleEdit(event.currentTarget)"></i><i class="fa-solid fa-check" onclick="handleCheck(event.target)"></i><i class="fa-solid fa-trash-can" onclick="handleDelete(event.target)"></i></li>')
}

//function that handles the delete buttons click
const handleDelete = (button) => {
    let todoList = JSON.parse(localStorage.getItem('todos'));
    let taskName = $(button).prev().prev().prev().html();
    console.log(taskName);
    todoList.forEach((todo) => {
        if (todo.task == taskName) {
            todoList.pop(todoList.indexOf(todo))
        }
    })

    localStorage.setItem('todos',JSON.stringify(todoList));
     

    $(button).parent().fadeOut(150)
    refresh();
}

//function that handles the edit
const handleEdit = (button) => {
    
    //if todo is done cannot edit
    if ($(button).parent().prop('className') == 'done') {
        return
    }

    if ($(button).prev().attr('contentEditable') == 'false') {

        $(button).prev().attr('contentEditable','true');//make can edit attribute true to edit on click
        $(button).prev().focus();
    
        //adding event listener to the span tag
        $(button).prev().on('keypress', (e) => {
            if(e.which == 13) {
                $(button).prev().attr('contentEditable','false');//remove can edit from span
            }
        });

    } else {
        $(button).prev().attr('contentEditable','false');//remove can edit from span
    }
}

//function that handles the check buttons click
const handleCheck = (button) => {

    let taskName = $(button).prev().prev().html();
    let todoList = JSON.parse(localStorage.getItem('todos'));

    //if todo is not done, remove it and append it to done ul tag
    if ($(button).parent().prop('className') != 'done') {

        $(button).parent().toggleClass('done');
        let temp = $(button).parent();
        $(button).parent().remove();
        $("#todo-list-done").prepend(temp);


    } else {
        //esle remove it from done list and add it to todo ul
        $(button).parent().toggleClass('done');
        let temp = $(button).parent();
        $(button).parent().remove();
        $("#todo-list-ul").prepend(temp);

    }

    todoList.forEach((todo) => {
        if (todo.task == taskName) {
            console.log(JSON.parse(localStorage.getItem('todos')))
            if (todo.done == false) {
                todo.done = true;
                localStorage.setItem('todos',JSON.stringify(todoList))
            } else {
                console.log(todo.done)
                todo.done = false;
                console.log(todo.done)
                localStorage.setItem('todos',JSON.stringify(todoList))
            }
        }
    })
}



//function that updates the list and displays it
const refresh = () => {
    let todoList = JSON.parse(localStorage.getItem('todos'));

    if (todoList === null) {
        todoArray = [];
    } else {
        todoArray = todoList;
    }

    $('#todo-list-ul').empty();
    $('#todo-list-done').empty();

    todoArray.forEach((todo) => {
        if (todo.done == true) {
            $('#todo-list-done').prepend('<li class = "done"><span contentEditable="false">'+todo.task+'</span><i class="fa-solid fa-pen" onclick="handleEdit(event.currentTarget)"></i><i class="fa-solid fa-check" onclick="handleCheck(event.target)"></i><i class="fa-solid fa-trash-can" onclick="handleDelete(event.target)"></i></li>')
        } else {
            $('#todo-list-ul').prepend('<li><span contentEditable="false">'+todo.task+'</span><i class="fa-solid fa-pen" onclick="handleEdit(event.currentTarget)"></i><i class="fa-solid fa-check" onclick="handleCheck(event.target)"></i><i class="fa-solid fa-trash-can" onclick="handleDelete(event.target)"></i></li>')
        }
        
    })
}

refresh()

