import { cloneDeep } from 'lodash';

import { Hunter } from "./Hunter";
import { Rogue } from "./Rogue";
import { Point } from './Point';
import data from './data';

const fieldObjects = data.fieldObjects;
const direction = data.direction;


export class Field {
    constructor(level, score, myEvent, diedEvent) {
        this.paused = false;
        this.score = score;
        this.myEvent = myEvent;
        this.diedEvent = diedEvent;

        this.x0 = 0;
        this.y0 = 0;

        this.rows = level.length;
        this.cols = level[0].length;

        this.ctx = this.setupCanvas("myCanvas", "2d");


        this.initialLevel = level;
        this.level = level;
        this.setHunter();
        this.setRogue();
        this.treasureCount = this.getTreasure();
        this.hunterController = this.hunterController.bind(this);
        this.rougueController = this.rougueController.bind(this);
        this.counter = 0;
        this.rogueImage = document.querySelector(".marsianin");

        this.testSearch();
    }

    //Определение размеров холста Canvas в зависимости от размеров окна 
    setupCanvas(id, context) {
        let canvas = document.getElementById(id);
        let parent = canvas.parentElement;
        let ctx = canvas.getContext(context);


        const levelRatio = this.cols / this.rows;
        const windowRatio = parent.clientWidth / parent.clientHeight;

        // По высоте
        if (windowRatio > levelRatio) {
            ctx.canvas.height = parent.clientHeight;
            ctx.canvas.width = ctx.canvas.height * levelRatio;
            // По ширине
        } else {
            ctx.canvas.width = parent.clientWidth;
            ctx.canvas.height = ctx.canvas.width / levelRatio;
        }

        if (this.cols > this.rows) {
            this.cellSize = Math.round(ctx.canvas.width / this.cols);
        } else {
            this.cellSize = Math.round(ctx.canvas.height / this.rows);
        }

        return ctx;
    }

    //Отрисовка элементов игрового поля
    renderField() {

        this.ctx.beginPath();
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

                    let img = new Image();
                    img.onload = function () { // Событие которое будет исполнено в момент когда изображение будет загружено
                        console.log("loaded");
                        self.ctx.drawImage(img, colIndex * self.cellSize, rowIndex * self.cellSize, self.cellSize, self.cellSize);
                    }
                    // Загружаем файл изображения
                    img.src = fieldObjects[item].src;



                } else {
                    this.ctx.fillStyle = "#F0F8FF";
                }
                const self = this;
                //  console.log("hfjf");

                this.ctx.fillRect(colIndex * this.cellSize, rowIndex * this.cellSize, this.cellSize, this.cellSize);
            });

        });


        this.ctx.closePath();

        this.ctx.stroke();
    }

    //
    getTreasure() {
        let treasureCount = 0;
        this.level.forEach((row, rowIndex) => {
            row.forEach((item, colIndex) => {

                if (this.level[rowIndex][colIndex] == "t") {
                    treasureCount++;
                }
            });

        });
        return treasureCount;
    }
    //Инициализация координат «Охотника», являющегося экзепляром класса Hunter
    setHunter() {
        this.level.forEach((row, rowIndex) => {
            row.forEach((item, colIndex) => {
                if (this.level[rowIndex][colIndex] == "h") {
                    this.hunter = new Hunter(colIndex, rowIndex);
                }
            });

        });
    }
    //Инициализация координат «Разбойника», являющегося экзепляром класса Rogue
    setRogue() {
        this.level.forEach((row, rowIndex) => {
            row.forEach((item, colIndex) => {
                if (this.level[rowIndex][colIndex] == "r") {
                    this.rogue = new Rogue(colIndex, rowIndex);
                }
            });
        });
    }
    //Изменение значений элементов матрицы уровня в зависимости от напрвления движения «Охотника»
    forwardTo(x, y, dir) {
        if (!this.paused) {
            const dirX = direction[dir].x;
            const dirY = direction[dir].y;

            if (this.level[y + dirY][x + dirX] == "w" || this.level[y + dirY][x + dirX] == "r") {
                dispatchEvent(this.diedEvent);
                this.level[y][x] = "h";
            };
            if (this.level[y + dirY][x + dirX] != "w" || this.level[y + dirY][x + dirX] == "t") {
                if (this.level[y + dirY][x + dirX] == "t") {
                    this.counter++;
                    this.score.incScore();
                    if (this.checkEndless(this.counter)) {

                        dispatchEvent(this.myEvent);
                    }
                };
                this.level[y][x] = "e";

                this.hunter.x = x + dirX;
                this.hunter.y = y + dirY;

                this.level[this.hunter.y][this.hunter.x] = "h";
            };
        }
    }
    //Проверка столкновения «Охтника» с «Разбойником»
    hunterAlive() {
        return !(this.rogue.x === this.hunter.x && this.rogue.y === this.hunter.y);
    }
    //Движение «Разбойника» за «Охотником»
    rougueController() {
        let stoper = setInterval(() => {
            if (!this.paused) {
                const shortest = this.testSearch();

                this.level[this.rogue.y][this.rogue.x] = "e";

                this.rogue.x = shortest[0].x;
                this.rogue.y = shortest[0].y;

                this.level[this.rogue.y][this.rogue.x] = "r";

                this.renderField();

                if (!this.hunterAlive()) {
                    dispatchEvent(this.diedEvent);
                }
            }


        }, 800);

        return stoper;
    }
    //Обработчик нажатия клавиш для движения «Охотника»
    hunterController(e) {

        const self = this;

        switch (e.keyCode) {
            //up
            case 38:

                this.forwardTo(this.hunter.x, this.hunter.y, "up");
                break;
            //down
            case 40:

                this.forwardTo(this.hunter.x, this.hunter.y, "down");
                break;
            //left
            case 37:

                this.forwardTo(this.hunter.x, this.hunter.y, "left");
                break;
            //right
            case 39:

                this.forwardTo(this.hunter.x, this.hunter.y, "right");
                break;
        }


        this.renderField();
    }

    //
    testSearch() {
        let localLevel = cloneDeep(this.level);
        let shortestWay = [new Point(this.hunter.x, this.hunter.y)];

        this.InitialSearchWave(localLevel);
        this.searchWaveAll(localLevel, 1);

        this.InitialFoundWay(localLevel, shortestWay);
        this.foundWayAll(localLevel, shortestWay);

        return shortestWay;
    }
    //Инициализация стартовой ячейки для реализации волнового алгоритма 
    InitialSearchWave(localArr) {
        let d = "1";

        this.checkAround(localArr, this.rogue.x, this.rogue.y, d);
    }
    //Проверка на совпадение с финишной ячейкой
    checkHunterAround(localArr, x, y) {
        if (localArr[y - 1][x] == "h") {
            return true;
        }
        if (localArr[y + 1][x] == "h") {
            return true;
        }
        if (localArr[y][x - 1] == "h") {
            return true;
        }
        if (localArr[y][x + 1] == "h") {
            return true;
        }

        return false;
    }
    // Проверка проходимости ячеек
    checkAround(localArr, x, y, d) {  //d - текущее значение волны 
        let somethingChanged = false;

        if ((x == 0 || x == localArr[0].length - 1) ||
            (y == 0 || y == localArr.length - 1)) {
            return somethingChanged;
        }

        if (localArr[y - 1][x] == "e") {
            localArr[y - 1][x] = d;
            somethingChanged = true;
        }
        if (localArr[y + 1][x] == "e") {
            localArr[y + 1][x] = d;
            somethingChanged = true;
        }
        if (localArr[y][x - 1] == "e") {
            localArr[y][x - 1] = d;
            somethingChanged = true;
        }
        if (localArr[y][x + 1] == "e") {
            localArr[y][x + 1] = d;
            somethingChanged = true;
        }

        return somethingChanged;
    }
    //Изменение стартовой ячейки
    searchWaveAll(localArr, d) {
        let curD = String(d);
        let aroundD = String(d + 1);
        let somethingChanged = false;
        let hunterFounded = false;

        localArr.forEach((row, rowIndex) => {
            row.forEach((element, colIndex) => {
                if (element === aroundD && this.checkHunterAround(localArr, colIndex, rowIndex)) {
                    hunterFounded = true;
                }
                if (element === curD && this.checkAround(localArr, colIndex, rowIndex, aroundD)) {
                    somethingChanged = true;
                }
            });
        });

        if (somethingChanged && !hunterFounded) {
            this.searchWaveAll(localArr, d + 1);
        }
    }
    //Инициализация финишной ячейки при востановлении пути
    InitialFoundWay(localArr, arr) {
        // let entryPoint = this.foundWayAround(localArr, this.hunter.x, this.hunter.y);
        let x = this.hunter.x;
        let y = this.hunter.y;

        let minStepAround;
        let truthPoint;

        let counter = 0;

        if (!fieldObjects.hasOwnProperty(localArr[y - 1][x]) || localArr[y - 1][x] == "r") {
            counter++;
            if (localArr[y - 1][x] == "r") {
                return;
            }

            minStepAround = +localArr[y - 1][x];
            truthPoint = new Point(x, y - 1);
        }
        // Низ
        if (!fieldObjects.hasOwnProperty(localArr[y + 1][x]) || localArr[y + 1][x] == "r") {
            counter++;
            if (localArr[y + 1][x] == "r") {
                return;
            }

            if (counter == 1) {
                minStepAround = +localArr[y + 1][x];
                truthPoint = new Point(x, y + 1);
            }

            if (minStepAround >= localArr[y + 1][x]) {
                minStepAround = +localArr[y + 1][x];
                truthPoint = new Point(x, y + 1);
            }
        }
        // Лево
        if (!fieldObjects.hasOwnProperty(localArr[y][x - 1]) || localArr[y][x - 1] == "r") {
            counter++;
            if (localArr[y][x - 1] == "r") {
                return;
            }

            if (counter == 1) {
                minStepAround = +localArr[y][x - 1];
                truthPoint = new Point(x - 1, y);
            }
            if (minStepAround > localArr[y][x - 1]) {
                minStepAround = +localArr[y][x - 1];
                truthPoint = new Point(x - 1, y);
            }
        }
        // Право
        if (!fieldObjects.hasOwnProperty(localArr[y][x + 1]) || localArr[y][x + 1] == "r") {
            counter++;
            if (localArr[y][x + 1] == "r") {
                return;
            }

            if (counter == 1) {
                minStepAround = +localArr[y][x + 1];
                truthPoint = new Point(x + 1, y);
            }

            if (minStepAround > localArr[y][x + 1]) {
                minStepAround = +localArr[y][x + 1];
                truthPoint = new Point(x + 1, y);
            }
        }

        truthPoint || dispatchEvent(this.diedEvent);

        // if (entryPoint != "END") {
        arr.unshift(truthPoint);
        // }
    }
    //Рекурсивное повторение предыдущих шагов восстановления пути при реализации волнового алгоритма 
    foundWayAll(localArr, arr) {
        const firstPoint = arr[0];

        let d;

        if (firstPoint) {
            d = localArr[firstPoint.y][firstPoint.x];
        } else {
            debugger;
        }

        const currentPoint = this.foundWayAround(localArr, firstPoint.x, firstPoint.y, d - 1);

        if (currentPoint != "END") {
            arr.unshift(currentPoint);
            this.foundWayAll(localArr, arr);
        }
    }
    //Проверка следующей ячейки на значение d-1, где d- значение в текущей ячейке
    foundWayAround(localArr, x, y, d = -1) {
        if (isNaN(d)) {
            // dispatchEvent(this.diedEvent);
        }

        // Верх
        if (!fieldObjects.hasOwnProperty(localArr[y - 1][x])) {
            if (d != -1) {
                if (localArr[y - 1][x] == d) {
                    return new Point(x, y - 1);
                }
            } else {
                return new Point(x, y - 1);
            }
        }
        // Низ
        if (!fieldObjects.hasOwnProperty(localArr[y + 1][x])) {
            if (d != -1) {
                if (localArr[y + 1][x] == d) {
                    return new Point(x, y + 1);
                }
            } else {
                return new Point(x, y + 1);
            }
        }
        // Лево
        if (!fieldObjects.hasOwnProperty(localArr[y][x - 1])) {
            if (d != -1) {
                if (localArr[y][x - 1] == d) {
                    return new Point(x - 1, y);
                }
            } else {
                return new Point(x - 1, y);
                //    return new Point(x , y);
            }
        }
        // Право
        if (!fieldObjects.hasOwnProperty(localArr[y][x + 1])) {
            if (d != -1) {
                if (localArr[y][x + 1] == d) {
                    return new Point(x + 1, y);
                }
            } else {
                return new Point(x + 1, y);
            }
        }

        return "END";
    }
    //Проверка на завершение уровн(сбор всех «Кладов»)
    checkEndless(count) {
        if (count == this.treasureCount) {
            return true;
        }
        else {
            return false
        }
    }


}