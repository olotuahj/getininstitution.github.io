document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('MobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const aboutPage = document.getElementById('aboutpage'); 

// ================= IMAGE LOADING =================

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

    // Wait for the image to finish loading.
    img.addEventListener('load', revealImage, { once: true });

    // Keep failed images hidden.
    img.addEventListener('error', () => {
        console.warn('Image failed to load:', img.src);
    }, { once: true });

    // Handle images that have already loaded.
    if (img.complete && img.naturalWidth > 0) {
        revealImage();
    }

});

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
    }, { threshold: 0.05 });

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

/* =========================================
   WORKSHOP CARD: VIEW COURSES AND BACK
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const workshopCard = document.getElementById("workshopCard");

    const viewCoursesButton = document.getElementById(
        "viewWorkshopCourses"
    );

    const backButton = document.getElementById(
        "backToWorkshop"
    );

    const workshopFront = document.getElementById(
        "workshopFront"
    );

    const workshopCourses = document.getElementById(
        "workshopCourses"
    );

    // Stop if the workshop card is not present on this page.
    if (
        !workshopCard ||
        !viewCoursesButton ||
        !backButton ||
        !workshopFront ||
        !workshopCourses
    ) {
        return;
    }

    // Open the course list.
    viewCoursesButton.addEventListener("click", function () {

        workshopCard.classList.add("courses-open");

        viewCoursesButton.setAttribute("aria-expanded", "true");

        workshopFront.setAttribute("aria-hidden", "true");
        workshopFront.setAttribute("inert", "");

        workshopCourses.setAttribute("aria-hidden", "false");
        workshopCourses.removeAttribute("inert");

        // Move keyboard focus to the Back button.
        backButton.focus({ preventScroll: true });

    });


    // Return to the original workshop card.
    backButton.addEventListener("click", function () {

        workshopCard.classList.remove("courses-open");

        viewCoursesButton.setAttribute("aria-expanded", "false");

        workshopCourses.setAttribute("aria-hidden", "true");
        workshopCourses.setAttribute("inert", "");

        workshopFront.setAttribute("aria-hidden", "false");
        workshopFront.removeAttribute("inert");

        // Return keyboard focus to View Courses.
        viewCoursesButton.focus({ preventScroll: true });

    });

});

/* =========================================
   SHORT COURSES CARD: VIEW COURSES AND BACK
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const shortCoursesCard = document.getElementById("shortCoursesCard");

    const viewCoursesButton = document.getElementById("viewShortCourses");

    const backButton = document.getElementById("backToShortCourses");

    const shortCoursesFront = document.getElementById("shortCoursesFront");

    const shortCoursesList = document.getElementById("shortCoursesList");


    // Stop if the Short Courses card is not on this page.

    if (
        !shortCoursesCard ||
        !viewCoursesButton ||
        !backButton ||
        !shortCoursesFront ||
        !shortCoursesList
    ) {
        return;
    }


    // Open the Short Courses list.

    viewCoursesButton.addEventListener("click", function () {

        shortCoursesCard.classList.add("courses-open");

        viewCoursesButton.setAttribute("aria-expanded", "true");

        shortCoursesFront.setAttribute("aria-hidden", "true");
        shortCoursesFront.setAttribute("inert", "");

        shortCoursesList.setAttribute("aria-hidden", "false");
        shortCoursesList.removeAttribute("inert");

        // Move keyboard focus to the Back button.

        backButton.focus({ preventScroll: true });

    });


    // Return to the original Short Courses card.

    backButton.addEventListener("click", function () {

        shortCoursesCard.classList.remove("courses-open");

        viewCoursesButton.setAttribute("aria-expanded", "false");

        shortCoursesList.setAttribute("aria-hidden", "true");
        shortCoursesList.setAttribute("inert", "");

        shortCoursesFront.setAttribute("aria-hidden", "false");
        shortCoursesFront.removeAttribute("inert");

        // Return keyboard focus to View Courses.

        viewCoursesButton.focus({ preventScroll: true });

    });

});

/* =========================================
   CERTIFICATION COURSES CARD:
   VIEW COURSES AND BACK
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const certificationCard = document.getElementById(
        "certificationCard"
    );

    const viewCoursesButton = document.getElementById(
        "viewCertificationCourses"
    );

    const backButton = document.getElementById(
        "backToCertification"
    );

    const certificationFront = document.getElementById(
        "certificationFront"
    );

    const certificationList = document.getElementById(
        "certificationCoursesList"
    );


    // Stop if the Certification Courses card is not on this page.

    if (
        !certificationCard ||
        !viewCoursesButton ||
        !backButton ||
        !certificationFront ||
        !certificationList
    ) {
        return;
    }


    // Open the Certification Courses list.

    viewCoursesButton.addEventListener("click", function () {

        certificationCard.classList.add("courses-open");

        viewCoursesButton.setAttribute(
            "aria-expanded",
            "true"
        );

        certificationFront.setAttribute(
            "aria-hidden",
            "true"
        );

        certificationFront.setAttribute("inert", "");

        certificationList.setAttribute(
            "aria-hidden",
            "false"
        );

        certificationList.removeAttribute("inert");


        // Move keyboard focus to the Back button.

        backButton.focus({ preventScroll: true });

    });


    // Return to the original Certification Courses card.

    backButton.addEventListener("click", function () {

        certificationCard.classList.remove("courses-open");

        viewCoursesButton.setAttribute(
            "aria-expanded",
            "false"
        );

        certificationList.setAttribute(
            "aria-hidden",
            "true"
        );

        certificationList.setAttribute("inert", "");

        certificationFront.setAttribute(
            "aria-hidden",
            "false"
        );

        certificationFront.removeAttribute("inert");


        // Return keyboard focus to View Courses.

        viewCoursesButton.focus({ preventScroll: true });

    });

});