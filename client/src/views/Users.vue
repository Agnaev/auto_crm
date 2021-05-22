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
          <el-button @click="changeUserRole(data.row)">
            Изменить
          </el-button>
          <el-popconfirm
            title="Вы уверены что хотите удалить пользователя?"
            @confirm="removeUser(data.row._id)"
            confirmButtonType="danger"
            cancelButtonText="Отмена"
            confirmButtonText="Удалить"
            icon="el-icon-info"
            iconColor="red"
          >
            <template #reference>
              <el-button :disabled="data.row.role === 'admin'">Удалить</el-button>
            </template>
          </el-popconfirm>
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
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import EditRolePopup from '@/components/EditRolePopup'
import ActionTypes from '@/store/users/action-types'

export default {
  components: {
    EditRolePopup
  },
  setup () {
    const store = useStore()
    const data = computed(() => store.getters.getUsersList)

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

    onMounted(() => {
      store.dispatch(ActionTypes.GET_USERS_LIST)
    })

    function removeUser (_id) {
      store.dispatch(ActionTypes.REMOVE_USER, { _id })
    }

    return {
      data,
      popupVisible,
      changeUserRole,
      closePopup,
      popupData,
      removeUser
    }
  }
}
</script>

<style scoped lang="scss">
.users {
  margin: 20px
}
</style>
