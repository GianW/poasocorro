<?php

$conn = mysql_connect('localhost','root','');

mysql_select_db('poasocorro',$conn);

$var_recebe =  mysql_query("SELECT * FROM `tb_estabelecimento` WHERE 1");
$num_rows 	= mysql_num_rows($var_recebe);


if (!$var_recebe) {
	exit;
}

while($contador < $num_rows){
	$result 	= mysql_fetch_row($var_recebe);	

	$arr = array('id' => $result[0], 'nome' => $result[1], 'tipo' => $result[2], 'adm' => $result[3],
	 			 'tel' => $result[4], 'site' => $result[5], 'lat' => $result[6], 'long' => $result[7],
	 			  'endereco' => $result[8]);

	$valores[$contador + 1] = $arr;	
	$contador = $contador + 1;
}

 $json_str = json_encode($valores);
 echo "$json_str";

?>
