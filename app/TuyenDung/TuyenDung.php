<?php
require("../db_connect.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    TuyenDung::DangTuyen();
}
class TuyenDung
{
    public static function DangTuyen()
    {
        $obj = file_get_contents('php://input');
        $obj = json_decode($obj, true);
        $idAccount = $obj['idAccount'];
        $TieuDe = $obj['TieuDe'];
        $idHinhThuc = $obj['idHinhThuc'];
        $idGioiTinh = $obj['idGioiTinh'];
        $ThoiGian = $obj['ThoiGian'];
        $Luong = $obj['Luong'];
        $DiaChi = $obj['DiaChi'];
        $NoiDung = $obj['NoiDung'];
        $conn = OpenCon();

        $queryStr = "INSERT INTO `tuyendung` VALUES('','" . $idAccount . "','" . $TieuDe . "', null ,'" . $idHinhThuc . "','" . $idGioiTinh . "','" . $ThoiGian . "','" . $Luong . "','" . $DiaChi . "','" . $NoiDung . "')";
        $execQuery = mysqli_query($conn, $queryStr);
        if ($execQuery) {
            $result = 1; //Đăng ký thành công
        } else {
            $result = 2; //Đăng ký thất bại
        }
        CloseCon($conn); //Close database
        echo json_encode($result);
    }
}
