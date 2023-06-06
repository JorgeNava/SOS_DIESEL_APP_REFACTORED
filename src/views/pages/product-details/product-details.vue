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
    }
  }
};
</script>

<template>
  <div class="contenedor">
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
                        <img :src="image.url" alt class="img-fluid mx-auto d-block tab-img rounded" />
                      </a>
                    </div>
                  </div>
                  <div class="col-lg-8 d-flex align-items-center">
                    <div class="tab-content" id="v-pills-tabContent">
                      <div class="tab-pane fade show active" id="product-1" role="tabpanel">
                        <div class="product-img">
                          <img id="expandedImg" :src="selectedImage" alt class="img-fluid mx-auto d-block img-lg" @click="showModal = true"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cucuru col-xl-7 mt-4 mt-xl-3">
            <h5 class="mt-1 mb-3">{{ product.Description }}</h5>
            <h5 class="mt-2">
              <h4 class="text-muted mr-2">${{ product.Price }}</h4>
            </h5>
            <p class="mt-3">{{ product.Brand }}</p>
            <hr class="my-3" style="margin-right: 20%;" />
            <div class="row">
              <div class="col-md-12">
                <div class="mt-4">
                  <div class="product-desc">
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
                                <th scope="row">Código</th>
                                <td>{{ product.Code }}</td>
                              </tr>
                              <tr>
                                <th scope="row">Marca</th>
                                <td>{{ product.Brand }}</td>
                              </tr>
                              <tr>
                                <th scope="row">Modelo de Tractor</th>
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
    <Footer class="footersillo" />
    <b-modal v-model="showModal" hide-footer>
      <b-img :src="selectedImage" alt class="img-fluid mx-auto d-block modal-img" />
    </b-modal>
  </div>
</template>

<style scoped>
.contenedor {
  background-color: white;
  min-height: 100vh;
  padding-bottom: 70px; /* Añade un espacio para el footer */
}
#v-pills-tab {
  cursor: pointer;
}

.carrito {
  background-color: white;
  width: 99%;
  min-height: calc(100vh - 70px); /* Ajusta la altura para excluir el espacio del footer */
  display: flex;
  align-items: center;
  justify-content: center;
}

.holi {
  min-height: 70vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.colorsito {
  background-color: white !important;
  width: 100%;
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

.cucuru {
  height: 40vh;
  width: 40vw;
}

/* Estilos del footer */
.footersillo {
  background-color: #c1272d;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-bottom: 1rem;
}

/* Estilos para el modal */
.modal-img {
  width: 100%;
  max-height: 90vh;
}

/* Efecto de superposición oscura */
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.8) !important;
}
</style>