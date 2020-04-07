/*
WARNING: THIS IS STILL EXPERIMENTAL STUFF
I want to have the ability to assign specific behaviors to each room without messing with the main engine
So this is a file for client-side modifications (mods). There is one for the server side as well.
Their naming convention is roomIdFunction.
The functions are called by the engine at crucial points, only if they exist. 
*/

//when my players joins the game for the first time, after everything in the room is initialized
//called also for lurk mode (nickName == "")
function initMod(playerId, roomId) {
    print("Mod: " + players[playerId].nickName + " joined the game at " + roomId)
}

//roomnameEnter: called when a player enters a room, after all the normal operations
//called also for lurk mode (nickName == "")
function experimentsEnter(playerId, roomId) {
    print("MOD: " + players[playerId].nickName + " entered room " + roomId);

    //a full screen welcome text appears 
    longText = "Welcome " + players[playerId].nickName;
    longTextLines = -1;
    longTextAlign = "center";
}

//roomnameExit: called right before a player exits or disconnects
function experimentsExit(playerId) {
    print("MOD: " + players[playerId].nickName + " exited room " + roomId);
}

//called every frame in a specific room - beware: this is client side, everything non deterministic and non server-driven
//may misalign the players clients
function experimentsUpdate() {
    //print("MOD: updating experiments");
}

//roomnameTalk: called when somebody in the room talks, passes player object and the new bubble (before it's added to the stack and before the sound is made)
function experimentsTalk(playerId, bubble) {
    print("MOD: " + players[playerId].nickName + " said " + bubble.message);

    //overwrites the color
    bubble.color = color("#FFFFFF");
    //all bubbles show up in the center and lines are not drawn
    /*
    bubble.x = WIDTH / 2 - bubble.w / 2;
    bubble.y = HEIGHT / 2;
    bubble.px = 0;
    bubble.py = 0;
    */
}

//this can override or modify the normal player drawing function
function experimentsDrawSprite(playerId, sprite, drawingFunction) {
    //print("MOD: " + players[playerId].nickName + " being drawn experimentally " + sprite.width); //let's not call this at every frame

    //the normal drawing function comment this out to see the examples below
    drawingFunction();

    /*
    //don't try this
    tint(random(0, 255), random(0, 255), random(0, 255));
    drawingFunction();
    noTint();
    */

    //draw a square
    /*
    fill(0);
    rect(0, 0, 10, 10);
    */

    /*
    //sprites drawn horizontally and 20 pixel above the grund
    push();
    translate(0, -20);
    angleMode(DEGREES);
    rotate(90);
    //the original drawing function
    drawingFunction();
    pop();
    */

}

