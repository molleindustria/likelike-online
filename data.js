//settings are just variables that can be sent to the client from the server
//they are either related to the rooms or shared with the server 
module.exports.SETTINGS = {
    //if not specified by the url where is the starting point
    defaultRoom: "likelikeOutside",
    //minimum time between talk messages enforced by both client and server
    ANTI_SPAM: 1000,
    //shows up at first non lurking login
    INTRO_TEXT: "Click/tap to move"
};

module.exports.ROOMS = {

    likelike: {
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
            hffec27: { cmd: "enter", room: "likelikeBackyard", label: "Backyard", point: [6, 88], enterPoint: [116, 69], obstacle: false },
            h00e436: { cmd: "enter", room: "likelikeOutside", label: "Street", point: [102, 98], enterPoint: [103, 84], obstacle: false },
            //text displays a text only on the client
            //txt: the text
            //align: center or left
            //lines: manual number of lines, p5 doesn't understand line breaks
            //url: uptionally open a page on click
            hff004d: { cmd: "text", txt: "OUR DAMNED MACHINE\nby Sophie Houlden, 2018\nClick on the frame to start.\nWASD or Arrow keys to move.", align: "left", lines: 4, url: "https://sophieh.itch.io/our-damned-machine", label: "A dystopian game", point: [34, 78], obstacle: true },
            hff77a8: { cmd: "text", txt: "CONTINENTAL DRIFT\nby Cecile Richard, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://haraiva.itch.io/continental-drift", label: "An intimate game", point: [64, 78], obstacle: true },
            hffccaa: { cmd: "text", txt: "SPIRAL HOUSE\nby Withering Systems (Everest Pipkin and Loren Schmidt), 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://withering-systems.itch.io/spiral-house", label: "An abstract game", point: [92, 78], obstacle: true },
            hab5236: { cmd: "text", txt: "ALMANAC OF GIRLSWAMPWAR TERRITORY\nby porpentine charity heartscape, 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://porpentine.itch.io/almanac", label: "A mutant game", point: [110, 82], obstacle: true },
            h83769c: { cmd: "text", txt: "MOSS AS TEXTURE AS SPACE\nFOLDING ONTO ITSELF\nby Pol Clarissou, 2019\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 5, url: "https://polclarissou.itch.io/moss-as-texture-as-space-folding-onto-itself", label: "A mossy game", point: [16, 82], obstacle: true },
            hffa300: { cmd: "text", txt: "LIKELIKE\npresents:\nAn Itsy Bitsy Crisis\nCatastrophes and Rebirths in Bitsy", align: "center", lines: 4, label: "Wall text", point: [119, 95], obstacle: false }
        },
        //array of sprites to create in the room
        //sprites are rendered according to depth sort so they can appear above the avatars unlike the background
        //they can be animated, mouse reactive and trigger commands like the areas above
        sprites: [
            //sprite spreadsheets only 1 row ok?
            { file: "top-cabinet.png", frames: 1, frameDelay: 1, position: [24, 89], label: "A time traveling game", command: { cmd: "text", txt: "THE LAST HUMAN TOUCH\nby Cephalopodunk, 2018\nWASD or Arrow keys to move.\nClick to play.", align: "left", lines: 4, url: "https://cephalopodunk.itch.io/the-last-human-touch", label: "A time traveling game", point: [33, 92] } }
        ]
    },

    likelikeOutside: {
        bg: "likelikeOutside-bg.png",
        frames: 2,
        frameDelay: 30,
        avatarScale: 2,
        pageBg: "#ab5236",
        area: "likelikeOutside-areas.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [14, 84, 119, 92],
        areaColors: {
            //h will be replaced by #
            hff77a8: { cmd: "enter", room: "likelike", label: "Enter LIKELIKE", point: [100, 84], enterPoint: [104, 98], obstacle: false },
        }
    },
    likelikeBackyard: {
        bg: "likelike-backyard.png",
        frames: 2,
        frameDelay: 30,
        avatarScale: 2,
        area: "likelike-backyard-areas.png",
        tint: "#fdbe4e",
        pageBg: "#413830",
        bubblesY: 20,
        spawn: [38, 63, 108, 83],
        areaColors: {
            //h will be replaced by #
            hff77a8: { cmd: "enter", room: "likelike", label: "Enter LIKELIKE", point: [119, 69], enterPoint: [5, 88], obstacle: false },
        },
        sprites: [
            //spreadsheets only 1 row ok?
            { file: "harvey.png", frames: 2, frameDelay: 10, position: [102, 77], label: "Harvey", command: { cmd: "text", txt: "*You pet the dog*", align: "center", lines: 1, point: [101, 84] } },
            { file: "likelike-backyard-chairs.png", position: [33, 44] },

        ]


    },
};