const fieldObjects = {
    "w": {
        "color": "#C0C0C0",
        "src": ""
        // "src": "img/wall.png"
    },
    "h": {
        "color": "#8B0000",
        "src": "img/hunt.png"
    },
    "t": {
        "color": "#FFD700",
        "src": "img/tres.png"
    },
    "r": {
        "color": "#ff0066",
        "src": "img/rogue.png"

    },
    "e": {
        "color": "#d9dcff",
        "src": ""
    }
}

const direction = {
    "up": {
        "x": 0,
        "y": -1
    },
    "right": {
        "x": 1,
        "y": 0
    },
    "down": {
        "x": 0,
        "y": 1
    },
    "left": {
        "x": -1,
        "y": 0
    }
}

export default { fieldObjects, direction };