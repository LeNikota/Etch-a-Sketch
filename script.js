let canvas = document.querySelector('.canvas');
let gridSize = 16;
let mousedown = false;

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
        e.target.style.backgroundColor = 'red';
    }
}