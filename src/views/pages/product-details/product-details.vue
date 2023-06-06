<script>
import Footer from "@/components/footer";
const { getApiClient } = require('@/helpers/sos-diesel-api-client');
const api = getApiClient();

export default {
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
                <div class="d-inline-flex">
                  <div class="text-muted mr-3">
                    <span class="mdi mdi-star text-warning"></span>
                    <span class="mdi mdi-star text-warning"></span>
                    <span class="mdi mdi-star text-warning"></span>
                    <span class="mdi mdi-star text-warning"></span>
                    <span class="mdi mdi-star"></span>
                  </div>
                  <div class="text-muted">(1,320)</div>
                </div>
                <hr class="my-4" />
                <div class="row">
                  <div class="col-md-6">
                    <div class="product-color mt-3"></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="mt-4">
                      <div class="product-desc">
                        <b-tabs class="nav-tabs-custom" content-class="border border-top-0 p-4">
                          <b-tab title="Descripción">
                            <div>
                              <p>{{ product.Description }}</p>
                            </div>
                          </b-tab>
                          <b-tab title="Especificaciones">
                            <div class="table-responsive">
                              <table class="table table-nowrap mb-0">
                                <tbody>
                                  <tr>
                                    <th scope="row" style="width: 400px;">Código</th>
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
  background-color: aliceblue;
}

.carrito {
  background-color: aliceblue;
  width: 99%;
  min-height: 88vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.holi {
  width: 100%;
  height: 90%;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Detalles {
  background-color: white;
  width: 100%;
  height: 100%;
}

.nav-link {
  right: 50vw;
}

.footersillo {
  background-color: #c1272d;
}
</style>