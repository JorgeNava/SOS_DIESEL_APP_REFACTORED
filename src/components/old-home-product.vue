<template>
  <div class="home-product p-5">
    <div class="row h-100">
      <div class="col">
        <NavBar class="h-50" :imageUrls="imageUrls"/> 
        <div class="linkNum h-50">
          <img :src="imageUrls.delivery" alt="" class="img_delivery">
          <button class="buttonDelivery">
            <a class="link" :href="'tel:' + '(33) 2255 6677'" >  Linea Directa <br/> (33) 2255 6677 </a>
          </button>
        </div>
      </div>
      <div class="Tractor col">
        <img :src="imageUrl" alt="tractor image" class="img_tractor">
      </div>
      <div class="col d-flex flex-column justify-content-center align-self-center align-items-end">
        <img :src="imageUrls.Kubotalogo" alt="" class="img_Kubotalogo">
        <img :src="imageUrls.yanmarlogo" alt="" class="img_yanmarlogo">
        <img :src="imageUrls.sprinterlogo" alt="" class="img_sprinterlogo">
        <div class="widget">
          <img src="@/assets/images/wWhats.png" alt="WhatsApp" @click="openWhatsApp"/>
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script>
 import NavBar from "@/components/old-navbar.vue"; 

 export default {
  methods: {
    openWhatsApp() {
      const phoneNumber = "XXXXXXXXXX"; // Número de teléfono al que deseas enviar un mensaje por WhatsApp

      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Hola,%20¿cómo%20estás?`;

      window.open(url, "_blank");
  }
},
  name: 'HomeProduct',
  props: {
    msg: String,
    imageUrl: String,
    imageUrls:Object,
  },
  components: { NavBar }
}
</script>

<style scoped>

.widget:hover img{
  animation: jump 0.5s infinite;
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
  height: 100vh;
 }

.linkNum {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* nueva propiedad */
  width: 65%;

}

.link { 
  color: rgb(215, 37, 37); 
  font-size: 1.4rem;
}

.img_delivery {
  width: 50%;
  height: auto;
}

.buttonDelivery {
  font-family: 'Helvetica-SOS';
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
  width: fit-content;
}

.img_tractor{
  width: 146%;
  height: auto;
}

.Tractor{
  display: flex;
  align-items: center;
  justify-content: center;
}

.img_Kubotalogo, .img_sprinterlogo, .img_yanmarlogo {
  flex-direction: column;
  width: 40%;
  height: auto;
  margin-bottom: 2rem;
  
}

.widget img{
  position: absolute;
  width: 10%;
  height: auto;
  left: 75%;
  margin-top: 25%;
  cursor: pointer;
}
</style>