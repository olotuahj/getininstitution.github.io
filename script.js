/* ================= IMAGE LOADING CONTROL ================= */

document.querySelectorAll("img").forEach((img) => {

    // Hide image immediately
    img.classList.add("image-loading");

    // Reveal image only after it has loaded and decoded
    function revealImage() {

        if (img.naturalWidth > 0) {

            const reveal = () => {

                img.classList.add("image-loaded");

                // If this image has a fade animation,
                // allow it to animate only after loading.
                if (img.dataset.pendingFade === "true") {
                    img.classList.add("show");
                    delete img.dataset.pendingFade;
                }

            };

            if (typeof img.decode === "function") {

                img.decode()
                    .then(reveal)
                    .catch(() => {
                        if (img.naturalWidth > 0) {
                            reveal();
                        }
                    });

            } else {
                reveal();
            }
        }
    }

    // Handle successful loading
    img.addEventListener("load", revealImage, { once: true });

    // Handle failed images
    img.addEventListener("error", () => {
        console.warn("Image failed to load:", img.src);
    }, { once: true });

    // Handle images already loaded from cache
    if (img.complete) {
        revealImage();
    }

});

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

    // ================= FADE-UP AND FADE-LEFT ANIMATIONS =================

const faders = document.querySelectorAll('.fade-up, .fade-left');

const appearOnScroll = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const target = entry.target;

            // If the animated element is an image,
            // wait until it has completely loaded.
            if (
                target.tagName === "IMG" &&
                !target.classList.contains("image-loaded")
            ) {

                target.dataset.pendingFade = "true";

                observer.unobserve(target);

                return;
            }

            target.classList.add('show');

            observer.unobserve(target);

        }

    });

}, { threshold: 0.05 });

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
