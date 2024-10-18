<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-semibold text-blue-800 mb-4">{{ employee.name }}</h2>
      <div class="space-y-2">
        <p><strong>部署:</strong> {{ employee.department_name }}</p>
        <p><strong>状態:</strong> <span :class="getStatusColor(employee.status)">{{ employee.status }}</span></p>
        <p><strong>打刻時刻:</strong> {{ formatDateTime(employee.clock_in_time) }}</p>
      </div>
      <div class="mt-6 flex justify-end">
        <button @click="$emit('close')" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          閉じる
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeModal',
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  setup() {
    const getStatusColor = (status) => {
      switch (status) {
        case '出勤': return 'text-green-600'
        case '退勤': return 'text-red-600'
        case '外出': return 'text-yellow-600'
        default: return 'text-gray-600'
      }
    }

    const formatDateTime = (dateTimeString) => {
      if (!dateTimeString) return 'N/A'
      const date = new Date(dateTimeString)
      return date.toLocaleString('ja-JP')
    }

    return {
      getStatusColor,
      formatDateTime
    }
  }
}
</script>