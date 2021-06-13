<template>
  <el-table :data="schedule">
    <el-table-column
      label="Клиент"
    >
      <template #default="scope">
        {{ scope.row.user.username }}
        <span v-if="scope.row.user.carModel">({{ scope.row.user.carModel }})</span>
      </template>
    </el-table-column>
    <el-table-column label="Состояние" prop="state">
      <template #default="scope">
        {{ getMessageByState(scope.row.state) }}
      </template>
    </el-table-column>
    <el-table-column label="Услуга">
      <template #default="scope">
        {{ scope.row.service.name }}
      </template>
    </el-table-column>
    <el-table-column label="Описание услуги">
      <template #default="scope">
        {{ scope.row.service.description }}
      </template>
    </el-table-column>
    <el-table-column label="Дата">
      <template #default="scope">
        {{ scope.row.date }}
      </template>
    </el-table-column>
    <el-table-column label="Время">
      <template #default="scope">
        {{ scope.row.time }}
      </template>
    </el-table-column>
    <el-table-column label="Действия">
      <template #default="scope">
        <template v-if="scope.row.state === 'created'">
          <el-button type="success" @click="checkIn(scope.row, 'in_service')">Клиент прибыл</el-button>
          <el-button type="danger" @click="checkIn(scope.row, 'service_canceled')">Клиент не явился</el-button>
        </template>
        <el-button
          v-else-if="scope.row.state === 'in_service'"
          @click="checkIn(scope.row, 'service_provided')"
          type="success"
        >
          Завершить работу
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button
    @click="updateTable"
  >Обновить данные таблицы</el-button>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/services/action-types'
import { getMessageByState } from '@/helpers/ServiceStates'

export default {
  name: 'MasterServicesGrid',
  setup () {
    const store = useStore()

    onMounted(() => {
      store.dispatch(ActionTypes.GET_MECHANIC_SCHEDULE)
    })

    const schedule = computed(() => sortMasterSchedule(store.getters.getMechanicSchedule))

    function sortMasterSchedule (schedule) {
      return [...schedule].sort((a, b) => {
        // TODO implement smart sort
        return 0
      })
    }

    function checkIn (data, state) {
      store.dispatch(
        ActionTypes.CHANGE_SERVICE_STATE, {
          state,
          mechanicId: data.mechanicId,
          date: data.date,
          time: data.time,
          serviceId: data.service._id,
          clientId: data.user._id
        }
      )
    }

    function updateTable () {
      store.dispatch(ActionTypes.GET_MECHANIC_SCHEDULE)
    }

    return {
      schedule,
      getMessageByState,
      checkIn,
      updateTable
    }
  }
}
</script>

<style scoped>

</style>
