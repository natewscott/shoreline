document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.nav');

    //Toggle the menu when clicked
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('nav--active');
    })
});