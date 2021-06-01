<template>
  <div class="services-list">
    <el-tabs type="card">
      <el-tab-pane label="Админ" v-if="canEdit">
        <admin-view />
      </el-tab-pane>
      <el-tab-pane :label="canEdit ? 'Клиент' : 'Сервисы'">
        <client-view />
      </el-tab-pane>
      <el-tab-pane label="Мои записи">
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
import UserServicesGrid from '@/components/services/UserServicesGrid'
import ActionTypes from '@/store/services/action-types'

export default {
  name: 'Services',
  components: {
    AdminView,
    ClientView,
    UserServicesGrid
  },
  setup () {
    const store = useStore()
    const role = computed(() => store.getters.getUserData?.role ?? '')
    const canEdit = computed(() => role.value === 'admin' || role.value === 'manager')

    onMounted(() => {
      store.dispatch(
        ActionTypes.FETCH_SERVICES_LIST
      )
    })

    return {
      canEdit
    }
  }
}
</script>

<style scoped>
.services-list {
  margin: 20px
}
</style>
