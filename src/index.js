import { Field } from "./modul/field"
import { Hunter } from "./modul/hunter"
import { Score } from './modul/Score';
import { Menu } from './modul/Menu';
import { Record } from './modul/Record';
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

let self = this;
let kek;
let kekStoper;

let gameStartEvent = new Event("startgame");
addEventListener("startgame", function() {
    initField(levels[0]);
});

let recordsEvent = new Event("recordsClicked");
addEventListener("recordsClicked", function() {
    console.log("records clicked");

    const table = document.querySelector("#table-content");
    console.log("table:", table);

});

const menuPreviewElement = document.querySelector('#menu-preview-el');
const menuPreview = new Menu(menuPreviewElement, gameStartEvent, recordsEvent);

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

// initField(levels[0]);

function initField(level) {
    
    kek = new Field(level, score, myEvent, diedEvent);
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

let diedEvent = new Event("hunterDied");
addEventListener("hunterDied", function() {
    hunterDied();
})

function hunterDied() {
    alert("Ваши полномочия всё, окончены");
    const name = prompt("Ваше имя", "Пидор");

    updateRecords(name, score.score);
    showLocalStorage();

    finalizeField();
}

function updateRecords(name, record) {
    console.log("update records function > name:", name, "record:", record);

    let newRecord = new Record(name, record);
    
    const nameStrArr = localStorage["name"];
    const valueStrArr = localStorage["value"];

    const nameArr = nameStrArr.split(",");
    const valueArr = valueStrArr.split(",");

    const length = nameArr.length;

    let records = [];

    for (let i = 0; i < length; i++) {
        records[i] = new Record(nameArr[i], valueArr[i]);
    }

    records.push(newRecord);

    console.log("new records:", records);

    records.sort((a, b) => b.value - a.value);
    records.splice(10);

    let newNameArr = [];
    let newValueArr = [];

    const newLength = records.length;

    for (let i = 0; i < newLength; i++) {
        newNameArr[i] = records[i].name;
        newValueArr[i] = records[i].value;
    }

    console.log("newName:", newNameArr);
    console.log("newValue:", newValueArr);

    localStorage.setItem("name", newNameArr);
    localStorage.setItem("value", newValueArr);
}

function showLocalStorage() {
    console.log("show local storage:", localStorage);
}