<template>
  <el-button @click="addService">Добавить</el-button>
  <el-table
    :data="data"
    border
  >
    <el-table-column
      label="Id"
      prop="_id"
    ></el-table-column>
    <el-table-column
      label="Название услуги"
      prop="name"
    ></el-table-column>
    <el-table-column
      label="Описание"
      prop="description"
    ></el-table-column>
    <el-table-column
      label="Цена"
      prop="price"
    ></el-table-column>
    <el-table-column>
      <template #default="scope">
        <el-button @click="editHandle(scope.row)">Изменить</el-button>
        <el-button type="danger" @click="removeHandle(scope.row._id)">Удалить</el-button>
      </template>
    </el-table-column>
  </el-table>
  <edit-service-popup
    v-if="popupVisible"
    :visible="popupVisible"
    :form-data="popupData"
    @close="popupVisible = false"
  />
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/services/action-types'
import EditServicePopup from './EditServicePopup'

export default {
  name: 'AdminView',
  components: {
    EditServicePopup
  },
  setup () {
    const store = useStore()
    const data = computed(() => store.getters.getServicesList)
    const popupVisible = ref(false)
    const popupData = ref(null)

    function editHandle (columnData) {
      popupData.value = columnData
      popupVisible.value = true
    }

    function addService () {
      popupVisible.value = true
      popupData.value = null
    }

    function removeHandle (_id) {
      store.dispatch(
        ActionTypes.REMOVE_SERVICE,
        {
          _id
        }
      )
    }

    return {
      addService,
      removeHandle,
      popupData,
      popupVisible,
      editHandle,
      data
    }
  }
}
</script>

<style scoped>

</style>
