//settings are just variables that can be sent to the client from the server
//they are either related to the rooms or shared with the server 
module.exports.SETTINGS = {
    //if not specified by the url where is the starting point
    defaultRoom: "exterior",
    //minimum time between talk messages enforced by both client and server
    ANTI_SPAM: 1000,
    //shows up at first non lurking login
    INTRO_TEXT: "Click/tap to move"
};

//miscellaneous assets to preload
module.exports.IMAGES = [
    ["sheepIdle", "sheep-idle.png"],
    ["sheepWalk", "sheep-walk.png"],
    ["wifeWalk", "wife.png"],
    ["wifeEmote", "wife-emote.png"],
    ["husbandWalk", "husband.png"],
    ["husbandEmote", "husband-emote.png"],
    ["child1Walk", "child1.png"],
    ["child1Emote", "child1-emote.png"],
    ["child2Walk", "child2.png"],
    ["child2Emote", "child2-emote.png"],
    ["child3Walk", "child3.png"],
    ["child3Emote", "child3-emote.png"],
    ["uncleWalk", "uncle.png"],
    ["uncleEmote", "uncle-emote.png"],
    ["milkmanWalk", "milkman.png"],
    ["milkmanEmote", "milkman-emote.png"],
    ["boyfriendWalk", "child-boyfriend.png"],
    ["boyfriendEmote", "child-boyfriend-emote.png"],
    ["flyWalk", "fly.png"],
    ["flyEmote", "fly-emote.png"]
];

//miscellaneous sounds to preload
module.exports.SOUNDS = [
    ["beat1", "beat1.ogg"], //credit https://www.youtube.com/watch?v=ugLVpZm69DE
    ["beat2", "beat2.ogg"], // credit https://www.youtube.com/watch?v=dPdoxIz0w24
    ["beat3", "beat3.ogg"], //credit https://www.youtube.com/watch?v=XShEWT4MwJs
    ["DJStop", "DJStop.mp3"]
];

module.exports.ROOMS = {

    //exterior
    exterior: {
        bg: "PrototypesAreasExterior1.png",
        frames: 2,
        frameDelay: 30,
        avatarScale: 2,
        pageBg: "#ab5236",
        area: "PrototypesAreasExterior1.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [14, 84, 119, 92],
        areaColors: {
            //h will be replaced by #
            hff77a8: { cmd: "enter", room: "sportRoom", label: "Sport Room", point: [100, 84], enterPoint: [104, 98], obstacle: false },
        }
    },

    //1
    sportRoom: {
    //the background graphics, it can be a spreadsheet
    bg: "prototype/200617_Prototypes_Areas_Gallery_1.png",
    //if spreadsheet frames
    frames: 2,
    //if animated, animation speed in refreshes (frame dependent)
    frameDelay: 30,
    //normally 2, avatars can be scaled to simulate camera distance
    avatarScale: 2,
    //a shade to tint the avatars to simulate light color, #FFFFFF normal
    tint: "#fa84af",
    //the html body color can be changed
    pageBg: "#6a2545",
    //minimum height for the speech bubbles
    bubblesY: 50,
    //if spawning directly in this room, top left and bottom right point defining the rectangular spawn area (random within it)
    spawn: [84, 92, 121, 99],
    //graphics with active areas Sierra Online adventures style
    //color coded as below, #FFFFFF is walkable, transparent is obstacle
    area: "prototype/200617_Prototypes_Areas_Gallery_1.png",
    //each color can trigger a command, the destination needs to be reached first
    //the "h" is replaced by # to identify color
    areaColors: {
        //enter command changes room
        //room: id of the room to enter
        //label: what to display on rollover
        //point: where to walk after click
        //enterPoint: where to spawn in the next room
        //obstacle: is the area walkable
        //door-yellow
        hffec27: { cmd: "enter", room: "foodRoom", label: "Food Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
        //go back - green
        h00e436: { cmd: "enter", room: "exterior", label: "Exterior", point: [63, 98], enterPoint: [116, 85], obstacle: false },
        //projects
        //text displays a text only on the client
        //txt: the text
        //align: center or left
        //lines: manual number of lines, p5 doesn't understand line breaks
        //url: uptionally open a page on click
        //left to right order
        hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
        hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
        hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
        h76d0ec: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
    },
},

    //2
    foodRoom: {
        bg: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        frames: 2,
        frameDelay: 30,
        avatarScale: 2,
        tint: "#fa84af",
        pageBg: "#6a2545",
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        areaColors: {
            //door-yellow
            hffec27: { cmd: "enter", room: "discoRoom", label: "Disco Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
            //go back
            h00e436: { cmd: "enter", room: "sportRoom", label: "Sport Room", point: [63, 98], enterPoint: [116, 85], obstacle: false },
            //projects
            hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
            hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
            hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
            h76d0ec: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

        },
    },

    //3
    discoRoom: {
        bg: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        frames: 2,
        frameDelay: 30,
        avatarScale: 2,
        tint: "#fa84af",
        pageBg: "#6a2545",
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        areaColors: {
            //door-yellow
            hffec27: { cmd: "enter", room: "gameRoom", label: "Game Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
            //go back
            h00e436: { cmd: "enter", room: "foodRoom", label: "Food Room", point: [63, 98], enterPoint: [116, 85], obstacle: false },
            //projects
            hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
            hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
            hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
            h76d0ec: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
        },
    },

    //4
    gameRoom: {
        bg: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        frames: 2,
        frameDelay: 30,
        avatarScale: 2,
        tint: "#fa84af",
        pageBg: "#6a2545",
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        areaColors: {
            //door-yellow
            hffec27: { cmd: "enter", room: "socialRoom", label: "Social Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
            //go back
            h00e436: { cmd: "enter", room: "discoRoom", label: "Disco Room", point: [63, 98], enterPoint: [116, 85], obstacle: false },
            //projects
            hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
            hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
            hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
            h76d0ec: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
        },
    },

    //5
    socialRoom: {
        bg: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        frames: 2,
        frameDelay: 30,
        avatarScale: 2,
        tint: "#fa84af",
        pageBg: "#6a2545",
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        areaColors: {
            //door-yellow
            hffec27: { cmd: "enter", room: "careRoom", label: "Care Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
            //go back
            h00e436: { cmd: "enter", room: "gameRoom", label: "Game Room", point: [63, 98], enterPoint: [116, 85], obstacle: false },
            //projects
            hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
            hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
            hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
            h76d0ec: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
        },
    },

    //6
    careRoom: {
        bg: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        frames: 2,
        frameDelay: 30,
        avatarScale: 2,
        tint: "#fa84af",
        pageBg: "#6a2545",
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        areaColors: {
            //door-yellow
            hffec27: { cmd: "enter", room: "galleryRoom", label: "Gallery Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
            //go back
            h00e436: { cmd: "enter", room: "socialRoom", label: "Social Room", point: [63, 98], enterPoint: [116, 85], obstacle: false },
            //projects
            hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
            hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
            hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
            h76d0ec: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
        },
    },  

    //7
    galleryRoom: {
        bg: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        frames: 2,
        frameDelay: 30,
        avatarScale: 2,
        tint: "#fa84af",
        pageBg: "#6a2545",
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        areaColors: {
            //door-yellow
            hffec27: { cmd: "enter", room: "animalRoom", label: "Animal Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
            //go back
            h00e436: { cmd: "enter", room: "careRoom", label: "Care Room", point: [63, 98], enterPoint: [116, 85], obstacle: false },
            //projects
            hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
            hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
            hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
            h76d0ec: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
        },
    },

    //8
    animalRoom: {
        bg: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        frames: 2,
        frameDelay: 30,
        avatarScale: 2,
        tint: "#fa84af",
        pageBg: "#6a2545",
        bubblesY: 50,
        spawn: [84, 92, 121, 99],   
        area: "prototype/200617_Prototypes_Areas_Gallery_1.png",
        areaColors: {
            //door-yellow
            hffec27: { cmd: "enter", room: "pictureRoom", label: "Picture Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
            //go back
            h00e436: { cmd: "enter", room: "galleryRoom", label: "Gallery Room", point: [63, 98], enterPoint: [116, 85], obstacle: false },
            //projects
            hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
            hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
            hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
            h76d0ec: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
    },
    },

};


//initial gallery plan

// //security
// security: {
//     //the background graphics, it can be a spreadsheet
//     bg: "likelike-bg.png",
//     //if spreadsheet frames
//     frames: 2,
//     //if animated, animation speed in refreshes (frame dependent)
//     frameDelay: 30,
//     //normally 2, avatars can be scaled to simulate camera distance
//     avatarScale: 2,
//     //a shade to tint the avatars to simulate light color, #FFFFFF normal
//     tint: "#fa84af",
//     //the html body color can be changed
//     pageBg: "#6a2545",
//     //minimum height for the speech bubbles
//     bubblesY: 50,
//     //if spawning directly in this room, top left and bottom right point defining the rectangular spawn area (random within it)
//     spawn: [84, 92, 121, 99],
//     //graphics with active areas Sierra Online adventures style
//     //color coded as below, #FFFFFF is walkable, transparent is obstacle
//     area: "likelike-areas.png",
//     //each color can trigger a command, the destination needs to be reached first
//     //the "h" is replaced by # to identify color
//     areaColors: {
//         //enter command changes room
//         //room: id of the room to enter
//         //label: what to display on rollover
//         //point: where to walk after click
//         //enterPoint: where to spawn in the next room
//         //obstacle: is the area walkable
//         //left-yellow
//         hffec27: { cmd: "enter", room: "canteen", label: "Canteen", point: [10, 86], enterPoint: [114, 86], obstacle: false },
//         //right-green
//         h00e436: { cmd: "enter", room: "corridor", label: "Corridor", point: [117, 86], enterPoint: [12, 86], obstacle: false },
//         //middle-blue
//         h29adff: { cmd: "enter", room: "gallery1", label: "Gallery 1", point: [30, 73], enterPoint: [99, 73], obstacle: false },
//         //go back
//         hbe1250: { cmd: "enter", room: "exterior", label: "Exterior", point: [63, 98], enterPoint: [116, 85], obstacle: false },
//         //projects
//         //text displays a text only on the client
//         //txt: the text
//         //align: center or left
//         //lines: manual number of lines, p5 doesn't understand line breaks
//         //url: uptionally open a page on click
//         hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
//         hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
//         hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
// },

//  //canteen
//  canteen: {
//     bg: "firstFloor.png",
//     avatarScale: 2,
//     pageBg: "#e1cdcd",
//     area: "firstFloor-areas.png",
//     tint: "#FFFFFF",
//     bubblesY: 46,
//     spawn: [15, 77, 113, 96],
//     areaColors: {
//         //enter command changes room
//         //room: id of the room to enter
//         //label: what to display on rollover
//         //point: where to walk after click
//         //enterPoint: where to spawn in the next room
//         //obstacle: is the area walkable
//         //left-yellow
//         hffec27: { cmd: "enter", room: "smokingArea", label: "Smocking Area", point: [10, 86], enterPoint: [114, 86], obstacle: false },
//         //go back
//         hbe1250: { cmd: "enter", room: "security", label: "Security", point: [63, 98], enterPoint: [116, 85], obstacle: false },
//         //projects
//         //text displays a text only on the client
//         //txt: the text
//         //align: center or left
//         //lines: manual number of lines, p5 doesn't understand line breaks
//         //url: uptionally open a page on click
//         hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
//         hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
//         hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

//     }
// },

//  //Smocking Area
//   smokingArea: {
//     bg: "firstFloor.png",
//     avatarScale: 2,
//     pageBg: "#e1cdcd",
//     area: "firstFloor-areas.png",
//     tint: "#FFFFFF",
//     bubblesY: 46,
//     spawn: [15, 77, 113, 96],
//     areaColors: {
//         //enter command changes room
//         //room: id of the room to enter
//         //label: what to display on rollover
//         //point: where to walk after click
//         //enterPoint: where to spawn in the next room
//         //obstacle: is the area walkable
//         //go back
//         hbe1250: { cmd: "enter", room: "canteen", label: "Canteen", point: [63, 98], enterPoint: [116, 85], obstacle: false },
//         //projects
//         //text displays a text only on the client
//         //txt: the text
//         //align: center or left
//         //lines: manual number of lines, p5 doesn't understand line breaks
//         //url: uptionally open a page on click
//         hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
//         hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
//         hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

//     }
// },

//  //corridor
//  corridor: {
//     bg: "firstFloor.png",
//     avatarScale: 2,
//     pageBg: "#e1cdcd",
//     area: "firstFloor-areas.png",
//     tint: "#FFFFFF",
//     bubblesY: 46,
//     spawn: [15, 77, 113, 96],
//     areaColors: {
//         //enter command changes room
//         //room: id of the room to enter
//         //label: what to display on rollover
//         //point: where to walk after click
//         //enterPoint: where to spawn in the next room
//         //obstacle: is the area walkable
//         //left-yellow
//         hffec27: { cmd: "enter", room: "brockenLift", label: "Brocken Lift", point: [10, 86], enterPoint: [114, 86], obstacle: false },
//         //right-green
//         h00e436: { cmd: "enter", room: "stair", label: "Stair", point: [117, 86], enterPoint: [12, 86], obstacle: false },
//         //go back
//         hbe1250: { cmd: "enter", room: "security", label: "Security", point: [63, 98], enterPoint: [116, 85], obstacle: false },
//         //projects
//         //text displays a text only on the client
//         //txt: the text
//         //align: center or left
//         //lines: manual number of lines, p5 doesn't understand line breaks
//         //url: uptionally open a page on click
//         hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
//         hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
//         hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

//     }
// },

//  //brocken Lift
//  brockenLift: {
//     bg: "firstFloor.png",
//     avatarScale: 2,
//     pageBg: "#e1cdcd",
//     area: "firstFloor-areas.png",
//     tint: "#FFFFFF",
//     bubblesY: 46,
//     spawn: [15, 77, 113, 96],
//     areaColors: {
//         //enter command changes room
//         //room: id of the room to enter
//         //label: what to display on rollover
//         //point: where to walk after click
//         //enterPoint: where to spawn in the next room
//         //obstacle: is the area walkable
//         //go back
//         hbe1250: { cmd: "enter", room: "corridor", label: "Corridor", point: [63, 98], enterPoint: [116, 85], obstacle: false },
//         //projects
//         //text displays a text only on the client
//         //txt: the text
//         //align: center or left
//         //lines: manual number of lines, p5 doesn't understand line breaks
//         //url: uptionally open a page on click
//         hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
//         hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
//         hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

//     }
// },

//  //stair
//  stair: {
//     bg: "firstFloor.png",
//     avatarScale: 2,
//     pageBg: "#e1cdcd",
//     area: "firstFloor-areas.png",
//     tint: "#FFFFFF",
//     bubblesY: 46,
//     spawn: [15, 77, 113, 96],
//     areaColors: {
//         //enter command changes room
//         //room: id of the room to enter
//         //label: what to display on rollover
//         //point: where to walk after click
//         //enterPoint: where to spawn in the next room
//         //obstacle: is the area walkable
//         //go back
//         hbe1250: { cmd: "enter", room: "corridor", label: "Corridor", point: [63, 98], enterPoint: [116, 85], obstacle: false },
//         //projects
//         //text displays a text only on the client
//         //txt: the text
//         //align: center or left
//         //lines: manual number of lines, p5 doesn't understand line breaks
//         //url: uptionally open a page on click
//         hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
//         hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
//         hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

//     }
// },

//  //gallery1
//  gallery1: {
//     bg: "firstFloor.png",
//     avatarScale: 2,
//     pageBg: "#e1cdcd",
//     area: "firstFloor-areas.png",
//     tint: "#FFFFFF",
//     bubblesY: 46,
//     spawn: [15, 77, 113, 96],
//     areaColors: {
//         //enter command changes room
//         //room: id of the room to enter
//         //label: what to display on rollover
//         //point: where to walk after click
//         //enterPoint: where to spawn in the next room
//         //obstacle: is the area walkable
//         //left-yellow
//         hffec27: { cmd: "enter", room: "gallery2", label: "Gallery 2", point: [10, 86], enterPoint: [114, 86], obstacle: false },
//         //go back
//         hbe1250: { cmd: "enter", room: "security", label: "Security", point: [63, 98], enterPoint: [116, 85], obstacle: false },
//         //projects
//         //text displays a text only on the client
//         //txt: the text
//         //align: center or left
//         //lines: manual number of lines, p5 doesn't understand line breaks
//         //url: uptionally open a page on click
//         hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
//         hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
//         hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

//     }
// },

//  //gallery2
//  gallery2: {
//     bg: "firstFloor.png",
//     avatarScale: 2,
//     pageBg: "#e1cdcd",
//     area: "firstFloor-areas.png",
//     tint: "#FFFFFF",
//     bubblesY: 46,
//     spawn: [15, 77, 113, 96],
//     areaColors: {
//         //enter command changes room
//         //room: id of the room to enter
//         //label: what to display on rollover
//         //point: where to walk after click
//         //enterPoint: where to spawn in the next room
//         //obstacle: is the area walkable
//         //can only go to the next gallery to force ppl to see everything before exit
//         //right-green
//         h00e436: { cmd: "enter", room: "gallery3", label: "Gallery 3", point: [117, 86], enterPoint: [12, 86], obstacle: false },
//         //projects
//         //text displays a text only on the client
//         //txt: the text
//         //align: center or left
//         //lines: manual number of lines, p5 doesn't understand line breaks
//         //url: uptionally open a page on click
//         hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
//         hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
//         hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

//     }
// },

//  //gallery3
//  gallery3: {
//     bg: "firstFloor.png",
//     avatarScale: 2,
//     pageBg: "#e1cdcd",
//     area: "firstFloor-areas.png",
//     tint: "#FFFFFF",
//     bubblesY: 46,
//     spawn: [15, 77, 113, 96],
//     areaColors: {
//         //enter command changes room
//         //room: id of the room to enter
//         //label: what to display on rollover
//         //point: where to walk after click
//         //enterPoint: where to spawn in the next room
//         //obstacle: is the area walkable

//         //can only go to the next gallery to force ppl to see everything before exit
//         //left-yellow
//         hffec27: { cmd: "enter", room: "gallery1", label: "Gallery 1", point: [10, 86], enterPoint: [114, 86], obstacle: false },
//         //projects
//         //text displays a text only on the client
//         //txt: the text
//         //align: center or left
//         //lines: manual number of lines, p5 doesn't understand line breaks
//         //url: uptionally open a page on click
//         hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
//         hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
//         hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

//     }
// },

// };


//original likelike roooms

// module.exports.ROOMS = {

//     likelike: {
//         //the background graphics, it can be a spreadsheet
//         bg: "likelike-bg-pico.png",
//         //if spreadsheet frames
//         frames: 2,
//         //if animated, animation speed in refreshes (frame dependent)
//         frameDelay: 30,
//         //normally 2, avatars can be scaled to simulate camera distance
//         avatarScale: 2,
//         //a shade to tint the avatars to simulate light color, #FFFFFF normal
//         tint: "#ffbbb8",
//         //the html body color can be changed
//         pageBg: "#ab5236",
//         //minimum height for the speech bubbles
//         bubblesY: 50,
//         //if spawning directly in this room, top left and bottom right point defining the rectangular spawn area (random within it)
//         spawn: [84, 92, 121, 99],
//         //graphics with active areas Sierra Online adventures style
//         //color coded as below, #FFFFFF is walkable, transparent is obstacle
//         area: "likelike-areas-pico.png",
//         //each color can trigger a command, the destination needs to be reached first
//         //the "h" is replaced by # to identify color
//         areaColors: {
//             //enter command changes room
//             //room: id of the room to enter
//             //label: what to display on rollover
//             //point: where to walk after click
//             //enterPoint: where to spawn in the next room
//             //obstacle: is the area walkable
//             hffec27: { cmd: "enter", room: "likelikeBackyard", label: "Backyard", point: [6, 88], enterPoint: [116, 69], obstacle: false },
//             h00e436: { cmd: "enter", room: "likelikeOutside", label: "Street", point: [102, 98], enterPoint: [103, 84], obstacle: false },
//             hab5236: { cmd: "enter", room: "firstFloor", label: "oMoMA", point: [116, 85], enterPoint: [63, 98], obstacle: false },

//             //text displays a text only on the client
//             //txt: the text
//             //align: center or left
//             //lines: manual number of lines, p5 doesn't understand line breaks
//             //url: uptionally open a page on click
//             hff004d: { cmd: "text", txt: "ENNUIGI\nby Josh Millard, 2015\nClick to play.\nControls: Arrow keys.", align: "left", lines: 4, url: "https://www.lexaloffle.com/bbs/?tid=2232", label: "An existential game", point: [34, 78], obstacle: true },
//             hff77a8: { cmd: "text", txt: "STRUNG OUT IN HEAVEN'S HIGH\nby Sean S. LeBlanc\nand Ian Martin, 2016\nClick to play.\nControls: Arrow keys + Z.", align: "left", lines: 5, url: "https://www.lexaloffle.com/bbs/?tid=3941", label: "A trippy game", point: [64, 78], obstacle: true },
//             hffccaa: { cmd: "text", txt: "GET COMFORTABLE\nby mcccclean, 2018\nClick to play.\nControls: Arrow keys.", align: "left", lines: 4, url: "https://mcccclean.itch.io/get-comfortable", label: "A snuggly game", point: [92, 78], obstacle: true },
//             h83769c: { cmd: "text", txt: "HYBRIS\nby Benjamin Soule', 2015\nClick to play.\nControls: Arrow keys + Z.", align: "left", lines: 4, url: "https://www.lexaloffle.com/bbs/?tid=2897", label: "A viral game", point: [16, 82], obstacle: true },
//         },
//         //list of sprites to create in the room
//         //sprites are rendered according to depth sort so they can appear above the avatars unlike the background
//         //they can be animated, mouse reactive and trigger commands like the areas above
//         things: {
//             //sprite spreadsheets only 1 row ok?
//             cabinet: { file: "top-cabinet-pico.png", frames: 1, frameDelay: 1, position: [24, 89], label: "A huggy game", command: { cmd: "text", txt: "EMBRACE\nby Remy Devaux, 2018\nClick to play.\nControls: Arrow keys.", align: "left", lines: 4, url: "https://trasevol-dog.itch.io/embrace", label: "A huggy game", point: [33, 92] } }
//         }
//     },
 
//     likelikeBitsy: {
//         //the background graphics, it can be a spreadsheet
//         bg: "likelike-bg.png",
//         //if spreadsheet frames
//         frames: 2,
//         //if animated, animation speed in refreshes (frame dependent)
//         frameDelay: 30,
//         //normally 2, avatars can be scaled to simulate camera distance
//         avatarScale: 2,
//         //a shade to tint the avatars to simulate light color, #FFFFFF normal
//         tint: "#fa84af",
//         //the html body color can be changed
//         pageBg: "#6a2545",
//         //minimum height for the speech bubbles
//         bubblesY: 50,
//         //if spawning directly in this room, top left and bottom right point defining the rectangular spawn area (random within it)
//         spawn: [84, 92, 121, 99],
//         //graphics with active areas Sierra Online adventures style
//         //color coded as below, #FFFFFF is walkable, transparent is obstacle
//         area: "likelike-areas.png",
//         //each color can trigger a command, the destination needs to be reached first
//         //the "h" is replaced by # to identify color
//         areaColors: {
//             //enter command changes room
//             //room: id of the room to enter
//             //label: what to display on rollover
//             //point: where to walk after click
//             //enterPoint: where to spawn in the next room
//             //obstacle: is the area walkable
//             hffec27: { cmd: "enter", room: "likelikeBackyard", label: "Backyard", point: [6, 88], enterPoint: [116, 69], obstacle: false },
//             h00e436: { cmd: "enter", room: "likelikeOutside", label: "Street", point: [102, 98], enterPoint: [103, 84], obstacle: false },
//             //text displays a text only on the client
//             //txt: the text
//             //align: center or left
//             //lines: manual number of lines, p5 doesn't understand line breaks
//             //url: uptionally open a page on click
//             hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
//             hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
//             hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
//             hab5236: { cmd: "text", txt: "ALMANAC OF GIRLSWAMPWAR TERRITORY\nby porpentine charity heartscape, 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://porpentine.itch.io/almanac", label: "A mutant game", point: [110, 82], obstacle: true },
//             h83769c: { cmd: "text", txt: "MOSS AS TEXTURE AS SPACE\nFOLDING ONTO ITSELF\nby Pol Clarissou, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://polclarissou.itch.io/moss-as-texture-as-space-folding-onto-itself", label: "A mossy game", point: [16, 82], obstacle: true },
//             hffa300: { cmd: "text", txt: "LIKELIKE\npresents:\nAn Itsy Bitsy Crisis\nCatastrophes and Rebirths in Bitsy", align: "center", lines: 4, label: "Wall text", point: [119, 95], obstacle: false }
//         },
//         //list of sprites to create in the room
//         //sprites are rendered according to depth sort so they can appear above the avatars unlike the background
//         //they can be animated, mouse reactive and trigger commands like the areas above
//         things: {
//             //sprite spreadsheets only 1 row ok?
//             cabinet: { file: "top-cabinet.png", frames: 1, frameDelay: 1, position: [24, 89], label: "A time traveling game", command: { cmd: "text", txt: "THE LAST HUMAN TOUCH\nby Cephalopodunk, 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://cephalopodunk.itch.io/the-last-human-touch", label: "A time traveling game", point: [33, 92] } }
//         }
//     },

//     likelikeOutside: {
//         bg: "likelike-outside-omoma.png",
//         frames: 2,
//         frameDelay: 30,
//         avatarScale: 2,
//         pageBg: "#ab5236",
//         area: "likelikeOutside-areas.png",
//         tint: "#fdeac8",
//         bubblesY: 44,
//         spawn: [14, 84, 119, 92],
//         areaColors: {
//             //h will be replaced by #
//             hff77a8: { cmd: "enter", room: "likelike", label: "Enter LIKELIKE", point: [100, 84], enterPoint: [104, 98], obstacle: false },
//         }
//     },

//     likelikeBackyard: {
//         bg: "likelike-backyard.png",
//         frames: 2,
//         frameDelay: 30,
//         avatarScale: 2,
//         area: "likelike-backyard-areas.png",
//         tint: "#fdbe4e",
//         pageBg: "#413830",
//         bubblesY: 20,
//         spawn: [38, 63, 108, 83],
//         areaColors: {
//             //h will be replaced by #
//             hff77a8: { cmd: "enter", room: "likelike", label: "Enter LIKELIKE", point: [119, 69], enterPoint: [5, 88], obstacle: false },
//         },
//         things: {
//             //spreadsheets only 1 row ok?
//             harvey: { file: "harvey.png", frames: 2, frameDelay: 10, position: [102, 77], label: "Harvey", command: { cmd: "text", txt: "*You pet the dog*", align: "center", lines: 1, point: [101, 84] } },
//             chairs: { file: "likelike-backyard-chairs.png", position: [33, 44] },
//             cabinet: {
//                 file: "pico-cabinet.png", frames: 2, frameDelay: 10, position: [92, 26], label: "Looping animations?",
//                 command: { cmd: "text", txt: "TWEETCARTS\nby Varius Creators\nThe code of each of these PICO-8 generated animations fits into a single tweet (280 chars).", align: "left", lines: 5, url: "https://twitter.com/molleindustria/timelines/1254605222455934978", label: "Short animations?", point: [96, 46] }
//             }
//         }
//     },

//     //just an empty room for testing mods
//     experiments: {

//         bg: "experiments-bg.png",
//         avatarScale: 2,
//         pageBg: "#bfaeae",
//         area: "experiments-areas.png",
//         tint: "#FFFFFF",
//         bubblesY: 50,
//         spawn: [15, 77, 113, 96]

//     },

//     //security
//     firstFloor: {
//         bg: "firstFloor.png",
//         avatarScale: 2,
//         pageBg: "#e1cdcd",
//         area: "firstFloor-areas.png",
//         tint: "#FFFFFF",
//         bubblesY: 46,
//         spawn: [15, 77, 113, 96],
//         areaColors: {
//             //left
//             hffec27: { cmd: "enter", room: "cnsnntrm", label: "cnsnnt rm", point: [10, 86], enterPoint: [114, 86], obstacle: false },
//             //right
//             h00e436: { cmd: "enter", room: "mirrorRoom", label: "Mirror Room", point: [117, 86], enterPoint: [12, 86], obstacle: false },
//             //up
//             h29adff: { cmd: "enter", room: "secondFloor", label: "2nd Floor", point: [30, 73], enterPoint: [99, 73], obstacle: false },
//             //wall text
//             ha8e72e: { cmd: "text", txt: "ONLINE MUSEUM OF MULTIPLAYER ART\nA survey of contemporary playful art. You have to talk and interact with other visitors to get the art.", align: "left", lines: 5, label: "Wall text", point: [50, 73], obstacle: false },
//             hb7250b: { cmd: "text", txt: "Anomaly\nMixed media, subjectively perceived.", align: "left", lines: 3, label: "Installation?", point: [75, 77], obstacle: false },
//             hbe1250: { cmd: "enter", room: "likelike", label: "LIKELIKE Arcade", point: [63, 98], enterPoint: [116, 85], obstacle: false },

//         },
//         things: {
//             //sprite spreadsheets only 1 row ok?
//             sculpture1: { file: "sculpture1.png", position: [70, 22], visible: false },
//             sculpture2: { file: "sculpture2.png", position: [70, 22], visible: false },
//             sculpture3: { file: "sculpture3.png", position: [70, 22], visible: false },
//             sculpture4: { file: "sculpture4.png", position: [70, 22], frames: 4, frameDelay: 10, visible: false },
//         }
//     },

//     secondFloor: {

//         bg: "secondFloor.png",
//         avatarScale: 2,
//         pageBg: "#e1cdcd",
//         area: "secondFloor-areas.png",
//         tint: "#FFFFFF",
//         bubblesY: 46,
//         spawn: [15, 77, 113, 96],
//         areaColors: {
//             //left
//             hffec27: { cmd: "enter", room: "censorshipRoom", label: "Censorship Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
//             //right
//             h00e436: { cmd: "enter", room: "rhymeRoom", label: "Rhyme Room", point: [117, 86], enterPoint: [12, 86], obstacle: false },
//             //down
//             hff77a8: { cmd: "enter", room: "firstFloor", label: "1st Floor", point: [99, 73], enterPoint: [30, 73], obstacle: false },
//             //up
//             h29adff: { cmd: "enter", room: "thirdFloor", label: "3rd Floor", point: [30, 73], enterPoint: [99, 73], obstacle: false },

//         },
//     },

//     thirdFloor: {

//         bg: "thirdFloor.png",
//         avatarScale: 2,
//         pageBg: "#e1cdcd",
//         area: "secondFloor-areas.png",
//         tint: "#FFFFFF",
//         bubblesY: 46,
//         spawn: [15, 77, 113, 96],
//         areaColors: {

//             //left
//             hffec27: { cmd: "enter", room: "darkRoom", label: "Dark Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },

//             //right
//             h00e436: { cmd: "enter", room: "familyRoom", label: "Family Room", point: [117, 86], enterPoint: [10, 77], obstacle: false },

//             //VIP
//             h29adff: { cmd: "enter", room: "VIPRoom", label: "VIP Room", point: [30, 73], enterPoint: [64, 79], obstacle: false },

//             //down
//             hff77a8: { cmd: "enter", room: "secondFloor", label: "2nd Floor", point: [99, 73], enterPoint: [30, 73], obstacle: false },
//         },

//     },

//     cnsnntrm: {
//         bg: "leftRoom.png",
//         avatarScale: 2,
//         pageBg: "#e1cdcd",
//         area: "leftRoom-areas.png",
//         tint: "#FFFFFF",
//         bubblesY: 46,
//         spawn: [15, 77, 113, 96],
//         areaColors: {
//             //right
//             h00e436: { cmd: "enter", room: "firstFloor", label: "Hall", point: [117, 86], enterPoint: [12, 86], obstacle: false },
//         },
//         things: {
//             //sprite spreadsheets only 1 row ok?
//             guard: { file: "museumGuard.png", frames: 1, frameDelay: 30, position: [13, 56], label: "Museum guard" }
//         }

//     },


//     mirrorRoom: {
//         bg: "rightRoom.png",
//         avatarScale: 2,
//         pageBg: "#e1cdcd",
//         area: "rightRoom-areas.png",
//         tint: "#FFFFFF",
//         bubblesY: 46,
//         spawn: [15, 77, 113, 96],
//         areaColors: {
//             //left
//             hffec27: { cmd: "enter", room: "firstFloor", label: "Hall", point: [10, 86], enterPoint: [114, 86], obstacle: false },
//         }

//     },

//     censorshipRoom: {
//         bg: "leftRoom.png",
//         avatarScale: 2,
//         pageBg: "#e1cdcd",
//         area: "censorshipRoom-areas.png",
//         tint: "#FFFFFF",
//         bubblesY: 46,
//         spawn: [15, 77, 113, 96],
//         areaColors: {
//             //right
//             h00e436: { cmd: "enter", room: "secondFloor", label: "Hall", point: [117, 86], enterPoint: [12, 86], obstacle: false },

//         },
//         things: {
//             //sprite spreadsheets only 1 row ok?
//             elephant: { file: "elephant-no-outline.png", frames: 4, frameDelay: 30, position: [42, 51] }
//         }
//     },

//     rhymeRoom: {
//         bg: "speaker-room.png",
//         avatarScale: 2,
//         frames: 3,
//         frameDelay: 10,
//         pageBg: "#e1cdcd",
//         area: "rightRoom-areas.png",
//         tint: "#FFFFFF",
//         bubblesY: 46,
//         spawn: [15, 77, 113, 96],
//         areaColors: {
//             //left
//             hffec27: { cmd: "enter", room: "secondFloor", label: "Hall", point: [10, 86], enterPoint: [114, 86], obstacle: false },

//         }

//     },

//     darkRoom: {
//         bg: "darkRoom.png",
//         avatarScale: 2,
//         frames: 3,
//         frameDelay: 10,
//         pageBg: "#221c17",
//         area: "leftRoom-areas.png",
//         tint: "#342c24",
//         bubblesY: 46,
//         spawn: [15, 77, 113, 96],
//         areaColors: {
//             //right
//             h00e436: { cmd: "enter", room: "thirdFloor", label: "Hall", point: [117, 86], enterPoint: [12, 86], obstacle: false },

//         }

//     },

//     familyRoom: {
//         bg: "familyRoom-bg.png",
//         avatarScale: 2,
//         pageBg: "#6a2545",
//         area: "familyRoom-areas.png",
//         tint: "#f7e9e9",
//         bubblesY: 40,
//         secret: false,
//         spawn: [12, 70, 16, 90],
//         areaColors: {
//             //left door
//             hffec27: { cmd: "enter", room: "thirdFloor", label: "Hall", point: [10, 77], enterPoint: [114, 86], obstacle: false },
//             hffccaa: { cmd: "text", label: "Book", txt: "Fifty Shades of Grey", align: "center", lines: 1, point: [16, 61] },
//             hff77a8: { cmd: "text", label: "Book", txt: "Fifty Shades Darker", align: "center", lines: 1, point: [16, 61] },
//             hff9d81: { cmd: "text", label: "Book", txt: "Fifty Shades Freed", align: "center", lines: 1, point: [16, 61] },
//             //action requires a custom listener in the serverMod listening to actionId
//             hff6c24: { cmd: "action", actionId: "TVInteract", label: "TV", point: [39, 69], obstacle: false },
//             h008751: { cmd: "text", label: "Picture", txt: "Family at Disneyworld", align: "center", lines: 1, point: [52, 61] },
//             ha8e72e: { cmd: "text", label: "Picture", txt: "Wedding picture", align: "center", lines: 1, point: [57, 61] },
//             h00e436: { cmd: "text", label: "?", txt: "A short red hair", align: "center", lines: 1, point: [8, 90], obstacle: false },
//             h29adff: { cmd: "text", label: "?", txt: "Female underwear", align: "center", lines: 1, point: [113, 62] },
//             hff004d: { cmd: "text", label: "Plant", txt: "It's in bad shape", align: "center", lines: 1, point: [26, 61] },
//         },
//         things: {
//             //sprite spreadsheets only 1 row ok?
//             couch2: { file: "familyRoom-couch2.png", position: [53, 54] },
//             couch1: { file: "familyRoom-couch1.png", position: [26, 63] },
//             table: { file: "familyRoom-table.png", position: [81, 74] },
//             TV: { file: "tv.png", id: "TV", position: [33, 45], frames: 13, frameDelay: 60, visible: false },
//         }

//     },

//     VIPRoom: {
//         bg: "VIPRoom-bg.png",
//         avatarScale: 2,
//         pageBg: "#742f29",
//         area: "VIPRoom-areas.png",
//         tint: "#f7cdba",
//         bubblesY: 40,
//         secret: true,
//         spawn: [56, 76, 69, 80],
//         //music: "smoothCrap.ogg",
//         musicVolume: 0.5,
//         areaColors: {
//             //right
//             hff004d: { cmd: "text", label: "Painting", txt: "An original Rothko?", align: "center", lines: 1, point: [27, 65], obstacle: false },
//             h00e436: { cmd: "text", label: "Window", txt: "Can you see the incline from here?", align: "center", lines: 1, point: [33, 59], obstacle: false },
//             hffec27: { cmd: "text", label: "Window", txt: "The Paris of Appalachia", align: "center", lines: 1, point: [53, 59], obstacle: false },
//             h29adff: { cmd: "text", label: "Window", txt: "Ah... the city of bridges!", align: "center", lines: 1, point: [73, 59], obstacle: false },
//             hff6c24: { cmd: "text", label: "Window", txt: "Gentrification is beautiful", align: "center", lines: 1, point: [83, 59], obstacle: false },
//             hffccaa: { cmd: "text", label: "Cocktail", txt: "*You drink an Old fashioned*", align: "center", lines: 1, point: [45, 76], obstacle: false },
//             hff77a8: { cmd: "text", label: "Champagne", txt: "It's a magnum bottle", align: "center", lines: 1, point: [38, 76], obstacle: false },
//             hb7250b: { cmd: "text", label: "Caviar tartines", txt: "*You eat a tartine*", align: "center", lines: 1, point: [31, 76], obstacle: false },
//             hab5236: { cmd: "text", label: "Chocolate fountain", txt: "A little bit tacky", align: "center", lines: 1, point: [24, 76], obstacle: false },
//             h065ab5: { cmd: "enter", room: "thirdFloor", label: "Hall", point: [64, 79], enterPoint: [30, 73], obstacle: false }
//         },
//         things: {
//             //sprite spreadsheets only 1 row ok?
//             VIPSeats: { file: "VIP-seats.png", position: [43, 56] },
//             VIPTable: { file: "VIP-table.png", position: [20, 65] },
//             VIPCouch: { file: "VIP-couch.png", position: [87, 68] },
//         }

//     },

// };