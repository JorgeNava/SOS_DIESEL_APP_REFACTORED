<script>
import Footer from "@/components/footer";
const { getApiClient } = require('@/helpers/sos-diesel-api-client');
const api = getApiClient();

export default {
  props: ['productId'], //NECESARIO?
  data() {
    return {
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
    }
  }
};
</script>

<template>
  <div class="contenedor">
    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="carrito card">
          <div class="card-body">
            <div class="holi row">
              <div class="col">
                <div class="product-detail">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-4 d-flex align-items-center justify-content-center">
                        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                          <a v-for="(image, index) in product?.Images" :key="index" class="nav-link" :id="'product-' + (index + 1) + '-tab'" data-toggle="pill" @click="imageShow($event)" role="tab">
                            <img :src="image.url" alt class="img-fluid mx-auto d-block tab-img rounded" /> <!-- itera en el arreglo de la imagen para obtener cada imagen y su indice correspondiente -->
                          </a>
                        </div>
                      </div>
                      <div class="col-lg-8 d-flex align-items-center">
                        <div class="tab-content" id="v-pills-tabContent">
                          <div class="tab-pane fade show active" id="product-1" role="tabpanel">
                            <div class="product-img">
                              <img id="expandedImg" :src="selectedImage" alt class="img-fluid mx-auto d-block img-lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-7 mt-4 mt-xl-3">
                  <h5 class="mt-1 mb-3">{{ product.Description }}</h5>
                  <h5 class="mt-2">
                    <h4 class="text-muted mr-2">${{ product.Price }}</h4>
                  </h5>
                  <p class="mt-3">{{ product.Brand }}</p>
                  <hr class="my-3" style="margin-right: 20%;"/>
                <div class="row">
                  <div class="col-md-12">
                    <div class="mt-4">
                      <div class="product-desc fixed-height">
                        <b-tabs class="nav-tabs-custom colorsito" content-class="border border-top-0 p-4" keep-alive>
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
                                    <th scope="row" >Código</th>
                                    <td>{{ product.Code }}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Marca</th>
                                    <td>{{ product.Brand }}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Modelo de motor</th>
                                    <td>{{ product.TruckModle }}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </b-tab>
                        </b-tabs>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer class="footersillo" />
  </div>
</template>

<style scoped>
.contenedor {
  background-color: white;
}

.carrito {
  background-color: white;
  width: 99%;
  min-height: 88vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.colorsito {
  background-color: white !important;
  width: 60%;
}

.holi {
  width: 100vw;
  height: 80vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-img {
  background-color: white; 
}

.product-img img {
  height: 100%; /* Establecer una altura fija para la imagen */
  width: 100%;
}
.fixed-height {
  width: auto;
  height: 10vh;
}

.nav-link {
  right: 50vw;
}


.footersillo {
  background-color: #c1272d;
}
</style>