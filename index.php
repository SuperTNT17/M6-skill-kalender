<?php

require_once 'config.php';

// Create connection
try {
    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jaar Kalender</title>
    <link rel="stylesheet" href="style.css">
    <script defer src="script.js"></script>
</head>
<body>
    <div id="login-container">
        <h1>Login</h1>
        <form id="login-form">
            <label for="username">Gebruikersnaam:</label>
            <input type="text" id="username" placeholder="Voer je gebruikersnaam in" required>
            <label for="password">Wachtwoord:</label>
            <input type="password" id="password" placeholder="Voer je wachtwoord in" required>
            <button type="submit">Login</button>
        </form>
        <p id="login-error" class="hidden">Onjuiste gebruikersnaam of wachtwoord!</p>
    </div>

    <div id="calendar-container" class="hidden">
        <h1>Jaar Kalender</h1>
        <div class="calendar-navigation">
            <button id="prev-day">&lt;</button>
            <span id="current-date"></span>
            <button id="next-day">&gt;</button>
        </div>
        <table id="day-calendar">
            <thead>
                <tr>
                    <th>Tijd</th>
                    <th>Taak</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
    
</body>
</html>
