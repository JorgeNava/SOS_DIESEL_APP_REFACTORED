<script>
import appConfig from "@/app.config";
const { getApiClient } = require('@/helpers/sos-diesel-api-client');
const api = getApiClient();

export default {
  page: {
    title: "Catálogo",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      timer: null,
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
      title: "Catálogo",
      products: [],
      items: [
        {
          text: "Tienda"
        },
        {
          text: "Catálogo",
          active: true
        }
      ],
      filteredProducts: []
    };
  },
  async mounted() {
    await this.getProducts();
    this.filterProductsByMarca();
  },
  methods: {
    async getProducts() {
      const RESPONSE = await api.get('/catalog/get-all-products');
      this.products = RESPONSE.map((product) => {
        return product?.fields;
      });
    },
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
    getImageSource(product) {
      return product?.Images[0].url;
    },
    handleSearchInput() {
      // Si el campo de búsqueda está vacío, no se realizará el filtrado
      if (this.searchText.trim() === '') {
        this.shouldFilter = false;
      } else {
        this.shouldFilter = true;
        this.filterProductsByMarca();
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.filterProductsByMarca();
      }, 300) // Establece el retardo deseado en milisegundos (por ejemplo, 300ms)
    },
    filterProductsByMarca() {
      if (this.searchMarca) {
        this.filteredProducts = this.products.filter((product) =>
          product.Brand.toLowerCase().includes(this.searchMarca.toLowerCase())
        );
      } else {
        this.filteredProducts = this.products;
      }

      this.filteredProducts = this.filteredProducts.filter((product) => {
        if (this.precios.bajo && this.precios.medio && this.precios.alto) {
          // Si se seleccionan todos los filtros, mostrar todos los productos
          return true;
        }
        if(this.precios.bajo && this.precios.medio && (product.Price <= 5000)){
          return true;
        }
        if(this.precios.bajo && this.precios.alto && (product.Price < 2000 || product.Price > 5000)){
          return true;
        }
        if(this.precios.medio && this.precios.alto && (product.Price >= 2000 || product.Price > 5000)){
          return true;
        }
        if (this.precios.bajo && product.Price > 2000) {
          return false;
        }
        if (this.precios.medio && (product.Price < 2000 || product.Price >= 5000)) {
          return false;
        }
        if (this.precios.alto && product.Price < 5000) {
          return false;
        }
        if (
        (this.marcas.kubota && product.Brand.toLowerCase() === 'kubota') ||
        (this.marcas.johndeere && product.Brand.toLowerCase() === 'jhon deere') ||
        (this.marcas.ford && product.Brand.toLowerCase() === 'ford')) 
        {
        return true;
        }
        if (
        (this.marcas.kubota && product.Brand.toLowerCase() !== 'kubota') ||
        (this.marcas.johndeere && product.Brand.toLowerCase() !== 'jhon deere') ||
        (this.marcas.ford && product.Brand.toLowerCase() !== 'ford')) 
        {
        return false;
        }
        if (
          this.existencias.con && product.Quantity > 0 ||
          (this.existencias.sin && product.Quantity === 0)
        ) 
        {
          return true;
        }
        if (
          this.existencias.con && product.Quantity < 1 ||
          (this.existencias.sin && product.Quantity > 0)
        )
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
    <b-container fluid class="pagina">
      <b-row class="d-flex align-items-center">
        <b-col sm="12" lg="9">
          <p class="products--title">Productos</p>
        </b-col>
        <b-col sm="12" lg="3" class="search-box d-flex justify-content-end">
          <input type="text" class="w-100 form-control rounded-pill rounded-end border-danger" placeholder="Buscar" v-model="searchMarca" @beforeinput="filterProductsByMarca" />
        </b-col>
      </b-row>
      <b-row class="mt-4 mt-lg-5">
        <b-col sm="12" lg="2" class="ml-4 ml-lg-0">
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
        </b-col>
        <b-col sm="12" lg="8" class="mt-3 mt-lg-0">
          <div v-for="(item,index) in getPageRowsNumber()" :key="index" class="row no-gutters">
            <div v-for="(product, index) in filteredProducts.slice(getRowStart(index), getRowEnd(index))" :key="index" class="col-xl-4 col-sm-6">
              <div class="product-box">
                <router-link :to="{ path: '/detalles-del-producto', query: { Code: product.Code} }">
                <div class="product-img">
                  <img
                    :src="getImageSource(product)"
                    :alt="product.Code"
                    class="img-fluid mx-auto d-block"
                  />
                </div>
                <div class="text-center">
                  <p class="font-size-16 mb-1" style="color: rgba(206, 17, 17, 0.889);">{{product.Code}}</p>
                  <h5 class="font-size-18">
                    <router-link :to="`/detalles-del-producto/${product.Description}`" class="text-dark">{{product.Description}}</router-link>
                  </h5>
                  <h5 class="mt-3 mb-0" style="color: rgba(206, 17, 17, 0.889);">{{product.Price}}</h5>
                </div>
              </router-link>
              </div>
            </div>
          </div>
        </b-col>
        <b-col sm="12" lg="2" class="d-none d-sm-flex justify-content-end h-fit-content">
          <img src="@/assets/images/envio.png">
        </b-col>
      </b-row>
      <b-row class="d-flex justify-content-around mt-4">
        <p class="mb-sm-0 mt-lg-2">
          Página
          <span class="font-weight-bold">1</span> de
          <span class="font-weight-bold">{{Math.ceil(filteredProducts.length / limitProductsPerPage)}}</span>
        </p>
        <div class="float-sm-right">
          <ul class="pagination pagination-rounded mb-0">
            <b-pagination v-model="currentPage" :total-rows="filteredProducts.length" :per-page="limitProductsPerPage"></b-pagination>
          </ul>
        </div>
      </b-row>
    </b-container>
</template>

<style lang="scss" scoped>
.h-fit-content {
  height: fit-content;
}

.custom-control-input:checked~.custom-control-label::before {
  background-color: #bd0b0b !important;
  border-color: #f8f8f8 !important;
}

.custom-control-input:focus:not(:checked)~.custom-control-label::before {
  border-color: #17a2b8 !important;
}

.custom-checkbox .custom-control-input:checked~.custom-control-label::after {
  background-color: #990909 !important;
  border-color: #130808 !important;
}

.custom-checkbox .custom-control-input:disabled:checked~.custom-control-label::after {
  background-color: #f0f0f0 !important;
}

.custom-checkbox .custom-control-input:disabled:indeterminate~.custom-control-label::after {
  background-color: #f0f0f0 !important;
}


.pagina{
  padding: 5vh 2vw;
  min-height: 75vh;
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

.page-item.active .page-link{
  background-color: #bd0b0b !important; 
}
</style>