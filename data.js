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

const pinkBG = "#e1cdcd";
const greenBG = "#72bf71";

//miscellaneous sounds to preload
module.exports.SOUNDS = [
    ["beat1", "beat1.ogg"], //credit https://www.youtube.com/watch?v=ugLVpZm69DE
    ["beat2", "beat2.ogg"], // credit https://www.youtube.com/watch?v=dPdoxIz0w24
    ["beat3", "beat3.ogg"], //credit https://www.youtube.com/watch?v=XShEWT4MwJs
    ["DJStop", "DJStop.mp3"]
];

module.exports.ROOMS = {

   
    cciOutside: {
        bg: "cciOutside-bg.png",
        frames: 2,
        frameDelay: 30,
        avatarScale: 2,
        pageBg: greenBG,
        area: "cciOutside-areas.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [14, 84, 119, 92],
        areaColors: {
            //h will be replaced by #
            hff77a8: { cmd: "enter", room: "securityRoom", label: "Security", point: [64, 87], enterPoint: [64, 90], obstacle: false  },
        }
    },

    animalRoom: {
        bg: "animalRoom-bg.png",
        avatarScale: 2,
        pageBg: pinkBG,
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
            ha8e72e: { cmd: "text", txt: "Project by Eunah Lee\nHelp Haru find its way back home!\nAn interactive storybook for kids", align: "left", lines: 3, url: "https://eunah-lee-storybook5-6.glitch.me/", label: "Haru's Adventure", point: [34, 73], obstacle: false },
            hff0000: { cmd: "text", txt: "Project by Stacy\nBoggle is: A website for dog lovers,\nA place to loose yourself in a variety of doggy experiences:\nWear a dog crown\nDraw psychedelic dogs with your nose\nOr play a game of eat the treats using your dog head hoop to catch the dog biscuits", align: "left", lines: 11, url: "https://dog-game-website-.glitch.me/", label: "Boggle", point: [74, 73], obstacle: false },
            //TV icons
            hf39200: { cmd: "text", txt: "click for presentation", url: "https://eunah-lee-storybook5-6.glitch.me/", label: "Haru's Adventure", point: [34, 73], obstacle: false},
            he6007e: { cmd: "text", txt: "click for presentation", url: "https://dog-game-website-.glitch.me/", label: "Boggle", point: [74, 73], obstacle: false }
        },
        things: {
            sheep: { file: "things/sheep-walk.png", frames: 3, frameDelay: 30, position: [64, 60], label: "Sheep" },
            dog: {file: "things/harvey.png", frames: 2, frameDelay: 30, position: [84, 80], label: "Harvey"}
        }
    },

    careRoom: {
        bg: "careRoom-bg.png",
        avatarScale: 2,
        pageBg: pinkBG,
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
            //projects
            hff0000: {cmd: "text", txt: "Project by Mia Stoces-Brown\nEverybody is just trying to get from A to B.", align: "left", lines: 3, url: "https://from-a-to-b-.glitch.me", label: "From A to B", point: [24, 80], obstacle: false},
            h0000ff: {cmd: "text", txt: "Project by Bea Taylor Searle\nIn a world where we can't hold hands, let's feel closer online. ", align: "left", lines: 3, url: "http://holding-hands2.glitch.me/", label: "Holding Hands", point: [64, 80], obstacle: false},
            hf39200: {cmd: "text", txt: "Project by Jann Choy\nIn this epidemic, we can no longer touch one another. As we spend more time in front of our computers, how can we still form connections with each other?", align: "left", lines: 6, url: "https://when-our-hands-touch.glitch.me/", label: "When we touch, a tree grows", point: [100, 80], obstacle: false},
            //TV icons
            hff00ff: {cmd: "text", txt: "click for presentation", url: "https://from-a-to-b-.glitch.me", label: "Presentation: From A to B", point: [24, 73], obstacle: false},
            h312783: {cmd: "text", txt: "click for presentation", url: "https://youtu.be/n1W8W9TUKfY", label: "Presentation: Holding Hands", point: [64, 80], obstacle: false},
            h056c38: {cmd: "text", txt: "click for presentation", url: "https://when-our-hands-touch.glitch.me/", label: "Presentation: When we touch, a tree grows", point: [100, 80], obstacle: false}

        },
    },

    socialRoom: {
        bg: "socialRoom-bg.png",
        avatarScale: 2,
        tint: "#ffbbb8",
        pageBg: pinkBG,
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "socialRoom-areas.png",
        areaColors: {
            //left
            hffec27: { cmd: "enter", room: "careRoom", label: "Care Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
            //projects
            h00ff00: { cmd: "text", txt: "Project by Edward Martin\nA prototype for a social networking app that uses your daily emotions to communicate with your friends and family.", align: "left", lines: 4, url: "https://2020-06-06-regard-socket-app.glitch.me/", label: "Regard.", point: [34, 78], obstacle: true },
            hff0000: { cmd: "text", txt: "Project by Zhiqin Lu", align: "left", lines: 5, url: "https://observe-.glitch.me/", label: "Observe", point: [64, 78], obstacle: true },
            h0000ff: { cmd: "text", txt: "Project by Maximilian Zimmerer\nCommon Denominator is a web-based interaction that uses computer vision and socket connections to merge people's faces in real-time. The motivation behind this project was to create moments of joy between a pair of users and offer a digital sense of togetherness.", align: "left", lines: 9, url: "https://common-denominator.glitch.me/", label: "Common Denominator", point: [92, 78], obstacle: true },
            hff00ff: { cmd: "text", txt: "Project by Thomas Bugg", align: "left", lines: 4, url: "https://manipulated-living.glitch.me/", label: "Manipulated Living", point: [100, 88], obstacle: true },
            //TV icons
            hf39200: { cmd: "text", txt: "click for presentation", url: "https://2020-06-06-regard-socket-app.glitch.me/", label: "Regard", point: [34, 78], obstacle: true },
            h00b9ee: { cmd: "text", txt: "click for presentation", url: "https://observe-.glitch.me/", label: "Observe", point: [64, 78], obstacle: true },
            h312783: { cmd: "text", txt: "click for presentation", url: "https://common-denominator.glitch.me/", label: "Common Denominator", point: [92, 78], obstacle: true },
            he6007e: { cmd: "text", txt: "click for presentation", url: "https://manipulated-living.glitch.me/", label: "Manipulated Living", point: [100, 88], obstacle: true }
        }
    },

    discoRoom: {
        bg: "discoRoom-bg.png",
        avatarScale: 2,
        frames: 2,
        frameDelay: 10,
        pageBg: pinkBG,
        area: "gameRoom-areas.png",
        tint: "#342c24",
        bubblesY: 46,
        spawn: [15, 77, 113, 96],
        areaColors: {
            //right
            h00e436: { cmd: "enter", room: "careRoom", label: "Care Room", point: [117, 86], enterPoint: [12, 86], obstacle: false },
            //projects
            hff0000: { cmd: "text", txt: "Project by Llorenc Garcia Bas\nA web based instrumental music app inspired by the Theremin that uses real-time body movements to manipulate sounds.", align: "left", lines: 5, url: "https://inky-simple-dryosaurus.glitch.me/", label: "Theremax", point: [34, 78], obstacle: true },
            hffff00: { cmd: "text", txt: "Project by Laiqa Mohid", align: "left", lines: 5, url: "https://eye-orchestra-final.glitch.me/", label: "Eye Orchestra", point: [64, 78], obstacle: true },
            h0000ff: { cmd: "text", txt: "Project by Kirsty Proud", align: "left", lines: 4, url: "https://acid-with-highscore.glitch.me/", label: "Acid", point: [92, 78], obstacle: true },
            hff00ff: { cmd: "text", txt: "Project by Rukiah Zakaria\nA body instrument, music video making place in space!", align: "left", lines: 3, url: "https://breakdown-the-mimi-mix.glitch.me/", label: "Breakdown the Mimi Mix", point: [10, 86], obstacle: true },
            //TV icons
            h312783: { cmd: "text", txt: "click for presentation", url: "https://inky-simple-dryosaurus.glitch.me/", label: "Theremax", point: [34, 78], obstacle: true },
            h00ffff: { cmd: "text", txt: "click for presentation", url: "https://eye-orchestra-final.glitch.me/", label: "Eye Orchestra", point: [64, 78], obstacle: true },
            he6007e: { cmd: "text", txt: "click for presentation", url: "https://acid-with-highscore.glitch.me/", label: "Acid", point: [92, 78], obstacle: true },
            hf39200: { cmd: "text", txt: "click for presentation", url: "https://breakdown-the-mimi-mix.glitch.me/", label: "Breakdown the Mimi Mix", point: [10, 86], obstacle: true }
        }
    },

    securityRoom: {

        bg: "securityRoom-bg.png",
        avatarScale: 2,
        pageBg: pinkBG,
        area: "securityRoom-areas.png",
        tint: "#FFFFFF",
        bubblesY: 46,
        spawn: [15, 77, 113, 96],
        areaColors: {
            //left
            hffec27: { cmd: "enter", room: "gameRoom", label: "Game Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
            //right
            h00e436: { cmd: "enter", room: "gallery", label: "Gallery", point: [117, 86], enterPoint: [16, 85], obstacle: false },
            //door in back
            h29adff: { cmd: "enter", room: "foodRoom", label: "Food Room", point: [30, 73], enterPoint: [30, 89], obstacle: false },
            //up
            hff77a8: { cmd: "enter", room: "careRoom", label: "Care Room", point: [99, 73], enterPoint: [99, 73], obstacle: false },
            //back outside
         
            hbe1250: { cmd: "enter", room: "cciOutside", label: "Entrance", point: [63, 98], enterPoint: [64, 98], obstacle: false },
            
        },
        things: {
            guard: { file: "characters/museumGuard.png", frames: 1, frameDelay: 30, position: [13, 56], label: "Security" }
        }

    },

    gallery: {
        bg: "galleryRoom-bg.png",
        avatarScale: 2,
        tint: "#ffbbb8",
        pageBg: pinkBG,
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "galleryRoom-areas.png",
        areaColors: {
            //left
            hffec27: { cmd: "enter", room: "securityRoom", label: "Security", point: [10, 86], enterPoint: [114, 86], obstacle: false },
            //Projects by: Jessie, Val and Riya
            h00ff00: { cmd: "text", txt: "Project by Jessie Zhang\nBlow digital bubbles with sound!", align: "left", lines: 2, url: "https://speech-bubbles.glitch.me/", label: "Speech Bubbles", point: [34, 78], obstacle: true },
            hff0000: { cmd: "text", txt: "Project by Val Toro\nWatch the tale of a lonely ghost before joining them in the next realm.", align: "left", lines: 5, url: "https://ghost-tales.glitch.me/", label: "Ghost Tales", point: [64, 78], obstacle: true },
            h0000ff: { cmd: "text", txt: "Project by Riya Maria", align: "left", lines: 4, url: "https://allseeing--eyes.glitch.me/", label: "all seeing eyes", point: [92, 78], obstacle: true },
            //TV icons
            he6007e: { cmd: "text", txt: "click for presentation", url: "https://speech-bubbles.glitch.me/", label: "Speech Bubbles", point: [34, 78], obstacle: true },
            h312783: { cmd: "text", txt: "click for presentation", url: "https://ghost-tales.glitch.me/", label: "Ghost Tales", point: [64, 78], obstacle: true },
            hf39200: { cmd: "text", txt: "click for presentation", url: "https://allseeing--eyes.glitch.me/", label: "all seeing eyes", point: [92, 78], obstacle: true }          
        }
    },

    foodRoom: {
        bg: "foodRoom-bg.png",
        avatarScale: 2,
        tint: "#ffbbb8",
        pageBg: pinkBG,
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "foodRoom-areas.png",
        areaColors: {
            //left
            hbe1250: { cmd: "enter", room: "securityRoom", label: "Security", point: [30, 90], enterPoint: [30, 72], obstacle: false },
            //projects
            hffff00: { cmd: "text", txt: "Project by Khalisha Tambunan\nIt's raining cats and dogs... and everything in between.", align: "left", lines: 4, url: "https://testkitsc.glitch.me/", label: "Kitschen Dreams", point: [34, 78], obstacle: true },
            hff0000: { cmd: "text", txt: "Project by Kamil Sznajder", align: "left", lines: 5, url: "https://time-to-eat.glitch.me/", label: "Time to eat Bug!", point: [94, 78], obstacle: true },
            //TV icons
            hf39200: { cmd: "text", txt: "click for presentation", url: "https://testkitsc.glitch.me/", label: "Kitschen Dreams", point: [34, 78], obstacle: true },
            h006b2d: { cmd: "text", txt: "click for presentation", url: "https://time-to-eat.glitch.me/", label: "Time to eat Bug!", point: [94, 78], obstacle: true }           
        }
    },
  

    gameRoom: {
        bg: "gameRoom-bg.png",
        avatarScale: 2,
        frames: 3,
        frameDelay: 10,
        pageBg: pinkBG,
        area: "gameRoom-areas.png",
        tint: "#FFFFFF",
        bubblesY: 46,
        spawn: [15, 77, 113, 96],
        areaColors: {
            //right
            h00e436: { cmd: "enter", room: "securityRoom", label: "Security", point: [117, 86], enterPoint: [12, 86], obstacle: false },
            //projects
            hff0000: { cmd: "text", txt: "Project by Sandro Valente\nThe Head controlled space exploration game that is about spreading goodwill to close enough planets. Who will be the best Starseed? Will any ever reach 200 max score? Upload your high score #starseeds to enter the prize draw! Live Long & Prosper!", align: "left", lines: 9, url: "https://starseeds-.glitch.me/", label: "Starseeds", point: [34, 78], obstacle: true },
            hffff00: { cmd: "text", txt: "Project by Lexy Garces Beavis\nA game inspired by the 1975 Arcade Game: Whac-A-Mole. Use your wrists to move around the rainbows to hit the sun. Encouraging movement as a form of self care.", align: "left", lines: 7, url: "https://quaroutine-the-game1.glitch.me/", label: "Quaroutine", point: [64, 78], obstacle: true },
            h0000ff: { cmd: "text", txt: "Project by Dejana Draganić", align: "left", lines: 4, url: "https://shake-it-out-.glitch.me/", label: "Shake it Out!", point: [92, 78], obstacle: true },
            hff00ff: { cmd: "text", txt: "Project by Martin Del Busto", align: "left", lines: 4, url: "https://pixelated.glitch.me/", label: "Pixelated", point: [10, 86], obstacle: true },
            //TV icon
            h312783: { cmd: "text", txt: "click for presentation", url: "https://inky-simple-dryosaurus.glitch.me/", label: "Starseeds", point: [34, 78], obstacle: true },
            h00ffff: { cmd: "text", txt: "click for presentation", url: "https://eye-orchestra-final.glitch.me/", label: "Quaroutine", point: [64, 78], obstacle: true },
            he6007e: { cmd: "text", txt: "click for presentation", url: "https://acid-with-highscore.glitch.me/", label: "Shake it Out!", point: [92, 78], obstacle: true },
            hf39200: { cmd: "text", txt: "click for presentation", url: "https://breakdown-the-mimi-mix.glitch.me/", label: "Pixelated", point: [10, 86], obstacle: true },
        }

    },

    drawRoom: {
        bg: "drawRoom-bg.png",
        avatarScale: 2,
        tint: "#ffbbb8",
        pageBg: pinkBG,
        bubblesY: 50,
        spawn: [84, 92, 121, 99],
        area: "drawRoom-areas.png",
        areaColors: {
            //left
            hffec27: { cmd: "enter", room: "animalRoom", label: "Animal Room", point: [10, 86], enterPoint: [114, 86], obstacle: false },
            //projects by Alex and Vince
            h00ff00: { cmd: "text", txt: "Project by Alex Greer\nA simple teamwork game, with the aim of creating a masterpiece together using only shapes and the colours in your environment.", align: "left", lines: 5, url: "https://draw-together-again.glitch.me/", label: "Draw Together Again", point: [34, 78], obstacle: true },
            h0000ff: { cmd: "text", txt: "Project by Vince Ibay", align: "left", lines: 4, url: "https://better-together.glitch.me/", label: "Together", point: [92, 78], obstacle: true },
            //TV icons
            hf39200: { cmd: "text", txt: "click for presentation", url: "https://draw-together-again.glitch.me/", label: "Draw Together Again", point: [34, 78], obstacle: true },
            hff0000: { cmd: "text", txt: "click for presentation", url: "https://better-together.glitch.me/", label: "Together", point: [92, 78], obstacle: true }
        }
    },

    viewRoom: {
        bg: "viewRoom-bg.png",
        avatarScale: 2,
        frames: 3,
        frameDelay: 10,
        pageBg: pinkBG,
        area: "viewRoom-areas.png",
        tint: "#FFFFFF",
        bubblesY: 46,
        spawn: [15, 77, 113, 96],
        areaColors: {
            //right
            h00e436: { cmd: "enter", room: "animalRoom", label: "Animal Room", point: [117, 86], enterPoint: [12, 86], obstacle: false },
            //projects
            ha8e72e: { cmd: "text", txt: "Project by Morgan Williams", align: "left", lines: 4, url: "https://views-from-a-room.glitch.me/", label: "Views from a Room", point: [34, 78], obstacle: true },
            hffff00: { cmd: "text", txt: "Project by Ella Jonquil Fitzgerald", align: "left", lines: 5, url: "https://webcam-socket-io.glitch.me/", label: "Quarantine Kiss", point: [64, 78], obstacle: true },
            h0000ff: { cmd: "text", txt: "Project by Catherine Rose Lavender ", align: "left", lines: 4, url: "https://root-dandy-position.glitch.me/", label: "be still, be calm", point: [92, 78], obstacle: true },
            //TV icons
            hf39200: { cmd: "text", txt: "click for presentation", url: "https://views-from-a-room.glitch.me/", label: "Views from a Room", point: [34, 78], obstacle: true },
            hff00ff: { cmd: "text", txt: "click for presentation", url: "https://webcam-socket-io.glitch.me/", label: "Quarantine Kiss", point: [64, 78], obstacle: true },
            hff0000: { cmd: "text", txt: "click for presentation", url: "https://root-dandy-position.glitch.me/", label: "TBC", point: [92, 78], obstacle: true }            
        }
    },

};
