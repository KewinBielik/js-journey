const showAt = 600;
const scrollTop = document.getElementById("scrollTop");

function scrollfunction(){
    if( document.body.scrollTop > showAt || document.documentElement.scrollTop > showAt){
        scrollTop.classList.add(`is-visible`);
    } else {
        scrollTop.classList.remove(`is-visible`);
    }
}

window.addEventListener("scroll", scrollfunction, {passive: true});

scrollTop.addEventListener("click", function(){
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
})