'use strict'
// new RegExp('pattern', 'flags')
// /pattern/f

const ans = prompt('введите число')

const reg = /\d/

// i - независимо от регистра
// g - нескольких вхождений
// m - многострочный режим
// \d(digits) - поиск только цифр
// \w - ищем все буквы
// \s(spaces) - ищем все пробелы
// \D - поиск не чисел
// \W - поиск не букв

// const str = 'My name is R2D2'
// console.log(str.match(/\w\d\w\d/i));



// console.log(ans.match(reg));


console.log(ans.match(reg))
// console.log(ans.search(reg))

// const pass = prompt('password')
// console.log(pass.replace(/\./g, '*'))
// console.log('12-34-56'.replace(/-/g, ':'))

