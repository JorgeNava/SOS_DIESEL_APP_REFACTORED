<template> 
  <div>
    <b-container class="d-flex flex-column align-items-center p-0">
      <b-row no-gutters>
        <b-col class="d-flex justify-content-center">
          <img :src="imageUrls.logosos" alt="" class="nav--bar--logo">
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col id="nav--bar--items" class="d-flex flex-column align-items-center">
          <router-link to="/productos">Productos</router-link>
          <a href="#mision" @click.prevent="scrollToMissionSection">Quienes Somos</a>
          <button @click="mostrarFormulario">Contacto</button>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid id="contact--modal--id" class="contact--modal">
      <b-row>
        <b-col cols="10" lg="3" class="modal--body">
          <div class="close-button" @click="cerrarFormulario">X</div>
          <div class="formContainer" :class="{ 'show-form': mostrarVentana }">
            <form ref="form" @submit.prevent="sendEmail">
              <h2>Contacto</h2>
              <label for="nombre">Nombre:</label>
              <input v-model="nombre" type="text" id="nombre" name="nombre" placeholder="Tu nombre aquí" required>
              <label for="email">Email:</label>
              <input v-model="email" type="email" id="email" name="email" placeholder="Tu email aquí" required>
              <label for="telefono">Teléfono:</label>
              <input v-model="telefono" type="tel" id="telefono" name="telefono" placeholder="Tu teléfono aquí">
              <label for="mensaje">Mensaje:</label>
              <textarea v-model="mensaje" id="mensaje" name="mensaje" placeholder="Tu mensaje aquí" required></textarea>
              <button type="submit" :class="{ 'animate-button': mostrarAnimacion }" @click="cerrarFormulario"><span v-if="!mostrarAnimacion">Enviar</span>
                <span v-else>
                  <i class="fas fa-check"></i>
                </span>
              </button>
            </form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import emailjs from '@emailjs/browser';

export default {
  name: 'NavBar',
  props: {
    msg: String,
    imageUrls: Object
  },
  data() {
    return {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
      mostrarVentana: false,
      mostrarAnimacion: false
    };
  },
  mounted() {
    document.addEventListener('click', this.cerrarFormulario);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.cerrarFormulario);
  },
  methods: {
    sendEmail() {
      emailjs.sendForm('service_9jw6mqj', 'template_y5lwc75', this.$refs.form,  'IUf6cjv3YTCcMHrAY')
        .then((result) => {
            console.log('SUCCESS!', result.text);
        }, (error) => {
            console.log('FAILED...', error.text);
        });
        this.mostrarAnimacion = true;
        setTimeout(() => {
          this.mostrarAnimacion = false;
          this.cerrarModal();
        }, 
      1000);
    },
    mostrarFormulario() {
      var ventana = document.getElementById('contact--modal--id');
      ventana.style.display = 'block';
      this.mostrarVentana = true;
    },
    cerrarFormulario(event) {
      var ventana = document.getElementById('contact--modal--id');
      var formulario = document.querySelector('.formContainer');
      if (!formulario.contains(event.target) && ventana.contains(event.target)) {
        ventana.classList.add('ventana-cerrada');
        this.mostrarVentana = false;
        ventana.style.display = 'none';
      }
    },
    cerrarModal() {
      const ventana = document.getElementById('contact--modal--id');
      ventana.classList.add('ventana-cerrada');
      this.mostrarVentana = false;

      setTimeout(() => {
        ventana.style.display = 'none';
        ventana.classList.remove('ventana-cerrada');
        this.nombre = '';
        this.email = '';
        this.telefono = '';
        this.mensaje = '';
        this.mostrarAnimacion = false;
      }, 500); // Espera 500ms antes de ocultar el modal y restablecer los valores
    },
    scrollToMissionSection() {
      const missionSection = document.querySelector('#mision');
      missionSection.scrollIntoView({ behavior: 'smooth' });
    }
  },
  created(){
    document.addEventListener('click', this.cerrarFormulario);
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 67%;
  }
  .row {
    width: 100%;
  }
  .nav--bar--logo{
    width: inherit;
  }

  #nav--bar--items{
    font-family:'Helvetica-SOS';
    
    & > * {
      width: 100%;
      border: none;
      margin-top: 1%;
      cursor: pointer;
      font-size: 1.2rem;
      text-align: center;
      color: rgb(215, 37, 37);
      background-color: transparent;

      &:hover {
        background-color: rgb(186, 48, 48);
        border-color: white;
        color: white;
      }

      @media (min-width: 420px) {
        & {
          font-size: 1.6rem;
        }
      }
    }
  }

  .contact--modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
  }

  .modal--body {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 75%;
    overflow-y: auto;
    opacity: 1;
    display: inline-block;
    padding: 1% 3%;
    transform: translate(-50%, -50%) scale(1);
    background-color: rgba(100, 9, 9, 0.8);
  }

  .iframe-animation {
    animation: openIframe 0.5s ease-in-out forwards;
  }

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

  .animate-button {
    animation-name: button-click-animation;
    animation-duration: 1s;
  }

  @keyframes button-click-animation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  
  h2 {
    color: white;
    font-size: 55px;
    text-align: center;
  }
  
  label {
    text-align: center;
    display: block;
    margin-bottom: .5em;
    font-size: 20px;
    color: #de4b4b;
  }
  
  input,
  textarea {
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
    top: 10px;
    right: 25px;
    font-size: 1.2em;
    cursor: pointer;
  }
</style>