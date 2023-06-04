<script>
import _ from "lodash";
import Layout from "@/views/layouts/main";
import PageHeader from "@/components/page-header";

import store from '@/state/store'
const { getApiClient } = require('@/helpers/sos-diesel-api-client');
const api = getApiClient();

import {
  notificationMethods,
  authMethods
} from "@/state/helpers";

export default {
  data() {
    return {
      title: "Perfil",
      items: [
        {
          text: "Usuarios",
          href: "/"
        },
        {
          text: "Perfil",
          active: true
        }
      ],
      profileUserUsername: 'Jorge Nava',
      profileUserProfileImage: '@/assets/iamges/users/avatar-6.jpg',
      profileUserEmail: 'correo@example.com',
      profileUserRole: 'Rol del usuario',
      profileUserNotes: 'Notas del usuario',
      profileUserStatus: 'Active',
      statusOptions: ['Active', 'Blocked'],
      editing: false,
      internalError: false
    };
  },
  methods: {
    ...notificationMethods,
    ...authMethods,
    async toggleEditing() {
    
      if (this.editing) {
        if (this.validateInputs()) {
          let alertParams = {
            type: 'error',
            title: 'Error durante actualización',
            text: 'Los datos del usuario no han podido ser registrados correctamente'
          };
          const USER_UPDATED_DATA = {
            email: this.profileUserEmail,
            username: this.profileUserUsername,
            notes: this.profileUserNotes,
            status: this.profileUserStatus,
            role: this.profileUserRole,
            //profileImage: await this.convertFileToBase64(this.profileUserProfileImage)
          };
          const RAW_RESPONSE = await api.post('/users/update-one', USER_UPDATED_DATA);
          if (RAW_RESPONSE?.id) {
            alertParams = {
              type: 'success',
              title: 'Usuario actualizado',
              text: 'Los datos del usuario han sido registrados exitosamente!'
            }
          }
          const NEW_CURRENT_USER = {
            Email: this.profileUserEmail,
            Username: this.profileUserUsername,
            Notes: this.profileUserNotes,
            Status: this.profileUserStatus,
            Role: this.profileUserRole,
            ProfileImage: [{url: this.profileUserProfileImage}],
          };
          this.setUser(NEW_CURRENT_USER);
          this.editing = false;
          this.makeToast(alertParams);
        } else {
          this.internalError = true;
          this.editing = true;
        }
      } else {
        this.editing = true;
      }
    },
    validateInputs() {
      if (_.isEmpty(this.profileUserUsername)) return false; 
      if (_.isEmpty(this.profileUserEmail)) return false; 
      if (_.isEmpty(this.profileUserRole)) return false; 
      if (_.isEmpty(this.profileUserStatus)) return false; 
      return true;
    },
    makeToast(alertParams) {
      this.$bvToast.toast(alertParams?.text, {
        title: alertParams?.title,
        variant: alertParams?.type,
        solid: true
      });
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
      this.profileUserProfileImage = '';
    },
  },
  watch: {
    internalError: function () {
      if (this.internalError) {
        setTimeout(() => {
        this.internalError = false
      }, 3000)      }
    }
  },
  mounted() {
    const ACTUAL_USER = store.getters['auth/loggedInUser'];
    this.profileUserUsername = ACTUAL_USER?.Username;
    this.profileUserProfileImage = ACTUAL_USER.ProfileImage ? ACTUAL_USER.ProfileImage[0].url : '@/assets/images/users/avatar-6.jpg';
    this.profileUserEmail = ACTUAL_USER?.Email;
    this.profileUserRole = ACTUAL_USER?.Role;
    this.profileUserNotes = ACTUAL_USER?.Notes;
    this.profileUserStatus = ACTUAL_USER?.Status;
  },
  components: { Layout, PageHeader},
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="profile-card">
      <b-card class="card" :bg-variant="'light'" :border-variant="'light'" :shadow="4">
        <div class="d-flex">
          <div class="d-flex w-50 flex-column justify-content-center align-items-center">
            <img :src="profileUserProfileImage"  class="profile-image" />
            <b-form class="w-100 d-flex justify-content-center align-items-center text-center center-cursor">
              <b-form-group label="Nombre de usuario">
                <b-form-input v-model="profileUserUsername" :readonly="!editing"></b-form-input>
              </b-form-group>
            </b-form>
          </div>
          <b-form class="pl-3 pr-5 py-3 w-50">
            <b-form-group label="Correo">
              <b-form-input v-model="profileUserEmail" :readonly="true"></b-form-input>
            </b-form-group>
            <b-form-group label="Rol">
              <b-form-input v-model="profileUserRole" :readonly="true"></b-form-input>
            </b-form-group>
            <b-form-group label="Notas">
              <b-form-textarea v-model="profileUserNotes" :readonly="!editing"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Estatus">
              <b-form-select v-model="profileUserStatus" :options="editing ? statusOptions : [profileUserStatus]" :readonly="true"></b-form-select>
            </b-form-group>
            <div class="text-center mt-4">
              <b-button variant="primary" @click="toggleEditing">
                <i name="action" icon="pencil-fill"></i> {{ editing ? 'Guardar' : 'Editar' }}
              </b-button>
            </div>
          </b-form>
        </div>

      </b-card>
    </div>
  </Layout>
</template>

<style scoped>
  .profile-card{
    font-size: 1.5rem;
  }
  .card {
    border-radius: 20px;
  }

  .profile-image {
    width: 10vw;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  .center-cursor input {
    text-align: center;
  }
</style>
