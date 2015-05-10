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
            if (recTime >= 1800) {
                clearInterval(recInterval);
                mediaRec.stopRecord();
            }
        }, 1000);
    }
	
	// Stop
    function stop_rec_audio() {
        clearInterval(recInterval);
		mediaRec.stopRecord();
    }

    // device APIs are available
    function onDeviceReady_rec_audio() {
        recordAudio();
		stop_rec_audio();
		setAudioPosition_rec(position);
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