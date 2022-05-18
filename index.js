const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const QRCode = require('qrcode');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

var pathURL = "/timer/";
app.get(pathURL, function(req, res){  res.sendFile(__dirname + '/index.html');});
app.get(pathURL+'timer.html', function(req, res){  res.sendFile(__dirname + '/timer.html');});
app.get(pathURL+'timerControl.html', function(req, res){  res.sendFile(__dirname + '/timerControl.html');});
app.get(pathURL+'monitor.html', function(req, res){  res.sendFile(__dirname + '/monitor.html');});
app.get(pathURL+'monitorScreen.html', function(req, res){  res.sendFile(__dirname + '/monitorScreen.html');});
app.get(pathURL+'controlMonitor.html', function(req, res){  res.sendFile(__dirname + '/controlMonitor.html');});
app.get(pathURL+'assets/js/jquery2.1.1.min.js', function(req, res){  res.sendFile(__dirname + '/assets/js/jquery2.1.1.min.js');});
app.get(pathURL+'assets/js/functions.js', function(req, res){  res.sendFile(__dirname + '/assets/js/functions.js');});
app.get(pathURL+'demo.html', function(req, res){  res.sendFile(__dirname + '/demo.html');});
app.get(pathURL+'assets/materialize/js/materialize.min.js', function(req, res){  res.sendFile(__dirname + '/assets/materialize/js/materialize.min.js');});
app.get(pathURL+'assets/materialize/css/materialize.min.css', function(req, res){  res.sendFile(__dirname + '/assets/materialize/css/materialize.min.css');});
app.get(pathURL+'assets/js/timer.js', function(req, res){  res.sendFile(__dirname + '/assets/js/timer.js');});
app.get(pathURL+'assets/js/jquery-ui.js', function(req, res){  res.sendFile(__dirname + '/assets/js/jquery-ui.js');});
app.get(pathURL+'assets/css/jquery-ui.css', function(req, res){  res.sendFile(__dirname + '/assets/css/jquery-ui.css');});
app.get(pathURL+'index.html', function(req, res){  res.sendFile(__dirname + '/index.html');});
app.get(pathURL+'index.html', function(req, res){  res.sendFile(__dirname + '/index.html');});
app.get(pathURL+'assets/css/controlScreen.css', function(req, res){  res.sendFile(__dirname + '/assets/css/controlScreen.css');});
app.get(pathURL+'assets/css/timerScreen.css', function(req, res){  res.sendFile(__dirname + '/assets/css/timerScreen.css');});
app.get(pathURL+'assets/css/font-awesome.min.css', function(req, res){  res.sendFile(__dirname + '/assets/css/font-awesome.min.css');});
app.get(pathURL+'assets/js/jquery.vide.js', function(req, res){  res.sendFile(__dirname + '/assets/js/jquery.vide.js');});
app.get(pathURL+'assets/js/jscolor.js', function(req, res){  res.sendFile(__dirname + '/assets/js/jscolor.js');});
app.get(pathURL+'assets/js/jquery.scrollTo.js', function(req, res){  res.sendFile(__dirname + '/assets/js/jquery.scrollTo.js');});
app.get(pathURL+'assets/js/jquery.boxfit.js', function(req, res){  res.sendFile(__dirname + '/assets/js/jquery.boxfit.js');});
app.get(pathURL+'assets/js/JQuery.mobile.js', function(req, res){  res.sendFile(__dirname + '/assets/js/JQuery.mobile.js');});
app.get(pathURL+'assets/js/timerScreen.js', function(req, res){  res.sendFile(__dirname + '/assets/js/timerScreen.js');});

app.get(pathURL+'assets/images/freelan.png', function(req, res){  res.sendFile(__dirname + '/assets/images/freelan.png');});
app.get(pathURL+'assets/images/freelan.jpg', function(req, res){  res.sendFile(__dirname + '/assets/images/freelan.jpg');});
app.get(pathURL+'assets/images/freelan.gif', function(req, res){  res.sendFile(__dirname + '/assets/images/freelan.gif');});
app.get(pathURL+'assets/images/controller.jpg', function(req, res){  res.sendFile(__dirname + '/assets/images/controller.jpg');});
app.get(pathURL+'assets/images/timer.jpg', function(req, res){  res.sendFile(__dirname + '/assets/images/timer.jpg');});
app.get(pathURL+'assets/images/standAlone.jpg', function(req, res){  res.sendFile(__dirname + '/assets/images/standAlone.jpg');});
app.get(pathURL+'assets/images/monitor.jpg', function(req, res){  res.sendFile(__dirname + '/assets/images/monitor.jpg');});
app.get(pathURL+'assets/images/sceneChangeLogo.png', function(req, res){  res.sendFile(__dirname + '/assets/images/sceneChangeLogo.png');});
app.get(pathURL+'assets/images/refresh.png', function(req, res){  res.sendFile(__dirname + '/assets/images/refresh.png');});
app.get(pathURL+'assets/images/sceneChangeLogo.jpg', function(req, res){  res.sendFile(__dirname + '/assets/images/sceneChangeLogo.jpgQR');});
app.get(pathURL+'assets/images/loading4.gif', function(req, res){  res.sendFile(__dirname + '/assets/images/loading4.gif');});
                               
app.get(pathURL+'assets/fonts/fontawesome-webfont.woff2?v=4.7.0', function(req, res){  res.sendFile(__dirname + '/assets/fonts/fontawesome-webfont.woff2');});
app.get(pathURL+'assets/fonts/fontawesome-webfont.woff?v=4.7.0 ', function(req, res){  res.sendFile(__dirname + '/assets/fonts/fontawesome-webfont.woff');});
app.get(pathURL+'assets/fonts/fontawesome-webfont.ttf?v=4.7.0', function(req, res){  res.sendFile(__dirname + '/assets/fonts/fontawesome-webfont.ttf');});
app.get(pathURL+'assets/images/freelan.mp4', function(req, res){  res.sendFile(__dirname + '/assets/images/freelan.mp4');}); 
app.get(pathURL+'assets/images/freelan.webm', function(req, res){  res.sendFile(__dirname + '/assets/images/freelan.webm');});
app.get(pathURL+'assets/images/freelan.ogv', function(req, res){  res.sendFile(__dirname + '/assets/images/freelan.ogv');});
app.get(pathURL+'debug.html', function(req, res){  res.sendFile(__dirname + '/debug.html');});
app.get(pathURL+'standAlone.html', function(req, res){  res.sendFile(__dirname + '/standAlone.html');});


var timerScreenIdsSocketIds = [];
var timerScreenIdsUsed = [];

var monitorScreenIdsSocketIds = [];
var monitorScreenIdsUsed = [];

var controllerScreenIdsTimerScreenIds = [];

var controllerScreenIdsSocketIds = [];
var controllerScreenIdsUsed = [];


var mainMonitorScreenIdsUsed = [];
var mainMonitorScreensActive = [];
var mainMonitorScreensToDelete = [];

var sessionsActive = [];
var sessionsToDelete = [];
var sessionIdsUsed = [];
var bgImages = [];
var bingBongIntervalArray = [];

var logging = false;

var sessionsRemainActiveBeforeDeletionTime = 43200000;

const fs = require("fs");




function isInArray(arr, obj) {
    for(var i=0; i<arr.length; i++) {
        if (arr[i] == obj) return true;
    }
    return false;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function logger(sentFrom, message) {
    console.log("_______________________________________________");
    console.log("---"+sentFrom+"---");
    console.log(message);
    console.log();
}


function requestNewMainMonitorScreenId() {
    var newId = Math.floor(Math.random()*90000) + 10000;
    newId.toString();
    while (isInArray(mainMonitorScreenIdsUsed, newId)) {
        newId = Math.floor(Math.random()*90000) + 10000;
        newId.toString();
    }
    mainMonitorScreenIdsUsed.push(newId);
    
    if (logging) { console.log("requestNewMainMonitorScreenId",newId); }
    return newId;
}
function requestNewTimerScreenId() {
    var newId = Math.floor(Math.random()*90000) + 10000;
    newId.toString();
    while (isInArray(timerScreenIdsUsed, newId)) {
        newId = Math.floor(Math.random()*90000) + 10000;
        newId.toString();
    }
    timerScreenIdsUsed.push(newId);
    
    if (logging) { console.log("requestNewTimerScreenId",newId);}
    return newId;
}

function requestNewSessionId() {
    var newId = Math.floor(Math.random()*90000) + 10000;
    newId.toString();
    while (isInArray(sessionIdsUsed, newId)) {
        newId = Math.floor(Math.random()*90000) + 10000;
        newId.toString();
    }
    sessionIdsUsed.push(newId);
    if (logging) { console.log("requestNewSessionId",newId);}
    return newId;
}

function requestNewControllerScreenId() {
    var newId = Math.floor(Math.random()*90000) + 10000;
    newId.toString();
    while (isInArray(controllerScreenIdsUsed, newId)) {
        newId = Math.floor(Math.random()*90000) + 10000;
        newId.toString();
    }
    controllerScreenIdsUsed.push(newId);
    if (logging) { console.log("requestNewControllerScreenId",newId);}
    return newId;
}


function requestNewMonitorScreenId() {
    var newId = Math.floor(Math.random()*90000) + 10000;
    newId.toString();
    while (isInArray(monitorScreenIdsUsed, newId)) {
        newId = Math.floor(Math.random()*90000) + 10000;
        newId.toString();
    }
    monitorScreenIdsUsed.push(newId);
    if (logging) { console.log("requestNewMonitorScreenId",newId);}
    return newId;
}
function delMainMonitorScreen(screenIdToDelete){
    if (logging) { console.log("delMainMonitorScreen",screenIdToDelete); }
    mainMonitorScreenIdsUsed.splice(mainMonitorScreenIdsUsed.indexOf(screenIdToDelete),1);
    mainMonitorScreensActive.splice(mainMonitorScreensActive.indexOf(mainMonitorScreensActive.find(mainMonitor => mainMonitor.mainMonitorScreenId == screenIdToDelete)),1);
    mainMonitorScreensToDelete.splice(mainMonitorScreensToDelete.indexOf(mainMonitorScreensToDelete.find(mainMonitor => mainMonitor.mainMonitorScreenId == screenIdToDelete)));
}
function delSession(sessionIdToDelete) {  // the time limit has expired, delete the session
    if (logging) { console.log("delSession",sessionIdToDelete);}
    console.log("delSession",sessionIdToDelete);
    // delete session from SessionsActive
    var indexOfSessionToDelete = sessionsActive.indexOf(sessionsActive.find(session => session.sessionId == sessionIdToDelete));

    // delete session txt file from ./sessionSaveFiles/
    fs.unlink('./sessionSaveFiles/'+sessionIdToDelete+'.txt', function (err) { });
    
    // delete session image file from ./sessionBgImages/
    fs.unlink('./sessionBgImages/'+sessionIdToDelete+'.txt', function (err) {});

    


    if(indexOfSessionToDelete != -1) {

        // Need to send a refresh message to all screens still associated with this session, but need to delete the session first
        // from sessionsActive[] so they don't just connect to it again
        var timerScreenIds = sessionsActive[indexOfSessionToDelete].timerScreens;
        var controllerScreenIds = sessionsActive[indexOfSessionToDelete].controllerScreens;
        var monitorScreenIds = sessionsActive[indexOfSessionToDelete].monitorScreens;

        // delete session from SessionsActive[]
        sessionsActive.splice(indexOfSessionToDelete,1);

        timerScreenIds.forEach(function(timerScreenId, index) {
            
            var thisTimerScreen = timerScreenIdsSocketIds.find(timerScreen => timerScreen.timerScreenId === timerScreenId);
            

            // delete timerScreenIds from timerScreenIdsUsed[]
            timerScreenIdsUsed.splice(timerScreenIdsUsed.indexOf(timerScreenId),1);

            //delete timerScreenIds from timerScreenIdsSocketIds[]
            timerScreenIdsSocketIds.splice(timerScreenIdsSocketIds.indexOf(timerScreenIdsSocketIds.find(timerScreenIdSocketId => timerScreenIdSocketId.timerScreenId === timerScreenId)),1);

            // delete from controllerScreenIdsTimerScreenIds[]
            if (typeof controllerScreenIdsTimerScreenIds.find(controllerScreenIdTimerScreenId => controllerScreenIdTimerScreenId.timerScreenId === timerScreenId) === 'object' ) {
                controllerScreenIdsTimerScreenIds.splice(controllerScreenIdsTimerScreenIds.indexOf(controllerScreenIdsTimerScreenIds.find(controllerScreenIdTimerScreenId => controllerScreenIdTimerScreenId.timerScreenId === timerScreenId)),1);
            }

            // send a message to timer screens
            if (thisTimerScreen != null && thisTimerScreen != undefined && thisTimerScreen != "undefined") {
                io.to(thisTimerScreen.socketId).emit("modalRefreshButton");
            }

            // delete timerId from mainMonitorScreensActive
            mainMonitorScreensShowingTimerId = mainMonitorScreensActive.filter(thisMainMonitorScreen => thisMainMonitorScreen.timerScreens.includes(timerScreenId));
            if (mainMonitorScreensShowingTimerId != null && mainMonitorScreensShowingTimerId != undefined && mainMonitorScreensShowingTimerId != "undefined") {    
                
                mainMonitorScreensShowingTimerId.forEach(function(mainMonitorScreen, index) {
                    mainMonitorScreen.timerScreens.splice(mainMonitorScreen.timerScreens.indexOf(timerScreenId),1);
                    io.to(mainMonitorScreen.socketId).emit("timerScreenIdSessionDeleted", {"timerScreenId": timerScreenId});
                });
            }
        });

        // send a message to controller screens, and delete controllerScreenIds from controllerScreenIdsUsed[] and controllerScreenIdsSocketIds[]
        controllerScreenIds.forEach(function(controllerScreenId, index) {

            var thisControllerScreen = controllerScreenIdsSocketIds.find(controllerScreen => controllerScreen.controllerScreenId === controllerScreenId);
            

            // delete controllerScreenIds from controllerScreenIdsUsed[]
            controllerScreenIdsUsed.splice(controllerScreenIdsUsed.indexOf(controllerScreenId),1);

            //delete timerScreenIds from timerScreenIdsSocketIds[]
            controllerScreenIdsSocketIds.splice(controllerScreenIdsSocketIds.indexOf(controllerScreenIdsSocketIds.find(controllerScreenIdSocketId => controllerScreenIdSocketId.controllerScreenId === controllerScreenId)),1);
       
            // delete from controllerScreenIdsTimerScreenIds[]
            if (typeof controllerScreenIdsTimerScreenIds.find(controllerScreenIdTimerScreenId => controllerScreenIdTimerScreenId.controllerScreenId === controllerScreenId) === 'object')  {
                controllerScreenIdsTimerScreenIds.splice(controllerScreenIdsTimerScreenIds.indexOf(controllerScreenIdsTimerScreenIds.find(controllerScreenIdTimerScreenId => controllerScreenIdTimerScreenId.controllerScreenId === controllerScreenId)),1);
            }
            if (thisControllerScreen != null && thisControllerScreen != undefined && thisControllerScreen != "undefined") {
                io.to(thisControllerScreen.socketId).emit("modalRefreshButton");
            }

            // delete any image data from bgImages[]
            // "controllerScreenId": controllerScreenId,"data": imageData
            bgImages.splice(bgImages.indexOf(bgImages.find(bgImage => bgImage.sessionId === sessionIdToDelete)),1);

        });

        // send a message to monitor screens, and delete monitorScreenIds from monitorScreenIdsUsed[] and monitorScreenIdsSocketIds[]
        monitorScreenIds.forEach(function(monitorScreenId, index) {
            var thisMonitorScreen = monitorScreenIdsSocketIds.find(monitorScreen => monitorScreen.monitorScreenId === monitorScreenId);
            

            // delete monitorScreenIds from monitorScreenIdsUsed[]
            monitorScreenIdsUsed.splice(monitorScreenIdsUsed.indexOf(monitorScreenId),1);

            //delete timerScreenIds from timerScreenIdsSocketIds[]
            monitorScreenIdsSocketIds.splice(monitorScreenIdsSocketIds.indexOf(monitorScreenIdsSocketIds.find(monitorScreenIdSocketId => monitorScreenIdSocketId.monitorScreenId === monitorScreenId)),1);
            
        });




    }
  
    // delete object from sessionsToDelete
    var indexOfSessionToDelete = sessionsToDelete.indexOf(sessionsToDelete.find(session => session.sessionId == sessionIdToDelete));
    if(indexOfSessionToDelete != -1) {
        sessionsToDelete.splice(indexOfSessionToDelete,1);
    }
 


}

function scheduleSessionDelete(sessionIdToDelete) {
    // don't delete these three as they are for the demo
    if (sessionIdToDelete != 1 && sessionIdToDelete != 2 && sessionIdToDelete != 3) {
        if (logging) { console.log('scheduleSessionDelete',sessionIdToDelete);}
        
        // if a client disconnects, they have 12 hours (43200000 ms) to reconnect or the session will be destroyed. This covers phones that lock and kill connection. 
        var sessionAlreadyScheduled = sessionsToDelete.find(sessionToDelete => sessionToDelete.sessionId === sessionIdToDelete);
        if (sessionAlreadyScheduled == null || sessionAlreadyScheduled == undefined || sessionAlreadyScheduled == "undefined") {
            var scheduleTimeout = setTimeout(function() {
                delSession(sessionIdToDelete);
            },  sessionsRemainActiveBeforeDeletionTime);
            sessionsToDelete.push({
                "sessionId": sessionIdToDelete,
                "timeout": scheduleTimeout
            });
        }
    }
}

io.on('connection', function(socket){


    socket.on('disconnect', function() {

        // delete thre socket from bingBongIntervalArray and delete the interval, //  bingBongIntervalArray[{'socketId': socket.id, 'interval': thisInterval}]
        var thisBingBong = bingBongIntervalArray.find(bingBongInterval => bingBongInterval.socketId == socket.id);
        if(typeof thisBingBong === "object"){
            clearInterval(thisBingBong.interval);
        
            var thisBingBongIndex = bingBongIntervalArray.indexOf(thisBingBong);
            bingBongIntervalArray.splice(thisBingBongIndex,1); 
            if (logging) { console.log('bingBongIntervalArray element removed: ' + thisBingBongIndex); }
        }
        // see if an object exists in timerScreenIdsSocketIds with the socketId of socket.id
        
        var thisTimerScreen = timerScreenIdsSocketIds.find(timerScreen => timerScreen.socketId == socket.id);

        if(typeof thisTimerScreen === "object"){

            // Need to search controllerScreenIdsTimerScreenIds for this timerId
            var thisControllerTimerIds = controllerScreenIdsTimerScreenIds.find(controllerTimerIds => controllerTimerIds.timerScreenId === thisTimerScreen.timerScreenId);

            if (typeof thisControllerTimerIds === 'object') { 
                // The timerScreen ID was found in controllerScreenIdsTimerScreenIds
                // this means that the user has connected a controllerScreen to this timerScreen and a session was created, or it was added to an 
                // already running session
                
                // schedule session for deletion. This will be cancelled if it's a refresh in the newConnection function
                var  sessionIdToDelete = '';
                sessionsActive.forEach(function (session, index) {
                    if (session.timerScreens.includes(thisControllerTimerIds.timerScreenId)) {
                        sessionIdToDelete = session.sessionId; 
                    }
                }); 

                if (sessionIdToDelete != '') {
                    scheduleSessionDelete(sessionIdToDelete);
                }    
            }
            else {

                // Delete it from timerScreenIdsSocketIds[] because this will be re-added if it's a refresh that hasn't yet been connected to a controller
                timerScreenIdsSocketIds.splice(timerScreenIdsSocketIds.indexOf(timerScreenIdsSocketIds.find(timerScreen => timerScreen.timerScreenId === thisTimerScreen.timerScreenId)),1);

                // Delete it from timerScreenIdsUsed[] because this will be re-added if it's a refresh that hasn't yet been connected to a controller
                timerScreenIdsUsed.splice(timerScreenIdsUsed.indexOf(thisTimerScreen.timerScreenId),1); 
            }    
        }
        
        var thisControllerScreen = controllerScreenIdsSocketIds.find(controllerScreen => controllerScreen.socketId === socket.id);
            var  sessionIdToDelete = '';
            if(typeof thisControllerScreen === 'object'){
                // Need to search controllerScreenIdsTimerScreenIds for this timerId
                var thisControllerTimerIds = controllerScreenIdsTimerScreenIds.find(controllerTimerIds => controllerTimerIds.controllerScreenId === thisControllerScreen.controllerScreenId);

                if (typeof thisControllerTimerIds === 'object') { 
                    // The controllerScreen ID was found in controllerScreenIdsTimerScreenIds
                    // this means that the user has connected this controllerScreen to a timerScreen and a session was created, or it was added to an 
                    // already running session
                    
                    // schedule session for deletion. This will be cancelled if it's a refresh in the newConnection function
                    var  sessionIdToDelete = '';
                    sessionsActive.forEach(function (session, index) {
                        if (session.controllerScreens.includes(thisControllerTimerIds.controllerScreenId)) {
                            sessionIdToDelete = session.sessionId; 
                        }
                    }); 

                    if (sessionIdToDelete != '') {
                        scheduleSessionDelete(sessionIdToDelete);
                    }    
                }
                else {

                    // Delete it from controllerScreenIdsSocketIds[] because this will be re-added if it's a refresh that hasn't yet been connected to a controller
                    controllerScreenIdsSocketIds.splice(controllerScreenIdsSocketIds.indexOf(controllerScreenIdsSocketIds.find(controllerScreen => controllerScreen.controllerScreenId === thisControllerScreen.controllerScreenId)),1);

                    // Delete it from timerScreenIdsUsed[] because this will be re-added if it's a refresh that hasn't yet been connected to a controller
                    controllerScreenIdsUsed.splice(controllerScreenIdsUsed.indexOf(thisControllerScreen.controllerScreenId),1); 
                }  
            }

    
        
        var thisMonitorScreen = monitorScreenIdsSocketIds.find(monitorScreen => monitorScreen.socketId == socket.id);
        if(typeof thisMonitorScreen === "object"){

            // delete from monitorScreenIdsSocketIds because this will be re-added if it's a refresh
            monitorScreenIdsSocketIds.splice(monitorScreenIdsSocketIds.indexOf(thisMonitorScreen),1);

            // delete from monitorScreenIdsUsed because this will be re-added if it's a refresh
            monitorScreenIdsUsed.splice(monitorScreenIdsUsed.indexOf(thisMonitorScreen.monitorScreenId),1);

            // delete from sessionsActive monitorScreens
            sessionsActive.forEach(function (item, index) {
                if (item.monitorScreens.includes(thisMonitorScreen.monitorScreenId)) {
                    item.monitorScreens.splice(item.monitorScreens.indexOf(thisMonitorScreen.monitorScreenId),1);
                }
            });
            if (logging) { console.log('monitorScreenDeleted: ', thisMonitorScreen.monitorScreenId);}
        }


        var thisMainMonitorScreen = mainMonitorScreensActive.find(mainMonitorScreen => mainMonitorScreen.socketId == socket.id);
        if(typeof thisMainMonitorScreen === "object"){
            var scheduleTimeout = setTimeout(function() {
                delMainMonitorScreen(thisMainMonitorScreen.mainMonitorScreenId);
            }, sessionsRemainActiveBeforeDeletionTime);
            mainMonitorScreensToDelete.push({
                "mainMonitorScreenId":thisMainMonitorScreen.mainMonitorScreenId,
                "interval":scheduleTimeout
            });
        }    
    });

    socket.on('newConnection', function(msg){  //clientType, oldScreenId, controllerScreenId
        if (logging) { console.log("newConnection",msg);}
        

        var thisInterval = setInterval(function() {
            if (socket != null && socket != undefined && socket != "undefined") {
                io.to(socket.id).emit("bing", '');
            }
        },10000);

        bingBongIntervalArray.push({'socketId': socket.id, 'interval': thisInterval});

        
        if (msg["clientType"] == "mainMonitor") { // clientType, oldScreenId, newSocketId
            var found = false;
            var oldScreenId = parseInt(msg.oldScreenId);
            //console.log("newConnection",msg);

            // see if old screen id is already active. If so, the screen has refreshed
            mainMonitorScreensActive.forEach(function (thisMainMonitorScreen, index) {
                if (thisMainMonitorScreen.mainMonitorScreenId == oldScreenId) {
                    found = true;
                    thisMainMonitorScreen.socketId = msg.newSocketId;
                    if (msg != null && msg != undefined && msg != "undefined") {
                        io.to(msg.newSocketId).emit("reconnect");
                        // loop through timers associated with this mainMonitorScreen and resend them
                        thisMainMonitorScreen.timerScreens.forEach(function(thisTimerId) {
                            io.to(msg.newSocketId).emit("timerScreenId", {"timerScreenId": thisTimerId});
                            console.log("thisTimerId",thisTimerId);
                        });
                    }
                    // kill session delete timeout and remove from mainMonitorScreensToDelete if it's in there
                    var mainMonitorScreenToDeleteIndex = mainMonitorScreensToDelete.indexOf(mainMonitorScreensToDelete.find(obj => obj.sessionId === msg.sessionId));
                    
                    if (mainMonitorScreenToDeleteIndex != -1) { 
                        clearTimeout(mainMonitorScreensToDelete[mainMonitorScreenToDeleteIndex].timeout);
                        mainMonitorScreensToDelete.splice(mainMonitorScreenToDeleteIndex,1); 
                    }
                } 
            });

            if (!found) {
                var newMainMonitorScreenId = requestNewMainMonitorScreenId();
                if (socket != null && socket != undefined && socket != "undefined") {
                    io.to(socket.id).emit("newMainMonitorScreenId", {"newMainMonitorScreenId":newMainMonitorScreenId});
                }
                var newMainMonitorScreenObject = {
                    "mainMonitorScreenId": newMainMonitorScreenId,
                    "socketId": socket.id,
                    "timerScreens": []
                }
                mainMonitorScreensActive.push(newMainMonitorScreenObject);
                
                // write a file to server for crash recovery
                fs.writeFile('./activeMonitorScreens/'+newMainMonitorScreenId+'.txt', JSON.stringify(newMainMonitorScreenObject.timerScreens), function (err) {
                    if (err) 
                        return console.log(err);
                });

            }
        }
        if (msg["clientType"] == "timerScreen") {
            // logger("newConnection - timerScreen",msg);

            var found = false;

            var oldScreenId = parseInt(msg.oldScreenId);
            // see if oldTimerScreenId exists in sessionsActive 
            sessionsActive.forEach(function (item, index) {
                if (item.timerScreens.includes(oldScreenId)) {
                    found = true;
                    timerScreenIdsSocketIds[timerScreenIdsSocketIds.findIndex(obj => obj.timerScreenId == oldScreenId)].socketId = msg.newSocketId;
                    if (msg != null && msg != undefined && msg != "undefined") {
                        io.to(msg.newSocketId).emit("codeInputed", {"codeInputed": item.timerScreens[0], "data": item, "from":"newConnection"});
                    }
                    // kill session delete timeout and remove from sessionsToDelete if it's in there
                    var sessionToDeleteIndex = sessionsToDelete.indexOf(sessionsToDelete.find(obj => obj.sessionId === item.sessionId));
                    
                    
                    if (sessionToDeleteIndex != -1) { 
                        clearTimeout(sessionsToDelete[sessionToDeleteIndex].timeout);
                        sessionsToDelete.splice(sessionToDeleteIndex,1); 
                    }
                    
                }
            });                           
            if (!found) {
               
                var newTimerScreenId = requestNewTimerScreenId();
                if (socket != null && socket != undefined && socket != "undefined") {
                    io.to(socket.id).emit("newTimerScreenId", {"newTimerScreenId":newTimerScreenId});
                }
                var newTimerScreenObject = {
                    "timerScreenId": newTimerScreenId,
                    "socketId": socket.id
                }
                timerScreenIdsSocketIds.push(newTimerScreenObject);
                //timerScreenIdsSocketIds["S"+newTimerScreenId] = socket.id;

                // Send the QR code to the timer screen
                var QRString = 'http://54.66.111.53:3000/timer/timerControl.html?timerCode='+newTimerScreenId;
                QRCode.toDataURL(QRString, function (err, url) {
                    if (socket != null && socket != undefined && socket != "undefined") {
                        io.to(socket.id).emit("newTimerScreenQR", {"newTimerScreenQR":url});
                    }
                });
            }
        }
        
        
        
        if (msg["clientType"] == "controllerScreen") {
            var found = false;
            var oldControllerScreenId = parseInt(msg.oldScreenId);
            // see if oldTimerScreenId exists in sessionsActive. If it does, that means the controller page just reloaded
            // and we can continue the session with this controller screen id
            sessionsActive.forEach(function (item, index) {
                if (item.controllerScreens.includes(oldControllerScreenId)) {
                    found = true;
                    controllerScreenIdsSocketIds[controllerScreenIdsSocketIds.findIndex(obj => obj.controllerScreenId == oldControllerScreenId)].socketId = msg.newSocketId;

                    // send the controller a message to tell it what timer screen its controlling, it's the same process as if we scanned the QR code or manually inputed timer screen code
                    if (msg != null && msg != undefined && msg != "undefined") {
                        io.to(msg.newSocketId).emit("codeInputed", {"timerScreenId": item.timerScreens[0], "data": item, "oldConnection": true, "from":"newConnection"});
                    }
                    // when the old page closed, a timeout to delete the session may have been set. If so, kill timeout and remove from sessionsToDelete
                    var sessionToDeleteIndex = sessionsToDelete.indexOf(sessionsToDelete.find(obj => obj.sessionId === item.sessionId));
                    if (sessionToDeleteIndex != -1) { 
                        clearTimeout(sessionsToDelete[sessionToDeleteIndex].timeout);
                        sessionsToDelete.splice(sessionToDeleteIndex,1); 
                    }
                }
            });
            if (!found) { 
                
                // this is a completely new connection, so request a new id for it
                var newControllerScreenId = requestNewControllerScreenId();

                // send this controller screen a message to let it know it's new id
                if (socket != null && socket != undefined && socket != "undefined") {
                    io.to(socket.id).emit("newControllerScreenId", {"newControllerScreenId":newControllerScreenId});
                }

                // add the screen id and socket id to controllerScreenIdsSocketIds array so we can reference the socket by controller screen id later
                var newControllerScreenObject = {
                    "controllerScreenId": newControllerScreenId,
                    "socketId": socket.id
                }
                controllerScreenIdsSocketIds.push(newControllerScreenObject);
 
            }   
        }

        if (msg["clientType"] == "monitorScreen") { //  clientType, oldScreenId (this is actually the timer screen ID for the timer screen we want to monitor), newSocketId
            var found = false;

            if (!found) {
                var newMonitorScreenId = requestNewMonitorScreenId();
                if (socket != null && socket != undefined && socket != "undefined") {
                    io.to(socket.id).emit("newMonitorScreenId", {"newMonitorScreenId":newMonitorScreenId});
                }
                var thisMonitorScreenIdSocketId = {'monitorScreenId': newMonitorScreenId,'socketId': socket.id}
                monitorScreenIdsSocketIds.push(thisMonitorScreenIdSocketId);
                // loop through sessions to find this timerScreenId and add the monitorScreenId to that session if found
                sessionsActive.forEach(function (thisSession, sessionIndex) {
                    thisSession.timerScreens.forEach(function(thisTimerScreenId, timerScreenIndex){
                        if (thisTimerScreenId == msg.oldScreenId) {
                            thisSession.monitorScreens.push(parseInt(newMonitorScreenId));
                            if (socket != null && socket != undefined && socket != "undefined") {
                                io.to(socket.id).emit("codeInputed", {"codeInputed": thisSession.timerScreens[0], "data": thisSession, "clientType": "monitorScreen", "monitorScreenId":parseInt(newMonitorScreenId)});
                            }
                        }
                    });
                    thisSession.controllerScreens.forEach(function(thisControllerScreenId, ControllerScreenIndex){
                        var thisControllerScreenIdSocketId = controllerScreenIdsSocketIds.find(controllerScreen => controllerScreen.controllerScreenId == thisControllerScreenId);
                        io.to(thisControllerScreenIdSocketId.socketId).emit("monitorScreensUpdate",{'monitorScreenIds':thisSession.monitorScreens});
                    });
                });
                
            }         
        }
    });
/*
    socket.on('monitorScreenRemoved', function(msg){ // timerScreenId, a timer screen has been removed from the msain monitor screen page
        // loop through sessions to find this timerScreenId and remove the monitorScreenId from that session if found 

    });
*/
    socket.on('timerScreenRemovedFromMainMonitor', function(msg){ //  timerScreenId, mainMoniterScreenId
        
        timerScreenId = parseInt(msg.timerScreenId);
        // get the session the timerScreenId belongs to
        var thisMainMonitor = mainMonitorScreensActive.filter(monitorScreen => monitorScreen.mainMonitorScreenId === parseInt(msg.mainMoniterScreenId));
        
        if (thisMainMonitor[0] != null && thisMainMonitor[0] != undefined && thisMainMonitor[0] != "undefined") {

            //delete the timer from the returned monitors timerscreen array
            var timerToDeleteIndex = thisMainMonitor[0].timerScreens.indexOf(timerScreenId);        
            if (timerToDeleteIndex != -1) { 
                thisMainMonitor[0].timerScreens.splice(timerToDeleteIndex,1); 
                        
                // write a file to server for crash recovery
                fs.writeFile('./activeMonitorScreens/'+thisMainMonitor[0].mainMonitorScreenId+'.txt', JSON.stringify(thisMainMonitor[0].timerScreens), function (err) {
                    if (err) 
                        return console.log(err);
                });
            }
        }
        

        


    });
    socket.on('timerScreenAddedToMonitor', function(msg){ // mainMonitorScreenId, timerScreenId
        // .log('timerScreenAddedToMonitor',msg);
        // convert the strings received to an integer value
        var mainMonitorScreenId = parseInt(msg.mainMonitorScreenId);
        var timerScreenId = parseInt(msg.timerScreenId);
        var controllerScreenId = parseInt(msg.controllerScreenId);

        // find the session this timer belongs too so we can add the mainMonitorScreen to it
        var thisSession = sessionsActive.filter(session => session.timerScreens.includes(timerScreenId));
        
        // Add the mainMonitorScreenId to the session
        if (thisSession[0] != null && thisSession[0] != undefined && thisSession[0] != "undefined") {
            if (!thisSession[0].monitorScreens.includes(mainMonitorScreenId)) {
                //thisSession[0].monitorScreens.push(mainMonitorScreenId);
            }
        }

        // add the timerScreenId to this monitor scrren timers array
        var thisMainMonitorScreen = mainMonitorScreensActive.filter(monitorScreen => monitorScreen.mainMonitorScreenId == mainMonitorScreenId);    
        if (thisMainMonitorScreen[0] != null && thisMainMonitorScreen[0] != undefined && thisMainMonitorScreen[0] != "undefined") {
            if (!thisMainMonitorScreen[0].timerScreens.includes(timerScreenId)) {
                thisMainMonitorScreen[0].timerScreens.push(timerScreenId);

                // write a file to server for crash recovery
                fs.writeFile('./activeMonitorScreens/'+thisMainMonitorScreen[0].mainMonitorScreenId+'.txt', JSON.stringify(thisMainMonitorScreen[0].timerScreens), function (err) {
                    if (err) 
                        return console.log(err);
                });
            }
        }


        
    });

    socket.on('sendTimerScreenToMonitor', function(msg){ // controllerScreenId, timerScreenId, monitorScreenId
        if (logging) { console.log('sendTimerScreenToMonitor',msg); }

        // convert the strings received to an integer value
        var monitorScreenId = parseInt(msg.monitorScreenId);
        var timerScreenId = parseInt(msg.timerScreenId);
        var controllerScreenId = parseInt(msg.controllerScreenId);

        // find the session this controller belongs too so we can add the mainMonitorScreen to it
        var thisSession = sessionsActive.filter(session => session.controllerScreens.includes(controllerScreenId));

        // Add the mainMonitorScreenId to the controllers session
        if (!thisSession[0].monitorScreens.includes(monitorScreenId)) {
            //thisSession[0].monitorScreens.push(monitorScreenId);
        }
        
        // Send the timerScreenId to the mainMonitorScreen
        var thisMainMonitorScreen = mainMonitorScreensActive.filter(monitorScreen => monitorScreen.mainMonitorScreenId == monitorScreenId); 
        console.log("thisMainMonitorScreen",thisMainMonitorScreen);   
        if (thisMainMonitorScreen[0] != null && thisMainMonitorScreen[0] != undefined && thisMainMonitorScreen[0] != "undefined") {
            if (!thisMainMonitorScreen[0].timerScreens.includes(timerScreenId)) {
                thisMainMonitorScreen[0].timerScreens.push(timerScreenId);
                io.to(thisMainMonitorScreen[0].socketId).emit("timerScreenId",{'timerScreenId': timerScreenId});
                        
                // write a file to server for crash recovery
                fs.writeFile('./activeMonitorScreens/'+thisMainMonitorScreen[0].mainMonitorScreenId+'.txt', JSON.stringify(thisMainMonitorScreen[0].timerScreens), function (err) {
                    if (err) 
                        return console.log(err);
                });
            }
        }


    });

    socket.on('transferControlQRCodeRequest', function(msg){ //{"controllerScreenId": controllerScreenId
        if (logging) { console.log('transferControlQRCodeRequest',msg); }

        // convert the string received to an integer value
        var controllerScreenId = parseInt(msg.controllerScreenId);

        // find the session this controller belongs too
        var session = sessionsActive.filter(session => session.controllerScreens.includes(controllerScreenId));

        // Send the QR code to the controller screen
        var QRString = 'http://54.66.111.53:3000/timer/timerControl.html?timerCode='+session[0].timerScreens[0];
        QRCode.toDataURL(QRString, function (err, url) {

            // find the socketId for this controller
            var thisControllerScreenIdSocketId = controllerScreenIdsSocketIds.filter(controllerScreen => controllerScreen.controllerScreenId == controllerScreenId);
            var socketId = thisControllerScreenIdSocketId[0].socketId;

            // make sure the socket exists before using it otherwise it will crash the server
            if (socketId != null && socketId != undefined && socketId != "undefined") {
                io.to(socketId).emit("QRCodeRequestResponse", {"timerScreenQR":url, 'timerScreenId': session[0].timerScreens[0]});

            }
        });
    });
    socket.on('timerScreenCodeInputed', function(msg){ //{"controllerScreenId": controllerScreenId, "inputedCode": codeInputed});
        if (logging) { console.log('timerScreenCodeInputed',msg); }
        var controllerScreenId = parseInt(msg['controllerScreenId']);
        var codeInputed = parseInt(msg['inputedCode']);
        var timerScreenId = codeInputed;
        if (isInArray(timerScreenIdsUsed,timerScreenId)) {

            // check if the timer screen we're trying to control is already assigned to a session, and thereby, another controller
            var session = sessionsActive.filter(session => session.timerScreens.includes(timerScreenId));
            
            if (session.length != 0){
                
                // If it is, assign this controller to it and remove the old one
                var oldControllerScreenId = session[0].controllerScreens[0];
                session[0].controllerScreens.splice(session[0].controllerScreens.indexOf(oldControllerScreenId),1);
                session[0].controllerScreens.push(controllerScreenId); 

                // save the old socketId so we can send it a message after having deleted it's socket id from array
                var oldControllerScreensSocketIds = controllerScreenIdsSocketIds.filter(controllerScreen => controllerScreen.controllerScreenId == oldControllerScreenId);
                var oldControllerScreenSocketId = oldControllerScreensSocketIds[0].socketId;
                
                // remove the old controller screen ID and timer screen ID from controllerScreenIdsTimerScreenIds Array
                // filter returns an array of objects, hence the [0] reference below
                oldControllerTimerIdsArrayEntry = controllerScreenIdsTimerScreenIds.filter(thisOne => thisOne.controllerScreenId == oldControllerScreenId);
                controllerScreenIdsTimerScreenIds.splice(controllerScreenIdsTimerScreenIds.indexOf(oldControllerTimerIdsArrayEntry[0]),1);

                // add the new controller screen ID and old timer screen ID to controllerScreenIdsTimerScreenIds Array
                var newControllerTimerIds = {
                    "controllerScreenId":controllerScreenId,
                    "timerScreenId": oldControllerTimerIdsArrayEntry[0].timerScreenId
                }
                controllerScreenIdsTimerScreenIds.push(newControllerTimerIds);
                
                oldBgImagesArrayEntry = bgImages.find(bgImagesArrayEntry => bgImagesArrayEntry.sessionId == session.SessionId);
                bgImages.splice(bgImages.indexOf(bgImages.find(bgImagesArrayEntry => bgImagesArrayEntry.sessionId == session.SessionId)),1);
                if (oldBgImagesArrayEntry) {
                    bgImages.push({"sessionId": parseInt(session.SessionId),"data": oldBgImagesArrayEntry.data});
                }

                // send a message to the old controllerScreen to refresh. This should make it sit in the "input code" mode
                if (oldControllerScreenSocketId != null && oldControllerScreenSocketId != undefined && oldControllerScreenSocketId != "undefined") {
                    io.to(oldControllerScreenSocketId).emit("modalRefreshButton");
                }

                
                var thisControllerScreen = controllerScreenIdsSocketIds.find(controllerScreen => controllerScreen.controllerScreenId == controllerScreenId);
                if (thisControllerScreen != null && thisControllerScreen != undefined && thisControllerScreen != "undefined") {
                    io.to(thisControllerScreen.socketId).emit("codeInputed", {"timerScreenId": codeInputed, "data": session[0], "from":"timerScreenCodeInputed"});
                }


            }
            else {
                var newControllerTimerIds = {
                    "controllerScreenId":controllerScreenId,
                    "timerScreenId": timerScreenId
                }
                controllerScreenIdsTimerScreenIds.push(newControllerTimerIds);
                var thisSession = { 
                    "sessionId":                requestNewSessionId(),
                    "timerScreens":             [timerScreenId],
                    "controllerScreens":        [controllerScreenId],
                    "monitorScreens":           [],
                    "timers":                   [], //{"timerId": nextTimerId, "presenterName": "", "startSeconds": 0, "remainingSeconds": null, "startTime": "", "endTime": "", "timerJogButton": true, "timerMinuteButton": true }
                    "currentTimer":             null,
                    "currentTimerRunning":      false,
                    "timerRunningEndTime":      null,
                    "timerMessageOnScreen":     false,
                    "timerMessageFlash":        false,
                    "timerMessage":             "",
                    "timerName":                "",
                    "timerNameSize":            "auto",
                    "timerNameX":               "auto",
                    "timerNameY":               "auto",
                    "presenterNameSize":        "auto",
                    "presenterNameX":           "auto",
                    "presenterNameY":           "auto",
                    "timerSize":                "auto",
                    "timerX":                   "auto",
                    "timerY":                   "auto",
                    "timerMainColor":           "#FFFFFF",
                    "timerFirstIntervalTime":   300,
                    "timerFirstIntervalColor":  "#F5B942",
                    "timerFirstIntervalFlash":  false,
                    "timerSecondIntervalTime":  120,
                    "timerSecondIntervalColor": "#FF0000", 
                    "timerSecondIntervalFlash": false, 
                    "timerLessZeroFlash":       true, 
                    "timerLessZeroBgColor":     "#FF0000",
                    "timerLessZeroFgColor":     "#FFFFFF",
                    "pageBgColor":              "#000000",
                    "autoPlay":                 false,
                    "autoPlayLastStop":         false,
                    "pageBgImage" :             false
                }
                sessionsActive.push(thisSession);

                var thisTimerScreen = timerScreenIdsSocketIds.find(timerScreen => timerScreen.timerScreenId == timerScreenId);
                if (thisTimerScreen != null && thisTimerScreen != undefined && thisTimerScreen != "undefined") {
                    io.to(thisTimerScreen.socketId).emit("codeInputed", {"codeInputed":codeInputed, "data": thisSession, "from":"timerScreenCodeInputed"});
                }
                var thisControllerScreen = controllerScreenIdsSocketIds.find(controllerScreen => controllerScreen.controllerScreenId == controllerScreenId);
                if (thisControllerScreen != null && thisControllerScreen != undefined && thisControllerScreen != "undefined") {
                    io.to(thisControllerScreen.socketId).emit("codeInputed", {"timerScreenId": codeInputed, "data": thisSession, "from":"timerScreenCodeInputed"});
                }
            }

        }
        else {
            // maybe send a message to say timer screen code doesn't exist
        }
    });

    
    
    socket.on("bong",function(msg) {
        //console.log("bong",msg);
    }); 


    socket.on("modalLoadButton",function(msg){  // controllerScreenId
        if (logging) { console.log("modalLoadButton",msg); }

    });

    socket.on("bgImage",function(msg){  // controllerScreenId, dataURL (base64 encoded image data)
        if (logging) { console.log("bgImage",msg.controllerScreenId+' (and image data)'); }
        //console.log(msg);
        /* FIND TIMER SCREENS ASSOCIATED WITH THIS CONTROLLER
        sessionsActive
        {
        sessionId: 57423,
        timerScreens: [ 37885 ],
        controllerScreens: [ 81403 ],
        etc...
        */

        





        // find the session this controller belongs to
        var session = sessionsActive.filter(session => session.controllerScreens.includes(parseInt(msg.controllerScreenId)));
        

        // add this image to the server bg images in use array
        bgImages.push({"sessionId": parseInt(session[0].sessionId),"data": msg.data});


        // send the image to each timer screen
        session[0].timerScreens.forEach(function (timerScreenId) {
            // Find the socket id for each timerScreenId
           /*
            timerScreenIdsSocketIds
            [
            { timerScreenId: 37885, socketId: 'jubn_SdQiMLsIUJSAAAE' },
            { timerScreenId: 67101, socketId: 'jdXY__ekTyJ1rW0WAAAF' }
            ]
            */
            var thisTimerScreenSockedId = timerScreenIdsSocketIds.find(timerScreen => timerScreen.timerScreenId == timerScreenId);
            if (thisTimerScreenSockedId != null && thisTimerScreenSockedId != undefined && thisTimerScreenSockedId != "undefined") {
                io.to(thisTimerScreenSockedId.socketId).emit("bgImage",{"data": msg.data});
            }
        });
        session[0].monitorScreens.forEach(function (monitorScreenId) {
            var thisMonitorScreenSockedId = monitorScreenIdsSocketIds.find(monitorScreen => monitorScreen.monitorScreenId == monitorScreenId);
            if (thisMonitorScreenSockedId != null && thisMonitorScreenSockedId != undefined && thisMonitorScreenSockedId != "undefined") {
                io.to(thisMonitorScreenSockedId.socketId).emit("bgImage",{"data": msg.data});
            }
        });
        if (session[0].sessionId != 1 && session[0].sessionId != 2 && session[0].sessionId != 3){ // don't write over the demo files
            fs.writeFile('./sessionBgImages/'+session[0].sessionId+'.txt', msg.data, function (err) {
                if (err) 
                    return console.log(err);
            });
        }

    });
    socket.on("bgImageDelete",function(msg){ // controllerScreenId
        
        if (logging) { console.log("bgImageDelete",msg);}
        bgImages.splice(bgImages.indexOf(bgImages.find(bgImage => bgImage.sessionId === parseInt(session[0].sessionId))),1);
    });
    socket.on("getBgImage",function(msg){ // screenType: controllerScreen/timerScreen, screenId
        if (logging) { console.log("getBgImage",msg);}
        //console.log(msg);
     /* 
        sessionsActive
        {
        sessionId: 57423,
        timerScreens: [ 37885 ],
        controllerScreens: [ 81403 ],
        etc...
        */



        switch(msg.screenType) {
            case "controllerScreen":
                
                // find the session this controller belongs to
                var session = sessionsActive.filter(session => session.controllerScreens.includes(parseInt(msg.screenId)));

                var imgDataArrayEntry = bgImages.find(bgImage => bgImage.sessionId == parseInt(session[0].sessionId));
                if(typeof imgDataArrayEntry  != null && imgDataArrayEntry != undefined && imgDataArrayEntry != "undefined") {
                    if (socket != null && socket != undefined && socket != "undefined") {
                        if (imgDataArrayEntry != null && socket != undefined && socket != "undefined"){
                            io.to(socket.id).emit("bgImageReceived", {"data": imgDataArrayEntry.data});
                        }
                    }
                }
                break;
            case "timerScreen":
//
                // find the controller screen that is controlling this timer
                /*
                controllerScreenIdsTimerScreenIds
                [ { controllerScreenId: 94071, timerScreenId: 40869 } ]
                */
               
                // find the session this controller belongs to
                var session = sessionsActive.filter(session => session.timerScreens.includes(parseInt(msg.screenId)));

                var controllerScreenTimerScreen = controllerScreenIdsTimerScreenIds.find(controllerScreenTimerScreen => controllerScreenTimerScreen.timerScreenId == parseInt(msg.screenId));
                if(typeof controllerScreenTimerScreen  != null && controllerScreenTimerScreen != undefined && controllerScreenTimerScreen != "undefined") {
                    var thisControllerScreenId = controllerScreenTimerScreen.controllerScreenId;
                    var imgDataArrayEntry = bgImages.find(bgImage => bgImage.sessionId == parseInt(session[0].sessionId));
                    if(typeof imgDataArrayEntry  != null && imgDataArrayEntry != undefined && imgDataArrayEntry != "undefined") {
                        if (socket != null && socket != undefined && socket != "undefined") {
                            io.to(socket.id).emit("bgImageReceived", {"data": imgDataArrayEntry.data});
                        }
                    }
                }
                break;
        } 

    });

    
  
    
    socket.on('printArrays', function(){   
        
        console.log("_______________________________________________"); 
        console.log("_______________________________________________"); 
        console.log("_______________________________________________"); 
        console.log("_______________________________________________"); 
        console.log("_______________________________________________"); 
        console.log("_______________________________________________");  
          
        console.log("---printArrays---");
        console.log("timerScreenIdsSocketIds",timerScreenIdsSocketIds);
        console.log();
        console.log("timerScreenIdsUsed",timerScreenIdsUsed);
        console.log();
        console.log("controllerScreenIdsSocketIds",controllerScreenIdsSocketIds);
        console.log();
        console.log("controllerScreenIdsUsed",controllerScreenIdsUsed);
        console.log();
        console.log("controllerScreenIdsTimerScreenIds",controllerScreenIdsTimerScreenIds);
        console.log();
        
        console.log("monitorScreenIdsSocketIds",monitorScreenIdsSocketIds);
        console.log();
        console.log("monitorScreenIdsUsed",monitorScreenIdsUsed);
        console.log();
        console.log("mainMonitorScreenIdsUsed",mainMonitorScreenIdsUsed);
        console.log();
        console.log("mainMonitorScreensActive",mainMonitorScreensActive);
        console.log();
        console.log("mainMonitorScreensToDelete",mainMonitorScreensToDelete);
        console.log();
        /*
        console.log("bgImages",bgImages.length);
        console.log(); 
        //console.log('bingBongIntervalArray',bingBongIntervalArray);
        //console.log();
        */
        console.log("sessionsActive");
        sessionsActive.forEach(function (session, sessionIndex) {
            console.log(session);
        }); 
        console.log(); 
        
        console.log("sessionsToDelete",sessionsToDelete); 
        console.log("_______________________________________________"); 
        
    });
    
    socket.on('controllerSettingsUpdate', function(msg){ // controllerScreenId, timer --> a timer object (from a control screen), updateTimerScreens (true/false))
        
        if (logging) { console.log("controllerSettingsUpdate",msg);}
       // logger("controllerSettingsUpdate",JSON.stringify(msg, null, 4));
        var controllerScreenId = parseInt(msg.controllerScreenId);
        // Find the session that the controller that sent this message belongs to.
        sessionsActive.forEach(function (session, sessionIndex) {
            if (session.controllerScreens.includes(controllerScreenId)) {

                // if it is this session, delete it from the sessions array (we will re-add it below)
                sessionsActive.splice(sessionIndex, 1);
            }
            
        });

        // If updateTimerScreens is set to true, loop through the msg.timer.timers array and send data to timer screens
        if (msg.updateTimerScreens){
            if (msg.timer.timerScreens != null && msg.timer.timerScreens != undefined && msg.timer.timerScreens != "undefined") {
                msg.timer.timerScreens.forEach(function (timerScreenId, timerIndex) {
                        /*
                    timerScreenIdsSocketIds = 
                    [{
                        "timerScreenId": newTimerScreenId,
                        "socketId": socket.id
                    },{
                        "timerScreenId": newTimerScreenId,
                        "socketId": socket.id
                    }]
                    */
                    var thisTimerScreen = timerScreenIdsSocketIds.find(timerScreen => timerScreen.timerScreenId == timerScreenId);
                    if (thisTimerScreen != null && thisTimerScreen != undefined && thisTimerScreen != "undefined") {
                        io.to(thisTimerScreen.socketId).emit("updateTimer",{"data": msg.timer});
                    }
                });
            }
            if (logging) { console.log('msg.timer.monitorScreens ',msg.timer.monitorScreens ); }
            if (msg.timer.monitorScreens != null && msg.timer.monitorScreens != undefined && msg.timer.monitorScreens != "undefined") {
                msg.timer.monitorScreens.forEach(function(monitorScreenId, index) {
                    var thisMonitorScreen = monitorScreenIdsSocketIds.find(monitorScreen => monitorScreen.monitorScreenId == monitorScreenId);
                    if (thisMonitorScreen != null && thisMonitorScreen != undefined && thisMonitorScreen != "undefined") {
                        io.to(thisMonitorScreen.socketId).emit("updateTimer",{"data": msg.timer});
                    }
                });
            }
        }

        // add the sent timer back to the sessions array
        sessionsActive.push(msg.timer);


        if (msg.timer.sessionId != 1 && msg.timer.sessionId != 2 && msg.timer.sessionId != 3){ // don't write over the demo files
            fs.writeFile('./sessionSaveFiles/'+msg.timer.sessionId+'.txt', JSON.stringify(msg.timer), function (err) {
                if (err) 
                    return console.log(err);
            });
        }

        

    });
    
    socket.on('modalRefreshButton', function(msg){  // controllerScreenId
        
        if (logging) { console.log("modalRefreshButton",msg); }
        var controllerScreenId = parseInt(msg['controllerScreenId']);
        //console.log(controllerScreenId);
        /*
        controllerScreenIdsTimerScreenIds = [{
                "controllerScreenId":controllerScreenId,
                "timerScreenId": timerScreenId
        },{
                "controllerScreenId":controllerScreenId,
                "timerScreenId": timerScreenId
        }]
        */

        var timerScreenControllerScreen = controllerScreenIdsTimerScreenIds.find(controllerTimerSCreen => controllerTimerSCreen.controllerScreenId === controllerScreenId);

        /*
        timerScreenIdsSocketIds = 
        [{
            "timerScreenId": newTimerScreenId,
            "socketId": socket.id
        },{
            "timerScreenId": newTimerScreenId,
            "socketId": socket.id
        }]
        */
        var thisTimerScreen = timerScreenIdsSocketIds.find(timerScreen => timerScreen.timerScreenId === timerScreenControllerScreen.timerScreenId);
        // console.log(thisTimerScreen);
        if (thisTimerScreen != null && thisTimerScreen != undefined && thisTimerScreen != "undefined") {
            io.to(thisTimerScreen.socketId).emit("modalRefreshButton");
        }

    });
    
});

server.listen(3000, () => {

    // restart interrupted sessions
    fs.readdirSync("./sessionSaveFiles/").forEach(function(name) {
        fs.readFile("./sessionSaveFiles/"+name, 'utf8',(err, fileContent) => {
            var tempTimerScreenId;
            var tempControllerScreenId;
            if( err ) {
            } 
            else {
                data = JSON.parse(fileContent.toString());
                sessionsActive.push(data);
                data.timerScreens.forEach(function(timerScreenId){
                    var timerScreenObject = {
                        "timerScreenId": timerScreenId,
                        "socketId": ''
                    }
                    tempTimerScreenId = timerScreenId;
                    timerScreenIdsSocketIds.push(timerScreenObject);
                });
                data.controllerScreens.forEach(function(controllerScreenId){
                    var controllerScreenObject = {
                        "controllerScreenId": controllerScreenId,
                        "socketId": ''
                    }
                    tempControllerScreenId = controllerScreenId;
                    controllerScreenIdsSocketIds.push(controllerScreenObject);
                });
                controllerScreenIdsTimerScreenIds.push({ controllerScreenId: tempControllerScreenId, timerScreenId: tempTimerScreenId });


                
            }
        });
    });

    fs.readdirSync("./activeMonitorScreens/").forEach(function(name) {
        fs.readFile("./activeMonitorScreens/"+name, 'utf8',(err, fileContent) => {

            // convert the file contenst to a JS object
            data = JSON.parse(fileContent.toString());
            
            // create temp object

            var tempObj = {
                'mainMonitorScreenId': parseInt(name.substring(0,5)), // drop the ".txt" extension
                'socketId': '',
                'timerScreens': []
            };

            // loop through each timerId and add it to the array
            data.forEach(function(timerScreenId){
                tempObj.timerScreens.push(timerScreenId);
            });

            // push to mainMonitorScreensActive array
            mainMonitorScreensActive.push(tempObj);

        });
    });

    fs.readdirSync("./sessionBgImages/").forEach(function(name) {
        fs.readFile("./sessionBgImages/"+name, 'utf8',(err, fileContent) => {
            bgImages.push({"sessionId": name.split(".")[0],"data": fileContent});
        });
    });
});

//sessionsActive.push(msg.timer);