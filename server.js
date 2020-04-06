//check README.md

//load secret config vars
require('dotenv').config();
const DATA = require('./data');

//.env content
/*
ADMINS=username1|pass1,username2|pass2
PORT = 3000
*/

var port = process.env.PORT || 3000;

//number of emits per second allowed for each player, after that ban the IP.
//over 30 emits in this game means that the client is hacked and the flooding is malicious
//if you change the game logic make sure this limit is still reasonable
var PACKETS_PER_SECONDS = 30;

/*
The client and server version strings MUST be the same!
They can be used to force clients to hard refresh to load the latest client.
If the server gets updated it can be restarted, but if there are active clients (users' open browsers) they could be outdated and create issues.
If the VERSION vars are mismatched they will send all clients in an infinite refresh loop. Make sure you update sketch.js before restarting server.js
*/
var VERSION = "1.0";

//create a web application that uses the express frameworks and socket.io to communicate via http (the web protocol)
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Filter = require('bad-words');


//time before disconnecting (forgot the tab open?)
var ACTIVITY_TIMEOUT = 10 * 60 * 1000;
//should be the same as index maxlength="16"
var MAX_NAME_LENGTH = 16;

//cap the overall players 
var MAX_PLAYERS = -1;
//refuse people when a room is full 
var MAX_PLAYERS_PER_ROOM = 200;

//views since the server started counts relogs
var visits = 0;

/*
A very rudimentary admin system. 
Reserved usernames and admin pass are stored in .env file as
ADMINS=username1|pass1,username2|pass2

Admin logs in as username|password in the normal field
If combo user|password is correct (case insensitive) mark the player as admin on the server side
The "username|password" remains stored on the client as var nickName 
and it's never shared to other clients, unlike player.nickName

admins can call admin commands from the chat like /kick nickName
*/
var admins = [];
if (process.env.ADMINS != null)
    admins = process.env.ADMINS.split(",");

//We want the server to keep track of the whole game state
//in this case the game state are the attributes of each player
var gameState = {
    players: {}
}

//a collection of banned IPs
//not permanent, it lasts until the server restarts
var banned = [];

//when a client connects serve the static files in the public directory ie public/index.html
app.use(express.static('public'));

//when a client connects the socket is established and I set up all the functions listening for events
io.on('connection', function (socket) {


    //this bit (middleware?) catches all incoming packets
    //I use to make my own lil rate limiter without unleashing 344525 dependencies
    //a rate limiter prevents malicious flooding from a hacked client
    socket.use((packet, next) => {
        if (gameState.players[socket.id] != null) {
            var p = gameState.players[socket.id];
            p.floodCount++;
            if (p.floodCount > PACKETS_PER_SECONDS) {
                console.log(socket.id + " is flooding! BAN BAN BAN");


                if (p.IP != "") {
                    //comment this if you don't want to ban the IP
                    banned.push(p.IP);
                    socket.emit("errorMessage", "Flooding attempt! You are banned");
                    socket.disconnect();
                }

            }
        }
        next();
    });


    //this appears in the terminal
    console.log('A user connected');

    //this is sent to the client upon connection
    socket.emit('serverWelcome', VERSION, DATA);

    //wait for the player to send their name and info, then broadcast them
    socket.on('join', function (playerInfo) {

        //console.log("Number of sockets " + Object.keys(io.sockets.connected).length);

        try {

            //if running locally it's not gonna work
            var IP = "";
            //oh look at this beautiful socket.io to get an goddamn ip address
            if (socket.handshake.headers != null)
                if (socket.handshake.headers["x-forwarded-for"] != null) {
                    IP = socket.handshake.headers["x-forwarded-for"].split(",")[0];
                }

            if (playerInfo.nickName == "")
                console.log("New user joined the server in lurking mode " + socket.id + " " + IP);
            else
                console.log("New user joined the game: " + playerInfo.nickName + " avatar# " + playerInfo.avatar + " color# " + playerInfo.color + " " + socket.id);

            var roomPlayers = 1;
            var myRoom = io.sockets.adapter.rooms[playerInfo.room];
            if (myRoom != undefined) {
                roomPlayers = myRoom.length + 1;
                console.log("There are now " + roomPlayers + " users in " + playerInfo.room);
            }

            var serverPlayers = Object.keys(io.sockets.connected).length + 1;

            var isBanned = false;

            //prevent banned IPs from joining
            if (IP != "") {
                var index = banned.indexOf(IP);
                //found
                if (index > -1) {
                    console.log("ATTENTION: banned " + IP + " is trying to log in again");
                    isBanned = true;
                    socket.emit("errorMessage", "You have been banned");
                    socket.disconnect();
                }

            }


            if (isBanned) {

            }
            //prevent a hacked client from duplicating players
            else if (gameState.players[socket.id] != null) {
                console.log("ATTENTION: there is already a player associated to the socket " + socket.id);
            }
            else if ((serverPlayers > MAX_PLAYERS && MAX_PLAYERS != -1) || (roomPlayers > MAX_PLAYERS_PER_ROOM && MAX_PLAYERS_PER_ROOM != -1)) {
                //limit the number of players
                console.log("ATTENTION: " + playerInfo.room + " reached maximum capacity");
                socket.emit("errorMessage", "The server is full, please try again later.");
                socket.disconnect();
            }
            else {

                //if client hacked truncate
                if (playerInfo.nickName.length > MAX_NAME_LENGTH)
                    playerInfo.nickName = playerInfo.nickName.substring(0, MAX_NAME_LENGTH);


                //the first validation was to give the player feedback, this one is for real
                var val = 1;

                //always validate lurkers, they can't do anything
                if (playerInfo.nickName != "")
                    val = validateName(playerInfo.nickName);

                if (val == 0 || val == 3) {
                    console.log("ATTENTION: " + socket.id + " tried to bypass username validation");
                }
                else {

                    //if there is an | strip the after so the password remains in the admin client
                    var combo = playerInfo.nickName.split("|");
                    playerInfo.nickName = combo[0];

                    if (val == 2)
                        console.log(playerInfo.nickName + " joins as admin");

                    //the player objects on the client will keep track of the room
                    var newPlayer = { id: socket.id, nickName: filter.clean(playerInfo.nickName), color: playerInfo.color, room: playerInfo.room, avatar: playerInfo.avatar, x: playerInfo.x, y: playerInfo.y };

                    //save the same information in my game state
                    gameState.players[socket.id] = newPlayer;
                    //set last message at the beginning of time, the SEVENTIES
                    gameState.players[socket.id].lastMessage = 0;
                    //is it admin?
                    gameState.players[socket.id].admin = (val == 2) ? true : false;
                    gameState.players[socket.id].spam = 0;
                    gameState.players[socket.id].lastActivity = new Date().getTime();
                    gameState.players[socket.id].muted = false;
                    gameState.players[socket.id].IP = IP;
                    gameState.players[socket.id].floodCount = 0;

                    //send the user to the default room
                    socket.join(playerInfo.room, function () {
                        //console.log(socket.rooms);
                    });

                    newPlayer.new = true;

                    //let's not count lurkers
                    if (playerInfo.nickName != "")
                        visits++;

                    //send all players information about the new player
                    //upon creation destination and position are the same 
                    io.to(playerInfo.room).emit('playerJoined', newPlayer);

                    console.log("There are now " + Object.keys(gameState.players).length + " players on this server. Total visits " + visits);
                }
            }
        } catch (e) {
            console.log("Error on join, object malformed from" + socket.id + "?");
            console.error(e);
        }
    });

    //when a client disconnects I have to delete its player object
    //or I would end up with ghost players
    socket.on('disconnect', function () {
        try {
            console.log("Player disconnected " + socket.id);
            io.sockets.emit('playerLeft', { id: socket.id, disconnect: true });
            //send the disconnect
            //delete the player object
            delete gameState.players[socket.id];
            console.log("There are now " + Object.keys(gameState.players).length + " players on this server");
        }
        catch (e) {
            console.log("Error on disconnect, object malformed from" + socket.id + "?");
            console.error(e);
        }
    });

    //when I receive an intro send it to the recipient
    socket.on('intro', function (newComer, obj) {
        //verify the id to make sure a hacked client can't fake players
        if (obj != null) {

            if (obj.id == socket.id) {
                io.to(newComer).emit('onIntro', obj);
            }
            else {
                console.log("ATTENTION: Illegitimate intro from " + socket.id);
            }
        }
    });


    //when I receive a talk send it to everybody in the room
    socket.on('talk', function (obj) {
        try {

            var time = new Date().getTime();

            //block if spamming
            if (time - gameState.players[socket.id].lastMessage > DATA.SETTINGS.ANTI_SPAM && !gameState.players[socket.id].muted) {

                //Admin commands can be typed as messages
                //is this an admin
                if (gameState.players[socket.id].admin && obj.message.charAt(0) == "/") {
                    console.log("Admin " + gameState.players[socket.id].nickName + " attempts command " + obj.message);
                    adminCommand(socket, obj.message);
                }
                else {
                    //normal talk stuff

                    //aphostrophe
                    obj.message = obj.message.replace("’", "'");

                    //replace unmapped characters
                    obj.message = obj.message.replace(/[^A-Za-z0-9_!$%*()@./#&+-|]*$/g, "");

                    //remove leading and trailing whitespaces
                    obj.message = obj.message.replace(/^\s+|\s+$/g, "");
                    //filter bad words
                    obj.message = filter.clean(obj.message);
                    //advanced cleaning

                    //f u c k
                    var test = obj.message.replace(/\s/g, '');
                    //fffffuuuuck
                    var test2 = obj.message.replace(/(.)(?=.*\1)/g, "");
                    //f*u*c*k
                    var test3 = obj.message.replace(/\W/g, "");
                    //spaces
                    var test4 = obj.message.replace(/\s/g, '');

                    if (filter.isProfane(test) || filter.isProfane(test2) || filter.isProfane(test3) || test4 == "") {
                        console.log(socket.id + " is problematic");
                    }
                    else {
                        io.to(obj.room).emit('playerTalked', { id: socket.id, color: obj.color, message: obj.message, x: obj.x, y: obj.y });
                    }
                }

                //update the last message time
                gameState.players[socket.id].lastMessage = time;
                gameState.players[socket.id].lastActivity = time;

            }
        } catch (e) {
            console.log("Error on talk, object malformed from" + socket.id + "?");
            console.error(e);
        }

    });


    //when I receive a move sent it to everybody
    socket.on('changeRoom', function (obj) {
        try {

            var roomPlayers = 1;
            var myRoom = io.sockets.adapter.rooms[obj.to];
            if (myRoom != undefined) {
                roomPlayers = myRoom.length + 1;
            }

            if (roomPlayers > MAX_PLAYERS_PER_ROOM && MAX_PLAYERS_PER_ROOM != -1) {
                //limit the number of players
                console.log("ATTENTION: " + obj.to + " reached maximum capacity");
                //keep the player in game, send a message
                socket.emit('godMessage', "The room looks full");
            }
            else {
                //console.log("Player " + socket.id + " moved from " + obj.from + " to " + obj.to);


                socket.leave(obj.from);
                socket.join(obj.to);

                //broadcast the change to everybody in the current room
                //from the client perspective leaving the room is the same as disconnecting
                io.to(obj.from).emit('playerLeft', { id: socket.id, disconnect: false });

                //same for joining, sending everybody in the room the player state
                var playerObject = gameState.players[socket.id];
                playerObject.room = obj.to;
                playerObject.x = playerObject.destinationX = obj.x;
                playerObject.y = playerObject.destinationY = obj.y;
                playerObject.new = false;
                io.to(obj.to).emit('playerJoined', playerObject);
            }
        } catch (e) {
            console.log("Error on join, object malformed from" + socket.id + "?");
            console.error(e);
        }

    });

    //when I receive a move sent it to everybody
    socket.on('move', function (obj) {
        try {
            gameState.players[socket.id].lastActivity = new Date().getTime();

            //broadcast the movement to everybody
            io.to(obj.room).emit('playerMoved', { id: socket.id, x: obj.x, y: obj.y, destinationX: obj.destinationX, destinationY: obj.destinationY });

        } catch (e) {
            console.log("Error on join, object malformed from" + socket.id + "?");
            console.error(e);
        }
    });

    //when I receive a user name validate it
    socket.on('sendName', function (nn) {
        try {

            var res = validateName(nn);

            //send the code 0 no - 1 ok - 2 admin
            socket.emit('nameValidation', res);
        } catch (e) {
            console.log("Error on sendName " + socket.id + "?");
            console.error(e);
        }
    });

    //when a character emote animation changes
    socket.on('emote', function (obj) {
        try {
            io.to(obj.room).emit('playerEmoted', socket.id, obj.em);
        } catch (e) {
            console.log("Error on emote " + socket.id + "?");
            console.error(e);
        }
    });

    //user afk
    socket.on('focus', function (obj) {
        try {
            //console.log(socket.id + " back from AFK");
            io.to(obj.room).emit('playerFocused', socket.id);
        } catch (e) {
            console.log("Error on focus " + socket.id + "?");
            console.error(e);
        }
    });

    socket.on('blur', function (obj) {
        try {
            //console.log(socket.id + " is AFK");
            io.to(obj.room).emit('playerBlurred', socket.id)
        } catch (e) {
            console.log("Error on blur " + socket.id + "?");
            console.error(e);
        }
    });

});


//rate limiting - clears the flood count
setInterval(function () {
    for (var id in gameState.players) {
        if (gameState.players.hasOwnProperty(id)) {
            gameState.players[id].floodCount = 0;
        }
    }
}, 1000);



function validateName(nn) {

    var admin = false;
    var duplicate = false;
    var reserved = false;

    //check if the nickname is a name + password combo
    var combo = nn.split("|");

    //it may be
    if (combo.length > 1) {
        var n = combo[0];
        var p = combo[1];

        for (var i = 0; i < admins.length; i++) {
            if (admins[i].toUpperCase() == nn.toUpperCase()) {
                //it is an admin name! check if the password is correct, case insensitive 
                admin = true;
            }
        }
        //if there is an | just strip the after
        nn = n;
    }

    //if not admin check if the nickname is reserved (case insensitive)
    if (!admin) {
        for (var i = 0; i < admins.length; i++) {
            var combo = admins[i].split("|");
            if (combo[0].toUpperCase() == nn.toUpperCase()) {
                //it is! kill it. Yes, it should be done at login and communicated 
                //but hey I don't have to be nice to users who steal my name
                reserved = true;
            }
        }
    }

    var id = idByName(nn);
    if (id != null) {
        duplicate = true;
        console.log("There is already a player named " + nn);
    }

    //i hate this double negative logic but I hate learning regex more
    var res = nn.match(/^([a-zA-Z0-9 !@#$%&*(),._-]+)$/);

    if (res == null)
        return 3
    else if (duplicate || reserved)
        return 0
    else if (admin)
        return 2
    else
        return 1

}


//parse a potential admin command
function adminCommand(adminSocket, str) {
    try {
        //remove /
        str = str.substr(1);
        var cmd = str.split(" ");
        switch (cmd[0]) {
            case "kick":
                var s = socketByName(cmd[1]);
                if (s != null) {
                    //shadow disconnect
                    s.disconnect();

                }
                else {
                    //popup to admin
                    adminSocket.emit("popup", "I can't find a user named " + cmd[1]);
                }
                break;

            case "mute":
                var s = idByName(cmd[1]);
                if (s != null) {
                    gameState.players[s].muted = true;
                }
                else {
                    //popup to admin
                    adminSocket.emit("popup", "I can't find a user named " + cmd[1]);
                }
                break;

            case "unmute":
                var s = idByName(cmd[1]);
                if (s != null) {
                    gameState.players[s].muted = false;
                }
                else {
                    //popup to admin
                    adminSocket.emit("popup", "I can't find a user named " + cmd[1]);
                }
                break;

            //trigger a direct popup
            case "popup":

                var s = socketByName(cmd[1]);
                if (s != null) {
                    //take the rest as string
                    cmd.shift();
                    cmd.shift();
                    var msg = cmd.join(" ");
                    s.emit("popup", msg);
                }
                else {
                    //popup to admin
                    adminSocket.emit("popup", "I can't find a user named " + cmd[1]);
                }
                break;

            //send fullscreen message to everybody
            case "god":
                cmd.shift();
                var msg = cmd.join(" ");
                io.sockets.emit('godMessage', msg);
                break;


            //add to the list of banned IPs
            case "ban":
                var IP = IPByName(cmd[1]);
                var s = socketByName(cmd[1]);
                if (IP != "") {
                    banned.push(IP);
                }

                if (s != null) {
                    s.emit("errorMessage", "You have been banned");
                    s.disconnect();
                }
                else {
                    //popup to admin
                    adminSocket.emit("popup", "I can't find a user named " + cmd[1]);
                }

                break;

            case "unban":
                //releases the ban
                banned = [];
                break;

            //forces a hard refresh - all players disconnect
            //used to load a new version of the client
            case "refresh":
                io.sockets.emit("refresh");
                break;

        }
    }
    catch (e) {
        console.log("Error admin command");
        console.error(e);
    }
}

//admin functions, the admin exists in the client frontend so they don't have access to ip and id of other users
function socketByName(nick) {
    var s = null;
    for (var id in gameState.players) {
        if (gameState.players.hasOwnProperty(id)) {
            if (gameState.players[id].nickName.toUpperCase() == nick.toUpperCase()) {
                s = io.sockets.sockets[id];
            }
        }
    }
    return s;
}

function idByName(nick) {
    var i = null;
    for (var id in gameState.players) {
        if (gameState.players.hasOwnProperty(id)) {
            if (gameState.players[id].nickName.toUpperCase() == nick.toUpperCase()) {
                i = id;
            }
        }
    }
    return i;
}

function IPByName(nick) {
    var IP = "";
    for (var id in gameState.players) {
        if (gameState.players.hasOwnProperty(id)) {
            if (gameState.players[id].nickName.toUpperCase() == nick.toUpperCase()) {
                IP = gameState.players[id].IP;
            }
        }
    }
    return IP;
}


//listen to the port 3000 this powers the whole socket.io
http.listen(port, function () {
    console.log('listening on *:3000');
});

//check the last activity and disconnect players that have been idle for too long
setInterval(function () {
    var time = new Date().getTime();

    for (var id in gameState.players) {
        if (gameState.players.hasOwnProperty(id)) {

            if (gameState.players[id].nickName != "" && (time - gameState.players[id].lastActivity) > ACTIVITY_TIMEOUT) {
                console.log(id + " has been idle for more than " + ACTIVITY_TIMEOUT + " disconnecting");
                io.sockets.sockets[id].emit("refresh");
                io.sockets.sockets[id].disconnect();
            }
        }
    }
}, 1000);



//in my gallery people can swear but not use slurs, override bad-words list, and add my own, pardon for my french
let myBadWords = ['chink', 'cunt', 'cunts', "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "jap", "homo", "nigger", "niggers", "n1gger", "nigg3r"];
var filter = new Filter({ emptyList: true });
filter.addWords(...myBadWords);



