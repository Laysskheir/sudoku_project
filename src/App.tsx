import { useState, useEffect } from "react";
import { generateSudoku, isSolved, checkInvalidCells } from "./lib/sudoku";
import { solveSudoku, getHint } from "./lib/solver";

import NumberPad from "./components/NumberPad";
import GameTitle from "./components/GameTitle";
import SudokuSolverImage from "./components/SudokuSolverImage";
import Sidebar from "./components/Sidebar";
import GridContainer from "./components/GridContainer";
import PauseOverlay from "./components/PauseOverlay ";
import Alert from "./components/Alert";
import { Difficulty, Grid } from "./types";

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [grid, setGrid] = useState(() => generateSudoku("easy"));
  const [initialGrid, setInitialGrid] = useState(() => [...grid]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );
  const [hearts, setHearts] = useState(3);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [invalidCells, setInvalidCells] = useState(() =>
    Array(9).fill(Array(9).fill(false))
  );
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState<Grid | null>(null);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => setTimer((t) => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  useEffect(() => setInvalidCells(checkInvalidCells(grid)), [grid]);

  const startNewGame = () => {
    const newGrid = generateSudoku(difficulty);
    setGrid(newGrid);
    setInitialGrid(newGrid.map((row) => [...row]));
    setSelectedCell(null);
    setHearts(3);
    setTimer(0);
    setIsPaused(false);
    setInvalidCells(Array(9).fill(Array(9).fill(false)));
    setSolution(null);
    setHintsRemaining(3);
  };

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  const handleCellClick = (row: number, col: number) => {
    if (!isPaused) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberSelect = (num: number | null) => {
    if (
      !selectedCell ||
      isPaused ||
      initialGrid[selectedCell[0]][selectedCell[1]] !== null
    )
      return;

    const [row, col] = selectedCell;

    if (num !== null) {
      for (let x = 0; x < 9; x++) {
        if (x !== col && grid[row][x] === num) {
          setHearts(hearts - 1);
          if (hearts === 1) setAlert("You've lost all your hearts.");
          const newGrid = grid.map((r, rIdx) =>
            r.map((cell, cIdx) => (rIdx === row && cIdx === col ? num : cell))
          );
          setGrid(newGrid);
          return;
        }
      }

      for (let x = 0; x < 9; x++) {
        if (x !== row && grid[x][col] === num) {
          setHearts(hearts - 1);
          if (hearts === 1) setAlert("You've lost all your hearts.");
          const newGrid = grid.map((r, rIdx) =>
            r.map((cell, cIdx) => (rIdx === row && cIdx === col ? num : cell))
          );
          setGrid(newGrid);
          return;
        }
      }

      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (
            (boxRow + i !== row || boxCol + j !== col) &&
            grid[boxRow + i][boxCol + j] === num
          ) {
            setHearts(hearts - 1);
            if (hearts === 1) setAlert("You've lost all your hearts.");
            const newGrid = grid.map((r, rIdx) =>
              r.map((cell, cIdx) => (rIdx === row && cIdx === col ? num : cell))
            );
            setGrid(newGrid);
            return;
          }
        }
      }
    }

    const newGrid = grid.map((r, rIdx) =>
      r.map((cell, cIdx) => (rIdx === row && cIdx === col ? num : cell))
    );
    setGrid(newGrid);

    if (isSolved(newGrid)) {
      setAlert("Congratulations! You've solved the Sudoku!");
      setIsPaused(true);
    }
  };

  const setAlert = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handleSolve = async () => {
    setIsSolving(true);
    const solution = solveSudoku(grid);
    if (solution) {
      setSolution(solution);
      setGrid(solution);
    }
    setIsSolving(false);
  };

  const handleHint = () => {
    if (hintsRemaining > 0) {
      const currentSolution = solution || solveSudoku(grid);
      if (currentSolution) {
        setSolution(currentSolution);
        const hint = getHint(grid, currentSolution);
        if (hint) {
          const [row, col, num] = hint;
          const newGrid = grid.map((r, rIdx) =>
            r.map((cell, cIdx) => (rIdx === row && cIdx === col ? num : cell))
          );
          setGrid(newGrid);
          setHintsRemaining(hintsRemaining - 1);
        }
      }
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage(null);
    startNewGame();
  };

  const handlePrintGrid = () => {
    const gridString = grid.map((row) => row.join(" ")).join("\n");
    const printWindow = window.open("", "_blank");
    printWindow?.document.write(`<pre>${gridString}</pre>`);
    printWindow?.document.close();
    printWindow?.print();
  };

  const onUndo = () => handleNumberSelect(null);
  const onClearGrid = () =>
    setGrid(
      grid.map((row) =>
        row.map(
          (cell, colIndex) => initialGrid[grid.indexOf(row)][colIndex] || null
        )
      )
    );

  return (
    <div className="relative h-full w-full bg-white">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="min-h-screen relative">
        <div className="relative max-w-7xl mx-auto px-4 flex flex-col lg:flex-row lg:items-start lg:gap-12">
          <GameTitle />
          <div className="flex-1 flex flex-col items-center">
            <div
              className={`transition-all duration-300 ${
                isPaused ? "blur-sm" : ""
              }`}
            >
              {isPaused && <PauseOverlay isPaused={isPaused} />}
              <GridContainer
                grid={grid}
                initialGrid={initialGrid}
                selectedCell={selectedCell}
                invalidCells={invalidCells}
                onCellClick={handleCellClick}
              />
            </div>
            <NumberPad onNumberSelect={handleNumberSelect} />
          </div>
          <Sidebar
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            timer={timer}
            hearts={hearts}
            onPause={() => setIsPaused(!isPaused)}
            isPaused={isPaused}
            onSolve={handleSolve}
            isSolving={isSolving}
            onNewGame={startNewGame}
            hintsRemaining={hintsRemaining}
            onHint={handleHint}
            onPrintGrid={handlePrintGrid}
            onUndo={onUndo}
            onClearGrid={onClearGrid}
          />
        </div>
        <SudokuSolverImage />
      </div>
      {showAlert && alertMessage && (
        <Alert
          message={alertMessage}
          subMessage="You have lost the game. A new game will start when you confirm."
          onCancel={handleCloseAlert}
          onConfirm={startNewGame}
        />
      )}
    </div>
  );
}

export default App;
