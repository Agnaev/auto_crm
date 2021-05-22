<template>
  <el-dialog
    v-model="popupVisible"
  >
    <el-form>
      <el-form-item label="Идентификатор" v-if="data._id">
        <el-input
          disabled
          v-model="data._id"
        ></el-input>
      </el-form-item>
      <el-form-item label="Название">
        <el-input
          v-model="data.name"
        />
      </el-form-item>
      <el-form-item label="Описание">
        <el-input
          v-model="data.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="Цена">
        <el-input
          v-model="data.price"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('close')">Отмена</el-button>
        <el-button @click="save">Сохранить</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { deepClone } from '@/helpers/deepClone'
import ActionTypes from '@/store/store/action-types'

export default {
  name: 'EditStorePopup',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    formData: {
      type: Object,
      required: false,
      default: null
    }
  },
  setup (props, { emit }) {
    const popupVisible = computed({
      get: () => props.visible,
      set: () => emit('close')
    })

    const data = ref(
      props.formData
        ? deepClone(props.formData)
        : {
          name: '',
          description: '',
          price: 0
        }
    )

    const store = useStore()

    function save () {
      const action = data.value._id
        ? ActionTypes.UPDATE_PRODUCT
        : ActionTypes.CREATE_PRODUCT
      store.dispatch(
        action,
        deepClone(data.value)
      )
      emit('close')
    }

    return {
      popupVisible,
      data,
      save
    }
  }
}
</script>

<style scoped>

</style>
