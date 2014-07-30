<?php
	include "../services/config.php";

	$requisicao = $_GET['servico'];
	$estab 		= $_GET['estab'];


	switch ($requisicao){
		case 'tipos':
				listaTipos($estab);
			break;	
		case 'buscaEstab':
				buscaEstab($estab);
			break;	
		case 'addEstab':
				addEstab($estab);
			break;		
		default:
			# code...
			break;

	}

function addEstab($estab){
	$entrada = explode("*", $estab);

$var_recebe = mysql_query("INSERT INTO  `poasocorro`.`tb_estabelecimento` (`nome` ,`tipo` ,`adm` ,`telefone` ,`site` ,`latitude` ,
		`longitude` ,`endereco`) VALUES ($entrada[0], $entrada[1], $entrada[2],  $entrada[3], $entrada[4], $entrada[5], $entrada[6],
		 $entrada[7]);");

echo $entrada[0], $entrada[1], $entrada[2],  $entrada[3], $entrada[4], $entrada[5], $entrada[6],
		 $entrada[7];
	
	// $num_rows = mysql_num_rows($var_recebe);

	// echo $num_rows;




}

function listaTipos($estab){

	$var_recebe =  mysql_query("SELECT * FROM `tb_tipo` WHERE `cod_estab` = $estab");

	$num_rows 	= mysql_num_rows($var_recebe);

	while($contador < $num_rows){
		$result 	= mysql_fetch_row($var_recebe);	

		$arr = array('tipo' => $result[1]);

		$safe = array_map('htmlentities',$arr);

		$valores[$contador + 1] = $safe;	
		$contador = $contador + 1;	
	}

	imprime($valores);
}

function buscaEstab($estab){
	$var_recebe =  mysql_query("SELECT * FROM `tb_estabelecimento` WHERE `cod_estab` = $estab");

	$num_rows 	= mysql_num_rows($var_recebe);

	while($contador < $num_rows){
		$result 	= mysql_fetch_row($var_recebe);	

		$arr = array('id' => $result[0], 'nome' => $result[1], 'tipo' => $result[2], 'adm' => $result[3],
		 			 'tel' => $result[4], 'site' => $result[5], 'lat' => $result[6], 'long' => $result[7],
		 			  'endereco' => $result[8]);

		$safe = array_map('htmlentities',$arr);

		$valores[$contador + 1] = $safe;	
		$contador = $contador + 1;	
	}

	imprime($valores);

}


function imprime($valores){

	 $json_str = json_encode($valores);
	 header('Content-type: application/json');
	 echo "$json_str";
}
	
?>