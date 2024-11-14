import GameHeader from "./GameHeader";
import SudokuSolver from "./SudokuSolver";
import ActionButtons from "./ActionButtons";
import { Difficulty } from "../types";

type SidebarProps = {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  timer: number;
  hearts: number;
  onPause: () => void;
  isPaused: boolean;
  onSolve: () => void;
  isSolving: boolean;
  onNewGame: () => void;
  hintsRemaining: number;
  onHint: () => void;
  onPrintGrid: () => void;
  onUndo: () => void;
  onClearGrid: () => void;
};

function Sidebar({
  difficulty,
  setDifficulty,
  timer,
  hearts,
  onPause,
  isPaused,
  onSolve,
  onNewGame,
  hintsRemaining,
  onHint,
  onPrintGrid,
  onUndo,
  onClearGrid,
}: SidebarProps) {
  return (
    <div className="lg:sticky lg:top-8 lg:w-72 mb-8 lg:mb-0 flex flex-col gap-4">
      <GameHeader
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        timer={timer}
        hearts={hearts}
        onPause={onPause}
        isPaused={isPaused}
      />
      <SudokuSolver onSolve={onSolve} />
      <ActionButtons
        onUndo={onUndo}
        onClearGrid={onClearGrid}
        onNewGame={onNewGame}
        hintsRemaining={hintsRemaining}
        onHint={onHint}
        onPrintGrid={onPrintGrid}
      />
    </div>
  );
}

export default Sidebar;