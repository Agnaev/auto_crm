<template>
  <el-card :class="$props.class">
    <template #header>
      <div class="store-card__header">
        <span>{{ $props.header }}</span>
      </div>
    </template>
    <div class="store-card__description">
      <span>
      {{ $props.description }}
    </span>
    </div>
    <div class="store-card__btn">
      <el-button @click="$emit('add-to-cart')">{{ $props.btnText }}</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'StoreCard',
  props: {
    header: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    },
    class: {
      type: String,
      required: false,
      default: ''
    },
    btnText: {
      type: String,
      required: false,
      default: 'В корзину'
    }
  },
  emits: ['add-to-cart']
}
</script>

<style scoped lang="scss">
.store-card {
  width: 320px;
  &__btn {
    border-top: 2px solid #f0f0f0;
    button {
      margin-top: 10px
    }
  }
  &__description {
    padding-bottom: 20px;
  }
}
</style>
