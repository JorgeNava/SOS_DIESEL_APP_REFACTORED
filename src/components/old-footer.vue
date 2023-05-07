<template>
  <div class="footer--container">
    <v-row no-gutters class="h-100">
      <v-col cols="4" id="logo--container" class="h-100 d-flex justify-content-center align-items-center">
          <v-img
            class="logo--image"
            :src="logoImageUrl"
          ></v-img>
      </v-col>
      <v-col cols="4" class="d-flex justify-center align-center">
        <p class="address">Río Nilo 1067 B Col, Quinta Velarde, 44430 Guadalajara, Jal.</p>
      </v-col>
      <v-col cols="4" class="pt-5">
        <a class="phone--number" :href="'tel:' + '(33) 33 3635 7004'"  style="text-decoration:none">(33) 3635 7004</a>      </v-col>
    </v-row>
  </div>
</template>

<script>
import LOGO from '@/assets/logo-white.png';

export default {
  name: 'FooterComponent',
  data() {
    return {
      logoImageUrl: LOGO
    }
  }
};
</script>
<style lang="scss" scoped>
  .footer--container{
    background-color: #C1272D;
    font-family: 'Helvetica-SOS';
    color: white;
    font-size: 1.15rem;
    .phone--number{
      color: white !important;
      text-decoration: none;
    }
  }
  .address{
    height: fit-content;
  }
  #logo--container{
    padding: 3vh 10vw;
  }
</style>