<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">従業員一覧</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="department in departments" :key="department.id" class="space-y-2">
        <h3 class="font-semibold text-lg text-blue-800">{{ department.name }}</h3>
        <div v-for="employee in employeesByDepartment(department.id)" :key="employee.id"
             class="bg-white p-3 rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow"
             @click="selectEmployee(employee)">
          <div class="flex justify-between items-center">
            <span class="font-medium">{{ employee.name }}</span>
            <span :class="getStatusColor(employee.status)">{{ employee.status }}</span>
          </div>
        </div>
      </div>
    </div>
    <EmployeeModal v-if="selectedEmployee" :employee="selectedEmployee" @close="selectedEmployee = null" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import EmployeeModal from '../components/EmployeeModal.vue'

export default {
  name: 'EmployeeList',
  components: {
    EmployeeModal
  },
  setup() {
    const departments = ref([])
    const employees = ref([])
    const selectedEmployee = ref(null)

    const fetchData = async () => {
      try {
        const [deptResponse, empResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/departments/'),
          axios.get('http://localhost:8000/api/employees/')
        ])
        departments.value = deptResponse.data
        employees.value = empResponse.data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    onMounted(fetchData)

    const employeesByDepartment = (departmentId) => {
      return employees.value.filter(emp => emp.department === departmentId)
    }

    const getStatusColor = (status) => {
      switch (status) {
        case '出勤': return 'text-green-600'
        case '退勤': return 'text-red-600'
        case '外出': return 'text-yellow-600'
        default: return 'text-gray-600'
      }
    }

    const selectEmployee = (employee) => {
      selectedEmployee.value = employee
    }

    return {
      departments,
      employees,
      selectedEmployee,
      employeesByDepartment,
      getStatusColor,
      selectEmployee
    }
  }
}
</script>