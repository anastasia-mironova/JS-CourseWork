import { Field } from "./modul/field"
import { Hunter } from "./modul/hunter"
import { Score } from './modul/Score';
import { Menu } from './modul/Menu';
import './style.css';

const levels = [
    [["w", "w", "w", "w", "w", "w", "w", "w"],
    ["w", "h", "0", "w", "0", "0", "0", "w"],
    ["w", "w", "0", "0", "0", "w", "0", "w"],
    ["w", "0", "0", "w", "w", "w", "0", "w"],
    ["w", "0", "r", "w", "t", "0", "0", "w"],
    ["w", "w", "0", "w", "w", "w", "0", "w"],
    ["w", "t", "0", "0", "0", "0", "0", "w"],
    ["w", "w", "w", "w", "w", "w", "w", "w"]],
    [["w", "w", "w", "w", "w", "w"],
    ["w", "t", "0", "0", "0", "w"],
    ["w", "w", "0", "w", "h", "w"],
    ["w", "0", "0", "0", "w", "w"],
    ["w", "r", "w", "0", "0", "w"],
    ["w", "w", "w", "w", "w", "w"]]
];

const menuPreviewElement = document.querySelector('#menu-preview-el');
const menuPreview = new Menu(menuPreviewElement);

const menuElement = document.querySelector('#menu-el');
const menu = new Menu(menuElement);

const scoreElement = document.querySelector("#score-el");
const score = new Score(scoreElement);

// let searchTestField = new Field(testLevel);

//  searchTestField.renderField();
//  console.log(searchTestField.level);
// searchTestField.rougueController();

// const menuPreviewElement = document.querySelector('#menu-preview-el');
// const menuPreview = new Menu(menuPreviewElement);

let kek;
let kekStoper;

score.level = 1;

let myEvent = new Event("arbidol");
addEventListener("arbidol", function () {
    
    finalizeField(kek);
    
    initField(levels[+score.level]);
    
    score.incLevel();
  
    setTimeout(function() {
        kek.renderField();
    }, 1);
});

initField(levels[0]);

function initField(level) {
    
    kek = new Field(level, score, myEvent);
    addEventListener("keydown", kek.hunterController);
  
    // kekStoper = kek.rougueController();
    console.log("kek:", kek);
    kek.renderField();
}

function finalizeField(field) {
    // field.ctx.fillStyle = "#F0F8FF";
    
    field.ctx.clearRect(0, 0, field.ctx.canvas.width, field.ctx.canvas.height);
    removeEventListener("keydown", field.hunterController);
   
    clearInterval(kekStoper);
   
}