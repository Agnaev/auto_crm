<template>
  <el-table :data="myServiceRecords">
    <el-table-column label="Название услуги">
      <template #default="scope">
        {{ scope.row.service.name }}
      </template>
    </el-table-column>
    <el-table-column label="Описание услуги">
      <template #default="scope">
        {{ scope.row.service.description }}
      </template>
    </el-table-column>
    <el-table-column label="Цена">
      <template #default="scope">
        {{ scope.row.service.price }}
      </template>
    </el-table-column>
    <el-table-column label="Время в ч">
      <template #default="scope">
        {{ scope.row.service.timeInHours }}
      </template>
    </el-table-column>
    <el-table-column
      label="Состоние услуги"
      prop="state"
    >
      <template #default="scope">
        {{ getMessageByState(scope.row.state) }}
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
    <el-table-column>
      <template #default="scope">
        <el-popconfirm
          title="Вы уверены что хотите отказаться от услуги?"
          @confirm="cancelService(scope.row)"
          v-if="scope.row.state === 'created'"
        >
          <template #reference>
            <el-button type="danger">Отменить запись</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-button @click="reload">Обновить таблицу</el-button>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/services/action-types'
import RegisterActionTypes from '@/store/register-for-service/action-types'
import { getMessageByState } from '@/helpers/ServiceStates'

export default {
  name: 'UserServicesGrid',
  setup () {
    const store = useStore()
    const myServiceRecords = computed(() => store.getters.getMyServiceRecords)

    onMounted(() => {
      store.dispatch(ActionTypes.FETCH_MY_SERVICE_RECORDS)
    })

    function cancelService (service) {
      store.dispatch(
        RegisterActionTypes.CANCEL_REGISTRATION_FOR_SERVICE,
        {
          mechanicId: service.mechanicId,
          date: service.date,
          time: service.time
        }
      )
    }

    function reload () {
      store.dispatch(ActionTypes.FETCH_MY_SERVICE_RECORDS)
    }

    return {
      myServiceRecords,
      cancelService,
      reload,
      getMessageByState
    }
  }
}
</script>

<style scoped>

</style>
