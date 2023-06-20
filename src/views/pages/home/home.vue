<template>
    <b-container fluid>
      <b-row class="home p-3">
        <HomeProduct :imageUrl="imageUrls.imagenTractor" :imageUrls="imageUrls"/> 
      </b-row>
      <b-row class="mision mt-5  mb-5 mb-lg-0" id="mision">
        <b-col cols="12" lg="6" order="2" order-lg="1" class="image w-50 d-flex justify-content-end  pr-4 mb-3 mb-lg-0">
          <img src="@/assets/images/old_repo/img_panel_testimonials.jpg" alt="" >
        </b-col>
        <b-col  order="1" order-lg="2"  class="content w-50 d-flex flex-column justify-content-start p-3">
          <h1 class="mision-y-vision--title m-0 ">SOS DIESEL PARTS</h1>
          <p class="mision-y-vision--subtitle mb-3 ">MISION Y VISIÓN</p>
          <div class="mision-y-vision--text" >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.</p>
          </div>
        </b-col>
      </b-row>
      <b-row class="d-flex justify-content-center align-items-center mb-5 mt-5">
        <Carousel :slides="carouselImages" /> 
      </b-row>
      <b-row class="d-flex justify-content-center align-items-center mb-5">
        <router-link to="/productos" class="ver-mas">Ver catálogo</router-link>
      </b-row>
      <b-row>
        <Footer class="footersillo"></Footer>
      </b-row>
    </b-container>
</template>

<script>
import Footer from "@/components/footer";
import Carousel from "@/components/old-carousel.vue";
import HomeProduct from "@/components/old-home-product.vue";
import IMAGEN_TRACTOR from "@/assets/images/old_repo/tractor.png";
import LOGOSOS from "@/assets/images/old_repo/logosos.png";
import KUBOTALOGO from "@/assets/images/old_repo/kubotalogo.png";
import SPRINTERLOGO from "@/assets/images/old_repo/sprinterlogo.png";
import YANMARLOGO from "@/assets/images/old_repo/yanmarlogo.png";
import DELIVERY from "@/assets/images/old_repo/delivery.png";
import IMG1 from '@/assets/images/old_repo/img1.png';
import IMG2 from '@/assets/images/old_repo/img2.png';
import IMG3 from '@/assets/images/old_repo/img3.png';
import IMG4 from '@/assets/images/old_repo/img4.png';
import IMG5 from '@/assets/images/old_repo/img5.png';
import IMG6 from '@/assets/images/old_repo/img6.png';
import IMG7 from '@/assets/images/old_repo/img7.png';
import IMG8 from '@/assets/images/old_repo/img8.png';
import IMG9 from '@/assets/images/old_repo/img9.png';
import IMG10 from '@/assets/images/old_repo/img10.png';
import IMG11 from '@/assets/images/old_repo/img11.png';
import IMG12 from '@/assets/images/old_repo/img12.png';
import IMG13 from '@/assets/images/old_repo/img13.png';
import IMG14 from '@/assets/images/old_repo/img14.png';
import IMG15 from '@/assets/images/old_repo/img15.png';
import IMG16 from '@/assets/images/old_repo/img16.png';
import IMG17 from '@/assets/images/old_repo/img17.png';
import IMG18 from '@/assets/images/old_repo/img18.png';
import IMG19 from '@/assets/images/old_repo/img19.png';
import IMG20 from '@/assets/images/old_repo/img20.png';
import IMG21 from '@/assets/images/old_repo/img21.png';
import IMG22 from '@/assets/images/old_repo/img22.png';
import IMG23 from '@/assets/images/old_repo/img23.png';
import IMG24 from '@/assets/images/old_repo/img24.png';
import IMG25 from '@/assets/images/old_repo/img25.png';
import IMG26 from '@/assets/images/old_repo/img26.png';
import IMG27 from '@/assets/images/old_repo/img27.png';
import IMG28 from '@/assets/images/old_repo/img28.png';
import IMG29 from '@/assets/images/old_repo/img29.png';
import IMG30 from '@/assets/images/old_repo/img30.png';

export default {
  name: "HomeView",
  data() {
    return {
      imageUrls: {
        imagenTractor: IMAGEN_TRACTOR,
        logosos: LOGOSOS,
        Kubotalogo: KUBOTALOGO,
        sprinterlogo: SPRINTERLOGO,
        yanmarlogo: YANMARLOGO,
        delivery: DELIVERY,
        img1: IMG1,
        img2: IMG2,
        img3: IMG3,
        img4: IMG4,
        img5: IMG5,
        img6: IMG6,
        img7: IMG7,
        img8: IMG8,
        img9: IMG9,
        img10: IMG10,
        img11: IMG11,
        img12: IMG12,
        img13: IMG13,
        img14: IMG14,
        img15: IMG15,
        img16: IMG16,
        img17: IMG17,
        img18: IMG18,
        img19: IMG19,
        IMG20: IMG20,
        img21: IMG21,
        img22: IMG22,
        img23: IMG23,
        img24: IMG24,
        img25: IMG25,
        img26: IMG26,
        img27: IMG27,
        img28: IMG28,
        img29: IMG29,
        img30: IMG30
      },
      carouselImages: [],
      viewMoreUrl: "/productos"
    };
  },
  components: { HomeProduct, Carousel, Footer }
};
</script>

<style lang="scss" scoped>
.home {
  background-color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que el contenido no se superponga al hacer scroll */
}

.mision {
  display: flex;
  max-width: 75%; /* Permite que la sección se reduzca si el espacio disponible es menor */
  padding: 1% 5%;
  height: fit-content;
  margin: auto;
  background-color: white;
}

.image {
  width: 50%;
  margin: 0;
  flex-shrink: 0; /* Evita que la imagen se reduzca más de lo necesario */
  img {
    width: 90%;
    height: 98%;
  }
}



  //! TO-DO: CSS REPETIDO

  h1 {
    padding-top: 6%;
  
  }

  .mision-y-vision {
    &--title{
      font-size: 1.8rem;
      font-family: 'Helvetica-SOS';
      color: #C1272D;
    }
    &--subtitle{
      font-size: 1.5rem;
      font-family: 'Helvetica-SOS';
    }
    &--text{
      word-wrap: break-word;
      font-size: .9rem;
    }
  }

 
  .footersillo {
    width: 100%;
    background-color: #C1272D;
}

.carousel--container {
  background: linear-gradient(to bottom, white, gray);
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.ver-mas-container {
  margin-bottom: 20px;
  margin-top: 13px;
}
.ver-mas {
    display: inline-block;
    font-family: 'Helvetica-SOS';
    padding: 12px 20px;
    border: 1px solid transparent;
    background-color: #C1272D;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    font-size: 1.2rem;

    &:hover{
      background-color: rgb(255, 255, 255);
      color: #C1272D;
      border: 1px solid #C1272D;
    }
  }
</style>