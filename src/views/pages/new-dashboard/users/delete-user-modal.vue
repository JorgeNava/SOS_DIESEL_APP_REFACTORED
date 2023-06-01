<script>
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
        ProfileImage: ''
      }),
    },
  },
  page: {
    title: "Delete User",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      title: "Delete User",
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
      newProfileImage: '',
      show1: false,
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
      this.newProfileImage = user ? user.ProfileImage : '';
    },
  },
  methods: {
    async deleteUser() {
      let alertParams = {
          type: 'error',
          title: 'Error durante la eliminación',
          text: 'Los datos del usuario no han podido ser eliminados correctamente.'
        };
      try {
        const USER_EMAIL = this.user.Email;
        const QUERY = { email: USER_EMAIL}
        const RAW_RESPONSE = await api.delete('/users/delete-one-by-email', QUERY);
        if (RAW_RESPONSE?.id) {
          alertParams = {
            type: 'success',
            title: 'Usuario eliminado',
            text: 'Los datos del usuario han sido eliminados exitosamente!'
          }
        }
        this.$emit('modalActionTriggered', alertParams);
        this.$bvModal.hide('delete-user-modal');
      } catch (error) {
        this.$emit('modalActionTriggered', alertParams);
        console.error(error);
      } 
    },
    showImage() {
      this.$bvModal.show('image-modal');
    },
    closeImage() {
      this.newProfileImage = '';
      this.$bvModal.hide('image-modal');
    },
  },
};
</script>

<template>
  <b-modal id="delete-user-modal" :title="this.user ? `Eliminar a ${this.user.Username}` : ''" title-class="font-18" hide-footer>
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
          <b-form-input type="password" v-model="newPassword" placeholder="********" readonly></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Nombre de usuario">
        <b-input-group>
          <b-input-group-prepend is-text><i class="mdi mdi-account"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="newUsername" readonly></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Rol">
        <b-input-group>
          <b-input-group-prepend is-text><i class="mdi mdi-account"></i></b-input-group-prepend>
          <b-form-input type="text" v-model="newRole" readonly></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Notas">
        <b-input-group>
          <b-input-group-prepend is-text><i class="mdi mdi-note-text"></i></b-input-group-prepend>
          <b-form-textarea v-model="newNotes" readonly></b-form-textarea>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Estado">
        <b-input-group>
          <b-input-group-prepend is-text><i class="mdi mdi-format-list-checks"></i></b-input-group-prepend>
          <b-form-select v-model="newStatus" :options="[{value: 'Active', text: 'Active'}, {value: 'Blocked', text: 'Blocked'}]" readonly></b-form-select>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Foto de perfil">
        <div class="d-flex flex-wrap">
          <div v-if="newProfileImage" class="position-relative mr-2 mb-2">
            <img :src="newProfileImage" class="rounded-circle" style="width: 50px; height: 50px;" @click="showImage(newProfileImage)">
          </div>
        </div>
      </b-form-group>
    </section>
    <footer class="modal-card-foot d-flex">
      <b-button variant="outline-primary" @click="deleteUser" class="ml-auto pr-3"><i class="ri-delete-bin-line mr-3"></i>Eliminar</b-button>
    </footer>
    <b-modal id="image-modal" :hide-header="true" :hide-footer="true" :centered="true" :content-class="'image-modal'">
        <div class="image-container">
          <img :src="newProfileImage" class="modal-image" @click="closeImage">
        </div>
    </b-modal>
  </b-modal>
</template>