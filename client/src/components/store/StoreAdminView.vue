<template>
  <el-button @click="addService">Добавить</el-button>
  <el-table
    :data="data"
    border
  >
    <el-table-column
      label="Идентификатор"
      prop="_id"
    ></el-table-column>
    <el-table-column
      label="Название товара"
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
  <edit-store-popup
    v-if="popupVisible"
    :visible="popupVisible"
    :form-data="popupData"
    @close="popupVisible = false"
  />
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import ActionTypes from '@/store/store/action-types'
import EditStorePopup from './EditStorePopup'

export default {
  name: 'StoreAdminView',
  components: {
    EditStorePopup
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup () {
    const store = useStore()
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
      editHandle
    }
  }
}
</script>

<style scoped>

</style>
