export class Score {
    constructor(el) {
        self = this;

       
        this.levelElement = el.querySelector(".level");
        this.scoreElement = el.querySelector('.score');

        this._level = +this.levelElement.innerText;
        this._score = +this.scoreElement.innerText;
    }
//Получем значение элемента html-страницы с классом “level”
    get level() {
        return +this._level;
    }
//Устанавливем значение элемента html-страницы с классом “level”
    set level(value) {
        this._level = value;
        this.levelElement.innerHTML = value;
    }
//Получаем элемента html-страницы с классом “score”
    get score() {
        return +this._score;
    }
//Устанавливаем значение элемента html-страницы с классом “score”
    set score(value) {
        this._score = value;
        this.scoreElement.innerHTML = value;
    }
//Увеличиваем количество очков на единицу
    incScore() {
        this.score++;
    }
//Увеличиваем значение уровня на единицу
    incLevel() {
        this.level++;
    }
}