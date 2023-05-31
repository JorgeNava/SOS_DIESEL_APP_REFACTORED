<script>
import _ from "lodash";
import appConfig from "@/app.config";
const { getApiClient } = require('@/helpers/sos-diesel-api-client');
const api = getApiClient();

export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({
        Code: '',
        Name: '',
        Brand: '',
        TruckModel: '',
        Price: '',
        Quantity: '',
        Description: '',
        Images: []
      }),
    },
  },
  page: {
    title: "Edit Product",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      title: "Edit Product",
      items: [
        {
          text: "UI Elements",
          href: "/"
        },
        {
          text: "Modals",
          active: true
        }
      ],
      newName: '',
      newBrand: '',
      newTruckModel: '',
      newPrice: '',
      newQuantity: 0,
      newDescription: '',
      newImages: [],
      internalError: false,
      isImageOpen: {},
      selectedImage: null
    };
  },
  watch: {
    product: function (product) {
      console.log('[NAVA] product:', product);
      this.newName = product ? product.Name : '';
      this.newBrand = product ? product.Brand : '';
      this.newTruckModel = product ? product.TruckModel : '';
      this.newPrice = product.Price ? product.Price.toString() : '';
      this.newQuantity = product ? product.Quantity : '';
      this.newDescription = product ? product.Description : '';
      this.newImages = product ? product.Images : [];
    },
    internalError: function () {
      if (this.internalError) {
        setTimeout(() => {
        this.internalError = false
      }, 3000)      }
    }
  },
  methods: {
    async editProduct() {
      let alertParams = {
          type: 'error',
          title: 'Error durante actualización',
          text: 'Los datos del producto no han podido ser registrados correctamente'
        };
      try {
        const INPUTS_ARE_VALID = this.validateInputs();
        if (!INPUTS_ARE_VALID) {
          this.internalError = true;
          return;
        }
        
        const NEW_PRODUCT_DATA = {
          code: this.product?.Code,
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

        const RAW_RESPONSE = await api.post('/catalog/update-product', NEW_PRODUCT_DATA);
        if (RAW_RESPONSE?.id) {
          alertParams = {
            type: 'success',
            title: 'Producto actualizado',
            text: 'Los datos del producto han sido registrados exitosamente!'
          }
        }
        this.$emit('modalActionTriggered', alertParams);
        this.$bvModal.hide('edit-product-modal');
      } catch (error) {
        this.$emit('modalActionTriggered', alertParams);
        console.error(error);
      } 
    },
    isValidPositiveNumber(value) {
      if (typeof value === 'number') {
        return value >= 0;
      }

      if (typeof value === 'string') {
        const regex = /^[0-9]+(\.[0-9]+)?$/;
        return regex.test(value);
      }

      return false;
    },
    validateInputs() {
      if (_.isEmpty(this.newName)) return false; 
      if (_.isEmpty(this.newBrand)) return false; 
      if (_.isEmpty(this.newPrice) || !this.isValidPositiveNumber(this.newPrice)) return false; 
      return true;
    },
    openFileExplorer() {
      this.$refs.imageInput.click();
    },
    async handleImageUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const base64String = await this.convertFileToBase64(file);
        this.newImages.push({
          id: file.name,
          url: 'data:image/png;base64,' + base64String
        });
      }
    },
    async convertFileToBase64(file) {
      if (typeof file === 'string' && file.startsWith('data:')) {
        return(file);
      }

      if (file.url) {
        return await this.convertUrlToBase64(file.url);
      }
        
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
    async convertUrlToBase64(url) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
          };

          reader.onerror = (error) => {
            reject(error);
          };

          reader.readAsDataURL(blob);
        });
      } catch (error) {
        throw new Error('Failed to convert URL to base64: ' + error.message);
      }
    },
    showImage(imageUrl) {
      this.selectedImage = imageUrl;
      this.$bvModal.show('image-modal');
    },
    closeImage() {
      this.selectedImage = null;
      this.$bvModal.hide('image-modal');
    },
    removeImage(imageId) {
      this.newImages = this.newImages.filter(image => image.id !== imageId);
    },
  },
};
</script>

<template>
  <b-modal id="edit-product-modal" :title="this.product ? `Editar ${this.product.Code}` : ''" title-class="font-18" hide-footer>
    <section class="modal-card-body text-left px-5 pb-4">
      <b-form-group label="Código">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-qr-code-line"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="this.product.Code" readonly></b-form-input>
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
          <b-form-textarea v-model="newQuantity"></b-form-textarea>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Descripción">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-align-center"></i></b-input-group-prepend>
          <b-form-textarea v-model="newDescription"></b-form-textarea>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Imágenes">
        <div class="d-flex flex-wrap">
          <div v-for="image in newImages" :key="image.id" class="position-relative mr-2 mb-2">
            <img :src="image.url" class="rounded-circle" style="width: 50px; height: 50px;" @click="showImage(image.url)">
            <button class="delete-icon" @click="removeImage(image.id)">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div v-if="newImages.length < 5" class="image-space">
            <input type="file" accept="image/*" @change="handleImageUpload" ref="imageInput" style="display: none">
            <button class="add-icon" @click="openFileExplorer">
              <i class="ri-add-line"></i>
            </button>
          </div>
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
      <b-button variant="outline-primary" @click="editProduct" class="ml-auto pr-3"><i class="mdi mdi-content-save mr-3"></i>Guardar</b-button>
    </footer>
    <b-modal id="image-modal" :hide-header="true" :hide-footer="true" :centered="true" :content-class="'image-modal'">
        <div class="image-container">
          <img :src="selectedImage" class="modal-image" @click="closeImage">
        </div>
    </b-modal>
  </b-modal>
</template>

<style scoped lang="scss">

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .modal-image {
    max-width: 90vw;
    max-height: 90vh;
    cursor: pointer;
  }

  .delete-icon {
    position: absolute;
    top: -10px;
    right: -15px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .delete-icon i {
    font-size: 14px;
    color: #ff0000;
  }

  .image-space {
    width: 50px;
    height: 50px;
    background-color: #f1f1f1;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }

  .add-icon {
    background-color: #f1f1f1;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .add-icon i {
    font-size: 24px;
    color: #888888;
  }
</style>