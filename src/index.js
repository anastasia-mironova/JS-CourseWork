import {Field} from "./modul/field"
import {Hunter} from "./modul/hunter"

let kek = new Field();
kek.renderField();
let lol = new Hunter();
kek.addObject(lol);
console.log(kek.objects);
let i = 90;
let timer = setInterval(function(){
    kek.renderField()
    lol.renderHunter(i,90);
   i += 90;
},2000)