<?php
// Connectie met de database
$conn = new mysqli('localhost', 'root', '', 'c10240m6skill');

// Controleren op fouten
if ($conn->connect_error) {
    die("Connectie mislukt: " . $conn->connect_error);
}

// Gegevens ophalen uit formulier
$klant_id = $_POST['klant_id'];
$datum = $_POST['datum'];
$tijdstip_id = $_POST['tijdstip_id'];
$taak = $_POST['taak'];

// Invoegen in database
$sql = "INSERT INTO afspraken (klant_id, tijdstip_id, datum, taak) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iiss", $klant_id, $tijdstip_id, $datum, $taak);

if ($stmt->execute()) {
    echo "Afspraak succesvol toegevoegd!";
} else {
    echo "Fout bij toevoegen afspraak: " . $conn->error;
}

$stmt->close();
$conn->close();
?>
