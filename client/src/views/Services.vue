<template>
  <div class="services-list">
    <el-tabs type="card">
      <el-tab-pane label="Админ" v-if="canEdit">
        <admin-view />
      </el-tab-pane>
      <el-tab-pane :label="canEdit ? 'Клиент' : 'Сервисы'">
        <client-view />
      </el-tab-pane>
      <el-tab-pane label="Расписание" v-if="isMaster || canEdit">
        <master-services-grid />
      </el-tab-pane>
      <el-tab-pane label="Мои записи" v-else>
        <user-services-grid />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AdminView from '@/components/services/AdminView'
import ClientView from '@/components/services/ClientView'
import MasterServicesGrid from '@/components/services/MasterServicesGrid'
import UserServicesGrid from '@/components/services/UserServicesGrid'
import ActionTypes from '@/store/services/action-types'

export default {
  name: 'Services',
  components: {
    AdminView,
    ClientView,
    UserServicesGrid,
    MasterServicesGrid
  },
  setup () {
    const store = useStore()
    const role = computed(() => store.getters.getUserData?.role ?? '')
    const canEdit = computed(() => role.value === 'admin' || role.value === 'manager')
    const isMaster = computed(() => role.value === 'mechanic')

    onMounted(() => {
      store.dispatch(
        ActionTypes.FETCH_SERVICES_LIST
      )
      store.dispatch(
        ActionTypes.GET_MECHANIC_SCHEDULE
      )
    })

    return {
      canEdit,
      isMaster
    }
  }
}
</script>

<style scoped>
.services-list {
  margin: 20px
}
</style>
