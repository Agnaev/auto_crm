<template>
  <div class="form">
    <h2>Пользовательские данные</h2>
    <el-form ref="formRef" :rules="formRules" :model="formData">
      <el-form-item label="Идентификатор">
        <el-input v-model="formData._id" disabled />
      </el-form-item>
      <el-form-item label="Эл. почта">
        <el-input v-model="formData.email" disabled />
      </el-form-item>
      <el-form-item label="ФИО" prop="username">
        <el-input v-model="formData.username" />
      </el-form-item>
      <template v-if="formData.role !== 'client'">
        <el-form-item label="Роль">
          <el-input v-model="formData.role" disabled />
        </el-form-item>
        <el-form-item label="Адрес" prop="address">
          <el-input v-model="formData.address" />
        </el-form-item>
        <el-form-item label="номер телефона" prop="phone">
          <el-input v-model="formData.phone" />
        </el-form-item>
        <el-form-item label="Зарплата" prop="salary">
          <el-input v-model="formData.salary" disabled />
        </el-form-item>
      </template>
      <el-button @click="save" type="success">Сохранить</el-button>
    </el-form>
  </div>
  <div class="form">
    <el-form ref="passwordFormRef" :model="password" :rules="passwordFormRules">
      <h2>Изменить пароль</h2>
      <el-form-item label="Старый пароль" prop="oldPassword">
        <el-input show-password v-model="password.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="Пароль" prop="password">
        <el-input show-password v-model="password.password" />
      </el-form-item>
      <el-form-item label="Повторите пароль" prop="repeatPassword">
        <el-input show-password v-model="password.repeatPassword" />
      </el-form-item>
      <el-button type="success" @click="savePassword">Сохранить новый пароль</el-button>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import ActionTypes from '@/store/users/action-types'

export default {
  name: 'UserProfile',
  setup () {
    const store = useStore()
    const formData = reactive({
      role: '',
      username: '',
      salary: '',
      phone: '',
      address: ''
    })
    const formRef = ref(null)

    onMounted(async () => {
      const data = await store.dispatch(
        ActionTypes.GET_CURRENT_USER_INFO
      )
      Object.keys(data).forEach(key => {
        formData[key] = data[key]
      })
    })

    function save () {
      const { username, clientId, address, phone } = formData
      formRef.value.validate(valid => {
        if (!valid) {
          return
        }
        store.dispatch(ActionTypes.SAVE_USER_DATA, {
          clientId,
          username,
          address,
          phone
        })
      })
    }

    const formRules = ref({
      username: requiredInput('ФИО не должно быть пустым'),
      phone: {
        message: 'Неверный формат номера телефона',
        validator (rule, value, cb) {
          if (/^((\+?7)|(^8))[ -]?\d{3}[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/.test(value)) {
            return cb()
          }
          cb(new Error('Неверный формат номера телефона'))
        },
        trigger: 'input'
      }
    })

    function requiredInput (message) {
      return {
        required: true,
        trigger: 'input',
        message
      }
    }

    const lengthPasswordValidator = () => ({
      message: 'Длина пароля должно быть больше 6 символов',
      validator: (_, value) => value.length > 6
    })

    const passwordFormRef = ref(null)
    const passwordFormRules = ref({
      password: [
        lengthPasswordValidator(),
        requiredInput('Введите новый пароль')
      ],
      oldPassword: [
        requiredInput('Введите предыдущий пароль')
      ],
      repeatPassword: [
        lengthPasswordValidator(),
        requiredInput('Повторите пароль'),
        {
          message: 'Пароли должны совпадать',
          validator (rule, value, cb) {
            if (password.password !== password.repeatPassword) {
              return cb(new Error())
            }
            cb()
          }
        }
      ]
    })
    const password = reactive({
      password: '',
      repeatPassword: '',
      oldPassword: ''
    })
    function savePassword () {
      passwordFormRef.value.validate(valid => {
        if (!valid) {
          notification({ title: 'Невозможно сохранить пароль', type: 'error' })
          return false
        }
        store.dispatch(
          ActionTypes.SAVE_NEW_USER_PASSWORD,
          {
            password: password.password,
            oldPassword: password.oldPassword,
            clientId: formData.clientId
          }
        )
          .then(() => {
            notification({ title: 'Пароль успешно сохранен' })
            passwordFormRef.value.resetFields()
          })
          .catch(e => {
            notification({
              title: 'При сохранении нового пароля проихошла ошибка. ' + e.response.data.message,
              type: 'error'
            })
          })
      })
    }

    function notification ({ title, message, type = 'success' }) {
      ElNotification[type]({
        title,
        message,
        showClose: true
      })
    }

    return {
      formData,
      save,
      formRef,
      formRules,
      password,
      passwordFormRef,
      passwordFormRules,
      savePassword,
      notification
    }
  }
}
</script>

<style scoped>
.form {
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #404040;
}
</style>
