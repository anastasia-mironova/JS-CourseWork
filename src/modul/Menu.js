export class Menu {
    constructor(el, event, rec) {
        this.startgame = event ? event : null;
        this.recordsEvent = rec ? rec : null;

        console.log("Ну харо", this.recordsEvent);

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

        this.start = this.start.bind(this);
        this.records = this.records.bind(this);
    }

    start() {
        console.log("click start");
        const current = document.querySelector('.preview');
        const game = document.querySelector('.game');

        current.classList.add("disabled");
        game.classList.remove("disabled");
        console.log("this.startgame", this.startgame);
        dispatchEvent(this.startgame);
    }
    
    records() {
        const preview = document.querySelector('.preview');
        const records = document.querySelector('.records-el');
        const game = document.querySelector('.game');
        
        console.log("our records:", records);

        preview.classList.add("disabled");
        records.classList.remove("disabled");
        game.classList.add("disabled");

        dispatchEvent(this.recordsEvent);

        
    }
    
    exit() {
        console.log("click exit");
        const preview = document.querySelector('.preview');
        const records = document.querySelector('.records-el');
        const game = document.querySelector('.game');
        
        preview.classList.remove("disabled");
        records.classList.add("disabled");
        game.classList.add("disabled");
    }
    
    pause() {
        console.log("click pause");
    }
}