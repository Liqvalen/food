'use strict'

function user(name, id) {
    this.name = name
    this.id = id
    this.human = true
    this.hello = function(){
        console.log(`Hello ${this.name}`);
    }
}
user.prototype.exit = function(){
    console.log(`The user ${this.name} was exit`);
}
const ivan = new user('Ivan', 20)
const alex = new user('Alex', 20)

ivan.exit()
alex.hello()

console.log(ivan)
console.log(alex)

