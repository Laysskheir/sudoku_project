import React, { useState } from "react";
import { BrainIcon, Plus, PrinterIcon, RotateCcw, Trash2 } from "lucide-react";
import Alert from "./Alert";
import { Button } from "../utils/button";

interface ActionButtonsProps {
  onUndo: () => void;
  onClearGrid: () => void;
  onNewGame: () => void;
  onHint: () => void;
  hintsRemaining: number;
  onPrintGrid: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onUndo,
  onClearGrid,
  onNewGame,
  onHint,
  hintsRemaining,
  onPrintGrid,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleNewGame = () => {
    setShowAlert(true);
  };

  const confirmNewGame = () => {
    setShowAlert(false);
    onNewGame();
  };

  const cancelNewGame = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <div className="grid grid-cols-2 mt-2 gap-4 ">
        <button
          onClick={onUndo}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white
                   shadow hover:shadow-md border border-gray-200
                   hover:bg-gray-50 transition active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          Undo
        </button>
        <button
          onClick={onClearGrid}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white
                   shadow hover:shadow-md border border-red-200
                   text-red-500 hover:bg-red-50 transition active:scale-95"
        >
          <Trash2 className="w-5 h-5" />
          Clear
        </button>

        <button
          onClick={onHint}
          className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-white
                   shadow hover:shadow-md border border-gray-200
                   text-green-500 hover:bg-green-50 transition active:scale-95"
          disabled={hintsRemaining <= 0}
        >
          <BrainIcon className="w-5 h-5" />
          Get Hint
          <span className="absolute -top-2 -right-2 bg-green-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">
            {hintsRemaining}
          </span>
        </button>
        <button
          onClick={onPrintGrid}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white
                   shadow hover:shadow-md border border-gray-200
                   hover:bg-gray-50 transition active:scale-95"
        >
          <PrinterIcon className="w-5 h-5" />
          Print Grid
        </button>
      </div>

      <div className="flex mt-8 gap-4">
        <Button
          onClick={handleNewGame}
          className="w-full"
        >
          <Plus /> New Game
        </Button>
      </div>

      {showAlert && (
        <Alert
          message="Are you sure ?"
          subMessage="You already have a game in progress. If you start a new game, you will permanently lose the progress of the current game."
          onCancel={cancelNewGame}
          onConfirm={confirmNewGame}
        />
      )}
    </div>
  );
};

export default ActionButtons;