var offlineInterval;            // interval used when the websocket disconnects, to update the display with dots
var offlineIntervalRunning = false;
var offlineIntervalCounter = 0;
var thisTimer = {}              // an object that holds the data for this timer 
var timerScreenId = "";
var timerRunningInterval;       // an interval that will be defined when the timer is counting down
var timerRunningIntervalFlag = false;
var timeFlashIntervals = [];
var logging = true;
var logId = 0;
var socket = io.connect({
    reconnection:           true,
    reconnectionDelay:      1000,
    reconnectionDelayMax:   5000,
    reconnectionAttempts:   Infinity
});


$(function () {

    $("#sceneChangeLogo").click(function() {
        socket.emit('printArrays', "");
        console.log("thisTimer",thisTimer);
    });
    
    socket.on('connect', function(reason){
        if (logging) { logger('connect','');   }
        socket.emit('newConnection', {'clientType': clientType, "oldScreenId": getUrlVars()["timerCode"], "newSocketId": socket.id});    
        if (offlineIntervalRunning) {
            clearInterval(offlineInterval);
            offlineIntervalRunning = false;
        }
        $('#offline-div').hide();
        $('#offline-div-content').hide();     
    });   

    socket.on('disconnect', function(reason){
        if (logging) { logger('disconnect','');   }
        $('#offline-div').show();
        $('#offline-div-content').show();
        if (reason === 'io server disconnect') {
            socket.connect();
        }
        $("#loadingDots").html('.');
        if (!offlineIntervalRunning) {
            offlineInterval = setInterval(function(){
                $("#loadingDots").append('.');
                offlineIntervalCounter++;
                if (offlineIntervalCounter > 10) { offlineIntervalCounter = 0;  $("#loadingDots").html('.'); }
            },1000); 
        } 
    });

    socket.on('newTimerScreenId', function(msg){
        if (logging) {  logger('newTimerScreenId',msg);  }
        timerScreenId = msg['newTimerScreenId'];
        $('#code-div').html("Scan the QR code or enter the code <a href=\"http://54.66.111.53:3000/timer/timerControl.html?timerCode="+msg['newTimerScreenId']+"\" target=\"_blank\">"+msg['newTimerScreenId']+"</a> at http://54.66.111.53:3000/timer/timerControl.html");
        $('#offline-div').hide();
        $('#offline-div-content').hide();
        $('#code-input-div').show();
        $("#screenId").text("ID: " + timerScreenId);
        thisTimer = {}
        stopTimer("newTimerScreenId");
        timeFlashIntervalController("timerMessageFlash",null,"clear","#message-div","timerMessageFlash","");
        $("#message-div").hide();
    }); 

    socket.on('newControllerScreenId', function(msg){
        if (logging) {  logger('newControllerScreenId',msg);  }
        controllerScreenId = msg['newControllerScreenId'];
        $("#screenId").text("ID: " + controllerScreenId);
        thisTimer = {}
        stopTimer("newControllerScreenId");
        
    }); 

    socket.on('bing', function(msg) {
        socket.emit('bong',{"bongBy": "timerScreenId: "+timerScreenId});
        var dt = new Date();
        var tTime = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();       
    });

    socket.on('codeInputed', function(msg){ // codeInputed, data
        if (logging) {  logger('codeInputed',msg);  }
        $('#offline-div').hide();
        $("#code-input-div").hide();
        //timerId = msg.timerScreenId;
        thisTimer = msg.data;
        timerIndex = thisTimer.timers.findIndex(p => p.timerId == thisTimer.currentTimer);
        $("#timer-name").text(thisTimer.timerName);
        $('body').css({'background':thisTimer.pageBgColor});
        $("#screenId").text("ID: " + msg.codeInputed);
        if (thisTimer.pageBgImage) {
            socket.emit('getBgImage',{"screenType": "timerScreen","screenId":msg.codeInputed});
        }
        if (thisTimer.timerMessageOnScreen) {
            $("#message-div").html("<p>"+thisTimer.timerMessage.replace(new RegExp("\\n", "g"), "<br />")+"</p>");
            $("#message-div").boxfit();
            $("#message-div").show();
            if (thisTimer.timerMessageFlash) {
                timeFlashIntervalController("timerMessageFlash",1000,"set","#message-div","timerMessageFlash","");
            }
        }
        else {

            timeFlashIntervalController("timerMessageFlash",null,"clear","#message-div","timerMessageFlash","");
            $("#message-div").hide();
        }
        if (history.pushState) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?timerCode='+msg.codeInputed;
            window.history.pushState({path:newurl},'',newurl);
        }
        if (thisTimer.timers.length > 0) { 
            $("#presenter-name").text(thisTimer.timers[timerIndex].presenterName); 
        }
        if (thisTimer.currentTimerRunning){ // if the timer is currently supposed to be running
            startTimer("codeInputed");
        }
        else {
            if (timerRunningIntervalFlag) { 
                stopTimer("codeInputed");
            }
            if (thisTimer.timers.length > 0) {
                if (thisTimer.timers[timerIndex].remainingSeconds) {
                    $("#timerClock").text(formatTime(thisTimer.timers[timerIndex].remainingSeconds,thisTimer.timers[timerIndex].timerId,'codeInputed'));
                }
                else {
                    $("#timerClock").text(formatTime(thisTimer.timers[timerIndex].startSeconds,thisTimer.timers[timerIndex].timerId,'codeInputed'));  
                }
            }

        }
    });

    socket.on('newTimerScreenQR', function(msg){
        if (logging) {  logger('newTimerScreenQR',msg);  }
        QRBgImageBase64Data = msg['newTimerScreenQR']; 
        $('#QRDiv').css({'background-image': 'url("'+QRBgImageBase64Data+'")'});
        $('#QRDiv').css('background-size','cover');
    });

    socket.on('bgImage', function(msg){ //{"data": dataURL});
        if (logging) {  logger('bgImage','');  }
        
        $('body').css('background-image', 'url("'+msg.data+'")');
        $('body').css("background-size", "cover");
        $('body').css("background-repeat", "no-repeat");
        $('body').css("background-attachment", "fixed");
        $('body').css("background-position", "center center");
    });
    
    socket.on('bgImageReceived', function(msg){
        if (logging) {  logger('bgImageReceived','');  }

        $('body').css('background-image', 'url("'+msg.data+'")');
        $('body').css("background-size", "cover");
        $('body').css("background-repeat", "no-repeat");
        $('body').css("background-attachment", "fixed");
        $('body').css("background-position", "center center");
    });

    socket.on('updateTimer', function(msg){ // a timer object was updated on the controller and forwarded by the server
        thisTimer = msg.data;
        if (logging) { logger("updateTimer",thisTimer); }
        
        $("#timer-name").text(thisTimer.timerName);

        $("#timer-name").css({'color':thisTimer.timerMainColor});
        if (!thisTimer.pageBgImage) { 
            $('body').css({'background':thisTimer.pageBgColor});
        }
        if (thisTimer.timerMessageOnScreen) {
            $("#message-div").html("<p>"+thisTimer.timerMessage.replaceAll("\n","<br>")+"</p>");
            $("#message-div").boxfit();
            $("#message-div").show();
            
            if (thisTimer.timerMessageFlash) {
                timeFlashIntervalController("timerMessageFlash",1000,"set","#message-div","timerMessageFlash","");
            }
            else {
                timeFlashIntervalController("timerMessageFlash",null,"clear","#message-div","timerMessageFlash","");
            }
        }
        else {
            timeFlashIntervalController("timerMessageFlash",null,"clear","#message-div","timerMessageFlash","");
            $("#message-div").hide();
        }
        if(thisTimer.timerNameSize != "auto"){$("#timer-name").css({'font-size': thisTimer.timerNameSize+'px'});}else{$("#timer-name").css({'font-size': '5vw'});}
        if(thisTimer.timerNameX != "auto"){$("#timer-name").css({'margin-left': thisTimer.timerNameX+'px','position':'absolute'});}else{$("#timer-name").css({'margin-left': 'auto','position':'relative'});}
        if(thisTimer.timerNameY != "auto"){$("#timer-name").css({'margin-top': thisTimer.timerNameY+'px','position':'absolute'});}else{$("#timer-name").css({'margin-top': 'auto','position':'relative'});}
        
        if(thisTimer.presenterNameSize != "auto"){$("#presenter-name").css({'font-size': thisTimer.presenterNameSize+'px'});}else{$("#presenter-name").css({'font-size': '5vw'});}
        if(thisTimer.presenterNameX != "auto"){$("#presenter-name").css({'margin-left': thisTimer.presenterNameX+'px','position':'absolute'});}else{$("#presenter-name").css({'margin-left': 'auto','position':'relative'});}
        if(thisTimer.presenterNameY != "auto"){$("#presenter-name").css({'margin-top': thisTimer.presenterNameY+'px','position':'absolute'});}else{$("#presenter-name").css({'margin-top': 'auto','position':'relative'});}
        $("#presenter-name").css({'color':thisTimer.timerMainColor});
        
        if(thisTimer.timerSize != "auto"){$("#timerClock").css({'font-size': thisTimer.timerSize+'px'});}else{$("#timerClock").css({'font-size': '20vw'});}
        if(thisTimer.timerX != "auto"){$("#timerClock").css({'margin-left': thisTimer.timerX+'px','position':'absolute'});}else{$("#timerClock").css({'margin-left': 'auto','position':'relative'});}
        if(thisTimer.timerY != "auto"){$("#timerClock").css({'margin-top': thisTimer.timerY+'px','position':'absolute'});}else{$("#timerClock").css({'margin-top': 'auto','position':'relative'});}
        
        if (thisTimer.timers.length > 0) {
            timerIndex = thisTimer.timers.findIndex(p => p.timerId == thisTimer.currentTimer);
            $("#presenter-name").text(thisTimer.timers[timerIndex].presenterName);
        }
        if (thisTimer.currentTimerRunning){ // if the timer is currently supposed to be running
            startTimer("updateTimer");
        }
        else {
            if (timerRunningIntervalFlag) { 
                stopTimer("updateTimer");
            }
                
            if (thisTimer.timers.length > 0) {
                if (thisTimer.timers[timerIndex].remainingSeconds) {
                    
                    $("#timerClock").text(formatTime(thisTimer.timers[timerIndex].remainingSeconds,thisTimer.timers[timerIndex].timerId,'updateTimer'));
                }
                else {
                    
                    $("#timerClock").text(formatTime(thisTimer.timers[timerIndex].startSeconds,thisTimer.timers[timerIndex].timerId,'updateTimer'));  
                }
            }
            else {
                $("#timerClock").text("00:00");
            }
        }
    });

    socket.on('modalRefreshButton', function(msg){
        if (logging) { logger('modalRefreshButton',msg);  }
        window.location.reload();
    });

    function startTimer(whereFrom){
        if (logging) {  logger('startTimer',whereFrom); }
        timerIndex = thisTimer.timers.findIndex(p => p.timerId == thisTimer.currentTimer);
        // check if the interveal is running, therefore the timer is running
        if (!timerRunningIntervalFlag) {
            timerRunningIntervalFlag = true;
            timerRunningInterval = setInterval(function() {
                var now = new Date();
                var nowEpoch = now.getTime(); 
                
                if (thisTimer.timers[timerIndex].remainingSeconds) {
                    thisTimer.timers[timerIndex].remainingSeconds = thisTimer.timers[timerIndex].remainingSeconds-1;
                    if (thisTimer.timers[timerIndex].remainingSeconds <= 0) {
                        if (thisTimer.autoPlay){
                            if (timerIndex < thisTimer.timers.length - 1 && thisTimer.autoPlayLastStop) {
                                stopTimer("");
                            }
                        }
                    }
                } 
                $("#timerClock").text(formatTime(Math.floor((thisTimer.timerRunningEndTime - nowEpoch) / 1000),thisTimer.timers[timerIndex].timerId,'startTimer'));
            },1000);
        }
    }

    function stopTimer(fromWhere){
        if (logging) { logger('stopTimer',fromWhere);  }
        clearInterval(timerRunningInterval); 
        timerRunningIntervalFlag = false; 
        timeFlashIntervalController("timerLessZeroFlashTimerScreen","","clear","#timerScreenWrapper","stopTimer","");
        timeFlashIntervalController("timerLessZeroFlashControlScreen","","clear","#timerScreenWrapper","stopTimer","");
        //$("#timerClock").css("color",thisTimer.timerMainColor);
        //$("#timerScreenWrapper").css("background","transparent");
    }
});