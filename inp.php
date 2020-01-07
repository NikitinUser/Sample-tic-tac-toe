<?php 
$inpMes = trim($_POST['inpMes']);
$id = trim($_POST['id']);
$arr = array( $inpMes, $id );
file_put_contents( 'apps.txt', json_encode( $arr ) );
 ?>