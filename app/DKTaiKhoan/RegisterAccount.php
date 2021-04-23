<?php
require("../db_connect.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
	RegisterAccount::DangKyTaiKhoan();
} 

class RegisterAccount
{
	public static function DangKyTaiKhoan()
	{
		//Nếu không up image thì xài cái này
		$obj = file_get_contents('php://input');
		$obj = json_decode($obj, true);
		$idAccount = $obj['idAccount'];
		$Password = $obj['MK'];

		$conn = OpenCon(); //Kết nối tới database

		$queryStr = "INSERT INTO `login`(`idAccount`, `Password`) VALUES ('".$idAccount."','".$Password."')";
		$queryStr1 = "INSERT INTO `profile`(`idAccount`) VALUES ('".$idAccount."')";
		$execQuery = mysqli_query($conn, $queryStr);
		$execQuery1 = mysqli_query($conn, $queryStr1);
		if ($execQuery && $execQuery1) {
			$result = 1; //Đăng ký thành công
		} else {
			$result = 2; //Đăng ký thất bại
		}
		CloseCon($conn); //Close database
		echo json_encode($result);
	}
}
