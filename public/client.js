//check README.md for more information

//VS Code intellisense
/// <reference path="TSDef/p5.global-mode.d.ts" />

/*
The client and server version strings MUST be the same!
If the server gets updated it can be restarted, but if there are active clients (users' open browsers) they could be outdated and create issues.
*/
var VERSION = "1.0";

//for testing purposes I can skip the login phase
//and join with a random avatar
var QUICK_LOGIN = false;

//true: preview the room as invisible user
//false: go directly to the login without previewing the room
//ignored if QUICK_LOGIN is true
var LURK_MODE = true;

//expose the room locations on the url and make them them shareable
//you can access the world from any point. False ignores
var ROOM_LINK = true;

//can by changed by user
var SOUND = true;
var AFK = false;

//native canvas resolution
var WIDTH = 256;
var HEIGHT = 200;

/*
The original resolution (pre canvas stretch) is 128x100 multiplied by 2 because
otherwise there wouldn't be enough room for pixel text.
Basically the backgrounds' pixels are twice the pixels of the text.
ASSET_SCALE is a multiplier for all backgrounds, areas, sprites, and coordinates
that are natively drawn at 128x100
*/
var ASSET_SCALE = 2;

//dynamically adjusted based on the window
var canvasScale;

//all avatars are the same size
var AVATAR_W = 10;
var AVATAR_H = 18;
//number of avatars in the sheets
var AVATARS = 37;
//the big file if used
var ALL_AVATARS_SHEET = "allAvatars.png";
//the number of frames for walk cycle and emote animation
//the first frame of emote is also the idle frame
var WALK_F = 4;
var EMOTE_F = 2;

//the socket connection
var socket;
//sent by the server
var ROOMS;
var SETTINGS;

//avatar linear speed, pixels per milliseconds
var SPEED = 50;

var ASSETS_FOLDER = "assets/";

//text vars
//MONOSPACED FONT
//thank you https://datagoblin.itch.io/monogram
var FONT_FILE = "assets/monogram_extended.ttf";
var FONT_SIZE = 16; //to avoid blur
var font;
var TEXT_H = 8;
var TEXT_PADDING = 3;
var TEXT_LEADING = TEXT_H + 4;

var LOGO_FILE = "logo.png";
var MENU_BG_FILE = "menu_white.png";

//how long does the text bubble stay
var BUBBLE_TIME = 8;
var BUBBLE_MARGIN = 3;

//when lurking the logo can disappear
//in millisecs, -1 forever in lurk mode
var LOGO_STAY = -1;

//default page background 
var PAGE_COLOR = "#000000";

//sprite reference color for palette swap
//hair, skin, shirt, pants
var REF_COLORS = ['#413830', '#c0692a', '#ff004d', '#29adff'];
//the palettes that will respectively replace the colors above
var AVATAR_PALETTES = [
    ['#ffa300', '#e27c32', '#a8e72e', '#00b543'],
    ['#a8e72e', '#e27c32', '#111d35', '#8f3f17'],
    ['#413830', '#e27c32', '#c2c3c7', '#a28879'],
    ['#a28879', '#e27c32', '#f3ef7d', '#422136'],
    ['#a28879', '#e27c32', '#ca466d', '#1e839d'],
    ['#413830', '#e27c32', '#111d35', '#ca466d'],
    ['#be1250', '#e27c32', '#ffec27', '#1e839d'],
    ['#ffec27', '#e27c32', '#1e839d', '#422136'],

    ['#413830', '#8f3f17', '#ff004d', '#413830'],
    ['#413830', '#8f3f17', '#ff9d81', '#413830'],
    ['#a28879', '#8f3f17', '#ffec27', '#ff6c24'],
    ['#413830', '#8f3f17', '#c2c3c7', '#ca466d'],

    ['#00b543', '#ffccaa', '#ff6c24', '#1e839d'],
    ['#742f29', '#ffccaa', '#ffec27', '#ff6c24'],
    ['#ff6c24', '#ffccaa', '#c2c3c7', '#413830'],
    ['#413830', '#ffccaa', '#be1250', '#422136'],
    ['#413830', '#ffccaa', '#ff6c24', '#8f3f17'],
    ['#413830', '#ffccaa', '#ff6c24', '#8f3f17'],
    ['#742f29', '#ffccaa', '#a8e72e', '#413830']

];
//arrays to speed up the pix by pix recoloring
var REF_COLORS_RGB = [];
var AVATAR_PALETTES_RGB = [];

//GUI
var LABEL_NEUTRAL_COLOR = "#FFFFFF";
var UI_BG = "#000000";

//global vars! I love global vars ///////////////////

//preloaded images
var walkSheets = [];
var emoteSheets = [];
//the big spritesheet
var allSheets;

//current room bg and areas
var bg;
var areas;

//command quequed for when the destination is reached
var nextCommand;

//my client only, rollover info
var areaLabel;
var labelColor;
var rolledSprite;

//GUI
//shows up at the beginning, centered, overlapped to room in lurk mode
var logo;
var logoCounter;

//when pointing on walkable area shows this
var walkIcon;

var menuBg, arrowButton;
//p5 play group, basically an arraylist of sprites
var menuGroup;
//p5 play animation
var avatarPreview;

//long text variables, message that shows on my client only (written text, narration, god messages...)
var longText = "";
var longTextLines;
var longTextAlign;
var longTextLink = "";
var LONG_TEXT_BOX_W = 220;
var LONG_TEXT_PADDING = 4;

//To show when banned or disconnected, disables the client on black screen
var errorMessage = "";

//speech bubbles
var bubbles = [];

//when the nickName is "" the player is invisible inactive: lurk mode
//for admins it contains the password so it shouldn't be shared
var nickName = "";

//these are indexes of arrays not images or colors
var currentAvatar;
var currentColor;

//this object keeps track of all the current players in the room, coordinates, bodies and color
var players;
//a reference to my player
var me;
//the canvas object
var canvas;
//draw loop state: user(name), avatar selection or game
var screen;

//set the time at the beginning of the computing era, the SEVENTIES!
var lastMessage = 0;

//sparkles p5 play animations
var appearEffect, disappearEffect;

//sounds
var blips;
var appearSound, disappearSound;

//if the server restarts the clients reconnects seamlessly
//don't do first log kind of things
var firstLog = true;

//async check
var dataLoaded = false;
var gameStarted = false;


/*
Things are quite asynchronous here. This is the startup sequence:

* preload() preload general assets - avatars, icons etc
* setup() assets loaded - slice, create canvas and create a temporary socket that only listens to DATA
* wait for settings and room data from the server 
* data is received, ROOM object exists BUT its damn images aren't loaded yet
* check the loading images in draw() until they all look like something
* when room images are loaded go to setupGame() and to lurking mode or fast track with a random username due to QUICK_LOGIN
    In lurking mode (username "") you can see everybody, you are invisible and can't do anything
    BUT you are technically in the room
* when click on the "join" button go to the username and avatar selection screens, back and forth for name validation
* when name is approved the player joins ("playerJoined" event) the room again with the real name and avatar
* upon room join all clients send their intro information and the scene is populated
* changing room is handled in the same way with "playerJoined"
* if server restarts the assets and room data is kept on the clients and that's also a connect > playerJoined sequence
*/



//setup is called when all the assets have been loaded
function preload() {

    document.body.style.backgroundColor = PAGE_COLOR;

    //avatar spritesheets are programmatically tinted so they need to be pimages before being loaded as spritesheets

    //METHOD 1:
    //avatar spritesheets are numbered and sequential, one per animation like straight outta Piskel
    //it's a lot of requests for a bunch of tiny images
    /*
    for (var i = 0; i < AVATARS; i++) {
        walkSheets[i] = loadImage(ASSETS_FOLDER + "character" + i + ".png");
    }

    for (var i = 0; i < AVATARS; i++) {
        emoteSheets[i] = loadImage(ASSETS_FOLDER + "character" + i + "-emote.png");
    }
    */

    //METHOD 2:
    //all spritesheets are packed in one long file, preloaded and split on setup
    //packed with this tool  https://www.codeandweb.com/free-sprite-sheet-packer
    //layout horizontal, 0 padding (double check that)


    allSheets = loadImage(ASSETS_FOLDER + ALL_AVATARS_SHEET);

    REF_COLORS_RGB = [];
    //to make the palette swap faster I save colors as arrays 
    for (var i = 0; i < REF_COLORS.length; i++) {
        var rc = REF_COLORS[i];
        var r = red(rc);
        var g = green(rc);
        var b = blue(rc);
        REF_COLORS_RGB[i] = [r, g, b];
    }

    AVATAR_PALETTES_RGB = [];
    //to make the palette swap faster I save colors as arrays 
    for (var i = 0; i < AVATAR_PALETTES.length; i++) {

        AVATAR_PALETTES_RGB[i] = [];

        //each color
        for (var j = 0; j < AVATAR_PALETTES[i].length; j++) {

            var rc = AVATAR_PALETTES[i][j];
            var r = red(rc);
            var g = green(rc);
            var b = blue(rc);
            AVATAR_PALETTES_RGB[i][j] = [r, g, b];
        }
    }

    menuBg = loadImage(ASSETS_FOLDER + MENU_BG_FILE);
    arrowButton = loadImage(ASSETS_FOLDER + "arrowButton.png");

    var logoSheet = loadSpriteSheet(ASSETS_FOLDER + LOGO_FILE, 66, 82, 4);
    logo = loadAnimation(logoSheet);
    logo.frameDelay = 10;

    var walkIconSheet = loadSpriteSheet(ASSETS_FOLDER + "walkIcon.png", 6, 8, 4);
    walkIcon = loadAnimation(walkIconSheet);
    walkIcon.frameDelay = 8;

    var appearEffectSheet = loadSpriteSheet(ASSETS_FOLDER + "appearEffect.png", 10, 18, 10);
    appearEffect = loadAnimation(appearEffectSheet);
    appearEffect.frameDelay = 4;
    appearEffect.looping = false;

    var disappearEffectSheet = loadSpriteSheet(ASSETS_FOLDER + "disappearEffect.png", 10, 18, 10);
    disappearEffect = loadAnimation(disappearEffectSheet);
    //disappearEffect.frameDelay = 4;
    disappearEffect.looping = false;

    font = loadFont(FONT_FILE);

    //load sound
    soundFormats('mp3', 'ogg');

    blips = [];
    for (var i = 0; i <= 5; i++) {
        var blip = loadSound(ASSETS_FOLDER + "blip" + i);
        blip.playMode('sustain');
        blip.setVolume(0.3);
        blips.push(blip);
    }

    appearSound = loadSound(ASSETS_FOLDER + "appear");
    appearSound.playMode('sustain');
    appearSound.setVolume(0.3);

    disappearSound = loadSound(ASSETS_FOLDER + "disappear");
    disappearSound.playMode('sustain');
    disappearSound.setVolume(0.3);


}


//this is called when the assets are loaded
function setup() {

    //create a canvas
    canvas = createCanvas(WIDTH, HEIGHT);
    //accept only the clicks on the canvas (not the ones on the UI)
    canvas.mousePressed(canvasPressed);
    canvas.mouseReleased(canvasReleased);
    canvas.mouseOut(outOfCanvas);
    //by default the canvas is attached to the bottom, i want it in the container
    canvas.parent('canvas-container');

    //adapt it to the browser window 
    scaleCanvas();

    //since my avatars are pixelated and scaled I kill the antialiasing on canvas
    noSmooth();

    //the page link below
    showInfo();

    //if using a single spritesheet slice it up
    if (walkSheets.length == 0 && allSheets != null) {

        var sliceX = 0;


        for (var i = 0; i < AVATARS; i++) {

            var walkSheet = createImage(AVATAR_W * WALK_F, AVATAR_H);
            walkSheet.copy(allSheets, sliceX, 0, AVATAR_W * WALK_F, AVATAR_H, 0, 0, AVATAR_W * WALK_F, AVATAR_H);
            walkSheets[i] = walkSheet;

            sliceX += AVATAR_W * WALK_F;

            var emoteSheet = createImage(AVATAR_W * EMOTE_F, AVATAR_H);
            emoteSheet.copy(allSheets, sliceX, 0, AVATAR_W * EMOTE_F, AVATAR_H, 0, 0, AVATAR_W * EMOTE_F, AVATAR_H);
            emoteSheets[i] = emoteSheet;

            sliceX += AVATAR_W * EMOTE_F;

        }
    }

    //I create a socket but I wait to assign all the functions before opening a connection
    socket = io({
        autoConnect: false
    });

    //server sends out the response to the name submission, only if lurk mode is disabled
    //it's in a separate function because it is shared between the first provisional connection 
    //and the "real" one later
    socket.on('nameValidation', nameValidationCallBack);

    //first server message with version and game data
    socket.on('serverWelcome',
        function (serverVersion, DATA) {
            if (socket.id) {
                console.log("Welcome! Server version: " + serverVersion + " - client version " + VERSION);

                //this is before canvas so I have to html brutally
                if (serverVersion != VERSION) {
                    errorMessage = "VERSION MISMATCH: PLEASE HARD REFRESH";
                    document.body.innerHTML = errorMessage;
                    socket.disconnect();
                }

                ROOMS = DATA.ROOMS;
                SETTINGS = DATA.SETTINGS;

                //load room assets, should be in preload but
                for (var roomId in ROOMS) {
                    if (ROOMS.hasOwnProperty(roomId)) {
                        var room = ROOMS[roomId];

                        if (room.bg != null)
                            room.bgGraphics = loadImage(ASSETS_FOLDER + room.bg);
                        else
                            console.log("WARNING: room " + roomId + " has no background graphics");

                        if (room.area != null)
                            room.areaGraphics = loadImage(ASSETS_FOLDER + room.area);
                        else
                            console.log("WARNING: room " + roomId + " has no area graphics");

                        //preload sprites if any
                        if (ROOMS[roomId].sprites != null)
                            for (var i = 0; i < ROOMS[roomId].sprites.length; i++) {
                                var spr = ROOMS[roomId].sprites[i];
                                spr.spriteGraphics = loadImage(ASSETS_FOLDER + spr.file);
                            }
                    }
                }

                print(">>> DATA RECEIVED " + (DATA.ROOMS != null));
            }
        }
    );

    //I can now open it
    socket.open();
}


function draw() {

    //this is like a second janky preload: I'm waiting for data from the server and for the images linked within it to load
    if (!dataLoaded && ROOMS != null) {
        //loaded except when it's NOT
        dataLoaded = true;

        //load room assets, should be in preload but
        for (var roomId in ROOMS) {
            var room = ROOMS[roomId];

            if (room.bgGraphics != null)
                if (room.bgGraphics.width == 1)
                    dataLoaded = false;

            if (room.areaGraphics != null)
                if (room.areaGraphics.width == 1)
                    dataLoaded = false;
        }

        if (dataLoaded)
            print("Room data and assets loaded");
    }

    if (dataLoaded && !gameStarted) {
        setupGame();
    }

    //this is the actual game loop
    if (gameStarted) {
        update();
    }
}

//called once upon data and image load
function setupGame() {

    gameStarted = true;

    //starting from default or from location on the url?
    if (ROOM_LINK) {
        //url parameters can pass the room so a room can be linked
        const urlParams = new URLSearchParams(window.location.search);
        const urlRoom = urlParams.get('room')

        if (urlRoom != null) {
            if (ROOMS[urlRoom] != null)
                SETTINGS.defaultRoom = urlRoom;
        }
    }


    if (QUICK_LOGIN) {
        //assign random name and avatar and get to the game
        nickName = "user" + floor(random(0, 1000));
        currentColor = floor(random(0, AVATAR_PALETTES.length));
        currentAvatar = floor(random(0, walkSheets.length));
        newGame();
    }
    else if (!LURK_MODE) {

        //paint background
        image(menuBg, 0, 0, WIDTH, HEIGHT);
        hideJoin();
        showUser();

        var field = document.getElementById("lobby-field");
        field.focus();

    }
    else {
        //nickname blank means invisible - lurk mode
        nickName = "";
        currentColor = floor(random(0, AVATAR_PALETTES.length));
        currentAvatar = floor(random(0, walkSheets.length));
        newGame();
    }
}



function newGame() {

    screen = "game";
    nextCommand = null;
    areaLabel = "";
    rolledSprite = null;
    logoCounter = 0;

    hideUser();
    hideAvatar();

    if (menuGroup != null)
        menuGroup.removeSprites();

    if (nickName == "") {
        showJoin();
    }
    else {
        showChat();
    }

    //this is not super elegant but I create another socket for the actual game
    //because I've got the data from the server and I don't want to reinitiate everything 
    //if the server restarts
    if (socket != null) {
        //console.log("Lurker joins " + socket.id);
        socket.disconnect();
        socket = null;
    }

    //I create a socket but I wait to assign all the functions before opening a connection
    socket = io({
        autoConnect: false
    });

    //paint background
    background(UI_BG);

    //initialize players as object
    players = {};


    //all functions are in a try/catch to prevent a hacked client from sending garbage that crashes other clients 

    //if the client detects a server connection it may be because the server restarted 
    //in that case the clients reconnect automatically and are assigned new ids so I have to clear
    //the previous player list to avoid ghosts
    //as long as the clients are open they should not lose their avatar and position even if the server is down
    socket.on('connect', function () {

        try {
            players = {};

            //ayay: connection lost while setting up character, just force a refresh
            if (screen == "avatar" || screen == "user") {
                screen = "error";
                errorMessage = "SERVER RESTARTED: PLEASE REFRESH";
                socket.disconnect();
            }


            bubbles = [];

            //first time
            if (me == null) {
                //join offscreen if missing parameters?
                var sx = -100;
                var sy = -100;

                if (ROOMS[SETTINGS.defaultRoom].spawn == null) {
                    console.log("WARNING: " + SETTINGS.defaultRoom + " has no spawn area");
                }
                else {
                    spawnZone = ROOMS[SETTINGS.defaultRoom].spawn;
                    //randomize position if it's the first time
                    var sx = round(random(spawnZone[0] * ASSET_SCALE, spawnZone[2] * ASSET_SCALE));
                    var sy = round(random(spawnZone[1] * ASSET_SCALE, spawnZone[3] * ASSET_SCALE));
                }

                //send the server my name and avatar
                socket.emit('join', { nickName: nickName, color: currentColor, avatar: currentAvatar, room: SETTINGS.defaultRoom, x: sx, y: sy });
            }
            else {
                socket.emit('join', { nickName: nickName, color: currentColor, avatar: currentAvatar, room: me.room, x: me.x, y: me.y });
            }
        } catch (e) {
            console.log("Error on connect");
            console.error(e);
        }

    });//end connect


    //when somebody joins the game create a new player
    socket.on('playerJoined',
        function (p) {
            try {
                //console.log("new player in the room " + p.room + " " + p.id + " " + p.x + " " + p.y + " color " + p.color);

                //stop moving
                p.destinationX = p.x;
                p.destinationY = p.y;

                //if it's me///////////
                if (socket.id == p.id) {

                    //the location appears in the url
                    if (ROOM_LINK && ROOMS[p.room] != null)
                        window.history.replaceState(null, null, "?room=" + p.room);

                    players = {};
                    bubbles = [];

                    deleteAllSprites();

                    players[p.id] = me = new Player(p);

                    /*
                    me.sprite.mouseActive = false;
                    me.sprite.onMouseOver = function () { };
                    me.sprite.onMouseOut = function () { };
                    */

                    //click on me = emote
                    me.sprite.onMousePressed = function () { socket.emit('emote', { room: me.room, em: true }); };
                    me.sprite.onMouseReleased = function () { socket.emit('emote', { room: me.room, em: false }); };


                    //if a page background is specified change it
                    if (ROOMS[p.room].pageBg != null)
                        document.body.style.backgroundColor = ROOMS[p.room].pageBg;
                    else
                        document.body.style.backgroundColor = PAGE_COLOR;

                    //load level background

                    if (ROOMS[p.room].bgGraphics != null) {
                        //can be static or spreadsheet
                        var bgg = ROOMS[p.room].bgGraphics;

                        //find frame number
                        var f = 1;
                        if (ROOMS[p.room].frames != null)
                            f = ROOMS[p.room].frames;

                        var ss = loadSpriteSheet(bgg, WIDTH, HEIGHT, f);
                        bg = loadAnimation(ss);

                        if (ROOMS[p.room].frameDelay != null) {
                            bg.frameDelay = ROOMS[p.room].frameDelay;
                        }
                    }

                    if (ROOMS[p.room].avatarScale == null)
                        ROOMS[p.room].avatarScale = 2;

                    areas = ROOMS[p.room].areaGraphics;
                    if (areas == null)
                        print("ERROR: no area assigned to  " + p.room);

                    //create sprites
                    if (ROOMS[p.room].sprites != null)
                        for (var i = 0; i < ROOMS[p.room].sprites.length; i++) {
                            var sprite = ROOMS[p.room].sprites[i];

                            var f = 1;

                            if (sprite.frames != null)
                                f = sprite.frames;

                            var sw = floor(sprite.spriteGraphics.width / f);
                            var sh = sprite.spriteGraphics.height;

                            var ss = loadSpriteSheet(sprite.spriteGraphics, sw, sh, f);
                            var animation = loadAnimation(ss);

                            if (sprite.frameDelay != null)
                                animation.frameDelay = sprite.frameDelay;


                            //the position is the bottom left
                            var newSprite = createSprite(sprite.position[0] * ASSET_SCALE + floor(sw / 2), sprite.position[1] * ASSET_SCALE + floor(sh / 2));
                            newSprite.addAnimation("default", animation);

                            //if label make it rollover reactive
                            newSprite.label = sprite.label;
                            if (sprite.label != null) {

                                newSprite.onMouseOver = function () {
                                    rolledSprite = this;
                                };

                                newSprite.onMouseOut = function () {
                                    if (rolledSprite == this)
                                        rolledSprite = null;
                                };
                            }
                            //if command, make it interactive like an area
                            if (sprite.command != null) {
                                newSprite.command = sprite.command;

                                newSprite.onMouseReleased = function () {
                                    if (rolledSprite == this)
                                        moveToCommand(this.command);
                                };
                            }

                        }


                }
                else {
                    //
                    players[p.id] = new Player(p);

                    //console.log("I shall introduce myself to " + p.id);

                    //If I'm not the new player send an introduction to the new player
                    socket.emit('intro', p.id, {
                        id: socket.id,
                        nickName: me.nickName,
                        color: me.color,
                        avatar: me.avatar,
                        room: me.room,
                        x: me.x,
                        y: me.y,
                        destinationX: me.destinationX,
                        destinationY: me.destinationY
                    });
                }

                if (p.new && p.nickName != "" && firstLog) {
                    var spark = createSprite(p.x, p.y - AVATAR_H + 1);
                    spark.addAnimation("spark", appearEffect);
                    spark.scale = ASSET_SCALE;
                    spark.life = 60;
                    if (SOUND)
                        appearSound.play();

                    if (p.id == me.id) {
                        longText = SETTINGS.INTRO_TEXT;
                        longTextLines = 1;
                        longTextAlign = "center";//or center
                    }

                    firstLog = false;
                }

                console.log("There are now " + Object.keys(players).length + " players in this room");

            }
            catch (e) {
                console.log("Error on playerJoined");
                console.error(e);
            }
        }
    );

    //each existing player sends me an object with their parameters
    socket.on('onIntro',
        function (p) {
            try {
                //console.log("Hello newcomer I'm " + p.nickName + " " + p.id);
                players[p.id] = new Player(p);
                console.log("There are now " + Object.keys(players).length + " players in this room");
            } catch (e) {
                console.log("Error on onIntro");
                console.error(e);
            }
        }
    );


    //when somebody clicks to move, update the destination (not the position)
    socket.on('playerMoved',
        function (p) {
            try {
                //console.log(p.id + " moves to: " + p.destinationX + " " + p.destinationY);

                //make sure the player exists
                if (players.hasOwnProperty(p.id)) {

                    players[p.id].destinationX = p.destinationX;
                    players[p.id].destinationY = p.destinationY;
                }
            } catch (e) {
                console.log("Error on playerMoved");
                console.error(e);
            }
        });


    //when somebody disconnects/leaves the room
    socket.on('playerLeft',
        function (p) {
            try {
                console.log("Player " + p.id + " left");

                if (players[p.id] != null) {
                    if (p.disconnect && players[p.id].nickName != "") {
                        var spark = createSprite(players[p.id].x, players[p.id].y - AVATAR_H + 1);
                        spark.addAnimation("spark", disappearEffect);
                        spark.scale = ASSET_SCALE;
                        spark.life = 60;
                        if (SOUND)
                            disappearSound.play();
                    }

                    if (players[p.id].sprite != null) {
                        if (players[p.id].sprite == rolledSprite) {
                            rolledSprite = null;
                        }

                        removeSprite(players[p.id].sprite);
                    }


                }

                delete players[p.id];
                console.log("There are now " + Object.keys(players).length + " players in this room");

            } catch (e) {
                console.log("Error on playerLeft");
                console.error(e);
            }
        }
    );



    //when somebody talks
    socket.on('playerTalked',
        function (p) {
            try {

                //console.log("new message from " + p.id + ": " + p.message + " color " + p.color);

                //make sure the player exists in the client
                if (players.hasOwnProperty(p.id)) {

                    if (!players[p.id].ignore) {
                        //minimum y of speech bubbles depends on room, typically higher half
                        var offY = ROOMS[me.room].bubblesY * ASSET_SCALE;
                        var newBubble = new Bubble(p.id, p.message, p.color, p.x, p.y, offY);

                        pushBubbles(newBubble);
                        bubbles.push(newBubble);

                        if (SOUND) {
                            blips[floor(random(0, blips.length))].play();
                        }
                    }
                }
            } catch (e) {
                console.log("Error on playerTalked");
                console.error(e);
            }
        }
    );



    //displays a message upon connection refusal (server full etc)
    //this is an end state and requires a refresh or a join
    socket.on('errorMessage',
        function (msg) {
            if (socket.id) {
                screen = "error";
                errorMessage = msg;
                hideChat();
                hideUser();
                hideAvatar();
                hideJoin();
            }
        }
    );



    //when a server message arrives
    socket.on('godMessage',
        function (msg) {
            if (socket.id) {

                longText = msg;
                longTextLines = -1;
                longTextAlign = "center";
                longTextLink = "";
            }
        }
    );

    //when a server message arrives
    socket.on('playerEmoted',
        function (id, em) {
            try {
                if (players[id] != null) {
                    if (players[id].sprite != null) {

                        if (em) {
                            players[id].sprite.changeAnimation("emote");
                            players[id].sprite.animation.changeFrame(1);
                            players[id].sprite.animation.stop();
                        }
                        else {
                            players[id].sprite.changeAnimation("emote");
                            players[id].sprite.animation.changeFrame(0);
                            players[id].sprite.animation.stop();
                        }
                    }


                }

            } catch (e) {
                console.log("Error on playerTalked");
                console.error(e);
            }
        });


    //server sends out the response to the name submission, only if lurk mode is enabled
    //it's in a separate function because it is shared between the first provisional connection 
    //and the "real" one later
    socket.on('nameValidation', nameValidationCallBack);


    //when a server message arrives
    socket.on('popup',
        function (msg) {
            if (socket.id) {
                alert(msg);
            }
        }
    );

    //player in the room is AFK
    socket.on('playerBlurred', function (id) {

        if (players[id] != null)
            players[id].sprite.transparent = true;
    });

    //player in the room is AFK
    socket.on('playerFocused', function (id) {
        if (players[id] != null)
            players[id].sprite.transparent = false;

    });

    //when the client realizes it's being disconnected
    socket.on('disconnect', function () {
        //console.log("OH NO");
    });

    //server forces refresh (on disconnect or to force load a new version of the client)
    socket.on('refresh', function () {
        socket.disconnect();
        location.reload(true);
    });

    //I can now open it

    socket.open();

}



//this p5 function is called continuously 60 times per second by default
function update() {

    if (screen == "user") {
        image(menuBg, 0, 0, WIDTH, HEIGHT);
    }
    //renders the avatar selection screen which can be fully within the canvas
    else if (screen == "avatar") {
        image(menuBg, 0, 0, WIDTH, HEIGHT);

        textFont(font, FONT_SIZE * 2);
        textAlign(CENTER, BASELINE);
        fill(0);
        text("Body", 24 * ASSET_SCALE, 44 * ASSET_SCALE);
        text("Color", 105 * ASSET_SCALE, 44 * ASSET_SCALE);

        text("Choose your avatar", 64 * ASSET_SCALE, 18 * ASSET_SCALE);

        menuGroup.draw();

    }
    else if (screen == "error") {
        //end state, displays a message in full screen
        textFont(font, FONT_SIZE);
        textAlign(CENTER, CENTER);
        fill(UI_BG);
        rect(0, 0, WIDTH, HEIGHT);
        fill(LABEL_NEUTRAL_COLOR);

        text(errorMessage, floor(WIDTH / 8), floor(HEIGHT / 8), WIDTH - floor(WIDTH / 4), HEIGHT - floor(HEIGHT / 4) + 1);
    }
    else if (screen == "game") {
        //draw a background
        background(UI_BG);
        imageMode(CORNER);

        if (bg != null) {
            animation(bg, floor(WIDTH / 2), floor(HEIGHT / 2));
        }

        textFont(font, FONT_SIZE);

        //iterate through the players
        for (var playerId in players) {
            if (players.hasOwnProperty(playerId)) {

                var p = players[playerId];

                var prevX, prevY;

                //make sure the coordinates are non null since I may have created a player
                //but I may still be waiting for the first update
                if (p.x != null && p.y != null) {
                    //save in case of undo
                    prevX = p.x;
                    prevY = p.y;

                    //position and destination are different, move
                    if (p.x != p.destinationX || p.y != p.destinationY) {

                        //a series of vector operations to move toward a point at a linear speed

                        // create vectors for position and dest.
                        var destination = createVector(p.destinationX, p.destinationY);
                        var position = createVector(p.x, p.y);

                        // Calculate the distance between your destination and position
                        var distance = destination.dist(position);

                        // this is where you actually calculate the direction
                        // of your target towards your rect. subtraction dx-px, dy-py.
                        var delta = destination.sub(position);

                        // then you're going to normalize that value
                        // (normalize sets the length of the vector to 1)
                        delta.normalize();

                        // then you can multiply that vector by the desired speed
                        var increment = delta.mult(SPEED * deltaTime / 1000);

                        /*
                        IMPORTANT
                        deltaTime The system variable deltaTime contains the time difference between 
                        the beginning of the previous frame and the beginning of the current frame in milliseconds.
                        the speed is not based on the client framerate which can be variable but on the actual time that passes
                        between frames.
                        */

                        //increment the position
                        position.add(increment);

                        //calculate new distance
                        var newDistance = position.dist(createVector(p.destinationX, p.destinationY));

                        //if I got farther than I was originally, I overshot so set position to destination
                        if (newDistance > distance) {

                            p.x = p.destinationX;
                            p.y = p.destinationY;
                            p.stopWalkingAnimation();

                        }
                        else {
                            //this system is not pathfinding but it makes characters walk "around" corners instead of getting stuck

                            //test new position for obstacle repeat for both sides
                            var obs = isObstacle(position.x - AVATAR_W / 2, position.y, p.room, areas);
                            var obs2 = isObstacle(position.x + AVATAR_W / 2, position.y, p.room, areas);

                            if (!obs && !obs2) {
                                p.x = position.x;
                                p.y = position.y;
                                p.playWalkingAnimation();
                            }
                            //if obstacle test only x movement
                            else {

                                var obsX = isObstacle(position.x - AVATAR_W / 2, p.y, p.room, areas);
                                var obsX2 = isObstacle(position.x + AVATAR_W / 2, p.y, p.room, areas);

                                //if not obstacle move only horizontally at full speed
                                if (!obsX && !obsX2 && abs(delta.x) > 0.1) {

                                    p.x += SPEED * deltaTime / 1000 * (p.x > position.x) ? -1 : 1;
                                    p.playWalkingAnimation();

                                }
                                else {
                                    //if obs on y test the y
                                    var obsY = isObstacle(p.x - AVATAR_W / 2, position.y, p.room, areas);
                                    var obsY2 = isObstacle(p.x + AVATAR_W / 2, position.y, p.room, areas);

                                    if (!obsY && !obsY2 && abs(delta.y) > 0.1) {

                                        p.y += SPEED * deltaTime / 1000 * (p.y > position.y) ? -1 : 1;
                                        p.playWalkingAnimation();

                                    }
                                    else {
                                        //if not complete block
                                        p.destinationX = p.x;
                                        p.destinationY = p.y;
                                        p.stopWalkingAnimation();
                                        //cancel command if me
                                        if (p == me) {
                                            nextCommand = null;

                                            //stop if moving
                                            socket.emit('move', { x: me.x, y: me.y, room: me.room, destinationX: me.x, destinationY: me.y });
                                        }
                                    }

                                }
                            }

                            //change dir
                            if (prevX != p.x) {
                                p.dir = (prevX > p.x) ? -1 : 1;
                                p.sprite.mirrorX(p.dir);
                            }
                        }

                    }
                    else {

                        p.stopWalkingAnimation();
                    }

                    //The clients should never take a player to an illegal place (transparent area pixels or non walkable areas)
                    //but occasionally a dude will open the developer console and change the coordinates to make his avatar fly around
                    //Good for him! Let him have fun in his own little client! 
                    //All the others players will just stop displaying and hearing him
                    //because I really don't want to enforce this on the server side
                    var illegal = isObstacle(p.x, p.y, p.room, areas);
                    if (illegal) {
                        //print(">>>>>>>>>>>" + p.id + " is in an illegal position<<<<<<<<<<<<<<<");
                        p.ignore = true;
                        if (p.sprite != null)
                            p.sprite.ignore = true;
                    }
                    else {
                        p.ignore = false;
                        if (p.sprite != null)
                            p.sprite.ignore = false;
                    }

                    //////this part is only triggered by ME
                    if (p == me) {
                        //reached destination, execute action
                        if (me.x == me.destinationX && me.y == me.destinationY && nextCommand != null) {
                            executeCommand(nextCommand);
                            nextCommand = null;
                        }

                    }

                    p.updatePosition();

                }

            }
        }//player update cycle


        //set the existing sprites' depths in relation to their position
        for (var i = 0; i < allSprites.length; i++) {
            //sprites on the bottom will be drawn first
            allSprites[i].depth = allSprites[i].position.y + allSprites[i].height / 2;

        }

        //
        drawSprites();


        //GUI
        if (nickName != "" && rolledSprite == null && areaLabel == "")
            animation(walkIcon, floor(mouseX + 6), floor(mouseY - 6));

        //draw all the speech bubbles lines first only if the players have not moves since speaking
        for (var i = 0; i < bubbles.length; i++) {
            var b = bubbles[i];
            var speaker = players[bubbles[i].pid];
            if (speaker != null && !b.orphan) {
                if (round(speaker.x) == b.px && round(speaker.y) == b.py) {
                    var s = ROOMS[speaker.room].avatarScale;

                    strokeWeight(s);
                    stroke(UI_BG);
                    strokeCap(SQUARE);
                    line(floor(speaker.x), floor(speaker.y - AVATAR_H * s - BUBBLE_MARGIN), floor(speaker.x), floor(b.y));
                }
                else {
                    //once it moves break the line
                    b.orphan = true;
                }
            }
        }



        //draw speech bubbles
        for (var i = 0; i < bubbles.length; i++) {
            bubbles[i].update();
        }
        //delete the expired ones
        for (var i = 0; i < bubbles.length; i++) {
            if (bubbles[i].counter < 0) {
                bubbles.splice(i, 1);
                i--; //decrement
            }
        }

        var label = areaLabel;
        var labelColor = LABEL_NEUTRAL_COLOR;

        //if lurking disable arealabel
        if (nickName == "")
            label = "";

        //player and sprites label override areas
        if (rolledSprite != null) {
            if (rolledSprite.label != null && rolledSprite.label != "") {
                label = rolledSprite.label + ((rolledSprite.transparent) ? "[AFK]" : "");
            }

            if (rolledSprite.labelColor != null) {
                labelColor = rolledSprite.labelColor;
            }
        }

        //by no circumstance show you name as label
        if (me != null)
            if (label == me.nickName)
                label = "";

        //draw rollover label
        if (label != "" && longText == "") {
            textFont(font, FONT_SIZE);
            textAlign(LEFT, BASELINE);
            var lw = textWidth(label);
            var lx = mouseX;

            if ((mouseX + lw + TEXT_PADDING * 2) > width) {
                lx = width - lw - TEXT_PADDING * 2;
            }
            fill(UI_BG);
            noStroke();
            rect(floor(lx), floor(mouseY - TEXT_H - TEXT_PADDING * 2), lw + TEXT_PADDING * 2 + 1, TEXT_H + TEXT_PADDING * 2 + 1);
            fill(labelColor);
            text(label, floor(lx + TEXT_PADDING) + 1, floor(mouseY - TEXT_PADDING));
        }

        //long text above everything
        if (longText != "" && nickName != "") {

            noStroke();
            textFont(font, FONT_SIZE);
            textLeading(TEXT_LEADING);

            //dramatic text on black
            if (longTextLines == -1) {

                if (longTextAlign == "left")
                    textAlign(LEFT, CENTER);
                else
                    textAlign(CENTER, CENTER);

                fill(UI_BG);
                rect(0, 0, width, height);
                fill(LABEL_NEUTRAL_COLOR);
                //-1 to avoid blurry glitch
                text(longText, LONG_TEXT_PADDING, LONG_TEXT_PADDING, width - LONG_TEXT_PADDING * 2, height - LONG_TEXT_PADDING * 2 - 1);
            }
            else {

                if (longTextAlign == "left")
                    textAlign(LEFT, BASELINE);
                else
                    textAlign(CENTER, BASELINE);

                //measuring text height requires a PhD so we
                //require the user to do trial and error and counting the lines
                //and use some magic numbers

                var tw = LONG_TEXT_BOX_W - LONG_TEXT_PADDING * 2;
                var th = longTextLines * TEXT_LEADING;


                //single line centered text
                if (longTextAlign == "center" && longTextLines == 1)
                    tw = textWidth(longText + " ");

                var rw = tw + LONG_TEXT_PADDING * 2;
                var rh = th + LONG_TEXT_PADDING * 2;

                fill(UI_BG);

                rect(floor(width / 2 - rw / 2), floor(height / 2 - rh / 2), floor(rw), floor(rh));
                //rect(20, 20, 100, 50);

                fill(LABEL_NEUTRAL_COLOR);
                text(longText, floor(width / 2 - tw / 2 + LONG_TEXT_PADDING - 1), floor(height / 2 - th / 2) + TEXT_LEADING - 3, floor(tw));
            }
        }//end long text

        if (nickName == "" && (logoCounter < LOGO_STAY || LOGO_STAY == -1)) {
            logoCounter += deltaTime;
            animation(logo, floor(width / 2), floor(height / 2));
        }

    }//end game


}



function windowResized() {
    scaleCanvas();
}


function scaleCanvas() {
    //landscape scale to height
    if (windowWidth > windowHeight) {
        canvasScale = windowHeight / WIDTH; //scale to W because I want to leave room for chat and instructions (squareish)
        canvas.style("width", WIDTH * canvasScale + "px");
        canvas.style("height", HEIGHT * canvasScale + "px");
    }
    else {
        canvasScale = windowWidth / WIDTH;
        canvas.style("width", WIDTH * canvasScale + "px");
        canvas.style("height", HEIGHT * canvasScale + "px");
    }

    var container = document.getElementById("canvas-container");
    container.setAttribute("style", "width:" + WIDTH * canvasScale + "px; height: " + HEIGHT * canvasScale + "px");

    var form = document.getElementById("interface");
    form.setAttribute("style", "width:" + WIDTH * canvasScale + "px;");

}

//I could do this in DOM (regular html and javascript elements) 
//but I want to show a canvas with html overlay
function avatarSelection() {
    menuGroup = new Group();
    screen = "avatar";

    //buttons
    var previousBody, nextBody, previousColor, nextColor;

    var ss = loadSpriteSheet(arrowButton, 28, 28, 3);
    var animation = loadAnimation(ss);

    //the position is the bottom left
    previousBody = createSprite(8 * ASSET_SCALE + 14, 50 * ASSET_SCALE + 14);
    previousBody.addAnimation("default", animation);
    previousBody.animation.stop();
    previousBody.mirrorX(-1);
    menuGroup.add(previousBody);

    nextBody = createSprite(24 * ASSET_SCALE + 14, 50 * ASSET_SCALE + 14);
    nextBody.addAnimation("default", animation);
    nextBody.animation.stop();
    menuGroup.add(nextBody);

    previousColor = createSprite(90 * ASSET_SCALE + 14, 50 * ASSET_SCALE + 14);
    previousColor.addAnimation("default", animation);
    previousColor.animation.stop();
    previousColor.mirrorX(-1);
    menuGroup.add(previousColor);

    nextColor = createSprite(106 * ASSET_SCALE + 14, 50 * ASSET_SCALE + 14);
    nextColor.addAnimation("default", animation);
    nextColor.animation.stop();
    menuGroup.add(nextColor);

    previousBody.onMouseOver = nextBody.onMouseOver = previousColor.onMouseOver = nextColor.onMouseOver = function () {
        this.animation.changeFrame(1);
    }
    previousBody.onMouseOut = nextBody.onMouseOut = previousColor.onMouseOut = nextColor.onMouseOut = function () {
        this.animation.changeFrame(0);
    }

    previousBody.onMousePressed = nextBody.onMousePressed = previousColor.onMousePressed = nextColor.onMousePressed = function () {
        this.animation.changeFrame(2);
    }

    previousBody.onMouseReleased = function () {
        currentAvatar -= 1;
        if (currentAvatar < 0)
            currentAvatar = AVATARS - 1;

        previewAvatar();
        this.animation.changeFrame(1);
    }

    nextBody.onMouseReleased = function () {
        currentAvatar += 1;
        if (currentAvatar >= AVATARS)
            currentAvatar = 0;

        previewAvatar();
        this.animation.changeFrame(1);
    }

    previousColor.onMouseReleased = function () {
        currentColor -= 1;
        if (currentColor < 0)
            currentColor = AVATAR_PALETTES.length - 1;

        previewAvatar();
        this.animation.changeFrame(1);
    }

    nextColor.onMouseReleased = function () {
        currentColor += 1;
        if (currentColor >= AVATAR_PALETTES.length)
            currentColor = 0;

        previewAvatar();
        this.animation.changeFrame(1);
    }

    //nextBody.onMouseReleased = previousColor.onMouseReleased = nextColor.onMouseReleased = function () {

    randomAvatar();
}



//copy the properties
function Player(p) {
    this.id = p.id;
    this.nickName = p.nickName;
    this.color = p.color;
    this.avatar = p.avatar;
    this.ignore = false;

    this.tint = color("#FFFFFF");

    if (ROOMS[p.room].tint != null) {
        this.tint = color(ROOMS[p.room].tint);
    }

    //tint the image
    this.avatarGraphics = paletteSwap(walkSheets[p.avatar], AVATAR_PALETTES_RGB[p.color], this.tint);
    this.spriteSheet = loadSpriteSheet(this.avatarGraphics, AVATAR_W, AVATAR_H, round(walkSheets[p.avatar].width / AVATAR_W));
    this.walkAnimation = loadAnimation(this.spriteSheet);
    //emote
    this.emoteGraphics = paletteSwap(emoteSheets[p.avatar], AVATAR_PALETTES_RGB[p.color], this.tint);
    this.emoteSheet = loadSpriteSheet(this.emoteGraphics, AVATAR_W, AVATAR_H, round(emoteSheets[p.avatar].width / AVATAR_W));
    this.emoteAnimation = loadAnimation(this.emoteSheet);
    this.emoteAnimation.frameDelay = 10;

    this.sprite = createSprite(100, 100);

    this.sprite.scale = ROOMS[p.room].avatarScale;

    this.sprite.addAnimation('walk', this.walkAnimation);
    this.sprite.addAnimation('emote', this.emoteAnimation);


    if (this.nickName == "")
        this.sprite.mouseActive = false;
    else
        this.sprite.mouseActive = true;

    //this.sprite.debug = true;

    //no parent in js? WHAAAAT?
    this.sprite.id = this.id;
    this.sprite.label = p.nickName;
    this.sprite.transparent = false;

    //save the dominant color for bubbles and rollover label
    var c = color(AVATAR_PALETTES[p.color][2]);

    if (brightness(c) > 30)
        this.sprite.labelColor = color(AVATAR_PALETTES[p.color][2]);
    else
        this.sprite.labelColor = color(AVATAR_PALETTES[p.color][3]);

    this.room = p.room;
    this.x = p.x;
    this.y = p.y;
    this.dir = 1;
    this.destinationX = p.destinationX;
    this.destinationY = p.destinationY;

    //lurkmode
    if (this.nickName == "")
        this.sprite.visible = false;

    this.stopWalkingAnimation = function () {

        if (this.sprite.getAnimationLabel() == "walk") {
            this.sprite.changeAnimation("emote");
            this.sprite.animation.changeFrame(0);
            this.sprite.animation.stop();
        }
    }

    this.playWalkingAnimation = function () {
        this.sprite.changeAnimation("walk");
        this.sprite.animation.play();
    }

    this.updatePosition = function () {
        this.sprite.position.x = round(this.x);
        this.sprite.position.y = round(this.y - AVATAR_H / 2 * this.sprite.scale);
    }

    if (this.nickName != "") {
        this.sprite.onMouseOver = function () {
            rolledSprite = this;
        };

        this.sprite.onMouseOut = function () {
            if (rolledSprite == this)
                rolledSprite = null;
        };

        this.sprite.onMousePressed = function () {

        };
    }
    //ugly as fuck but javascript made me do it
    this.sprite.originalDraw = this.sprite.draw;

    this.sprite.draw = function () {

        if (!this.ignore) {
            if (this.transparent)
                tint(255, 100);

            this.originalDraw();

            if (this.transparent)
                noTint();
        }
    }

    this.stopWalkingAnimation();
}


//they exist in a different container so kill them
function deleteAllSprites() {
    allSprites.removeSprites();
}

//speech bubble object
function Bubble(pid, message, col, x, y, oy) {
    //always starts at row zero

    this.row = 0;
    this.pid = pid;
    this.message = message;

    //the color is the 3rd color in the palette unless too dark, in that case it's the second
    var c = color(AVATAR_PALETTES[col][2]);

    if (brightness(c) > 30)
        this.color = color(AVATAR_PALETTES[col][2]);
    else
        this.color = color(AVATAR_PALETTES[col][3]);

    this.orphan = false;
    this.counter = BUBBLE_TIME;

    //to fix an inexplicable bug that mangles bitmap text on small textfields
    //I scale short messages
    this.fontScale = 1;
    if (message.length < 4) {
        this.fontScale = 2;
        this.message = this.message.toUpperCase();
    }


    textFont(font, FONT_SIZE * this.fontScale);
    textAlign(LEFT, BASELINE);
    this.tw = textWidth(this.message);
    //whole bubble with frame
    this.w = round(this.tw + TEXT_PADDING * 2);
    this.h = round(TEXT_H + TEXT_PADDING * 2 * this.fontScale);

    //save the original player position so I can render a line as long as they are not moving
    this.px = round(x);
    this.py = round(y);

    this.offY = oy;

    this.x = round(this.px - this.w / 2);
    if (this.x + this.w + BUBBLE_MARGIN > width) {
        this.x = width - this.w - BUBBLE_MARGIN
    }
    if (this.x < BUBBLE_MARGIN) {
        this.x = BUBBLE_MARGIN;
    }


    this.update = function () {
        this.counter -= deltaTime / 1000;

        noStroke();
        textFont(font, FONT_SIZE * this.fontScale);
        textAlign(LEFT, BASELINE);
        rectMode(CORNER);
        fill(UI_BG);
        this.y = this.offY - floor((TEXT_H + TEXT_PADDING * 2 + BUBBLE_MARGIN) * this.row);
        rect(this.x, this.y, this.w + 1, this.h);
        fill(this.color);
        text(this.message, floor(this.x + TEXT_PADDING) + 1, floor(this.h + this.y - TEXT_PADDING));

    }
}

//move bubbles up if necessary
function pushBubbles(b) {

    //go through bubbles
    for (var i = 0; i < bubbles.length; i++) {
        if (bubbles[i] != b && bubbles[i].row == b.row) {
            //this bubble is on the same row, will they overlap?
            if (b.x < (bubbles[i].x + bubbles[i].w) && (b.x + b.w) > bubbles[i].x) {
                bubbles[i].row++;
                pushBubbles(bubbles[i]);
                //if off screen mark for deletion
                if (bubbles[i].y - bubbles[i].h < 0)
                    bubbles[i].counter = -1;
            }

        }
    }
}



function isObstacle(x, y, room, a) {
    var obs = true;

    if (room != null && a != null) {

        var c1 = a.get(x, y);

        //if not white check if color is obstacle
        if (c1[0] != 255 || c1[1] != 255 || c1[2] != 255) {
            var cmd = getCommand(c1, room);

            if (cmd != null)
                if (cmd.obstacle != null)
                    obs = cmd.obstacle;
        }
        else
            obs = false; //if white

    }
    return obs;
}

//on mobile there is no rollover so allow a drag to count as mouse move
//the two functions SHOULD be mutually exclusive
//touchDown prevents duplicate event firings
var touchDown = false;

function mouseDragged() {
    mouseMoved();
}

function touchMoved() {
    mouseMoved();
    touchDown = true;
}

function touchEnded() {

    if (touchDown) {
        touchDown = false;
        canvasReleased();
    }
}

//rollover state
function mouseMoved() {

    if (walkIcon != null)
        walkIcon.visible = false;

    if (areas != null && me != null) {
        var c = areas.get(mouseX, mouseY);
        areaLabel = "";

        if (alpha(c) != 0 && me.room != null) {
            //walk icon?
            if (c[0] == 255 && c[1] == 255 && c[2] == 255) {
                if (walkIcon != null)
                    walkIcon.visible = true;
            }
            else {
                var command = getCommand(c, me.room);
                if (command != null)
                    if (command.label != null) {
                        areaLabel = command.label;
                    }
            }
        }

    }
}

//stop emoting
function canvasPressed() {

    //emote only if not walking
    if (nickName != "" && screen == "game" && mouseButton == RIGHT) {
        if (me.destinationX == me.x && me.destinationY == me.y)
            socket.emit('emote', { room: me.room, em: true });
    }
}


//when I click to move
function canvasReleased() {

    //print("CLICK " + mouseButton);

    if (screen == "error") {
    }
    else if (nickName != "" && screen == "game" && mouseButton == RIGHT) {
        if (me.destinationX == me.x && me.destinationY == me.y)
            socket.emit('emote', { room: me.room, em: false });
    }
    else if (nickName != "" && screen == "game" && mouseButton == LEFT) {
        //exit text
        if (longText != "" && longText != SETTINGS.INTRO_TEXT) {

            if (longTextLink != "")
                window.open(longTextLink, '_blank');

            longText = "";
            longTextLink = "";
        }
        else if (me != null) {

            longText = "";
            longTextLink = "";

            if (AFK) {
                AFK = false;
                if (socket != null)
                    socket.emit('focus', { room: me.room });
            }

            //clicked on person
            if (rolledSprite != null) {

                //click on player sprite attempt to move next to them
                if (rolledSprite.id != null) {
                    nextCommand = null;
                    var t = players[rolledSprite.id];
                    if (t != null && t != me) {
                        var d = (me.x < t.x) ? -(AVATAR_W * 2) : (AVATAR_W * 2);
                        socket.emit('move', { x: me.x, y: me.y, room: me.room, destinationX: t.x + d, destinationY: t.y });
                    }
                }
            }
            //check the area info
            else if (areas != null && me.room != null) {

                var c = areas.get(mouseX, mouseY);

                //if transparent or semitransparent do nothing
                if (alpha(c) != 255) {
                    //cancel command
                    nextCommand = null;
                    //stop if moving
                    if (me.x != me.destinationX && me.y != me.destinationY)
                        socket.emit('move', { x: me.x, y: me.y, room: me.room, destinationX: me.x, destinationY: me.y });
                }
                else if (c[0] == 255 && c[1] == 255 && c[2] == 255) {
                    //if white, generic walk stop command
                    nextCommand = null;

                    socket.emit('move', { x: me.x, y: me.y, room: me.room, destinationX: mouseX, destinationY: mouseY });
                }
                else {
                    //if something else check the commands
                    var command = getCommand(c, me.room);

                    //walk and executed when you arrive or stop
                    if (command != null)
                        moveToCommand(command);
                }
            }


        }
    }

}

//queue a command, move to the point
function moveToCommand(command) {

    nextCommand = command;

    //I need to change my destination locally before the message bouces back

    if (command.point != null) {
        me.destinationX = command.point[0] * ASSET_SCALE;
        me.destinationY = command.point[1] * ASSET_SCALE;
        socket.emit('move', { x: me.x, y: me.y, room: me.room, destinationX: command.point[0] * ASSET_SCALE, destinationY: command.point[1] * ASSET_SCALE });
    }
    else //just move where you clicked (area) 
    {
        me.destinationX = mouseX;
        me.destinationY = mouseY;
        socket.emit('move', { x: me.x, y: me.y, room: me.room, destinationX: mouseX, destinationY: mouseY });
    }

}

function getCommand(c, roomId) {
    try {
        //turn color into string
        var cString = color(c).toString('#rrggbb');//for com

        var areaColors = ROOMS[roomId].areaColors;
        var command;

        //go through properties
        for (var colorId in areaColors) {

            if (areaColors.hasOwnProperty(colorId)) {
                var aString = "#" + colorId.substr(1);

                if (aString == cString) {
                    //color found
                    command = areaColors[colorId];

                }
            }
        }
    }
    catch (e) {
        console.log("Get command error " + roomId + " color " + c);
        console.error(e);
    }

    return command;
}


function executeCommand(c) {
    areaLabel = "";
    //print("Executing command " + c.cmd);

    switch (c.cmd) {
        case "enter":
            var sx, sy;
            if (ROOMS[c.room] != null) {
                if (c.enterPoint != null) {
                    sx = c.enterPoint[0] * ASSET_SCALE;
                    sy = c.enterPoint[1] * ASSET_SCALE;
                    socket.emit('changeRoom', { from: me.room, to: c.room, x: sx, y: sy });
                }
                else if (ROOMS[c.room].spawn != null) {
                    spawnZone = ROOMS[c.room].spawn;
                    sx = round(random(spawnZone[0] * ASSET_SCALE, spawnZone[2] * ASSET_SCALE));
                    sy = round(random(spawnZone[1] * ASSET_SCALE, spawnZone[3] * ASSET_SCALE));
                    socket.emit('changeRoom', { from: me.room, to: c.room, x: sx, y: sy });
                }
                else {
                    console.log("ERROR: No spawn point or area set for " + c.room);
                }
            }
            break;


        case "text":
            if (c.txt != null) {

                longText = c.txt;
                if (c.lines != null)
                    longTextLines = c.lines;
                else
                    longTextLines = 1;

                if (c.align != null)
                    longTextAlign = c.align;
                else
                    longTextAlign = "center";//or center

                if (c.url == null)
                    longTextLink = "";
                else
                    longTextLink = c.url;

            }
            else
                print("Warning for text: make sure to specify arg as text")
            break;


    }

}

//For better user experience I automatically focus on the chat textfield upon pressing a key
function keyPressed() {
    if (screen == "game") {
        var field = document.getElementById("chatField");
        field.focus();
    }
    if (screen == "user") {
        var field = document.getElementById("lobby-field");
        field.focus();
    }
}

//when I hits send
function talk(msg) {

    if (AFK) {
        AFK = false;
        if (socket != null && me != null)
            socket.emit('focus', { room: me.room });
    }

    if (msg.replace(/\s/g, '') != "" && nickName != "") {

        var command = commandLine(msg)

        if (!command)
            socket.emit('talk', { message: msg, color: me.color, room: me.room, x: me.x, y: me.y });
    }
}

//client side command line
function commandLine(msg) {
    var found = false;

    switch (msg.toLowerCase()) {
        case "/sound off":
            SOUND = false;
            found = true;
            break;
        case "/sound on":
            SOUND = true;
            found = true;
            break;
        case "/afk":
            if (socket != null && me != null)
                socket.emit('blur', { room: me.room });

            AFK = true;
            found = true;
            break;

    }

    return found;
}

//called by the talk button in the html
function getTalkInput() {

    var time = new Date().getTime();

    if (time - lastMessage > SETTINGS.ANTI_SPAM) {

        // Selecting the input element and get its value 
        var inputVal = document.getElementById("chatField").value;
        //sending it to the talk function in sketch
        talk(inputVal);
        document.getElementById("chatField").value = "";
        //save time
        lastMessage = time;
    }
    //prevent page from refreshing (default form behavior)
    return false;
}

//called by the continue button in the html
function nameOk() {
    var v = document.getElementById("lobby-field").value;

    if (v != "") {
        nickName = v;

        //if socket !null the connection has been established ie lurk mode
        if (socket != null) {
            socket.emit('sendName', v);
        }

        //prevent page from refreshing on enter (default form behavior)
        return false;
    }
}

function nameValidationCallBack(code) {
    if (socket.id) {

        if (code == 0) {
            console.log("Username already taken");
            var e = document.getElementById("lobby-error");

            if (e != null)
                e.innerHTML = "Username already taken";
        }
        else if (code == 3) {

            var e = document.getElementById("lobby-error");

            if (e != null)
                e.innerHTML = "Sorry, only standard western characters are allowed";
        }
        else {

            hideUser();
            showAvatar();
            avatarSelection();
        }
    }
}

//draws a random avatar body in the center of the canvas
//colors it a random color
function randomAvatar() {
    currentColor = floor(random(0, AVATAR_PALETTES.length));
    currentAvatar = floor(random(0, AVATARS));
    previewAvatar();
}

function previewAvatar() {

    if (avatarPreview != null)
        removeSprite(avatarPreview);

    var aGraphics = paletteSwap(emoteSheets[currentAvatar], AVATAR_PALETTES_RGB[currentColor]);
    var aSS = loadSpriteSheet(aGraphics, AVATAR_W, AVATAR_H, round(emoteSheets[currentAvatar].width / AVATAR_W));
    var aAnim = loadAnimation(aSS);
    avatarPreview = createSprite(width / 2, height / 2);
    avatarPreview.scale = 4;
    avatarPreview.addAnimation("default", aAnim);
    avatarPreview.animation.frameDelay = 10;
    //avatarPreview.debug = true;
    //avatarPreview.animation.stop();
    menuGroup.add(avatarPreview);
}

function paletteSwap(ss, palette, t) {

    var tint = [255, 255, 255];

    if (t != null)
        tint = [red(t), green(t), blue(t)];

    var img = createImage(ss.width, ss.height);
    img.copy(ss, 0, 0, ss.width, ss.height, 0, 0, ss.width, ss.height);
    img.loadPixels();

    for (var i = 0; i < img.pixels.length; i += 4) {

        if (img.pixels[i + 3] == 255) {
            var found = false;

            //non transparent pix replace with palette
            for (var j = 0; j < REF_COLORS_RGB.length && !found; j++) {

                if (img.pixels[i] == REF_COLORS_RGB[j][0] && img.pixels[i + 1] == REF_COLORS_RGB[j][1] && img.pixels[i + 2] == REF_COLORS_RGB[j][2]) {
                    found = true;
                    img.pixels[i] = palette[j][0] * tint[0] / 255;
                    img.pixels[i + 1] = palette[j][1] * tint[1] / 255;
                    img.pixels[i + 2] = palette[j][2] * tint[2] / 255;
                }

            }
        }
    }
    img.updatePixels();

    return img;
}

function tintGraphics(img, colorString) {

    var c = color(colorString);
    let pg = createGraphics(img.width, img.height);
    pg.noSmooth();
    pg.tint(red(c), green(c), blue(c), 255);
    pg.image(img, 0, 0, img.width, img.height);
    //i need to convert it back to image in order to use it as spritesheet
    var img = createImage(pg.width, pg.height);
    img.copy(pg, 0, 0, pg.width, pg.height, 0, 0, pg.width, pg.height);

    return img;
}


//join from lurk mode
function joinGame() {

    deleteAllSprites();
    hideJoin();

    if (QUICK_LOGIN) {
        //assign random name and avatar and get to the game
        nickName = "user" + floor(random(0, 1000));
        currentColor = floor(random(0, AVATAR_PALETTES.length));
        currentAvatar = floor(random(0, emoteSheets.length));
        newGame();
    }
    else {
        screen = "user";
        showUser();
    }

}

function bodyOk() {

    newGame();
}

function keyTyped() {
    if (screen == "avatar") {
        if (keyCode === ENTER || keyCode === RETURN) {
            newGame();
        }
    }
}

function showUser() {
    var e = document.getElementById("user-form");
    if (e != null)
        e.style.display = "block";

    e = document.getElementById("lobby-container");
    if (e != null)
        e.style.display = "block";
}

function hideUser() {
    var e = document.getElementById("user-form");
    if (e != null)
        e.style.display = "none";

    e = document.getElementById("lobby-container");
    if (e != null)
        e.style.display = "none";
}

function showAvatar() {

    var e = document.getElementById("avatar-form");
    if (e != null) {
        e.style.display = "block";
    }

}

//don't show the link while the canvas loads
function showInfo() {

    var e = document.getElementById("info");
    if (e != null) {
        e.style.visibility = "visible";
    }

}

function hideAvatar() {

    var e = document.getElementById("avatar-form");
    if (e != null)
        e.style.display = "none";
}

function showJoin() {
    document.getElementById("join-form").style.display = "block";
}

function hideJoin() {
    document.getElementById("join-form").style.display = "none";
}

//enable the chat input when it's time
function showChat() {
    var e = document.getElementById("talk-form");

    if (e != null)
        e.style.display = "block";
}

function hideChat() {
    var e = document.getElementById("talk-form");
    if (e != null)
        e.style.display = "none";
}

function outOfCanvas() {
    areaLabel = "";
    rolledSprite = null;
}

//disable scroll on phone
function preventBehavior(e) {
    e.preventDefault();
};

document.addEventListener("touchmove", preventBehavior, { passive: false });

// Active
window.addEventListener('focus', function () {
    if (socket != null && me != null)
        socket.emit('focus', { room: me.room });
});

// Inactive
window.addEventListener('blur', function () {
    if (socket != null && me != null)
        socket.emit('blur', { room: me.room });
});

