const showScrollTopAtHeight = 600; // for shoving the scroll to top button after scrolling past the first section.
const hideScrollTopAtWidth = 430; // for hiding the scroll to top button on lower resolutions.
const scrollTop = document.getElementById("scrollTop");

const heightThreshold = 920; // to push the button slightly up after scrolling to the site's bottom.
const widthThreshold = 1620; // to disable the adjustment for higher resolutions - the button does not cover anything.
const bottomOffset = parseFloat(getComputedStyle(scrollTop).bottom); 
const copyrightSection = document.getElementById("copyright");

const dropDown = document.getElementById("dropDown");
const hiddenNav = document.getElementById("hiddenNav");
const topbarBg = document.getElementById("topbar-bg");

let opinionCardsPosition = 0;
const opinionCardsAmount = 6;
const opinionsList = document.getElementById("opinions-list");
const opinionsBtnLeft = document.getElementById("opinions-btn-left");
const opinionsBtnRight = document.getElementById("opinions-btn-right");
const opinionsListDotsDom = document.getElementById("opinions-list-dots");
const opinionsListDots = Array.from(opinionsListDotsDom.children)


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
        scrollTop.style.bottom = "";
        return;
    }

    let distanceFromThreshold = copyrightSection.offsetTop - document.documentElement.scrollTop;
    if ( distanceFromThreshold <= heightThreshold ) {
        let bottom = Math.abs((distanceFromThreshold - heightThreshold)) + bottomOffset;
        scrollTop.style.bottom = bottom + "px";
    } else {
        scrollTop.style.bottom = "";
    }
}

function toggleDropDown() {
    hiddenNav.classList.toggle(`is-visible`);
    dropDown.classList.toggle(`active`);
    topbarBg.classList.toggle(`active`);
}

function toggleOpinionListDot(){
    opinionsListDots[opinionCardsPosition].classList.toggle("fa-solid");
    opinionsListDots[opinionCardsPosition].classList.toggle("fa-regular");
}

function moveOpinionCardsRight() {

    toggleOpinionListDot();
    opinionCardsPosition += 1;

    if (opinionCardsPosition >= opinionCardsAmount) {
        opinionCardsPosition = 0;
    }

    toggleOpinionListDot();
    opinionsList.style.left = -(opinionCardsPosition * 90) + "svw";
    
    opinionsBtnRight.disabled = true;
    setTimeout(() => {
        opinionsBtnRight.disabled = false;
      }, 1000);
}

function moveOpinionCardsLeft() {

    toggleOpinionListDot();
    opinionCardsPosition -= 1;

    if (opinionCardsPosition < 0) {
        opinionCardsPosition += opinionCardsAmount;
    }

    toggleOpinionListDot();
    opinionsList.style.left = -(opinionCardsPosition * 90) + "svw";
    
    opinionsBtnLeft.disabled = true;
    setTimeout(() => {
        opinionsBtnLeft.disabled = false;
      }, 1000);
}


window.addEventListener("scroll", showScrollTop, {passive: true});
window.addEventListener("scroll", adjustBottom, {passive: true});
dropDown.addEventListener("click", toggleDropDown);

Array.from(hiddenNav.children).forEach(child => {
    child.addEventListener("click", toggleDropDown);
});

opinionsBtnRight.addEventListener("click", moveOpinionCardsRight);
opinionsBtnLeft.addEventListener("click", moveOpinionCardsLeft);

scrollTop.addEventListener("click", ()=>{
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
})