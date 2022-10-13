<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM chaprasi";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);


        echo json_encode($users);
        break;


    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO chaprasi(id, sku, name, price, weight, size, length, width, height) VALUES(null, :sku, :name, :price, :weight, :size, :length, :width, :height)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':sku', $user->sku);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':price', $user->price);
        $stmt->bindParam(':weight', $user->weight);
        $stmt->bindParam(':size', $user->size);
        $stmt->bindParam(':length', $user->length);
        $stmt->bindParam(':width', $user->width);
        $stmt->bindParam(':height', $user->height);
        $stmt->execute();
        break;


    case "DELETE":

        $response = (file_get_contents('php://input'));
        $jsonArray = json_decode($response, true);
        $remove = array('[', ']');
        $finalarray = str_replace($remove, "", $jsonArray['json_data']);

        $explode = explode(",", trim($finalarray));

        foreach ($explode as $yu) {
            $id = (int)$yu;
            $sql = "DELETE FROM chaprasi WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
        }

        break;
}
