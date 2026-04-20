// Select HTML Elements in the Document
const myGraphic = document.querySelector("#graphic");
const description = document.querySelector(".description");
const temperature = document.querySelector(".temperature");
const high = document.querySelector(".high");
const low = document.querySelector(".low");
const humidity = document.querySelector(".humidity");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");

// Create Required Variable for the URL
const mykey = "354b339e4fd788cb8dc45ea932d4ba12"
const myLat = "9.0479285940647"
const myLong = "7.583733066727618"

// Construct a full path using template literals
const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${mykey}&units=imperial`

async function apiFetch() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    // Capitalize first letter of description
    const desc = data.weather[0].description;
    description.innerHTML = desc.charAt(0).toUpperCase() + desc.slice(1);

    temperature.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
    high.innerHTML = `High: ${Math.round(data.main.temp_max)}&deg;F`;
    low.innerHTML = `Low: ${Math.round(data.main.temp_min)}&deg;F`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

    // Sunrise & Sunset (convert from UNIX timestamp)
    const sunriseTime = new Date(data.sys.sunrise * 1000);
    sunrise.innerHTML = `Sunrise: ${sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const sunsetTime = new Date(data.sys.sunset * 1000);
    sunset.innerHTML = `Sunset: ${sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    // Weather icon
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    myGraphic.setAttribute("src", iconsrc);
    myGraphic.setAttribute("alt", desc);
}

const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${mykey}&units=imperial`;

async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (err) {
        console.error(err);
    }
}

function displayForecast(data) {
    const forecastDiv = document.querySelector(".forecast");
    forecastDiv.innerHTML = "";

    // Get one forecast per day at 12:00 (midday snapshot)
    const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    // Only keep 3 days
    daily.slice(0, 3).forEach(item => {
        const date = new Date(item.dt_txt).toLocaleDateString([], {
            weekday: "long"
        });
        const temp = Math.round(item.main.temp);

        const card = document.createElement("div");
        card.classList.add("forecast-day");
        card.innerHTML = `<p>${date}: <strong>${temp}°F</strong></p>`;
        forecastDiv.appendChild(card);
    });
}

getForecast();



apiFetch();







