'use strict'

const req = new Promise(function(resolve, reject) {
    setTimeout(() => {
        console.log('Подготовка данных...');
        const product = {
            name: 'TV',
            price: 2000
        }
        resolve(product)
    }, 2000)
})
req.then((product) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = 'order'
            resolve(product)
        }, 2000)
    })
}).then((data) => {
    data.modify = true
    return data
}).then(data => {
    console.log(data); 
}).finally(() => {
    console.log('finally');
})
const test = time => {
    return new Promise(resolve => {
        setTimeout(() => {
            setTimeout(() => resolve(), time)
        })
    })
}
// Promise.all([test(1000), test(2000)]).then(() => {
//     console.log('all');
// }) // Выполняется после последне-выполненного элемента
Promise.race([test(1000), test(2000)]).then(() => {
    console.log('all');
}) // Выполняется после перво-выполненного элемента

// setTimeout(() => {
//     product.status = 'order'
//     console.log(product);
// }, 2000)