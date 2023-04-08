window.addEventListener('DOMContentLoaded', () => {
    // tabs
    const tabs = document.querySelectorAll('.tabheader__item'), //ФИТНЕС ПРЕМИУМ СБАЛАНСИРОВАННОЕ
    tabsContent = document.querySelectorAll('.tabcontent'), //КАРТИНКА И ОПИСАНИЕ ТАБА
    tabsParent = document.querySelector('.tabheader__items') //ОБЛАСТЬ ПЕРЕКЛЮЧЕНИЯ

    function hideTabContent() { 
        
        tabsContent.forEach(item => { 
            item.classList.add('hide'); //СКРЫВАЕМ КАРТИНКУ И ОПИСАНИЕ С ПОМОЩЬЮ КЛАССА
            item.classList.remove('show', 'fade') //УДАЛЯЕМ КЛАССЫ ПОКАЗА СОДЕРЖИМОГО ТАБА И АНИМАЦИЮ ПЕРЕХОДА
        });

        tabs.forEach(item => { 
            item.classList.remove('tabheader__item_active') // УБИРАЕМ КЛАСС АКТИВНОСТИ У БЫВШЕ-АКТИВНОГО ЭЛЕМЕНТА
        });    
    }
    function showTabContent(i = 0) { // I=0 ЗНАЧЕНИЕ ПО УМОЛЧАНИЮ ЕСЛИ ПРИ ВЫЗОВЕ ФУНКЦИИ НЕ БЫЛО ПЕРЕДАНО ПАРАМЕТРОВ
        tabsContent[i].classList.add('show', 'fade') // ДОБАВЛЯЕМ ПЕРЕКЛЮЧЕНИЕ ТАБА С ПОМОЩЬЮ КЛАССА ПОКАЗА
        tabsContent[i].classList.remove('hide') //УДАЛЯЕМ КЛАСС СКРЫТНОСТИ ЭЛЕМЕНТА
        tabs[i].classList.add('tabheader__item_active') //ДОБАВЛЯЕМ КЛАСС АКТИВНОСТИ ЭЛЕМЕНТА
    }
    hideTabContent();
    showTabContent();
    tabsParent.addEventListener('click', function(event) {  //ДОБАВЛЕНИЕ ОБРАБОТЧИКА СОБЫТИЙ
        const target = event.target; //СОЗДАНИЕ ПЕРЕМЕННОЙ В ЦЕЛЯХ СОКРАЩЕНИЯ 
        if(target && target.classList.contains('tabheader__item')) { //
            tabs.forEach((item, i) => { //
                if (target == item) { //
                    hideTabContent() //
                    showTabContent(i) //
                }
            });
        }
    });
    //timer
    const deadline = '2023-04-23'
    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()), //РАЗНИЦА В МИЛЛИСЕКУНДАХ 
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60)

        return { //возвращение данных в их обличиях(часах, минутах)
            'total': t,
            'days': days, 
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
        
    }
    function getZero(num){ //нуль перед цифрой
        if(num >= 0 && num < 10){
            return `0${num}`
        } else{
            return num
        }
    }
    function setClock(selector, endtime){ //создание переменных содержащих в себе элементы со страницы
                                            //
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000)//интервал между секундами

        updateClock() //вызов функции до начала отсчета

        function updateClock(){
            const t = getTimeRemaining(endtime)
            //подставление полученных чисел в полученные переменные
            days.innerHTML = getZero(t.days) 
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)


            if(t.total <= 0){ //если время закончилось, то гг
                clearInterval(timeInterval)
            }
        }
                
    }
    setClock('.timer', deadline)
    //modal window
    const modal = document.querySelector('.modal'),
            btn = document.querySelectorAll('.btn')


    function openModal(){
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimer)
    }
    btn.forEach(item => {
        item.addEventListener('click', openModal)
    })
    function closeModal(){
        modal.style.display = 'none'
        document.body.style.overflow = ''
    }
    
    modal.addEventListener('click', (e) =>{
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal()
        }
    })
    const modalTimer = setTimeout(openModal, 300000000000000000)
    document.addEventListener('keydown', (e) =>{
        if(e.code === 'Escape' && modal.style.display === 'block'){
            closeModal()
        }
    })
    function showModalByScroll(){
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }
    window.addEventListener('scroll', showModalByScroll)
    //class(используем классы для карточек)
    class MenuCard{
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.parent = document.querySelector(parentSelector)
            this.transfer = 27
            this.changeToUAH()
            this.classes = classes
        }
        changeToUAH() {
            this.price = this.price * this.transfer
        }

        render(){
            const element = document.createElement('div')
            if(this.classes.length === 0){
                this.element = 'menu__item'
                element.classList.add(this.element)
            }else{
                this.classes.forEach(className => element.classList.add(className))
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `
            this.parent.append(element)
        }
    }
    const getResource = async (url) => {
        const res = await fetch(url)

        if (!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }

        return await res.json()
    }

    // 1 resolve method
    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
    //     })
    // })

    // axios.get('http://localhost:3000/menu')
    // .then(data => {
    //     data.data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
    //     })
    // })

    // 2 resolve method 
    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data))
    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div')
    //         price = price * 27
    //         element.classList.add('menu__item')
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `
    //         document.querySelector('.menu .container').append(element)
    //     })
    // }
    // forms
    const forms = document.querySelectorAll('form')
    const massage = {
        loading: 'img/forms/054 spinner.svg',
        success: 'Спасибо! мы скоро с вами свяжемся',
        failer: 'Что-то пошло не так...'
    }

    forms.forEach(item =>{
        bindPostData(item)
    })

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }, 
            body: data
        })
        return await res.json()
    }

    function bindPostData(form){
        form.addEventListener('submit', (e) =>{
            e.preventDefault()
                
            const statusMassage = document.createElement('img')
            statusMassage.src = massage.loading
            statusMassage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.append(statusMassage)
            form.insertAdjacentElement('afterend', statusMassage)

            const formData = new FormData(form)

            const json = JSON.stringify(Object.fromEntries(formData.entries()))
            
            // postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(massage.success)
                statusMassage.remove()
            }).catch(() => {
                showThanksModal(massage.failer)
            }).finally(() => {
                form.reset()
            })
        })
    }
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')
        prevModalDialog.classList.add('hide')
        openModal()

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div> 
            </div>
        `
        document.querySelector('.modal').append(thanksModal)
        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.add('show')
            prevModalDialog.classList.remove('hide')
            closeModal()
        }, 4000)
    }    
    // fetch('http://localhost:3000/menu')
    // .then(data => data.json())
    // .then(res => console.log(res))
    //slider
    let slideIndex = 1;
    let offset = 0
    const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width

    function activeDot() {
        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = 1
    }
    function slideCounter() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }
    }
    if(slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = slides.length
        current.textContent = slideIndex
    }

    slidesField.style.width = 100 * slides.length + '%'
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'
    slidesWrapper.style.overflow = 'hidden'

    slides.forEach(slide => {
        slide.style.width = width
    })

    slider.style.position = 'relative'

    const indicators = document.createElement('ol'),
          dots = []
    indicators.classList.add('carousel-indicators')
    slider.append(indicators)
    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to', i + 1)
        dot.classList.add('dot')
        if(i == 0){
            dot.style.opacity = 1
        }
        indicators.append(dot)
        dots.push(dot)
    }

    next.addEventListener('click', () => {
        if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)){
            offset = 0
        } else {
            offset += +width.slice(0, width.length - 2)
        }
        slidesField.style.transform = `translateX(-${offset}px)`

        if(slideIndex == slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }
        slideCounter()
        activeDot()
    })
    prev.addEventListener('click', () => {
        if(offset == 0){
            // offset = 0
            offset = +width.slice(0, width.length - 2) * (slides.length - 1)
        } else {
            offset -= +width.slice(0, width.length - 2)
        }
        slidesField.style.transform = `translateX(-${offset}px)`

        if(slideIndex == 1) {
            slideIndex = slides.length
        } else {
            slideIndex--
        }
        slideCounter()
        activeDot()
    })

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')

            slideIndex = slideTo
            offset = +width.slice(0, width.length - 2) * (slideTo - 1)
            slidesField.style.transform = `translateX(-${offset}px)`

            slideCounter()
            activeDot()    
        })
    })

})



