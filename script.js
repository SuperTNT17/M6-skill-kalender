document.addEventListener("DOMContentLoaded", function () {
    // Login variables
    const loginContainer = document.getElementById("login-container");
    const calendarContainer = document.getElementById("calendar-container");
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("login-error");

    const validUsername = "User01";
    const validPassword = "1234";

    // Calendar variables
    const tableBody = document.querySelector("#day-calendar tbody");
    const currentDateSpan = document.getElementById("current-date");
    const prevDayButton = document.getElementById("prev-day");
    const nextDayButton = document.getElementById("next-day");

    let currentDate = new Date(); // Start with today's date

    // Handle login form submission
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const enteredUsername = usernameInput.value;
        const enteredPassword = passwordInput.value;

        if (enteredUsername === validUsername && enteredPassword === validPassword) {
            loginContainer.classList.add("hidden");
            calendarContainer.classList.remove("hidden");
        } else {
            loginError.classList.remove("hidden");
        }
    });

    // Function to generate the calendar for a specific day
    function generateDayCalendar(date) {
        tableBody.innerHTML = ""; // Clear existing rows
        const startHour = 8; // Start at 8:00
        const startMinutes = 30; // Start at 30 minutes
        const endHour = 18; // End at 18:00

        // Update the current date display
        const formattedDate = date.toLocaleDateString("nl-NL", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        currentDateSpan.textContent = formattedDate;

        for (let hour = startHour; hour <= endHour; hour++) {
            for (let quarter = 0; quarter < 4; quarter++) {
                const minutes = quarter * 15 + (hour === startHour ? startMinutes : 0);
                const displayHour = hour + Math.floor(minutes / 60);
                const displayMinutes = minutes % 60;

                if (displayHour > endHour || (displayHour === endHour && displayMinutes > 0)) {
                    break;
                }

                const row = document.createElement("tr");

                const timeCell = document.createElement("td");
                timeCell.textContent = `${displayHour
                    .toString()
                    .padStart(2, "0")}:${displayMinutes.toString().padStart(2, "0")}`;
                row.appendChild(timeCell);

                const taskCell = document.createElement("td");
                taskCell.classList.add("task-cell");
                taskCell.addEventListener("click", () => {
                    taskCell.classList.toggle("selected");
                });
                row.appendChild(taskCell);

                tableBody.appendChild(row);
            }
        }
    }

    // Add event listeners for navigation buttons
    prevDayButton.addEventListener("click", () => {
        currentDate.setDate(currentDate.getDate() - 1);
        generateDayCalendar(currentDate);
    });

    nextDayButton.addEventListener("click", () => {
        currentDate.setDate(currentDate.getDate() + 1);
        generateDayCalendar(currentDate);
    });

    // Initialize the calendar for today
    generateDayCalendar(currentDate);
});
