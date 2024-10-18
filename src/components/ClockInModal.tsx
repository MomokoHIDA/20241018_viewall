import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ClockInModalProps {
  onClose: () => void;
}

const ClockInModal: React.FC<ClockInModalProps> = ({ onClose }) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleClockIn = () => {
    // Here you would typically send the clock-in data to your backend
    console.log(`打刻アクション: ${selectedAction}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-800">打刻</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          {['出勤', '退勤', '外出', '戻り'].map((action) => (
            <button
              key={action}
              onClick={() => setSelectedAction(action)}
              className={`w-full py-2 px-4 rounded-md transition-colors ${
                selectedAction === action
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              {action}
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClockIn}
            disabled={!selectedAction}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            打刻する
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClockInModal;