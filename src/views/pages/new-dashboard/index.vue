<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

export default {
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      title: "Panel de Administración",
      items: [
        {
          text: "SOS Diesel"
        },
        {
          text: "Panel de Administración",
          active: true
        }
      ]
    };
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xl-8">
      </div>
      <div class="col-xl-4">
      </div>
    </div>
  </Layout>
</template>