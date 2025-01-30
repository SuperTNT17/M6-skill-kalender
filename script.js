document.addEventListener("DOMContentLoaded", function () {
    // Login variables (geen wijzigingen)
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

    // Handle login
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

    // Generate day calendar
    function generateDayCalendar(date) {
        tableBody.innerHTML = ""; // Clear existing rows
        const startHour = 8;
        const startMinutes = 30;
        const endHour = 18;

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
                taskCell.addEventListener("click", (event) => handleTaskCellClick(event, taskCell));
                row.appendChild(taskCell);

                tableBody.appendChild(row);
            }
        }
    }

    // Handle task cell click
    function handleTaskCellClick(event, taskCell) {
        // Remove any existing input form
        const existingForm = document.querySelector(".reservation-form");
        if (existingForm) existingForm.remove();

        // Create a reservation form
        const form = document.createElement("form");
        form.classList.add("reservation-form");
        form.action = "reserve.php";
        form.method = "POST";
        event.preventDefault();

        // Dropdown for paper size
        const select = document.createElement("select");
        ["Selecteer papierformaat", "A2", "A3", "A4", "A5"].forEach((size) => {
            const option = document.createElement("option");
            option.value = size;
            option.textContent = size;
            select.appendChild(option);
        });
        select.id = "paperSize";
        select.name = "paperSize";

        // Input for number of sheets
        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.placeholder = "Aantal papiertjes";
        input.id = "paperAmount";
        input.name = "paperAmount";

        // Dropdown for single/double-sided
        const sideSelect = document.createElement("select");
        ["Selecteer type afdruk", "Enkelzijdig", "Dubbelzijdig"].forEach((optionText) => {
            const option = document.createElement("option");
            option.value = optionText;
            option.textContent = optionText;
            sideSelect.appendChild(option);
        });
        sideSelect.id = "printType";
        sideSelect.name = "printType";
        
        const reserveButton = document.createElement("input");
        reserveButton.type = "submit";
        reserveButton.value = "Reserveer";
        reserveButton.addEventListener("click", (event) => setReserved(taskCell));

        // Append elements to the form
        form.appendChild(select);
        form.appendChild(input);
        form.appendChild(sideSelect);
        form.appendChild(reserveButton);
        document.body.appendChild(form);

        // Position the form near the clicked cell
        const rect = taskCell.getBoundingClientRect();
        form.style.top = `${rect.bottom + window.scrollY}px`;
        form.style.left = `${rect.left + window.scrollX}px`;
        form.style.display = "block";
    }

    // Navigation buttons
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

    function setReserved(taskCell){
        taskCell.classList.add("reserved");
        taskCell.innerHTML = "Reserved";
    }
});
