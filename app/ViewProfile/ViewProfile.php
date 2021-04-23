<?php
require("../db_connect.php");

$obj = file_get_contents('php://input');
$obj = json_decode($obj, true);
$conn = OpenCon();

$sql = "SELECT * FROM `profile` WHERE idAccount = '" . $obj['idAccountTuyenDung'] . "'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {

    while ($row[] = $result->fetch_assoc()) {

        $tem = $row;
        $json = json_encode($tem);
    }
} else {
    echo "No Results Found.";
}
echo $json;
$conn->close();
