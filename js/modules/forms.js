import{closeModal, openModal} from './modal'
import { postData } from '../services/services'

function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector)
    const massage = {
        loading: 'img/forms/054 spinner.svg',
        success: 'Спасибо! мы скоро с вами свяжемся',
        failer: 'Что-то пошло не так...'
    }

    forms.forEach(item =>{
        bindPostData(item)
    })

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
            
            postData('http://localhost:3000/requests', json)
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
        openModal('.modal', modalTimerId)

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
            closeModal('.modal')
        }, 4000)
    }    
    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res))
}

export default forms