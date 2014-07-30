<?php
include "config.php";

$servico = $_GET['service'];
$servico = strtolower($servico);

switch ($servico){	
	case 'pronto atendimento':			
			listaEstab('PA');
		break;
	case'hospital':
			listaEstab('HOSP');			
		break;
	case 'centro de saude':
			listaEstab('CS');
		break;
	case 'unidade basica de saude':
			listaEstab('UBS');
		break;
	case 'estrategia de saude da familia':
			listaEstab('ESF');
		break;
	case 'atencao especializada municipal':
			listaEstab('AEM');
		break;		
	case 'atencao especializada conveniada':
			listaEstab('AEC');
		break;	
	default:
			listaEstab('PA');	
		break;
}


function listaEstab($tipoEstab){
	// $var_recebe =  mysql_query("SELECT * FROM `tb_estabelecimento` WHERE 1");
	$var_recebe =  mysql_query("SELECT * FROM `tb_estabelecimento` WHERE `cod_estab` IN (SELECT `cod_estab` FROM `tb_tipo` WHERE `tipo` = '$tipoEstab')");
	$num_rows 	= mysql_num_rows($var_recebe);


	if (!$var_recebe) {
		exit;
	}

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

function pesquisa($valorPesquisa){
	

}

function imprime($valores){
	 $json_str = json_encode($valores);
	 header('Content-type: application/json');
	 echo "$json_str";
}



?>
