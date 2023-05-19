<script>

/**
 * Product Detail Component
 */
export default {
  props: ['productId'],
  data() {
    return {
      title: "Product Detail",
      items: [
        {
          text: "Ecommerce"
        },
        {
          text: "Product Detail",
        }
      ]
    };
  },
  created() {
    // Realiza una llamada a tu API o accede a tu fuente de datos para obtener los detalles del producto
    this.fetchProductDetails();
  },

  methods: {
    fetchProductDetails() {
    // Aquí obtienes los parámetros del producto desde la ruta actual
    const codigo = this.$route.query.codigo;
    const descripcion = this.$route.query.descripcion;
    const precio = this.$route.query.precio;
    const marca = this.$route.query.marca;
    const img = this.$route.query.img;

    // Puedes utilizar los parámetros como desees, por ejemplo, asignarlos a la propiedad 'product'
    this.product = {
      img: img,
      codigo: codigo,
      descripcion: descripcion,
      precio: precio,
      marca: marca
    };
  },
    /**
     * Selected image shows
     */
    imageShow(event) {
      const image = event.target.src;
      const expandImg = document.getElementById("expandedImg");
      expandImg.src = image;
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
            <div class="holi row border border-danger">
              <div class="col">
                <div class="product-detail">
                  <div class="container-fluid">
                    <div class="row justify-content-center text-center">
                      <div class="col d-flex align-items-center">
                        <div
                          class="nav flex-column nav-pills"
                          id="v-pills-tab"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          <a
                            class="nav-link"
                            id="product-1-tab"
                            data-toggle="pill"
                            @click="imageShow($event)"
                            role="tab"
                          >
                            <img
                              src="@/assets/images/product/img-1.png"
                              alt
                              class="img-fluid mx-auto d-block tab-img rounded"
                            />
                          </a>
                          <a
                            class="nav-link"
                            id="product-2-tab"
                            data-toggle="pill"
                            @click="imageShow($event)"
                            role="tab"
                          >
                            <img
                              src="@/assets/images/product/img-5.png"
                              alt
                              class="img-fluid mx-auto d-block tab-img rounded"
                            />
                          </a>
                          <a
                            class="nav-link"
                            id="product-3-tab"
                            data-toggle="pill"
                            @click="imageShow($event)"
                            role="tab"
                          >
                            <img
                              src="@/assets/images/product/img-3.png"
                              alt
                              class="img-fluid mx-auto d-block tab-img rounded"
                            />
                          </a>
                          <a
                            class="nav-link"
                            id="product-4-tab"
                            data-toggle="pill"
                            @click="imageShow($event)"
                            role="tab"
                          >
                            <img
                              src="@/assets/images/product/img-4.png"
                              alt
                              class="img-fluid mx-auto d-block tab-img rounded"
                            />
                          </a>
                        </div>
                      </div>
                      <div class="col-md-9 d-flex align-items-center">
                        <div class="tab-content" id="v-pills-tabContent">
                          <div class="tab-pane fade show active" id="product-1" role="tabpanel">
                            <div class="product-img">
                              <img
                                id="expandedImg"
                                :src=product.img
                                alt
                                class="img-fluid mx-auto d-block border border-danger"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end product img -->
              </div>
              <div class="col-xl-7">
                <div class="mt-4 mt-xl-3">
                  <p class="text-primary">{{ product.codigo }}</p>
                  <h5 class="mt-1 mb-3">{{ product.descripcion }}</h5>

                  <div class="d-inline-flex">
                    <div class="text-muted mr-3">
                      <span class="mdi mdi-star text-warning"></span>
                      <span class="mdi mdi-star text-warning"></span>
                      <span class="mdi mdi-star text-warning"></span>
                      <span class="mdi mdi-star text-warning"></span>
                      <span class="mdi mdi-star"></span>
                    </div>
                    <div class="text-muted">( 132 )</div>
                  </div>

                  <h5 class="mt-2">
                    <h4 class="text-muted mr-2">{{ product.precio }}</h4>
                    <!--<span class="text-danger font-size-12 ml-2">25 % Off</span>-->
                  </h5>
                  <p
                    class="mt-3"
                  >{{ product.marca}}</p>
                  <hr class="my-4" />

                  <div class="row">
                    <div class="col-md-6">
                      <div>
                       

                        <h5 class="font-size-14">Especificaciones :</h5>
                        <ul class="list-unstyled product-desc-list">
                          <li>
                            <i class="mdi mdi-circle-medium mr-1 align-middle"></i> Material duradero.
                          </li>
                          <li>
                            <i class="mdi mdi-circle-medium mr-1 align-middle"></i> Luces led.
                          </li>
                          <li>
                            <i class="mdi mdi-circle-medium mr-1 align-middle"></i> lorem impusm.
                          </li>
                          <li>
                            <i class="mdi mdi-circle-medium mr-1 align-middle"></i> 4 lorem impusm.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="product-color mt-3">
                        <h5 class="font-size-14">Otros articulos que podrían interesarte:</h5>
                        <a href="#" class="active">
                          <div class="product-color-item">
                            <img src="@/assets/images/product/img-1.png" alt class="avatar-md" />
                          </div>
                          <p>1</p>
                        </a>
                        <a href="#">
                          <div class="product-color-item">
                            <img src="@/assets/images/product/img-5.png" alt class="avatar-md" />
                          </div>
                          <p>2</p>
                        </a>
                        <a href="#">
                          <div class="product-color-item">
                            <img src="@/assets/images/product/img-3.png" alt class="avatar-md" />
                          </div>
                          <p>3</p>
                        </a>
                      </div>
                    </div>

                    
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="mt-4">
              <h5 class="font-size-14 mb-3">Descripcion de Producto:</h5>
              <div class="product-desc">
                <b-tabs class="nav-tabs-custom" content-class="border border-top-0 p-4">
                  <b-tab title="Descripción">
                    <div>
                      <p>{{ product.descripcion }}</p>

                    </div>
                  </b-tab>
                  <b-tab title="Especificaciones">
                    <div class="table-responsive">
                      <table class="table table-nowrap mb-0">
                        <tbody>
                          <tr>
                            <th scope="row" style="width: 400px;">Código</th>
                            <td>{{ product.codigo }}</td>
                          </tr>
                          <tr>
                            <th scope="row">Marca</th>
                            <td>{{ product.marca }}</td>
                          </tr>
                          <tr>
                            <th scope="row">Precio</th>
                            <td>{{ product.precio }}</td>
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
        <!-- end card -->
      </div>
    </div>
    <!-- end row -->
  </div>
</template>

<style scoped>

.contenedor{
  background-color: blue;
}

.carrito {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.holi{
  padding: 10vh 5vh;
  background-color: aliceblue;
}

</style>