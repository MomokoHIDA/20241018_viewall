<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-semibold text-blue-800 mb-4">打刻</h2>
      <div class="space-y-4">
        <button v-for="action in ['出勤', '退勤', '外出', '戻り']" :key="action"
                @click="selectedAction = action"
                :class="['w-full py-2 px-4 rounded-md transition-colors',
                         selectedAction === action ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 hover:bg-blue-200']">
          {{ action }}
        </button>
      </div>
      <div class="mt-6 flex justify-end">
        <button @click="handleClockIn"
                :disabled="!selectedAction"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
          打刻する
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ClockInModal',
  emits: ['close'],
  setup(props, { emit }) {
    const selectedAction = ref(null)

    const handleClockIn = () => {
      console.log(`打刻アクション: ${selectedAction.value}`)
      // Here you would typically send the clock-in data to your backend
      emit('close')
    }

    return {
      selectedAction,
      handleClockIn
    }
  }
}
</script>