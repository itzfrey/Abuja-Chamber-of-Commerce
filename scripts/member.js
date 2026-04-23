async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        const container = document.querySelector(".members-container"); // parent div in your HTML
        container.innerHTML = "";

        members.forEach(member => {
            // Create the main card
            const card = document.createElement("div");
            card.classList.add("member-card");

            // Header section (Name + Tagline)
            const header = document.createElement("div");
            header.classList.add("member-header");
            header.innerHTML = `
        <h3>${member.name}</h3>
        <p class="tagline">${member.description}</p>
      `;

            // Divider
            const divider = document.createElement("hr");

            // Body section (Image + Info)
            const body = document.createElement("div");
            body.classList.add("member-body");

            // Logo
            const logo = document.createElement("img");
            logo.src = `images/${member.image}`;
            logo.alt = `${member.name} logo`;
            logo.classList.add("member-logo");

            // Info
            const info = document.createElement("div");
            info.classList.add("member-info");
            info.innerHTML = `
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank">${member.website}</a></p>
  
      `;

            // Build body
            body.appendChild(logo);
            body.appendChild(info);

            // Build card
            card.appendChild(header);
            card.appendChild(divider);
            card.appendChild(body);

            // Add card to container
            container.appendChild(card);
        });
    } catch (err) {
        console.error("Error loading members:", err);
    }
}


loadMembers();

// This is for the member layout view selection

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector(".members-container");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
    // example using arrow function
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}

// Live search filter
const searchInput = document.getElementById('memberSearch');

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.member-card');

        cards.forEach(card => {
            const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const tagline = card.querySelector('.tagline')?.textContent.toLowerCase() || '';
            const info = card.querySelector('.member-info')?.textContent.toLowerCase() || '';

            const match = name.includes(query) || tagline.includes(query) || info.includes(query);
            card.style.display = match ? '' : 'none';
        });
    });
}

