const input = document.getElementsByTagName("input")[0];
const check = document.getElementsByClassName("fa-check");
const list = document.getElementById("todo-list-ul");
const done = document.getElementById("todo-list-done");

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

//function that handles the delete buttons click
const handleDelete = (button) => {
    $(button).parent().fadeOut(150)
}

//function that handles the edit
const handleEdit = (button) => {
    
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


}


//function that appends the Todo content to ul tag
const addTodo = (todo) => {
    $('#todo-list-ul').prepend('<li><span contentEditable="false">'+todo+'</span><i class="fa-solid fa-pen" onclick="handleEdit(event.currentTarget)"></i><i class="fa-solid fa-check" onclick="handleCheck(event.target)"></i><i class="fa-solid fa-trash-can" onclick="handleDelete(event.target)"></i></li>')
}