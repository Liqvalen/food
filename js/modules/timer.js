function timer(id, deadline) {
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
    setClock(id, deadline)
}
export default timer