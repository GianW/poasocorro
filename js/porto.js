var map;
var resposta_json;
var idInfoBoxAberto;
var infoBox = [];
var markers = []; 

function initialize() {	

/*Cria mapa*/
var latlng = new google.maps.LatLng( -30.0559805, -51.1707677);

var options = {
    zoom: 12,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControl:false,
    overViewMapControl:false
};

map = new google.maps.Map(document.getElementById("mapa"), options);


carregarPontos();

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

}             

function abrirInfoBox(id, marker) {
if (typeof(idInfoBoxAberto) == 'number' || typeof(idInfoBoxAberto) == 'string' && typeof(infoBox[idInfoBoxAberto]) == 'object') {
	infoBox[idInfoBoxAberto].close();
}

infoBox[id].open(map, marker);
idInfoBoxAberto = id;
}

function carregarPontos() { 


$.getJSON('app/buscaDados.php', function(pontos){
		
		var latlngbounds = new google.maps.LatLngBounds();
		
		$.each(pontos, function(index, ponto) {
									
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(ponto.lat, ponto.long),
				title: ponto.nome,
				map: map,
				//icon: 'img/marcador.png'
				animation: google.maps.Animation.DROP
			});
			
			var myOptions = {
				content: "<p><h3>" + ponto.nome + "</h3>Nota:3</p><p>" + ponto.endereco + "</p><p>Especialidades</p>",
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
		
		 var markerCluster = new MarkerClusterer(map, markers);
		
		 map.fitBounds(latlngbounds);
		
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

