import { Hunter } from "./Hunter"
import { throws } from "assert";
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
        console.log("hunter1:", this.hunter);
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
                    console.log("j:", colIndex, "i:", rowIndex);
                    this.hunter = new Hunter(colIndex, rowIndex);
                }
            });

        });
    }

    forwardTo(x, y, dir) {
        const dirX = direction[dir].x;
        const dirY = direction[dir].y;

        console.log("x:", dirX, "y:", dirY);

        if (this.level[y + dirY][x+dirX] == "w") {
            console.log("ты пидор");
            alert("You died");
            this.level[y][x] = "h";
        };
        if (this.level[y + dirY][x+dirX] == "0" || this.level[y + dirY][x+dirX] == "t") {
            if (this.level[y + dirY][x+dirX] == "t") {
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
        // this.forwardTo(1, 1, "up");
        const self = this;

        switch (e.keyCode) {
            //up
            case 38:
                console.log("hunter:", self.hunter);


                // if (this.level[this.hunter.y - 1][this.hunter.x] == "w") {
                //     console.log("ты пидор");
                //     alert("You died");
                //     this.level[this.hunter.y][this.hunter.x] = "h";
                // };
                // if (this.level[this.hunter.y - 1][this.hunter.x] == "0" || this.level[this.hunter.y - 1][this.hunter.x] == "t") {
                //     if (this.level[this.hunter.y - 1][this.hunter.x] == "t") {
                //         this.counter++;
                //         console.log("counter: ", this.counter);
                //     };
                //     this.level[this.hunter.y][this.hunter.x] = "0";
                //     this.hunter.y = this.hunter.y - 1;
                //     this.level[this.hunter.y][this.hunter.x] = "h";
                // };
                this.forwardTo(this.hunter.x, this.hunter.y, "up");
                break;
            //down
            case 40:
                console.log("hunter:", self.hunter);


                // if (this.level[this.hunter.y + 1][this.hunter.x] == "w") {
                //     console.log("ты пидор");
                //     alert("You died");
                //     this.level[this.hunter.y][this.hunter.x] = "h";
                // };
                // if (this.level[this.hunter.y + 1][this.hunter.x] == "0" || this.level[this.hunter.y + 1][this.hunter.x] == "t") {
                //     if (this.level[this.hunter.y + 1][this.hunter.x] == "t") {
                //         this.counter++;
                //         console.log("counter: ", this.counter);
                //     };
                //     this.level[this.hunter.y][this.hunter.x] = "0";
                //     this.hunter.y = this.hunter.y + 1;
                //     this.level[this.hunter.y][this.hunter.x] = "h";
                // };
                this.forwardTo(this.hunter.x, this.hunter.y, "down");
                break;
            //left
            case 37:
                console.log("hunter:", self.hunter);


                // if (this.level[this.hunter.y][this.hunter.x - 1] == "w") {
                //     console.log("ты пидор");
                //     alert("You died");
                //     this.level[this.hunter.y][this.hunter.x] = "h";
                // };
                // if (this.level[this.hunter.y][this.hunter.x - 1] == "0" || this.level[this.hunter.y][this.hunter.x - 1] == "t") {
                //     if (this.level[this.hunter.y][this.hunter.x - 1] == "t") {
                //         this.counter++;
                //         console.log("counter: ", this.counter);
                //     };
                //     this.level[this.hunter.y][this.hunter.x] = "0";
                //     this.hunter.x = this.hunter.x - 1;
                //     this.level[this.hunter.y][this.hunter.x] = "h";
                // };
                this.forwardTo(this.hunter.x, this.hunter.y, "left");

                break;
            //right
            case 39:
                console.log("hunter:", self.hunter);


                // if (this.level[this.hunter.y][this.hunter.x + 1] == "w") {
                //     console.log("ты пидор");
                //     alert("You died");
                //     this.level[this.hunter.y][this.hunter.x] = "h";
                // }
                // if (this.level[this.hunter.y][this.hunter.x + 1] == "0" || this.level[this.hunter.y][this.hunter.x + 1] == "t") {
                //     if (this.level[this.hunter.y][this.hunter.x + 1] == "t") {
                //         this.counter++;
                //         console.log("counter: ", this.counter);
                //     };
                //     this.level[this.hunter.y][this.hunter.x] = "0";
                //     this.hunter.x = this.hunter.x + 1;
                //     this.level[this.hunter.y][this.hunter.x] = "h";
                // };
                this.forwardTo(this.hunter.x, this.hunter.y, "right");
                break;
        }

        this.renderField();
    }

}