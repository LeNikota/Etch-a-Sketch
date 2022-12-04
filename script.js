const ACTIVATED_BACKGROUND_COLOR = '#333333';
const ACTIVATED_TEXT_COLOR = '#e2e2e2';
const DEACTIVATED_BACKGROUND_COLOR = 'unset'
const DEACTIVATED_TEXT_COLOR = '#333333'
const DEFAULT_GRID_SIZE = 16;

let canvas = document.querySelector('.canvas');
let colorPickerWheel = document.querySelector('#color-picker-wheel');
let pickedColor = document.querySelector('#picked-color');
let rainbow = document.querySelector('#rainbow');
let erase = document.querySelector('#erase');
let clear = document.querySelector('#clear');
let selectedGridSize = 30;

let gridSize = 16;
let mousedown = false;
let currentMode = 'pickedColor';

pickedColor.addEventListener('click', () => setMode('pickedColor'));
rainbow.addEventListener('click', () => setMode('rainbow'));
erase.addEventListener('click', () => setMode('erase'));
clear.addEventListener('click', reloadGrid)
document.addEventListener('mousedown', () => mousedown = true)
document.addEventListener('mouseup', () => mousedown = false)

function changeColor(e){
    if(!mousedown && e.type === 'mouseover') return;
    
    switch (currentMode) {
        case 'pickedColor':
            e.target.style.backgroundColor = colorPickerWheel.value;
            break;
        case 'rainbow':
            e.target.style.backgroundColor = `rgb(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`;
            break;
        case 'erase':
            e.target.style.backgroundColor = 'white';
            break;
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

function getRandomNumber(){
    return Math.floor(Math.random()*256);
}

function reloadGrid() {
    clearGird();
    setupGrid(selectedGridSize);
}

function clearGird(){
    canvas.innerHTML = '';
}

function setupGrid(gridSize){
    canvas.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize**2; i++) {
        gridBox = document.createElement('div');
        gridBox.setAttribute('draggable', 'false');
        gridBox.classList.add('grid-item');
        gridBox.addEventListener('mouseover', changeColor);
        gridBox.addEventListener('mousedown', changeColor);
        canvas.appendChild(gridBox);
    }
}

window.onload = () => {
    setupGrid(DEFAULT_GRID_SIZE);
}