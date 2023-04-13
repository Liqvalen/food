//export
export let one = 1

let two = 2
export {two}

export function sayHi() {
    console.log('hello');
}
export default function sayHi() { //экспорт на прямую, пример ниже
    console.log('hello');
} // экспорт по умолчанию(default) может быть использован только один раз
//import
import {one, two} from './main' // указывать .js не обязательно
import {one as first} from './main'
import * as data from './main'
import sayHi from './main' // экспорт без скобок в sayHi
console.log(`${one} and ${two}`); // 1 and 2
console.log(first) //1
console.log(`${data.one} and ${data.two}`); // 1 and 2
data.sayHi() // hello
sayHi() // hello