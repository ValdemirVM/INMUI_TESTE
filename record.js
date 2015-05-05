

        //PLAY AUDIO
        function onDeviceReady_PlayAudio() {
			var text_bt_play= $('#bt_mp3_treine').text();
			
			$( "#bt_mp3_treine" ).on( "tap", function( event ) {
				
				if(text_bt_play== "PLAY"){
					playAudio("http://www.inmui.hol.es/uploads/TMPGEnc.mp3");
					$("#bt_mp3_treine").html("STOP");
				}
				if(text_bt_play== "STOP"){
					stopAudio();
				} 	
				
			});
			
        }

        // Audio player
        var my_media = null;
        var mediaTimer = null;

        // Play audio
        //
        function playAudio(src) {
            // Create Media object from src
            my_media = new Media(src, onSuccess_audio, onError_audio);

            // Play audio
            my_media.play();

            // Update my_media position every second
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position) + " sec");
                            }
                        },
                        // error callback
                        function(e) {
                            console.log("Error getting pos=" + e);
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }
        }

        // Pause audio
        function pauseAudio() {
            if (my_media) {
                my_media.pause();
            }
        }

        // Stop audio
        function stopAudio() {
            if (my_media) {
                my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
        }

        // onSuccess Callback
        function onSuccess_audio() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback
        function onError_audio(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        // Set audio position
        function setAudioPosition(position) {
            document.getElementById('audio_position_play').innerHTML = position;
        }
		//FIM DE PLAYER DE AUDIO

//GRAVAÇÃO DE AUDIO
function recordAudio() {
        var src = "myrecording.mp3";
        var mediaRec = new Media(src, onSuccess_record, onError_record);

        // Record audio
        mediaRec.startRecord();

        // Stop recording after 10 sec
        var recTime = 0;
        var recInterval = setInterval(function() {
            recTime = recTime + 1;
            setAudioPosition_rec(recTime + " sec");
            if (recTime >= 10) {
                clearInterval(recInterval);
                mediaRec.stopRecord();
            }
        }, 1000);
    }

    // device APIs are available
    function onDeviceReady_rec_audio() {
        recordAudio();
    }
	
	// Stop
    function stop_rec_audio() {
        clearInterval(recInterval);
		mediaRec.stopRecord();
    }

    // onSuccess Callback
    function onSuccess_record() {
        console.log("recordAudio():Audio Success");
    }

    // onError Callback
    function onError_record(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    // Set audio position
    function setAudioPosition_rec(position) {
        document.getElementById('audio_position_rec').innerHTML = position;
    }