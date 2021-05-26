<template>
  <el-dialog
    v-model="popupVisible"
  >
    <el-calendar >
      <template #dateCell="data">
        <p :class="data.data.isSelected ? 'is-selected' : ''">
          {{ log(data.data) || data.data.day }} {{ data.data.isSelected ? '✔️' : '' }}
        </p>
      </template>
    </el-calendar>
  </el-dialog>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'MakeAnAppointmentDialog',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  setup (props, { emit }) {
    const popupVisible = computed({
      get: () => props.visible,
      set: () => emit('close')
    })

    const log = console.log

    return {
      popupVisible,
      log
    }
  }
}
</script>

<style scoped>

</style>
