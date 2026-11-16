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

const amountOfOpinionCards = 6;
const opinionsList = document.getElementById("opinions-list");
const opinionsBtnLeft = document.getElementById("opinions-btn-left");
const opinionsBtnRight = document.getElementById("opinions-btn-right");

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
});

opinionsBtnRight.addEventListener("click", () => {
    const rect = opinionsList.getBoundingClientRect();
    console.log(rect.top, rect.left);
    const ratio = Math.round((rect.left/window.innerWidth) * 100)/100;
    console.log(window.innerWidth);
    
    if (ratio <= amountOfOpinionCards * -0.9) {
        console.log("tooo far dude");
        return;
    }
    
    opinionsList.style.animation = "switchCardRight 1s forwards";
});

opinionsBtnLeft.addEventListener("click", () => {
    const rect = opinionsList.getBoundingClientRect();
    console.log(rect.top, rect.left);
    const ratio = Math.round((rect.left/window.innerWidth) * 100)/100;
    console.log(window.innerWidth);
    
    if (ratio >= 0){
        console.log("tooo far dude");
        return;
    }

    opinionsList.style.animation = "switchCardLeft 1s forwards";
})

opinionsList.addEventListener("animationend", () => {
    const rect = opinionsList.getBoundingClientRect();
    console.log(rect.top, rect.left);
    const ratio = Math.round((rect.left/window.innerWidth) * 100)/100;
    console.log(`left/width = ${ratio}`);
    opinionsList.style.animation = `none`;
    
    // opinionsList.style.left = rect.left.toString() + "px";
    opinionsList.style.left = (ratio * 100) +"svw"

    opinionsBtnLeft.classList.remove("blocked");
    opinionsBtnRight.classList.remove("blocked");

    if (ratio <= amountOfOpinionCards * -0.9) {
        opinionsBtnRight.classList.add("blocked");
    } else if (ratio >= 0) {
        opinionsBtnLeft.classList.add("blocked");
    }

})




scrollTop.addEventListener("click", function(){
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
})