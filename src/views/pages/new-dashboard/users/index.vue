<script>
import Layout from "@/views/layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import {
  notificationMethods
} from "@/state/helpers";

import EditUserModal from "./edit-user-modal.vue";
import DeleteUserModal from "./delete-user-modal.vue";
import CreateUserModal from "./create-user-modal.vue";

const { getApiClient } = require('@/helpers/sos-diesel-api-client');
const api = getApiClient();

export default {
  page: {
    title: "Administración de usuarios",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader, EditUserModal, DeleteUserModal, CreateUserModal},
  data() {
    return {
      tableData: [],
      title: "Administración de usuarios",
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "Correo",
      sortDesc: false,
      fields: [
        { key: "Correo", sortable: true },
        { key: "Nombre de usuario", sortable: true },
        { key: "Rol", sortable: true },
        { key: "Notas", sortable: true },
        { key: "Estatus", sortable: true },
        { key: "FotoDePerfil", sortable: false },
        { key: "Editar", sortable: false }
      ],
      selectedUser: {},
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
    usersTableData() {
      return this.tableData.map((user) => {
        return {
          Correo: user?.Email,
          "Nombre de usuario": user?.Username,
          Rol: user?.Role,
          Notas: user?.Notes,
          Estatus: user?.Status,
          FotoDePerfil: user?.ProfileImage ? user?.ProfileImage[0].url : '',
        };
      })
    }
  },
  created() {
    api.get('/users/get-all')
      .then(response => { 
      this.tableData = response.map(user => {
        return user?.fields;
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
      this.selectedUser = {
        "Email": item?.Correo,
        "Username": item["Nombre de usuario"],
        "Status": item?.Estatus,
        "Notes": item?.Notas,
        "Role": item?.Rol,
        "ProfileImage": item["FotoDePerfil"],
      };
      if (type === "editUser") {
        this.$bvModal.show('edit-user-modal');
      } else if (type === "deleteUser") {
        this.$bvModal.show('delete-user-modal');
      } else if (type === "createUser") {
        this.$bvModal.show('create-user-modal');
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
      api.get('/users/get-all')
        .then(response => { 
        this.tableData = response.map(user => {
          return user?.fields;
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
              <h4 class="card-title">Usuarios</h4>
              <div>
                <b-button variant="outline-success" class="d-flex justify-center" @click="openModal('createUser', {})">
                  <i class="ri-user-add-fill mr-2"></i>Crear usuario
                </b-button>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Mostrar&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entradas
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Buscar:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Buscar..."
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
                :items="usersTableData"
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
              <template #cell(FotoDePerfil)="row">
                <div class="position-relative mr-2 mb-2" v-if="row.item.FotoDePerfil">
                  <img :src="row.item.FotoDePerfil" class="rounded-circle" style="width: 30px; height: 30px;" @click="showImage(row.item.FotoDePerfil)">
                </div>
              </template>
              <template #cell(Editar)="row">
                <i role="button" class="ri-pencil-line pointer text-success ri-lg mr-3" @click="openModal('editUser', row.item)"></i>
                <i role="button" class="ri-delete-bin-line pointer text-danger ri-lg" @click="openModal('deleteUser', row.item)"></i>
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
            <EditUserModal :user="this.selectedUser" @modalActionTriggered="modalActionTriggered"></EditUserModal>
            <DeleteUserModal :user="this.selectedUser" @modalActionTriggered="modalActionTriggered"></DeleteUserModal>
            <CreateUserModal @modalActionTriggered="modalActionTriggered"></CreateUserModal>
          </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>