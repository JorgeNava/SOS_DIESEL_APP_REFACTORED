<script>
import VueSlideBar from "vue-slide-bar";
import appConfig from "@/app.config";

/**
 * Products Component
 */
export default {
  page: {
    title: "Product",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: {
    VueSlideBar,
  },
  data() {
    return {
      title: "Products",
      items: [
        {
          text: "Ecommerce"
        },
        {
          text: "Products",
          active: true
        }
      ],
      sliderPrice: 800
    };
  }
};
</script>

<template>
<div class="pagina"> 
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <h1 class="Productos text-left mt-1 font-weight-bold">Productos</h1>
      </div>
      <div class="col-md-4">
        <div class="search-box mt-3 ">
          <div class="position-relative">
            <input type="text" class="form-control rounded-pill rounded-end border-danger" placeholder="buscar" />
            <i class="mdi mdi-magnify search-icon"></i>
          </div>
        </div>
      </div>
      <div class="image-container col-md-4">
        <img src="@/assets/images/envio.png">
      </div>
    </div>
  </div>
  

  <div class="row">
    <div class="filtros col-xl-2 col-lg-3 custom-width">
        <div class="mt-5 border-top">
          <h5 class="font-size-22 mb-4 mt-3 ml-4" style="font-family: 'Helvetica-SOS';">Filtros:</h5>
          <div>
            <h5 class="font-size-20 mb-1 ml-2" style="font-family: 'Helvetica-SOS'; color: rgba(206, 17, 17, 0.889);">Precio</h5>
            <div class="custom-control custom-square mt-2 ml-2">
              <input type="radio" id="productsizeRadio3" name="productdiscountRadio3" class="custom-control-input"/>
              <label class="custom-control-label mt-4" for="productdiscountRadio1" style="font-family: 'Helvetica-SOS';">Menos de 2000</label>
            </div>
            <div class="custom-control custom-square mt-2 ml-2">
              <input type="radio" id="productsizeRadio2" name="productdiscountRadio2" class="custom-control-input"/>

              <label class="custom-control-label" for="productdiscountRadio2" style="font-family: 'Helvetica-SOS';">2000 - 5000</label>
            </div>
            <div class="custom-control custom-square mt-2 ml-2">
              <input type="radio" id="productsizeRadio3" name="productdiscountRadio3" class="custom-control-input"/>
              <label class="custom-control-label" for="productdiscountRadio3" style="font-family: 'Helvetica-SOS';">Mas de 5000</label>
            </div>
          </div>
          <vue-slide-bar v-model="sliderPrice" :min="0" :max="10000" />
        </div>

        <div>
          <h5 class="font-size-20 mt-3 ml-2" style="font-family: 'Helvetica-SOS'; color: rgba(206, 17, 17, 0.889);">
              Marca
          </h5>
            <div class="mt-4">
              <div class="custom-control custom-square mt-2 ml-2">
                <input type="radio" id="productmarcaRadio1" name="productmarcaRadio1" class="custom-control-input"/>
                <label class="custom-control-label" for="productmarcaRadio1" style="font-family: 'Helvetica-SOS';">Kubota</label>
              </div>
              <div class="custom-control custom-square mt-2 ml-2">
                <input type="radio" id="productmarcaRadio2" name="productmarcaRadio2" class="custom-control-input"/>
                <label class="custom-control-label" for="productmarcaRadio2" style="font-family: 'Helvetica-SOS';">Jhon Deere</label>
              </div>
              <div class="custom-control custom-square mt-2 ml-2">
                <input type="radio" id="productmarcaRadio3" name="productmarcaRadio3" class="custom-control-input"/>
                <label class="custom-control-label" for="productmarcaRadio3" style="font-family: 'Helvetica-SOS';">Ford</label>
              </div>
            </div>
        </div>
      

        <div>
          <h5 class="font-size-20 mt-3 ml-2" style="font-family: 'Helvetica-SOS'; color: rgba(206, 17, 17, 0.889);">
              Existencia
          </h5>
            <div class="mt-4">
              <div class="custom-control custom-square mt-2 ml-2">
                <input type="radio" id="productsizeRadio1" name="productsizeRadio1" class="custom-control-input"/>
                <label class="custom-control-label" for="productsizeRadio1" style="font-family: 'Helvetica-SOS';">Con existencia</label>
              </div>
              <div class="custom-control custom-square mt-2 ml-2">
                <input type="radio" id="productsizeRadio2" name="productsizeRadio2" class="custom-control-input"/>
                <label class="custom-control-label" for="productsizeRadio2" style="font-family: 'Helvetica-SOS';">Sin existencia</label>
              </div>
            </div>
        </div>
      </div>

      <div class="fotos col-lg-8 ml-5">
        <div>
          <div>
            <div class="row no-gutters mt-5">
              <div class="col-xl-4 col-sm-6">
                <div class="product-box">
                  <div class="product-img">
                    <!--<div class="product-ribbon badge badge-warning">Trending</div>-->
                    <div class="product-like">
                      <a href="#">
                        
                      </a>
                    </div>
                    <img
                      src="@/assets/images/product/img-1.png"
                      alt
                      class="img-fluid mx-auto d-block"
                    />
                  </div>

                  <div class="text-center">
                    <p class="font-size-16 mb-1" style="color: rgba(206, 17, 17, 0.889);">Blue color, T-shirt</p>
                    <h5 class="font-size-18">
                      <a href="#" class="text-dark">Full sleeve T-shirt</a>
                    </h5>

                    <h5 class="mt-3 mb-0" style="color: rgba(206, 17, 17, 0.889);">$240</h5>
                  </div>
                </div>
              </div>

              <div class="col-xl-4 col-sm-6">
                <div class="product-box">
                  <div class="product-img">
                    <!--<div class="product-ribbon badge badge-primary">- 25 %</div>-->
                    <div class="product-like">
                      <a href="#">
                        
                      </a>
                    </div>
                    <img
                      src="@/assets/images/product/img-2.png"
                      alt
                      class="img-fluid mx-auto d-block"
                    />
                  </div>

                  <div class="text-center">
                    <p class="font-size-16 mb-1" style="color: rgba(206, 17, 17, 0.889);">Half sleeve, T-shirt</p>
                    <h5 class="font-size-18">
                      <a href="#" class="text-dark">Half sleeve T-shirt</a>
                    </h5>

                    <h5 class="mt-3 mb-0" style="color: rgba(206, 17, 17, 0.889);">
                      <span class="text-muted mr-2">
                        <del style="color: rgba(206, 17, 17, 0.889);">$240</del>
                      </span>$225
                    </h5>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-sm-6">
                <div class="product-box">
                  <div class="product-img">
                    <div class="product-like">
                      <a href="#">

                      </a>
                    </div>
                    <img
                      src="@/assets/images/product/img-3.png"
                      alt
                      class="img-fluid mx-auto d-block"
                    />
                  </div>

                  <div class="text-center">
                    <p class="font-size-16 mb-1" style="color: rgba(206, 17, 17, 0.889);">Green color, Hoodie</p>
                    <h5 class="font-size-18">
                      <a href="#" class="text-dark">Hoodie (Green)</a>
                    </h5>

                    <h5 class="mt-3 mb-0" style="color: rgba(206, 17, 17, 0.889);">
                      <span class="text-muted mr-2" style="color: rgba(206, 17, 17, 0.889);">
                        <del style="color: rgba(206, 17, 17, 0.889);">$290</del>
                      </span>$275
                    </h5>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-sm-6">
                <div class="product-box">
                  <div class="product-img">
                    <div class="product-like">
                      <a href="#">
                      </a>
                    </div>
                    <img
                      src="@/assets/images/product/img-4.png"
                      alt
                      class="img-fluid mx-auto d-block"
                    />
                  </div>

                  <div class="text-center">
                    <p class="font-size-16 mb-1" style="color: rgba(206, 17, 17, 0.889);">Gray color, Hoodie</p>
                    <h5 class="font-size-18">
                      <a href="#" class="text-dark">Hoodie (Green)</a>
                    </h5>

                    <h5 class="mt-3 mb-0" style="color: rgba(206, 17, 17, 0.889);">
                      <span class="text-muted mr-2" style="color: rgba(206, 17, 17, 0.889);">
                        <del style="color: rgba(206, 17, 17, 0.889);">$290</del>
                      </span>$275
                    </h5>
                  </div>
                </div>
              </div>

              <div class="col-xl-4 col-sm-6">
                <div class="product-box">
                  <div class="product-img">
                    <div class="product-like">
                      <a href="#">
                       <!-- <i class="mdi mdi-heart text-danger"></i>-->
                      </a>
                    </div>
                    <img
                      src="@/assets/images/product/img-5.png"
                      alt
                      class="img-fluid mx-auto d-block"
                    />
                  </div>

                  <div class="text-center">
                    <p class="font-size-16 mb-1" style="color: rgba(206, 17, 17, 0.889);">Blue color, T-shirt</p>
                    <h5 class="font-size-18">
                      <a href="#" class="text-dark">Full sleeve T-shirt</a>
                    </h5>

                    <h5 class="mt-3 mb-0" style="color: rgba(206, 17, 17, 0.889);">$242</h5>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-sm-6">
                <div class="product-box">
                  <div class="product-img">
                    <!--<div class="product-ribbon badge badge-primary">- 22 %</div>-->
                    <div class="product-like">
                      <a href="#">
                        <!--<i class="mdi mdi-heart-outline"></i>-->
                      </a>
                    </div>
                    <img
                      src="@/assets/images/product/img-6.png"
                      alt
                      class="img-fluid mx-auto d-block"
                    />
                  </div>

                  <div class="text-center">
                    <p class="font-size-16 mb-1" style="color: rgba(206, 17, 17, 0.889);">Black color, T-shirt</p>
                    <h5 class="font-size-18">
                      <a href="#" class="text-dark" >Half sleeve T-shirt</a>
                    </h5>

                    <h5 class="mt-3 mb-0" style="color: rgba(206, 17, 17, 0.889);" >
                      <span class="text-muted mr-2" style="color: rgba(206, 17, 17, 0.889);">
                        <del style="color: rgba(206, 17, 17, 0.889);">$240</del>
                      </span>$225
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-sm-6">
                <div>
                  <p class="mb-sm-0 mt-2">
                    Page
                    <span class="font-weight-bold">2</span> Of
                    <span class="font-weight-bold">113</span>
                  </p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="float-sm-right">
                  <ul class="pagination pagination-rounded mb-sm-0">
                    <li class="page-item disabled">
                      <a href="#" class="page-link">
                        <i class="mdi mdi-chevron-left"></i>
                      </a>
                    </li>
                    <li class="page-item">
                      <a href="#" class="page-link">1</a>
                    </li>
                    <li class="page-item active">
                      <a href="#" class="page-link">2</a>
                    </li>
                    <li class="page-item">
                      <a href="#" class="page-link">3</a>
                    </li>
                    <li class="page-item">
                      <a href="#" class="page-link">4</a>
                    </li>
                    <li class="page-item">
                      <a href="#" class="page-link">5</a>
                    </li>
                    <li class="page-item">
                      <a href="#" class="page-link">
                        <i class="mdi mdi-chevron-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div> 
<!-- end row -->
</template>


<style scoped>

.pagina{
  background-color: white
}

h1 {
  font-size: 60px; /* tamaño de la letra */
  font-weight: bold; /* negrita */
  margin: 0; /* eliminamos el margen por defecto del h1 */
  left: 0px;
  margin-left: -40vh;
}
.filtros{
  padding-left: 5%;
  font-family: 'Helvetica-SOS';
}
.search-box {
  float: right;
  padding-top: 5vh;
  position: relative;
  right: -35vh;
  color: black !important;
}

.form-control::placeholder {
    font-weight:bolder;
    font-size: 1.8rem;
    text-align: center;
  }

  .search-box input {
    border-width: 2px;
    width: 90%;
    padding: 15px 3px 8px;
    font-family: 'Helvetica-SOS';
    color: black !important;
  }

  .search-box .border-danger {
    border-color: red;
  }

.image-container {
  position: absolute;
  top: 45vh;
  right: -41vh;
  
}

.Productos{
  padding-left: 15%;
  padding-top: 4vh;
  font-family: 'Helvetica-SOS';
  letter-spacing: 3px;
}

.product-box{
  font-weight: bold;
  font-family: 'Helvetica-SOS';
}

.product-box .text-center .text-dark{
  font-weight: bold;
  font-family: 'Arial-Black';
}


</style>