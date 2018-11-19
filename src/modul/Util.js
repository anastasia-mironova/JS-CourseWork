export class Util{
    // static getCellSize() {
    //     return 30;
    // } 
   static get cellSize(){
        return 30;
    }
    static getCellsCount(size){
        return Math.trunc(size / Util.cellSize);

    }
}