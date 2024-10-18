export interface Employee {
  id: number;
  name: string;
  departmentId: number;
  status: string;
  clockInTime: string;
}

export interface Department {
  id: number;
  name: string;
}