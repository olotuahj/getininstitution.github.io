document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('MobileMenu');
    const closeMenu = document.getElementById('closeMenu');

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


                nextImage.onload = () => {

                    outreachImage.src = nextImage.src;

                    // Apply individual desktop image position

                    updateOutreachPosition();

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
                        outreachImages[currentImage].src
                    );

                };


                nextImage.src = outreachImages[currentImage].src;

            }, 600);

        });

    }

});