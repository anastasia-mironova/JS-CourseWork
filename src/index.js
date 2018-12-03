import {Field} from "./modul/field"
import {Hunter} from "./modul/hunter"

const level = [["w", "w", "w", "w", "w", "w", "w", "w"],
              ["w", "h", "0", "w", "0", "0", "0", "w"],
              ["w", "w", "0", "0", "0", "w", "0", "w"],
              ["w", "0", "0", "w", "w", "w", "0", "w"],
              ["w", "0", "r", "w", "t", "0", "0", "w"],
              ["w", "w", "0", "w", "w", "w", "0", "w"],
              ["w", "t", "0", "0", "0" ,"0", "0", "w"],
              ["w", "w", "w", "w", "w", "w", "w", "w"]];

const test =[["w", "w", "w", "w", "w", "w", "w", "w"],
            ["w", "h", "0", "w", "0", "0", "0", "w"],
            ["w", "w", "0", "0", "0", "w", "0", "w"],
            ["w", "0", "0", "w", "w", "w", "0", "w"],
            ["w", "0", "r", "w", "t", "0", "0", "w"],
            ["w", "w", "0", "w", "w", "w", "0", "w"],
            ["w", "t", "0", "0", "0" ,"0", "0", "w"],
            ["w", "w", "w", "w", "w", "w", "w", "w"]];

const testLevel = [
    ["w", "w", "w", "w", "w", "w"],
    ["w", "0", "0", "0", "0", "w"],
    ["w", "w", "0", "w", "0", "w"],
    ["w", "0", "r", "0", "w", "w"],
    ["w", "0", "w", "0", "0", "w"],
    ["w", "w", "w", "w", "w", "w"]
];

let kek = new Field(level);
let searchTestField = new Field(testLevel);

searchTestField.renderField();
searchTestField.testSearch();
console.log(searchTestField.level);

// kek.renderField();

//kek.searchRogoeWay(test);
// addEventListener("keydown",kek.hunterController);



