const showScrollTopAtHeight = 600; // for shoving the scroll to top button after scrolling past the first section.
const hideScrollTopAtWidth = 430; // for hiding the scroll to top button on lower resolutions.
const scrollTop = document.getElementById("scrollTop");

const heightThreshold = 920; // to push the button slightly up after scrolling to the site's bottom.
const widthThreshold = 1620; // to disable the adjustment for higher resolutions - the button does not cover anything.
const bottomOffset = 40; 
const copyrightSection = document.getElementById("copyright");

const dropDown = document.getElementById("dropDown");
const hiddenNav = document.getElementById("hiddenNav");
const topbarBg = document.getElementById("topbar-bg");

function showScrollTop(){
    
    if ( window.innerWidth < hideScrollTopAtWidth) {
        scrollTop.classList.remove(`is-visible`);
        return;
    }

    if ( document.body.scrollTop > showScrollTopAtHeight || document.documentElement.scrollTop > showScrollTopAtHeight ) {
        scrollTop.classList.add(`is-visible`);
    } else {
        scrollTop.classList.remove(`is-visible`);
    }
}

function adjustBottom() {

    if ( window.innerWidth > widthThreshold ) {
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