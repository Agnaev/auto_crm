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
  <home-map />
</template>

<script>
import HomeMap from '@/components/home/HomeMap'

export default {
  name: 'Home',
  components: {
    HomeMap
  },
  setup () {
    const images = [
      {
        src: require('../assets/images/slider/1.jpg')
      },
      {
        src: require('../assets/images/slider/2.jpg')
      },
      {
        src: require('../assets/images/slider/3.jpg')
      },
      {
        src: require('../assets/images/slider/4.jpg')
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
