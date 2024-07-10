document.addEventListener("DOMContentLoaded", function() {
    const calendarContainer = document.getElementById("calendar-container");
    const fullScreenGallery = document.getElementById("full-screen-gallery");
    const closeGalleryBtn = document.getElementById("close-gallery");
    const galleryImages = document.querySelectorAll(".gallery img, .more-photos");
    const fullScreenImagesContainer = document.querySelector(".full-screen-images");

    const generateCalendar = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const today = new Date();
        const availability = [true, false, true, true, false, true, false, true, true, true, false, false, true, true, false, false, true, true, true, true, false, false, true, true, true, false, true, false, true, true, true]; // dummy data

        for (let m = 0; m < 6; m++) {
            const month = new Date(today.getFullYear(), today.getMonth() + m, 1);
            const monthLabel = `${months[month.getMonth()]} ${month.getFullYear()}`;
            let daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
            let calendarHTML = `<div class="month"><div class="month-label">${monthLabel}</div><div class="table-container"><table><thead><tr>`;
            const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            daysOfWeek.forEach(day => calendarHTML += `<th>${day}</th>`);
            calendarHTML += "</tr></thead><tbody><tr>";

            for (let i = 1; i <= daysInMonth; i++) {
                let day = new Date(month.getFullYear(), month.getMonth(), i).getDay();
                if (i === 1 && day !== 0) {
                    for (let j = 0; j < day; j++) {
                        calendarHTML += "<td></td>";
                    }
                }

                const availabilityIndex = ((month.getMonth() * 31) + i) % availability.length; // Example of rotating dummy data
                calendarHTML += `<td class="${availability[availabilityIndex] ? 'available' : 'unavailable'}">${i}</td>`;
                if (day === 6 && i !== daysInMonth) {
                    calendarHTML += "</tr><tr>";
                }
            }

            calendarHTML += "</tr></tbody></table></div></div>";
            calendarContainer.innerHTML += calendarHTML;
        }
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
