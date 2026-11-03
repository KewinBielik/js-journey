const showAt = 600;
const scrollTop = document.getElementById("scrollTop");

const limit = 910;
const bottomOffset = 40;
const copyrightSection = document.getElementById("copyright");

function showScrollTop(){
    if( document.body.scrollTop > showAt || document.documentElement.scrollTop > showAt){
        scrollTop.classList.add(`is-visible`);
    } else {
        scrollTop.classList.remove(`is-visible`);
    }
}

function adjustBottom() {
    let distanceFromLimit = copyrightSection.offsetTop - document.documentElement.scrollTop;
    if ( distanceFromLimit <= limit )
    {
        let bottom = Math.abs((distanceFromLimit - limit)) + bottomOffset;
        scrollTop.style.bottom = bottom.toString() + "px";
    }
    else
    {
        scrollTop.style.bottom = bottomOffset.toString() + "px";
    }
}

window.addEventListener("scroll", showScrollTop, {passive: true});
window.addEventListener("scroll", adjustBottom, {passive: true});

scrollTop.addEventListener("click", function(){
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
})