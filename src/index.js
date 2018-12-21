import { Field } from "./modul/field"
import { Hunter } from "./modul/hunter"
import { Score } from './modul/Score';
import { Menu } from './modul/Menu';
import { Record } from './modul/Record';
import './style.css';
import { cloneDeep } from 'lodash';



const initialLevel = [
["w", "w", "w", "w", "w", "w", "w", "w"],
["w", "h", "e", "w", "e", "e", "e", "w"],
["w", "w", "e", "e", "e", "w", "e", "w"],
["w", "e", "e", "w", "w", "w", "e", "w"],
["w", "e", "r", "w", "t", "e", "e", "w"],
["w", "w", "e", "w", "w", "w", "e", "w"],
["w", "t", "e", "e", "e", "e", "e", "w"],
["w", "w", "w", "w", "w", "w", "w", "w"]];

const levels = [
    //1
    [["w", "w", "w", "w", "w", "w", "w", "w"],
    ["w", "h", "e", "w", "e", "e", "e", "w"],
    ["w", "w", "e", "e", "e", "w", "e", "w"],
    ["w", "e", "e", "w", "w", "w", "e", "w"],
    ["w", "e", "r", "w", "t", "e", "e", "w"],
    ["w", "w", "e", "w", "w", "w", "e", "w"],
    ["w", "t", "e", "e", "e", "e", "e", "w"],
    ["w", "w", "w", "w", "w", "w", "w", "w"]],
    //2
    [["w", "w", "w", "w", "w", "w"],
    ["w", "t", "e", "e", "e", "w"],
    ["w", "w", "e", "w", "h", "w"],
    ["w", "e", "e", "e", "w", "w"],
    ["w", "r", "w", "e", "e", "w"],
    ["w", "w", "w", "w", "w", "w"]],
    //3
    [["w", "w", "w", "w", "w", "w", "w", "w"],
    ["w", "e", "e", "w", "h", "e", "r", "w"],
    ["w", "e", "e", "e", "e", "w", "e", "w"],
    ["w", "e", "e", "w", "e", "w", "e", "w"],
    ["w", "e", "w", "w", "t", "e", "e", "w"],
    ["w", "w", "w", "e", "w", "w", "e", "w"],
    ["w", "t", "e", "e", "e", "t", "e", "w"],
    ["w", "w", "w", "w", "w", "w", "w", "w"]]
    ,
    //4
    [["w", "w", "w", "w", "w", "w", "w", "w"],
    ["w", "r", "w", "t", "w", "e", "t", "w"],
    ["w", "e", "w", "e", "e", "e", "e", "w"],
    ["w", "e", "w", "e", "t", "e", "e", "w"],
    ["w", "e", "w", "e", "e", "e", "e", "w"],
    ["w", "e", "w", "w", "t", "e", "w", "w"],
    ["w", "e", "t", "e", "e", "e", "e", "w"],
    ["w", "e", "e", "e", "e", "h", "e", "w"],
    ["w", "e", "e", "e", "w", "e", "e", "w"],
    ["w", "w", "w", "w", "w", "w", "w", "w"]],
    //5
    [["w", "w", "w", "w", "w", "w", "w"],
    ["w", "t", "e", "h", "e", "t", "w"],
    ["w", "e", "e", "e", "e", "e", "w"],
    ["w", "e", "e", "e", "e", "e", "w"],
    ["w", "e", "e", "r", "e", "e", "w"],
    ["w", "e", "e", "e", "e", "e", "w"],
    ["w", "t", "e", "e", "e", "t", "w"],
    ["w", "w", "w", "w", "w", "w", "w"]],
    //6
    [["w", "w", "w", "w", "w", "w", "w", "w"],
    ["w", "h", "e", "e", "e", "e", "t", "w"],
    ["w", "e", "e", "e", "e", "e", "e", "w"],
    ["w", "w", "w", "e", "e", "w", "w", "w"],
    ["w", "r", "e", "e", "e", "e", "e", "w"],
    ["w", "w", "w", "w", "t", "e", "e", "w"],
    ["w", "e", "t", "w", "w", "e", "e", "w"],
    ["w", "e", "e", "e", "e", "e", "e", "w"],
    ["w", "t", "e", "e", "e", "e", "e", "w"],
    ["w", "w", "w", "w", "w", "w", "w", "w"]],
    //7
    [["w", "w", "w", "w", "w","w"],
    ["w", "e", "t", "e", "e","w"],
    ["w", "e", "e", "e", "e","w"],
    ["w", "e", "r", "e", "e","w"],
    ["w", "t", "e", "e", "t","w"],
    ["w", "e", "e", "e", "e","w"],
    ["w", "h", "e", "e", "e","w"],
    ["w", "w", "w", "w", "w","w"]],
    //8
    [["w", "w", "w", "w", "w", "w", "w", "w"],
    ["w", "e", "e", "t", "e", "e", "t", "w"],
    ["w", "e", "e", "e", "e", "e", "e", "w"],
    ["w", "e", "w", "e", "w", "w", "w", "w"],
    ["w", "r", "e", "e", "e", "e", "e", "w"],
    ["w", "e", "w", "e", "t", "e", "e", "w"],
    ["w", "e", "e", "w", "w", "e", "e", "w"],
    ["w", "e", "e", "e", "e", "e", "e", "w"],
    ["w", "t", "e", "e", "e", "e", "h", "w"],
    ["w", "w", "w", "w", "w", "w", "w","w"]],
    //9
    [["w", "w", "w", "w", "w","w"],
    ["w", "t", "e", "r", "t","w"],
    ["w", "e", "e", "e", "e","w"],
    ["w", "e", "e", "e", "e","w"],
    ["w", "e", "w", "h", "e","w"],
    ["w", "e", "w", "e", "e","w"],
    ["w", "e", "w", "e", "e","w"],
    ["w", "w", "w", "w", "w","w"]],
    //10
    [["w", "w", "w", "w", "w", "w", "w", "w"],
    ["w", "e", "e", "w", "e", "e", "t", "w"],
    ["w", "w", "e", "e", "e", "e", "r", "w"],
    ["w", "w", "w", "e", "e", "w", "w", "w"],
    ["w", "t", "e", "e", "e", "e", "e", "w"],
    ["w", "w", "w", "w", "t", "e", "e", "w"],
    ["w", "h", "t", "w", "w", "e", "e", "w"],
    ["w", "e", "e", "e", "e", "t", "e", "w"],
    ["w", "w", "e", "e", "e", "e", "e", "w"],
    ["w", "w", "w", "w", "w", "w", "w", "w"]],
];

let self = this;
let levelField;
let levelFieldStoper;

let pauseEvent = new Event("pauseevent");
addEventListener("pauseevent", function() {
    console.log("Настало время сделать паузу");
});

let gameStartEvent = new Event("startgame");
addEventListener("startgame", function () {
    if (levelField) {
        finalizeField(levelField);
        
    }

    initField(cloneDeep(initialLevel));
    // levelField.paused = !levelField.paused;

    setTimeout(function () {
        levelField.renderField();
    }, 1);
});

let recordsEvent = new Event("recordsClicked");
addEventListener("recordsClicked", function () {
 

    const table = document.querySelector("#table-content");
    

    const tableElements = table.querySelectorAll(".el");

   

    const records = getRecords();

    tableElements.forEach((elem, index) => {
        elem.children[0].innerText = index + 1;
        elem.children[1].innerText = records[index].name;
        elem.children[2].innerText = records[index].value;
    });
});

const menuPreviewElement = document.querySelector('#menu-preview-el');
const menuPreview = new Menu(menuPreviewElement, gameStartEvent, recordsEvent, recordsEvent);

const menuElement = document.querySelector('#menu-el');
const menu = new Menu(menuElement);

const scoreElement = document.querySelector("#score-el");
const score = new Score(scoreElement);



score.level = 1;

let myEvent = new Event("arbidol");
addEventListener("arbidol", function () {

    finalizeField(levelField);

    const currentLevel = +score.level;

    if (currentLevel == levels.length ) {
        levelField.renderField(); 
        endGame();
    }

    initField(cloneDeep(levels[currentLevel]));

    score.incLevel();

    setTimeout(function () {
        levelField.renderField();
    }, 1);
});



function initField(level) {
    
    levelField = new Field(level, score, myEvent, diedEvent);
    addEventListener("keydown", levelField.hunterController);

    levelFieldStoper = levelField.rougueController();
    levelField.renderField();
}

function finalizeField(field) {
    field.ctx.clearRect(0, 0, field.ctx.canvas.width, field.ctx.canvas.height);
    removeEventListener("keydown", field.hunterController);

    clearInterval(levelFieldStoper);
}

let diedEvent = new Event("hunterDied");
addEventListener("hunterDied", function () {
    hunterDied();
    
})

function hunterDied() {
    alert("Ваши полномочия всё, окончены");
    const name = prompt("Ваше имя", " ");

    updateRecords(name, score.score);

    finalizeField(levelField);
     
    score.level = 1;
    score.score = 0;
    levelField.paused = !levelField.paused;
    const preview = document.querySelector('.preview');
    const records = document.querySelector('.records-el');
    const game = document.querySelector('.game');

    preview.classList.remove("disabled");
    records.classList.add("disabled");
    game.classList.add("disabled");
}

function updateRecords(name, record) {

    let newRecord = new Record(name, record);

    const records = getRecords();

    records.push(newRecord);

    records.sort((a, b) => b.value - a.value);
    records.splice(10);

    setRecords(records);
}



function getRecords() {
    const nameStrArr = localStorage["name"] || "";
    const valueStrArr = localStorage["value"] || "";

    const nameArr = nameStrArr.split(",");
    const valueArr = valueStrArr.split(",");

    const length = nameArr.length;

    let records = [];

    for (let i = 0; i < length; i++) {
        records[i] = new Record(nameArr[i], valueArr[i]);
    }

    return records;
}

function setRecords(records) {
    let names = [];
    let values = [];

    const length = records.length;

    for (let i = 0; i < length; i++) {
        names[i] = records[i].name;
        values[i] = records[i].value;
    }

    localStorage.setItem("name", names);
    localStorage.setItem("value", values);
}

document.querySelector(".records_exit").addEventListener("click", function () {
    const preview = document.querySelector('.preview');
    const records = document.querySelector('.records-el');
    const game = document.querySelector('.game');

    preview.classList.remove("disabled");
    records.classList.add("disabled");
    game.classList.add("disabled");
});

document.querySelector(".pause").addEventListener("click", function() {
    levelField.paused = !levelField.paused;
});

document.querySelector(".exit").addEventListener("click", function(){
    console.log("click exit");
        const preview = document.querySelector('.preview');
        const records = document.querySelector('.records-el');
        const game = document.querySelector('.game');
        
        preview.classList.remove("disabled");
        records.classList.add("disabled");
        game.classList.add("disabled");
        
    levelField.paused = !levelField.paused;
});

function endGame() {
    
    alert("This is the end");
    const name = prompt("Ваше имя", " ");

    updateRecords(name, score.score);

    finalizeField(levelField);
    
   
    
    const preview = document.querySelector('.preview');
    const records = document.querySelector('.records-el');
    const game = document.querySelector('.game');

    preview.classList.remove("disabled");
    records.classList.add("disabled");
    game.classList.add("disabled");
}