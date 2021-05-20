<template>
  <div class="app-header">
    <div class="app-header__logo">
      Diploma
    </div>
    <el-menu
      :default-active="activeIndex"
      class="app-header__links"
      mode="horizontal"
      unique-opened
      text-color="#000"
      :router="true"
    >
      <el-menu-item
        index="/"
      >
        Главная
      </el-menu-item>
      <el-menu-item
        index="/store"
      >
        Интернет-магазин
      </el-menu-item>
      <el-menu-item
        index="/users"
        v-if="permissions.admin"
      >
        Пользователи
      </el-menu-item>
      <el-menu-item
        index="/orders"
        v-if="permissions.manager || permissions.admin">
        Заказы
      </el-menu-item>
      <el-menu-item
        index="/services"
        v-if="permissions.mechanic || permissions.manager || permissions.admin"
      >
        Services
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'AppHeader',
  setup () {
    const activeIndex = ref('/')
    const store = useStore()

    onMounted(() => {
      const route = useRoute()
      const matchedPath = route.path.match(/^\/[a-zA-Z-]*/)
      activeIndex.value = matchedPath?.length
        ? matchedPath[0]
        : '/'
    })

    const role = store.getters.getUserData.role
    const permissions = {
      mechanic: role === 'mechanic',
      manager: role === 'manager',
      admin: role === 'admin'
    }
    return {
      activeIndex,
      permissions
    }
  }
}
</script>

<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  box-shadow: 0 0 31px rgba(0, 0, 0, 0.13);
  display: flex;
  align-items: center;
  z-index: 1;

  &__logo {
    width: 320px;
    height: 50px;
    padding: 10px;
    border-right: 2px solid #555;
  }
  &__links {
    width: calc(100% - 320px);
  }
}
</style>
