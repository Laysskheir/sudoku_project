# Sudoku Game with React and TypeScript

## Overview

This project is a web-based Sudoku game built using React and TypeScript as part of an internship application.

## Features

- Interactive 9x9 Sudoku grid
- Validation to ensure correct inputs
- Game controls (hint, clear, solve puzzle, print, check solution and more...)
- Undo Functionality: Allow players to undo their moves for a more flexible gameplay experience.

## How to Run Locally

1. Clone the repository:
   ```bash
   git remote add origin https://github.com/Laysskheir/sudoku_project.git
   cd sudoku_project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm start
   ```

## Development Process

- **Planning**: Started by mapping out the components and logic needed for the game.
- **Implementation**: Built components using TypeScript to ensure type safety and maintainability.
- **Styling**: Used Tailwind CSS for quick, customizable, and efficient design to create a user-friendly interface.

## Challenges Faced and Solutions

- **Problem**: Implementing OCR to read and extract Sudoku grids from an image accurately.
- **Solution**: Used Tesseract.js with preprocessing to enhance OCR accuracy and convert the output into a Sudoku grid.

- **Problem**: Ensuring that the generated Sudoku board was always solvable.
- **Solution**: Used an external library for puzzle generation and added custom logic to validate solvability.

- **Challenge**: Managing state updates smoothly for cell input.
- **Solution**: Used React's `useState` hook and carefully handled input validation with TypeScript checks.

## Future Improvements

- Multiple Themes: Provide customizable themes (e.g., dark mode, light mode).
- Leaderboard: Track high scores based on time or moves.
