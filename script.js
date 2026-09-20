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

// ================= SLIDER =================

const slides = document.querySelectorAll(
    ".fig1-content, .fig2-content, .fig3-content"
);

const nextBtn = document.getElementById("arrowNext");
const backBtn = document.getElementById("arrowBack");
const slideCount = document.querySelector(".slide-count");

let currentSlide = 0;

function showSlide(index) {

    // Tablet and mobile: show all cards for horizontal scrolling
    if (window.innerWidth <= 1024) {
        slides.forEach(slide => {
            slide.style.display = "flex";
        });

        return;
    }

    // Desktop: show one card at a time
    slides.forEach(slide => {
        slide.style.display = "none";
    });

    slides[index].style.display = "flex";

    if (slideCount) {
        slideCount.textContent =
            `0${index + 1} of 0${slides.length}`;
    }

    if (backBtn) {
        backBtn.disabled = index === 0;
    }

    if (nextBtn) {
        nextBtn.disabled = index === slides.length - 1;
    }
}

// Next button
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });
}

// Back button
if (backBtn) {
    backBtn.addEventListener("click", () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });
}

// Run when page loads
showSlide(currentSlide);

// Update when screen is resized
window.addEventListener("resize", () => {
    showSlide(currentSlide);
});


// ================= UNDER CONSTRUCTION REDIRECT =================

document.addEventListener("DOMContentLoaded", () => {

    const constructionPage = "construction.html";

    document.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            // Allow external links
            if (
                href &&
                (
                    href.startsWith("https://") ||
                    href.startsWith("http://") ||
                    href.startsWith("mailto:")
                )
            ) {
                return;
            }

            // Keep users on index.html when they click Home
            if (href === "index.html" || href === "#") {
                event.preventDefault();

                if (href === "index.html") {
                    window.location.href = "index.html";
                }

                return;
            }

            // Redirect other links
            event.preventDefault();
            window.location.href = constructionPage;

        });

    });

});