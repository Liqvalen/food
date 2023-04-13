// get'теры и set'теры

// const persone = {
//     name: "alex",
//     age: 25,

//     get userAge() {
//         return this.age
//     },

//     set userAge(num) {
//         this.age = num
//     }
// }

// console.log(persone.userAge = 30);
// console.log(persone.userAge);



//Инкапсуляция

// function User(name, age) {
//     this.name = name
//     let userAge = age
//     this.say = function() {
//         console.log(`Имя пользователя: ${this.name}, Возраст: ${userAge} `);
//     }
//     this.getAge = function() {
//         return userAge
//     }
//     this.setAge = function(age) {
//         if(typeof age === 'number' && age > 0 && age < 110) {
//             userAge = age
//         } else {
//             console.log('недопустимое значение');
//         }
//     }
// }
// const ivan = new User('Ivan', 27)
// console.log(ivan.name)
// console.log(ivan.getAge())
// ivan.setAge(30)
// ivan.setAge(300)
// console.log(ivan.getAge())
// ivan.say()
// class User {
//     constructor(name, age) {
//         this.name = name
//         this._age = age
//     }

//     #surname = 'petrychenko'

//     say = () => {
//         console.log(`Имя пользователя: ${this.name} ${this.#surname}, Возраст: ${this._age}`);
//     }
//     get age() {
//         return this._age
//     }
//     set age(age) {
//         if(typeof age === 'number' && age > 0 && age < 110) {
//             this._age = age
//         } else {
//             console.log('недопустимое значение');
//         }
//     }
// }
// const ivan = new User('Ivan', 27)
// console.log(ivan.surname);
// ivan.say()
// class user {
//     constructor(surname) {
//         this._surname = surname
//     }

//     get surname() {
//         return this._surname
//     }
//     set surname(surname) {
//         if(typeof surname === 'string') {
//             this._surname = surname
//         } else {
//             console.log('недопустимое значение');
//         }
//     }
// }
// const newUser = new user('salnikov')
// console.log(newUser.surname);