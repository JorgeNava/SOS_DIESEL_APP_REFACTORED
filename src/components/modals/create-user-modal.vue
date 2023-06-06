<script>
import _ from "lodash";
import appConfig from "@/app.config";
const { getApiClient } = require('@/helpers/sos-diesel-api-client');
const api = getApiClient();

export default {
  page: {
    title: "Create User",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      title: "Create User",
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
      newEmail: '',
      newPassword: '',
      newUsername: '',
      newNotes: '',
      newStatus: 'Active',
      newRole: '',
      newImage: {},
      show1: false,
      startSpinner: false,
      internalError: false
    };
  },
  methods: {
    async createUser() {
      this.startSpinner = true;
      let alertParams = {
          type: 'error',
          title: 'Error durante la creación',
          text: 'Los datos del usuario no han podido ser creados correctamente'
        };
      try {
        this.internalError = false;
        const INPUTS_ARE_VALID = this.validateInputs();
        if (!INPUTS_ARE_VALID) {
          this.internalError = true;
          this.startSpinner = false;
          return;
        }

        const NEW_USER_DATA = {
          email: this.newEmail,
          password: this.newPassword,
          username: this.newUsername,
          notes: this.newNotes,
          status: this.newStatus,
          role: this.newRole,
          profileImage: await this.convertFileToBase64(this.newImage)
        };

        const RAW_RESPONSE = await api.post('/users/create-one', NEW_USER_DATA);
        if (RAW_RESPONSE?.id) {
          alertParams = {
            type: 'success',
            title: 'Usuario creado',
            text: 'Los datos del usuario han sido registrados exitosamente!'
          }
        }
        this.newEmail = '';
        this.newPassword = '';
        this.newUsername = '';
        this.newNotes = '';
        this.newStatus = 'Active';
        this.newRole = '';
        this.newImage = {};
        this.startSpinner = false;
        this.$emit('modalActionTriggered', alertParams);
        this.$bvModal.hide('create-user-modal');
      } catch (error) {
        this.startSpinner = false;
        this.$emit('modalActionTriggered', alertParams);
        console.error(error);
      } 
    },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    validateInputs() {
      if (_.isEmpty(this.newEmail) || !this.validateEmail(this.newEmail)) return false; 
      if (_.isEmpty(this.newPassword)) return false; 
      if (_.isEmpty(this.newUsername)) return false; 
      if (_.isEmpty(this.newStatus)) return false; 
      if (_.isEmpty(this.newRole)) return false; 
      return true;
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
    openFileExplorer() {
      this.$refs.imageInput.click();
    },
    handleImageUpload(event) {
      const files = event.target.files;
      this.newImage = files[0];
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
  <b-modal id="create-user-modal" title="Crear nuevo usuario" title-class="font-18" hide-footer>
    <section class="modal-card-body text-left px-5 pb-4">
      <b-form-group label="Correo">
        <b-input-group>
          <b-input-group-prepend is-text><i class="mdi mdi-at"></i></b-input-group-prepend>
          <b-form-input type="email" v-model="newEmail"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Contraseña">
        <b-input-group>
          <b-input-group-prepend is-text><i :class="show1 ? 'mdi mdi-eye' : 'mdi mdi-eye-off'" @click="show1 = !show1"></i></b-input-group-prepend>
          <b-form-input type="password" v-model="newPassword" placeholder="********"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Nombre de usuario">
        <b-input-group>
          <b-input-group-prepend is-text><i class="mdi mdi-account"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="newUsername"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Rol">
        <b-input-group>
          <b-input-group-prepend is-text><i class="mdi mdi-account"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="newRole"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Notas">
        <b-input-group>
          <b-input-group-prepend is-text><i class="mdi mdi-note-text"></i></b-input-group-prepend>
          <b-form-textarea v-model="newNotes"></b-form-textarea>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Estado">
        <b-input-group>
          <b-input-group-prepend is-text><i class="mdi mdi-format-list-checks"></i></b-input-group-prepend>
          <b-form-select v-model="newStatus" :options="[{value: 'Active', text: 'Active'}, {value: 'Blocked', text: 'Blocked'}]"></b-form-select>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Foto de perfil">
        <b-input-group>
          <b-input-group-prepend is-text><i class="ri-align-center"></i></b-input-group-prepend>
          <input type="file" accept="image/*" @change="handleImageUpload" ref="imageInput" style="display: none">
          <div class="d-flex align-items-center">
            <b-button variant="primary" @click="openFileExplorer" :disabled="newImage === {}">
              Añadir imagen
            </b-button>
          </div>
        </b-input-group>
        <div v-if="newImage !== {}" class="mt-3">
          <p class="mb-1">Imágen cargada:</p>
          <p class="mb-1">{{ newImage.name }}</p>
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
      <b-button  v-if="!startSpinner" variant="outline-primary" @click="createUser" class="ml-auto pr-3"><i class="mdi mdi-content-save mr-3"></i>Crear</b-button>
      <b-spinner v-if="startSpinner" variant="primary" label="Spinning" class="ml-auto mr-4"></b-spinner>
    </footer>
  </b-modal>
</template>