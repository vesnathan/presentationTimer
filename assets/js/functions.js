function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}


function isDark( c ) {


    var c = c.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 128) {
        return true;
    }
    else {
        return false;
    }


}

function timeFlashIntervalController(intervalName, intervalTime, setClear, element, calledFrom,secondsInput) {
    //console.log(intervalName+" | "+intervalTime+" | "+setClear+" | "+element+" | "+calledFrom+" | "+secondsInput);
    var found = false;
    var thisNewInterval = [];
    timeFlashIntervals.forEach(function (item, index) {
        if (item.intervalName == intervalName) {
            if (setClear == "clear") {
                //console.log(intervalName+" | "+intervalTime+" | "+setClear+" || "+element+" || "+calledFrom+" | "+secondsInput);
                clearInterval(item.intervalId);
                timeFlashIntervals.splice(index,1);
                $(element).show();
            }
            found = true;
        }
    });
    if (!found && setClear == "set") {
        var thisNewIntervalId = setInterval(function() { 
            $(element).toggle();
        }, intervalTime);
        var thisNewInterval = { "intervalName": intervalName, "intervalId": thisNewIntervalId, "intervalElement": element};
        timeFlashIntervals.push(thisNewInterval);
    }  
}


function buttonFlashIntervalController(intervalName, intervalTime, setClear, element, calledFrom) {
    //console.log(intervalName+" | "+intervalTime+" | "+setClear+" | "+element+" | "+calledFrom+" | "+secondsInput);
    var found = false;
    var thisNewInterval = [];
    buttonFlashIntervals.forEach(function (item, index) {
        if (item.intervalName == intervalName) {
            if (setClear == "clear") {
                clearInterval(item.intervalId);
                buttonFlashIntervals.splice(index,1);
                $(element).show();
            }
            found = true;
        }
    });
    if (!found && setClear == "set") {
        var thisNewIntervalId = setInterval(function() { 
            $(element).toggleClass('flashButton');
            }, intervalTime);
        var thisNewInterval = { "intervalName": intervalName, "intervalId": thisNewIntervalId, "intervalElement": element};
        buttonFlashIntervals.push(thisNewInterval);
    }  
}


function formatTime(secondsInput,timerId,whoCalledMe) {
    //console.log('formatTime->'+whoCalledMe+' ('+timerId+')');
    hours = parseInt(secondsInput/3600,10);
    minutes = parseInt(secondsInput % 3600 / 60, 10);
    seconds = parseInt(secondsInput % 60, 10);

    var fgIsDark = false;
    var bgIsDark = false;



    if (secondsInput < 0) {
        
        //console.log('secondsInput < 0');
        //console.log("secondsInput",secondsInput);
            $("#timerTime-"+timerId).css("color",thisTimer.timerLessZeroFgColor);
            $("#timerTime-"+timerId).css("background",thisTimer.timerLessZeroBgColor);

            if (isDark(thisTimer.timerLessZeroFgColor)) { fgIsDark = true;  }
            if (isDark(thisTimer.timerLessZeroBgColor)) { bgIsDark = true;  }
            if (fgIsDark && bgIsDark) {
                $("#timerTime-"+timerId).css("background","#ffffff");
            }
            if (!fgIsDark && !bgIsDark) {
                $("#timerTime-"+timerId).css("color","#000000");
            }

            // only do this if we want to change the current timer
            if (timerId == thisTimer.currentTimer) {          
                $("#timerClock").css("color",thisTimer.timerLessZeroFgColor);
                $("#timerClock").show();
                $("#timerScreenWrapper").css("background",thisTimer.timerLessZeroBgColor);

                if (thisTimer.timerLessZeroFlash && thisTimer.currentTimerRunning){
                    timeFlashIntervalController("timerLessZeroFlashControlScreen",500,"set","#timerTime-"+timerId,"formatTime",secondsInput);
                    timeFlashIntervalController("timerLessZeroFlashTimerScreen",500,"set","#timerScreenWrapper","formatTime",secondsInput);
                }
                else {
                    if (!thisTimer.timerLessZeroFlash && thisTimer.currentTimerRunning){
                        timeFlashIntervalController("timerLessZeroFlashControlScreen",500,"clear","#timerTime-"+timerId,"formatTime",secondsInput);
                        timeFlashIntervalController("timerLessZeroFlashTimerScreen",500,"clear","#timerScreenWrapper","formatTime",secondsInput);
                        $("#timerScreenWrapper").show();
                        $("#timerTime-"+timerId).show();
                    }
                }
            }

            if (seconds < 0) {
                if (seconds > -10) { seconds = "0" + Math.abs(seconds);}
                else { seconds = Math.abs(seconds); }
            }
            else { if (seconds < 10) { seconds = "0" + seconds; } }

            if (minutes < 0) {
                if (minutes > -10) { minutes = "0" + Math.abs(minutes);}
                else { minutes = Math.abs(minutes); }
            }
            else { if (minutes < 10) { minutes = "0" + minutes; } }
            minutes = minutes+":";

            if (hours < 0) {
                if (hours > -10) { hours = "-0" + Math.abs(hours)+":";}
                else { hours = "-"+Math.abs(hours)+":"; }
            }
            else {hours = "-"; }   
            returnValue = hours+minutes+seconds;
        
    }
    else {
        if (secondsInput < thisTimer.timerSecondIntervalTime) {
            //console.log('secondsInput < timerSecondIntervalTime');
            if (timerId == thisTimer.currentTimer) {   
                if (thisTimer.timerSecondIntervalFlash){
                    timeFlashIntervalController("timerLessZeroFlashControlScreen",500,"set","#timerTime-"+timerId,"formatTime",secondsInput);
                    timeFlashIntervalController("timerLessZeroFlashTimerScreen",500,"set","#timerClock","formatTime",secondsInput);
                }
                else {
                    timeFlashIntervalController("timerLessZeroFlashControlScreen",500,"clear","#timerTime-"+timerId,"formatTime",secondsInput);
                    timeFlashIntervalController("timerLessZeroFlashTimerScreen",500,"clear","#timerClock","formatTime",secondsInput); 
                    $("#timerScreenWrapper").show();
                    $("#timerTime-"+timerId).show();
                }
                //console.log('here');
                $("#timerClock").css("color",thisTimer.timerSecondIntervalColor);
                $("#timerScreenWrapper").css("background","transparent");  
            }
            
            $("#timerTime-"+timerId).css("color",thisTimer.timerSecondIntervalColor); 
            $("#timerTime-"+timerId).css("background","#222222");
            
            if (isDark(thisTimer.timerSecondIntervalColor)) { fgIsDark = true;  }
            if (fgIsDark) {
                $("#timerTime-"+timerId).css("background","#ffffff");
            }
        }


        else {
            if (secondsInput < thisTimer.timerFirstIntervalTime) {
                //console.log('secondsInput < timerFirstIntervalTime');
                if (timerId == thisTimer.currentTimer) { 
                    if (thisTimer.timerFirstIntervalFlash){
                        timeFlashIntervalController("timerLessZeroFlashControlScreen",500,"set","#timerTime-"+timerId,"formatTime",secondsInput);
                        timeFlashIntervalController("timerLessZeroFlashTimerScreen",500,"set","#timerClock","formatTime",secondsInput);
                    }
                    else {
                        timeFlashIntervalController("timerLessZeroFlashControlScreen",500,"clear","#timerTime-"+timerId,"formatTime",secondsInput);
                        timeFlashIntervalController("timerLessZeroFlashTimerScreen",500,"clear","#timerClock","formatTime",secondsInput);
                        $("#timerScreenWrapper").show();
                        $("#timerTime-"+thisTimer.currentTimer).show();
                    }
                    $("#timerClock").css("color",thisTimer.timerFirstIntervalColor);
                    $("#timerScreenWrapper").css("background","transparent");
                }
                $("#timerTime-"+timerId).css("color",thisTimer.timerFirstIntervalColor);
                $("#timerTime-"+timerId).css("background","#222222");

                if (isDark(thisTimer.timerFirstIntervalColor)) { fgIsDark = true;  }
                if (fgIsDark) {
                    $("#timerTime-"+timerId).css("background","#ffffff");
                }
                
            }
            else {
                
                
                //console.log('timerId',timerId);
                //console.log('thisTimer.currentTimer',thisTimer.currentTimer);
                if (timerId == thisTimer.currentTimer) { 
                    timeFlashIntervalController("timerLessZeroFlashControlScreen",500,"clear","#timerTime-"+timerId,"formatTime",secondsInput);
                    timeFlashIntervalController("timerLessZeroFlashTimerScreen",500,"clear","#timerScreenWrapper","formatTime",secondsInput);
                    timeFlashIntervalController("timerLessZeroFlashTimerScreen",500,"clear","#timerClock","formatTime",secondsInput);
                    //console.log('thisTimer.timerMainColor',thisTimer.timerMainColor);
                    //console.trace();
                    $("#timerClock").css("color",thisTimer.timerMainColor);
                    $("#timerScreenWrapper").css("background","transparent");
                    $("#timerScreenWrapper").show();
                    //console.log('secondsInput > 0 & timerFirstIntervalTime & timerFirstIntervalTime');
                }

                $("#timerTime-"+timerId).css("color",thisTimer.timerMainColor);
                $("#timerTime-"+timerId).css("background","#222222");

                if (isDark(thisTimer.timerMainColor)) { fgIsDark = true;  }
                if (fgIsDark) {
                    $("#timerTime-"+timerId).css("background","#ffffff");
                }

                $("#timerTime-"+timerId).show();

               
            }
        }
        
        
        
        if (hours == 0) {
            hours = "";
        }
        else {
            hours = hours + ":" ;
        }
        minutes = minutes < 10 ? "0" + minutes + ":" : minutes + ":" ;
        seconds = seconds < 10 ? "0" + seconds : seconds ; 
        returnValue = hours+minutes+seconds;   
    }
    

    
    return returnValue; 
}

function convertTimeEpochToString(t) {
    const dt = new Date(t);
    const h = "0" + dt.getHours();
    const m = "0" + dt.getMinutes();
    const s = "0" + dt.getSeconds();
    return h.substr(-2) + ':' + m.substr(-2) + ":" + s.substr(-2);
}

function logger(sentFrom, message) {

    console.log(logId+": _______________________________________________");
    console.log("---"+sentFrom+"---");
    console.log(message);
    console.log();
    logId++;
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
    

