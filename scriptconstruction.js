
/* ========== TARGET DATE ========== */

// Sunday, September 20, 2026, at 7:00 PM (Nigeria)

const targetDate = new Date(
    "2026-09-20T19:00:00+01:00"
).getTime();


/* ========== GET HTML ELEMENTS ========== */

const hoursElement = document.getElementById("hours");

const minutesElement = document.getElementById("minutes");

const secondsElement = document.getElementById("seconds");


/* ========== COUNTDOWN FUNCTION ========== */

function updateCountdown() {

    // Get the current time
    const now = Date.now();


    // Calculate the remaining time
    const difference = targetDate - now;


    // Check whether the countdown has ended
    if (difference <= 0) {

        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        document.querySelector(
            ".countdown-title"
        ).textContent = "We're Live!";

        clearInterval(countdownInterval);

        return;
    }


    // Convert milliseconds to seconds
    const totalSeconds = Math.floor(
        difference / 1000
    );


    // Calculate hours, minutes and seconds
    const hours = Math.floor(
        totalSeconds / 3600
    );

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;


    // Display the countdown
    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


/* ========== RUN COUNTDOWN ========== */

// Run immediately when the page loads
updateCountdown();


// Update every second
const countdownInterval = setInterval(
    updateCountdown,
    1000
);