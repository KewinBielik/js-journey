const showScrollTopAtHeight = 600; // for shoving the scroll to top button after scrolling past the first section.
const hideScrollTopAtWidth = 430; // for hiding the scroll to top button on lower resolutions.
const scrollTop = document.getElementById("scrollTop");

const heightThreshold = 920; // to push the button slightly up after scrolling to the site's bottom.
const widthThreshold = 1620; // to disable the adjustment for higher resolutions - the button does not cover anything.
const bottomOffset = parseFloat(getComputedStyle(scrollTop).bottom); 
const copyrightSection = document.getElementById("copyright");

const topbarBg = document.getElementById("topbar-bg");
const dropDown = document.getElementById("nav-drop-down");
const hiddenNav = document.getElementById("hidden-nav");
const hiddenNavContent = Array.from(hiddenNav.children);

let opinionCardsPosition = 0;
const opinionCardsAmount = 6;
const opinionsList = document.getElementById("opinions-list");
const opinionsBtnLeft = document.getElementById("opinions-btn-left");
const opinionsBtnRight = document.getElementById("opinions-btn-right");
const opinionsListDotsDom = document.getElementById("opinions-list-dots");
const opinionsListDots = Array.from(opinionsListDotsDom.children)

let intervalId = null;
const delay = 7000;
const carouselQuery = window.matchMedia("(max-width: 760px)");

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
    dropDown.classList.toggle(`active`);
    topbarBg.classList.toggle(`active`);
    hiddenNav.classList.toggle(`is-visible`);
    hiddenNavContent.forEach (el => {
        el.tabIndex = !el.tabIndex;
    })
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
    
    moveCardsPeriodically();
}

function moveOpinionCardsLeft() {

    toggleOpinionListDot();
    opinionCardsPosition -= 1;

    if (opinionCardsPosition < 0) {
        opinionCardsPosition += opinionCardsAmount;
    }

    toggleOpinionListDot();
    opinionsList.style.left = -(opinionCardsPosition * 90) + "svw";

    moveCardsPeriodically(); 
}

function buttonPop(btn) {
    btn.disabled = true;
    btn.classList.toggle("pop");
    setTimeout(() => {
        btn.disabled = false;
        btn.classList.toggle("pop");
    }, 1000);
}

function moveCardsPeriodically() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }

    if (!carouselQuery.matches) {
        return;
    }

    intervalId = setInterval(moveOpinionCardsRight, delay);
}

function syncCarouselToWidth() {

    if (intervalId) {
        clearInterval(intervalId);  
        intervalId = null;
    }

    toggleOpinionListDot();
    opinionCardsPosition = 0;
    toggleOpinionListDot();
    opinionsList.style.left = "";
}

carouselQuery.addEventListener("change", syncCarouselToWidth);
syncCarouselToWidth();

window.addEventListener("scroll", showScrollTop, {passive: true});
window.addEventListener("scroll", adjustBottom, {passive: true});
dropDown.addEventListener("click", toggleDropDown);

hiddenNavContent.forEach(el => {
    el.addEventListener("click", toggleDropDown);
    el.tabIndex = -1;    
});

opinionsBtnRight.addEventListener("click", () => { 
    moveOpinionCardsRight(); 
    buttonPop(opinionsBtnRight);
});

opinionsBtnLeft.addEventListener("click", () => {
    moveOpinionCardsLeft();
    buttonPop(opinionsBtnLeft);
});

scrollTop.addEventListener("click", ()=>{
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
})