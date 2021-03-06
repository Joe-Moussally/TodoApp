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
//check the radio sort type for the the user chose last
if (sortType == 'date') {
    $(dateRadio).prop("checked", true);
} else {
    $(pointRadio).prop("checked", true);
}

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
    let notDone = JSON.parse(localStorage.getItem('notdone'));

    //check point chosen by user
    let point = pointSelect.find(":selected").val()
    console.log("point:",point)
    let temp = new todo(task,point,false);

    if (notDone === null) {
        notDone = [];
    }
    
    notDone.push(temp);
    console.log(notDone,"PASSED")
    localStorage.setItem('notdone',JSON.stringify(notDone))
    refresh();

    // $('#todo-list-ul').prepend('<li><span contentEditable="false">'+temp.task+'</span><i class="fa-solid fa-pen" onclick="handleEdit(event.currentTarget)"></i><i class="fa-solid fa-check" onclick="handleCheck(event.target)"></i><i class="fa-solid fa-trash-can" onclick="handleDelete(event.target)"></i></li>')
}

//function that handles the delete buttons click
const handleDelete = (button) => {
    let Done = JSON.parse(localStorage.getItem('done'));
    let notDone = JSON.parse(localStorage.getItem('notdone'))

    //targeting element with todo task name
    let taskNameSpan = $(button).prev().prev().prev().children('span')[0];
    //targeting innerHTML of span with todo task
    let taskName = $(taskNameSpan).html()
    let status = $(button).parent().attr('class');//if class of li is done or not

    if (status == 'done') {
        
        Done.forEach((todo) => {
            if (todo.task == taskName) {
                Done.pop(Done.indexOf(todo))
            }
        })
    } else {

        notDone.forEach((todo) => {
            if (todo.task == taskName) {
                notDone.pop(notDone.indexOf(todo))
            }
        })
    }

    // todoList.forEach((todo) => {
    //     if (todo.task == taskName) {
    //         todoList.pop(todoList.indexOf(todo))
    //     }
    // })

    localStorage.setItem('done',JSON.stringify(Done));
    localStorage.setItem('notdone',JSON.stringify(notDone));

    $(button).parent().fadeOut(200)
    refresh();
}

//function that handles the edit
const handleEdit = (button) => {

    let divContainer = $(button).prev()[0]
    let taskSpan = $(divContainer).children('span')[0];
    let notDone = JSON.parse(localStorage.getItem('notdone'));
    let taskName = $(taskSpan).html();
    let taskNameBefore = $(taskSpan).html();//a value to be compared with later when updating the new value
    //if todo is done cannot edit

    if ($(button).parent().prop('className') == 'done') {
        return
    }
    

    if ($(taskSpan).attr('contentEditable') == 'false') {
        console.log("HERE",taskSpan,divContainer)

        $(taskSpan).attr('contentEditable','true')
        $(taskSpan).focus();
    
        //adding event listener to the span tag
        $(taskSpan).on('keypress', (e) => {
            if(e.which == 13) {
                $(button).prev().attr('contentEditable','false');//remove can edit from span
                $(taskSpan).attr('contentEditable','false')
                taskName = $(taskSpan).html()
                 notDone.forEach( (todo) => {
                if (taskNameBefore == todo.task) {
                    todo.task = taskName;//applying the new task name the todo.task
                    //update and refresh
                    localStorage.setItem('notdone',JSON.stringify(notDone));
                    refresh()
                }
            })
            }
        });

        $(taskSpan).focusout(() => {
            taskName = $(taskSpan).html()
            notDone.forEach( (todo) => {
                if (taskNameBefore == todo.task) {
                    
                    todo.task = taskName;//applying the new task name the todo.task
                    //update and refresh
                    localStorage.setItem('notdone',JSON.stringify(notDone));
                    refresh()
                }
            })
            
        })

        

    }
}

//function that handles the check buttons click
const handleCheck = (button) => {

    let Done = JSON.parse(localStorage.getItem('done'));
    let notDone = JSON.parse(localStorage.getItem('notdone'));

    //targeting element with todo task name
    let taskNameSpan = $(button).prev().prev().children('span')[0];
    //targeting innerHTML of span with todo task
    let taskName = $(taskNameSpan).html()

    //if todo is not done, remove it and append it to done ul tag
    // if ($(button).parent().prop('className') != 'done') {

    //     $(button).parent().toggleClass('done');
    //     let temp = $(button).parent();
    //     $(button).parent().remove();
    //     $("#todo-list-done").prepend(temp);

    // } else {
    //     //esle remove it from done list and add it to todo ul
    //     $(button).parent().toggleClass('done');
    //     let temp = $(button).parent();
    //     $(button).parent().remove();
    //     $("#todo-list-ul").prepend(temp);

    // }

    console.log(taskName)

    let status = $(button).parent().prop('className')
    console.log(status)

    if (status === 'done') {
        Done.forEach((todo) => {
            if (todo.task == taskName) {
                let temp = todo;
                todo.done = false;
                console.log("CHANGED")
                Done.pop(Done.indexOf(todo));
                notDone.push(temp);
            }
        })
    } else {
        notDone.forEach((todo) => {
            if (todo.task == taskName) {
                let temp = todo;
                todo.done = true;
                notDone.pop(notDone.indexOf(todo));
                Done.push(temp);
            }
        })
    }

    localStorage.setItem('notdone',JSON.stringify(notDone))
    localStorage.setItem('done',JSON.stringify(Done))
    refresh()
}

//function that updates the list and displays it
const refresh = () => {
    let Done = JSON.parse(localStorage.getItem('done'));
    let notDone = JSON.parse(localStorage.getItem('notdone'));

    if (Done === null) {
        Done = [];
    }
    if (notDone === null) {
        notDone = [];
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
    sort(Done,notDone)//Done notDone
    console.log("Done",Done)
    console.log("not done",notDone)
}

//function that sorts list by date or point and appends it to <ul>
const sort = (doneArray,notDoneArray) => {

    //store not done todos in an array called notDone
    let notDone = notDoneArray;
    let Done = doneArray;

    //seperation done tasks with not done tasks

    if (dateRadio.checked) {

        //sorting Done by date
        //--------------------------------------------------------------------
        notDone.sort( (todo1,todo2) => {
            return (todo1.timeCreated > todo2.timeCreated) ? 1 : -1;//return 1 if point2 smaller than point1 i.e. sort by point property in ascending order
        })

    } else if (pointRadio.checked) {
        
        //sorting Done by point
        notDone.sort( (todo1,todo2) => {
            return ((todo1.point < todo2.point) ? 1 : -1);//return 1 if point2 smaller than point1 i.e. sort by point property in ascending order
        })

    }

    //append li's after sorting
    notDone.forEach( (todo) => {
        $('#todo-list-ul').prepend('<li><div class = "todo-info-container"><span contentEditable="false">'+todo.task+'</span><span class = "point">Point: '+todo.point+'</span><span class = "todo-time">'+todo.dayCreated+'    Time: '+todo.timeCreated+'</span></div><i class="fa-solid fa-pen" onclick="handleEdit(event.currentTarget)"></i><i class="fa-solid fa-check" onclick="handleCheck(event.currentTarget)"></i><i class="fa-solid fa-trash-can" onclick="handleDelete(event.currentTarget)"></i></li>')
    } )
    Done.forEach( (todo) => {
        $('#todo-list-done').prepend('<li class = "done"><div class = "todo-info-container"><span contentEditable="false">'+todo.task+'</span><span class = "point">Point: '+todo.point+'</span><span class = "todo-time">'+todo.dayCreated+'Time: '+todo.timeCreated+'</span></div><i class="fa-solid fa-pen" onclick="handleEdit(event.currentTarget)"></i><i class="fa-solid fa-check" onclick="handleCheck(event.target)"></i><i class="fa-solid fa-trash-can" onclick="handleDelete(event.target)"></i></li>')
    } )
    
    localStorage.setItem('done',JSON.stringify(Done));
    localStorage.setItem('notdone',JSON.stringify(notDone));

}

//adding event listener to when user checks an option

$(pointRadio).click( () => {
        localStorage.setItem('sort','point')
        console.log("CLICKED")
        refresh()
});
$(dateRadio).click( () => {
    localStorage.setItem('sort','date')
    console.log("CLICKED")
    refresh()
});


refresh()

