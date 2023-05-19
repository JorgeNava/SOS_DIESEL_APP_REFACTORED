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

    // Puedes utilizar los parámetros como desees, por ejemplo, asignarlos a la propiedad 'product'
    this.product = {
      codigo: codigo,
      descripcion: descripcion,
      precio: precio
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
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-xl-5">
                <div class="product-detail">
                  <div class="row">
                    <div class="col-3">
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
                    <div class="col-md-8 col-9">
                      <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade show active" id="product-1" role="tabpanel">
                          <div class="product-img">
                            <img
                              id="expandedImg"
                              src="@/assets/images/product/img-1.png"
                              alt
                              class="img-fluid mx-auto d-block"
                            />
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
                  <a href="#" class="text-primary">T-shirt</a>
                  <h5 class="mt-1 mb-3">Full sleeve Blue color t-shirt</h5>

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
                    <del class="text-muted mr-2">$252</del>$240
                    <span class="text-danger font-size-12 ml-2">25 % Off</span>
                  </h5>
                  <p
                    class="mt-3"
                  >To achieve this, it would be necessary to have uniform pronunciation</p>
                  <hr class="my-4" />

                  <div class="row">
                    <div class="col-md-6">
                      <div>
                       

                        <h5 class="font-size-14">Specification :</h5>
                        <ul class="list-unstyled product-desc-list">
                          <li>
                            <i class="mdi mdi-circle-medium mr-1 align-middle"></i> Full Sleeve
                          </li>
                          <li>
                            <i class="mdi mdi-circle-medium mr-1 align-middle"></i> Cotton
                          </li>
                          <li>
                            <i class="mdi mdi-circle-medium mr-1 align-middle"></i> All Sizes available
                          </li>
                          <li>
                            <i class="mdi mdi-circle-medium mr-1 align-middle"></i> 4 Different Color
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="product-color mt-3">
                        <h5 class="font-size-14">Color :</h5>
                        <a href="#" class="active">
                          <div class="product-color-item">
                            <img src="@/assets/images/product/img-1.png" alt class="avatar-md" />
                          </div>
                          <p>Blue</p>
                        </a>
                        <a href="#">
                          <div class="product-color-item">
                            <img src="@/assets/images/product/img-5.png" alt class="avatar-md" />
                          </div>
                          <p>Cyan</p>
                        </a>
                        <a href="#">
                          <div class="product-color-item">
                            <img src="@/assets/images/product/img-3.png" alt class="avatar-md" />
                          </div>
                          <p>Green</p>
                        </a>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="product-color mt-3">
                        <h5 class="font-size-14">Size :</h5>
                        <a href="#" class="active">
                          <div class="product-color-item">
                            <div class="avatar-xs">
                              <span class="avatar-title bg-transparent text-body">S</span>
                            </div>
                          </div>
                        </a>
                        <a href="#">
                          <div class="product-color-item">
                            <div class="avatar-xs">
                              <span class="avatar-title bg-transparent text-body">M</span>
                            </div>
                          </div>
                        </a>
                        <a href="#">
                          <div class="product-color-item">
                            <div class="avatar-xs">
                              <span class="avatar-title bg-transparent text-body">L</span>
                            </div>
                          </div>
                        </a>
                        <a href="#">
                          <div class="product-color-item">
                            <div class="avatar-xs">
                              <span class="avatar-title bg-transparent text-body">XL</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="mt-4">
              <h5 class="font-size-14 mb-3">Product description:</h5>
              <div class="product-desc">
                <b-tabs class="nav-tabs-custom" content-class="border border-top-0 p-4">
                  <b-tab title="Description">
                    <div>
                      <p>If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual</p>
                      <p>To achieve this, it would be necessary to have uniform grammar, pronunciation and more common several languages coalesce, the grammar of the resulting.</p>
                      <p>It will be as simple as occidental in fact.</p>

                      <div>
                        <p class="mb-2">
                          <i class="mdi mdi-circle-medium mr-1 align-middle"></i> If several languages coalesce
                        </p>
                        <p class="mb-2">
                          <i class="mdi mdi-circle-medium mr-1 align-middle"></i> To an English person, it will seem like simplified
                        </p>
                        <p class="mb-0">
                          <i class="mdi mdi-circle-medium mr-1 align-middle"></i> These cases are perfectly simple.
                        </p>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Specifications">
                    <div class="table-responsive">
                      <table class="table table-nowrap mb-0">
                        <tbody>
                          <tr>
                            <th scope="row" style="width: 400px;">Código</th>
                            <td>{{ product.codigo }}</td>
                          </tr>
                          <tr>
                            <th scope="row">Descripcion</th>
                            <td>{{ product.descripcion }}</td>
                          </tr>
                          <tr>
                            <th scope="row">Color</th>
                            <td>Blue</td>
                          </tr>
                          <tr>
                            <th scope="row">Material</th>
                            <td>Cotton</td>
                          </tr>
                          <tr>
                            <th scope="row">Weight</th>
                            <td>140 G</td>
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

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <div class="media">
                  
                </div>
              </div>
              <div class="col-md-4">
                <div class="media mt-4 mt-md-0">
                  
                </div>
              </div>
              <div class="col-md-4">
                <div class="media mt-4 mt-md-0">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>