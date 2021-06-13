<template>
  <footer class="footer">
    <el-divider />
    <el-row>
      <el-col>
        <div class="links">
          <el-link @click.prevent="goto('/')">Главная страница</el-link>
          <el-link @click.prevent="goto('/store')">Интернет-магазин</el-link>
          <el-link @click.prevent="goto('/users')" v-if="role === 'admin'">Пользователи</el-link>
          <el-link @click.prevent="goto('/orders')">Заказы</el-link>
          <el-link @click.prevent="goto('/shopping-cart')">Корзина</el-link>
          <el-link @click.prevent="goto('/services')">Услуги</el-link>
          <el-link @click.prevent="goto('/profile')">Профиль пользователя</el-link>
        </div>
      </el-col>
    </el-row>
    <span class="copyright">
      Copyright © 2021 Автосервис CRM
    </span>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

export default {
  name: 'AppFooter',
  setup () {
    const store = useStore()

    function goto (path) {
      router.push({
        path
      })
    }

    const role = computed(() => store.getters.getUserData?.role)

    return {
      goto,
      role
    }
  }
}
</script>

<style scoped lang="scss">
.footer {
  min-height: 75px;
  width: 100%;
  span {
    padding-bottom: 20px;
  }
  position: relative;
  bottom: 0;
  z-index: 4;
  background: white;
}
.links {
  display: flex;
  justify-content: space-around;
  & a {
    font-size: 18px;
  }
}
.copyright {
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>
