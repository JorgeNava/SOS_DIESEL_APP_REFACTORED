<script>
import Footer from "@/components/footer";
const { getApiClient } = require('@/helpers/sos-diesel-api-client');
const api = getApiClient();

export default {
  data() {
    return {
      showModal: false,
      product: {},
      selectedImage: ''
    };
  },
  components: { Footer },
  created() {
    this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      const codigo = this.$route.query.Code;
      const RESPONSE = await api.get('/catalog/get-one-product', { code: codigo });
      this.product = RESPONSE?.fields;
      this.selectedImage = this.product?.Images[0].url; // Establecer la imagen seleccionada inicialmente como la imagen principal
    },
    imageShow(event) {
      this.selectedImage = event.target.src;
      const target = event.target;
      // Verificar si el evento se originó desde un enlace de navegación
      if (target.classList.contains('nav-link')) {
        this.selectedImage = target.querySelector('img').src; // Actualizar la imagen seleccionada con la URL de la imagen en la que se hizo clic
      }
    },
    closeImage() {
      this.selectedImage = null;
      this.$bvModal.hide('image-modal');
    },
  }
};
</script>

<template>
  <b-container fluid class="contenedor">    
    <b-row class="product--details--container">
      <b-col sm="12" lg="2" order="2" order-lg="1" class="d-flex align-items-center justify-content-end max-60">
        <div class="d-flex flex-lg-column align-items-center product--variants--images--container nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a v-for="(image, index) in product?.Images" :key="index" class="nav-link" :id="'product-' + (index + 1) + '-tab'" data-toggle="pill" @click="imageShow($event)" role="tab">
            <img :src="image.url" alt class="img-fluid mx-auto d-block tab-img rounded" />
          </a>
        </div>
      </b-col>
      <b-col sm="12" lg="4" order="1" order-lg="2" class="d-flex align-items-center max-60 selected--product--image--container">
        <div class="tab-content w-100" id="v-pills-tabContent">
          <div class="tab-pane fade show active" id="product-1" role="tabpanel">
            <div class="product-img">
              <img id="expandedImg" :src="selectedImage" alt class="img-fluid mx-auto d-block img-lg" @click="showModal = true"/>
            </div>
          </div>
        </div>
      </b-col>
      <b-col sm="12" lg="4" order="3" order-lg="3" class="product--details--data--container max-60 d-flex flex-column justify-content-center align-items-start justify-content-lg-start pl-lg-3 pt-lg-5">
        <h5 class="mt-1 mb-3">{{ product.Description }}</h5>
        <h4 class="text-muted mt-2 mr-2">${{ product.Price }}</h4>
        <p class="mt-3">{{ product.Brand }}</p>
        <div class="mt-lg-4 w-100">
          <b-tabs class="nav-tabs-custom colorsito" content-class="border border-top-0 p-4 " keep-alive>
            <b-tab title="Descripción" active>
              <div>
                <p>{{ product.Description }}</p>
              </div>
            </b-tab>
            <b-tab title="Especificaciones" class="color">
              <div class="table-responsive">
                <table class="table table-nowrap mb-0">
                  <tbody>
                    <tr>
                      <th scope="row">Código</th>
                      <td>{{ product.Code }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Marca</th>
                      <td>{{ product.Brand }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Modelo de Tractor</th>
                      <td>{{ product.TruckModel }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </b-col>
    </b-row>
    <b-row></b-row>
    <b-row>
      <Footer></Footer>
    </b-row>
    <b-modal v-model="showModal" hide-footer hide-header centered>
      <div class="image-container">
        <b-img :src="selectedImage" alt class="img-fluid mx-auto d-block modal-img" />
      </div>
    </b-modal>
  </b-container>
</template>

<style lang="scss" scoped>
.product--details--container {
  min-height: 550px;
  height: fit-content;
}

.nav-tabs-custom .nav-item .nav-link::after {
  background-color: red !important;
}

.selected--product--image--container{
    height: 40vh;
}
.product--details--data--container {
    padding: 5vh;
    max-width: 100vw;
}

@media (min-width: 420px) {
  .product--variants--images--container{
    width: 100%;
  }
}

@media (min-width: 992px) {
  .product--variants--images--container{
    width: 50%;
  }
  .max-60{
    height: 60vh;
  }
}

.contenedor {
  background-color: white;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  padding-top: 10vh;
}
#v-pills-tab {
  cursor: pointer;
}

.colorsito {
  background-color: white !important;
  width: 100%;
  min-height: 26vh;
  margin-bottom: 70px; /* Añade espacio para evitar la superposición con el footer */
}

.product-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.product-img {
  background-color: white;
}

.product-img img {
  cursor: pointer;
  width: 100%;
  max-height: 1000px;
}

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .modal-image {
    max-width: 90vw;
    max-height: 90vh;
    cursor: pointer;
  }

  .delete-icon {
    position: absolute;
    top: -10px;
    right: -15px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
</style>