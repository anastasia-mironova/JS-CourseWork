import { Hunter } from "./Hunter";
import { Rogue } from "./Rogue";
import data from './data';

const fieldObjects = data.fieldObjects;
const direction = data.direction;

console.log("lol:", fieldObjects);

export class Field {
    constructor(level) {
        this.x0 = 0;
        this.y0 = 0;

        this.rows = level.length;
        this.cols = level[0].length;

        this.ctx = this.setupCanvas("myCanvas", "2d");

        console.log("level:", level);
        console.log("#", this.rows, this.cols);

        this.level = level;
        this.setHunter();
        this.setRogue();
        console.log("hunter1:", this.hunter);
        console.log("rogue1:", this.rogue);;
        this.hunterController = this.hunterController.bind(this);

        this.counter = 0;
    }

    setupCanvas(id, context) {
        let canvas = document.getElementById(id);
        let ctx = canvas.getContext(context);

        const levelRatio = this.cols / this.rows;
        const windowRatio = window.innerWidth / window.innerHeight;

        // По высоте
        if (windowRatio > levelRatio) {
            ctx.canvas.height = window.innerHeight;
            ctx.canvas.width = ctx.canvas.height * levelRatio;
            // По ширине
        } else {
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = ctx.canvas.width / levelRatio;
        }

        if (this.cols > this.rows) {
            this.cellSize = Math.round(ctx.canvas.width / this.cols);
        } else {
            this.cellSize = Math.round(ctx.canvas.height / this.rows);
        }

        return ctx;
    }

    renderField() {



        for (let col = 0; col < this.cols; col++) {
            this.ctx.moveTo(col * this.cellSize, this.y0);
            this.ctx.lineTo(col * this.cellSize, this.ctx.canvas.height - 1);

        }
        for (let row = 0; row < this.rows; row++) {
            this.ctx.moveTo(this.x0, row * this.cellSize);
            this.ctx.lineTo(this.ctx.canvas.width - 1, row * this.cellSize);

        }



        this.ctx.strokeStyle = "#A9A9A9";

        this.level.forEach((row, rowIndex) => {
            row.forEach((item, colIndex) => {


                if (fieldObjects[item]) {
                    if (item == "r") {
                        console.log("AAAA r:color:", fieldObjects[item].color);
                    }
                    this.ctx.fillStyle = fieldObjects[item].color;
                } else {
                    this.ctx.fillStyle = "#F0F8FF";
                }

                this.ctx.fillRect(colIndex * this.cellSize, rowIndex * this.cellSize, this.cellSize, this.cellSize);
            });

        });


        this.ctx.stroke();
    }

    setHunter() {
        this.level.forEach((row, rowIndex) => {
            row.forEach((item, colIndex) => {
                if (this.level[rowIndex][colIndex] == "h") {
                    this.hunter = new Hunter(colIndex, rowIndex);
                }
            });

        });
    }

    setRogue() {
        this.level.forEach((row, rowIndex) => {
            row.forEach((item, colIndex) => {
                if (this.level[rowIndex][colIndex] == "r") {
                    this.rogue = new Rogue(colIndex, rowIndex);
                }
            });
        });
    }

    forwardTo(x, y, dir) {
        const dirX = direction[dir].x;
        const dirY = direction[dir].y;

        console.log("x:", dirX, "y:", dirY);

        if (this.level[y + dirY][x + dirX] == "w") {
            alert("You died");
            this.level[y][x] = "h";
        };
        if (this.level[y + dirY][x + dirX] != "w" || this.level[y + dirY][x + dirX] == "t") {
            if (this.level[y + dirY][x + dirX] == "t") {
                this.counter++;
                console.log("counter: ", this.counter);
            };
            this.level[y][x] = "0";

            this.hunter.x = x + dirX;
            this.hunter.y = y + dirY;

            this.level[this.hunter.y][this.hunter.x] = "h";
        };
    }

    hunterController(e) {
        const self = this;

        switch (e.keyCode) {
            //up
            case 38:
                console.log("hunter:", self.hunter);
                this.forwardTo(this.hunter.x, this.hunter.y, "up");
                break;
            //down
            case 40:
                console.log("hunter:", self.hunter);
                this.forwardTo(this.hunter.x, this.hunter.y, "down");
                break;
            //left
            case 37:
                console.log("hunter:", self.hunter);
                this.forwardTo(this.hunter.x, this.hunter.y, "left");
                break;
            //right
            case 39:
                console.log("hunter:", self.hunter);
                this.forwardTo(this.hunter.x, this.hunter.y, "right");
                break;
        }

        this.renderField();
    }

    testSearch() {
        this.InitialSearchWave();
        this.searchWaveAll(1);
        console.log(this.level);
    }

    InitialSearchWave() {
        let d = "1"; 

        this.checkAround(this.rogue.x, this.rogue.y, d);
    }

    checkAround(x, y, d) {
        let somethingChanged = false;
        
        if ((x == 0 || x == this.level[0].length - 1) ||
        (y == 0 || y == this.level.length - 1)) {
            return somethingChanged;
        }
        
        console.log("hue> x:", x, "y:", y, "d:", d);

        if (this.level[y - 1][x] == "0") {
            this.level[y - 1][x] = d;
            somethingChanged = true;
            console.log("Я верх");
        }
        if (this.level[y + 1][x] == "0") {
            this.level[y + 1][x] = d;
            somethingChanged = true;
            console.log("Я низ");
        }
        if (this.level[y][x - 1] == "0") {
            this.level[y][x - 1] = d;
            somethingChanged = true;
            console.log("Я лево");
        }
        if (this.level[y][x + 1] == "0") {
            this.level[y][x + 1] = d;
            somethingChanged = true;
            console.log("Я право и");
        }

        return somethingChanged;
    }

    searchWaveAll(d) {
        let curD = String(d);
        let aroundD = String(d + 1);
        let somethingChanged = false;

        this.level.forEach((row, rowIndex) => {
            row.forEach((element, colIndex) => {
                if(element === curD) {
                    console.log("el:", element, "r:", rowIndex, "c:", colIndex);
                }

                if(element === curD && this.checkAround(colIndex, rowIndex, aroundD)) {
                    somethingChanged = true;
                }
            });
        });

        if (somethingChanged) {
            this.searchWaveAll(d + 1);
        }
    }

}