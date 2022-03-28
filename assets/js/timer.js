var blinkInterval;
var blinkIntervalSet =          false;

var bgBlinkInterval;
var bgBlinkIntervalSet =        false;

var timerInterval;
var timerIntervalSet =          false;

var timerRunning =              false;
var timerScreenId =             "";
var time =                      0;
var hours =                     0;
var minutes =                   0;
var seconds =                   0;
var controlledId;

var timerMainColor =            "#FFFFFF";
var timerFirstIntervalColor =   "#F5B942";
var timerFirstIntervalTime =    "300";
var timerSecondIntervalColor =  "#FF0000";
var timerSecondIntervalTime =   "120";
var pageBgColor =               "#000000";
var pageBgImage =               "/timer/assets/images/freelan.png";

var timerLessZeroBgColor = "#FF0000";
var timerLessZeroFgColor = "#FFFFFF";
var timerSecondIntervalFlash = false;
var timerFirstIntervalFlash = false;
var timerLessZeroFlash = true;

    var timeFlashIntervals = [];


    function timeFlashIntervalController(intervalName, intervalTime, setClear, element, calledFrom,secondsInput) {
        var found = false;
        var thisNewInterval = [];
        timeFlashIntervals.forEach(function (item, index) {
            if (item.intervalName == intervalName) {
                if (setClear == "clear") {
                    console.log("Clear Interval: "+intervalName);
                    clearInterval(item.intervalId);
                    timeFlashIntervals.splice(index,1);
                    $(element).show();
                }
                found = true;
            }
        });
        if (!found && setClear == "set") {
            if (intervalName == "blinkInterval") {
                console.log("Set Interval: "+intervalName);
                var thisNewIntervalId = setInterval(function() { 
                    $(element).toggle();
                }, intervalTime);
                var thisNewInterval = { "intervalName": intervalName, "intervalId": thisNewIntervalId};
                timeFlashIntervals.push(thisNewInterval);
            }
            if (intervalName == "bgBlinkInterval") {
                console.log("Set Interval: "+intervalName);
                var thisNewIntervalId = setInterval(function() { 
                    $("#wrapper").toggle();
                    $("#timerClock").show();
                }, intervalTime);
                var thisNewInterval = { "intervalName": intervalName, "intervalId": thisNewIntervalId};
                timeFlashIntervals.push(thisNewInterval);
            }
        }
    }

function setBgBlinkInterval() {
    bgBlinkIntervalSet = true;
    bgBlinkInterval = setInterval(function() {
        $( "#wrapper" ).toggle();
    }, 500);
}

function clearBgBlinkInterval() {
    if (bgBlinkIntervalSet) {
        clearInterval(bgBlinkInterval);
        bgBlinkIntervalSet = false;
    }
    $( "#wrapper" ).show();
    $("#wrapper").css('background', 'transparent');
}

function formatTime() {
if (time < 0) {
        if (seconds < 0) {
            if (seconds > -10) { 
                seconds = "0" + Math.abs(seconds);
            }
            else { 
                seconds = Math.abs(seconds); 
            }
        }
        else { 
            if (seconds < 10) { 
                seconds = "0" + seconds; 
            } 
        }

        if (minutes < 0) {
            if (minutes > -10) { 
                minutes = "-0" + Math.abs(minutes); 
            }
            else { 
                minutes = "-"+Math.abs(minutes); 
            }
        }
        else { 
            if (minutes < 10) { 
                minutes = "-0" + minutes; 
            } 
        }
    }
    else {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
    }
}

function updateTimeField() {
    $("#timerClock").text(minutes + ":" + seconds);
}
function parseTime() {
    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);
}
function stopTimer() {
    if (timerIntervalSet) {clearInterval(timerInterval); timerIntervalSet=false; }
    timerIntervalSet = false;
    timerRunning = false;
}
function startTimer() {
    $("#timerClock").show();
    timerRunning = true;
    if (!timerIntervalSet) {
        timerIntervalSet = true;
        timerInterval = setInterval(function () {
            time = time - 1;
            parseTime();
            formatTime();

            if (time > timerFirstIntervalTime) {
                $("#timerClock").css('color', timerMainColor);
                $("#wrapper").css('background', 'transparent');
                $("#presenter-name").css('color', timerMainColor);
                timeFlashIntervalController("bgBlinkInterval", 500, "clear", "#timerClock", "startTimer", time);
                timeFlashIntervalController("blinkInterval", 500, "clear", "#timerClock", "startTimer", time);
                $("#timerClock").show();
                $("#wrapper").show();
            }
            else {
                if (time <= 0) {
                    $("#timerClock").show();
                    $("#wrapper").css('background-color', timerLessZeroBgColor);
                    $("#timerClock").css('color', timerLessZeroFgColor);
                    $("#presenter-name").css('color', timerLessZeroFgColor);
                    timeFlashIntervalController("blinkInterval", 500, "clear", "#timerClock", "startTimer", time);
                    if (timerLessZeroFlash) { timeFlashIntervalController("bgBlinkInterval", 500, "set", "#timerClock", "startTimer", time); }
                }
                else {
                    if (time <= timerSecondIntervalTime) {
                        $("#timerClock").css('color', timerSecondIntervalColor);
                        $("#wrapper").css('background', 'transparent');
                        $("#presenter-name").css('color', timerMainColor);
                        if (timerSecondIntervalFlash) { timeFlashIntervalController("blinkInterval", 500, "set", "#timerClock", "startTimer", time); }
                        timeFlashIntervalController("bgBlinkInterval", 500, "clear", "#timerClock", "startTimer", time);
                        $("#timerClock").show();
                        $("#wrapper").show();
                    }
                    else {
                        if (time <= timerFirstIntervalTime) {
                            $("#timerClock").css('color', timerFirstIntervalColor);
                            $("#wrapper").css('background', 'transparent');
                            $("#presenter-name").css('color', timerMainColor);
                            if (timerFirstIntervalFlash) { timeFlashIntervalController("blinkInterval", 500, "set", "#timerClock", "startTimer", time);  }
                            timeFlashIntervalController("bgBlinkInterval", 500, "clear", "#timerClock", "startTimer", time);  
                            $("#timerClock").show();
                            $("#wrapper").show();
                        }
                    }
                }
            }
            updateTimeField();

        }, 1000);
    }
}



function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function logger(sentFrom, message) {
    console.log("_______________________________________________");
    console.log("---"+sentFrom+"---");
    console.log(message);
    console.log();
}
    
$( function() {
    
            
    $("#backButton").click(function() {  
        window.history.go(-2);
    });
    
    $("#logButton").click(function() {
        console.log();
    });$("#logButton").click(function() {
        console.log();
    });
    var socket = io.connect({
        reconnection:           true,
        reconnectionDelay:      1000,
        reconnectionDelayMax:   5000,
        reconnectionAttempts:   Infinity
    });

    socket.on('reconnect_attempt', function(reason){
        $('#offline-div-reason').append('.');
    });

    socket.on('disconnect', function(reason){
        $('#offline-div').show();
        $('#offline-div-reason').html(reason);
        $('#offline-div-reason').append('<br>Reconnecting<br>');
        if (reason === 'io server disconnect') {
            socket.connect();
        }
    });

    socket.on('connect', function(reason){
        socket.emit('newConnection', {'clientType': 'timerScreen', "oldTimerScreenId": getUrlVars()["timerCode"], "newSocketId": socket.id});
    }); 

    socket.on('bing', function(msg) {
        socket.emit('bong',{"bongBy": "timerScreenId: "+timerScreenId});
        var dt = new Date();
        var tTime = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();       
        
    });

    socket.on('newTimerScreenId', function(msg){
        //logger("newTimerScreenId",msg['newTimerScreenId']);
        timerScreenId = msg['newTimerScreenId'];

        $('#code-div').text("Scan the QR code or enter the code "+msg['newTimerScreenId']+" at http://54.66.111.53:3000/timer/timerControl.html");
        $('#offline-div').hide();
        $('#code-input-div').show();
        $("#timerScreenId").text("ID: " + timerScreenId);
    }); 

    socket.on('codeInputed', function(msg){
        //logger("codeInputed",msg);
        $("#code-input-div").hide();
        controllerId = msg.controllerScreenId;
        $("#timerScreenId").text("ID: " + msg.codeInputed);
        if (history.pushState) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?timerCode='+msg.codeInputed;
            window.history.pushState({path:newurl},'',newurl);
        }
        //parseTime();
        //formatTime();
        //updateTimeField();
    });

    socket.on('newTimerScreenQR', function(msg){
        QRBgImageBase64Data = msg['newTimerScreenQR']; 
        $('#QRDiv').css({'background-image': 'url("'+QRBgImageBase64Data+'")'});
        $('#QRDiv').css('background-size','cover');
    });

    socket.on('presenterNameChanged', function(msg){
        $("#presenter-name").text(msg.presenterNameChanged);

    });

    
    socket.on('timeChanged', function(msg){
        time = msg['timeChanged'];
        
        parseTime();
        formatTime();
        updateTimeField();
        
        
        if (time > timerFirstIntervalTime) {
                $("#timerClock").css('color', timerMainColor);
                $("#wrapper").css('background', 'transparent');
                $("#presenter-name").css('color', timerMainColor);
                timeFlashIntervalController("bgBlinkInterval", 500, "clear", "#timerClock", "startTimer", time);
                timeFlashIntervalController("blinkInterval", 500, "clear", "#timerClock", "startTimer", time);
                $("#timerClock").show();
                $("#wrapper").show();
            }
            else {
                if (time <= 0) {
                    $("#timerClock").show();
                    $("#wrapper").css('background-color', timerLessZeroBgColor);
                    $("#timerClock").css('color', timerLessZeroFgColor);
                    $("#presenter-name").css('color', timerLessZeroFgColor);
                    timeFlashIntervalController("blinkInterval", 500, "clear", "#timerClock", "startTimer", time);
                    if (timerLessZeroFlash) { timeFlashIntervalController("bgBlinkInterval", 500, "set", "#timerClock", "startTimer", time); }
                }
                else {
                    if (time <= timerSecondIntervalTime) {
                        $("#timerClock").css('color', timerSecondIntervalColor);
                        $("#wrapper").css('background', 'transparent');
                        $("#presenter-name").css('color', timerMainColor);
                        if (timerSecondIntervalFlash) { 
                            timeFlashIntervalController("blinkInterval", 500, "set", "#timerClock", "startTimer", time);
                        }
                        timeFlashIntervalController("bgBlinkInterval", 500, "clear", "#timerClock", "startTimer", time);
                        $("#timerClock").show();
                        $("#wrapper").show();
                    }
                    else {
                        if (time <= timerFirstIntervalTime) {
                            $("#timerClock").css('color', timerFirstIntervalColor);
                            $("#wrapper").css('background', 'transparent');
                            $("#presenter-name").css('color', timerMainColor);
                            if (timerFirstIntervalFlash) { timeFlashIntervalController("blinkInterval", 500, "set", "#timerClock", "startTimer", time);  }
                            timeFlashIntervalController("bgBlinkInterval", 500, "clear", "#timerClock", "startTimer", time);  
                            $("#timerClock").show();
                            $("#wrapper").show();
                        }
                    }
                }
            }
        $("#timerClock").show();
    });

    
    
    socket.on('timerStart', function(msg){
        console.log("timerStart");
        startTimer();
    });

    socket.on('timerStop', function(msg){
        console.log("timerStop");
        stopTimer();
    });

    socket.on('timerMainColorChange', function(msg){
        //logger("timerMainColorChange",msg);
        timerMainColor = msg['timerMainColorChange'];
        $("#timerClock").css('color', timerMainColor);
        $("#presenter-name").css('color', timerMainColor);
    }); 

    socket.on('timerFirstIntervalColorChange', function(msg){
        //logger("timerFirstIntervalColorChange",msg);
        timerFirstIntervalColor = msg['timerFirstIntervalColorChange'];
    });

    socket.on('timerFirstIntervalTimeChange', function(msg){
        //logger("timerFirstIntervalTimeChange",msg);
        timerFirstIntervalTime = msg['timerFirstIntervalTimeChange'];
    }); 

    socket.on('timerSecondIntervalColorChange', function(msg){
        //logger("timerSecondIntervalColorChange",msg);
        timerSecondIntervalColor = msg['timerSecondIntervalColorChange'];
    }); 

    socket.on('timerSecondIntervalTimeChange', function(msg){
        //logger("timerSecondIntervalTimeChange",msg);
        timerSecondIntervalTime = msg['timerSecondIntervalTimeChange'];
    }); 

    socket.on('pageBgColorChange', function(msg){
        //logger("pageBgColorChange",msg);
        pageBgColor = msg['pageBgColorChange'];
        $('html').css('background-color', pageBgColor);
    }); 

    socket.on('pageBgImageUpload', function(msg){
        pageBgImage = msg['pageBgImageUpload'];
        $('body').css("background-image", 'none');
        $('html').css('background-image', "url('"+pageBgImage+"')");
        $('html').css("background-size", "cover");
        $('html').css("background-repeat", "no-repeat");
        $('html').css("background-attachment", "fixed");
        $('html').css("background-position", "center center");
        
    });
    socket.on('pageBgImageDeleted', function(msg){
        logger("pageBgImageDeleted",msg);
        pageBgImage = "";
        $('html').css("background-image", 'none');
        $('html').css('background-color', pageBgColor);
    });
    socket.on('statusUpdate', function(msg){ // controllerScreenId, running, status[], settings[];
        console.log(msg);
        controllerId = msg.statusSettings.controllerScreenId;
        var settings = msg.statusSettings.settings;
        var status = msg.statusSettings.status;
        timerMainColor = settings.timerMainColor;
        timerFirstIntervalTime = settings.timerFirstIntervalTime;
        timerFirstIntervalColor = settings.timerFirstIntervalColor;
        timerSecondIntervalTime = settings.timerSecondIntervalTime;
        timerSecondIntervalColor = settings.timerSecondIntervalColor;
        pageBgColor = settings.pageBgColor;
        pageBgImage = settings.pageBgImage;
        
        timerLessZeroBgColor = settings.timerLessZeroBgColor;
        timerLessZeroFgColor = settings.timerLessZeroFgColor;
        timerSecondIntervalFlash = settings.timerSecondIntervalFlash;
        timerFirstIntervalFlash = settings.timerFirstIntervalFlash;
        timerLessZeroFlash = settings.timerLessZeroFlash;
        
        
        time = status.seconds;
        if (msg.statusSettings.running) { startTimer(); } 
        else { 
            parseTime();
            formatTime();
            updateTimeField(); 
        }
        $("#timerClock").css('color', timerMainColor);
        $("#presenter-name").css('color', timerMainColor);
        $("#presenter-name").text(status.presenterName);
        
        $('html').css("background-color", settings.pageBgColor);
        $('body').css("background-color", settings.pageBgColor);
        
        if (settings.pageBgImage == "") {
            $('body').css("background-image", 'none');
            $('html').css("background-image", 'none');
        }
        else {
            
            $('body').css("background-image", 'none');
            $('html').css('background-image', "url('"+settings.pageBgImage+"')");
            $('html').css("background-size", "cover");
            $('html').css("background-repeat", "no-repeat");
            $('html').css("background-attachment", "fixed");
            $('html').css("background-position", "center center");
        }
        
        //logger("",msg);
    });
    socket.on('requestCurrentTime', function(msg){ // controllerScreenId
        socket.emit("requestCurrentTimeResponse", { "controllerScreenId": msg.controllerScreenId, "time": time });
    });
    
    socket.on('messageSent', function(msg){ // messageSent[messageSent]
        console.log(msg.messageSent);
        $("#message-div").html(msg.messageSent.replace(/(\r\n|\n|\r)/gm,"<br>"));
        $("#message-div").show();
        $('#message-div').boxfit({multiline: true});
        
    });

    
    socket.on('messageCancelled', function(msg){
        $("#message-div").hide();
        $("#message-div").html();
    });
    
    socket.on('timerLessZeroBgColorChange', function(msg){  // controllerScreenId, timerLessZeroBgColorChange
        console.log("msg['timerLessZeroBgColorChange']: "+msg['timerLessZeroBgColorChange']);
        timerLessZeroBgColor = msg['timerLessZeroBgColorChange'];
    });
    socket.on('timerLessZeroFgColorChange', function(msg){  // controllerScreenId, timerLessZeroFgColorChange
        console.log("msg['timerLessZeroFgColorChange']: "+msg['timerLessZeroFgColorChange']);
        timerLessZeroFgColor = msg['timerLessZeroFgColorChange'];
    });   
    socket.on('timerSecondIntervalFlash', function(msg){  // controllerScreenId, timerSecondIntervalFlash
        console.log("msg['timerSecondIntervalFlash']: "+msg['timerSecondIntervalFlash']);
        timerSecondIntervalFlash = msg['timerSecondIntervalFlash'];
        if (!timerSecondIntervalFlash) {
            timeFlashIntervalController("blinkInterval", 500, "clear", "#timerClock", "startTimer", time);
            $("#wrapper").show();
        }
    });
    socket.on('timerFirstIntervalFlash', function(msg){  // controllerScreenId, timerFirstIntervalFlash
        console.log("msg['timerFirstIntervalFlash']: "+msg['timerFirstIntervalFlash']);
        timerFirstIntervalFlash = msg['timerFirstIntervalFlash'];
        if (!timerFirstIntervalFlash) {
            timeFlashIntervalController("blinkInterval", 500, "clear", "#timerClock", "startTimer", time);
            $("#wrapper").show();
        }
    });
    socket.on('timerLessZeroFlash', function(msg){  // controllerScreenId, timerLessZeroFlash
        console.log("msg['timerLessZeroFlash']: "+msg['timerLessZeroFlash']);
        timerLessZeroFlash = msg['timerLessZeroFlash'];
        if (!timerLessZeroFlash) {
            timeFlashIntervalController("bgBlinkInterval", 500, "clear", "#timerClock", "startTimer", time);
            $("#wrapper").show();
        }
    }); 
   socket.on('monitorScreenTimeRequest', function(msg){  // timerScreenId
       logger("monitorScreenTimeRequest",msg);
       socket.emit('monitorScreenTimeRequestResponse', {"timerScreenId": timerScreenId, "time": time });
   });

   socket.on('modalRefreshButton', function(msg){ 
        window.location.reload();
   });
    
    

    
    
});