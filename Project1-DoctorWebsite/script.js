const showScrollTopAtHeight = 600; // for showing the scroll to top button after scrolling past the first section.
const hideScrollTopAtWidth = 430; // for hiding the scroll to top button on lower resolutions.
const scrollTop = document.getElementById("scrollTop");

const widthThreshold = 1620; // to disable the adjustment for wider screens - the button does not cover anything.
const bottomOffset = 20; // to keep the button slightly above the copyright section.
const copyrightSection = document.getElementById("copyright");

const topbarBg = document.getElementById("topbar-bg");
const dropDown = document.getElementById("nav-drop-down");
const hiddenNav = document.getElementById("hidden-nav");
const hiddenNavContent = Array.from(hiddenNav.children);

let opinionCardsPosition = 0;
const opinionsList = document.getElementById("opinions-list");
const opinionsBtnLeft = document.getElementById("opinions-btn-left");
const opinionsBtnRight = document.getElementById("opinions-btn-right");
const opinionsListDotsDom = document.getElementById("opinions-list-dots");
let opinionsListDots = Array.from(opinionsListDotsDom.children); 
const opinionsCards = Array.from(opinionsList.children).filter(el => el.getAttribute(`aria-hidden`) !== `true`);

let intervalId = null;
const delay = 7000;
const carouselQuery = window.matchMedia("(max-width: 760px)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function showScrollTop(){
    
    if ( window.innerWidth < hideScrollTopAtWidth) {
        scrollTop.classList.remove(`is-visible`);
        return;
    }

    if ( window.scrollY > showScrollTopAtHeight ) {
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
    if ( distanceFromThreshold <= window.innerHeight ) {
        let bottom = window.innerHeight - distanceFromThreshold + bottomOffset;
        scrollTop.style.bottom = bottom + "px";
    } else {
        scrollTop.style.bottom = "";
    }
}

function toggleDropDown() {
    hiddenNav.classList.toggle(`is-visible`);
    dropDown.ariaExpanded = hiddenNav.classList.contains(`is-visible`);
    const newTabIndex = hiddenNav.classList.contains(`is-visible`) ? 0 : -1;
    hiddenNavContent.forEach (el => {
        el.tabIndex = newTabIndex;
    })
}

function intializeDots() {
    const dot = opinionsListDots[0];
    dot.classList.toggle("fa-solid");
    dot.classList.toggle("fa-regular");    
    
    for(let i = 1; i < opinionsCards.length; i++){
        const dotCopy = dot.cloneNode(true);
        opinionsListDotsDom.appendChild(dotCopy);
    }
    opinionsListDots = Array.from(opinionsListDotsDom.children); 
    toggleOpinionListDot();
}

function toggleOpinionListDot(){
    opinionsListDots[opinionCardsPosition].classList.toggle("fa-solid");
    opinionsListDots[opinionCardsPosition].classList.toggle("fa-regular");
}

function moveOpinionCardsRight() {

    toggleOpinionListDot();
    opinionCardsPosition += 1;

    if (opinionCardsPosition >= opinionsCards.length) {
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
        opinionCardsPosition += opinionsCards.length;
    }

    toggleOpinionListDot();
    opinionsList.style.left = -(opinionCardsPosition * 90) + "svw";

    moveCardsPeriodically(); 
}

function moveCardsPeriodically() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    
    if (!carouselQuery.matches || reducedMotionQuery.matches) {
        return;
    }
    
    intervalId = setInterval(moveOpinionCardsRight, delay);
}

function syncCarouselToWidth() {
    
    toggleOpinionListDot();
    opinionCardsPosition = 0;
    toggleOpinionListDot();
    opinionsList.style.left = "";
    
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
        top: 0
    })
})

intializeDots();