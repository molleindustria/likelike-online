//settings are just variables that can be sent to the client from the server
//they are either related to the rooms or shared with the server 
module.exports.SETTINGS = {
    //if not specified by the url where is the starting point
    defaultRoom: "cciOutside",
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

   
    cciOutside: {
        bg: "cciOutside-areas.png",
        frames: 2,
        frameDelay: 30,
        avatarScale: 2,
        pageBg: "#ab5236",
        area: "cciOutside-areas.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [14, 84, 119, 92],
        areaColors: {
            //h will be replaced by #
            hff77a8: { cmd: "enter", room: "securityRoom", label: "Security", point: [64, 79], enterPoint: [30, 73], obstacle: false  },
        }
    },

    animalRoom: {
        bg: "animalRoom-areas.png",
        avatarScale: 2,
        pageBg: "#e1cdcd",
        area: "animalRoom-areas.png",
        tint: "#FFFFFF",
        bubblesY: 46,
        spawn: [15, 77, 113, 96],
        areaColors: {
            //left
            hffec27: { cmd: "enter", room: "viewRoom", label: "View Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
            //right
            h00e436: { cmd: "enter", room: "drawRoom", label: "Draw Room", point: [117, 86], enterPoint: [12, 86], obstacle: false },
            //down
            h29adff: { cmd: "enter", room: "careRoom", label: "Care Room", point: [99, 73], enterPoint: [30, 73], obstacle: false },
            //artwork
            ha8e72e: { cmd: "text", txt: "Eunah", align: "left", lines: 4, url: "https://eunah-lee-storybook5-6.glitch.me/", label: "Haru's Adventure", point: [34, 73], obstacle: false },
            hff0000: { cmd: "text", txt: "Stacy", align: "left", lines: 4, url: "https://dog-game-website-.glitch.me/", label: "Boggle", point: [74, 73], obstacle: false },
            
        },
    },

    careRoom: {
        bg: "careRoom-areas.png",
        avatarScale: 2,
        pageBg: "#e1cdcd",
        area: "careRoom-areas.png",
        tint: "#FFFFFF",
        bubblesY: 46,
        spawn: [15, 77, 113, 96],
        areaColors: {
            //left
            hffec27: { cmd: "enter", room: "discoRoom", label: "Disco Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
            //right
            h00e436: { cmd: "enter", room: "socialRoom", label: "Social Room", point: [117, 86], enterPoint: [12, 86], obstacle: false },
            //down
            hff77a8: { cmd: "enter", room: "securityRoom", label: "Security", point: [99, 73], enterPoint: [99, 73], obstacle: false },
            //up
            h29adff: { cmd: "enter", room: "animalRoom", label: "Animal Room", point: [30, 73], enterPoint: [99, 73], obstacle: false },

            hff0000: {cmd: "text", txt: "Mia", align: "left", lines: 4, url: "https://eunah-lee-storybook5-6.glitch.me/", label: "From A to B", point: [34, 73], obstacle: false},
            h0000ff: {cmd: "text", txt: "Bea", align: "left", lines: 4, url: "http://holding-hands2.glitch.me/", label: "Holding Hands", point: [64, 73], obstacle: false},
            hf39200: {cmd: "text", txt: "Jann", align: "left", lines: 4, url: "https://when-our-hands-touch.glitch.me/", label: "When we touch, a tree grows", point: [94, 73], obstacle: false}
        },
    },

    socialRoom: {
        bg: "galleryRoom-areas.png",
        avatarScale: 2,
        tint: "#ffbbb8",
        pageBg: "#ab5236",
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "galleryRoom-areas.png",
        areaColors: {
            //left
            hffec27: { cmd: "enter", room: "careRoom", label: "Care Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },

            h00ff00: { cmd: "text", txt: "Edd", align: "left", lines: 4, url: "https://2020-06-06-regard-socket-app.glitch.me/", label: "Regard", point: [34, 78], obstacle: true },
            hff0000: { cmd: "text", txt: "Zhiqin", align: "left", lines: 5, url: "https://observe-.glitch.me/", label: "Observe", point: [64, 78], obstacle: true },
            h0000ff: { cmd: "text", txt: "Max", align: "left", lines: 4, url: "https://common-denominator.glitch.me/", label: "Common Denominator", point: [92, 78], obstacle: true },
            hff00ff: { cmd: "text", txt: "Tom", align: "left", lines: 4, url: "https://manipulated-living.glitch.me/", label: "Manipulated Living", point: [100, 88], obstacle: true },
        }
    },

    discoRoom: {
        bg: "gameRoom-areas.png",
        avatarScale: 2,
        frames: 3,
        frameDelay: 10,
        pageBg: "#e1cdcd",
        area: "gameRoom-areas.png",
        tint: "#FFFFFF",
        bubblesY: 46,
        spawn: [15, 77, 113, 96],
        areaColors: {
            //right
            h00e436: { cmd: "enter", room: "careRoom", label: "Care Room", point: [117, 86], enterPoint: [12, 86], obstacle: false },

            hff0000: { cmd: "text", txt: "Llorenc", align: "left", lines: 4, url: "https://inky-simple-dryosaurus.glitch.me/", label: "Theremax", point: [34, 78], obstacle: true },
            hffff00: { cmd: "text", txt: "Laiqa", align: "left", lines: 5, url: "https://eye-orchestra-final.glitch.me/", label: "Eye Orchestra", point: [64, 78], obstacle: true },
            h0000ff: { cmd: "text", txt: "Kirsty", align: "left", lines: 4, url: "https://acid-with-highscore.glitch.me/", label: "Acid", point: [92, 78], obstacle: true },
            hff00ff: { cmd: "text", txt: "Rukiah", align: "left", lines: 4, url: "https://breakdown-the-mimi-mix.glitch.me/", label: "Breakdown the Mimi Mix", point: [10, 86], obstacle: true },

        }
    },

    securityRoom: {

        bg: "secondFloor-areas.png",
        avatarScale: 2,
        pageBg: "#e1cdcd",
        area: "secondFloor-areas.png",
        tint: "#FFFFFF",
        bubblesY: 46,
        spawn: [15, 77, 113, 96],
        areaColors: {

            //left
            hffec27: { cmd: "enter", room: "gameRoom", label: "Game Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },

            //right
            h00e436: { cmd: "enter", room: "gallery", label: "Gallery", point: [117, 86], enterPoint: [16, 85], obstacle: false },

            //door in back
            h29adff: { cmd: "enter", room: "foodRoom", label: "Food Room", point: [30, 73], enterPoint: [64, 79], obstacle: false },

            //up
            hff77a8: { cmd: "enter", room: "careRoom", label: "Care Room", point: [99, 73], enterPoint: [99, 73], obstacle: false },
        },

    },

    gallery: {
        bg: "galleryRoom-areas.png",
        avatarScale: 2,
        tint: "#ffbbb8",
        pageBg: "#ab5236",
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "galleryRoom-areas.png",
        areaColors: {
            //left
            hffec27: { cmd: "enter", room: "securityRoom", label: "Security", point: [10, 86], enterPoint: [114, 86], obstacle: false },

            h00ff00: { cmd: "text", txt: "Jessie", align: "left", lines: 4, url: "https://speech-bubbles.glitch.me/", label: "Speech Bubbles", point: [34, 78], obstacle: true },
            hff0000: { cmd: "text", txt: "Val", align: "left", lines: 5, url: "https://ghost-tales.glitch.me/", label: "Ghost Tales", point: [64, 78], obstacle: true },
            h0000ff: { cmd: "text", txt: "Vince", align: "left", lines: 4, url: "https://better-together.glitch.me/", label: "Together", point: [92, 78], obstacle: true },
            hff00ff: { cmd: "text", txt: "Riya", align: "left", lines: 4, url: "https://allseeing--eyes.glitch.me/", label: "all seeing eyes", point: [100, 88], obstacle: true },
        }
    },

    foodRoom: {
        bg: "foodRoom-areas.png",
        avatarScale: 2,
        tint: "#ffbbb8",
        pageBg: "#ab5236",
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "foodRoom-areas.png",
        areaColors: {
            //left
            hbe1250: { cmd: "enter", room: "securityRoom", label: "Security", point: [25, 86], enterPoint: [30, 86], obstacle: false },

            hffff00: { cmd: "text", txt: "Khalisha", align: "left", lines: 4, url: "https://testkitsc.glitch.me/", label: "Title TBC", point: [34, 78], obstacle: true },
            hff0000: { cmd: "text", txt: "Kamil", align: "left", lines: 5, url: "https://time-to-eat.glitch.me/", label: "Time to eat Bug!", point: [94, 78], obstacle: true },
            
        }
    },
  

    gameRoom: {
        bg: "gameRoom-areas.png",
        avatarScale: 2,
        frames: 3,
        frameDelay: 10,
        pageBg: "#e1cdcd",
        area: "gameRoom-areas.png",
        tint: "#FFFFFF",
        bubblesY: 46,
        spawn: [15, 77, 113, 96],
        areaColors: {
            //right
            h00e436: { cmd: "enter", room: "securityRoom", label: "Security", point: [117, 86], enterPoint: [12, 86], obstacle: false },

            hff0000: { cmd: "text", txt: "Sandro", align: "left", lines: 4, url: "https://starseeds-.glitch.me/", label: "Starseeds", point: [34, 78], obstacle: true },
            hffff00: { cmd: "text", txt: "Lexy", align: "left", lines: 5, url: "https://quaroutine-the-game1.glitch.me/", label: "Quaroutine", point: [64, 78], obstacle: true },
            h0000ff: { cmd: "text", txt: "Dejana", align: "left", lines: 4, url: "https://shake-it-out-.glitch.me/", label: "Shake it Out!", point: [92, 78], obstacle: true },
            hff00ff: { cmd: "text", txt: "Martin", align: "left", lines: 4, url: "https://pixelated.glitch.me/", label: "Pixelated", point: [10, 86], obstacle: true },

        }

    },

    drawRoom: {
        bg: "galleryRoom-areas.png",
        avatarScale: 2,
        tint: "#ffbbb8",
        pageBg: "#ab5236",
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "galleryRoom-areas.png",
        areaColors: {
            //left
            hffec27: { cmd: "enter", room: "animalRoom", label: "Animal Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },

            h00ff00: { cmd: "text", txt: "Alex", align: "left", lines: 4, url: "https://draw-together-again.glitch.me/", label: "Draw Together Again", point: [34, 78], obstacle: true },
            hff0000: { cmd: "text", txt: "Val", align: "left", lines: 5, url: "https://ghost-tales.glitch.me/", label: "TBA", point: [64, 78], obstacle: true },
            h0000ff: { cmd: "text", txt: "Vince", align: "left", lines: 4, url: "https://better-together.glitch.me/", label: "TBA", point: [92, 78], obstacle: true },
            hff00ff: { cmd: "text", txt: "Riya", align: "left", lines: 4, url: "https://allseeing--eyes.glitch.me/", label: "TBA", point: [100, 88], obstacle: true },
        }
    },

    viewRoom: {
        bg: "viewRoom-areas.png",
        avatarScale: 2,
        frames: 3,
        frameDelay: 10,
        pageBg: "#e1cdcd",
        area: "viewRoom-areas.png",
        tint: "#FFFFFF",
        bubblesY: 46,
        spawn: [15, 77, 113, 96],
        areaColors: {
            //right
            h00e436: { cmd: "enter", room: "animalRoom", label: "Animal Room", point: [117, 86], enterPoint: [12, 86], obstacle: false },

            hff0000: { cmd: "text", txt: "Morgan", align: "left", lines: 4, url: "https://views-from-a-room.glitch.me/", label: "Views from a Room", point: [34, 78], obstacle: true },
            hffff00: { cmd: "text", txt: "Lexy", align: "left", lines: 5, url: "https://quaroutine-the-game1.glitch.me/", label: "TBC", point: [64, 78], obstacle: true },
            h0000ff: { cmd: "text", txt: "Dejana", align: "left", lines: 4, url: "https://shake-it-out-.glitch.me/", label: "TBC", point: [92, 78], obstacle: true },
            

        }
    },

};