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
        v-model="select.master"
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
        v-model="select.date"
      >
        <template #dateCell="{data}">
          <p :class="[{ 'is-selected': data.isSelected && checkDate(data.date) }]">
            {{ formatDate(data.date) }}
            {{ checkDate(data.date) && data.isSelected ? '✔️' : '' }}
          </p>
        </template>
      </el-calendar>
    </div>
    <div class="select-time" v-else-if="activeStep === 2">
      <el-select
        v-model="select.time"
      >
        <el-option
          v-for="time in times"
          :key="time"
          :label="time"
          :value="time"
        ></el-option>
      </el-select>
    </div>
    <div class="entries-created" v-else>
      <h1 class="service-success">Вы успешно записались на обслуживание</h1>
    </div>
    <div class="buttons-container">
      <el-button @click="prevStep" :disabled="activeStep === 0 || activeStep === 3">Предыдуший шаг</el-button>
      <el-button @click="nextStep" type="success" :disabled="nextButtonDisabled">
        {{ activeStep === 3 ? 'Закрыть' : 'Следующий шаг' }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  computed,
  ref,
  onMounted,
  watch, reactive
} from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/users/action-types'
import RegisterForServiceActionTypes from '@/store/register-for-service/action-types'
import ServiceActionTypes from '@/store/services/action-types'

export default {
  name: 'MakeAnAppointmentDialog',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    service: {
      type: Object,
      required: true
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const popupVisible = computed({
      get: () => props.visible,
      set: () => emit('close')
    })
    const calendar = computed(() => store.getters.getDaysList)
    const times = computed(() => {
      const date = select.date.toLocaleDateString('ru')
      return calendar.value[date]
    })
    const mechanicsList = computed(() => store.getters.getMechanicsList)
    const select = reactive({
      master: mechanicsList.value?.[0],
      date: null,
      time: null
    })
    const activeStep = ref(0)
    const nextButtonDisabled = computed(() =>
      (activeStep.value === 0 && !select.master) ||
      ((activeStep.value === 1 && !select.date) || (select.date && !checkDate(select.date))) ||
      (activeStep.value === 2 && !select.time)
    )

    function nextStep () {
      if (activeStep.value === 2) {
        activeStep.value = 0
        store.dispatch(
          RegisterForServiceActionTypes.REGISTER_FOR_SERVICE,
          {
            mechanicId: select.master,
            serviceId: props.service._id,
            time: select.time,
            date: select.date.toLocaleDateString('ru')
          }
        )
        store.dispatch(ServiceActionTypes.FETCH_MY_SERVICE_RECORDS)
        select.date = null
        select.master = null
        select.time = null
        return emit('close')
      }
      if (activeStep.value === 0) {
        store.dispatch(
          RegisterForServiceActionTypes.GET_DAYS_LIST_BY_SERVICE,
          {
            mechanicId: select.master?._id ?? select.master,
            serviceId: props.service._id
          }
        )
      }
      activeStep.value++
    }

    watch(
      () => select.date,
      value => {
        if (value < new Date()) {
          select.date = null
        }
      }
    )

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

    function checkDate (date) {
      const d = date.toLocaleDateString('ru')
      return d in calendar.value && calendar.value[d].length !== 0
    }

    function formatDate (date) {
      if (!checkDate(date)) {
        return ''
      }
      return date.toLocaleDateString('ru', {
        day: '2-digit',
        month: '2-digit'
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
      select,
      nextButtonDisabled,
      checkDate,
      times
    }
  }
}
</script>

<style scoped>
.buttons-container {
  display: flex;
  justify-content: space-between;
}
.service-success {
  padding: 100px;
}
.is-selected {
  background-color: yellow;
}
.steps {
  padding-bottom: 30px;
}
</style>
