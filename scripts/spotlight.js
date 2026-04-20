const spotlightContainer = document.querySelector(".spotlight-container");

async function loadSpotlights() {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // filter gold + silver
    const eligible = members.filter(m => m.membership === "Gold" || m.membership === "Silver");

    // pick 2–3 at random
    const spotlightCount = Math.floor(Math.random() * 2) + 2;
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, spotlightCount);

    selected.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");
        card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name} logo" width="100">
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership:</strong> ${member.membership}</p>
    `;
        spotlightContainer.appendChild(card);
    });
}

if (spotlightContainer) {
    loadSpotlights();
}
