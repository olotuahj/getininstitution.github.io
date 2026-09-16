document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('MobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const aboutPage = document.getElementById('aboutpage'); 

    // open menu
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    // close menu
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // close menu
    aboutPage.addEventListener('scroll', () => {
        mobileMenu.classList.remove('active');
    });

    // Fade-up AND Fade-left animations
    const faders = document.querySelectorAll('.fade-up, .fade-left');

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    faders.forEach(fader => appearOnScroll.observe(fader));

    /* Workshop dropdown redirect */
    const workshopSelect = document.getElementById("workshop");

    if (workshopSelect) {
        workshopSelect.addEventListener("change", function () {
            if (this.value) {
                window.location.href = this.value;
            }
        });
    }

});
