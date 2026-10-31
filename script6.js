document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('MobileMenu');
    const closeMenu = document.getElementById('closeMenu');

    // open menu
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    // close menu
    closeMenu.addEventListener('click', () => {
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

    // =========================================
// SYNCHRONIZED OUTREACH IMAGE SLIDESHOW
// =========================================

const outreachOverlay = document.querySelector(
    '.team-page .outreach-overlay'
);

const outreachImage = document.getElementById('outreach-slide');

if (outreachOverlay && outreachImage) {

    const outreachImages = [
        'images/Business meeting in modern office.png',
        'images/Black-Led Seminar Workshop.png',
        'images/file_000000005410824685ec810cad6c4d23.png'
    ];

    let currentImage = 0;
    let isChangingImage = false;

    // Preload all images to reduce loading delays.
    outreachImages.forEach((imagePath) => {
        const image = new Image();
        image.src = imagePath;
    });

    // Change the image whenever the gradient animation
    // completes one direction of movement.
    outreachOverlay.addEventListener('animationiteration', () => {

        if (isChangingImage) return;

        isChangingImage = true;

        outreachImage.classList.add('image-fade');

        setTimeout(() => {

            currentImage =
                (currentImage + 1) % outreachImages.length;

            const nextImage = new Image();

            nextImage.onload = () => {

                outreachImage.src = nextImage.src;

                requestAnimationFrame(() => {
                    outreachImage.classList.remove('image-fade');
                });

                isChangingImage = false;
            };

            nextImage.onerror = () => {
                outreachImage.classList.remove('image-fade');
                isChangingImage = false;

                console.error(
                    'Could not load outreach image:',
                    outreachImages[currentImage]
                );
            };

            nextImage.src = outreachImages[currentImage];

        }, 600);

    });

}
});