<template>
  <div class="slider">
    <el-carousel arrow="always" height="1000px">
      <el-carousel-item
        v-for="image in images"
        :key="image"
      >
        <div class="image">
          <img :src="image.src" alt="just image" class="image__item">
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-divider />
    <div class="faq">
      <h3>Почему мы:</h3>
      <el-collapse accordion>
        <el-collapse-item name="1">
          <template #title>
            <h3>Весомая причина 1</h3>
          </template>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolorem exercitationem quae quas quis quod reprehenderit suscipit, totam ut voluptatum. Autem blanditiis commodi consequatur et fugit quasi, quo repellat repellendus.</p>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template #title>
            <h3>Весомая причина 2</h3>
          </template>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam at aut cum, dicta dignissimos eaque hic impedit itaque laboriosam, magni, nisi nostrum quibusdam reiciendis rerum tempora! Aspernatur eos officiis sunt!</p>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template #title>
            <h3>Весомая причина 3</h3>
          </template>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam at aut cum, dicta dignissimos eaque hic impedit itaque laboriosam, magni, nisi nostrum quibusdam reiciendis rerum tempora! Aspernatur eos officiis sunt!</p>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template #title>
            <h3>Весомая причина 4</h3>
          </template>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam at aut cum, dicta dignissimos eaque hic impedit itaque laboriosam, magni, nisi nostrum quibusdam reiciendis rerum tempora! Aspernatur eos officiis sunt!</p>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  setup () {
    const images = [
      {
        src: 'https://sun9-57.userapi.com/impg/nOyPoZSUPCBHu9yuZ38K6rBDGFQSWedHV5NDLA/dA3w5oDfmwM.jpg?size=786x588&quality=96&sign=ad05bb31fcfb00c658d2a1d40091f448&type=album'
      },
      {
        src: 'https://sun9-75.userapi.com/impg/c855232/v855232031/235f79/F5GqRpBnSDQ.jpg?size=1079x743&quality=96&sign=0c055547d232f6e59e58e409e3d96e85&type=album'
      },
      {
        src: 'https://sun9-2.userapi.com/impf/U3d3_GoIUoUqKj3UkjESykUObGQ3UMF3iVV-KQ/vrXf96-VeY0.jpg?size=800x815&quality=96&sign=7abf6719112a49dcb748de19800d5293&type=album'
      },
      {
        src: 'https://sun9-35.userapi.com/impg/c853624/v853624038/1e6de8/OnMnfPHw3BE.jpg?size=528x384&quality=96&sign=340b7da77180aebd811c63f2c9402745&type=album'
      }
    ]

    return {
      images
    }
  }
}
</script>

<style scoped lang="scss">
.slider {
  margin: 20px auto 0;
}
.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.faq {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;

  & p {
    font-size: 20px;
  }
  & h3 {
    text-align: center;
  }
}
</style>
