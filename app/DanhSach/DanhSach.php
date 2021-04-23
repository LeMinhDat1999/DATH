<?php
require("../db_connect.php");
$obj = file_get_contents('php://input');
$obj = json_decode($obj, true);
$conn = OpenCon();

$sql = "SELECT  b.*, c.TenHinhThuc, d.HoTen, e.GioiTinh
FROM tuyendung b
JOIN `hinhthuc` c ON b.idHinhThuc = c.idHinhThuc
JOIN `profile` d ON b.idAccount = d.idAccount
JOIN `gioitinh` e ON b.idGioiTinh = e.idGioiTinh
WHERE (b.TieuDe LIKE '%" . $obj['Search'] . "%'
OR b.Luong LIKE '%" . $obj['Search'] . "%'
OR b.DiaChi LIKE '%" . $obj['Search'] . "%'
OR c.TenHinhThuc LIKE '%" . $obj['Search'] . "%'
OR d.HoTen LIKE '%" . $obj['Search'] . "%'
OR e.GioiTinh LIKE '%" . $obj['Search'] . "%')";

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
