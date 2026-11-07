
document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('MobileMenu');
    const closeMenu = document.getElementById('closeMenu');

    // HIDE IMAGES UNTIL THEY HAVE FULLY LOADED
    const images = document.querySelectorAll('img');

    images.forEach(img => {

        function revealImage() {
            if (img.naturalWidth > 0) {

                const showImage = () => {
                    img.classList.add('image-loaded');
                };

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

        img.addEventListener('load', revealImage, { once: true });

        img.addEventListener('error', () => {
            console.warn('Image failed to load:', img.src);
        }, { once: true });

        // Handle images that have already loaded
        if (img.complete && img.naturalWidth > 0) {
            revealImage();
        }
    });

    // OPEN MENU
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
    }

    // CLOSE MENU
    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    // CLOSE MENU WHEN SCROLLING
    if (mobileMenu) {
        window.addEventListener('scroll', () => {
            mobileMenu.classList.remove('active');
        });
    }

    // FADE-UP AND FADE-LEFT ANIMATIONS
    const faders = document.querySelectorAll('.fade-up, .fade-left');

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    faders.forEach(fader => appearOnScroll.observe(fader));

});
