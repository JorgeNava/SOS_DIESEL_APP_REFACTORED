<template>
  <div id="v" class="carousel slide " data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button data-bs-target="#v" :data-bs-slide-to="i" :class="{'active': i === currentSlide}" v-for="(item, i) in items" :key="i" @click="currentSlide = i"></button>
    </div>
    <div class="carousel-inner" data-bs-target="#v">
      <div v-for="(item, i) in items" :key="i" :class="{'carousel-item': true, 'active': i === currentSlide}">
        <div class="d-flex align-items-center justify-content-center h-100">
          <div class="card text-center" style="max-width: 600px; ">
            <img :src="item.imageUrl" class="card-img-top" style="max-width: 600px; max-height: 600px;" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ item.description }}</p>
              <p class="card-text">{{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev"  role="button" data-bs-slide="prev" @click="prevSlide">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next"  role="button" data-bs-slide="next" @click="nextSlide">
        <span class="visually-hidden">Siguiente</span>
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carouselHome',
  data() {
    return {
      currentSlide: 0,
      items: [
        {
          imageUrl: require('@/assets/images/old_repo/img5.png'), 
          title: 'Slide 1', 
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
          price: '$10'
        },
        {imageUrl: require('@/assets/images/old_repo/img30.png'), title: 'Slide 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: '$20'},
        {imageUrl: require('@/assets/images/old_repo/img20.png'), title: 'Slide 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: '$30'},
        {imageUrl: require('@/assets/images/old_repo/img4.png'), title: 'Slide 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: '$40'},
        {
          imageUrl: require('@/assets/images/old_repo/img22.png'), 
          title: 'Slide 5', 
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
          price: '$50'
        },
      ],
      }
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
  .carousel-inner {
    margin-top: 8%;
    border-radius: 15px;
    overflow: hidden;
    font-family: 'Helvetica';
  }
  .carousel-item {
    height: 600px;
    position: relative; /* Reemplazar display: flex; */
    background-size: cover;
    background-position: center;
    font-family: 'Helvetica';
  }

  .card {
    background-color: #e1dcdc77;
    border-radius: 12px;
    box-shadow: 10px 5px 50px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    max-width: 90%;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .card-img-top {
    object-fit: cover; /* ajustar imagen para que se ajuste al ancho y alto del elemento padre */
    width: 100vh;
    height: 40vh; /* agregar altura para que ocupe todo el espacio disponible */
    max-width: 600px;
  }

  .card-title {
    font-size: 1rem;
    text-align: center;
    margin: 1rem 0;
    font-family: 'Helvetica';
  }

  .card-text {
    text-align: center;
    max-width: 100%;
    max-height: 100%;
  }


  .carousel-indicators{
    margin-top: 1%;
    margin-bottom: 1%;
  }

</style>;