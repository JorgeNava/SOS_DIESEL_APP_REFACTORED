<template>
  <div id="carouselExampleIndicators" class="carousel slide " data-bs-ride="carousel">
    <ol class="carousel-indicators">
      <li data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="i" :class="{'active': i === currentSlide}" v-for="(item, i) in items" :key="i"></li>
    </ol>
    <div class="carousel-inner">
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
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev" @click="prevSlide">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next" @click="nextSlide">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </a>
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
        {imageUrl: require('@/assets/images/old_repo/img30.png'), title: 'Slide 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. .', price: '$20'},
        {imageUrl: require('@/assets/images/old_repo/img20.png'), title: 'Slide 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. .', price: '$30'},
        {imageUrl: require('@/assets/images/old_repo/img4.png'), title: 'Slide 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. .', price: '$40'},
        {
          imageUrl: require('@/assets/images/old_repo/img22.png'), 
          title: 'Slide 5', 
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', 
          price: '$50'
        },
      ],
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.items.length;
      console.log(this.currentSlide);
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.items.length) % this.items.length;
      console.log(this.currentSlide);
    },
  },
}
</script>

<style scoped>
  #carouselExampleIndicators {
    max-width: 600px;
    margin: 0 auto;
    margin-top: 10%;
  }
  .carousel-inner {
    transition: all 0.5s ease-in-out;
  }
  .carousel-item {
    height: 600px;
    position: relative; /* Reemplazar display: flex; */
    background-size: cover;
    background-position: center;
  }

  .card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    max-width: 90%;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .card-img-top {
    object-fit: cover; /* ajustar imagen para que se ajuste al ancho y alto del elemento padre */
    width: 100%;
    height: 100%; /* agregar altura para que ocupe todo el espacio disponible */
    max-width: 600px;
  }

  .card-title {
    font-size: 1.2rem;
    margin: 1rem 0;
  }

  .card-text {
    max-width: 100%;
    max-height: 100%;
  }

</style>;