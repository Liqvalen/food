// 1) обычная функция: this = window, но если 'use strict' = undefined
// 2) Контекст у методов объекта ссылается на сам объект
// const obj = {
//     a: 20,
//     b: 15,
//     sum: function(){
//         console.log(this);
//     }
// }
// obj.sum()
// 3)this  в конструкторах и классах - новый экземпляр объекта
// 4) Ручная привязка this: call, apply, bind