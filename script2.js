document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('MobileMenu');
    const closeMenu = document.getElementById('closeMenu');

    // ================= IMAGE LOADING =================

    const images = document.querySelectorAll('img');

    images.forEach(img => {

        // Hide image immediately
        img.classList.add('image-loading');

        function revealImage() {

            if (img.naturalWidth > 0) {

                const showImage = () => {
                    img.classList.add('image-loaded');
                };

                // Wait until image decoding is complete
                if (typeof img.decode === 'function') {

                    img.decode()
                        .then(showImage)
                        .catch(() => {
                            if (img.naturalWidth > 0) {
                                showImage();
                            }
                        });

                } else {
                    showImage();
                }
            }
        }

        // When image finishes loading
        img.addEventListener('load', revealImage, { once: true });

        // Handle image errors
        img.addEventListener('error', () => {
            console.warn('Image failed to load:', img.src);
        }, { once: true });

        // Handle images already loaded from cache
        if (img.complete) {
            revealImage();
        }

    });


    // ================= MOBILE MENU =================

    // Open menu
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    // Close menu
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Close menu when scrolling
    window.addEventListener('scroll', () => {
        mobileMenu.classList.remove('active');
    });


    // ================= FADE-UP AND FADE-LEFT ANIMATIONS =================

    const faders = document.querySelectorAll('.fade-up, .fade-left');

    const appearOnScroll = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('show');

                observer.unobserve(entry.target);

            }

        });

    }, { threshold: 0.2 });

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});