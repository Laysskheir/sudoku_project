interface CellProps {
  value: number | null;
  isInitial: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isInvalid: boolean;
  onClick: () => void;
  borderClasses: string;
}

const Cell: React.FC<CellProps> = ({
  value,
  isInitial,
  isSelected,
  isHighlighted,
  isInvalid,
  onClick,
  borderClasses, 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-14 h-11 sm:w-16 sm:h-14 flex items-center justify-center
        text-lg sm:text-xl transition-all duration-200 
        ${isInitial ? 'font-bold text-gray-900' : 'text-blue-600 font-medium'}
        ${isSelected 
          ? 'bg-blue-100 shadow-inner' 
          : isHighlighted 
          ? 'bg-blue-50/70' 
          : 'bg-white hover:bg-gray-50/80'
        }
        ${isInvalid ? 'text-red-500' : ''}
        ${borderClasses} // Apply the borderClasses dynamically
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset
      `}
    >
      {value || ''}
      {isInvalid && (
        <div className="absolute inset-0.5 border-2 border-red-500 rounded-sm pointer-events-none" />
      )}
    </button>
  );
};
 
export default Cell