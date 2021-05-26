<template>
  <el-alert
    type="error"
    effect="dark"
    v-if="!!errorMessage"
    @close="errorMessage = ''"
  >
    {{ errorMessage }}
  </el-alert>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="formRef"
    label-width="120px"
    class="auth-form"
    label-position="left"
  >
    <el-form-item
      label="email"
      prop="email"
    >
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
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
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
    const errorMessage = ref('')

    const rules = {
      password: {
        required: true,
        message: 'Введите пароль',
        trigger: 'input'
      },
      email: [{
        required: true,
        message: 'Введите эл. адрес',
        trigger: 'input'
      }, {
        type: 'email',
        message: 'Введите корректный адрес эл. почты',
        trigger: ['blur', 'change']
      }]
    }

    function submit () {
      formRef.value.validate(valid => {
        if (!valid) {
          return false
        }
        const { email, password } = ruleForm
        store.dispatch(
          ActionTypes.LOGIN,
          { password, email }
        )
          .then(() => {
            router.push({
              path: route.query.redirect || '/'
            })
          })
          .catch(e => {
            errorMessage.value = e.response.data?.message
          })
      })
    }

    return {
      ruleForm,
      rules,
      formRef,
      submit,
      errorMessage
    }
  }
}
</script>

<style scoped>

</style>
