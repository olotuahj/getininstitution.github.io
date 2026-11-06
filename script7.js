document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('MobileMenu');
    const closeMenu = document.getElementById('closeMenu');

    // Open menu
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    // Close menu
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Close menu when user scrolls
    window.addEventListener('scroll', () => {
        mobileMenu.classList.remove('active');
    });


    // ================================
    // FADE-UP AND FADE-LEFT ANIMATIONS
    // ================================

    const faders = document.querySelectorAll('.fade-up, .fade-left');

    const appearOnScroll = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('show');

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });


    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});