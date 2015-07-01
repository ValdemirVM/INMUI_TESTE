/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 //pagina atual (fromPage)
//nova pagina(toPage)
// $( '#aboutPage' ).on( 'pageinit',function(event){  //na inicialização de pagina

function carregar_bts(){//Função para carregar botões
		
	function bt_to_pages(id_bt, id_page){	//FUNÇÃO PARA BOTÕES
		$( id_bt ).on( "tap", function( event ) {  
			$.mobile.pageContainer.pagecontainer('change', id_page, {
				transition: 'slide', //Transição
				changeHash: true, //entrada de histórico do navegador para usar o bt voltar (hash #)
				reverse: false, //Transição em sentido inverso
				reload: false, //refresh usado apenas quando é uma url
				type: 'get', //Tipo de solicitação http, apenas quando é url (padrão é get)- changeHash: false
				role: 'page', //Tipo de de data-role  
				showLoadMsg: true //Mensagem de loading
			});
		});	
	}
	
	$( ".bt_to_menu" ).on( "tap", function( event ) { //Bt da home para Menu lateral
		$( "#painel_lateral" ).panel( "open");
	});
	
	$( ".bt_to_vivo" ).on( "tap", function( event ) {  //Bt da home para play ao vivo
		$.mobile.pageContainer.pagecontainer('change', '#chat_sound_page', {
				transition: 'flip', //Transição
				changeHash: true, //entrada de histórico do navegador para usar o bt voltar (hash #)
				reverse: false, //Transição em sentido inverso
				reload: false, //refresh usado apenas quando é uma url
				type: 'get', //Tipo de solicitação http, apenas quando é url (padrão é get)- changeHash: false
				role: 'page', //Tipo de de data-role  
				showLoadMsg: true //Mensagem de loading
		});
	});
	
	$( "#bt_to_vivo" ).on( "tap", function( event ) {  //Bt da menu para play ao vivo
		if($.mobile.activePage[0].id== "show"){
			$( "#painel_lateral" ).panel( "close" );
		}else{
			$.mobile.pageContainer.pagecontainer('change', '#show', { role: 'page', transition: 'slide' });
		}
	});
	
	$( "#bt_to_home" ).on( "tap", function( event ) {  //Bt do menu lateral para home
		if($.mobile.activePage[0].id== "page_init"){
			$( "#painel_lateral" ).panel( "close" );
		}else{
			$.mobile.pageContainer.pagecontainer('change', '#page_init', { role: 'page', transition: 'slide' });
		}
	});
	
	$( "#bt_to_chat_musical" ).on( "tap", function( event ) {  //Bt do menu lateral para CHATTEXT MUSICAL
		if($.mobile.activePage[0].id== "chat_sound_page"){
			$( "#painel_lateral" ).panel( "close" );
		}else{
			$.mobile.pageContainer.pagecontainer('change', '#chat_sound_page', { role: 'page', transition: 'slide' });
		}
	});
	
	$( "#bt_to_treine" ).on( "tap", function( event ) {  //Bt do menu lateral para TREINE
		if($.mobile.activePage[0].id== "treine"){
			$( "#painel_lateral" ).panel( "close" );
		}else{
			$.mobile.pageContainer.pagecontainer('change', '#treine', { role: 'page', transition: 'slide' });
		}
	});
	
	$( "#bt_to_info" ).on( "tap", function( event ) {  //Bt do menu lateral para CHATTEXT
		if($.mobile.activePage[0].id== "info"){
			$( "#painel_lateral" ).panel( "close" );
		}else{
			$.mobile.pageContainer.pagecontainer('change', '#info', { role: 'page', transition: 'slide' });
		}
	});
	
	$( ".bt_to_online" ).on( "tap", function( event ) { //Bt do show para useruarios online
		$( "#painel_lateral_direito" ).panel( "open");
	});
	
	$( "#bt_to_player" ).on( "tap", function( event ) { //Bt do show para useruarios online
		$( "#painel_lateral_treine" ).panel( "open");
	});
		
	//$( "#bt_to_chat_text" ).on( "tap", function( event ) {  //Bt do menu lateral para home
			//$.mobile.pageContainer.pagecontainer('change', 'chat_inmui.html', { role: 'page', transition: 'slide', reload: true, showLoadMsg: true });
	//});
	  
	$( "#exit_app" ).on( "tap", function( event ) {  //Bt do menu lateral para SAIR
		
			navigator.notification.confirm(
            "SAIR?",
            function (button) {
              if (button==2) {
                navigator.app.exitApp();
              }
            }, "Confirmar", ["Cancel","OK"] );

	});//Bt do menu lateral para SAIR
	
}//Fim de função carregar_bts

//GERAR STRING RANDOMICA
function randomString(tamanho){
	var randomstr = "";
	var alpha = new Array("1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f","g","h",
"i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
	for (var i=0; i < tamanho; i++){
		var randomnumber=Math.floor(Math.random()*36);
		randomstr += alpha[randomnumber];
	}
		return randomstr;
}

/***** FUNÇÃO PARA TOOGLE DE VALOR DE INPUT TEXT  *****/
jQuery.fn.inputtoggle = function(){
	$(this).each(function(index){ 
		var myvalue = $(this).attr("value"); 
		$(this).focusin(function(){
		if($(this).val() == myvalue)
			$(this).val("");
	    });  
	    $(this).focusout(function(){
			if($(this).val() === "")
				$(this).val(myvalue);
		});
	});    
};

function ajax_inmui(id_input, url_envio){
		var theName = $.trim($(id_input).val());
 
		if(theName.length > 0){
                $.ajax({
                  type: "GET",
                  url: url_envio, //"http://www.inmui.hol.es/callajax.php"
                  data: ({name: theName}),
                  cache: false,
                  dataType: "text",
                  success: onSuccess
                });
            }
   
 
		$("#resultLog").ajaxError(function(event, request, settings, exception) {
			$("#resultLog").html("Error Calling: " + settings.url + "<br />HTTP Code: " + request.status);
        });
 
		function onSuccess(data){
			//$("#resultLog").html("Result: " + data);
			alert("Result: " + data);
		}
 
}

//Verifica se ja existe login
function verifica_key(){
	
	var key= '';
	
	db = window.sqlitePlugin.openDatabase({name: "db_inmui"});
	
	db.transaction(function(tx) {
		// Cria a Tabela "tabela_testes"
		tx.executeSql('CREATE TABLE IF NOT EXISTS apelidos_inmui (id integer primary key, apelido text)');
		// Faz uma busca na tabela
		tx.executeSql("SELECT * FROM apelidos_inmui;", [], function(tx, res) {
		//alert("Quantidade Resultados: " + res.rows.length);
		//for (var i = 0;i<=res.rows.length;i++){
			//alert("Linha "+i+": "+res.rows.item(i).apelido);
		//}
		if(res.rows.length > 1){
			key= res.rows.item(0).apelido;
		}else{
			key= 0;
		}
		
		});
	});
	
	return key;
}
//Login do app
function login_inmui(){ 
	var key= ''; 
	var text_key = $("#login_inmui").val(); //Key login
	
	if(text_key.length < 2 || text_key == 'Digite um apelido.'){ //login vazio
		alert('Escreva um apelido com 2 ou mais caracteres!');
		
	}else{
	
		
		if(verifica_key() == 0){ //Se não existe key
		
			//sql
			db = window.sqlitePlugin.openDatabase({name: "db_inmui"});
				db.transaction(function(tx) {
					
				// Cria a Tabela "tabela_testes"
				tx.executeSql('CREATE TABLE IF NOT EXISTS apelidos_inmui (id integer primary key, apelido text)');
				// Adiciona um elemento a tabela
				tx.executeSql("INSERT INTO apelidos_inmui (apelido) VALUES (?)", [text_key]);
			
				tx.executeSql("SELECT * FROM apelidos_inmui;", [], function(tx, res) {
					key= res.rows.item(0).apelido;
					$('.bt_to_menu').show(); //Desabilita link do app 
					$('.bt_to_vivo').show();
					$('.footer_init_inmui').hide(); //Footer de login
				});		
			});			 
		}else{
			alert("Erro no app (key clonado)"); 
			
		}//Se não existe key
		
		//Colocar aqui o ajax para enviar o key logado e enviar um push
	
	}//login vazio
}

//Check o tipo de conexão
function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            //alert('Connection type: ' + states[networkState]);		
}

//Função Carregamento
function showLoading_Mobile(){ 
		$.mobile.loading( 'show', {
			text: "Aguarde...",
			textVisible: true,
			theme: "a",
			textonly: false,
			html: ""
		});
}
function hideLoading_Mobile(){ 
		$.mobile.loading('hide');
}

//Caminho raiz android phonegap
function getPhoneGapPath() { 
    var path = window.location.pathname;
    path = path.substr( path, path.length - 10 );
    return 'file://' + path;

};

//WEBSOCKETS
function resize_text_websockets (id) {
	alturaTela = $(window).height(); //Altura da tela
	document.getElementById(id).style.height = Math.ceil(alturaTela/2) +'px'; //Define altura
	//document.getElementById('taLog').style.height = document.getElementById('taLog').scrollHeight+'px'; //Aumenta altura a medida que insere texto
	document.getElementById(id).scrollTop = document.getElementById(id).scrollHeight;
}

		var loadScript = function (url, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";

            if (script.readyState) {  //IE
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {  //Others
                script.onload = function () {
                    callback();
                };
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        };     

        //WEBSOCKETS PARA CHAT DE TEXTO
		//EM OUTRA PAGINA EXTERNA
		
		//WEBSOCKETS PARA EXECUÇÃO DE SONS
		var ortcClient = null,
            url = 'http://ortc-developers.realtime.co/server/2.1/',
            applicationKey = 'tTewbi',
            authenticationToken = '0qJPpzTJWst6',
            channel = 'my_channel';

        // Log function
        var Log = function (text) {
            document.getElementById('taLog').value += "\n" + text;
        }

        // Sends a message
        function send(nota) {
            //var message = document.getElementById('txtMessage').value;
			ortcClient.send(channel, nota);
            Log("Mensagem enviada: " + channel + ": " + message);
        };		
		
		
		//Variaveis gerais do realtime websockets
        // Displays a message received
        var onMessage = function (client, channel, message) {
            //Log('Message received from channel ' + channel + ': ' + message);
			window.plugins.NativeAudio.play('sounds/' + message + '.mp3', function(msg){console.info(msg), document.getElementById(message).classList.remove('touched');}, function(msg){ console.error( 'Error: ' + msg ); });
			Log(channel + ' : ' + message);
			resize_text_websockets('talog');            			
        };

        // Creates the client and the connection
        var createClient = function () {
            loadOrtcFactory(IbtRealTimeSJType, function (factory, error) {
                // Checks if we have successfuly created the factory
                if (error != null) {
                    console.error(error);
                }
                else {
                    // Creates the factory
                    ortcClient = factory.createClient();                    
                    ortcClient.setClusterUrl(url);

                    // Callback for when we're connected
                    ortcClient.onConnected = function (ortc) {
                        Log("Connected to Realtime server " + ortcClient.getUrl());
                        Log("Transport used: " + ortcClient.getProtocol());
                        ortcClient.subscribe(channel, true, onMessage);
                    };

                    // Callback for when we're subscribed to a channel
                    ortcClient.onSubscribed = function (ortc, channel) {
                        //Log("Subscribed channel " + channel);
						Log("Conectado.");
                    };

                    // Callback for when we get an exception
                    ortcClient.onException = function (ortc, exception) {
                        Log('Exception: ' + exception);
                    };

                    // Connects to the ORTC server
                    Log("Conectando...");
                    ortcClient.connect(applicationKey, authenticationToken);
                }
            });
        };

	//NOTIFICAÇÃO NATIVA
	// alert dialog dismissed
	function alertDismissed() {
		// do something
	}
 	// Show a custom alert
   function showAlert() {
        navigator.notification.alert(
            'Isso é uma notificação!',  // message
			alertDismissed,         // callback
            'INMUI',            // title
            'Ok'                  // buttonName
        );
    }
    // Beep three times
    function playBeep() {
        navigator.notification.beep(3);
    }
    // Vibrate for 2 seconds
    function vibrate() {
        navigator.notification.vibrate(2000);
    }
	
 
/* --------------------- PUSH ------------------------- */
function initPushwoosh() {
	var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
	if(device.platform == "Android")
	{
		registerPushwooshAndroid();
	}

	if(device.platform == "iPhone" || device.platform == "iOS")
	{
		registerPushwooshIOS();
	}
}

var apelido= ""; //Apelido do usuario atual
var str_random = randomString(9);

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		document.addEventListener("offline", this.onOffline, false);
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() { //Insira aqui todas as funções p inicializar
	
		//Mensagens na inicialização
		var msg_init_inmui = ['A terra pede socorro, ajude-a.', 'Salve sua casa, salve o planeta.', 'Ame a sua vida, cuide de seu planeta.', 'A poluição nos mata, nos entristece, nos envelhece.', 'Seja feliz, mantenha limpa as ruas e os rios.', 'Sorria para a esperança de um planeta saudável.', 'Tenha coragem e denuncie os crimes ambientais.', 'Os animais são seres vivos e merecem respeito.', 'Menos carros; mais ar para a vida.', 'Respeite a você mesmo, respeite a natureza.', 'Lembre-se, estamos todos em um só planeta.', 'Todos querem o perfume das flores, mas poucos sujam suas mãos para cultivá-las. <br>(Augusto Cury)', 'Ambiente limpo não é o que mais se limpa e sim o que menos se suja. <br>(Chico Xavier) ', 'A natureza pode suprir todas as necessidades do homem, menos a sua ganância. <br>(Mahatma Gandhi) ', 'A sabedoria da natureza é tal que não produz nada de supérfluo ou inútil. <br>(Nicolau Copérnico) ', 'É triste pensar que a natureza fala e que o gênero humano não a ouve. <br>(Victor Hugo) ', 'A natureza é o único livro que oferece um conteúdo valioso em todas as suas folhas. <br>(Johann Wolfgang von Goethe) ', 'Se soubesse que o mundo se acaba amanhã, eu ainda hoje plantaria uma árvore. <br>(Martin Luther King Jr.) ', 'Digo que minha música vem da natureza, agora mais do que nunca. Amo as árvores, as pedras, os passarinhos. <br>(Tom Jobim) ', 'Nunca o homem inventará nada mais simples nem mais belo do que uma manifestação da natureza. <br>(Leonardo da Vinci) ', 'A terra é insultada e oferece suas flores como resposta. <br>(Rabindranath Tagore) ', 'O animal selvagem e cruel não é aquele que está atrás das grades. É o que está na frente delas. <br>(Axel Munthe) ', 'Só se pode vencer a natureza obedecendo-lhe. <br>(Francis Bacon) ', 'Eu adoraria pintar do jeito que o pássaro canta. <br>(Claude Monet) ', 'Podes cortar todas as flores mas não podes impedir a Primavera de aparecer. <br>(Pablo Neruda)', 'O coração do homem, quando longe da natureza, endurece. <br>(Povo Indígena Lakota) ', 'Às vezes ouço passar o vento; e só de ouvir o vento passar, vale a pena ter nascido. <br>(Fernando Pessoa) ', 'A Floresta Amazônica não pode, ela própria, entrar na Justiça contra os desmatadores. Nós é que temos de fazer isso. <br>(Marina Silva) ', 'O nível da poluição ambiental no planeta é igualada a burrice dos homens. <br>(Edy Gahr) ', 'A responsabilidade social e a preservação ambiental significa um compromisso com a vida. <br>(João Bosco da Silva) ', 'É tão humano escrever sobre conscientização ambiental. Díficil é sustentar essa idéia quando uma pessoa joga o lixo na rua. <br>(Dani Leão) ', 'Quem ama preserva. Preservar o meio ambiente é preservar a VIDA. <br>(Andrea Taiyoo) ', 'Recicle o lixo,feche a torneira quando estiver escovando os dentes... somente você e eu poderemos salvar o mundo. <br>(Andrea Taiyoo) ', 'Preservar o Meio Ambiente é uma lição de todos, futuras gerações agradecem esta idéia. <br>(Carlos Alberto da Silveira) ', 'Preservai a atmosfera do planeta: - chuva não se fabrica!  <br>(AJCMusskoff)'];
		
		//Inicialização do app para verificar o login para bloquear app
		var key= "";
				$('.bt_to_menu').hide(); //Desabilita link do app 
				$('.bt_to_vivo').hide(); 
				$('#div_pass_inmui').show(); //login
				
		$( "#bt_key_pass" ).on( "tap", function( event ) {  //Bt login
			showLoading_Mobile();
		
			var text_key = $.trim($("#login_inmui").val());//Key login
			
			if(text_key.length < 2 || text_key == 'Digite um apelido.'){ //login vazio
				alert('Escreva um apelido com 2 ou mais caracteres!');
			}else{
				
				apelido = str_random + '_' + text_key; //Apelido do usuario atual
 
				$.ajax({
						  type: "POST",
						  url: "http://www.inmui.hol.es/login.php",
						  data: ({name: apelido}),
						  cache: false,
						  dataType: "text",
						  crossDomain: true,
						  success: onSuccess,
						  error: function(xhr, status, error) {// handle error	
						  	alert("ERRO! TENTE NOVAMENTE!");
						  }
				});
		 
				function onSuccess(data){
					//alert(data);
					$('.bt_to_menu').show(); //Aparece botões
					$('.bt_to_vivo').show();
					$('#div_pass_inmui').hide(); //Desaparece login
					hideLoading_Mobile();
					alert('CONECTADO COM SUCESSO!');
					atualiza_users();
					
					var intervalo = window.setInterval(atualiza_users, 600000);//Ajax conectado - 1000 = 1 seg (Atualiza em 10 min = 600000)
				}
				
				function atualiza_users(){
						
						$.ajax({
							  type: "POST",
							  url: "http://www.inmui.hol.es/refresh_login.php",
							  data: ({name: apelido}),
							  cache: false,
							  dataType: "text",
							  crossDomain: true,
							  success: onSuccessRefresh,
							  error: function(xhr, status, error) {// handle error
							  	alert("ERRO! TENTE NOVAMENTE!");
							  }
						});
						
						function onSuccessRefresh(data){
							$('#user_on_vivo').html('<span style="text-align:left;">' + data + '</span>');
						}	
				}
				
			}
		});//Login
	
	
		$("#login_inmui").inputtoggle(); //Toogle input
		$("#txtMessage").inputtoggle(); //Toogle input
		
		carregar_bts(); //Carregar botões
		
        //onDeviceReady_rec_audio(); //PLAYER AUDIO
		
		//$(document).on("pagecontainerhide", function () {
			//if($.mobile.activePage[0].id== "page_init"){ 
				//alert("Saindo?");
			//}
		//});
				
		$(document).on("pagecontainershow", function (e, ui) {//Ações em determinada pagina 
		
			show_msg_init = msg_init_inmui[Math.floor(Math.random() * msg_init_inmui.length)]; //Mensagem popup tela inicial
			document.getElementById("msg_init_inmui").innerHTML = "<h3>" + show_msg_init +"</h3>";
			if($.mobile.activePage[0].id== "page_init"){ 
				$('#popup_msg').popup('open', {
						transition: 'slide'
				});
			}
			
			if($.mobile.activePage[0].id== "show"){  //Radio
				html5audio.play(); //Play streaming
			}
			if($.mobile.activePage[0].id== "chat_sound_page"){ 
				html5audio.play(); //Play streaming
			}
			if($.mobile.activePage[0].id!= "show"){ 
				html5audio.stop(); //Stop streaming
			}
			if($.mobile.activePage[0].id!= "chat_sound_page"){ 
				html5audio.stop(); //Stop streaming
			}
			
			
			
			
		});
		
		loadScript("phonegap-websocket.js",function(){ //websockets
			createClient(); //para texto
			resize_text_websockets('talog'); //Para redimencionar textarea que recebe os textos	
		});
		
		//Largura dos botões de som
		$(document).on("pagecontainershow", function () { 
			var width_bt_som = $( window ).width() / 3 - 32;
			$(".bts_sounds").css({"width": width_bt_som + "px"});
		
				$( window ).on( "orientationchange", function( event ) {
					var width_bt_som = $( window ).width() / 3 - 32;
					$(".bts_sounds").css({"width": width_bt_som + "px"});
				});
		});
		
				
		initPushwoosh(); //Função de push
				
		
		if( window.plugins && window.plugins.NativeAudio ) {
	
				window.plugins.NativeAudio.preloadSimple('sounds/do.mp3', 'sounds/do.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
				window.plugins.NativeAudio.preloadSimple('sounds/dosu.mp3', 'sounds/dosu.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
				window.plugins.NativeAudio.preloadSimple('sounds/re.mp3', 'sounds/re.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });		
				window.plugins.NativeAudio.preloadSimple('sounds/resu.mp3', 'sounds/resu.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
				window.plugins.NativeAudio.preloadSimple('sounds/mi.mp3', 'sounds/mi.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
				window.plugins.NativeAudio.preloadSimple('sounds/fa.mp3', 'sounds/fa.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
				window.plugins.NativeAudio.preloadSimple('sounds/fasu.mp3', 'sounds/fasu.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
				window.plugins.NativeAudio.preloadSimple('sounds/sol.mp3', 'sounds/sol.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
				window.plugins.NativeAudio.preloadSimple('sounds/solsu.mp3', 'sounds/solsu.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
				window.plugins.NativeAudio.preloadSimple('sounds/la.mp3', 'sounds/la.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
				window.plugins.NativeAudio.preloadSimple('sounds/lasu.mp3', 'sounds/lasu.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
				window.plugins.NativeAudio.preloadSimple('sounds/si.mp3', 'sounds/si.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
			
			}
		
		app.receivedEvent('deviceready');

	},
	onOffline: function() { 
		alert("OFFLINE - uma conexão é necessária!");
		navigator.app.exitApp();
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
    
	},	
	play: function(bts_sounds, id) {
        document.getElementById(id).classList.add('touched');
		send(bts_sounds);
        //window.plugins.NativeAudio.play('sounds/' + bts_sounds + '.mp3', function(msg){console.info(msg), document.getElementById(bts_sounds).classList.remove('touched');}, function(msg){ console.error( 'Error: ' + msg ); });
	},
	play_test: function(bts_sounds, id) {
        document.getElementById(id).classList.add('touched');
        window.plugins.NativeAudio.play('sounds/' + bts_sounds + '.mp3', function(msg){console.info(msg), document.getElementById(bts_sounds).classList.remove('touched');}, function(msg){ console.error( 'Error: ' + msg ); });
	},
	touchEnd: function(event) {
		event.target.className = 'bts_sounds';
	}
};

//INICIALIZA FUNÇÕES
app.initialize(); 