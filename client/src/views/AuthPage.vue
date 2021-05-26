<template>
  <div class="auth-page">
    <div class="auth-page__wrapper">
      <el-tabs>
        <el-tab-pane label="Вход">
          <Login />
        </el-tab-pane>
        <el-tab-pane label="Регистрация">
          <Registration />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Login from '@/components/auth/Login.vue'
import Registration from '@/components/auth/Registration.vue'

export default {
  name: 'Auth',
  components: {
    Login,
    Registration
  }
}
</script>

<style scoped lang="scss">
.auth-page {
  height: 50%;
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    border: 2px solid #404040;
    border-radius: 10px;

    width: 100%;
    max-width: 610px;

    position: absolute;
    top: 50%;
    left: 50%;
    margin: -300px -300px;
    padding: 20px;
  }
}

.auth-form {
  width: 100%;
  max-width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: auto;

  &__submit {
    width: 100%;
    height: 58px;
    background: #09b44d;
    font-weight: bold;
    font-size: 18px;
    border-radius: 6px;
  }

  &__reset {
    color: #8e8e8e;
    font-size: 19px;
  }

  &__verify-title {
    font-size: 15px;
    margin-bottom: 15px;
  }

  &__verify-phone {
    font-weight: bold;
  }
}
</style>
