import {Field} from "./modul/field"
import {Hunter} from "./modul/hunter"

let kek = new Field();
kek.renderField();
let lol = new Hunter();

let i = 30;
let timer = setInterval(function(){
    kek.renderField()
    lol.renderHunter(i,30);
   i += 30;
},2000)