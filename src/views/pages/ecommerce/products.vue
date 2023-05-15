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
  methods: {
    getRowsNumber() {
        let rowNumber = Math.ceil(this.products.length / this.limitColumsPerRow);
        const numbersArray = [];
        for (let i = 0; i < rowNumber; i++) {
          numbersArray.push(i);
        }
        console.log(numbersArray, rowNumber)
        return numbersArray;
        },
        getRowStart(actualRow) {
          return actualRow * this.limitColumsPerRow;
        },
        getRowEnd(actualRow){
          return actualRow * this.limitColumsPerRow + 3;
        },
        getImageSource(path) {
          console.log(path)
          return path
        }
      },
      updateFilter() {
        this.$emit('filter-update', {
          precios: this.precios,
          marcas: this.marcas,
          existencias: this.existencias
        })
      },
      filtrarProductos() {
        let min = 0;
        let max = Number.MAX_SAFE_INTEGER;

        if (this.precio.bajo) {
          max = 2000;
        } else if (this.precio.medio) {
          min = 2000;
          max = 5000;
        } else if (this.precio.alto) {
          min = 5000;
        }

        return this.products.filter(producto => producto.precio >= min && producto.precio <= max);
      },
  data() {
    return {
      precios: {
      bajo: false,
      medio: false,
      alto: false
      },
      marcas: {
        kubota: false,
        johndeere: false,
        ford: false
      },
      existencias: {
        con: false,
        sin: false
      },
      title: "Products",
      limitColumsPerRow: 3,
      limitRowsPerPage: 3,
      products: [
        {
          img:  require("@/assets/images/product/img-1.png"),
          codigo: "xxx",
          marca: "xxx",
          descripcion: "xxx",
          precio: 0
        },
        {
          img:  require("@/assets/images/product/img-2.png"),
          codigo: "xxx",
          marca: "xxx",
          descripcion: "xxx",
          precio: 0
        },
        {
          img:  require("@/assets/images/product/img-3.png"),
          codigo: "xxx",
          marca: "xxx",
          descripcion: "xxx",
          precio: 0
        },
        {
          img:  require("@/assets/images/product/img-4.png"),
          codigo: "xxx",
          marca: "xxx",
          descripcion: "xxx",
          precio: 0
        },
        {
          img:  require("@/assets/images/product/img-5.png"),
          codigo: "xxx",
          marca: "xxx",
          descripcion: "xxx",
          precio: 1
        },
      ],
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
  },
};
</script>

<template>
<div class="pagina  "> 
  <div class="container m-0 pt-5">
    <div class=" a row  d-flex align-items-center ">
      <div class="juas col d-flex align-items-start ">
        <h1 class="Productos ">Productos</h1>
      </div>
      <div class="col search-box d-flex justify-content-end">
        <input type="text" class="form-control rounded-pill rounded-end border-danger" placeholder="buscar" />
      </div>
      <div class="image-container col-md-4">
        <img src="@/assets/images/envio.png">
      </div>
    </div>
  </div>
  

  <div class="row">
    <div class="filtros col-xl-2 col-lg-2 custom-width">
        <div class="mt-5 border-top">
          <h5 class="font-size-22 mb-4 mt-3 ml-2" style="font-family: 'Helvetica-SOS';">Filtros:</h5>
          <div>
            <h5 class="font-size-20 mb-1 ml-2" style="font-family: 'Helvetica-SOS'; color: rgba(206, 17, 17, 0.889);">Precio</h5>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="bajo" v-model="marcas.bajo" @change="updateFilter">
              <label class="custom-control-label" for="bajo">Menos de 2000</label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="medio" v-model="precios.medio" @change="updateFilter">
              <label class="custom-control-label" for="medio">2000 - 5000</label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="alto" v-model="precios.alto" @change="updateFilter">
              <label class="custom-control-label" for="alto">Más de 5000</label>
            </div>
            <vue-slide-bar v-model="sliderPrice" :min="0" :max="10000" />
          </div>
        </div>
        <div>
          <h5 class="font-size-20 mt-3 ml-2" style="font-family: 'Helvetica-SOS'; color: rgba(206, 17, 17, 0.889);">
              Marca
          </h5>
            <div class="mt-4">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="kubota" v-model="marcas.kubota" @change="updateFilter">
                <label class="custom-control-label" for="kubota">Kubota</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="johndeere" v-model="marcas.johndeere" @change="updateFilter">
                <label class="custom-control-label" for="johndeere">Jhon Deere</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="ford" v-model="marcas.ford" @change="updateFilter">
                <label class="custom-control-label" for="ford">Ford</label>
              </div>
            </div>
        </div>
      

        <div>
          <h5 class="font-size-20 mt-3 ml-2" style="font-family: 'Helvetica-SOS'; color: rgba(206, 17, 17, 0.889);">
              Existencia
          </h5>
            <div class="mt-4">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="con" v-model="existencias.con" @change="updateFilter">
                <label class="custom-control-label" for="con">Con existencia</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="sin" v-model="existencias.sin" @change="updateFilter">
                <label class="custom-control-label" for="sin">Sin existencia</label>
              </div>
            </div>
        </div>
      </div>

      <div class="fotos col-lg-8 ml-5">
        <div>
          <div>
            <div v-for="(item,index) in getRowsNumber()" :key="index" class="row no-gutters mt-5">
              <div v-for="(product,index) in products.slice(getRowStart(item),getRowEnd(item))" :key="index"  class="col-xl-4 col-sm-6">
                <div v-for="producto, index in filtrarProductos()" :key="index">
                  <img :src="producto.img" alt="producto">
                  <p>Código: {{ producto.codigo }}</p>
                  <p>Marca: {{ producto.marca }}</p>
                  <p>Descripción: {{ producto.descripcion }}</p>
                  <p>Precio: {{ producto.precio }}</p>
                </div>
                <div class="product-box">
                  <div class="product-img">
                    <!--<div class="product-ribbon badge badge-warning">Trending</div>-->
                    <div class="">
                      <a href="#">
                        
                      </a>
                    </div>
                    <img
                      :src="getImageSource(product.img)"
                      :alt="product.codigo"
                      class="img-fluid mx-auto d-block"
                    />
                  </div>

                  <div class="text-center">
                    <p class="font-size-16 mb-1" style="color: rgba(206, 17, 17, 0.889);">{{product.title}}</p>
                    <h5 class="font-size-18">
                      <a href="#" class="text-dark">{{product.descripcion}}</a>
                    </h5>

                    <h5 class="mt-3 mb-0" style="color: rgba(206, 17, 17, 0.889);">{{product.precio}}</h5>
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

.custom-control-input:checked~.custom-control-label::before {
  background-color: #17a2b8 !important;
  border-color: #17a2b8 !important;
}

.custom-control-input:focus:not(:checked)~.custom-control-label::before {
  border-color: #17a2b8 !important;
}

.custom-checkbox .custom-control-input:checked~.custom-control-label::after {
  background-color: #17a2b8 !important;
  border-color: #17a2b8 !important;
}

.custom-checkbox .custom-control-input:focus:not(:checked)~.custom-control-label::after {
  border-color: #17a2b8 !important;
}

.custom-checkbox .custom-control-input:disabled:checked~.custom-control-label::before {
  background-color: rgba(23, 162, 184, 0.5) !important;
}

.custom-checkbox .custom-control-input:disabled:indeterminate~.custom-control-label::before {
  background-color: rgba(23, 162, 184, 0.5) !important;
}

.custom-checkbox .custom-control-input:disabled:checked~.custom-control-label::after {
  background-color: #f0f0f0 !important;
}

.custom-checkbox .custom-control-input:disabled:indeterminate~.custom-control-label::after {
  background-color: #f0f0f0 !important;
}

.container{
  max-width: 92%;
}


.pagina{
  background-color: white
}

h1 {
  font-size: 70px; /* tamaño de la letra */
  font-weight: bold; /* negrita */
  margin: 0; /* eliminamos el margen por defecto del h1 */
}
.filtros{
  padding-left: 4%;
  font-family: 'Helvetica-SOS';
}

.form-control::placeholder {
    font-weight:bolder;
    font-size: 1.8rem;
    text-align: center;
  }

.search-box input {
  border-width: 6px;
  width: 20vw;
  margin: 0 0;
  height: 4vh;
  padding: 15px 3px 8px;
  font-family: 'Helvetica-SOS';
}

.search-box .border-danger {
  border-color: red;
}

.image-container {

  position: absolute;
  height: 70vh;
  width:9vw;
  top: 25vh;
  left: 85%;
}

.image-container img{
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 14vw;
  height: 70vh;
}

.Productos{
  font-family: 'Helvetica-SOS';
  letter-spacing: 3px;
  margin-left: 6%;
}

.product-box{
  font-weight: bold;
  font-family: 'Helvetica-SOS';
}

.product-box .text-center .text-dark{
  font-weight: bold;
  font-family: 'Helvetica-SOS';
}


</style>