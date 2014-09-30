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
	case 'listaespecialidades':
			listarEspecialidades();
		break;
	// case 'traumatologia':
	// 		pesquisa($servico);
	// break;			
	default:
		// listaEstab('PA');	
		pesquisa($servico);	
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
		 			  'endereco' => $result[8], 'hr_func' => $result[9], 'img' => $result[10]);

		$safe = array_map('htmlentities',$arr);

		$valores[$contador + 1] = $safe;	
		$contador = $contador + 1;	
	}

	imprime($valores);

}

function listarEspecialidades(){
	$var_recebe =  mysql_query("SELECT * FROM  `tb_especialidades`");
	$num_rows 	= mysql_num_rows($var_recebe);

	if (!$var_recebe) {
		exit;
	}

	while($contador < $num_rows){
			$result 	= mysql_fetch_row($var_recebe);	

		$arr = array('especialidade' => $result[1]);

		$safe = array_map('htmlentities',$arr);

		$valores[$contador + 1] = $safe;	
		$contador = $contador + 1;	
	}

	imprime($valores);

};




function pesquisa($valorPesquisa){
	// $stringPesquisa = ereg_replace ("*", "", $valorPesquisa);
	
	$var_recebe =  mysql_query("SELECT * FROM  `tb_especialidades` WHERE `nome_especialidade` = '$valorPesquisa'");
	

	if (!$var_recebe) {		 
		exit;	
	}else{

		$num_rows 	= mysql_num_rows($var_recebe);

		if ($num_rows < 1) {
			listaEstab('PA');
		}else{

			while($contador < $num_rows){
					$result 	= mysql_fetch_row($var_recebe);	

					if ($result[1] == $valorPesquisa ) {
						$var_recebe_consulta =  mysql_query("SELECT * FROM `tb_estabelecimento` WHERE `cod_estab` IN (SELECT `tb_estabelecimento_cod_estab` FROM `tb_estab_espec` WHERE `tb_especialidades_cod_especialidade` = '$result[0]')");	
						$qtd_linhas 		 = mysql_num_rows($var_recebe_consulta);
						
						if (!$var_recebe_consulta) {
							exit;
						}

						while($contador_aux < $qtd_linhas){
							$result_aux 	= mysql_fetch_row($var_recebe_consulta);


							$arr = array('id' => $result_aux[0], 'nome' => $result_aux[1], 'tipo' => $result_aux[2], 'adm' => $result_aux[3],
							 			 'tel' => $result_aux[4], 'site' => $result_aux[5], 'lat' => $result_aux[6], 'long' => $result_aux[7],
							 			  'endereco' => $result_aux[8], 'hr_func' => $result[9], 'img' => $result[10]);

							$safe = array_map('htmlentities',$arr);

							$valores[$contador_aux + 1] = $safe;	
							$contador_aux = $contador_aux + 1;	
						}

					}
				$contador = $contador + 1;	
			
			}
			imprime($valores);
		}
	}
}

function imprime($valores){
	 $json_str = json_encode($valores);
	 header('Content-type: application/json');
	 echo "$json_str";
}



?>
