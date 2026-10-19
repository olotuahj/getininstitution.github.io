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
    window.addEventListener('scroll', () => {
        mobileMenu.classList.remove('active');
    })
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
    }, { threshold: 0.1 });

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

            event.preventDefault();

            const href = link.getAttribute("href");

            if(href === 'about.html'){
                 window.location.href = 'about.html';
            } else {
                window.location.href = constructionPage;
            }
            
            

        });

    });

});

document.addEventListener('DOMContentLoaded', function () {

    var slides = document.querySelectorAll('.slide');
    var currentSlide = 0;

    function showNextSlide() {
        slides[currentSlide].classList.remove('active');

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        slides[currentSlide].classList.add('active');
    }

    setInterval(showNextSlide, 5000);

});


/* ================= SEE MORE / SEE LESS ================= */

document.addEventListener('DOMContentLoaded', function () {

    const paragraphIds = [
        'img-paragraph',
        'img-paragraph2',
        'img-paragraph3'
    ];

    const wordLimit = 10;
    const mobileTabletWidth = 1024;

    paragraphIds.forEach(function (id) {

        const paragraph = document.getElementById(id);

        if (!paragraph) return;

        // Save the original paragraph text
        const fullText = paragraph.textContent.trim();

        // Separate the paragraph into words
        const words = fullText.split(/\s+/);

        // Only shorten paragraphs longer than 10 words
        if (words.length <= wordLimit) return;

        const shortText = words.slice(0, wordLimit).join(' ') + '...';

        // Create the See more / See less link
        const toggleLink = document.createElement('a');
        toggleLink.href = '#';
        toggleLink.className = 'see-more-link';

        function updateParagraph() {

            if (window.innerWidth <= mobileTabletWidth) {

                if (toggleLink.dataset.expanded === 'true') {
                    paragraph.textContent = fullText;
                    toggleLink.textContent = ' See less';
                } else {
                    paragraph.textContent = shortText;
                    toggleLink.textContent = 'See more';
                }

                paragraph.appendChild(toggleLink);

            } else {
                paragraph.textContent = fullText;
            }
        }

        toggleLink.addEventListener('click', function (event) {
            event.preventDefault();

            const isExpanded = toggleLink.dataset.expanded === 'true';

            toggleLink.dataset.expanded = isExpanded ? 'false' : 'true';

            updateParagraph();
        });

        // Reset to collapsed view when crossing into mobile/tablet
        let previousMobileTabletState = window.innerWidth <= mobileTabletWidth;

        window.addEventListener('resize', function () {
            const currentMobileTabletState =
                window.innerWidth <= mobileTabletWidth;

            if (currentMobileTabletState !== previousMobileTabletState) {
                toggleLink.dataset.expanded = 'false';
                previousMobileTabletState = currentMobileTabletState;
            }

            updateParagraph();
        });

        toggleLink.dataset.expanded = 'false';
        updateParagraph();

    });

});
