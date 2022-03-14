document.addEventListener('DOMContentLoaded', () => {

    const width = 10;
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#startBtn')
    const tile = document.querySelector('#tile');
    let squares = Array.from(document.querySelectorAll('#tile div'));

    //Creating the shapes using arrays
    const tShape = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];

    const sqrShape = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const iShape = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const zShape = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];

    const lShape = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    const shapesArray = [tShape, sqrShape, iShape, zShape, lShape];

    let currentPosition = 4;
    let currentRotation = 0;

    //Randomly choose shapes recursively
    let random = Math.floor(Math.random() * shapesArray.length);
    let current = shapesArray[random][currentRotation];

    //draw the shape in rotation
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('shape');
        })
    }

    //remove or undraw the shape in rotation
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('shape');
        })
    };

    //Moving the shapes across the tiles every second
    timerId = setInterval(moveDown, 1000);

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
    }


});