<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="formRef"
    label-width="120px"
    class="demo-ruleForm"
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

<style scoped>

</style>
