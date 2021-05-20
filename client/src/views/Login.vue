<template>
  <div class="auth-page">
    <div class="auth-page__wrapper">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="formRef"
        label-width="120px"
        class="auth-form"
      >
        <el-form-item label="email" prop="email">
          <el-input
            type="email"
            v-model="ruleForm.email"
            autocomplete="off"
            placeholder="Введите ваш email"
          ></el-input>
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="Ввдеите ваш пароль"
            type="password"
          ></el-input>
        </el-form-item>
        <el-button
          type="success"
          @click="submit"
        >
          Войти
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'
import router from '@/router'
import ActionTypes from '@/store/auth/action-types'

export default {
  name: 'Login',
  setup () {
    const route = useRoute()
    const ruleForm = reactive({
      password: '',
      email: ''
    })
    const formRef = ref(null)

    const rules = {}

    function submit () {
      store.dispatch(
        ActionTypes.LOGIN,
        {
          password: ruleForm.password,
          email: ruleForm.email
        }
      )
        .then(() => {
          router.push({
            path: route.query.redirect || '/'
          })
        })
    }

    return {
      ruleForm,
      rules,
      formRef,
      submit
    }
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
    margin: -100px -300px;
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
