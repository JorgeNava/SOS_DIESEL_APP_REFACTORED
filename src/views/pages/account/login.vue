<script>
import { required, email } from "vuelidate/lib/validators";

import {
  authMethods,
  notificationMethods
} from "@/state/helpers";

export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      showErrorNotification: false
    };
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    }
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  validations: {
    email: { required, email },
    password: { required }
  },
  methods: {
    ...authMethods,
    ...notificationMethods,
    tryToLogIn() {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        this.tryingToLogIn = true;
        this.authError = null;
        this.showErrorNotification = false;

        return (
          this.logIn({
            email: this.email,
            password: this.password
          })
          // eslint-disable-next-line no-unused-vars
          .then(token => {
            this.tryingToLogIn = false;
            this.isAuthError = false;
            this.$root.startJwtTimer();
            // Redirect to the originally requested page, or to the home page
            this.$router.push(
              this.$route.query.redirectFrom || { name: "panel-de-administracion-productos" }
            );
          })
          .catch(error => {
            this.tryingToLogIn = false;
            this.authError = error ? error?.response?.data?.error : "";
            this.isAuthError = true;
            this.showErrorNotification = true;
          })
        );
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      <a href="/">
        <i class="mdi mdi-home-variant h2 text-white"></i>
      </a>
    </div>
    <div>
      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col-lg-4">
            <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <div>
                      <div class="text-center">
                        <div>
                          <a href="/" class="logo">
                            <img src="@/assets/images/logo-dark.png" height="80" alt="logo" />
                          </a>
                        </div>

                        <h4 class="font-size-18 mt-4">Bienvendo de nuevo!</h4>
                        <p class="text-muted">Inicia sesión para entrar al panel de administración de SOS Diesel.</p>
                      </div>

                      <b-alert
                        variant="danger"
                        class="mt-3"
                        v-if="showErrorNotification"
                        show
                        dismissible
                      >{{notification.message}}</b-alert>

                      <div class="p-2 mt-5">
                        <form class="form-horizontal" @submit.prevent="tryToLogIn">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label for="email">Correo</label>
                            <input
                              type="email"
                              v-model="email"
                              class="form-control"
                              id="email"
                              placeholder="Ingrese correo"
                              :class="{ 'is-invalid': submitted && $v.email.$error }"
                            />
                            <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                              <span v-if="!$v.email.required">El correo es requerido.</span>
                              <span v-if="!$v.email.email">Favor de ingresar un correo valido.</span>
                            </div>
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-lock-2-line auti-custom-input-icon"></i>
                            <label for="userpassword">Contraseña</label>
                            <input
                              v-model="password"
                              type="password"
                              class="form-control"
                              id="userpassword"
                              placeholder="Ingrese contraseña"
                              :class="{ 'is-invalid': submitted && $v.password.$error }"
                            />
                            <div
                              v-if="submitted && !$v.password.required"
                              class="invalid-feedback"
                            >La contraseña es requerida.</div>
                          </div>

                          <div class="mt-4 text-center">
                            <button
                              class="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >Iniciar sesión</button>
                          </div>

                          <div class="mt-4 text-center">
                            <router-link tag="a" to="/pages/coming-soon" class="text-muted">
                              <i class="mdi mdi-lock mr-1"></i>¿Olvidaste tu contraseña?
                            </router-link>
                          </div>
                        </form>
                      </div>

                      <div class="mt-5 text-center">
                        <p>
                          © 2023 SOS Diesel. Crafted with
                          <i class="mdi mdi-heart text-danger"></i> by DigitalTransformation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="authentication-bg">
              <div class="bg-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>