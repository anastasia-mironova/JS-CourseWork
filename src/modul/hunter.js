import {Util} from "./Util"
export class Hunter{
    constructor(){
        this.cellSize = Util.cellSize;
        this.x0 = Util.cellSize;
        this.y0 = Util.cellSize;

        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
    }

    renderHunter(x,y){
        this.ctx.fillStyle = "#8B0000";
        this.ctx.fillRect(x,y,this.cellSize,this.cellSize);
        this.ctx.stroke();
    }

   




}