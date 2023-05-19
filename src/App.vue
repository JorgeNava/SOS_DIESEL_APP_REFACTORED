<template>
  <div id="app">
    <router-view />
    <SessionExpiredModal :showSessionExpiredModal="this.showModal" @modal-closed="handleModalClosed"/>
  </div>
</template>

<script>
import appConfig from "@/app.config";
const { getApiClient } = require('@/helpers/sos-diesel-api-client');
import eventBus from '@/helpers/event-bus/index.js';
import SessionExpiredModal from '@/components/modals/session-expired-modal.vue';

getApiClient(process.env.VUE_APP_SOS_DIESEL_API_BASE_URL);

export default {
  name: "app",
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  created() {
    eventBus.$on('sessionExpired', this.showSessionExpiredModal);
  },
  destroyed() {
    eventBus.$off('sessionExpired', this.showSessionExpiredModal);
  },
  methods: {
    showSessionExpiredModal() {
      this.showModal = true;
    },
    handleModalClosed() {
      this.showModal = false;
    },
  },
  components: {
    SessionExpiredModal,
  },
}
</script>