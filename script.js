const ACTIVATED_BACKGROUND_COLOR = '#333333';
const ACTIVATED_TEXT_COLOR = '#e2e2e2';
const DEACTIVATED_BACKGROUND_COLOR = 'unset'
const DEACTIVATED_TEXT_COLOR = '#333333'

let canvas = document.querySelector('.canvas');
let pickedColor = document.querySelector('#picked-color');
let rainbow = document.querySelector('#rainbow');
let erase = document.querySelector('#erase');
let clear = document.querySelector('#clear');

let gridSize = 16;
let mousedown = false;
let currentMode = 'pickedColor';

pickedColor.addEventListener('click', () => setMode('pickedColor'));
rainbow.addEventListener('click', () => setMode('rainbow'));
erase.addEventListener('click', () => setMode('erase'));
//clear.addEventListener('click', reloadGrid)
document.addEventListener('mousedown', () => mousedown = true)
document.addEventListener('mouseup', () => mousedown = false)


for (let i = 0; i < gridSize**2; i++) {
    gridBox = document.createElement('div');
    gridBox.setAttribute('draggable', 'false');
    gridBox.classList.add('grid-item');
    gridBox.addEventListener('mouseover', changeColor);
    canvas.appendChild(gridBox);
}

function changeColor(e){
    if(mousedown){
        e.target.style.backgroundColor = pickedColor.value;
    }
}

function setMode(newMode){
    activateButton(newMode);
    currentMode = newMode;
}

function activateButton(newMode){
    switch (currentMode) {
        case 'pickedColor':
            pickedColor.classList.remove('active');
            break;
        case 'rainbow':
            rainbow.classList.remove('active');
            break;
        case 'erase':
            erase.classList.remove('active');
            break;
    }

    switch(newMode) {
        case 'pickedColor':
            pickedColor.classList.add('active');
            break;
        case 'rainbow':
            rainbow.classList.add('active');
            break;
        case 'erase':
            erase.classList.add('active');
            break;
    }
}