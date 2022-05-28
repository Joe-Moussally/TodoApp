const input = document.getElementsByTagName("input")[0];

$("input").on('keypress',function(e) {
    if(e.which == 13) {
        console.log(e,e.currentTarget.value)
    }
});