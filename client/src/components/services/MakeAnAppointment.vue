<template>
  <el-dialog
    v-model="popupVisible"
  >
    <el-calendar />
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

    return {
      popupVisible
    }
  }
}
</script>

<style scoped>

</style>
