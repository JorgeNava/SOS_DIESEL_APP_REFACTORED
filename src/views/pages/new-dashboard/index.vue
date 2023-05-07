<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import Stat from "./widget";

/**
 * Dashboard component
 */
export default {
  components: {
    Layout,
    PageHeader,
    Stat,
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "SOS Diesel"
        },
        {
          text: "Dashboard",
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
        <Stat />
      </div>
      <div class="col-xl-4">
      </div>
    </div>
  </Layout>
</template>