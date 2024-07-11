document.addEventListener("DOMContentLoaded", function() {
    const unavailableDateRanges = [
        { start: "2024-07-12", end: "2024-07-15" },
        { start: "2024-07-25", end: "2024-08-07" },
        { start: "2024-12-25", end: "2024-12-31" },
    ];

    const calendarContainer = document.getElementById("calendar-container");
    const fullScreenGallery = document.getElementById("full-screen-gallery");
    const closeGalleryBtn = document.getElementById("close-gallery");
    const galleryImages = document.querySelectorAll(".gallery img, .more-photos");
    const fullScreenImagesContainer = document.querySelector(".full-screen-images");

    // Function to create the availability calendar
    function createCalendar() {
        const calendarContainer = document.getElementById("calendar-container");
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        // Clear existing calendar content
        calendarContainer.innerHTML = "";

        // Loop through next 6 months
        for (let i = 0; i < 6; i++) {
            const month = (currentMonth + i) % 12;
            const year = currentYear + Math.floor((currentMonth + i) / 12);

            // Create month container
            const monthDiv = document.createElement("div");
            monthDiv.classList.add("month");

            // Create month label
            const monthLabel = document.createElement("div");
            monthLabel.classList.add("month-label");
            monthLabel.textContent = `${getMonthName(month)} ${year}`;
            monthDiv.appendChild(monthLabel);

            // Create table for dates
            const table = document.createElement("table");
            const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in month

            // Create table header (days of the week)
            const thead = document.createElement("thead");
            const tr = document.createElement("tr");
            const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            daysOfWeek.forEach(day => {
                const th = document.createElement("th");
                th.textContent = day;
                tr.appendChild(th);
            });
            thead.appendChild(tr);
            table.appendChild(thead);

            // Create table body (dates)
            const tbody = document.createElement("tbody");
            let dayOfMonth = 1;
            for (let row = 0; row < 6; row++) {
                if (dayOfMonth > daysInMonth) {
                    break;
                }
                const tr = document.createElement("tr");
                for (let col = 0; col < 7; col++) {
                    const td = document.createElement("td");
                    if (row === 0 && col < new Date(year, month, 1).getDay()) {
                        td.textContent = "";
                    } else if (dayOfMonth > daysInMonth) {
                        td.textContent = "";
                    } else {
                        td.textContent = dayOfMonth;
                        const currentDate = new Date(year, month, dayOfMonth);

                        // Check if current date is within any of the unavailable date ranges
                        if (isDateUnavailable(currentDate)) {
                            td.classList.add("unavailable");
                        } else {
                            td.classList.add("available");
                        }
                        dayOfMonth++;
                    }
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            table.appendChild(tbody);
            monthDiv.appendChild(table);
            calendarContainer.appendChild(monthDiv);
        }
    }

    // Helper function to check if a date is within any unavailable date range
    function isDateUnavailable(date) {
        for (let range of unavailableDateRanges) {
            const startDate = new Date(range.start);
            const endDate = new Date(range.end);
            if (date >= startDate && date <= endDate) {
                return true;
            }
        }
        return false;
    }

    // Helper function to get month name
    function getMonthName(month) {
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        return months[month];
    }

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

    createCalendar();
});
