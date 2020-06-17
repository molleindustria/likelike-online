imodule.exports.ROOMS = {

    //exterior
    exterior: {
        bg: "likelike-outside-omoma.png",
        frames: 2,
        frameDelay: 30,
        avatarScale: 2,
        pageBg: "#ab5236",
        area: "exterior-areas.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [14, 84, 119, 92],
        areaColors: {
            //h will be replaced by #
            hff77a8: { cmd: "enter", room: "security", label: "Security", point: [100, 84], enterPoint: [104, 98], obstacle: false },
        }
    },

//security
security: {
    //the background graphics, it can be a spreadsheet
    bg: "likelike-bg.png",
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
    area: "likelike-areas.png",
    //each color can trigger a command, the destination needs to be reached first
    //the "h" is replaced by # to identify color
    areaColors: {
        //enter command changes room
        //room: id of the room to enter
        //label: what to display on rollover
        //point: where to walk after click
        //enterPoint: where to spawn in the next room
        //obstacle: is the area walkable
        //left-yellow
        hffec27: { cmd: "enter", room: "canteen", label: "Canteen", point: [10, 86], enterPoint: [114, 86], obstacle: false },
        //right-green
        h00e436: { cmd: "enter", room: "corridor", label: "Corridor", point: [117, 86], enterPoint: [12, 86], obstacle: false },
        //middle-blue
        h29adff: { cmd: "enter", room: "gallery1", label: "Gallery 1", point: [30, 73], enterPoint: [99, 73], obstacle: false },
        //go back
        hbe1250: { cmd: "enter", room: "exterior", label: "Exterior", point: [63, 98], enterPoint: [116, 85], obstacle: false },
        //projects
        //text displays a text only on the client
        //txt: the text
        //align: center or left
        //lines: manual number of lines, p5 doesn't understand line breaks
        //url: uptionally open a page on click
        hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
        hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
        hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
},

 //canteen
 canteen: {
    bg: "firstFloor.png",
    avatarScale: 2,
    pageBg: "#e1cdcd",
    area: "firstFloor-areas.png",
    tint: "#FFFFFF",
    bubblesY: 46,
    spawn: [15, 77, 113, 96],
    areaColors: {
        //enter command changes room
        //room: id of the room to enter
        //label: what to display on rollover
        //point: where to walk after click
        //enterPoint: where to spawn in the next room
        //obstacle: is the area walkable
        //left-yellow
        hffec27: { cmd: "enter", room: "smokingArea", label: "Smocking Area", point: [10, 86], enterPoint: [114, 86], obstacle: false },
        //go back
        hbe1250: { cmd: "enter", room: "security", label: "Security", point: [63, 98], enterPoint: [116, 85], obstacle: false },
        //projects
        //text displays a text only on the client
        //txt: the text
        //align: center or left
        //lines: manual number of lines, p5 doesn't understand line breaks
        //url: uptionally open a page on click
        hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
        hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
        hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

    }
},

 //Smocking Area
  smokingArea: {
    bg: "firstFloor.png",
    avatarScale: 2,
    pageBg: "#e1cdcd",
    area: "firstFloor-areas.png",
    tint: "#FFFFFF",
    bubblesY: 46,
    spawn: [15, 77, 113, 96],
    areaColors: {
        //enter command changes room
        //room: id of the room to enter
        //label: what to display on rollover
        //point: where to walk after click
        //enterPoint: where to spawn in the next room
        //obstacle: is the area walkable
        //go back
        hbe1250: { cmd: "enter", room: "canteen", label: "Canteen", point: [63, 98], enterPoint: [116, 85], obstacle: false },
        //projects
        //text displays a text only on the client
        //txt: the text
        //align: center or left
        //lines: manual number of lines, p5 doesn't understand line breaks
        //url: uptionally open a page on click
        hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
        hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
        hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

    }
},

 //corridor
 corridor: {
    bg: "firstFloor.png",
    avatarScale: 2,
    pageBg: "#e1cdcd",
    area: "firstFloor-areas.png",
    tint: "#FFFFFF",
    bubblesY: 46,
    spawn: [15, 77, 113, 96],
    areaColors: {
        //enter command changes room
        //room: id of the room to enter
        //label: what to display on rollover
        //point: where to walk after click
        //enterPoint: where to spawn in the next room
        //obstacle: is the area walkable
        //left-yellow
        hffec27: { cmd: "enter", room: "brockenLift", label: "Brocken Lift", point: [10, 86], enterPoint: [114, 86], obstacle: false },
        //right-green
        h00e436: { cmd: "enter", room: "stair", label: "Stair", point: [117, 86], enterPoint: [12, 86], obstacle: false },
        //go back
        hbe1250: { cmd: "enter", room: "security", label: "Security", point: [63, 98], enterPoint: [116, 85], obstacle: false },
        //projects
        //text displays a text only on the client
        //txt: the text
        //align: center or left
        //lines: manual number of lines, p5 doesn't understand line breaks
        //url: uptionally open a page on click
        hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
        hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
        hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

    }
},

 //brocken Lift
 brockenLift: {
    bg: "firstFloor.png",
    avatarScale: 2,
    pageBg: "#e1cdcd",
    area: "firstFloor-areas.png",
    tint: "#FFFFFF",
    bubblesY: 46,
    spawn: [15, 77, 113, 96],
    areaColors: {
        //enter command changes room
        //room: id of the room to enter
        //label: what to display on rollover
        //point: where to walk after click
        //enterPoint: where to spawn in the next room
        //obstacle: is the area walkable
        //go back
        hbe1250: { cmd: "enter", room: "corridor", label: "Corridor", point: [63, 98], enterPoint: [116, 85], obstacle: false },
        //projects
        //text displays a text only on the client
        //txt: the text
        //align: center or left
        //lines: manual number of lines, p5 doesn't understand line breaks
        //url: uptionally open a page on click
        hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
        hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
        hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

    }
},

 //stair
 stair: {
    bg: "firstFloor.png",
    avatarScale: 2,
    pageBg: "#e1cdcd",
    area: "firstFloor-areas.png",
    tint: "#FFFFFF",
    bubblesY: 46,
    spawn: [15, 77, 113, 96],
    areaColors: {
        //enter command changes room
        //room: id of the room to enter
        //label: what to display on rollover
        //point: where to walk after click
        //enterPoint: where to spawn in the next room
        //obstacle: is the area walkable
        //go back
        hbe1250: { cmd: "enter", room: "corridor", label: "Corridor", point: [63, 98], enterPoint: [116, 85], obstacle: false },
        //projects
        //text displays a text only on the client
        //txt: the text
        //align: center or left
        //lines: manual number of lines, p5 doesn't understand line breaks
        //url: uptionally open a page on click
        hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
        hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
        hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

    }
},

 //gallery1
 gallery1: {
    bg: "firstFloor.png",
    avatarScale: 2,
    pageBg: "#e1cdcd",
    area: "firstFloor-areas.png",
    tint: "#FFFFFF",
    bubblesY: 46,
    spawn: [15, 77, 113, 96],
    areaColors: {
        //enter command changes room
        //room: id of the room to enter
        //label: what to display on rollover
        //point: where to walk after click
        //enterPoint: where to spawn in the next room
        //obstacle: is the area walkable
        //left-yellow
        hffec27: { cmd: "enter", room: "gallery2", label: "Gallery 2", point: [10, 86], enterPoint: [114, 86], obstacle: false },
        //go back
        hbe1250: { cmd: "enter", room: "security", label: "Security", point: [63, 98], enterPoint: [116, 85], obstacle: false },
        //projects
        //text displays a text only on the client
        //txt: the text
        //align: center or left
        //lines: manual number of lines, p5 doesn't understand line breaks
        //url: uptionally open a page on click
        hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
        hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
        hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

    }
},

 //gallery2
 gallery2: {
    bg: "firstFloor.png",
    avatarScale: 2,
    pageBg: "#e1cdcd",
    area: "firstFloor-areas.png",
    tint: "#FFFFFF",
    bubblesY: 46,
    spawn: [15, 77, 113, 96],
    areaColors: {
        //enter command changes room
        //room: id of the room to enter
        //label: what to display on rollover
        //point: where to walk after click
        //enterPoint: where to spawn in the next room
        //obstacle: is the area walkable
        //can only go to the next gallery to force ppl to see everything before exit
        //right-green
        h00e436: { cmd: "enter", room: "gallery3", label: "Gallery 3", point: [117, 86], enterPoint: [12, 86], obstacle: false },
        //projects
        //text displays a text only on the client
        //txt: the text
        //align: center or left
        //lines: manual number of lines, p5 doesn't understand line breaks
        //url: uptionally open a page on click
        hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
        hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
        hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

    }
},

 //gallery3
 gallery3: {
    bg: "firstFloor.png",
    avatarScale: 2,
    pageBg: "#e1cdcd",
    area: "firstFloor-areas.png",
    tint: "#FFFFFF",
    bubblesY: 46,
    spawn: [15, 77, 113, 96],
    areaColors: {
        //enter command changes room
        //room: id of the room to enter
        //label: what to display on rollover
        //point: where to walk after click
        //enterPoint: where to spawn in the next room
        //obstacle: is the area walkable

        //can only go to the next gallery to force ppl to see everything before exit
        //left-yellow
        hffec27: { cmd: "enter", room: "gallery1", label: "Gallery 1", point: [10, 86], enterPoint: [114, 86], obstacle: false },
        //projects
        //text displays a text only on the client
        //txt: the text
        //align: center or left
        //lines: manual number of lines, p5 doesn't understand line breaks
        //url: uptionally open a page on click
        hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
        hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
        hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },

    }
},

};
