import {Util} from "./Util"
import {ObjectsField} from "./ObjectsField"

export class Hunter extends ObjectsField{
    constructor(){
        super(Util.cellSize, Util.cellSize, "hunter");
        this.cellSize = Util.cellSize;
         
        
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
    }

    renderHunter(x,y){
        this.ctx.fillStyle = "#8B0000";
        this.ctx.fillRect(x,y,this.cellSize,this.cellSize);
        this.ctx.stroke();
    }

   




}