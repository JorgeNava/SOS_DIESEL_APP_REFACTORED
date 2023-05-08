<template>
  <div>
    <div class="containerPhotos">
      <img :src="imageUrls.logosos" alt="" class="img_logosos">
      <div class="imgMarcas">
        <img :src="imageUrls.Kubotalogo" alt="" class="img_Kubotalogo">
        <img :src="imageUrls.sprinterlogo" alt="" class="img_sprinterlogo">
        <img :src="imageUrls.yanmarlogo" alt="" class="img_yanmarlogo">
      </div>
      <div class="linkNum">
        <img :src="imageUrls.delivery" alt="" class="img_delivery">
        <button style="color:red;" class="buttonDelivery">
          <a class="link" :href="'tel:' + '(33) 2255 6677'"  style="text-decoration:none"> Linea Directa (33) 2255 6677 </a>
        </button>
    </div>
    </div>
  
    <div class="containerButtons">
      <router-link to="/productos" class="button-top">Productos</router-link>
      <router-link to="/quienes-somos" class="button" >Quienes Somos </router-link>
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
  created(){
    console.log("this.imageUrls",this.imageUrls)
  }
    /*data() {
        return {
        };
    },*/
  
}
</script>

<style lang="scss" scoped>
  .img_logosos{
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 17%; 
    height: auto; 
    padding-top: 4%;
    //! TO-DO: DIFERENCIA SOBRE EL USO DE MARGIN Y PADDING
    margin-left: 5%; 
  }

  .img_Kubotalogo{
    position: absolute;
    right: -35px;
    top: 0;
    height: auto;
    max-width: 12%;
    padding-top: 16%;
    padding-right: 2%;
  }

  .img_sprinterlogo{
    position: absolute;
    right: -35px;
    top: 0;
    max-width: 12%;
    padding-top: 33%;
    padding-right: 2%;
  }

  .img_yanmarlogo{
    position: absolute;
    right: -35px;
    top: 0;
    max-width: 12%;
    padding-top: 22%;
    padding-right: 2%;
  }

  .img_delivery{
    position: relative; 
    bottom: 36vh; 
    right: 9vh; 
    width: 15%; 
    height: auto;  
    padding-left: 6%; 
  }
 

  .button {
    font-family:'Helvetica-SOS';
    font-weight: bold;
    font-size: 1.8vw;
    text-align: center;
    position: absolute;
    top: 28%;
    left: 5%;
    width: 17%;
    //TO-DO: MUCHAS COSAS PASANDO EN EL CSS
    //margin-left: 1vw;
    //margin-right: 30vw;
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
    width: 17%;
    font-weight: bold;
    font-size: 1.8vw;
    position: absolute;
    text-align: center;
    top: 22%;
    left: 5%;
    display: inline-block;
    background-color: transparent;
    color: rgb(215, 37, 37);
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .button-bottom {
    font-family:'Helvetica-SOS';
    width: 17%;
    font-weight: bold;
    text-align: center;
    font-size: 1.8vw;
    position: absolute;
    top: 25%;
    left: 5%;
    display: inline-block;
    margin-top: 5vw;
    background-color: transparent;
    color: rgb(215, 37, 37);
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .buttonDelivery {
    font-family:'Helvetica-SOS';
    display: inline-block;
    width: 14vw;
    position: relative;
    right: 34vh;
    bottom: 24vh;
    font-weight: bold;
    border: none;
    background-color: transparent;
    margin-left: 3%;
    font-size: 3vh;
    cursor: pointer;
    text-decoration: none;
  }


  .linkNum{
    position: relative;
    display: flex;
    width: 90%;
    left: 9%;
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

  .link { 
    color: rgb(215, 37, 37); 
  }

  .imgMarcas {
    position: relative;
    width: 100%;
    bottom: 100vh;
    right: 7vh;
  }
</style>
