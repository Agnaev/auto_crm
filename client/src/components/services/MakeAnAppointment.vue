<template>
  <el-dialog
    v-model="popupVisible"
  >
    <div class="steps">
      <el-steps :active="activeStep" finish-status="success" align-center>
        <el-step title="Выбор мастера">
          select master
        </el-step>
        <el-step title="Выбор даты">
          select date by master
        </el-step>
        <el-step title="Выбор времени">
          select time by date
        </el-step>
      </el-steps>
    </div>
    <div class="select-master" v-if="activeStep === 0">
      <el-select
        v-model="selectedMaster"
        placeholder="Выберите мастера"
      >
        <el-option
          v-for="master in mechanicsList"
          :key="master._id"
          :label="master.username"
          :value="master._id"
        ></el-option>
      </el-select>
    </div>
    <div class="select-date" v-else-if="activeStep === 1">
      <el-calendar
        :range="[new Date(), new Date(2021, 6, 24)]"
      >
        <template #dateCell="data">
          <p :class="data.data.isSelected ? 'is-selected' : ''">
            {{ log(data.data) || formatDate(data.data.day) }} {{ data.data.isSelected ? '✔️' : '' }}
          </p>
        </template>
      </el-calendar>
    </div>
    <div class="select-time" v-else-if="activeStep === 2">
      <el-time-select></el-time-select>
    </div>
    <div class="entries-created" v-else>
      Вы успешно записались на обслуживание
    </div>
    <div class="buttons-container">
      <el-button @click="prevStep">Предыдуший шаг</el-button>
      <el-button @click="nextStep" type="success">Следующий шаг</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/users/action-types'

export default {
  name: 'MakeAnAppointmentDialog',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const popupVisible = computed({
      get: () => props.visible,
      set: () => emit('close')
    })
    const mechanicsList = computed(() => store.getters.getMechanicsList)
    const selectedMaster = ref(mechanicsList.value?.[0])
    const activeStep = ref(0)

    function nextStep () {
      if (activeStep.value > 2) {
        activeStep.value = 0
        emit('close')
      } else {
        activeStep.value++
      }
    }

    function prevStep () {
      if (activeStep.value === 0) {
        return
      }
      activeStep.value -= 1
    }

    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setMonth(minDate.getMonth() + 1)
    const range = [minDate, maxDate]

    function formatDate (date) {
      return new Date(date).toLocaleDateString('ru', {
        month: '2-digit',
        day: '2-digit'
      })
    }

    onMounted(() => {
      store.dispatch(
        ActionTypes.FETCH_MECHANICS_LIST
      )
    })

    return {
      popupVisible,
      activeStep,
      nextStep,
      prevStep,
      formatDate,
      range,
      mechanicsList,
      selectedMaster,
      log: console.log
    }
  }
}
</script>

<style scoped>
.buttons-container {
  display: flex;
  justify-content: space-between;
}
</style>
