document.addEventListener("DOMContentLoaded", () => {
    // Detect which page we're on
    const homeEventsContainer = document.getElementById("events-container");
    const directoryEventsContainer = document.querySelector(".all-events");

    fetch("data/events.json")
        .then(response => response.json())
        .then(events => {
            if (homeEventsContainer) {
                // ✅ Home Page → Show first 3 events only
                events.slice(0, 3).forEach(event => {
                    const eventDiv = createEventCard(event);
                    homeEventsContainer.appendChild(eventDiv);
                });
            }

            if (directoryEventsContainer) {
                // ✅ Directory Page → Show all events
                events.forEach(event => {
                    const eventDiv = createEventCard(event);
                    directoryEventsContainer.appendChild(eventDiv);
                });
            }
        })
        .catch(error => console.error("Error loading events:", error));
});

// 🔹 Function to build event card
function createEventCard(event) {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event");

    eventDiv.innerHTML = `
    <div class="event-date">
      <span class="month">${event.month}</span>
      <span class="day">${event.day}</span>
    </div>
    <div class="event-details">
      <p>${event.title}</p>
      <div class="event-location">${event.location}</div>
    </div>
  `;

    return eventDiv;
}
