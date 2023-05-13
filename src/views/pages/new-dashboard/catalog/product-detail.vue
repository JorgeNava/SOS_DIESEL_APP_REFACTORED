<script>
import Layout from "@/views/layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import {
  notificationMethods
} from "@/state/helpers";

import EditProductModal from "./edit-product-modal.vue";
import DeleteProductModal from "./delete-product-modal.vue";
import CreateProductModal from "./create-product-modal.vue";

const { getApiClient } = require('@/helpers/sos-diesel-api-client');
const api = getApiClient();

export default {
  page: {
    title: "Products Table",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader, EditProductModal, DeleteProductModal, CreateProductModal},
  data() {
    return {
      tableData: [],
      title: "Products Management Table",
      items: [
        {
          text: "Tables",
          href: "/"
        },
        {
          text: "Advanced",
          active: true
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "Code",
      sortDesc: false,
      fields: [
        { key: "Code", sortable: true },
        { key: "Name", sortable: true },
        { key: "Brand", sortable: true },
        { key: "Brand", sortable: true },
        { key: "TruckModel", sortable: true },
        { key: "Price", sortable: true },
        { key: "Description", sortable: true },
        { key: "Edit", sortable: false }
      ],
      selectedProduct: {},
      showErrorNotification: false
    };
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.tableData.length;
    },
    productsTableData() {
      return this.tableData; 
    }
  },
  created() {
    api.get('/catalog/get-all-products')
      .then(response => { 
      this.tableData = response.map(product => {
        return product?.fields;
      })
    }).catch(err => {
      this.error(err?.response?.data?.error);
      this.showErrorNotification = true;
      console.error(err);
    });
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    ...notificationMethods,
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    openModal(type, item) {
      this.selectedProduct = item;
      if (type === "editProduct") {
        this.$bvModal.show('edit-product-modal');
      } else if (type === "deleteProduct") {
        this.$bvModal.show('delete-product-modal');
      } else if (type === "createProduct") {
        this.$bvModal.show('create-product-modal');
      }
    },
    makeToast(alertParams) {
      this.$bvToast.toast(alertParams?.text, {
        title: alertParams?.title,
        variant: alertParams?.type,
        solid: true
      });
    },
    modalActionTriggered(alertParams) {
      this.makeToast(alertParams);
      api.get('/catalog/get-all-products')
        .then(response => { 
        this.tableData = response.map(product => {
          return product?.fields;
        })
      }).catch(err => {
        this.error(err?.response?.data?.error);
        this.showErrorNotification = true;
        console.error(err);
      });
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h4 class="card-title">Data Table</h4>
              <div>
                <b-button variant="outline-success" class="d-flex justify-center" @click="openModal('createProduct', {})">
                  <i class="ri-add-fill mr-2"></i>Create Product
                </b-button>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                :items="productsTableData"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
              <template #cell(Edit)="row">
                <i role="button" class="ri-pencil-line pointer text-success ri-lg mr-3" @click="openModal('editProduct', row.item)"></i>
                <i role="button" class="ri-delete-bin-line pointer text-danger ri-lg" @click="openModal('deleteProduct', row.item)"></i>
              </template>
            </b-table>
          </div>
          <div class="row">
            <div class="col">
              <div class="dataTables_paginate paging_simple_numbers float-right">
                <ul class="pagination pagination-rounded mb-0">
                  <!-- pagination -->
                  <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <EditProductModal :product="this.selectedProduct" @modalActionTriggered="modalActionTriggered"></EditProductModal>
            <DeleteProductModal :product="this.selectedProduct" @modalActionTriggered="modalActionTriggered"></DeleteProductModal>
            <CreateProductModal @modalActionTriggered="modalActionTriggered"></CreateProductModal>
          </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>