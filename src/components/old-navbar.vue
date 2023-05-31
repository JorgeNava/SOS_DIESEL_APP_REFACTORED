<template> 
  <div class="d-flex justify-center flex-column">
    <img :src="imageUrls.logosos" alt="" class="img_logosos">
    <div>
      <router-link to="/ecommerce/products" class="button-top">Productos</router-link>
      <a href="#mision" class="button" @click.prevent="scrollToMissionSection">Quienes Somos</a>
      <button class="button-bottom" @click="mostrarFormulario">Contacto</button>
      <div id="ventanaEmergente" class="ventana-emergente">
        <div class="contenido-ventana">
          <div class="close-button" @click="cerrarFormulario">X</div>
          <div class="formContainer" :class="{ 'show-form': mostrarVentana }">
            <form :class="{'iframe-animation': mostrarVentana}" action="https://formspree.io/f/xyyalodo" method="post">
              <h2>Contacto</h2>
              <label for="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre aquí" required>
          
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Tu email aquí" required>

              <label for="telefono">Teléfono:</label>
              <input type="tel" id="telefono" name="telefono" placeholder="Tu teléfono aquí">
          
              <label for="mensaje">Mensaje:</label>
              <textarea id="mensaje" name="mensaje" placeholder="Tu mensaje aquí" required></textarea>
          
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>
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
  data() {
    return {
      mostrarVentana: false,
    };
  },
  mounted() {
    document.addEventListener('click', this.cerrarFormulario);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.cerrarFormulario);
  },
  methods: {
    mostrarFormulario() {
      var ventana = document.getElementById('ventanaEmergente');
      ventana.style.display = 'block';
      this.mostrarVentana = true;
    },
    cerrarFormulario(event) {
      var ventana = document.getElementById('ventanaEmergente');
      var formulario = document.querySelector('.formContainer');
      if (!formulario.contains(event.target) && ventana.contains(event.target)) {
        ventana.classList.add('ventana-cerrada');
        this.mostrarVentana = false;
        ventana.style.display = 'none';
      }
    },
    scrollToMissionSection() {
      const missionSection = document.querySelector('#mision');
      missionSection.scrollIntoView({ behavior: 'smooth' });
    }
  },
  created(){
    console.log("this.imageUrls",this.imageUrls)
    document.addEventListener('click', this.cerrarFormulario);
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
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: transparent;
    border: none;
    cursor: pointer;
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

  /*.formContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }*/


  .ventana-emergente {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
  }


  .contenido-ventana {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    background-color: rgba(100, 9, 9, 0.8);
    padding: 20px;
    width: 20vw;
    height: 75vh;
    opacity: 1;
  }

  .iframe-animation {
    animation: openIframe 0.5s ease-in-out forwards;
  }

  /*@keyframes openIframe {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }*/

  @keyframes openIframe {
    0% {
      opacity: 0;
      transform: scale(0.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  h2 {
    color: white;
    font-family: Helvetica-SOS;
    font-size: 55px;
    text-align: center;
  }
  
  label {
    font-family: Helvetica-SOS;
    text-align: center;
    display: block;
    margin-bottom: .5em;
    font-size: 20px;
    color: #de4b4b;
  }
  
  input,
  textarea {
    font-family: Helvetica-SOS;
    width: 100%;
    padding: 9.8px;
    border: none;
    border-bottom: 2px solid #ccc;
    font-size: 16px;
    margin-bottom: 1.5em;
  }
  
  textarea {
    height: 100px;
    resize: none;
  }
  
  button[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.5em;
    width: 100%;
    margin-top: 1em;
  }

  button[type="submit"]:hover {
    background-color: #3d8d40; /* Cambia el color de fondo cuando se hace hover */
  }

.close-button {
  position: absolute;
  color: rgb(148, 108, 108);
  font-family: Helvetica-SOS;
  top: 10px;
  right: 25px;
  font-size: 1.2em;
  cursor: pointer;
}
</style>