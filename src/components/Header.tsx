import React from 'react';
import { Clock, UserCheck } from 'lucide-react';

interface HeaderProps {
  currentDateTime: Date;
  onClockInClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentDateTime, onClockInClick }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Clock className="w-6 h-6" />
          <span className="text-xl font-semibold">
            {currentDateTime.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="text-xl font-semibold">
            {currentDateTime.toLocaleTimeString('ja-JP')}
          </span>
        </div>
        <button
          onClick={onClockInClick}
          className="bg-white text-blue-600 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-100 transition-colors"
        >
          <UserCheck className="w-5 h-5" />
          <span>打刻</span>
        </button>
      </div>
    </header>
  );
};

export default Header;