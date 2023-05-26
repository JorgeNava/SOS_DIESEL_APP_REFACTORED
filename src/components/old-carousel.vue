<template>
  <div class="carousel-wrapper d-flex flex-column align-items-center justify-content-center">
    <div id="v" class="carousel slide " data-bs-ride="carousel">
      <div class="carousel-indicators d-flex mb-2">
        <li data-bs-target="#v" :data-bs-slide-to="i" :class="{'active': i === currentSlide}" v-for="(item, i) in items" :key="i" @click="currentSlide = i"></li>
      </div>
      <div class="carousel-inner " data-bs-target="#v">
        <div v-for="(item, i) in items" :key="i" :class="{'carousel-item': true, 'active': i === currentSlide}">
          <div class="d-flex align-items-center justify-content-center h-100">
            <div class="card text-center" style="max-width: 600px; ">
              <img :src="item?.Image1[0]?.url" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">{{ item.Code }}</h5>
                <p class="card-text">{{ item.Description }}</p>
                <p class="card-text">{{ item.Price }}</p>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev"  role="button" data-bs-slide="prev" @click="prevSlide">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control-next"  role="button" data-bs-slide="next" @click="nextSlide">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
    <router-link to="/ecommerce/Products" class="ver-mas ">Ver catálogo</router-link>
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
  async mounted() {
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
  },
}
</script>

<style scoped>
  #v {
    max-width: 600px;
    margin: 0 auto;

  }

  .carousel-wrapper{
    height: 90vh;
  }
  .carousel-inner {
    width: 100%;
    display: flex;
    border-radius: 15px;
    overflow: hidden;
    font-family: 'Helvetica';
    
  }
  .carousel-item {
    height: 630px;
    width: 100%;
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
  }

  .card:hover {
    transform: scale(1.05);
  }

  .card-img-top {
    object-fit: cover;
    width: 100vw;
    height: 38vh;
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
    text-align: center;
    max-width: 100%;
    max-height: 100%;
  }


  .carousel-indicators{
    margin-top: 1%;
    margin-bottom: 1%;
  }

  .ver-mas {
    font-family: 'Helvetica-SOS';
    width: fit-content;
    padding: 10px 20px;
    background-color: #C1272D;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    font-size: 1.2rem;
  }
    .ver-mas:hover{
      background-color: rgb(255, 255, 255);
      color: #C1272D;
      border: 1px solid #C1272D;
    }
    .carousel-control-prev-icon, .carousel-control-next-icon {
      position: absolute;
      top: 40%;
      transform: translateY(-80%);
    }
</style>;