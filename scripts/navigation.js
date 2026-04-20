const navButton = document.querySelector("#ham-btn");
const navLists = document.querySelector("#nav-bar");


navButton.addEventListener('click', () => {
    navButton.classList.toggle('show')
    navLists.classList.toggle('show');
})