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
    const deadline = '2023-03-23'
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
    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        // 'menu__item',
        // 'big'
    ).render()
    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item'
    ).render()
    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',
        'menu__item'
    ).render()
    
    // forms
    const forms = document.querySelectorAll('form')
    const massage = {
        loading: 'img/forms/054 spinner.svg',
        success: 'Спасибо! мы скоро с вами свяжемся',
        failer: 'Что-то пошло не так...'
    }

    forms.forEach(item =>{
        postData(item)
    })
    function postData(form){
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

            const object = {}
            formData.forEach(function(value,key){
                object[key] = value
            })
            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                }, 
                body: JSON.stringify(object)
            }).then(data => data.text())
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
})