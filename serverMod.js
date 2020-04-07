/*
WARNING: THIS IS STILL EXPERIMENTAL STUFF
I want to have the ability to assign specific behaviors to each room without messing with the main engine
So I'm creating a module for server-side modifications (mods). There is one also for the client.
Their naming convention is roomIdFunction.
The functions are called by the engine at crucial points, only if they exist.
*/

module.exports.joinGame = function (player, roomId) {
    //console.log("MOD: Player " + player.nickName + " joined the game at room " + roomId);

    //objects are passed by reference so this actually changes the nickname on the server (but not on the client)
    //player.nickName = "Dude";
}

//custom function called on the server side when a player successfully enters or exits the room
//executed before it's broadcast to the other players
module.exports.experimentsEnter = function (player, roomId) {
    console.log("MOD: " + player.nickName + " entered room " + roomId);
}

module.exports.experimentsExit = function (player, roomId) {
    console.log("MOD: " + player.nickName + " exited room " + roomId);
}

//wouldn't it be funny if cetain rooms modified your messages?
module.exports.experimentsTalkFilter = function (player, message) {

    console.log("MOD: " + player.nickName + " said " + message);
    message = message.replace(/[aeiou]/ig, '');
    //make sure it returns a message
    return message;
}