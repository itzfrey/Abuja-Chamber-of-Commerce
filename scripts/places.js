import {
    places
} from "../data/places.mjs";

const showHere = document.querySelector("#allPlaces");

function displayItems(places) {
    places.forEach(x => {
        //build the card element
        const thecard = document.createElement('div')
        //build the phote element
        const thephoto = document.createElement('img')
        thephoto.src = `images/${x.photo_url}`
        thephoto.alt = x.name
        thephoto.loading = "lazy"
        thephoto.width = 300
        thephoto.height = 250
        thecard.appendChild(thephoto)
        //build the title element
        const thetitle = document.createElement('h2')
        thetitle.innerText = x.name
        thecard.appendChild(thetitle)
        //build the address element
        const theaddress = document.createElement('address')
        theaddress.innerText = x.address
        thecard.appendChild(theaddress)
        // build the descroption element
        const thedesc = document.createElement('p')
        thedesc.innerText = x.description
        thecard.appendChild(thedesc)
        // build the cost
        const thecost = document.createElement('p')
        thecost.innerText = x.cost
        thecard.appendChild(thecost)

        showHere.appendChild(thecard)
    })
}

displayItems(places)

document.addEventListener("DOMContentLoaded", () => {
    const visitMessage = document.getElementById("visit-message");

    const LAST_VISIT_KEY = "discover_last_visit";
    const now = Date.now();
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

    function showVisitMessage() {
        if (!lastVisit) {
            visitMessage.textContent = "Welcome! Let us know if you have any questions.";
            return;
        }

        const lastMs = parseInt(lastVisit, 10);
        if (isNaN(lastMs)) {
            visitMessage.textContent = "Welcome back!";
            localStorage.setItem(LAST_VISIT_KEY, now);
            return;
        }

        const msPerDay = 1000 * 60 * 60 * 24;
        const diff = now - lastMs;
        const days = Math.floor(diff / msPerDay);

        if (days === 0) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (days === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${days} days ago.`;
        }
    }

    showVisitMessage();
    localStorage.setItem(LAST_VISIT_KEY, String(now));
});