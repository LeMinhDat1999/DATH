<?php
require("../db_connect.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    Apply::ApplyCV();
}
class Apply
{
    public static function ApplyCV()
    {
        $obj = file_get_contents('php://input');
        $obj = json_decode($obj, true);
        $idAccount = $obj['idAccount'];
        $idTuyenDung = $obj['idTuyenDung'];
        $idAccountTuyenDung = $obj['idAccountTuyenDung'];
        // $idAcountApply = $obj['leminhdat@gmail.com'];

        $conn = OpenCon();

        $queryStr = "INSERT INTO `apply` VALUES ('','" . $idTuyenDung . "','" . $idAccountTuyenDung . "','" . $idAccount . "')";
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
