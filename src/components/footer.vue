<template>
  <footer class="footersillo">
    <div class="container-fluid d-flex ">
      <div class="row">
        <div class="col-md-3 mb-2 d-flex justify-content-center align-self-center">
          <img src="@/assets/images/logo-light.png" alt="2020" class="logo--image">
        </div>
        <div class="col-md-6 text-center d-flex justify-content-center align-items-center">
          <div class="medio">Río Nilo 1067 B Col, Quinta Velarde, 44430 Guadalajara, Jal.</div>
        </div>
        <div class="col-md-3 text-right d-flex justify-content-center align-items-start">
          <div class="derecha">(33) 3635 7004</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footersillo{
  padding: 1vh;
}
  .logo--image {
    height: 70%;
    margin-top: 4%;
    margin-left: 60%;
    width: 25%;
  }

  .medio {
    color: white;
    font-family: 'Helvetica-SOS';
    font-size: 1.2rem;
    margin-top: 2%;
  }

  .derecha{
    color: white;
    font-family: 'Helvetica-SOS';
    font-size: 1.2rem;
    margin-top: 4%;
    margin-right: 45%;
  }
</style>