document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('MobileMenu');
    const closeMenu = document.getElementById('closeMenu');

    // =========================================
    // HIDE IMAGES UNTIL FULLY LOADED
    // =========================================

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

        if (img.complete && img.naturalWidth > 0) {
            revealImage();
        }

    });

    // =========================================
    // OPEN MOBILE MENU
    // =========================================

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
    }

    // =========================================
    // CLOSE MOBILE MENU
    // =========================================

    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

         // close menu
    window.addEventListener('scroll', () => {
        mobileMenu.classList.remove('active');
    });
    }

    // =========================================
    // FADE-UP AND FADE-LEFT ANIMATIONS
    // =========================================

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


    // =========================================
    // SYNCHRONIZED OUTREACH IMAGE SLIDESHOW
    // =========================================

    const outreachOverlay = document.querySelector(
        '.team-page .outreach-overlay'
    );

    const outreachImage = document.getElementById('outreach-slide');

    if (outreachOverlay && outreachImage) {

        // IMAGE PATHS AND INDIVIDUAL DESKTOP POSITIONS

        const outreachImages = [

            {
                src: 'images/Business meeting in modern office.png',
                position: 'center center'
            },

            {
                src: 'images/Black-Led Seminar Workshop.png',
                position: 'center 60%'
            },

            {
                src: 'images/file_000000005410824685ec810cad6c4d23.png',
                position: 'center 30%'
            }

        ];

        let currentImage = 0;
        let isChangingImage = false;


        // =========================================
        // DESKTOP OBJECT POSITION CONTROL
        // =========================================

        function updateOutreachPosition() {

            if (window.matchMedia('(min-width: 1025px)').matches) {

                outreachImage.style.objectPosition =
                    outreachImages[currentImage].position;

            } else {

                // Allow existing tablet and mobile CSS to take control

                outreachImage.style.objectPosition = '';

            }

        }

        // Apply position to the first image

        updateOutreachPosition();

        // Update position when screen size changes

        window.addEventListener('resize', updateOutreachPosition);


        // =========================================
        // PRELOAD ALL IMAGES
        // =========================================

        outreachImages.forEach(imageData => {

            const image = new Image();
            image.src = imageData.src;

        });


        // =========================================
        // SLIDESHOW ANIMATION
        // =========================================

        outreachOverlay.addEventListener('animationiteration', () => {

            if (isChangingImage) return;

            isChangingImage = true;

            outreachImage.classList.add('image-fade');


            setTimeout(() => {

                currentImage =
                    (currentImage + 1) % outreachImages.length;

                const nextImage = new Image();


               nextImage.onload = async () => {

    try {

        // Wait until the next image is fully decoded.
        if (typeof nextImage.decode === 'function') {
            await nextImage.decode();
        }

        outreachImage.src = nextImage.src;

        // Apply individual desktop image position.
        updateOutreachPosition();

        requestAnimationFrame(() => {
            outreachImage.classList.remove('image-fade');
        });

    } catch (error) {

        console.error('Image decoding failed:', error);

        outreachImage.classList.remove('image-fade');

    }

    isChangingImage = false;

};


                nextImage.onerror = () => {

                    outreachImage.classList.remove('image-fade');

                    isChangingImage = false;

                    console.error(
                        'Could not load outreach image:',
                        outreachImages[currentImage].src
                    );

                };


                nextImage.src = outreachImages[currentImage].src;

            }, 600);

        });

    }

});