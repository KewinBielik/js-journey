const showAt = 600;
const limit = 910;
const bottomOffset = 40;
const scrollTop = document.getElementById("scrollTop");
const copyright = document.getElementById("copyright");

function scrollfunction(){
    if( document.body.scrollTop > showAt || document.documentElement.scrollTop > showAt){
        scrollTop.classList.add(`is-visible`);
        console.log(`1 - ${document.body.scrollTop}`);
        console.log(`2 - ${document.documentElement.scrollTop}`);
        console.log(`3 - ${copyright.offsetTop}`);
    } else {
        scrollTop.classList.remove(`is-visible`);
    }

    let distanceFromLimit = copyright.offsetTop - document.documentElement.scrollTop;
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

window.addEventListener("scroll", scrollfunction, {passive: true});

scrollTop.addEventListener("click", function(){
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
})