import React from 'react';
import { Employee } from '../types';
import { X } from 'lucide-react';

interface EmployeeModalProps {
  employee: Employee;
  onClose: () => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ employee, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-800">{employee.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-2">
          <p><strong>状態:</strong> <span className={getStatusColor(employee.status)}>{employee.status}</span></p>
          <p><strong>打刻時刻:</strong> {employee.clockInTime}</p>
        </div>
      </div>
    </div>
  );
};

function getStatusColor(status: string): string {
  switch (status) {
    case '出勤':
      return 'text-green-600';
    case '退勤':
      return 'text-red-600';
    case '外出':
      return 'text-yellow-600';
    default:
      return 'text-gray-600';
  }
}

export default EmployeeModal;