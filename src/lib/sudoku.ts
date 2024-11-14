export type Grid = (number | null)[][];

export const generateSudoku = (difficulty: 'easy' | 'medium' | 'hard'): Grid => {
  const emptyCells = {
    easy: 30,
    medium: 45,
    hard: 55
  };

  const solvedGrid = createSolvedGrid();
  
  const puzzle = [...solvedGrid.map(row => [...row])];
  const cellsToRemove = emptyCells[difficulty];
  
  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== null) {
      const temp = puzzle[row][col];
      puzzle[row][col] = null;
      
      if (countSolutions(puzzle) === 1) {
        removed++;
      } else {
        puzzle[row][col] = temp;
      }
    }
  }
  
  return puzzle;
};

const createSolvedGrid = (): Grid => {
  const grid: Grid = Array(9).fill(null).map(() => Array(9).fill(null));
  fillGrid(grid);
  return grid;
};

const fillGrid = (grid: Grid): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) return true;
            grid[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const shuffle = (array: number[]): number[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const isValid = (grid: Grid, row: number, col: number, num: number): boolean => {
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

export const isSolved = (grid: Grid): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) return false;
    }
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col]!;
      grid[row][col] = null;
      if (!isValid(grid, row, col, num)) return false;
      grid[row][col] = num;
    }
  }

  return true;
};

export const countSolutions = (grid: Grid, limit = 2): number => {
  const solutions: Grid[] = [];
  
  const solve = (g: Grid): void => {
    if (solutions.length >= limit) return;
    
    if (isSolved(g)) {
      solutions.push(g.map(row => [...row]));
      return;
    }
    
    const [row, col] = findEmptyCell(g);
    if (row === -1) return;
    
    for (let num = 1; num <= 9; num++) {
      if (isValid(g, row, col, num)) {
        g[row][col] = num;
        solve(g);
        g[row][col] = null;
      }
    }
  };
  
  solve([...grid.map(row => [...row])]);
  return solutions.length;
};

const findEmptyCell = (grid: Grid): [number, number] => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) return [row, col];
    }
  }
  return [-1, -1];
};

export const checkInvalidCells = (grid: Grid): boolean[][] => {
  const invalid: boolean[][] = Array(9).fill(null)
    .map(() => Array(9).fill(false));
    
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = grid[i][j];
      if (num !== null) {
        for (let k = 0; k < 9; k++) {
          if (k !== j && grid[i][k] === num) {
            invalid[i][j] = true;
            invalid[i][k] = true;
          }
        }
        for (let k = 0; k < 9; k++) {
          if (k !== i && grid[k][j] === num) {
            invalid[i][j] = true;
            invalid[k][j] = true;
          }
        }
        const boxRow = Math.floor(i / 3) * 3;
        const boxCol = Math.floor(j / 3) * 3;
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            const row = boxRow + r;
            const col = boxCol + c;
            if (row !== i && col !== j && grid[row][col] === num) {
              invalid[i][j] = true;
              invalid[row][col] = true;
            }
          }
        }
      }
    }
  }
  
  return invalid;
};