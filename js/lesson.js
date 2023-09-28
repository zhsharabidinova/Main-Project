// PHONE VALIDATOR
const phoneInput = document.querySelector('#phone_input'),
    phoneButton = document.querySelector('#phone_button'),
    phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [5792]\d{2} \d{2} \d{2} \d{2}$/

phoneButton.addEventListener('click', () =>{
    if (regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'PASSED'
        phoneResult.style.color = 'green'
    }else {
        phoneResult.innerHTML = 'NOT PASSED'
        phoneResult.style.color = 'red'
    }
})
//TAB SLIDER

const tabContentBLocks = document.querySelectorAll('.tab_content_block')
const tabsItems = document.querySelectorAll('.tab_content_item')
const parentTabs = document.querySelector('.tab_content_items')


const hideTabContent = () =>{
    tabContentBLocks.forEach((tabContentBlock) =>{
        tabContentBlock.style.display = 'none'
    })
    tabsItems.forEach((tabItem)=>{
        tabItem.classList.remove('tab_content_item_active')
    })
}
const showTabContent = (indexElement = 0) =>{
    tabContentBLocks[indexElement].style.display = 'block'
    tabsItems[indexElement].classList.add('tab_content_item_active')
}
parentTabs.onclick = (event) =>{
    if(event.target.classList.contains('tab_content_item')){
        tabsItems.forEach((tabItem,tabIndex) =>{
            if(event.target === tabItem){
                hideTabContent()
                showTabContent(tabIndex)
            }
        })
    }
}
const autoTabContentSlide = (i = 0) => {
    setInterval(() => {
        i++
        if (i > tabContentBLocks.length - 1) {
            i = 0
        }
        hideTabContent()
        showTabContent(i)
    }, 3000)
}
autoTabContentSlide()
hideTabContent()
showTabContent()

//CONVERTER
const usd = document.querySelector('#usd'),
    som = document.querySelector('#som'),
    eur = document.querySelector('#eur');

const converter = (element, target1, target2, currency) => {
    element.oninput = () =>{
        const request = new XMLHttpRequest()
        request.open('GET', '../data/converter.json')
        request.setRequestHeader('Content-type', 'application/json')
        request.send()

        request.onload = () =>{
            const response = JSON.parse(request.response)
            if(currency === 'som'){
                target1.value = (element.value / response.som.usd).toFixed(2);
                target2.value = (element.value / response.som.eur).toFixed(2);
            } else if(currency === 'usd') {
                target1.value = (element.value * response.som.usd).toFixed(2);
                target2.value = (element.value * (response.som.usd / response.som.eur)).toFixed(2);
            } else if(currency === 'eur') {
                target1.value = (element.value * response.som.eur).toFixed(2);
                target2.value = (element.value * (response.som.eur / response.som.usd)).toFixed(2);
            }
            element.value === '' && (target1.value = target2.value = '');
        }
    }
}

converter(som, usd, eur, 'som');
converter(usd, som , eur, 'usd');
converter(eur, som, usd, 'eur');


// CARD
const card = document.querySelector('.card'),
    btnNext = document.querySelector('#btn-next'),
    cardPrev = document.querySelector('#btn-prev')

let count = 1

const changeColor = (item) => {
    item.completed
        ? card.style.background = 'green'
        : card.style.background = 'red'
}


const getTodos = async () =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=1&_page=${count}`)
        const data = await response.json()
        data?.forEach(item => {
            card.innerHTML = `
                <h3>${item?.id}</h3>
                <h4>${item?.title}</h4>
                <p>${item?.completed}</p>
                `
            changeColor(item)
        })
    }catch(error){
        console.log(error)
    }
}
getTodos()

btnNext.onclick = () => {
    count > 200 ? count = 1 : count++
    getTodos()
}

cardPrev.onclick = () => {
    count < 1 ? count = 200 : count--
    getTodos()
}

//WEATHER

const cityName = document.querySelector('.cityName'),
     city = document.querySelector('.city'),
     temp = document.querySelector('.temp');

//API
const DEFAULT_API = 'http://api.openweathermap.org/data/2.5/weather'
const API = 'e417df62e04d3b1b111abeab19cea714'
cityName.oninput = () =>{
    fetchDataAsync()
}
const fetchDataAsync = async () => {
    try{
        const response = await fetch(`${DEFAULT_API}?q=${cityName.value}&appid=${API}`)
        const data = await response.json()
        city.innerHTML = data?.name || 'Город не найден...'
        temp.innerHTML = data?.main?.temp ? Math.round(data.main.temp - 273) + '&deg;C' : ' '
    }catch (error){
        console.log(error.message)
    }
}