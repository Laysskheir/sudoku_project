import React from "react";
import { Dices } from "lucide-react";
import { Button } from "../utils/button";

interface SudokuSolverProps {
  onSolve: () => void;
}

const SudokuSolver: React.FC<SudokuSolverProps> = ({ onSolve }) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button
          onClick={onSolve}
          className="w-full"
        >
          <Dices /> Solve Puzzle
        </Button>
      </div>
    </div>
  );
};

export default SudokuSolver;
