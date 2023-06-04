<script>
import _ from "lodash";
import appConfig from "@/app.config";
const { getApiClient } = require('@/helpers/sos-diesel-api-client');
const api = getApiClient();

export default {
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({
        Email: '',
        Username: '',
        Notes: '',
        Status: '',
        Role: '',
        ProfileImage: {}
      }),
    },
  },
  page: {
    title: "Edit User",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      title: "Edit User",
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
      newPassword: '',
      newUsername: '',
      newNotes: '',
      newStatus: '',
      newRole: '',
      newImage: '',
      show1: false,
      startSpinner: false,
      internalError: false,
      isImageOpen: false,
    };
  },
  watch: {
    user: function (user) {
      this.newPassword = '';
      this.newUsername = user ? user.Username : '';
      this.newNotes = user ? user.Notes : '';
      this.newStatus = user ? user.Status : '';
      this.newRole = user ? user.Role : '';
      this.newImage = user ? user.ProfileImage : '';
    },
    internalError: function () {
      if (this.internalError) {
        setTimeout(() => {
        this.internalError = false
      }, 3000)      }
    }
  },
  methods: {
    async editUser() {
      this.startSpinner = true;
      let alertParams = {
          type: 'error',
          title: 'Error durante actualización',
          text: 'Los datos del usuario no han podido ser registrados correctamente'
        };
      try {
        const INPUTS_ARE_VALID = this.validateInputs();
        if (!INPUTS_ARE_VALID) {
          this.internalError = true;
          this.startSpinner = false;
          return;
        }

        const USER_UPDATED_DATA = {
          email: this.user.Email,
          username: this.newUsername,
          notes: this.newNotes,
          status: this.newStatus,
          role: this.newRole,
          profileImage: await this.convertFileToBase64(this.newImage)
        };
        const RAW_RESPONSE = await api.post('/users/update-one', USER_UPDATED_DATA);
        if (RAW_RESPONSE?.id) {
          alertParams = {
            type: 'success',
            title: 'Usuario actualizado',
            text: 'Los datos del usuario han sido registrados exitosamente!'
          }
        }
        this.startSpinner = false;
        this.$emit('modalActionTriggered', alertParams);
        this.$bvModal.hide('edit-user-modal');
      } catch (error) {
        this.startSpinner = false;
        this.$emit('modalActionTriggered', alertParams);
        console.error(error);
      } 
    },
    validateInputs() {
      if (_.isEmpty(this.newUsername)) return false; 
      if (_.isEmpty(this.newRole)) return false; 
      if (_.isEmpty(this.newStatus)) return false; 
      return true;
    },
    openFileExplorer() {
      this.$refs.imageInput.click();
    },
    async handleImageUpload(event) {
      const files = event.target.files;
      const file = files[0];
      const base64String = await this.convertFileToBase64(file);
      this.newImage = {
        id: file.name,
        url: 'data:image/png;base64,' + base64String
      };
    },
    async convertFileToBase64(file) {
      if (typeof file === 'string' && file.startsWith('data:')) {
        return(file);
      }
      if (typeof file === 'string' && file.startsWith('http')) {
        return await this.convertUrlToBase64(file);
      }
      if (file?.url) {
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
    showImage() {
      this.$bvModal.show('image-modal');
    },
    closeImage() {
      this.$bvModal.hide('image-modal');
    },
    removeImage() {
      this.newImage = '';
    },
  },
};
</script>

<template>
  <b-modal id="edit-user-modal" :title="this.user ? `Editar a ${this.user.Username}` : ''" title-class="font-18" hide-footer>
    <section class="modal-card-body text-left px-5 pb-4">
      <b-form-group label="Correo">
        <b-input-group>
          <b-input-group-prepend is-text><i class="mdi mdi-at"></i></b-input-group-prepend>
          <b-form-input type="email" v-model="this.user.Email" readonly></b-form-input>
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
        <div class="d-flex flex-wrap">
          <div v-if="newImage !== ''" class="position-relative mr-2 mb-2">
            <img :src="newImage?.url ? newImage?.url : newImage" class="rounded-circle" style="width: 50px; height: 50px;" @click="showImage(newImage)">
            <button class="delete-icon" @click="removeImage()">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div v-if="newImage === ''" class="image-space">
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
      <b-button v-if="!startSpinner" variant="outline-primary" @click="editUser" class="ml-auto pr-3"><i class="mdi mdi-content-save mr-3"></i>Guardar</b-button>
      <b-spinner v-if="startSpinner" variant="primary" label="Spinning" class="ml-auto mr-4"></b-spinner>
    </footer>
    <b-modal id="image-modal" :hide-header="true" :hide-footer="true" :centered="true" :content-class="'image-modal'">
        <div class="image-container">
          <img :src="newImage" class="modal-image" @click="closeImage">
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