/*
WARNING: THIS IS STILL EXPERIMENTAL STUFF
I want to have the ability to assign specific behaviors to each room without messing with the main engine
So I'm creating a module for server-side modifications (mods). There is one also for the client.
Their naming convention is roomIdFunction.
The functions are called by the engine at crucial points, only if they exist.
*/

//called at the beginning
module.exports.initMod = function (io, gameState, DATA) {
    console.log("MOD: Initialized");

    //EVERYTHING GLOBALLLLL
    global.rita = require('rita');
    global.gameState = gameState;
    global.io = io;
    global.DATA = DATA;

    

    global.lastRhymes = [];
    global.rhymingPlayers = {};
    global.beatPlaying = false;


    global.paranoidTalk = [
        "Good evening",
        "What is art?",
        "These are fantastic aesthetics",
        "I adore digital art",
        "What do you think of the tone?",
        "Yes",
        "There is a je ne sais quoi",
        "Something about the human condition",
        "The curation is impeccable",
        "No",
        "Have you seen that?",
        "What wonderful warm colours",
        "Watch carefully",
        "I feel enlightened",
        "Hello"
        
    ];

    //load extended dictionary, this is 3Mb but only sits on the server and it's used by only one room
    const fs = require('fs');
    
    //cycle through contraints in the consonant room
    global.consonant = 0;
    setInterval(function () {
        global.consonant++;
        //aeiou-
        if (global.consonant > 5) {
            global.consonant = 0;
        }
        var msg = "";

        if (global.consonant == 0) //a
            msg = "Thank you for coming to the show";
        if (global.consonant == 1) //e
            msg = "Welcome to CCI diploma show";
        if (global.consonant == 2) //i
            msg = "Enjoy the show";
        if (global.consonant == 3) //o
            msg = "Click on the different projects";
        if (global.consonant == 4) //u
            msg = "Play different presentations";
        if (global.consonant == 5) //none
            msg = "Have fun!";


        //sends a message to the room
        io.to("securityRoom").emit('nonPlayerTalked', { id: "", labelColor: "#3e7eb0", room: "securityRoom", message: msg, x: 36, y: 56 });

    }, 2.5 * 1000); //every 2.5 seconds changes

    //global function ffs
    global.random = function (min, max) {
        return Math.random() * (max - min) + min;
    }

      //Example of NPC creation and behavior

      var npc = new NPC(
        {
            id: "artCritic",
            nickName: "Art Critic",
            room: "gallery",
            x: 23,
            y: 78,
            avatar: 1,
            colors: [2, 2, 1, 2],
            labelColor: "#1e839d"
        });

    npc.behavior = setTimeout(function ramble() {
        var dice = random(0, 100);

        if (dice < 40) {
            npc.talk(global.paranoidTalk[Math.floor(random(0, global.paranoidTalk.length - 1))]);

            npc.behavior = setTimeout(ramble, random(7000, 9000));
        }
        else if (dice < 60) {
            npc.move(random(17, 113) * 2, random(76, 98) * 2);
            npc.behavior = setTimeout(ramble, random(4000, 8000));
        }
        else {
            //just wait
            npc.behavior = setTimeout(ramble, random(1000, 3000));

            //to kill the bot
            //clearTimeout(npc.behavior);
            //npc.delete();
        }


    }, random(1000, 2000));

    global.VIPList = [];

}


//custom function called on the server side when a player successfully enters or exits the room
//executed before it's broadcast to the other players
module.exports.experimentsJoin = function (player, roomId) {
    //console.log("MOD: " + player.nickName + " entered room " + roomId);
}

module.exports.experimentsLeave = function (player, roomId) {
    //console.log("MOD: " + player.nickName + " exited room " + roomId);
}

//wouldn't it be funny if cetain rooms modified your messages?
module.exports.experimentsTalkFilter = function (player, message) {

    //console.log("MOD: " + player.nickName + " said " + message);
    //message = message.replace(/[aeiou]/ig, '');
    //make sure it returns a message
    return message;
}


//wouldn't it be funny if cetain rooms modified your messages?
module.exports.VIPRoomTalkFilter = function (player, message) {

    //console.log("MOD: " + player.nickName + " said " + message);
    message = global.rita.getPhonemes(message);
    message = message.replace(/-/g, "");
    //make sure it returns a message
    return message;
}

//wouldn't it be funny if cetain rooms modified your messages?
module.exports.cnsnntrmTalkFilter = function (player, message) {

    //console.log("MOD: " + player.nickName + " said " + message);

    if (global.consonant == 0) //a
        message = message.replace(/[eiou]/ig, 'a');
    if (global.consonant == 1) //e
        message = message.replace(/[aiou]/ig, 'e');
    if (global.consonant == 2) //i
        message = message.replace(/[aeou]/ig, 'i');
    if (global.consonant == 3) //o
        message = message.replace(/[aeiu]/ig, 'o');
    if (global.consonant == 4) //u
        message = message.replace(/[aeio]/ig, 'u');
    if (global.consonant == 5) //none
        message = message.replace(/[aeiou]/ig, '');


    //make sure it returns a message
    return message;
}

//words can only be used once 
module.exports.censorshipRoomTalkFilter = function (player, message) {

    //create a list of censored words
    if (global.forbiddenWords == null) {
        global.forbiddenWords = [];
    }

    //strip special characters
    message = message.replace(/[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi, '');

    //break down the message into words
    var words = message.split(" ");
    var censoredMessage = "";

    //check each single word
    for (var j = 0; j < words.length; j++) {

        /*
        //remove repeated character if they occur more than twice like hellooooo > hello
        var word = words[j];
        var pChar = "";
        var ppChar = "";
        var newWord = "";

        for (var k = 0; k < word.length; k++) {
            var newChar = word[k];

            if (pChar == "" || ppChar == "" || !(newChar == ppChar && newChar == pChar)) {
                newWord += newChar;
            }
            ppChar = pChar;
            pChar = newChar;
        }
        */

        var newWord = words[j];

        //found, censor
        if (forbiddenWords.indexOf(newWord.toLowerCase()) > -1) {
            var l = newWord.length;
            var bleep = "";
            for (var i = 0; i < l; i++) {
                bleep += "*";
            }

            censoredMessage += bleep;

        }
        else {
            censoredMessage += newWord;
            //not found add
            forbiddenWords.push(newWord.toLowerCase());
        }

        if (j < words.length - 1)
            censoredMessage += " ";
    }


    return censoredMessage;

}




//if enters when music is playing sent 
module.exports.rhymeRoomJoin = function (playerObject, roomId) {

    if (io.sockets.sockets[playerObject.id] != null && global.beatPlaying) {
        io.sockets.sockets[playerObject.id].emit('musicEnter', global.beat);

    }

}

//if enters when music is playing sent 
module.exports.rhymeRoomLeave = function (playerObject, roomId) {

    if (io.sockets.sockets[playerObject.id] != null) {
        io.sockets.sockets[playerObject.id].emit('musicExit');

    }
}

module.exports.darkRoomTalkFilter = function (player, message) {
    //I should declare them at the init but whatev
    var nouns = ["ass", "climax", "coitus", "boner", "booty", "threesome", "tush", "lust", "orgy", "libido", "dildo", "kink",
        "porno", "buttplug", "cunnilingus", "cybersex", "sex", "cum", "orgasm", "quickie", "intercourse", "cock", "penis", "dick", "pussy", "fanny", "vagina", "clit", "butt"];
    var verbs = ["love", "shag", "mate", "seduce", "hook up", "hump", "arouse", "fornicate", "erect", "get some", "bone", "bang", "fuck", "lick", "suck", "cum", "penetrate", "screw", "sodomize", "arouse", "kiss", "pet", "masturbate", "come"];

    var arr = rita.tokenize(message);
    var replaced = false;

    for (var i = 0; i < arr.length && !replaced; i++) {
        var word = arr[i];
        //skip verbs 50% since they are more likely to come before nouns
        if (rita.isVerb(word) && Math.random() < 0.5) {
            arr[i] = rita.randomItem(verbs);
            replaced = true;
        }
        if (rita.isNoun(word)) {
            arr[i] = rita.randomItem(nouns);
            replaced = true;
        }

    }

    return arr.join(" ");
}

//player enters family room roles are assigned by the server
module.exports.familyRoomJoin = function (playerObject, roomId) {

    var foundRole = false;
    for (var roleId in global.familyRoles) {
        //role not assigned
        if (global.familyRoles[roleId] == "" && !foundRole) {
            foundRole = true;
            global.familyRoles[roleId] = playerObject.id;
            console.log(playerObject.id + " becomes " + roleId);
        }
    }

    if (!foundRole)
        console.log(playerObject.id + " becomes a fly");

    //assign a new role and send all the roles to the room

    io.to("familyRoom").emit('updateRoles', playerObject.id, global.familyRoles);

    //io.to("familyRoom").emit('assignRole', { id: playerObject.id, roleId: "wife", roleLabel: "Wife", rolePrompt: "You are feeling frustrated" });
    //send the existing roles
}

//exit > free up the role
//player enters family room roles are assigned by the server
module.exports.familyRoomLeave = function (playerObject, roomId) {

    for (var roleId in global.familyRoles) {
        //role not assigned
        if (global.familyRoles[roleId] == playerObject.id) {

            global.familyRoles[roleId] = "";
            console.log(roleId + " is now free");
        }
    }
    //I don't need to send updated roles
    //io.to("familyRoom").emit('updateRoles', playerObject.id, global.familyRoles);

}

//mute spectators on the server-side
module.exports.familyRoomTalkFilter = function (player, message) {
    var spectator = true;

    for (var roleId in global.familyRoles) {
        //role assigned
        if (global.familyRoles[roleId] == player.id) {
            spectator = false;
        }
    }

    if (spectator)
        return "zzzz";
    else
        return message;

}

module.exports.VIPRoomJoin = function (playerObject, roomId) {
    //console.log(playerObject.nickName + " enters the VIP room");
    //...
    global.VIPList.push(playerObject.id);
    if (global.VIPList.length > 3) {
        var expelled = global.VIPList.shift();

        //force leave
        if (io.sockets.sockets[expelled] != null) {

            this.transferPlayer(expelled, "VIPRoom", "likelikeOutside", 121 * 2, 89 * 2);
            io.to(expelled).emit('godMessage', "Sorry, we had to expel you to make room for " + playerObject.nickName);
        }

    }

}

module.exports.VIPRoomIntro = function (newComerId, introObj) {
    //the problem with the auto expulsion in VIPRoom is that the intro is sent before it's the other person is expelled
    //so the intros arrive too late creating ghosts.
    //since the server has the real list I can override the intro after the fact and expel the ghost. Ugly but necessary.

    //console.log("Obsolete intro? " + gameState.players[introObj.id].room);

    if (gameState.players[introObj.id].room != "VIPRoom")
        io.to("VIPRoom").emit("playerLeft", { id: introObj.id, room: "VIPRoom", disconnect: false });

}

//force change room
module.exports.transferPlayer = function (playerId, from, to, x, y) {
    //console.log(playerId + " is transfered to " + to);

    var s = io.sockets.sockets[playerId];
    var p = gameState.players[playerId];

    if (s != null)
        if (p.room != null) {

            //var from = p.room;
            s.leave(from);
            s.join(to);

            //broadcast the change to everybody in the current room
            //from the client perspective leaving the room is the same as disconnecting
            io.to(from).emit("playerLeft", { id: playerId, room: from, disconnect: false });

            //same for joining, sending everybody in the room the player state

            p.room = to;
            p.x = p.destinationX = x;
            p.y = p.destinationY = y;
            p.new = false;


            //check if there is a custom function in the MOD to call at this point
            if (this[from + "Leave"] != null) {
                //call it!
                this[from + "Leave"](p, from);
            }

            io.to(to).emit("playerJoined", p);


            //check if there is a custom function in the MOD to call at this point
            if (this[to + "Join"] != null) {
                //call it!
                this[to + "Join"](p, to);
            }

            //check if there are NPCs in this room and make them send info to the player
            for (var NPCId in gameState.NPCs) {
                var npc = gameState.NPCs[NPCId];

                if (npc.room == to) {
                    npc.sendIntroTo(playerId);
                }
            }

        }
}

//if a player leaves the room on their own accord make sure they are removed from the list as well
module.exports.VIPRoomLeave = function (playerObject, roomId) {
    //console.log(playerObject.nickName + " exits the VIP room");

    var index = global.VIPList.indexOf(playerObject.id);
    if (index !== -1) {
        global.VIPList.splice(index, 1);
    }

}


//a client can send generic action request to the server
//the action logic is defined in functions named "on"+ActionId like this one
//I don't want a hacked client to be able to call whatever function exists on the server mod hence the naming
//and I want send only an id without arguments to force all my logic here on the server side
module.exports.onTVInteract = function (pId) {
    //console.log("Action onTVInteract called by " + pId);

    //a persistent change to the game state: change the DATA sent to the new players
    //*persistent until server restarts

    var TVState = !DATA.ROOMS.familyRoom.things.TV.visible;
    //change the visibility
    DATA.ROOMS.familyRoom.things.TV.visible = TVState;
    //send a thing update too ALL clients, changing the client data and telling them to delete and recreate the sprite if they are in the room 
    io.sockets.emit("thingChanged", { thingId: "TV", room: "familyRoom", property: "visible", value: TVState });
}
