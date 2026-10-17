const showAt = 800;

var scrollTop = document.getElementById("scrollTop");

window.onscroll = function(){
    scrollfunction()
};
function scrollfunction(){

    if( document.body.scrollTop > showAt || document.documentElement.scrollTop > showAt){
        scrollTop.style.display = "block";
    } else {
        scrollTop.style.display = "none";
    }
}

scrollTop.addEventListener("click", function(){
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
})