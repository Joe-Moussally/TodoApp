const input = document.getElementsByTagName("input")[0];
const check = document.getElementsByClassName("fa-check");

//adding event listeners to check buttons
$('.fa-check').on('click', (e) => {
     handleCheck(e.target);
 })

 //adding event listeners to delete buttons
$('.fa-trash-can').on('click', (e) => {
    handleDelete(e.target);
})

//adding event listener to text input
$("input").on('keypress',function(e) {
    if(e.which == 13) {
        console.log(e,e.currentTarget.value)
        addTodo(e.currentTarget.value)
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
    $(button).parent().fadeOut(300)
}

//function that handles the check buttons click
const handleCheck = (button) => {
    $(button).parent().toggleClass('done');
}


//function that appends the Todo content to ul tag
const addTodo = (todo) => {
    $('#todo-list-ul').append('<li><span>Get ketchup</span><i class="fa-solid fa-check"></i><i class="fa-solid fa-trash-can"></i></li>')
    //adding event listeners to new todos
    $('.fa-check').on('click', (e) => {
        handleCheck(e.target);
    })
    $('.fa-trash-can').on('click', (e) => {
    handleDelete(e.target);
    })
}