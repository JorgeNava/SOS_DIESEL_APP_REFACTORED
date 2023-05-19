<template>
  <b-modal
    v-model="isModalOpen"
    id="session-expired-modal"
    centered
    hide-header-close
    hide-footer
    no-close-on-backdrop
    @close="handleModalClose"
    @hidden="handleModalHidden"
  >
    <h2 class="mb-4">Sesión expirada</h2>
    <p>Tu sesión ha expirado por motivos de seguridad. Vuelve a iniciar sesión para continuar utilizando la aplicación.</p>
    <div class="w-100 mt-4 d-flex justify-content-end">
      <router-link to="/logout" @click.native="handleRouterLinkClick" class="btn btn-danger align-left">Cerrar sesión</router-link>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    showSessionExpiredModal: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      isModalOpen: false
    };
  },
  watch: {
    showSessionExpiredModal(newValue) {
      this.isModalOpen = newValue;
    }
  },
  methods: {
    handleModalClose() {
      this.isModalOpen = false;
    },
    handleRouterLinkClick() {
      this.$emit('modal-closed');
    },
    handleModalHidden() {
      this.isModalOpen = false;
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  font-size: 1rem;
}
</style>
