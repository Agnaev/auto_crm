<template>
  <div>
    <div class="image">
      <div class="image__container">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  setup () {
    return {}
  }
}
</script>

<style scoped lang="scss">
.image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 0 48px;
  &__container {
    background: url(../assets/images/top.png) no-repeat right center/auto 100%, #172126;
    box-sizing: border-box;
    padding: 144px 120px 128px;
    color: #fff;
    position: relative;
    border-radius: 20px;
  }
}
</style>
