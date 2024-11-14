// utils/imageProcessing.ts
import { createWorker } from "tesseract.js";

export async function processSudokuImage(
  imageUrl: string
): Promise<number[][]> {
  const img = await loadImage(imageUrl);
  const canvas = document.createElement("canvas");
  const SIZE = 450;
  canvas.width = SIZE;
  canvas.height = SIZE;

  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, SIZE, SIZE);

  const scale = Math.min(SIZE / img.width, SIZE / img.height);
  const x = (SIZE - img.width * scale) / 2;
  const y = (SIZE - img.height * scale) / 2;

  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

  const imageData = ctx.getImageData(0, 0, SIZE, SIZE);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
    const adjusted = avg < 128 ? avg / 2 : Math.min(255, avg * 1.5);
    data[i] = data[i + 1] = data[i + 2] = adjusted;
  }

  for (let i = 0; i < data.length; i += 4) {
    const value = data[i] < 170 ? 0 : 255;
    data[i] = data[i + 1] = data[i + 2] = value;
  }

  ctx.putImageData(imageData, 0, 0);

  const cellSize = SIZE / 9;
  const grid: number[][] = Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));

  const worker = await createWorker();
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");

  await worker.setParameters({
    tessedit_char_whitelist: "123456789",
    tessedit_pageseg_mode: 6 as any,
  });

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cellCanvas = document.createElement("canvas");
      cellCanvas.width = cellSize;
      cellCanvas.height = cellSize;
      const cellCtx = cellCanvas.getContext("2d")!;

      const x = col * cellSize;
      const y = row * cellSize;
      cellCtx.drawImage(
        canvas,
        x,
        y,
        cellSize,
        cellSize,
        0,
        0,
        cellSize,
        cellSize
      );

      try {
        const {
          data: { text, confidence },
        } = await worker.recognize(cellCanvas);
        const number = parseInt(text.trim().replace(/[^1-9]/g, ""));

        if (!isNaN(number) && number >= 1 && number <= 9 && confidence > 60) {
          grid[row][col] = number;
        }
      } catch (error) {
        console.error(`Error processing cell at ${row},${col}:`, error);
      }
    }
  }

  await worker.terminate();

  if (isValidSudokuGrid(grid)) {
    return grid;
  }

  const fixedGrid = attemptToFixGrid(grid);
  if (isValidSudokuGrid(fixedGrid)) {
    return fixedGrid;
  }

  throw new Error(
    "Could not accurately detect Sudoku grid. Please ensure the image is clear and well-lit."
  );
}

function attemptToFixGrid(grid: number[][]): number[][] {
  const fixedGrid = grid.map((row) => [...row]);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (fixedGrid[i][j] !== 0) {
        const value = fixedGrid[i][j];
        fixedGrid[i][j] = 0;
        if (!isValidPlacement(fixedGrid, i, j, value)) {
        } else {
          fixedGrid[i][j] = value;
        }
      }
    }
  }

  return fixedGrid;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export function isValidSudokuGrid(grid: number[][]): boolean {
  if (grid.length !== 9 || !grid.every((row) => row.length === 9)) {
    return false;
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] < 0 || grid[i][j] > 9) {
        return false;
      }
    }
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] !== 0) {
        const temp = grid[i][j];
        grid[i][j] = 0;
        if (!isValidPlacement(grid, i, j, temp)) {
          return false;
        }
        grid[i][j] = temp;
      }
    }
  }

  return true;
}

function isValidPlacement(
  grid: number[][],
  row: number,
  col: number,
  num: number
): boolean {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }

  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
}

export function solveSudokuByImage(grid: number[][]): number[][] | null {
  if (!solve(grid)) {
    return null;
  }
  return grid;

  function solve(board: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidPlacement(board, row, col, num)) {
              board[row][col] = num;

              if (solve(board)) {
                return true;
              }

              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
}
