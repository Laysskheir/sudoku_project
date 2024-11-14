import React, { useState, useRef } from "react";
import { ArrowRightIcon, LoaderCircle } from "lucide-react";
import {
  isValidSudokuGrid,
  processSudokuImage,
  solveSudokuByImage,
} from "../lib/imageProcessing";
import { Button } from "../utils/button";

const SudokuSolver = () => {
  const [image, setImage] = useState<string | null>(null);
  const [originalGrid, setOriginalGrid] = useState<number[][]>([]);
  const [solvedGrid, setSolvedGrid] = useState<number[][]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setOriginalGrid([]);
        setSolvedGrid([]);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!image) return;
    setIsProcessing(true);
    setError(null);

    try {
      const grid = await processSudokuImage(image);
      if (!isValidSudokuGrid(grid)) {
        throw new Error("Invalid Sudoku grid detected");
      }
      setOriginalGrid(grid);

      const solved = solveSudokuByImage([...grid.map((row) => [...row])]);
      if (!solved) {
        throw new Error("Could not solve the Sudoku puzzle");
      }
      setSolvedGrid(solved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error processing image");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderCell = (value: number, index: number, isOriginal: boolean) => (
    <div
      key={index}
      className={`aspect-square flex items-center justify-center text-lg font-medium 
        ${isOriginal ? "text-blue-700 font-bold" : "text-gray-700"} 
        border border-gray-300 bg-white
        ${index % 3 === 2 && index !== 8 ? "border-r-2 border-r-gray-400" : ""}
        ${
          Math.floor(index / 9) % 3 === 2 && Math.floor(index / 9) !== 8
            ? "border-b-2 border-b-gray-400"
            : ""
        }`}
    >
      {value !== 0 ? value : ""}
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-sm border border-1 py-4 mt-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Solve your Sudoku puzzle with an image
        </h1>
        <p className="text-gray-500">
          Upload an image of a Sudoku puzzle to solve it
        </p>
      </div>

      <div className="space-y-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white rounded-md text-sm"
        />

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {image && (
            <div className="flex justify-center">
              <img
                src={image}
                alt="Uploaded Sudoku"
                className="object-contain w-[200px] h-[200px] border border-gray-300 rounded-md"
              />
            </div>
          )}

          {solvedGrid.length > 0 && (
            <>
              <ArrowRightIcon className="w-5 h-5 hidden md:block" />
              <div className="w-[350px]">
                <div className="grid grid-cols-9 gap-1 p-4 bg-gray-100 rounded-md border border-black">
                  {solvedGrid
                    .flat()
                    .map((num, index) =>
                      renderCell(num, index, originalGrid.flat()[index] !== 0)
                    )}
                </div>
              </div>
            </>
          )}
        </div>

        <Button
          onClick={processImage}
          disabled={!image || isProcessing}
          className="w-full"
        >
          {isProcessing && (
            <LoaderCircle
              className="-ms-1 me-2 animate-spin"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
          {isProcessing ? "Processing..." : "Solve Sudoku"}
        </Button>

        {error && (
          <div className="text-red-500 bg-red-100 p-4 rounded-md text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default SudokuSolver;