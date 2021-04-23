<?php
date_default_timezone_set('Asia/Ho_Chi_Minh');

require("../db_connect.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
  checkLogin::Login();
}

class checkLogin
{
  public static function Login()
  {
    //Nếu không up image thì xài cái này
    $obj = file_get_contents('php://input');
    $obj = json_decode($obj, true);

    $idAccount = $obj['idAccount'];
    $Password = $obj['MK'];

    $conn = OpenCon(); //Kết nối tới database
    //Check password
    $checkLogin = "SELECT * FROM `login` WHERE idAccount = '$idAccount' AND `Password` = '$Password'";

    $execLogin = mysqli_query($conn, $checkLogin);
    if (mysqli_num_rows($execLogin) == 0) $jwt = 1; //Code 1 sai thông tin đăng nhập
    else $jwt = 0;
    CloseCon($conn); //Close database

    echo json_encode($jwt);
  }
}
