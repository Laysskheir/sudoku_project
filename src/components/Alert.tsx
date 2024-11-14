import { CircleAlert } from "lucide-react";
import { Button } from "../utils/button";

interface AlertProps {
  message: string;
  subMessage: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Alert = ({ message, subMessage, onCancel, onConfirm }: AlertProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-4 py-6 rounded-md shadow-2xl max-w-xl w-full">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0">
            <CircleAlert className="text-red-500 bg-red-100 rounded-full size-10 p-2" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-gray-800">{message}</h2>
            <p className="text-gray-600 mt-2">{subMessage}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button
            onClick={onCancel}
            variant="outline"
            className="bg-gray-300 transition duration-150"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onCancel();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Alert;