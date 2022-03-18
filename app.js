document.addEventListener('DOMContentLoaded', () => {

    const width = 10;
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#startBtn')
    const tile = document.querySelector('#tile');
    let squares = Array.from(document.querySelectorAll('#tile div'));
    const taken = document.querySelector('#taken');
    let stopSquares = Array.from(document.querySelectorAll('#tile div'));
    const displaySquares = document.querySelectorAll('#next-display div');
    const displayWidth = 4;
    let displayIndex = 0;
    let nextRandom = 0;
    let timerId;


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
        });
    }

    //remove or undraw the shape in rotation
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('shape');
        });
    };

    //Moving the shapes across the tiles every second
    timerId = setInterval(moveDown, 1000);

    //assign functions to key codes
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    }
    document.addEventListener('keyup', control);

    //Make shapes move down the grid until they reach the bottom of the grid
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        stopMove();
    }

    //stopMove function is used to stop the shapes 
    //at the bottom of the tiles or when they touch another shape
    function stopMove() {
        if (current.some(index => stopSquares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => stopSquares[currentPosition + index].classList.add('taken'));

            random = nextRandom;
            nextRandom = Math.floor(Math.random() * shapesArray.length);
            current = shapesArray[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
        }
    }


    //Move the shapes left, but stop on the left edge of the grid
    function moveLeft() {
        undraw();
        const isAleftEdge = current.some(index => (currentPosition + index) % width === 0);

        if (!isAleftEdge) { currentPosition -= 1 }

        if (current.some(index => stopSquares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }

        draw();
    }

    //Move the shapes right, but stop on the right edge of the grid
    function moveRight() {
        undraw();
        const isArightEdge = current.some(index => (currentPosition + index) % width === width - 1);

        if (!isArightEdge) { currentPosition += 1 }

        if (current.some(index => stopSquares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }

        draw();
    }

    //roteting the shapes
    function rotate() {
        undraw();
        currentRotation++;

        //if the current rotation reaches 4, then go back to rotation 0
        if (currentRotation === current.length) {
            currentRotation = 0;
        }

        current = shapesArray[random][currentRotation];
        draw();
    }


    //show the next shape to be drawn in the next-dsplay
    const nextShape = [
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //tShape
        [0, 1, displayWidth, displayWidth + 1], //sqrShape
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iShape
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zShape
        [1, displayWidth + 1, displayWidth * 2 + 1, 2] //lShape
    ];


    function displayShape() {
        //remove trace of any shape from tiles
        displaySquares.forEach(square => {
            square.classList.remove('shape');
        });
        nextShape[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('shape');
        });
    }


    //Create a function for the start/pause button
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * shapesArray.length);
            displayShape();
        }
    });


});