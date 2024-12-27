const gridContainer = document.getElementById('grid-container');
const resizeButton = document.getElementById('resize-button');

function generateRandomColor() {
    // Generate a random RGB color
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };  // Return as an object for easy manipulation
}

function createGrid(gridSize) {
    // Clear the existing grid if it exists
    gridContainer.innerHTML = "";

    // Calculate the size of each square based on total grid width (480px)
    const squareSize = 480 / gridSize; // Set total width to 480px

    for (let i = 0; i < gridSize * gridSize; i++) { // Create gridSize*gridSize squares
        const square = document.createElement('div');
        square.classList.add('grid-square'); // Add class for styling
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        // Store the initial color and darkening level
        let initialColor = null;  // Will be set on first hover
        let darkenLevel = 0; // Keep track of darkening level (0-10)

        // Set initial color to neutral (white or light gray)
        square.style.backgroundColor = 'white';

        // Add hover effect
        square.addEventListener('mouseenter', () => {
            if (initialColor === null) {
                // Generate a random color on the first hover
                initialColor = generateRandomColor();
                square.style.backgroundColor = `rgb(${initialColor.r}, ${initialColor.g}, ${initialColor.b})`;
            } else {
                // Darken the square progressively
                if (darkenLevel < 10) {
                    darkenLevel++;

                    // Darken each color component by 10%
                    initialColor.r = Math.max(initialColor.r - 25, 0); // Darken red by 10%
                    initialColor.g = Math.max(initialColor.g - 25, 0); // Darken green by 10%
                    initialColor.b = Math.max(initialColor.b - 25, 0); // Darken blue by 10%

                    // Apply the new darkened color to the square
                    square.style.backgroundColor = `rgb(${initialColor.r}, ${initialColor.g}, ${initialColor.b})`;
                }
            }
        });

        gridContainer.appendChild(square); // Append each square to the container
    }
}

function promptForGridSize() {
    let gridSize = parseInt(prompt("Enter the number of squares per side (max 100):"), 10);

    // Validate input (ensure it's a number between 1 and 100)
    if (gridSize > 0 && gridSize <= 100) {
        createGrid(gridSize); // Create grid with the new size
    } else {
        alert('Please enter a valid number between 1 and 100.');
    }
}

// Attach the event listener to the button
resizeButton.addEventListener('click', promptForGridSize);

// Initialize with a 16x16 grid
createGrid(16);
