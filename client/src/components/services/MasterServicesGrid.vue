<template>
  <el-table :data="schedule">
    <el-table-column
      label="Клиент"
    >
      <template #default="scope">
        {{ scope.row.user.username }}
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
  </el-table>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/services/action-types'

export default {
  name: 'MasterServicesGrid',
  setup () {
    const store = useStore()

    onMounted(() => {
      store.dispatch(ActionTypes.GET_MECHANIC_SCHEDULE)
    })

    const schedule = computed(() => store.getters.getMechanicSchedule)

    return {
      schedule
    }
  }
}
</script>

<style scoped>

</style>
