const date = new Date();
const year = date.getFullYear();

document.getElementById('currentyear').textContent = year;

const lastModified = document.lastModified;

document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;