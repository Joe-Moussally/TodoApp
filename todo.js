const input = $("input")[0];
const check = $(".fa-check");
const list = $("#todo-list-ul");
const done = $("#todo-list-done");

//radio date
const dateRadio = $('#1')[0]
//point radio
const pointRadio = $('#2')[0]

//point select input
var pointSelect = $('#point'); //.find(":selected").val() to get the value of selected option from select

//get recent selected sort option by user
let sortType = localStorage.getItem('sort');

//todo class
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

    //check point chosen by user
    let point = pointSelect.find(":selected").val()
    console.log(point)
    let temp = new todo(task,point,false);

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

    //empty the list then repopulate
    $('#todo-list-ul').empty();
    $('#todo-list-done').empty();

    // todoArray.forEach((todo) => {
    //     if (todo.done == true) {
    //         $('#todo-list-done').prepend('<li class = "done"><span contentEditable="false">'+todo.task+'</span><i class="fa-solid fa-pen" onclick="handleEdit(event.currentTarget)"></i><i class="fa-solid fa-check" onclick="handleCheck(event.target)"></i><i class="fa-solid fa-trash-can" onclick="handleDelete(event.target)"></i></li>')
    //     } else {
    //         $('#todo-list-ul').prepend('<li><span contentEditable="false">'+todo.task+'</span><i class="fa-solid fa-pen" onclick="handleEdit(event.currentTarget)"></i><i class="fa-solid fa-check" onclick="handleCheck(event.target)"></i><i class="fa-solid fa-trash-can" onclick="handleDelete(event.target)"></i></li>')
    //     }
        
    // })
    sort(todoArray)
}

//function that sorts list by date
const sort = (array) => {

    $('#todo-list-ul').empty();
    //store not done todos in an array called notDone
    let notDone = [];
    let Done = [];

    //seperation done tasks with not done tasks
    array.forEach((todo) => {
        if (todo.done == true) {
            Done.push(todo)
        } else {
            notDone.push(todo)
        }
    })

    console.log(Done,notDone)
    if (dateRadio.checked) {
        console.log('srt date')
        //sorting Done by date
    } else if (pointRadio.checked) {
        console.log('point sort')
        //sorting Done by point
        notDone.sort( (todo1,todo2) => {
            return (todo1.point > todo2.point) ? 1 : -1;
        })
    }

    //append not done todos li's after sorting
    notDone.forEach((todo) => {
        $('#todo-list-ul').prepend('<li><span contentEditable="false">'+todo.task+'</span><i class="fa-solid fa-pen" onclick="handleEdit(event.currentTarget)"></i><i class="fa-solid fa-check" onclick="handleCheck(event.target)"></i><i class="fa-solid fa-trash-can" onclick="handleDelete(event.target)"></i></li>')
    })
    //append done todos li's after sorting
    Done.forEach((todo) => {
        $('#todo-list-done').prepend('<li class = "done"><span contentEditable="false">'+todo.task+'</span><i class="fa-solid fa-pen" onclick="handleEdit(event.currentTarget)"></i><i class="fa-solid fa-check" onclick="handleCheck(event.target)"></i><i class="fa-solid fa-trash-can" onclick="handleDelete(event.target)"></i></li>')
    })

}

//adding event listener to when user checks an option
$('input[type=radio][name=sort]').change(function() {
    if (this.id == '1') {//date
        localStorage.setItem('sort','date')
        refresh()
    }else if (this.id == '2') {//point
        localStorage.setItem('sort','sort')
        refresh()
    }
});

sort(JSON.parse(localStorage.getItem('todos')))

refresh()

