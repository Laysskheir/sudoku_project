import React from "react";
import { Pause, PlayIcon, HeartIcon } from "lucide-react";
import { Difficulty } from "../types";

interface GameHeaderProps {
  difficulty: string;
  onDifficultyChange: (difficulty: Difficulty) => void;
  timer: number;
  hearts: number;
  isPaused: boolean;
  onPause: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  difficulty,
  onDifficultyChange,
  timer,
  hearts,
  isPaused,
  onPause,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      <select
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
        className="w-full bg-white rounded-xl px-4 py-3
                 text-gray-800 font-medium transition-all
                 shadow-lg shadow-blue-900/5
                 border border-gray-100 hover:border-blue-200
                 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
      >
        <option value="easy">Easy </option>
        <option value="medium">Medium </option>
        <option value="hard">Hard </option>
      </select>

      <div className="space-y-3">
        <div className="bg-white rounded-xl p-4 shadow-lg shadow-blue-900/5 border border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-mono font-bold text-gray-600">
              {formatTime(timer)}
            </span>
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={onPause}
            >
              {isPaused ? (
                <PlayIcon className="w-5 h-5 text-gray-600" />
              ) : (
                <Pause className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg shadow-blue-900/5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <HeartIcon
                  key={i}
                  className={`w-6 h-6 transition-transform duration-300 ${
                    i < hearts ? "fill-red-500" : "fill-gray-300"
                  } hover:scale-110`}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-700">Hearts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;