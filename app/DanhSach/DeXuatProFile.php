<?php
require("../db_connect.php");
$obj = file_get_contents('php://input');
$obj = json_decode($obj, true);
$conn = OpenCon();

$sql = "SELECT  b.*, c.TenHinhThuc
FROM tuyendung b
JOIN `hinhthuc` c ON b.idHinhThuc = c.idHinhThuc
WHERE ( b.idAccount LIKE '%" . $obj['idAccountTuyenDung'] . "%'
OR b.TieuDe LIKE '%" . $obj['TieuDe'] . "%'
OR c.TenHinhThuc LIKE '%" . $obj['HinhThuc'] . "%'
OR b.Luong LIKE '%" . $obj['Luong'] . "%'
OR b.DiaChi LIKE '%" . $obj['DiaChi'] . "%')";

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
