export class Score {
    constructor(el) {
        self = this;

       
        this.levelElement = el.querySelector(".level");
        this.scoreElement = el.querySelector('.score');

        this._level = +this.levelElement.innerText;
        this._score = +this.scoreElement.innerText;
    }

    get level() {
        return +this._level;
    }

    set level(value) {
        this._level = value;
        this.levelElement.innerHTML = value;
    }

    get score() {
        return +this._score;
    }

    set score(value) {
        this._score = value;
        this.scoreElement.innerHTML = value;
    }

    incScore() {
        this.score++;
    }

    incLevel() {
        this.level++;
    }
}