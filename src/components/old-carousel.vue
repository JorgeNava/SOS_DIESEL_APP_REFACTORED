<template>
  <div class="carousel-wrapper d-flex flex-column align-items-center justify-content-center">
    <div id="v" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators d-flex mb-2">
        <li
          data-bs-target="#v"
          :data-bs-slide-to="i"
          :class="{'active': i === currentSlide}"
          v-for="(item, i) in items"
          :key="i"
          @click="currentSlide = i"
        ></li>
      </div>
      <div class="carousel-inner" data-bs-target="#v">
        <div
          v-for="(item, i) in items"
          :key="i"
          :class="{'carousel-item': true, 'active': i === currentSlide}"
        >
        <router-link :to="{ path: '/detalles-del-producto', query: { Code: item.Code} }">
            <div class="d-flex align-items-center justify-content-center h-100">
              <div class="card text-center" style="max-width: 600px; ">
                <img
                  :src="item.Images[0].url"
                  class="card-img-top"
                  style="max-width: 600px; max-height: 600px;"
                  :alt="item.Code"
                />
                <div class="card-body">
                  <h5 class="card-title">{{ item.Brand }}</h5>
                  <p class="card-text">{{ item.Description }}</p>
                  <p class="card-text">${{ item.Price }}</p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <button
          class="carousel-control-prev"
          role="button"
          data-bs-slide="prev"
          @click="prevSlide"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button
          class="carousel-control-next"
          role="button"
          data-bs-slide="next"
          @click="nextSlide"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const { getApiClient } = require('@/helpers/sos-diesel-api-client');
const api = getApiClient();

export default {
  name: 'carouselHome',
  data() {
    return {
      currentSlide: 0,
      items: [],
      }
  },
  async created() {
    const RESPONSE = await api.get('/catalog/get-five-products');
    this.items = RESPONSE.map((product) => {
      return product?.fields;
    });
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.items.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.items.length) % this.items.length;
    },
    goToProductDetail(item) {
      // Aquí redirecciona a la página de detalles del producto utilizando el objeto 'item'
      // Puedes usar el enrutador o el método de redirección adecuado para tu aplicación
      console.log('Redireccionando a la página de detalles del producto:', item);
    },
  },
}
</script>

<style scoped>
.carousel-wrapper {
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

#v {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
}

.carousel-inner {
  height: 100%;
  display: flex;
  border-radius: 15px;
  overflow: hidden;
  font-family: 'Helvetica';
}

.carousel-item {
  flex: 0 0 100%;
  max-width: 100%;
  background-size: cover;
  background-position: center;
  font-family: 'Helvetica';
}

.card {
  background-color: #d2caca8d;
  border-radius: 12px;
  box-shadow: 10px 5px 50px rgba(90, 86, 86, 0.1);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  max-width: 90%;
  height: 100%;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  object-fit: cover;
  width: 100%;
  height: 41vh;
  max-width: 600px;
  max-height: 600px;
}

.card-title {
  font-size: 1.4rem;
  text-align: center;
  margin: 1rem 0;
  font-family: 'Helvetica-SOS';
}

.card-text {
  font-family: 'Helvetica-SOS';
  color: #584646;
  text-align: center;
  max-width: 100%;
  max-height: 100%;
}

.carousel-indicators-wrapper {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.carousel-indicators {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
}

.carousel-indicators li {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carousel-indicators li.active {
  background-color: rgba(255, 255, 255, 0.9);
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  position: relative;
  bottom: 8vh;
}

</style>