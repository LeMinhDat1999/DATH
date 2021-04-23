<?php
require("../db_connect.php");
$obj = file_get_contents('php://input');
$obj = json_decode($obj, true);
$conn = OpenCon();

$sql = "SELECT a.*,b.GioiTinh, c.TenHinhThuc
FROM tuyendung a
JOIN `gioitinh` b ON b.idGioiTinh = a.idGioiTinh
JOIN `hinhthuc` c ON c.idHinhThuc = a.idHinhThuc

WHERE (b.GioiTinh LIKE '%" . $obj['GioiTinh'] . "%'
OR a.TieuDe LIKE '%" . $obj['TenNganh'] . "%'
OR a.DiaChi LIKE '%" . $obj['DiaChi'] . "%' )"; 




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
