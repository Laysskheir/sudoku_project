import { Pause } from "lucide-react";

type PauseOverlayProps = {
  isPaused: boolean;
};

const PauseOverlay = ({ isPaused }: PauseOverlayProps) => {
  if (!isPaused) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-10">
      <Pause className="w-16 h-16 text-black" />
    </div>
  );
};

export default PauseOverlay;
