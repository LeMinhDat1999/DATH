<?php
require("../db_connect.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    Updateprofile::CapNhatThongTin();
}
class Updateprofile
{
    public static function CapNhatThongTin()
    {
        $obj = file_get_contents('php://input');
        $obj = json_decode($obj, true);
        $HoTen = $obj['HoTen'];
        $idNganh = $obj['idNganh'];
        $Phone = $obj['Phone'];
        $CMND = $obj['CMND'];
        $idGioiTinh = $obj['idGioiTinh'];
        $DiaChi = $obj['DiaChi'];

        $conn = OpenCon(); //Kết nối tới database
        $queryStr = "UPDATE `profile` set `HoTen`= '$HoTen' ,`idNganh`= '$idNganh' ,`Phone`= '$Phone ',`CMND`= '$CMND',`idGioiTinh`= '$idGioiTinh' ,`DiaChi`= '$DiaChi' where idAccount = '" . $obj['idAccount'] . "'" ;
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
