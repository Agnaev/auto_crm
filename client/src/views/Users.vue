<template>
  <div class="users">
    <el-table
      :data="data"
      border
    >
      <el-table-column
        prop="_id"
        label="Идентификатор"
      ></el-table-column>
      <el-table-column
        prop="username"
        label="Имя пользователя"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="Эл. почта"
      ></el-table-column>
      <el-table-column
        prop="role"
        label="Роль"
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="Действия"
      >
        <template #default="data">
          <el-button
            @click="changeUserRole(data.row)"
          >
            Изменить
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <edit-role-popup
    v-if="popupData"
    :visible="popupVisible"
    :userData="popupData"
    @close="closePopup"
  />
</template>

<script>
import { ref } from 'vue'
import EditRolePopup from '@/components/EditRolePopup'

export default {
  components: {
    EditRolePopup
  },
  setup () {
    const data = ref([{
      _id: Math.random().toString(36).slice(-8),
      username: 'Alan',
      email: 'agnaev@email.ru',
      role: 'admin'
    }, {
      _id: Math.random().toString(36).slice(-8),
      username: 'Adam',
      email: 'adam@email.ru',
      role: 'admin'
    }])

    const popupVisible = ref(false)
    const popupData = ref(null)

    function changeUserRole (data) {
      popupVisible.value = true
      popupData.value = data
    }

    function closePopup () {
      popupVisible.value = false
      popupData.value = null
    }

    return {
      data,
      popupVisible,
      changeUserRole,
      closePopup,
      popupData
    }
  }
}
</script>

<style scoped lang="scss">
.users {
  margin: 20px
}
</style>
