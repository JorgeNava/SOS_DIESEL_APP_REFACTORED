<script>
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
        Quantity: 0,
        Description: '',
        Images: []
      }),
    },
  },
  page: {
    title: "Delete Product",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      title: "Delete Product",
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
      newCode: '',
      newName: '',
      newBrand: '',
      newTruckModel: '',
      newPrice: '',
      newQuantity: 0,
      newDescription: '',
      newImages: [],
      isImageOpen: {},
      selectedImage: null,
      startSpinner: false,
    };
  },
  watch: {
    product: function (product) {
      this.newCode = '';
      this.newName = product ? product.Name : '';
      this.newBrand = product ? product.Brand : '';
      this.newTruckModel = product ? product.TruckModel : '';
      this.newPrice = product ? product.Price : '';
      this.newQuantity = product ? product.Quantity : '';
      this.newDescription = product ? product.Description : '';
      this.newImages = product ? product.Images : [];
    },
  },
  methods: {
    async deleteProduct() {
      this.startSpinner = true;
      let alertParams = {
          type: 'error',
          title: 'Error durante la eliminación',
          text: 'Los datos del producto no han podido ser eliminados correctamente.'
        };
      try {
        const PRODUCT_CODE = this.product.Code;
        const QUERY = { code: PRODUCT_CODE}
        const RAW_RESPONSE = await api.delete('/catalog/delete-product', QUERY);
        if (RAW_RESPONSE?.id) {
          alertParams = {
            type: 'success',
            title: 'Producto eliminado',
            text: 'Los datos del producto han sido eliminados exitosamente!'
          }
        }
        this.startSpinner = false;
        this.$emit('modalActionTriggered', alertParams);
        this.$bvModal.hide('delete-product-modal');
      } catch (error) {
        this.startSpinner = false;
        this.$emit('modalActionTriggered', alertParams);
        console.error(error);
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
  },
};
</script>

<template>
  <b-modal id="delete-product-modal" :title="this.product ? `Eliminar ${this.product.Code}` : ''" title-class="font-18" hide-footer>
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
          <b-form-input type="text" v-model="newName" readonly></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Marca">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-store-2-line"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="newBrand" readonly></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Modelo de camión">
        <b-input-group>
          <b-input-group-prepend is-text><i class="mdi mdi-tractor"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="newTruckModel" readonly></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Precio">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-money-dollar-circle-line"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="newPrice" readonly></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Cantidad">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-hashtag"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="newQuantity" readonly></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Descripción">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-align-center"></i></b-input-group-prepend>
          <b-form-textarea v-model="newDescription" readonly></b-form-textarea>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Imágenes">
        <div class="d-flex flex-wrap">
          <div v-for="image in newImages" :key="image.id" class="position-relative mr-2 mb-2">
            <img :src="image.url" class="rounded-circle" style="width: 50px; height: 50px;" @click="showImage(image.url)">
          </div>
        </div>
      </b-form-group>
    </section>
    <footer class="modal-card-foot d-flex">
      <b-button v-if="!startSpinner" variant="outline-primary" @click="deleteProduct" class="ml-auto pr-3"><i class="ri-delete-bin-line mr-3"></i>Eliminar</b-button>
      <b-spinner v-if="startSpinner" variant="primary" label="Spinning" class="ml-auto mr-4"></b-spinner>
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
</style>