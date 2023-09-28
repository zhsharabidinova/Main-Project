//converter
// const som = document.querySelector('#som')
// const usd = document.querySelector('#usd')
// const eur = document.querySelector('#eur')




const card = document.querySelector('.card'),
    btnNext = document.querySelector('#btn-next'),
    cardPrev = document.querySelector('#btn-prev')

let count = 1

const changeColor = (item) => {
    item.completed
        ? card.style.background = 'green'
        : card.style.background = 'red'
}
const getTodos = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos?_limit=1&_page=${count}`)
        .then(response => response.json())
        .then(data => {
            data?.forEach(item => {
                card.innerHTML = `
                <h3>${item?.id}</h3>
                <h4>${item?.title}</h4>
                <p>${item?.completed}</p>
                `
                changeColor(item)
            })
        })
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
