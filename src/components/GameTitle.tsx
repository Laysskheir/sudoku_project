const GameTitle = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src="/ballons.svg"
        alt="Game Icon"
        className="hidden sm:block absolute bottom-10 translate-x-8 rotate-6 w-52 h-52"
      />

      <div className="flex sm:flex-col flex-row gap-1">
        {"SUDOKU".split("").map((letter, i) => (
          <span
            key={i}
            className="text-8xl hover:scale-110 transform transition-transform duration-300
                       font-bold tracking-tight text-transparent bg-clip-text 
                       bg-gradient-to-b from-blue-700 to-blue-600 drop-shadow-sm "
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GameTitle;
