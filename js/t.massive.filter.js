// МЕТОД filter()
// const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemart']
// const shortNames = names.filter(function(name) {
//     // return name.toLowerCase() НЕ РАБОТАЕТ
//     return name.length < 5
// })
// console.log(shortNames);
// Вывод: ['Ivan', 'Ann']

// МЕТОД map()
// let answers = ['IvAn', 'AnnA', 'Hello']
// answers = answers.map(item => item.toLowerCase())
// console.log(answers) 
// Вывод: ['ivan', 'anna', 'hello']

// МЕТОД every() и some()
// const some = ['qert', 4, 'qqr', 'qweravrasdf']
// console.log(some.some(item => typeof(item) === 'number')) //true
// console.log(some.every(item => typeof(item) === 'number')) //false

// МЕТОД reduce()
// const arr = [4, 5, 1, 3, 2, 6]
//                     // 0        4
//                     // 4        5
//                     // 9        1
//                     // 10       3
//                     // 13       2
//                     // 15       6
//                     // 21  
// const res = arr.reduce((sum, current) => sum + current, 3)
// console.log(res);

// const arr = ['apple', 'pear', 'plum'] 
// const res = arr.reduce((sum, current) => `${sum}, ${current}`)
// console.log(res);

// Небольшая практика
// const obj = {
//     ivan: 'persone',
//     ann:'persone',
//     dog: 'animal',
//     cat: 'animal'
// }
// const newArr = Object.entries(obj)
// .filter(item => item[1] === 'persone')
// .map(item => item[0])
// console.log(newArr);