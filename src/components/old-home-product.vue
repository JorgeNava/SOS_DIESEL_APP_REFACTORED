<template>
  <b-container fluid>
    <b-row class="home-product p-3">
      <b-col lg="4" class="d-flex flex-column align-items-center justify-content-between mt-lg-0">
        <NavBar :imageUrls="imageUrls"/> 
        <div class="w-100 d-flex flex-column justify-content-end align-items-center mt-4">
          <div class="link--num d-flex flex-column justify-content-end align-items-center">
            <img :src="imageUrls.delivery" alt="" class="w-50">
            <button class="button--delivery mb-sm-5">
              <a class="direct--line--link" :href="'tel:' + '(33) 2255 6677'" >  Linea Directa <br/> (33) 2255 6677 </a>
            </button>
          </div>
        </div>
      </b-col>
      <b-col lg="4" class="mt-lg-0 d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-center align-items-center">
          <img :src="imageUrl" alt="tractor image" class="w-100">
        </div>
      </b-col>
      <b-col lg="4" class="mt-lg-0">
        <div class="h-100 d-flex flex-column justify-content-center align-items-center align-items-sm-end mt-lg-0 mt-3">
          <img :src="imageUrls.Kubotalogo" alt="" class="img_Kubotalogo">
          <img :src="imageUrls.yanmarlogo" alt="" class="img_yanmarlogo">
          <img :src="imageUrls.sprinterlogo" alt="" class="img_sprinterlogo">
          <div class="widget">
            <img src="@/assets/images/WhatsAppButtonWhiteSmall.png" :class="getImageSizeClass" alt="WhatsApp" @click="openWhatsApp"/>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import NavBar from "@/components/old-navbar.vue"; 

  export default {
  name: 'HomeProduct',
  props: {
    msg: String,
    imageUrl: String,
    imageUrls:Object,
  },
  methods: {
    openWhatsApp() {
      const phoneNumber = "XXXXXXXXXX"; // Número de teléfono al que deseas enviar un mensaje por WhatsApp

      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Hola,%20¿cómo%20estás?`;

      window.open(url, "_blank");
    },
  },
  computed: {
    getImageSizeClass() {
      if (window.innerWidth < 576) {
        return 'w-50';
      } else {
        return '';
      }
    },
  },
  components: { NavBar }
}
</script>

<style lang="scss" scoped>
  .widget {
    img{
      position: fixed;
      right: 3rem;
      bottom: 12vh;
      cursor: pointer;
      border-radius: 30px;
      z-index: 1;
    }
    &:hover{
      img {
        animation: jump 0.5s infinite;
      }
    }
    }

  @keyframes jump {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .home-product{
    min-height: 100vh;

    & > * {
      margin-top: 5vh;
    }
  }

  .link--num {
    width: 65%;
  }

  .direct--line--link { 
    color: rgb(215, 37, 37); 
    font-size: 1rem;
  }

  .button--delivery {
    font-family: 'Helvetica-SOS';
    border: none;
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
    width: fit-content;
  }

  .img_Kubotalogo, .img_sprinterlogo, .img_yanmarlogo {
    flex-direction: column;
    width: 45%;
    height: auto;
    margin-bottom: 2rem;
    
}

</style>