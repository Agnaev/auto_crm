<template>
  <el-alert
    v-if="userCreated"
    type="success"
    effect="dark"
  >
    Пользователь успешно создан
  </el-alert>
  <el-alert
    type="error"
    effect="dark"
    v-else-if="!!errorMessage"
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
    <el-form-item prop="username" label="Ф.И.О">
      <el-input
        v-model="ruleForm.username"
        placeholder="Введите ваше Ф.И.О"
      />
    </el-form-item>
    <el-form-item label="Пароль" prop="password">
      <el-input
        v-model="ruleForm.password"
        autocomplete="off"
        placeholder="Ввдеите ваш пароль"
        type="password"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="Повторите пароль"
      prop="passwordRepeat"
    >
      <el-input
        v-model="ruleForm.passwordRepeat"
        placeholder="Повторите пароль"
        type="password"
      />
    </el-form-item>
    <el-form-item
      label="Модель вашего авто"
      prop="carModel"
    >
<!--      <el-input-->
<!--        v-model="ruleForm.carModel"-->
<!--        placeholder="Введите модель вашего автомобиля"-->
<!--      />-->
      <el-select
        v-model="ruleForm.carModel"
        filterable
        remote
        :remote-method="search"
        @select="handleSelect"
        placeholder="Введите модель вашего автомобиля"
      >
        <el-option
          v-for="item in carNames"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-button
      type="success"
      @click="submit"
    >Регистрация</el-button>
  </el-form>
</template>

<script>
import {
  reactive,
  ref,
  onMounted,
  computed
} from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/car-models/action-types'
import AuthActionTypes from '@/store/auth/action-types'

export default {
  name: 'Registration',
  setup () {
    const store = useStore()
    const ruleForm = reactive({
      password: '',
      email: '',
      passwordRepeat: '',
      carModel: '',
      username: ''
    })
    const formRef = ref(null)
    const userCreated = ref(false)
    const errorMessage = ref('')

    const requiredInput = message => ({
      required: true,
      trigger: 'input',
      message
    })

    const rules = {
      password: [
        requiredInput('Введите пароль'),
        {
          message: 'Длина пароля должно быть больше 6 символов',
          validator: (_, value) => value.length > 6
        }
      ],
      email: [
        requiredInput('Введите эл. адрес'),
        {
          type: 'email',
          message: 'Введите корректный адрес эл. почты',
          trigger: ['blur', 'change']
        }
      ],
      passwordRepeat: [
        requiredInput('Введите пароль еще раз'),
        {
          message: 'Пароли должны совпадать',
          validator: passwordsMatch
        }
      ],
      carModel: requiredInput('Введите модель вашего автомобиля'),
      username: requiredInput('Введите ваше Ф.И.О')
    }

    function passwordsMatch (rule, value, callback) {
      if (value !== ruleForm.password) {
        return callback(new Error())
      }
      callback()
    }

    function submit () {
      formRef.value.validate(valid => {
        if (!valid) {
          return false
        }
        if (ruleForm.password !== ruleForm.passwordRepeat) {
          return false
        }
        console.log('sending data', ruleForm)
        store.dispatch(
          AuthActionTypes.SIGNUP,
          {
            password: ruleForm.password,
            email: ruleForm.email,
            username: ruleForm.username,
            carModel: ruleForm.carModel
          }
        )
          .then(() => {
            userCreated.value = true
            Object
              .keys(ruleForm)
              .forEach(key => {
                ruleForm[key] = ''
              })
          })
          .catch(e => {
            errorMessage.value = e.response.data?.message
          })
      })
    }

    function search (name) {
      store.dispatch(
        ActionTypes.FETCH_CAR_MODEL_NAMES,
        { name }
      )
    }

    onMounted(
      () => search('')
    )

    const carNames = computed({
      get: () => store.getters.carNamesList
    })

    function handleSelect (item) {
      console.log(item)
    }

    return {
      ruleForm,
      rules,
      formRef,
      submit,
      carNames,
      handleSelect,
      search,
      userCreated,
      errorMessage
    }
  }
}
</script>

<style scoped lang="scss">
.auth-form {
  .el-form-item {
    padding-bottom: 5px
  }
}
</style>
