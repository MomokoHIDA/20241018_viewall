import React, { useState } from 'react';
import { Employee, Department } from '../types';
import EmployeeModal from './EmployeeModal';

interface EmployeeListProps {
  employees: Employee[];
  departments: Department[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, departments }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const groupedEmployees = employees.reduce((acc, employee) => {
    const dept = departments.find(d => d.id === employee.departmentId);
    if (dept) {
      if (!acc[dept.name]) {
        acc[dept.name] = [];
      }
      acc[dept.name].push(employee);
    }
    return acc;
  }, {} as Record<string, Employee[]>);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Object.entries(groupedEmployees).map(([deptName, deptEmployees]) => (
        <div key={deptName} className="space-y-2">
          <h3 className="font-semibold text-lg text-blue-800">{deptName}</h3>
          {deptEmployees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => setSelectedEmployee(employee)}
              className="bg-white p-3 rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{employee.name}</span>
                <span className={`text-sm ${getStatusColor(employee.status)}`}>
                  {employee.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
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

export default EmployeeList;