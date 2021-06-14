<template>
  <div class="app-header" style="z-index: 3">
    <div class="app-header__logo">
      TOYOTA
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
      <el-menu-item index="/orders" v-if="permissions.manager || permissions.manager">
        Заказы
      </el-menu-item>
      <el-menu-item index="/shopping-cart">
        Корзина
      </el-menu-item>
      <el-menu-item index="/services">
        Услуги
      </el-menu-item>
      <el-menu-item index="/profile">
        Профиль пользователя
      </el-menu-item>
      <el-menu-item>
        <el-button @click="logout">
          Выход
        </el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ActionTypes from '@/store/auth/action-types'

export default {
  name: 'AppHeader',
  setup () {
    const activeIndex = ref('/')
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    onMounted(() => {
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

    async function logout () {
      await store.dispatch(
        ActionTypes.LOGOUT
      )
      await router.push({
        name: 'Login'
      })
    }

    return {
      activeIndex,
      permissions,
      logout
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
  background-color: white;

  &__logo {
    width: 320px;
    height: 50px;
    padding: 10px;
    border-right: 2px solid #555;
    font-size: 20px;
    font-weight: bold;
  }
  &__links {
    width: calc(100% - 320px);
  }
}
.el-menu-item:last-child {
  margin-left: auto;
}
</style>
