// VALIDATOR

const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const  gmailResult = document.querySelector('#gmail_result')

const regExp = /[A-Za-z0-9_]@gmail.com/
gmailButton.addEventListener('click', ()=>{
    if(regExp.test(gmailInput.value)){
        gmailResult.innerHTML = 'VALID'
        gmailResult.style.color = 'green'
    }else{
        gmailResult.innerHTML = 'NOT VALID'
        gmailResult.style.color = 'red'
    }
})
// MOVE BLOCK
const childBlock = document.querySelector('.child_block')
let positionX = 0;
let positionY = 0;
const moveBlock = () => {
    if (positionX < 450 && positionY === 0) {
        positionX++;
        childBlock.style.left = positionX + 'px';
    } else if (positionX === 450 && positionY < 450) {
        positionY++;
        childBlock.style.top = positionY + 'px';
    } else if (positionX > 0 && positionY === 450) {
        positionX--;
        childBlock.style.left = positionX + 'px';
    } else if (positionX === 0 && positionY > 0) {
        positionY--;
        childBlock.style.top = positionY + 'px';
    }

    setTimeout(moveBlock, 1);
};

moveBlock();

//TIME STOP

const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');
const secondsS = document.querySelector('#secondsS');

let newValue = 0;
let interval;
startBtn.addEventListener('click', ()=>{
    toIncrease();
    document.querySelector('.interval').style.color = 'green'
})
stopBtn.addEventListener('click', ()=>{
    toStop();
})
resetBtn.addEventListener('click', ()=>{
    toReset()
    document.querySelector('.interval').style.color = 'grey'
})
const toIncrease = () =>{
    toStop()
    interval = setInterval(function (){
        newValue++
        document.querySelector('.interval').innerHTML = newValue;
    }, 1000)
}
const toStop = ()=>{
    clearInterval(interval)
}
const toReset = () =>{
    clearInterval(interval)
    newValue = 0;
    document.querySelector('.interval').innerHTML = newValue;
}


