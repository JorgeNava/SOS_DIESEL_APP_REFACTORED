<script>
import _ from "lodash";
import appConfig from "@/app.config";
const { getApiClient } = require('@/helpers/sos-diesel-api-client');
const api = getApiClient();

export default {
  page: {
    title: "Create Product",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      title: "Create Product",
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
      newDescription: '',
      internalError: false
    };
  },
  methods: {
    async createProduct() {
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
          return;
        }

        const NEW_PRODUCT_DATA = {
          code: this.newCode,
          name: this.newName,
          brand: this.newBrand,
          truckModel: this.newTruckModel,
          price: parseInt(this.newPrice),
          description: this.newDescription,
        };
        const RAW_RESPONSE = await api.post('/catalog/create-product', NEW_PRODUCT_DATA);
        if (RAW_RESPONSE?.id) {
          alertParams = {
            type: 'success',
            title: 'Product creado',
            text: 'Los datos del producto han sido registrados exitosamente!'
          }
        }
        this.newCode = '';
        this.newName = '';
        this.newBrand = '';
        this.newTruckModel = '';
        this.newPrice = '';
        this.newDescription = '';
        this.$emit('modalActionTriggered', alertParams);
        this.$bvModal.hide('create-product-modal');
      } catch (error) {
        this.$emit('modalActionTriggered', alertParams);
        console.error(error);
      } 
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
      return true;
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
      <b-form-group label="Descripción">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-align-center"></i></b-input-group-prepend>
          <b-form-textarea v-model="newDescription"></b-form-textarea>
        </b-input-group>
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
      <b-button variant="outline-primary" @click="createProduct" class="ml-auto pr-3"><i class="mdi mdi-content-save mr-3"></i>Crear</b-button>
    </footer>
  </b-modal>
</template>