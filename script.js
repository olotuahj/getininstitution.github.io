document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('MobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const mainPage = document.getElementById('mainPage');

    // open menu
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    // close menu
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // close menu
    mainPage.addEventListener('scroll', () => {
        mobileMenu.classList.remove('active');
    })

        // smooth scroll to About CAB
        aboutCab.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
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

    // SLIDER
const slides = document.querySelectorAll(
    ".fig1-content, .fig2-content, .fig3-content"
);

const nextBtn = document.getElementById("arrowNext");
const backBtn = document.getElementById("arrowBack");
const slideCount = document.querySelector(".slide-count");

let currentSlide = 0;

function showSlide(index) {

    // run slider only on desktop
    if (window.innerWidth < 780) {
        slides.forEach(slide => slide.style.display = "flex");
        return;
    }

    slides.forEach(slide => {
        slide.style.display = "none";
    });

    slides[index].style.display = "flex";

    slideCount.textContent = `0${index + 1} of 0${slides.length}`;

    backBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;
}

nextBtn.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
});

backBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
});

// initial
showSlide(currentSlide);

