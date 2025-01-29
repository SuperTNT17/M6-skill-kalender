<?php
require_once 'config.php';

// Create connection
try {
    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Echo success message (optional for debugging)
    // echo "Connected successfully"; 
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}

// Fetch customers for dropdown
try {
    $stmt = $conn->prepare("SELECT id, naam FROM klanten");
    $stmt->execute();
    $klanten = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    echo "Error fetching customers: " . $e->getMessage();
    exit;
}

// Fetch time slots for dropdown
try {
    $stmt = $conn->prepare("SELECT id, tijdstip FROM Tijdstippen");
    $stmt->execute();
    $tijdstippen = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    echo "Error fetching time slots: " . $e->getMessage();
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Afspraak toevoegen</title>
</head>
<body>
    <h1>Afspraak toevoegen</h1>
    <form method="POST" action="voeg_afspraak_toe.php">
        <label for="klant">Klant:</label>
        <select id="klant" name="klant_id" required>

            <option value="Pietje">Selecteer een klant</option>

            <?php foreach ($klanten as $klant): ?>
                <option value="<?php echo $klant['id']; ?>"><?php echo htmlspecialchars($klant['naam']); ?></option>
            <?php endforeach; ?>
        </select>

        <label for="datum">Datum:</label>
        <input type="date" id="datum" name="datum" required>

        <label for="tijdstip">Tijdstip:</label>
        <select id="tijdstip" name="tijdstip_id" required>

            <option value="">Selecteer een tijdstip</option>

            <?php foreach ($tijdstippen as $tijdstip): ?>
                <option value="<?php echo $tijdstip['id']; ?>"><?php echo htmlspecialchars($tijdstip['tijd']); ?></option>
            <?php endforeach; ?>
        </select>

        <label for="taak">Taak:</label>
        <input type="text" id="taak" name="taak" required>

        <button type="submit">Afspraak toevoegen</button>
    </form>
</body>
</html>
