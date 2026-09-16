const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('MobileMenu');
const closeMenu = document.getElementById('closeMenu');

//open menu
hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
})

//close menu
closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
})