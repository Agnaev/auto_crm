<template>
  <div class="services-list">
    <el-tabs type="card" v-if="role === 'manager' || role === 'admin'">
      <el-tab-pane label="Админ">
        <admin-view :data="data"/>
      </el-tab-pane>
      <el-tab-pane label="Клиент">
        <client-view
          :data="data"
        ></client-view>
      </el-tab-pane>
    </el-tabs>
    <client-view
      v-else
      :data="data"
    ></client-view>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AdminView from '@/components/services/AdminView'
import ClientView from '@/components/services/ClientView'
import ActionTypes from '@/store/services/action-types'
export default {
  name: 'Services',
  components: {
    AdminView,
    ClientView
  },
  setup () {
    const store = useStore()
    const data = computed(() => store.getters.getServicesList)
    const role = computed(() => store.getters.getUserData?.role ?? '')

    onMounted(() => {
      store.dispatch(
        ActionTypes.FETCH_SERVICES_LIST
      )
    })

    return {
      data,
      role
    }
  }
}
</script>

<style scoped>
.services-list {
  margin: 20px
}
</style>
