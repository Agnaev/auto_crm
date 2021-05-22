<template>
  <el-dialog
    v-model="popupVisible"
  >
    <el-form
      :model="data"
      label-position="left"
    >
      <el-form-item label="Id" v-if="data._id">
        <el-input disabled v-model="data._id"></el-input>
      </el-form-item>
      <el-form-item label="Название услуги">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item
        v-model="data.description"
        label="Описание услуги"
      >
        <el-input
          v-model="data.description"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="Цена">
        <el-input
          v-model="data.price"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel">Отменить</el-button>
        <el-button @click="save" type="success">Сохранить</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { deepClone } from '@/helpers/deepClone'
import ActionTypes from '@/store/services/action-types'

export default {
  name: 'EditServicePopup',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    formData: {
      type: Object,
      required: false
    }
  },
  emits: ['close'],
  setup (props, { emit }) {
    const popupVisible = computed({
      get: () => props.visible,
      set: () => {
        emit('close')
      }
    })
    const store = useStore()
    const data = ref(
      props.formData
        ? deepClone(props.formData)
        : {
          name: '',
          description: '',
          price: 0
        }
    )

    function cancel () {
      emit('close')
      data.value = {}
    }

    function save () {
      const action = props.formData
        ? ActionTypes.UPDATE_SERVICE_INFO
        : ActionTypes.CREATE_SERVICE
      store.dispatch(
        action,
        deepClone(data.value)
      ).then(cancel)
    }

    return {
      popupVisible,
      data,
      cancel,
      save
    }
  }
}
</script>

<style scoped>

</style>
