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
      show1: false,
    };
  },
  watch: {
    user: function (user) {
      this.newPassword = '';
      this.newUsername = user ? user.Username : '';
      this.newNotes = user ? user.Notes : '';
      this.newStatus = user ? user.Status : '';
      this.newRole = user ? user.Role : '';
    },
  },
  methods: {
    async editUser() {
      let alertParams = {
          type: 'error',
          title: 'Error durante actualización',
          text: 'Los datos del usuario no han podido ser registrados correctamente'
        };
      try {
        const USER_UPDATED_DATA = {
          email: this.user.Email,
          username: this.newUsername,
          notes: this.newNotes,
          status: this.newStatus,
          role: this.newRole,
        };
        const RAW_RESPONSE = await api.post('/users/update-one', USER_UPDATED_DATA);
        if (RAW_RESPONSE?.id) {
          alertParams = {
            type: 'success',
            title: 'Usuario actualizado',
            text: 'Los datos del usuario han sido registrados exitosamente!'
          }
        }
        this.$emit('modalActionTriggered', alertParams);
        this.$bvModal.hide('edit-user-modal');
      } catch (error) {
        this.$emit('modalActionTriggered', alertParams);
        console.error(error);
      } 
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
    </section>
    <footer class="modal-card-foot d-flex">
      <b-button variant="outline-primary" @click="editUser" class="ml-auto pr-3"><i class="mdi mdi-content-save mr-3"></i>Guardar</b-button>
    </footer>
  </b-modal>
</template>