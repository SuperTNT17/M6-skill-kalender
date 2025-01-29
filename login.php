<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kalender_reserveringen";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Verbinding mislukt: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$gebruikersnaam = $data['username'];
$wachtwoord = md5($data['password']); // Encrypt wachtwoord

$stmt = $conn->prepare("SELECT * FROM gebruikers WHERE gebruikersnaam = ? AND wachtwoord = ?");
$stmt->bind_param("ss", $gebruikersnaam, $wachtwoord);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "success", "message" => "Ingelogd"]);
} else {
    echo json_encode(["status" => "error", "message" => "Onjuiste login"]);
}

$stmt->close();
$conn->close();
?>
