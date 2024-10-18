<template>
  <div id="app">
    <header class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">IC Card Attendance System</h1>
        <div class="flex items-center space-x-4">
          <span>{{ currentDateTime }}</span>
          <button @click="showClockInModal = true" class="bg-white text-blue-600 px-4 py-2 rounded-md">打刻</button>
        </div>
      </div>
    </header>
    <main class="container mx-auto p-4">
      <router-view></router-view>
    </main>
    <ClockInModal v-if="showClockInModal" @close="showClockInModal = false" />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import ClockInModal from './components/ClockInModal.vue'

export default {
  name: 'App',
  components: {
    ClockInModal
  },
  setup() {
    const currentDateTime = ref('')
    const showClockInModal = ref(false)

    const updateDateTime = () => {
      const now = new Date()
      currentDateTime.value = now.toLocaleString('ja-JP')
    }

    let timer
    onMounted(() => {
      updateDateTime()
      timer = setInterval(updateDateTime, 1000)
    })

    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      currentDateTime,
      showClockInModal
    }
  }
}
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>