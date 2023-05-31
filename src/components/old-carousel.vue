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
          <router-link
            :to="{
              path: '/ecommerce/product-details',
              query: {
                codigo: item.codigo,
                descripcion: item.descripcion,
                precio: item.precio,
                marca: item.marca,
                img: item.imageUrl,
                truckModel: item.truckModel,
              }
            }"
          >
            <div class="d-flex align-items-center justify-content-center h-100">
              <div class="card text-center" style="max-width: 600px; ">
                <img
                  :src="item.imageUrl"
                  class="card-img-top"
                  style="max-width: 600px; max-height: 600px;"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">{{ item.marca }}</h5>
                  <p class="card-text">{{ item.descripcion }}</p>
                  <p class="card-text">${{ item.precio }}</p>
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
export default {
  name: 'carouselHome',
  data() {
    return {
      currentSlide: 0,
      items: [
        {
          imageUrl: require('@/assets/images/old_repo/img5.png'), 
          codigo: "xxx",
          marca: "Jhon Deere",
          descripcion: "Hola, esta es la prueba de que esta funcionando",
          precio: 0,
          truckModel: "xxx"
        },
        {imageUrl: require('@/assets/images/old_repo/img30.png'), codigo: "xxx", marca: "xxx", descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', precio: 6000, truckModel: "truckModel"},
        {imageUrl: require('@/assets/images/old_repo/img20.png'), codigo: "xxx", marca: "xxx", descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', precio: 6000, truckModel: "trucky"},
        {imageUrl: require('@/assets/images/old_repo/img4.png'), codigo: "xxx", marca: "xxx", descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', precio: 6000, truckModel: "trucky Modelo 1 JT"},
        {
          imageUrl: require('@/assets/images/old_repo/img22.png'), 
          codigo: "xxx",
          marca: "xxx",
          descripcion: "3",
          precio: 3000,
          truckModel: "xxx"
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
      goToProductDetail(item) {
        // Aquí redirecciona a la página de detalles del producto utilizando el objeto 'item'
        // Puedes usar el enrutador o el método de redirección adecuado para tu aplicación
        console.log('Redireccionando a la página de detalles del producto:', item);
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
    overflow: hidden;
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
    object-fit: cover; /* ajustar imagen para que se ajuste al ancho y alto del elemento padre */
    width: 100vw;
    height: 38vh; /* agregar altura para que ocupe todo el espacio disponible */
    max-width: 600px;
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

  .carousel-indicators {
  position: absolute;
  margin-top: 10px;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
}

.carousel-indicators li {
  margin: 0 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #888;
  cursor: pointer;
}

.carousel-indicators li.active {
  background-color: #000;
}
    .carousel-control-prev-icon, .carousel-control-next-icon {
      position: relative;
      bottom: 8vh;
    }
</style>;