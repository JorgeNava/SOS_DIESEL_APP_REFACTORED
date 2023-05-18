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
      title: "Profile",
      items: [
        {
          text: "Users",
          href: "/"
        },
        {
          text: "Profile",
          active: true
        }
      ],
      user: {
        Username: 'Jorge Nava',
        ProfileImage: '/ruta/a/la/imagen.png',
        Rmail: 'correo@example.com',
        Role: 'Rol del usuario',
        Notes: 'Notas del usuario',
        Status: 'Active',
      },
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
            email: this.user.Email,
            username: this.user.Username,
            notes: this.user.Notes,
            status: this.user.Status,
            role: this.user.Role,
          };
          const RAW_RESPONSE = await api.post('/users/update-one', USER_UPDATED_DATA);
          if (RAW_RESPONSE?.id) {
            alertParams = {
              type: 'success',
              title: 'Usuario actualizado',
              text: 'Los datos del usuario han sido registrados exitosamente!'
            }
          }
          this.setUser(this.user);
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
      if (_.isEmpty(this.user.Username)) return false; 
      if (_.isEmpty(this.user.Email)) return false; 
      if (_.isEmpty(this.user.Role)) return false; 
      if (_.isEmpty(this.user.Status)) return false; 
      return true;
    },
    makeToast(alertParams) {
      this.$bvToast.toast(alertParams?.text, {
        title: alertParams?.title,
        variant: alertParams?.type,
        solid: true
      });
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
  created() {
    const ACTUAL_USER = store.getters['auth/loggedInUser'];
    console.log('[NAVA] ACTUAL_USER:', ACTUAL_USER);
    this.user = ACTUAL_USER;
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
            <img src="@/assets/images/users/avatar-6.jpg"  class="profile-image" />
            <b-form class="w-100 d-flex justify-content-center align-items-center text-center center-cursor">
              <b-form-group label="Nombre de usuario">
                <b-form-input v-model="user.Username" :readonly="!editing"></b-form-input>
              </b-form-group>
            </b-form>
          </div>
          <b-form class="pl-3 pr-5 py-3 w-50">
            <b-form-group label="Correo">
              <b-form-input v-model="user.Email" :readonly="true"></b-form-input>
            </b-form-group>
            <b-form-group label="Rol">
              <b-form-input v-model="user.Role" :readonly="true"></b-form-input>
            </b-form-group>
            <b-form-group label="Notas">
              <b-form-textarea v-model="user.Notes" :readonly="!editing"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Estatus">
              <b-form-select v-model="user.Status" :options="editing ? statusOptions : [user.Status]" :readonly="true"></b-form-select>
            </b-form-group>
            <div class="text-center mt-4">
              <b-button variant="primary" @click="toggleEditing">
                <i name="action" icon="pencil-fill"></i> {{ editing ? 'Guardar' : 'Editar' }}
              </b-button>
            </div>
          </b-form>
        </div>
        <b-alert
          :show="internalError"
          dismissible
          variant="danger"
          class="text-center"
          @dismissed="internalError = false"
        >       
        Los campos necesarios para la operación han fallado en su validación.
        </b-alert>
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
