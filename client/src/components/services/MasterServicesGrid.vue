<template>
  <el-select
    v-if="isAdminOrManager"
    v-model="master"
    placeholder="Выберите мастера, расписание которого хотите посмотреть"
  >
    <el-option
      v-for="item in mastersList"
      :key="item._id"
      :label="item.username"
      :value="item._id"
    ></el-option>
  </el-select>
  <el-table :data="schedule" border>
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
    :disabled="!master"
  >Обновить данные таблицы</el-button>
</template>

<script>
import { computed, ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/services/action-types'
import UsersActionTypes from '@/store/users/action-types'
import { getMessageByState } from '@/helpers/ServiceStates'

export default {
  name: 'MasterServicesGrid',
  setup () {
    const store = useStore()

    const role = computed(() => store.getters.getUserData.role)
    const isAdminOrManager = computed(() => ['admin', 'master'].includes(role.value))
    const mastersList = computed(() => store.getters.getMechanicsList)
    const master = ref(
      store.getters.getUserData.role === 'mechanic'
        ? store.getters.getUserData.userId
        : ''
    )
    const loader = ref(false)

    onMounted(async () => {
      loader.value = true
      if (isAdminOrManager.value) {
        await store.dispatch(UsersActionTypes.FETCH_MECHANICS_LIST)
      } else {
        await store.dispatch(ActionTypes.GET_MECHANIC_SCHEDULE)
      }
      loader.value = false
    })

    function getScheduleByMechanic (masterId) {
      loader.value = true
      store.dispatch(ActionTypes.GET_SCHEDULE_BY_MECHANIC, {
        masterId
      })
        .then(() => {
          loader.value = false
        })
    }

    if (isAdminOrManager.value) {
      watch(
        () => master.value,
        getScheduleByMechanic
      )
    }

    const schedule = computed(() => sortMasterSchedule(store.getters.getMechanicSchedule))

    function sortMasterSchedule (schedule) {
      return schedule
    }

    function checkIn (data, state) {
      loader.value = true
      store.dispatch(
        ActionTypes.CHANGE_SERVICE_STATE, {
          state,
          masterId: master.value,
          date: data.date,
          time: data.time,
          serviceId: data.service._id,
          clientId: data.user._id
        }
      ).then(() => {
        loader.value = false
      })
    }

    function updateTable () {
      loader.value = true
      store.dispatch(ActionTypes.GET_MECHANIC_SCHEDULE, { masterId: master.value })
        .then(() => {
          loader.value = false
        })
    }

    return {
      schedule,
      getMessageByState,
      checkIn,
      updateTable,
      mastersList,
      role,
      isAdminOrManager,
      master,
      loader
    }
  }
}
</script>

<style scoped>

</style>
