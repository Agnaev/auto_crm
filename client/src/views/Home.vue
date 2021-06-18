<template>
  <div class="slider">
    <el-carousel arrow="always">
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
      <h3>Почему вам стоит выбрать наш автосервис:</h3>
      <el-collapse accordion>
        <el-collapse-item name="1">
          <template #title>
            <h3>Наши механики - специалисты своего дела</h3>
          </template>
          <p>Мастера автосервиса TOYOTA оказывают профессиональные услуги по ремонту, диагностике и техническому обслуживанию автомобилей марки Toyota и Lexus. Вы обращаетесь к специалистам, которые учитывают функциональные особенности транспортных средств, характеристики, предлагают лучшие варианты решения проблем.</p>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template #title>
            <h3>Наш сервис предоставляет вам возможность записаться на обслуживание свего автомобиля в онлайн-режиме!</h3>
          </template>
          <p>Для этого перейдите во вкладку услуги, выберите интересующую, после чего вам будет предожено выбрать мастера, день и время</p>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template #title>
            <h3>Отложите нужный вам товар в онлайн-режиме</h3>
          </template>
          <p>Для этого перейдите во вкладку интернет-магазин, выберите нужный товар и добавьте его в корзину, из корзины вы можете осуществить отправить запрос на резерв, после чего наш менеджер отправит вам обратный ответ</p>
        </el-collapse-item>
      </el-collapse>
    </div>
    </div>
    <el-divider />
    <el-card
      header="Контакты"
      class="contacts"
    >
      <p>Телефон:29-33-66</p>
      <p>Адрес: Иристонская 2А</p>
      <p>
        <el-link
          type="success"
          href="https://instagram.com/toyota_vld"
          target="__blank"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </el-link>
      </p>
    </el-card>
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
.contacts {
  margin: 0 20px;
  p {
    font-weight: bold;
  }
}
</style>
