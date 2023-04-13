function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector), //ФИТНЕС ПРЕМИУМ СБАЛАНСИРОВАННОЕ
    tabsContent = document.querySelectorAll(tabsContentSelector), //КАРТИНКА И ОПИСАНИЕ ТАБА
    tabsParent = document.querySelector(tabsParentSelector) //ОБЛАСТЬ ПЕРЕКЛЮЧЕНИЯ
    function hideTabContent() { 
        
        tabsContent.forEach(item => { 
            item.classList.add('hide'); //СКРЫВАЕМ КАРТИНКУ И ОПИСАНИЕ С ПОМОЩЬЮ КЛАССА
            item.classList.remove('show', 'fade') //УДАЛЯЕМ КЛАССЫ ПОКАЗА СОДЕРЖИМОГО ТАБА И АНИМАЦИЮ ПЕРЕХОДА
        });

        tabs.forEach(item => { 
            item.classList.remove(activeClass) // УБИРАЕМ КЛАСС АКТИВНОСТИ У БЫВШЕ-АКТИВНОГО ЭЛЕМЕНТА
        });    
    }
    function showTabContent(i = 0) { // I=0 ЗНАЧЕНИЕ ПО УМОЛЧАНИЮ ЕСЛИ ПРИ ВЫЗОВЕ ФУНКЦИИ НЕ БЫЛО ПЕРЕДАНО ПАРАМЕТРОВ
        tabsContent[i].classList.add('show', 'fade') // ДОБАВЛЯЕМ ПЕРЕКЛЮЧЕНИЕ ТАБА С ПОМОЩЬЮ КЛАССА ПОКАЗА
        tabsContent[i].classList.remove('hide') //УДАЛЯЕМ КЛАСС СКРЫТНОСТИ ЭЛЕМЕНТА
        tabs[i].classList.add(activeClass) //ДОБАВЛЯЕМ КЛАСС АКТИВНОСТИ ЭЛЕМЕНТА
    }
    hideTabContent();
    showTabContent();
    tabsParent.addEventListener('click', function(event) {  //ДОБАВЛЕНИЕ ОБРАБОТЧИКА СОБЫТИЙ
        const target = event.target; //СОЗДАНИЕ ПЕРЕМЕННОЙ В ЦЕЛЯХ СОКРАЩЕНИЯ 
        if(target && target.classList.contains(tabsSelector.slice(1))) { //
            tabs.forEach((item, i) => { //
                if (target == item) { //
                    hideTabContent() //
                    showTabContent(i) //
                }
            });
        }
    });
}
export default tabs