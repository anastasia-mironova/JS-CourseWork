import {Field} from "./modul/field"
import {Hunter} from "./modul/hunter"
// const level = [[1, 1, 1, 1, 1, 1],
//               [1, 0, "h", 0, 0, 1],
//               [1, 0, 0, 0, 0, 1],
//               [1, "t", 0, 0, 0, 1],
//               [1, 0, 0, 0, 0, 1],
//               [1, 0, 0, 0, 0, 1],
//               [1, 0, 0, 0, "t", 1],
//               [1, 1, 1, 1, 1, 1]];
const level = [["w", "w", "w", "w", "w", "w", "w", "w"],
              ["w", "h", "0", "0", "0", "0", "0", "w"],
              ["w", "w", "0", "0", "0", "0", "0", "w"],
              ["w", "0", "0", "w", "w", "w", "w", "w"],
              ["w", "0", "0", "w", "t", "0", "0", "w"],
              ["w", "w", "0", "w", "w", "w", "0", "w"],
              ["w", "t", "0", "0", "0" ,"0", "0", "w"],
              ["w", "w", "w", "w", "w", "w", "w", "w"]];
let kek = new Field(level);
kek.renderField();
addEventListener("keydown",kek.hunterController);

function update(){
    kek.renderField();
    
}

// setInterval(update,1000)