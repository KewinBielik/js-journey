const showAt = 600;

var scrollTop = document.getElementById("scrollTop");

window.onscroll = function(){
    scrollfunction()
};
function scrollfunction(){

    if( document.body.scrollTop > showAt || document.documentElement.scrollTop > showAt){
        scrollTop.classList.add(`is-visible`);
    } else {
        scrollTop.classList.remove(`is-visible`);
    }
}

scrollTop.addEventListener("click", function(){
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
})