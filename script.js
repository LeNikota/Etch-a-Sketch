const ACTIVATED_BACKGROUND_COLOR = '#333333';
const ACTIVATED_TEXT_COLOR = '#e2e2e2';
const DEACTIVATED_BACKGROUND_COLOR = 'unset'
const DEACTIVATED_TEXT_COLOR = '#333333'
const DEFAULT_GRID_SIZE = 16;

let canvas = document.querySelector('.canvas');
let colorPickerWheel = document.getElementById('color-picker-wheel');
let pickedColor = document.getElementById('picked-color');
let rainbow = document.getElementById('rainbow');
let shading = document.getElementById('shading');
let erase = document.getElementById('erase');
let clear = document.getElementById('clear');
let gridSizeSlider = document.getElementById('grid-size-slider');
let gridSizeDisplay = document.getElementById('grid-size-display');

let gridSize = 16;
let mousedown = false;
let currentMode = 'pickedColor';

pickedColor.addEventListener('click', () => setMode('pickedColor'));
rainbow.addEventListener('click', () => setMode('rainbow'));
shading.addEventListener('click', () => setMode('shading'));
erase.addEventListener('click', () => setMode('erase'));
clear.addEventListener('click', reloadGrid)
gridSizeSlider.addEventListener('change', reloadGrid)
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
        case 'shading':
            e.target.style.backgroundColor = 'rgb(' +
                e.target.style.backgroundColor.replace(/\D+/g, ` `).trim().split(' ').map(e => {
                    if(e <= 0) return e;
                    if(e / 255 > 0.1){
                        return (+e - 25.5);
                    }
                    else{
                        return 0;
                    }
                }).join(', ') + ')';
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
        case 'shading':
            shading.classList.remove('active');
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
        case 'shading':
            shading.classList.add('active');
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
    setupGrid(gridSizeSlider.value);

    gridSizeDisplay.textContent = `${gridSizeSlider.value} x ${gridSizeSlider.value}`
}

function clearGird(){
    canvas.innerHTML = '';
}

function setupGrid(gridSize){
    canvas.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize**2; i++) {
        gridBox = document.createElement('div');
        gridBox.style.backgroundColor = 'rgb(255, 255, 255)';
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