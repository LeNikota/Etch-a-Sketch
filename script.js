let canvas = document.querySelector('.canvas');
let gridSize = 32;


for (let i = 0; i < gridSize; i++) {
    gridBox = document.createElement('div');
    gridBox.setAttribute('draggable', 'false');
    gridBox.classList.add('grid-item');
    canvas.appendChild(gridBox);
}