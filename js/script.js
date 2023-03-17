window.addEventListener('DOMContentLoaded', () =>{
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
    const deadline = '2023-03-18'
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
          btn = document.querySelectorAll('.btn'),
          closeBtn = modal.querySelector('.modal__close')

    
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
    closeBtn.addEventListener('click', closeModal)
    modal.addEventListener('click', (e) =>{
        if(e.target === modal){
            closeModal()
        }
    })
    const modalTimer = setTimeout(openModal, 30000)
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
    
})