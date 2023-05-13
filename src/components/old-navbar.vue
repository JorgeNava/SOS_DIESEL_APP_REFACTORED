<template> 
  <div class="d-flex justify-center flex-column">
    <img :src="imageUrls.logosos" alt="" class="img_logosos">
    <div>
      <router-link to="/ecommerce/Products" class="button-top">Productos</router-link>
      <a href="#mision" class="button" @click.prevent="scrollToMissionSection">Quienes Somos</a>
      <router-link to="/contacto" class="button-bottom">Contacto</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    msg: String,
    imageUrls: Object
  },
  methods: {
    scrollToMissionSection() {
      const missionSection = document.querySelector('#mision');
      missionSection.scrollIntoView({ behavior: 'smooth' });
    }
  },
  created(){
    console.log("this.imageUrls",this.imageUrls)
  }
}
</script>

<style lang="scss" scoped>

  .img_logosos{
    width: 54%; 
    height: auto; 
  }
 

  .button {
    font-family:'Helvetica-SOS';
    font-weight: bold;
    font-size: 1.8vw;
    text-align: center;
    width: 55%;
    display: inline-block;
    background-color: transparent;
    color: rgb(215, 37, 37);
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .button-top {
    //! TO-DO: CLASES CSS COMUNES
    font-family:'Helvetica-SOS';
    width: 55%;
    font-weight: bold;
    font-size: 1.8vw;
    text-align: center;
    display: inline-block;
    background-color: transparent;
    color: rgb(215, 37, 37);
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .button-bottom {
    font-family:'Helvetica-SOS';
    width: 55%;
    font-weight: bold;
    text-align: center;
    font-size: 1.8vw;
    display: inline-block;
    background-color: transparent;
    color: rgb(215, 37, 37);
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .button, .button-top, .button-bottom {
  margin-top: 1%;

}
  
  /* Estilo para cuando el mouse pasa sobre el botón */
  .button:hover {
    background-color: rgb(186, 48, 48);
    color: white;
  }

  /* Estilo para el margen rojo */
  .button:hover {
    border-color: white;
  }

  /* Estilo para cuando el mouse pasa sobre el botón */
  .button-top:hover {
    background-color: rgb(186, 48, 48);
    color: white;
  }

  /* Estilo para el margen rojo */
  .button-top:hover {
    border-color: white;
  }

  /* Estilo para cuando el mouse pasa sobre el botón */
  .button-bottom:hover {
    background-color: rgb(186, 48, 48);
    color: white;
  }

  /* Estilo para el margen rojo */
  .button-bottom:hover {
    border-color: white;
  }

</style>