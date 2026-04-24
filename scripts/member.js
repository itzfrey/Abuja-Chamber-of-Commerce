async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        const container = document.querySelector('.members-container');
        container.innerHTML = '';
        container.classList.add('grid'); // ← default view

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');

            const header = document.createElement('div');
            header.classList.add('member-header');
            header.innerHTML = `
                <h3>${member.name}</h3>
                <p class="tagline">${member.description}</p>
            `;

            const divider = document.createElement('hr');

            const body = document.createElement('div');
            body.classList.add('member-body');

            const logo = document.createElement('img');
            logo.src = `images/${member.image}`;
            logo.alt = `${member.name} logo`;
            logo.classList.add('member-logo');

            const info = document.createElement('div');
            info.classList.add('member-info');
            info.innerHTML = `
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
            `;

            body.appendChild(logo);
            body.appendChild(info);
            card.appendChild(header);
            card.appendChild(divider);
            card.appendChild(body);
            container.appendChild(card);
        });

    } catch (err) {
        console.error('Error loading members:', err);
    }
}

loadMembers();

// ── View toggle ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const gridBtn = document.querySelector('#grid');
    const listBtn = document.querySelector('#list');
    const display = document.querySelector('.members-container');

    if (gridBtn && listBtn && display) {
        gridBtn.addEventListener('click', () => {
            display.classList.add('grid');
            display.classList.remove('list');
        });

        listBtn.addEventListener('click', () => {
            display.classList.add('list');
            display.classList.remove('grid');
        });
    }
});

// ── Live search ──────────────────────────────────────────────
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