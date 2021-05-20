<template>
  <el-dialog
    title="Редактирование роли пользователя"
    v-model="dialogVisible"
  >
    <el-form>
      <el-form-item label="Идентификатор">
        <el-input
          v-model="formData._id"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="Имя пользователя">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="Эл. адрес">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="Роль">
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
import { computed, reactive } from 'vue'

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
    const dialogVisible = computed({
      get: () => props.visible,
      set: () => emit('close')
    })

    const formData = reactive({
      username: props.userData.username,
      email: props.userData.email,
      role: props.userData.role,
      _id: props.userData._id
    })

    function Role (label, value) {
      this.label = label
      this.value = value
    }

    const rolesList = [
      new Role('Клиент', 'Client'),
      new Role('Механик', 'Mechanic'),
      new Role('Менеджер', 'Manager')
    ]

    function save () {
      console.log(formData)
      // TODO make save user data
      emit('close')
    }

    return {
      dialogVisible,
      formData,
      rolesList,
      save
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>
