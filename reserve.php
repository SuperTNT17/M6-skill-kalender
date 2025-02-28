<?php
require_once 'config.php';

$json = file_get_contents('php://input');
echo $json;
$data = json_decode($json);
var_dump($data);

// Create connection
try {
    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit; // Stop script execution if connection fails
}

$tijd = date("Y-m-d H:i:s", time());
$papierformaat = $data->paperSize;
$aantal_papier = $data->paperAmount;
$print_type = $data->printType;

try {
    $stmt = $conn->prepare("INSERT INTO reserveringen (tijd, papierformaat, aantal, afdruktype) VALUES (?, ?, ?, ?)");
    $stmt->bindValue(1, $tijd, PDO::PARAM_STR);
    $stmt->bindValue(2, $papierformaat, PDO::PARAM_STR);
    $stmt->bindValue(3, $aantal_papier, PDO::PARAM_INT);
    $stmt->bindValue(4, $print_type, PDO::PARAM_STR);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Reservering opgeslagen"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Opslaan mislukt"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}

// No need to close the connection explicitly in PDO
