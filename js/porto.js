var map;
var resposta_json;
var idInfoBoxAberto;
var infoBox = [];
var markers = [];
var latlng; 
var directionsService = new google.maps.DirectionsService();
var directionsDisplay;
var geocoder;
var valorDestino = 0;
var endDestino = "";


function localizaUsuario(){

	latUsuario = document.getElementById('latUsuario');
	longUsuario = document.getElementById('longUsuario');

	geocoder = new google.maps.Geocoder();

	/*Busca posição do usuário, se não usa default */ 
	 if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {    
	    	latlng = new google.maps.LatLng( position.coords.latitude,  position.coords.longitude);     	       
			

			latUsuario.value = position.coords.latitude;
			longUsuario.value = position.coords.longitude;

			var marker = new google.maps.Marker({
					position: new google.maps.LatLng( position.coords.latitude,  position.coords.longitude),
					title: "Usuário",
					map: map,
					draggable: true,
					// icon: 'css/imagens/user.png',	
					icon: 'css/imagens/userMarker2.png',				
					animation: google.maps.Animation.DROP
				});

			google.maps.event.addListener(marker, 'drag', function () {
		        geocoder.geocode({'latLng': marker.getPosition() }, function (results, status) {		        	
		            if (status == google.maps.GeocoderStatus.OK) {
		                    if (results[0]) { 
		                    	$('#latUsuario').val(marker.getPosition().lat());			                    
			                    $('#longUsuario').val(marker.getPosition().lng());
		                }
		            }
		        });
		    });
			
	    });
	}else{
		 latlng = new google.maps.LatLng( -30.0559805, -51.1707677);
	}

	
}

function carregaMapa(){


google.maps.visualRefresh = true;

var options = {
	    zoom: 12,
	    center: latlng,
	    // scrollwheel: false,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    panControl:true,
	    panControlOptions: {
	        position: google.maps.ControlPosition.RIGHT_BOTTOM
	    },
	    mapTypeControl: true,
	    mapTypeControlOptions: {
	        position: google.maps.ControlPosition.TOP_RIGHT
	    },
	    streetViewControlOptions: {
	        position: google.maps.ControlPosition.LEFT_BOTTOM
	    },
	    zoomControl: true,
	    zoomControlOptions: {
	        style: google.maps.ZoomControlStyle.DEFAULT, // SMALL, LARGE ou DEFAULT -> Definição da barra de zoom
	        position: google.maps.ControlPosition.LEFT_CENTER
	    }

	}

	map = new google.maps.Map(document.getElementById("mapa"), options);
}



function initialize() {	

google.maps.visualRefresh = true;
/*Cria mapa*/


// /*Busca posição do usuário, se não usa default */ 
//  if (navigator.geolocation) {
// 	navigator.geolocation.getCurrentPosition(function (position) {    
//     	latlng = new google.maps.LatLng( position.coords.latitude,  position.coords.longitude);     	       
// 		alert(latlng);
// 		var marker = new google.maps.Marker({
// 				position: new google.maps.LatLng( position.coords.latitude,  position.coords.longitude),
// 				title: "usuario",
// 				map: map,
// 				//icon: 'img/marcador.png'
// 				animation: google.maps.Animation.DROP
// 			});
//     });
// }else{
// 	 latlng = new google.maps.LatLng( -30.0559805, -51.1707677);
// }



// latlng = new google.maps.LatLng( -30.0559805, -51.1707677);

var options = {
    zoom: 12,
    center: latlng,
    // scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControl:true,
    panControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    mapTypeControl: true,
    mapTypeControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
    },
    streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.DEFAULT, // SMALL, LARGE ou DEFAULT -> Definição da barra de zoom
        position: google.maps.ControlPosition.LEFT_CENTER
    }
    
};

map = new google.maps.Map(document.getElementById("mapa"), options);


carregarPontos('app/services/buscaDados.php?service=');

// var styles = [{
// 	stylers:[
// 		{hue: "#96E278"},
// 		{saturation: 20},
// 		{lightness: -10},
// 		{gamma: 1.51}
// 	]}];

// var styledMap = new google.maps.StyledMapType(styles,{
// 		name: "Mapa Style"
// });
// mapTypeControlOptions:{
// 	mapTypeids:[google.maps.MapTypeId.ROADMAP, "map_style"]
// }
// map.mapTypes.set('map_style', styledMap);
// map.setMapTypeId('map_style');

var avaibleTags = [
	"Hospital",
	"Pronto Atendimento",
	"Centro de saúde",
	"Unidade Básica de Saúde",
	"Estratégia de saúde da família",
	"Atenção especializada Municipal",
	"Atenção especializada Conveniada"

];

$.getJSON('app/services/buscaDados.php?service=listaespecialidades', function(pontos){
	$.each(pontos, function(index, ponto) {
		avaibleTags.push(ponto.especialidade);

	});
});


 $("#valorPesquisa").autocomplete({
 	source: avaibleTags
 });

}             

function abrirInfoBox(id, marker) {
if (typeof(idInfoBoxAberto) == 'number' || typeof(idInfoBoxAberto) == 'string' && typeof(infoBox[idInfoBoxAberto]) == 'object') {
	infoBox[idInfoBoxAberto].close();
}

infoBox[id].open(map, marker);
idInfoBoxAberto = id;
}

function carregarPontos(caminho) { 

$.getJSON(caminho, function(pontos){
		
		var latlngbounds = new google.maps.LatLngBounds();
		
		$.each(pontos, function(index, ponto) {
			
			/*Trata caracteres especiais retornados pelo JSON*/
			var tratatxt = document.getElementById('tratatexto');
			tratatxt.innerHTML = ponto.nome;
			ponto.nome = tratatxt.innerHTML;
			
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(ponto.lat, ponto.long),
				title: ponto.nome,
				map: map,
				// icon: 'css/imagens/map-green-marker.png',
				animation: google.maps.Animation.DROP
			});
			
			var myOptions = { 				
				content: "<p><h3>" + ponto.nome + "</h3></p><p>"
				+ "<img src='" + ponto.img + "' alt=''></p><hr>"
				+ "<img src='css/imagens/est_cheia.png' alt='1' height='15' width='15'/>"				
				+ "<img src='css/imagens/est_cheia.png' alt='1' height='15' width='15'/>"				
				+ "<img src='css/imagens/est_cheia.png' alt='1' height='15' width='15'/>Nota:3</br>"
				// + "<input type='button' value='Rota' onclick='ponto(" + ponto.lat + "," + ponto.long + ")' /></p>"
				+ "<input type='button' value='Carro' onclick='ponto(" + ponto.lat + "," + ponto.long + ",1)' style='padding:8px;' />"
				+ "<input type='button' value='Pé' onclick='ponto(" + ponto.lat + "," + ponto.long + ",2)' style='padding:8px;' />"
				// + "<input type='button' value='Bike' onclick='ponto(" + ponto.lat + "," + ponto.long + ",3)' />"
				+ "<input type='button' value='Bus' onclick='ponto(" + ponto.lat + "," + ponto.long + ",4)' style='padding:8px;' /></p>"
				+ "<p><b>Endere&ccedil;o:</b></p>"
				+ "<p>" + ponto.endereco + "</p>"
				+ "<p><b>Tel: </b>" + ponto.tel + "	<b>Adm:</b> " + ponto.adm + "</p><p>Especialidades:</p>"
				+ "<p><a target='_blank' href=" + ponto.site + ">Site</a></p>",
				pixelOffset: new google.maps.Size(-150, 0)
        	};

			infoBox[ponto.id] = new InfoBox(myOptions);
			infoBox[ponto.id].marker = marker;
			

			infoBox[ponto.id].listener = google.maps.event.addListener(marker, 'click', function (e) {
				abrirInfoBox(ponto.id, marker);
			});
			
			markers.push(marker);
			
			latlngbounds.extend(marker.position);
		});		


		 // var markerCluster = new MarkerClusterer(map, markers);
		
		 map.fitBounds(latlngbounds);

		 localizaUsuario();
		
	});       	        

} 

function iniciaAjax() { 
var objetoAjax = false; 
if (window.XMLHttpRequest) { 
	objetoAjax = new XMLHttpRequest(); 
} else if (window.ActiveXObject) { 
	try {  
		openbjetoAjax = new ActiveXObject("Msxml2.XMLHTTP"); 
	} catch(e) { 
		try { 
			objetoAjax = new ActiveXObject("Microsoft.XMLHTTP");  
		} catch(ex) {  
			objetoAjax = false; 
                                     } 
       } 
} 
return objetoAjax; 
}

function requisitar (arquivo) { 
	var requisicaoAjax = iniciaAjax();  
	if(requisicaoAjax) { 
		requisicaoAjax.onreadystatechange = function () {  
		mostraResposta(requisicaoAjax);  
		}; 
		requisicaoAjax.open("GET", arquivo, true); 
		requisicaoAjax.send(null); 
	} 
} 

function mostraResposta(requisicaoAjax) { 
	if(requisicaoAjax.readyState == 4) { 
		if(requisicaoAjax.status == 200 || requisicaoAjax.status == 304) { 
			var insere_aqui = document.getElementById("insere_aqui"); 
			resposta_json = requisicaoAjax; 
		} else { 
			alert("Problema na comunicação com o servidor"); 
			} 
	}  
} 

function pesquisa(){	
	divTrajeto = document.getElementById("trajeto-texto");
	divMapa = document.getElementById("mapa");

	divMapa.style.width = "100%";	
	divTrajeto.style.width = "0%";
	divTrajeto.innerHTML = "";
	carregaMapa();

	var stringProcura = document.getElementById("valorPesquisa").value;
	// alert(stringProcura.value.replace(/[\*]/g )); VALIDAR PESQUISA PARA SEGURANÇA
	//pega valor do campo e converte para letras minúsculas
      stringProcura = stringProcura.toLowerCase();
      //faz as substituições dos acentos
      stringProcura = stringProcura.replace(/[á|ã|â|à]/gi, "a");
      stringProcura = stringProcura.replace(/[é|ê|è]/gi, "e");
      stringProcura = stringProcura.replace(/[í|ì|î]/gi, "i");
      stringProcura = stringProcura.replace(/[õ|ò|ó|ô]/gi, "o");
      stringProcura = stringProcura.replace(/[ú|ù|û]/gi, "u");
      stringProcura = stringProcura.replace(/[ç]/gi, "c");
      stringProcura = stringProcura.replace(/[ñ]/gi, "n");
      stringProcura = stringProcura.replace(/[á|ã|â]/gi, "a");

     
	map.clearOverlays();

	carregarPontos("app/services/buscaDados.php?service=" + stringProcura + "");

}

google.maps.Map.prototype.clearOverlays = function() {
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  markers.length = 0;  
}

function ponto(lat, long, transp){

	directionsDisplay = new google.maps.DirectionsRenderer();

	latUsuario = document.getElementById('latUsuario').value;
	longUsuario = document.getElementById('longUsuario').value;

	var options = {
		    zoom: 10,
		    center: latlng,
		    // scrollwheel: false,
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		    panControl:true,
		    panControlOptions: {
		        position: google.maps.ControlPosition.RIGHT_BOTTOM
		    },
		    mapTypeControl: true,
		    mapTypeControlOptions: {
		        position: google.maps.ControlPosition.TOP_RIGHT
		    },
		    streetViewControlOptions: {
		        position: google.maps.ControlPosition.LEFT_BOTTOM
		    },
		    zoomControl: true,
		    zoomControlOptions: {
		        style: google.maps.ZoomControlStyle.DEFAULT, // SMALL, LARGE ou DEFAULT -> Definição da barra de zoom
		        position: google.maps.ControlPosition.LEFT_CENTER
		    }
		    
	};

	map = new google.maps.Map(document.getElementById("mapa"), options);

	directionsDisplay.setMap(map);
	divTrajeto = document.getElementById("trajeto-texto");
	divMapa = document.getElementById("mapa");

	divMapa.style.width = "60%";	
	divTrajeto.style.width = "40%";

	directionsDisplay.setPanel(divTrajeto); // Aqui faço a definição

	if (transp == 2) {
			var request = { // Novo objeto google.maps.DirectionsRequest, contendo:
			      origin: new google.maps.LatLng(latUsuario, longUsuario),   	/*enderecoPartida, // origem*/
			      destination: new google.maps.LatLng(lat, long),				/*enderecoChegada, // destino*/
			      travelMode: google.maps.TravelMode.WALKING 					// meio de transporte
    		};
	}
	/*Se escolhei bike*/
	else if (transp == 3) {
			var request = { // Novo objeto google.maps.DirectionsRequest, contendo:
			      origin: new google.maps.LatLng(latUsuario, longUsuario),   	/*enderecoPartida, // origem*/
			      destination: new google.maps.LatLng(lat, long),				/*enderecoChegada, // destino*/
			      travelMode: google.maps.TravelMode.BICYCLING 					// meio de transporte
    		};
	}
	/*Se escolheu bus */
	else if (transp == 4) {
			var request = { // Novo objeto google.maps.DirectionsRequest, contendo:
			      origin: new google.maps.LatLng(latUsuario, longUsuario),   	/*enderecoPartida, // origem*/
			      destination: new google.maps.LatLng(lat, long),				/*enderecoChegada, // destino*/
			      travelMode: google.maps.TravelMode.TRANSIT 					// meio de transporte
    		};
	}
	/*se não vai de carro*/
	else{
		var request = { // Novo objeto google.maps.DirectionsRequest, contendo:
	      origin: new google.maps.LatLng(latUsuario, longUsuario),   	/*enderecoPartida, // origem*/
	      destination: new google.maps.LatLng(lat, long),				/*enderecoChegada, // destino*/
	      travelMode: google.maps.TravelMode.DRIVING 					// meio de transporte, nesse caso, de carro
	    };	
	};
	

   directionsService.route(request, function(result, status) {
	      if (status == google.maps.DirectionsStatus.OK) { // Se deu tudo certo
	         directionsDisplay.setDirections(result); // Renderizamos no mapa o resultado
	      }
   });
	
}



/*Função para buscar unidade de PA mais proxima do usuário*/
function buscaAtendimento(){
	var latUsuario = document.getElementById("latUsuario");
	var longUsuario = document.getElementById("longUsuario");
	var service = new google.maps.DistanceMatrixService();
	var localUsuario = new google.maps.LatLng(latUsuario.value, longUsuario.value);
	var destinos = "";
	// endDestino = "";
	
	for (var i = 0; i < markers.length; i++) {
		// destinos += markers[i].position + ",";
		
		service.getDistanceMatrix(
		{
			origins: [localUsuario],
			destinations: [markers[i].position],
			travelMode: google.maps.TravelMode.DRIVING,
		    avoidHighways: false,
		    avoidTolls: false
		  }, callback);

		if (i == (markers.length - 1)) {			
			var execTempo = setInterval(function(){resultaResultado();clearInterval(execTempo)}, 2000);
			// clearInterval(execTempo);
		};
	
	}
		
}

function resultaResultado(){
	geocoder.geocode({'address': endDestino}, function(results, status){
		 	if(status == google.maps.GeocoderStatus.OK){
		 		var localizacaoResp = results[0].geometry.location.toString();
		 		var respostaGeocode = localizacaoResp.split(",");
		 		respostaGeocode[0]  = respostaGeocode[0].substring(1, respostaGeocode[0].length);
		 		respostaGeocode[1]  = respostaGeocode[1].substring(0, (respostaGeocode[1].length - 1));

		 		ponto(respostaGeocode[0], respostaGeocode[1], "1");
		 		
 			}
	})
}


function callback(response, status) {
	 if (status == google.maps.DistanceMatrixStatus.OK) {
	 	if (response.rows[0].elements[0].status == "OK") {	 	
	 		var destino = response.destinationAddresses;
	 		if (valorDestino == 0) { valorDestino = response.rows[0].elements[0].distance.value};
	 		if (response.rows[0].elements[0].distance.value < valorDestino) {
	 			valorDestino = response.rows[0].elements[0].distance.value;
	 			endDestino = destino[0]; 	 				 			
	 		};
			// alert(response.rows[0].elements[0].distance.value);	 	 								
	 	};	 	
	 }
  }
