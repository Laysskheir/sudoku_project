import Cell from "./Cell";

type GridContainerProps = {
  grid: Array<Array<number | null>>;
  initialGrid: Array<Array<number | null>>;
  selectedCell: [number, number] | null;
  invalidCells: boolean[][];
  onCellClick: (row: number, col: number) => void;
};

const GridContainer = ({
  grid,
  initialGrid,
  selectedCell,
  invalidCells,
  onCellClick,
}: GridContainerProps) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="grid grid-cols-9 gap-[2px] bg-gray-300 border-black border-2 overflow-hidden">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              isInitial={initialGrid[rowIndex][colIndex] !== null}
              isSelected={
                selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex
              }
              isHighlighted={
                !!selectedCell &&
                (selectedCell[0] === rowIndex ||
                  selectedCell[1] === colIndex ||
                  (Math.floor(selectedCell[0] / 3) ===
                    Math.floor(rowIndex / 3) &&
                    Math.floor(selectedCell[1] / 3) ===
                      Math.floor(colIndex / 3)))
              }
              isInvalid={invalidCells[rowIndex]?.[colIndex] || false}
              onClick={() => onCellClick(rowIndex, colIndex)}
              borderClasses={`${
                rowIndex % 3 === 0 && rowIndex > 0 ? "border-t-2 border-black" : ""
              } ${
                colIndex % 3 === 0 && colIndex > 0 ? "border-l-2 border-black" : ""
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GridContainer;