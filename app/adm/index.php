<?
	include "../services/config.php";

	$var_recebe =  mysql_query("SELECT * FROM `tb_estabelecimento`");
	$num_rows 	= mysql_num_rows($var_recebe);


	while($contador < $num_rows){
		$result 	= mysql_fetch_row($var_recebe);	

		$arr = array('id' => $result[0], 'nome' => $result[1], 'tipo' => $result[2]);

		$safe = array_map('htmlentities',$arr);

		$valores[$contador + 1] = $safe;	
		$contador = $contador + 1;	
	}

?>
<!doctype html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<title>Manutenção</title>
	<script src="../../js/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/estilo.css"> 
	<script>	
		function inicio(){
			var zebrar=document.querySelectorAll('tbody tr')
	
			for(var i=1;i<zebrar.length;i+=2){
		    	zebrar[i].className='odd'  
   			 }
		
		}

		function select(linha){
			var zebrar =document.querySelectorAll('tbody tr');
			var lastLine = zebrar.length % 2

			if(linha.className == 'sel'){
				for(var i=1;i<zebrar.length;i+=2){
		    		zebrar[i].className='odd';
		    		zebrar[i-1].className='';

		    		 if(lastLine == 1){
				    	var j = zebrar.length; 
				    	zebrar[j-1].className='';
				    };
		    	 };
			}else{
				for(var i=1;i<zebrar.length;i+=2){
			    	zebrar[i].className='odd';
			    	zebrar[i-1].className='';	    	
			    
				    if(lastLine == 1){
				    	var j = zebrar.length; 
				    	zebrar[j-1].className='';
				    };
		 		};
		 	}

			linha.className='sel';

			codEstab = linha.getElementsByTagName("th");

			tabelaTipo = document.getElementById('tbTipos');

			tabelaTipo.innerHTML = "<thead><tr><th>TIPO</th></tr></thead><tbody>";

			$.getJSON('buscaTipo.php?servico=tipos&estab=' + codEstab[0].innerHTML, function(pontos){
				if (pontos != null) {
					$.each(pontos, function(index, ponto) {
						tabelaTipo.innerHTML += "<tr><th>" + ponto.tipo + "</th></tr>";						
					});
				};
			});

			tabelaTipo.innerHTML += "</tbody>"
			
		}
		
		function deletar(linha){
			alert(linha);
		}

		function editar(linha){
			codEstab = linha.getElementsByTagName("th");
			
			window.open("cadastroEstabelecimento.html?pesquisa="+  codEstab[0].innerHTML , "" , "width=750, height=360");			
		}

		function adcionaEstab(){
			window.open("cadastroEstabelecimento.html", "" , "width=750, height=360");
		}

		function addTipo(){
			tabelaEstab = document.getElementById("listaEstabelecimentos");
			aux = tabelaEstab.getElementsByClassName("sel").innerHTML;
			alert(aux);
		}
	</script>
</head>
<body onload="inicio()">
	<header>
		<h2>Manutenção de estabelecimentos</h2>
	</header>
	<section id="conteudo">
		<div id="addEstab" onclick="adcionaEstab();">ADD</div>
		<div id="listaEstabelecimentos">			
			<table BORDER RULES=cols>
				<thead >
					<tr>
						<th>ID</th>
						<th>NOME</th>
						<th>TIPO</th>
					</tr>
				</thead>
				<tbody>
				<?php		
				$contador = 1;
				while($contador < $num_rows){
					echo "<tr onclick='select(this)' ondblclick='editar(this)'><th>",
						 $valores[$contador][id], "</th><th>",
					 	 $valores[$contador][nome], "</th><th>",
					 	 $valores[$contador][tipo],"</th>";
					$contador = $contador + 1;	
				}		
			    ?>
			    </tbody>
			</table>
		</div>
		<div id="listaTipos">
			<table id="tbTipos">
				<thead>
					<tr>
						<th>TIPO</th>
					</tr>
				</thead>
			</table>
			<p onclick="addTipo()">ADD</p>			
		</div>		 
			
		
	</section>

</body>
</html>