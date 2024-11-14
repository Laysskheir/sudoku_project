import React from "react";

interface NumberPadProps {
  onNumberSelect: (num: number) => void;
}

const NumberPad: React.FC<NumberPadProps> = ({
  onNumberSelect,
}) => {
  return (
    <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 my-6 sm:gap-4 w-full max-w-full mx-auto sm:ml-24">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => onNumberSelect(num)}
          className="relative aspect-square bg-white rounded-xl border-4  hover:text-blue-500 text-base font-medium transition-all duration-200 shadow-lg shadow-blue-900/5 border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 "
        >
          <span>{num}</span>
        </button>
      ))}
    </div>
  );
};

export default NumberPad;
