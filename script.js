const ACTIVATED_BACKGROUND_COLOR = '#333333';
const ACTIVATED_TEXT_COLOR = '#e2e2e2';
const DEACTIVATED_BACKGROUND_COLOR = 'unset'
const DEACTIVATED_TEXT_COLOR = '#333333'

let canvas = document.querySelector('.canvas');
let colorPickerWheel = document.getElementById('color-picker-wheel');
let pickedColorBtn = document.getElementById('picked-color');
let rainbow = document.getElementById('rainbow');
let shading = document.getElementById('shading');
let fillBtn = document.getElementById('fill');
let erase = document.getElementById('erase');
let clear = document.getElementById('clear');
let gridSizeSlider = document.getElementById('grid-size-slider');
let gridSizeDisplay = document.getElementById('grid-size-display');

let mousedown = false;
let currentMode = 'pickedColor';
let grid = [];

pickedColorBtn.addEventListener('click', () => setMode('pickedColor'));
rainbow.addEventListener('click', () => setMode('rainbow'));
shading.addEventListener('click', () => setMode('shading'));
fillBtn.addEventListener('click', () => setMode('fill'));
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
            shade(e);
            break;
        case 'fill':
            fill(e);
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
            pickedColorBtn.classList.remove('active');
            break;
        case 'rainbow':
            rainbow.classList.remove('active');
            break;
        case 'shading':
            shading.classList.remove('active');
            break;
        case 'fill':
            fillBtn.classList.remove('active');
            break;
        case 'erase':
            erase.classList.remove('active');
            break;
    }

    switch(newMode) {
        case 'pickedColor':
            pickedColorBtn.classList.add('active');
            break;
        case 'rainbow':
            rainbow.classList.add('active');
            break;
        case 'shading':
            shading.classList.add('active');
            break;
        case 'fill':
            fillBtn.classList.add('active');
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
    let j = 0; //For going to the grid next row
    grid = [] //For resetting grid
    grid.push([]); //For placing inside the array the first subarray (row of the grid)

    for (let i = 0; i < gridSize**2; i++) {
        gridBox = document.createElement('div');
        gridBox.style.backgroundColor = 'rgb(255, 255, 255)';
        gridBox.setAttribute('draggable', 'false');
        gridBox.classList.add('grid-item');
        gridBox.addEventListener('mouseover', changeColor);
        gridBox.addEventListener('mousedown', changeColor);
        canvas.appendChild(gridBox);

        //We need to hold the grid data for the flood_fill function
        if(i % gridSize != 0 || i === 0){
            grid[j].push(gridBox);
        }
        else{
            grid.push([]); //Creates the next row
            grid[++j].push(gridBox)
        }
    }
}

function shade(e) {
    e.target.style.backgroundColor = 'rgb(' +
        e.target.style.backgroundColor.replace(/\D+/g, ' ').trim().split(' ').map(e => {
            if(e <= 0) return e;
            if(e / 255 > 0.1){
                return (+e - 25.5);
            }
            else{
                return 0;
            }
        }).join(', ') + ')';
}

function fill(e) {
    let oldColor = e.target.style.backgroundColor;
    let newColor = convertColorFromHexToDec(colorPickerWheel.value);
    let gridSize = grid.length;
    let gridRowSize = grid[0].length;
    let queue = [findClickedLocation(e.target)]; //I've decided to use BFS Breadth-First Search for the flood_fill
    if (oldColor === newColor) return;
    while (queue.length > 0) {
        let r = queue[0].shift(), c = queue[0].shift(); // r === row, c === column
        queue = queue.filter(e => e.length); // Removes from the queue empty arrays
        if(r < 0 || r >= gridSize || c < 0 || c >= gridRowSize || grid[r][c].style.backgroundColor != oldColor){
            continue;
        } else {
            grid[r][c].style.backgroundColor = newColor;
            queue.push([r+1,c])
            queue.push([r-1,c])
            queue.push([r,c+1])
            queue.push([r,c-1])
        }
    }
}

function convertColorFromHexToDec(hexColor){
    return 'rgb(' + hexColor.slice(1).replace(/(\d{2}|\w{2})/g, '$1 ').trim().split(' ').map(e => parseInt(e, 16)).join(', ') + ')';
}

function findClickedLocation(e){
    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[row].length; column++) {
            if(e === grid[row][column]) return [row, column];
        }
    }
}

window.onload = () => {
    reloadGrid()
}