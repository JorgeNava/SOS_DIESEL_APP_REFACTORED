<script>
import _ from "lodash";
import appConfig from "@/app.config";
const { getApiClient } = require('@/helpers/sos-diesel-api-client');
const api = getApiClient();

export default {
  page: {
    title: "Crear Producto",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      title: "Crear Producto",
      newCode: '',
      newName: '',
      newBrand: '',
      newTruckModel: '',
      newPrice: '',
      newQuantity: 0,
      newDescription: '',
      newImages: [],
      startSpinner: false,
      internalError: false
    };
  },
  methods: {
    async createProduct() {
      this.startSpinner = true;
      let alertParams = {
          type: 'error',
          title: 'Error durante la creación',
          text: 'Los datos del producto no han podido ser creados correctamente'
        };
      try {
        this.internalError = false;
        const INPUTS_ARE_VALID = this.validateInputs();
        if (!INPUTS_ARE_VALID) {
          this.internalError = true;
          this.startSpinner = false;
          return;
        }

        const NEW_PRODUCT_DATA = {
          code: this.newCode,
          name: this.newName,
          brand: this.newBrand,
          truckModel: this.newTruckModel,
          price: parseInt(this.newPrice),
          quantity: parseInt(this.newQuantity),
          description: this.newDescription,
          images: [],
        };

        for (let i = 0; i < this.newImages.length; i++) {
          const file = this.newImages[i];
          const base64String = await this.convertFileToBase64(file);
          NEW_PRODUCT_DATA.images.push(base64String);
        }

        const RAW_RESPONSE = await api.post('/catalog/create-product', NEW_PRODUCT_DATA);

        if (RAW_RESPONSE?.id) {
          alertParams = {
            type: 'success',
            title: 'Producto creado',
            text: 'Los datos del producto han sido registrados exitosamente!'
          }
        }
        this.newCode = '';
        this.newName = '';
        this.newBrand = '';
        this.newTruckModel = '';
        this.newPrice = '';
        this.newDescription = '';
        this.newImages = [];
        this.startSpinner = false;
        this.$emit('modalActionTriggered', alertParams);
        this.$bvModal.hide('create-product-modal');
      } catch (error) {
        this.startSpinner = false;
        this.$emit('modalActionTriggered', alertParams);
        console.error(error);
      } 
    },
    async convertFileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    },
    isValidPositiveNumber(str) {
      const regex = /^[0-9]+(\.[0-9]+)?$/;
      return regex.test(str);
    },
    validateInputs() {
      if (_.isEmpty(this.newCode)) return false; 
      if (_.isEmpty(this.newName)) return false; 
      if (_.isEmpty(this.newBrand)) return false; 
      if (_.isEmpty(this.newPrice) || !this.isValidPositiveNumber(this.newPrice)) return false; 
      if (_.isEmpty(this.newQuantity) || isNaN(this.newQuantity)) return false; 
      return true;
    },
    openFileExplorer() {
      this.$refs.imageInput.click();
    },
    handleImageUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.newImages.push(file);
      }
    },
  },
  watch: {
    internalError: function () {
      if (this.internalError) {
        setTimeout(() => {
        this.internalError = false
      }, 3000)      }
    }
  }
};
</script>

<template>
  <b-modal id="create-product-modal" title="Crear nuevo producto" title-class="font-18" hide-footer>
    <section class="modal-card-body text-left px-5 pb-4">
      <b-form-group label="Código">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-qr-code-line"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="newCode"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Nombre">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-shopping-bag-3-line"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="newName"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Marca">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-store-2-line"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="newBrand"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Modelo de camión">
        <b-input-group>
          <b-input-group-prepend is-text><i class="mdi mdi-tractor"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="newTruckModel"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Precio">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-money-dollar-circle-line"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="newPrice"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Cantidad">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-hashtag"></i></b-input-group-prepend>
          <b-form-input type="number" v-model="newQuantity"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Descripción">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-align-center"></i></b-input-group-prepend>
          <b-form-textarea v-model="newDescription"></b-form-textarea>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Imágenes">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-align-center"></i></b-input-group-prepend>
          <input type="file" accept="image/*" @change="handleImageUpload" ref="imageInput" style="display: none">
          <div class="d-flex align-items-center">
            <b-button variant="primary" @click="openFileExplorer" :disabled="newImages.length >= 5">
              Añadir imagen
            </b-button>
            <span class="ml-3">Cargadas: {{ newImages.length }}/5</span>
          </div>
        </b-input-group>
        <div v-if="newImages.length > 0" class="mt-3">
          <p class="mb-1">Imágenes cargadas:</p>
          <ul class="mb-0">
            <li v-for="image in newImages" :key="image.name">{{ image.name }}</li>
          </ul>
        </div>
      </b-form-group>
      <b-alert
        :show="internalError"
        dismissible
        variant="danger"
        class="text-center"
        @dismissed="internalError = false"
      >
        Los campos necesarios para la operación han fallado en su validación.
      </b-alert> 
    </section>
    <footer class="modal-card-foot d-flex">
      <b-button v-if="!startSpinner" variant="outline-primary" @click="createProduct" class="ml-auto pr-3"><i class="mdi mdi-content-save mr-3"></i>Crear</b-button>
      <b-spinner v-if="startSpinner" variant="primary" label="Spinning" class="ml-auto mr-4"></b-spinner>
    </footer>
  </b-modal>
</template>