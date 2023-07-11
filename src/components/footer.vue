<template>
  <b-container fluid class="footersillo">
    <b-row class="p-3">
      <b-col cols="12" lg="3" class="d-flex justify-content-center align-self-center pb-4 pb-lg-0">
        <img src="@/assets/images/logo-light.png" alt="SOS Diesel" class="w-50">
      </b-col>
      <b-col cols="12" lg="6" class="text-center d-flex justify-content-center align-items-center">
        <p>Río Nilo 1067 B Col, Quinta Velarde, 44430 Guadalajara, Jal.</p>
      </b-col>
      <b-col cols="12" lg="3" class="text-center d-flex justify-content-center align-items-center align-items-lg-right">
        <p>(33) 3635 7004</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss" scoped>
  p {
    font-family: 'Helvetica-SOS';
    font-size: 1.2rem;
    color: white;
    padding: 0;
    margin: 0;
  }
  /* Estilos del footer */
  .footersillo {
    background-color: #c1272d;
    width: 100%;
    padding-bottom: 1rem;
  }
</style>