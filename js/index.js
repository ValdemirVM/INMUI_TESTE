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
 
//$.mobile.activePage[0].id //id da pagina atual
//pagina atual (fromPage)
//nova pagina(toPage)
// $( '#aboutPage' ).on( 'pageinit',function(event){  //na inicialização de pagina
//  alert( 'This page was just enhanced by jQuery Mobile!' );
//});
//

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

//BOTÃO SAIR OU VOLTAR
function onBackPress(e) {
	//if($.mobile.activePage.is("#page_init")){
		e.preventDefault();
		
		var sair = confirm("SAIR?");
		if (sair){
			navigator.app.exitApp();
		}
		
   // }else{
        //navigator.app.backHistory();
    //}
}
function onLoad_back() {
	document.getElementById("exit_app").addEventListener("click", onBackPress, false);
	document.getElementById("exit_app2").addEventListener("click", onBackPress, false);
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

//AUDIO
function playAudioId(id) { //Executar audio com botões chamando os ids dos audios	
    var audioElement = document.getElementById(id);
    var url = getPhoneGapPath() + audioElement.getAttribute('src');
    var my_media = new Media(url
            // success callback
             //,function () { console.log("playAudioId():Audio Success"); }
            // error callback
             //,function (err) { console.log("playAudioId():Audio Error: " + err); }
    );
           // Play audio
    my_media.play();
}

function playAudio(name_sound) { //Executar audio
	var som = new Media(getPhoneGapPath() + name_sound);
	//var som = new Media(getPhoneGapPath() + name_sound, this.onSuccess, this.mediaError);
	som.play();
	//som.release();// libera som da memória
}

//WEBSOCKETS
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


function resize_text_websockets () {
	alturaTela = $(window).height(); //Altura da tela
	document.getElementById('taLog').style.height = Math.ceil(alturaTela/2) +'px'; //Define altura
	//document.getElementById('taLog').style.height = document.getElementById('taLog').scrollHeight+'px'; //Aumenta altura a medida que insere texto
	document.getElementById('taLog').scrollTop = document.getElementById('taLog').scrollHeight;
}

        var ortcClient = null,
            url = 'http://ortc-developers.realtime.co/server/2.1/',
            applicationKey = 'X4Qz1S',
            authenticationToken = 'mtnmcpNrerWb',
            channel = 'my_channel';

        // Log function
        var Log = function (text) {
            document.getElementById('taLog').value += "\n" + text;
        }

        // Sends a message
        function send() {
            var message = document.getElementById('txtMessage').value;
            Log("Message sent to channel: " + channel + ": " + message);
            ortcClient.send(channel, message);
        };

        // Displays a message received
        var onMessage = function (client, channel, message) {
			playAudio("sounds/do.mp3");
            Log('Message received from channel ' + channel + ': ' + message);
			resize_text_websockets();      
           			
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
                        Log("Subscribed channel " + channel);
                    };

                    // Callback for when we get an exception
                    ortcClient.onException = function (ortc, exception) {
                        Log('Exception: ' + exception);
                    };

                    // Connects to the ORTC server
                    Log("Connecting...");
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

//Links
function bts_app(){
	//$(document).on("pageinit", "#p1", function () {
    $(document).on('tap', '#bt_menu', function(){
		$.mobile.pageContainer.pagecontainer("change", "#painel_lateral", {
            stuff: this.id,
            transition: "flip"
		});
	});
	//});
	$(document).on('tap', '#bt_menu2', function(){
		$.mobile.pageContainer.pagecontainer("change", "#painel_lateral2", {
            stuff: this.id,
            transition: "flip"
		});
	});	
}

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
    
	app.receivedEvent('deviceready');
    	
        initPushwoosh(); //Função de push
		
		loadScript("phonegap-websocket.js",function(){ //websockets
			createClient();
			resize_text_websockets (); //Para redimencionar textarea que recebe os textos		
		});
		
		onLoad_back(); //BT SAIR
		   
		//Carrega audio do show
		if($.mobile.activePage[0].id== "page_init"){
			html5audio.play();
			return false;
		}else{
			html5audio.stop();
			return false;
		}
		
		bts_app();//Links

	},
	onOffline: function() { 
		alert("sem conexão");
		navigator.app.exitApp();
	},
	 // Update DOM on a Received Event
	receivedEvent: function(id) {
	
		if( window.plugins && window.plugins.NativeAudio ) {
	
				window.plugins.NativeAudio.preloadSimple('sounds/do.mp3', 'sounds/do.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
				window.plugins.NativeAudio.preloadSimple('sounds/dosu.mp3', 'sounds/dosu.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
				window.plugins.NativeAudio.preloadSimple('sounds/re.mp3', 'sounds/re.mp3', function(msg){console.info(msg)}, function(msg){ console.error( 'Error: ' + msg ); });
			   
		}

    
	},	
	play: function(bts_sounds) {
        document.getElementById(bts_sounds).classList.add('touched');
        window.plugins.NativeAudio.play('sounds/' + bts_sounds + '.mp3', function(msg){console.info(msg), document.getElementById(bts_sounds).classList.remove('touched');}, function(msg){ console.error( 'Error: ' + msg ); });
    },
    
	touchEnd: function(event) {
		event.target.className = 'bts_sounds';
	}
};
