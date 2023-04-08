let slideIndex = 1;
const slides = document.querySelectorAll('.offer__slide'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current')

if(slideIndex < 10){
    total.textContent = `0${slides.length}`
}else{
    total.textContent = slides.length
}
function showSlides(num) {
    if(num > slides.length){
        slideIndex = 1
    }
    if(num < 1){
        slideIndex = slides.length
    }
    slides.forEach(item => {
        item.classList.add('hide')
    })
    slides[slideIndex - 1].classList.remove('hide')
    if(slideIndex < 10){
        total.textContent = `0${slides.length}`
    }else{
        total.textContent = slides.length
    }
}
function plusSlides(n){
    showSlides(slideIndex += n)
}
next.addEventListener('click', () =>{
    plusSlides(-1)
})
prev.addEventListener('click', () =>{
    plusSlides(1)
})

