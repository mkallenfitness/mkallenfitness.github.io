document.addEventListener("DOMContentLoaded", function() {
    const calendarContainer = document.getElementById("calendar-container");
    const fullScreenGallery = document.getElementById("full-screen-gallery");
    const closeGalleryBtn = document.getElementById("close-gallery");
    const galleryImages = document.querySelectorAll(".gallery img, .more-photos");
    const fullScreenImagesContainer = document.querySelector(".full-screen-images");

    const generateCalendar = () => {
        let calendarHTML = "<table><thead><tr>";
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        daysOfWeek.forEach(day => calendarHTML += `<th>${day}</th>`);
        calendarHTML += "</tr></thead><tbody><tr>";

        const availability = [true, false, true, true, false, true, false, true, true, true, false, false, true, true, false, false, true, true, true, true, false, false, true, true, true, false, true, false, true, true, true];

        for (let i = 1; i <= 31; i++) {
            let day = new Date(2024, 6, i).getDay();
            if (i === 1 && day !== 0) {
                for (let j = 0; j < day; j++) {
                    calendarHTML += "<td></td>";
                }
            }

            calendarHTML += `<td class="${availability[i - 1] ? 'available' : 'unavailable'}">${i}</td>`;
            if (day === 6 && i !== 31) {
                calendarHTML += "</tr><tr>";
            }
        }

        calendarHTML += "</tr></tbody></table>";
        calendarContainer.innerHTML = calendarHTML;
    };

    const openFullScreenGallery = () => {
        fullScreenGallery.classList.remove("hidden");
    };

    const closeFullScreenGallery = () => {
        fullScreenGallery.classList.add("hidden");
    };

    galleryImages.forEach(image => {
        image.addEventListener("click", openFullScreenGallery);
    });

    closeGalleryBtn.addEventListener("click", closeFullScreenGallery);

    generateCalendar();
});
