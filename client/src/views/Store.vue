<template>
  <div class="products-list">
    <el-tabs type="card" v-if="role === 'admin' || role === 'manager'">
      <el-tab-pane label="Админ">
        <store-admin-view />
      </el-tab-pane>
      <el-tab-pane label="Клиент">
        <store-client-view />
      </el-tab-pane>
    </el-tabs>
    <store-client-view v-else />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import StoreAdminView from '@/components/store/StoreAdminView'
import StoreClientView from '@/components/store/StoreClientView'
import ActionTypes from '@/store/store/action-types'

export default {
  name: 'Store',
  components: {
    StoreAdminView,
    StoreClientView
  },
  setup () {
    const store = useStore()
    const role = computed(() => store.getters.getUserData?.role ?? '')

    onMounted(() => {
      store.dispatch(
        ActionTypes.FETCH_PRODUCTS_LIST
      )
    })

    return {
      role
    }
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  grid-column-gap: 20px;

  margin: 20px 20px;
}
.products-list {
  margin: 20px;
}
</style>
