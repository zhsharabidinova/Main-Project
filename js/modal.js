const footer = document.querySelector('.footer')
const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const closeModal = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}


const closeMod = () =>{
    modal.style.display = 'none'
    document.body.style.overflow = ''
}
closeModal.onclick = () =>{
    closeMod()
}

modalTrigger.onclick = () => openModal()
closeModal.addEventListener('click', closeMod)
modal.onclick = (event) => {
    if(event.target === modal){
        closeMod()
    }
}
scrollOpen = () =>{
    if(window.scrollY + window.innerHeight >= footer.offsetTop){
        autoModal()
    }
}

let modalOpened = false
const autoModal = () =>{
    if(!modalOpened){
        modalOpened = true
        openModal()
        window.removeEventListener('scroll', scrollOpen )
    }
}

footerScroll = () =>{
    openModal()
    window.removeEventListener('scroll', scrollOpen)
}
window.addEventListener('scroll',scrollOpen)
setTimeout(autoModal, 10000)