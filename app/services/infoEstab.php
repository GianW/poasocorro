<?php
include "config.php";

$estabelecimento = $_GET['estab'];

if($estabelecimento <> ""){

	$dadosEstab = infoEstab($estabelecimento);

	$dadosEspecialidade =  infoEspec($estabelecimento);

	$dadosConvenios = infoConvenios($estabelecimento);

	$saida['estabelecimento'] = $dadosEstab;
	$saida['especialidades'] = $dadosEspecialidade;
	$saida['convenios'] = $dadosConvenios;


	imprime($saida);

}




function infoEstab($id){
	$var_recebe =  mysql_query("SELECT * FROM `tb_estabelecimento` WHERE `cod_estab` = $id");
	$num_rows 	= mysql_num_rows($var_recebe);

	if (!$var_recebe) {
		exit;
	}

	while($contador < $num_rows){
		$result 	= mysql_fetch_row($var_recebe);	

		$arr = array('id' => $result[0], 'nome' => $result[1], 'tipo' => $result[2], 'adm' => $result[3],
		 			 'tel' => $result[4], 'site' => $result[5], 'lat' => $result[6], 'long' => $result[7],
		 			  'endereco' => $result[8], 'hr_func' => $result[9], 'img' => $result[10]);

		$safe = array_map('htmlentities',$arr);

		$valores = $safe;	
		$contador = $contador + 1;	
	}

	return $valores;

}

function infoEspec($id){
	$var_recebe =  mysql_query("SELECT * FROM `tb_especialidades` WHERE `cod_especialidade` IN (SELECT `tb_especialidades_cod_especialidade` FROM `tb_estab_espec` WHERE `tb_estabelecimento_cod_estab` = '$id')");
	$num_rows 	= mysql_num_rows($var_recebe);

	if (!$var_recebe) {
		exit;
	}

	while($contador < $num_rows){
		$result 	= mysql_fetch_row($var_recebe);	

		$arr = array('nome' => $result[1], 'descricao' => $result[2]);

		$safe = array_map('htmlentities',$arr);

		$valores[$contador + 1] = $safe;	
		$contador = $contador + 1;	
	}

	return $valores;

}

function infoConvenios($id){
	$var_recebe =  mysql_query("SELECT * FROM `tb_convenio` WHERE `cod_convenio` IN (SELECT `tb_convenio_cod_convenio` FROM `tb_estab_convenio` WHERE `tb_estabelecimento_cod_estab` = '$id')");
	$num_rows 	= mysql_num_rows($var_recebe);

	if (!$var_recebe) {
		exit;
	}

	while($contador < $num_rows){
		$result 	= mysql_fetch_row($var_recebe);	

		$arr = array('nome' => $result[1], 'telefone' => $result[2], 'site' => $result[3]);

		$safe = array_map('htmlentities',$arr);

		$valores[$contador + 1] = $safe;	
		$contador = $contador + 1;	
	}

	return $valores;

}

function imprime($valores){
	 $json_str = json_encode($valores);
	 header('Content-type: application/json');
	 echo "$json_str";
}


?>
