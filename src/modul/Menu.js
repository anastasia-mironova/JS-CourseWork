export class Menu {
    constructor(el) {
        self = this;
        setTimeout(() => {
            this.startElement = el.querySelector(".start");
            this.recordsElement = el.querySelector(".records");
            this.pauseElement = el.querySelector(".pause");
            this.exitElement = el.querySelector(".exit");

            if (this.startElement) {
                this.startElement.addEventListener("click", this.start);
            }

            if (this.recordsElement) {
                this.recordsElement.addEventListener("click", this.records);
            }

            if (this.pauseElement) {
                this.pauseElement.addEventListener("click", this.pause);
            }
            
            if (this.exitElement) {
                this.exitElement.addEventListener("click", this.exit);
            }
        }, 100);
    }

    start() {
        console.log("click start");
        const current = document.querySelector('.preview');
        const game = document.querySelector('.game');

        current.classList.add("disabled");
        game.classList.remove("disabled");
    }
    
    records() {
        console.log("click records");
    }
    
    exit() {
        console.log("click exit");
        const current = document.querySelector('.preview');
        const game = document.querySelector('.game');
        
        current.classList.remove("disabled");
        game.classList.add("disabled");
    }
    
    pause() {
        console.log("click pause");
    }
}