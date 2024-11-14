import { Grid } from "../types";

export const solveSudoku = (grid: Grid): Grid | null => {
  const solution = grid.map((row) => [...row]);

  if (solve(solution)) {
    return solution;
  }
  return null;
};

const solve = (grid: Grid): boolean => {
  const empty = findEmptyCell(grid);
  if (!empty) return true;

  const [row, col] = empty;

  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(grid, row, col, num)) {
      grid[row][col] = num;

      if (solve(grid)) {
        return true;
      }

      grid[row][col] = null;
    }
  }

  return false;
};

const findEmptyCell = (grid: Grid): [number, number] | null => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        return [row, col];
      }
    }
  }
  return null;
};

const isValidPlacement = (
  grid: Grid,
  row: number,
  col: number,
  num: number
): boolean => {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }

  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxRow + i][boxCol + j] === num) return false;
    }
  }

  return true;
};

export const getHint = (
  currentGrid: Grid,
  solution: Grid | null
): [number, number, number] | null => {
  if (!solution) {
    const newSolution = solveSudoku(currentGrid);
    if (!newSolution) return null;
    solution = newSolution;
  }

  const unsolvedCells: [number, number][] = [];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (currentGrid[row][col] === null) {
        unsolvedCells.push([row, col]);
      }
    }
  }

  if (unsolvedCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * unsolvedCells.length);
    const [row, col] = unsolvedCells[randomIndex];
    const hintValue = solution[row][col];

    if (hintValue !== null) {
      return [row, col, hintValue];
    }
  }

  return null;
};
