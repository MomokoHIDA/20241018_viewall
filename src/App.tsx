import React, { useState, useEffect } from 'react';
import { Clock, Users, Building2, UserCheck } from 'lucide-react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import EmployeeList from './components/EmployeeList';
import ClockInModal from './components/ClockInModal';
import { Employee, Department } from './types';

const departments: Department[] = [
  { id: 1, name: '営業部' },
  { id: 2, name: '開発部' },
  { id: 3, name: '人事部' },
];

const employees: Employee[] = [
  { id: 1, name: '山田太郎', departmentId: 1, status: '出勤', clockInTime: '09:00' },
  { id: 2, name: '佐藤花子', departmentId: 2, status: '退勤', clockInTime: '18:00' },
  { id: 3, name: '鈴木一郎', departmentId: 3, status: '外出', clockInTime: '14:30' },
  // Add more employees as needed
];

function App() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showClockInModal, setShowClockInModal] = useState<boolean>(false);
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'all', name: '全社', icon: <Users className="w-5 h-5" /> },
    ...departments.map(dept => ({
      id: dept.id.toString(),
      name: dept.name,
      icon: <Building2 className="w-5 h-5" />
    }))
  ];

  const filteredEmployees = activeTab === 'all'
    ? employees
    : employees.filter(emp => emp.departmentId.toString() === activeTab);

  return (
    <div className="min-h-screen bg-blue-50">
      <Header currentDateTime={currentDateTime} onClockInClick={() => setShowClockInModal(true)} />
      <main className="container mx-auto px-4 py-8">
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <EmployeeList employees={filteredEmployees} departments={departments} />
      </main>
      {showClockInModal && (
        <ClockInModal onClose={() => setShowClockInModal(false)} />
      )}
    </div>
  );
}

export default App;