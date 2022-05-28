const input = document.getElementsByTagName("input")[0];
const check = document.getElementsByClassName("fa-check");

//adding event listeners to check buttons
$('.fa-check').on('click', (e) => {
     console.log('Clicked!',e.target);
     handleCheck(e.target);
 })

 //adding event listeners to delete buttons
$('.fa-trash-can').on('click', (e) => {
    console.log('Clicked!');
    handleDelete(e.target);
})

//adding event listener to text input
$("input").on('keypress',function(e) {
    if(e.which == 13) {
        console.log(e,e.currentTarget.value)
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

//function that handles the check buttons click
const handleDelete = (button) => {
    $(button).parent().fadeOut(300)
}

//function that appends the Todo content to ul tag
const addTodo = (todo) => {

}