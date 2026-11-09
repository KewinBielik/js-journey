const showScrollTopAt = 600;
const scrollTop = document.getElementById("scrollTop");

const heightThreshold = 920;
const widthThreshold = 1620;
const bottomOffset = 40;
const copyrightSection = document.getElementById("copyright");

const dropDown = document.getElementById("dropDown");
const hiddenNav = document.getElementById("hiddenNav");
const topbarBg = document.getElementById("topbar-bg");

function showScrollTop(){
    if( document.body.scrollTop > showScrollTopAt || document.documentElement.scrollTop > showScrollTopAt) {
        scrollTop.classList.add(`is-visible`);
    } else {
        scrollTop.classList.remove(`is-visible`);
    }
}

function adjustBottom() {

    if (window.innerWidth > widthThreshold) {
        scrollTop.style.bottom = bottomOffset.toString() + "px";
        return;
    }

    let distanceFromThreshold = copyrightSection.offsetTop - document.documentElement.scrollTop;
    if ( distanceFromThreshold <= heightThreshold ) {
        let bottom = Math.abs((distanceFromThreshold - heightThreshold)) + bottomOffset;
        scrollTop.style.bottom = bottom.toString() + "px";
    } else {
        scrollTop.style.bottom = bottomOffset.toString() + "px";
    }
}

function toggleDropDown() {
    hiddenNav.classList.toggle(`is-visible`);
    dropDown.classList.toggle(`active`);
    topbarBg.classList.toggle(`active`);
}


window.addEventListener("scroll", showScrollTop, {passive: true});
window.addEventListener("scroll", adjustBottom, {passive: true});
dropDown.addEventListener("click", toggleDropDown);

Array.from(hiddenNav.children).forEach(child => {
    child.addEventListener("click", toggleDropDown);
})

scrollTop.addEventListener("click", function(){
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
})