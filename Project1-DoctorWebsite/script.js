const showScrollTopAtHeight = 600; // for showing the scroll to top button after scrolling past the first section.
const hideScrollTopAtWidth = 430; // for hiding the scroll to top button on lower resolutions.
const scrollTop = document.getElementById("scrollTop");

const bottomOffset = 20; // to keep the button slightly above the copyright section.
const adjustBottomMaxWidth = 1620; // to disable the adjustment for wider screens - the button does not cover anything.
const copyrightSection = document.getElementById("copyright");

const dropDown = document.getElementById("nav-drop-down");
const navMobile = document.getElementById("nav-mobile-content");
const navMobileContent = Array.from(navMobile.children);

let opinionsCardsPosition = 0; // To track and calculate the cards position and to move the opinionListDots.
const opinionsList = document.getElementById("opinions-list");
const opinionsBtnLeft = document.getElementById("opinions-btn-left");
const opinionsBtnRight = document.getElementById("opinions-btn-right");
const opinionsListDotsDom = document.getElementById("opinions-list-dots");
let opinionsListDots = Array.from(opinionsListDotsDom.children);
const opinionsCards = Array.from(opinionsList.children).filter(el => el.getAttribute(`aria-hidden`) !== `true`);

let swipeIntervalId = null;
const swipeDelay = 7000;

const phoneCarouselQuery = window.matchMedia("(max-width: 760px)"); 
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)") 

function showScrollTop() {

    if (window.innerWidth < hideScrollTopAtWidth) {
        scrollTop.classList.remove(`is-visible`);
        return;
    }

    if (window.scrollY > showScrollTopAtHeight) {
        scrollTop.classList.add(`is-visible`);
    } else {
        scrollTop.classList.remove(`is-visible`);
    }
}

// Pushes the scroll to top button slightly up so that it doesn't cover anything.
function adjustBottom() {

    if (window.innerWidth > adjustBottomMaxWidth) {
        scrollTop.style.bottom = "";
        return;
    }

    let distanceFromCopyrightSection = copyrightSection.offsetTop - document.documentElement.scrollTop - window.innerHeight;
    if (distanceFromCopyrightSection <= 0) {
        let bottom =  -distanceFromCopyrightSection + bottomOffset;
        scrollTop.style.bottom = bottom + "px";
    } else {
        scrollTop.style.bottom = "";
    }
}

function toggleDropDownMenu() {
    navMobile.classList.toggle(`is-visible`);
    dropDown.ariaExpanded = navMobile.classList.contains(`is-visible`);
    
    // toggle tabIndex so that user can't set focus on hidden nav links
    const newTabIndex = navMobile.classList.contains(`is-visible`) ? 0 : -1;
    navMobileContent.forEach(el => {
        el.tabIndex = newTabIndex;
    })
}

// Creates the dots that sit under opinion cards at screen width <= 760px, copy the first dot and clone for each card
function initializeDots() {
    const dot = opinionsListDots[0];

    for (let i = 1; i < opinionsCards.length; i++) {
        const dotCopy = dot.cloneNode(true);
        opinionsListDotsDom.appendChild(dotCopy);
    }
    // update opinionsListDots, because it only sees the first dot
    opinionsListDots = Array.from(opinionsListDotsDom.children);
    updateDots();
}

// Fills the dot corresponding to the visible opinion card, sets the rest to empty dot
function updateDots() {
    opinionsListDots.forEach((dot, index) => {
        const isActive = index === opinionsCardsPosition;
        dot.classList.toggle("fa-solid", isActive);
        dot.classList.toggle("fa-regular", !isActive);
    })
}

// Direction is either 1 or -1
function moveOpinionCards(direction) {

    opinionsCardsPosition += direction;

    if (opinionsCardsPosition < 0) {
        opinionsCardsPosition = opinionsCards.length - 1;
    } else if (opinionsCardsPosition > opinionsCards.length - 1) {
        opinionsCardsPosition = 0;
    }

    // 90 because: 10svw gap + 80svw card's witdh = 90svw
    opinionsList.style.left = -(opinionsCardsPosition * 90) + "svw";
    updateDots();
    restartAutoSwipe();
}

// Stops an interval, checks for queries - if new interval should start, runs new interval
function restartAutoSwipe() {
    if (swipeIntervalId) {
        clearInterval(swipeIntervalId);
        swipeIntervalId = null;
    }

    if (!phoneCarouselQuery.matches || reducedMotionQuery.matches) {
        return;
    }

    swipeIntervalId = setInterval(() => { moveOpinionCards(1) }, swipeDelay);
}

// On phoneCarouselQuery change: reset the opinion cards position and stop the auto swipe from running in the background
function syncCarouselToWidth() {

    opinionsCardsPosition = 0;
    opinionsList.style.left = "";

    updateDots()

    restartAutoSwipe();
}

function buttonPop(btn) {
    btn.disabled = true;
    btn.classList.toggle("pop");
    setTimeout(() => {
        btn.disabled = false;
        btn.classList.toggle("pop");
    }, 1000);
}

initializeDots();
syncCarouselToWidth();
phoneCarouselQuery.addEventListener("change", syncCarouselToWidth);
reducedMotionQuery.addEventListener("change", restartAutoSwipe);

window.addEventListener("scroll", showScrollTop, { passive: true });
window.addEventListener("scroll", adjustBottom, { passive: true });
dropDown.addEventListener("click", toggleDropDownMenu);

// TabIndex can't be changed by css, initialize it here
navMobileContent.forEach(el => {
    el.addEventListener("click", toggleDropDownMenu);
    el.tabIndex = -1;
});

opinionsBtnRight.addEventListener("click", () => {
    moveOpinionCards(1);
    buttonPop(opinionsBtnRight);
});

opinionsBtnLeft.addEventListener("click", () => {
    moveOpinionCards(-1);
    buttonPop(opinionsBtnLeft);
});

scrollTop.addEventListener("click", () => {
    window.scrollTo({
        left: 0,
        top: 0
    })
})