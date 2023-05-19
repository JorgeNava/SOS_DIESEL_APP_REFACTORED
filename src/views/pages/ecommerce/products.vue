<script>
/*import VueSlideBar from "vue-slide-bar";*/
import appConfig from "@/app.config";

/**
 * Products Component
 */
export default {
  page: {
    title: "Product",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      productsPerPage: 0,
      rowsPerPage: 0,
      totalPages: 0,
      pageRows: 0,
      pageStartIndex: 0,
      pageEndIndex: 8,
      currentPage: 1,
      limitColumsPerRow: 3,
      limitRowsPerPage: 3,
      limitProductsPerPage: 9,
      searchMarca: "",
      shouldFilter: false,
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
      products: [
        {
          img:  require("@/assets/images/product/img-1.png"),
          codigo: "xxx",
          marca: "xxx",
          descripcion: "1",
          precio: 0
        },
        {
          img:  require("@/assets/images/product/img-2.png"),
          codigo: "xxx",
          marca: "Jhon Deere",
          descripcion: "2",
          precio: 0
        },
        {
          img:  require("@/assets/images/product/img-3.png"),
          codigo: "xxx",
          marca: "xxx",
          descripcion: "3",
          precio: 3000
        },
        {
          img:  require("@/assets/images/product/img-4.png"),
          codigo: "xxx",
          marca: "kubota",
          descripcion: "4",
          precio: 6000
        },
        {
          img:  require("@/assets/images/product/img-5.png"),
          codigo: "xxx",
          marca: "ford",
          descripcion: "5",
          precio: 1
        },
        {
          img:  require("@/assets/images/product/img-6.png"),
          codigo: "xxx",
          marca: "xxx",
          descripcion: "6",
          precio: 0
        },
        {
          img:  require("@/assets/images/product/img-3.png"),
          codigo: "xxx",
          marca: "Jhon Deere",
          descripcion: "7",
          precio: 0
        },
        {
          img:  require("@/assets/images/product/img-3.png"),
          codigo: "xxx",
          marca: "xxx",
          descripcion: "8",
          precio: 3000
        },
        {
          img:  require("@/assets/images/product/img-3.png"),
          codigo: "xxx",
          marca: "kubota",
          descripcion: "9",
          precio: 6000
        },
        {
          img:  require("@/assets/images/product/img-3.png"),
          codigo: "xxx",
          marca: "ford",
          descripcion: "10",
          precio: 1
        },
        {
          img:  require("@/assets/images/product/img-3.png"),
          codigo: "xxx",
          marca: "ford",
          descripcion: "11",
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
      filteredProducts: []
    };
  },
  mounted() {
    this.filterProductsByMarca();
  },
/*   computed: {
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.limitRowsPerPage);
    },
  },  */ 
  methods: {
    getTotalRows() {
      this.totalRows = Math.ceil(this.filteredProducts.length / this.limitColumsPerRow);
      return this.totalRows;
    },
    getPageRowsNumber() {
      const PRODUCTS_NOT_SHOWN = (this.filteredProducts.length - ((this.currentPage - 1) * this.limitProductsPerPage));
      this.productsPerPage = PRODUCTS_NOT_SHOWN >= this.limitProductsPerPage ? this.limitProductsPerPage : PRODUCTS_NOT_SHOWN;
      this.rowsPerPage = Math.ceil(this.productsPerPage / this.limitColumsPerRow);
      const numbersArray = [];
      for (let i = 0; i < this.rowsPerPage; i++) {
        numbersArray.push(i);
      }
      return numbersArray;
    },
    getRowStart(actualRow) {
      const ROW_START_INDEX = ((this.currentPage - 1) * this.limitProductsPerPage) + (actualRow * this.limitColumsPerRow);
      return ROW_START_INDEX;
    },
    getRowEnd(actualRow) {
      const ROW_END_INDEX = ((this.currentPage - 1) * this.limitProductsPerPage) + (actualRow * this.limitColumsPerRow) + 3;
      return ROW_END_INDEX;
    },
    getImageSource(path) {
      return path;
    },
    handleSearchInput() {
      // Si el campo de búsqueda está vacío, no se realizará el filtrado
      if (this.searchText.trim() === '') {
        this.shouldFilter = false;
      } else {
        this.shouldFilter = true;
        this.filterProductsByMarca();
      }
    },
    filterProductsByMarca() {
      if (this.searchMarca) {
        this.filteredProducts = this.products.filter((product) =>
          product.marca.toLowerCase().includes(this.searchMarca.toLowerCase())
        );
      } else {
        this.filteredProducts = this.products;
      }

      this.filteredProducts = this.filteredProducts.filter((product) => {
        if (this.precios.bajo && this.precios.medio && this.precios.alto) {
          // Si se seleccionan todos los filtros, mostrar todos los productos
          return true;
        }
        if(this.precios.bajo && this.precios.medio && (product.precio <= 5000)){
          return true;
        }
        if(this.precios.bajo && this.precios.alto && (product.precio < 2000 || product.precio > 5000)){
          return true;
        }
        if(this.precios.medio && this.precios.alto && (product.precio >= 2000 || product.precio > 5000)){
          return true;
        }
        if (this.precios.bajo && product.precio > 2000) {
          return false;
        }
        if (this.precios.medio && (product.precio < 2000 || product.precio >= 5000)) {
          return false;
        }
        if (this.precios.alto && product.precio < 5000) {
          return false;
        }
        if (
        (this.marcas.kubota && product.marca.toLowerCase() === 'kubota') ||
        (this.marcas.johndeere && product.marca.toLowerCase() === 'jhon deere') ||
        (this.marcas.ford && product.marca.toLowerCase() === 'ford')) 
        {
        return true;
        }
        if (
        (this.marcas.kubota && product.marca.toLowerCase() !== 'kubota') ||
        (this.marcas.johndeere && product.marca.toLowerCase() !== 'jhon deere') ||
        (this.marcas.ford && product.marca.toLowerCase() !== 'ford')) 
        {
        return false;
        }
        if (
        (this.existencias.con && product.existencia.toLowerCase() === 'con') ||
        (this.existencias.sin && product.existencia.toLowerCase() === 'sin')) 
        {
          return true;
        }
        if (
        (this.existencias.con && product.existencia.toLowerCase() !== 'con') ||
        (this.existencias.sin && product.existencia.toLowerCase() !== 'sin')) 
        {
          return false;
        }
        
        return true;
      });
    },
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
        <input type="text" class="form-control rounded-pill rounded-end border-danger text-capitalize" placeholder="BUSCAR" v-model="searchMarca"
        @change="filterProductsByMarca" />
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
              <input type="checkbox" class="custom-control-input" id="bajo" v-model="precios.bajo" @change="filterProductsByMarca">
              <label class="custom-control-label" for="bajo">Menos de 2000</label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="medio" v-model="precios.medio" @change="filterProductsByMarca">
              <label class="custom-control-label" for="medio">2000 - 5000</label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="alto" v-model="precios.alto" @change="filterProductsByMarca">
              <label class="custom-control-label" for="alto">Más de 5000</label>
            </div>
          </div>
        </div>
        <div>
          <h5 class="font-size-20 mt-3 ml-2" style="font-family: 'Helvetica-SOS'; color: rgba(206, 17, 17, 0.889);">
              Marca
          </h5>
            <div class="mt-2">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="kubota" v-model="marcas.kubota" @change="filterProductsByMarca">
                <label class="custom-control-label" for="kubota">Kubota</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="johndeere" v-model="marcas.johndeere" @change="filterProductsByMarca">
                <label class="custom-control-label" for="johndeere">Jhon Deere</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="ford" v-model="marcas.ford" @change="filterProductsByMarca">
                <label class="custom-control-label" for="ford">Ford</label>
              </div>
            </div>
        </div>
      

        <div>
          <h5 class="font-size-20 mt-3 ml-2" style="font-family: 'Helvetica-SOS'; color: rgba(206, 17, 17, 0.889);">
              Existencia
          </h5>
            <div class="mt-2">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="con" v-model="existencias.con" @change="filterProductsByMarca">
                <label class="custom-control-label" for="con">Con existencia</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="sin" v-model="existencias.sin" @change="filterProductsByMarca">
                <label class="custom-control-label" for="sin">Sin existencia</label>
              </div>
            </div>
        </div>
      </div>

      <div class="fotos col-lg-8 ml-5">
        <div>
          <div>
            <div v-for="(item,index) in getPageRowsNumber()" :key="index" class="row no-gutters mt-5">
              <div v-for="(product, index) in filteredProducts.slice(getRowStart(index), getRowEnd(index))" :key="index" class="col-xl-4 col-sm-6">
                <div class="product-box">
                  <div class="product-img">
                    <!--<div class="product-ribbon badge badge-warning">Trending</div>-->
                    <div class="">
                      <a href="/ecommerce/product-details">
                        
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
                      <a href="/ecommerce/product-details" class="text-dark">{{product.descripcion}}</a>
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
                    <span class="font-weight-bold">1</span> Of
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
                    <div class="dataTables_paginate paging_simple_numbers float-right">
                      <ul class="pagination pagination-rounded mb-0">
                        <!-- pagination -->
                        <b-pagination v-model="currentPage" :total-rows="filteredProducts.length" :per-page="limitProductsPerPage"></b-pagination>
                      </ul>
                    </div>
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
    font-size: 1.4rem;
    text-align: center;
  }

.search-box input {
  font-size: 1.2rem;
  text-align: center;
  border-width: 6px;
  width: 20vw;
  margin: 0 0;
  height: 4vh;
  padding: 15px 3px 15px;
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