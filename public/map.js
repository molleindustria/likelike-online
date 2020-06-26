let window_w = window.innerWidth;
let window_h = window.innerHeight;
let canvasStyle, canvasWidth, canvasHeight;

let normalWidth = 256;
let normalHeight = 200;

let button = document.getElementById("map-button");
let mapContainer = document.getElementById("map");
let mapImg = document.getElementById("map-img");
let mobile;

function main() {
    mobile = isMobile();
    button.value = "SHOW MAP";

    button.addEventListener("click", function (event) {
        mapButton(button, mapContainer);
    });

    getDimensions();
    setMapPosition();

    window.addEventListener("resize", () => {
        getDimensions();
        setMapPosition();
    });
}

function getDimensions() {

    if (window_w > window_h) {
        canvasScale = window_h / normalWidth;
        canvasWidth = normalWidth * canvasScale;
        canvasHeight = normalHeight * canvasScale;
    } else {
        canvasScale = window_w / normalWidth;
        canvasWidth = normalWidth * canvasScale;
        canvasHeight = normalHeight * canvasScale;
    }
    window_w = window.innerWidth;
    window_h = window.innerHeight;
}

function setMapPosition() {
    if (!mobile) {
        let mapBottom = window_h - canvasHeight;
        let mapRight = window_w - (window_w - canvasWidth) / 2;
        button.style.left = "-120px";
        button.style.bottom = "0";
        mapContainer.style.bottom = `${mapBottom}px`;
        mapContainer.style.right = `${mapRight}px`;
        mapImg.style.objectPosition = "right bottom";

    }
    if (mobile) {
        let buttonVertical = -130;
        let mapTop = canvasHeight - buttonVertical;
        let mapLeft = (window_w - canvasWidth) / 2;
        let mapHeight = window_h - canvasHeight + buttonVertical;
        button.style.left = "0px";
        button.style.bottom = `${buttonVertical}px`;
        mapContainer.style.top = `${mapTop}px`;
        mapContainer.style.left = `${mapLeft}px`;
        mapContainer.style.height = `${mapHeight}px`;
        mapImg.style.objectPosition = "left top";
    }
}

function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

function isiOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isMobile() {
    return isAndroid() || isiOS();
}

function mapButton(btn, container) {
    container.style.display === "block" ? container.style.display = "none" : container.style.display = "block";

    if (btn.value == "SHOW MAP") {
        btn.value = "HIDE MAP";
        btn.innerHTML = "HIDE MAP";
    } else {
        btn.value = "SHOW MAP";
        btn.innerHTML = "SHOW MAP";
    }
}

main();