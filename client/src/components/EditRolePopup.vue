<template>
  <el-dialog
    title="Редактирование роли пользователя"
    v-model="dialogVisible"
  >
    {{ errorMessage }}
    <el-form
      :model="formData"
      ref="formRef"
      :rules="rules"
    >
      <el-form-item label="Идентификатор">
        <el-input
          v-model="formData._id"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="Эл. адрес">
        <el-input v-model="formData.email" disabled></el-input>
      </el-form-item>
      <el-form-item label="Имя пользователя" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="Роль" prop="role">
        <el-select
          v-model="formData.role"
          placeholder="Выберите роль"
        >
          <el-option
            v-for="role in rolesList"
            :key="role.value"
            :label="role.label"
            :value="role.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <template v-if="formData.role !== 'client'">
        <el-form-item label="Зарплата" prop="salary">
          <el-input-number v-model="formData.salary"></el-input-number>
        </el-form-item>
        <el-form-item label="Номер телефона" prop="phone">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="Адрес" prop="address">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <el-button @click="save" type="success">
      Сохранить
    </el-button>
    <el-button @click="dialogVisible = false">
      Закрыть
    </el-button>
  </el-dialog>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/users/action-types'

export default {
  name: 'EditRolePopup',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    userData: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  setup (props, { emit }) {
    const store = useStore()
    const dialogVisible = computed({
      get: () => props.visible,
      set: () => emit('close')
    })
    const formRef = ref(null)
    const errorMessage = ref('')

    const rules = reactive({
      username: {
        required: true,
        message: 'Имя пользователя не должно быть пустым.'
      },
      salary: {
        message: 'Введите зарплату сотрудника',
        required: true
      },
      phone: [{
        required: true,
        message: 'Ввдеите номер телефона сотрудника'
      }, {
        message: 'Неверный формат номера телефона',
        validator (rule, value, cb) {
          if (/^((\+?7)|(^8))[ -]?\d{3}[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/.test(value)) {
            return cb()
          }
          cb(new Error('Неверный формат номера телефона'))
        }
      }],
      address: {
        required: true,
        message: 'Введите адрес'
      }
    })

    const formData = reactive({
      username: props.userData.username,
      email: props.userData.email,
      role: props.userData.role,
      _id: props.userData._id,
      salary: props.userData.salary,
      address: props.userData.address,
      phone: props.userData.phone
    })

    function Role (label, value) {
      this.label = label
      this.value = value
    }

    const rolesList = [
      new Role('Клиент', 'client'),
      new Role('Механик', 'mechanic'),
      new Role('Менеджер', 'manager')
    ]

    function save () {
      formRef.value.validate(valid => {
        if (!valid) {
          return false
        }
        store.dispatch(
          ActionTypes.UPDATE_USER_INFO,
          formData
        )
          .then(() => emit('close'))
          .catch(e => {
            errorMessage.value = e.response.data?.message
          })
      })
    }

    return {
      dialogVisible,
      formData,
      rolesList,
      save,
      rules,
      formRef,
      errorMessage
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>
