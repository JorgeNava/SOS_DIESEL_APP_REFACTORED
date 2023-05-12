<template>
  <div class="home">
    <div class="HomeProduct">
      <NavBar :imageUrls="imageUrls"/> 
      <HomeProduct :imageUrl="imageUrls.imagenTractor"/> 
      <div class="imgMarcas ">
        <img :src="imageUrls.Kubotalogo" alt="" class="img_Kubotalogo">
        <img :src="imageUrls.sprinterlogo" alt="" class="img_sprinterlogo">
        <img :src="imageUrls.yanmarlogo" alt="" class="img_yanmarlogo">
      </div>
    </div>
    <div class="mision" id="mision">
      <div class="container">
        <div class="image" style="width: 260vh;">
          <img src="@/assets/images/old_repo/img_panel_testimonials.jpg" alt="" >
        </div>
        <div class="content">
          <h1 class="mision-y-vision--title">SOS DIESEL PARTS</h1>
          <p class="mision-y-vision--subtitle">MISION Y VISIÓN</p>
          <div class="mision-y-vision--text" >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="fotosRandom">
      <div class="carousel--container">
        <Carousel :slides="carouselImages" />
      </div>
      <router-link to="/ecommerce/Products" class="ver-mas">Ver catálogo</router-link>  
    </div>
    <Footer class="footersillo"/>
  </div>
</template>

<script>
import Footer from "@/components/footer";
import Carousel from "@/components/old-carousel.vue";
import HomeProduct from "@/components/old-home-product.vue";
import NavBar from "@/components/old-navbar.vue"; 
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
  components: { HomeProduct,  NavBar, Carousel, Footer }
};
</script>

<style lang="scss" scoped>
  .HomeProduct {
    height: 100vh;
  }

  .container {
    display: flex;
    justify-content: left; /* centrar horizontalmente */
    align-items: flex-start; /* alinear arriba */
    padding-top: 3.6vh;
  }

  .content {
    text-align: left;
  }

  .image img{
    width: 100%;
    margin-left: -15%;
    margin-top: 11%;
    width: 718px;
  }

  //! TO-DO: CSS REPETIDO
  .mision {
    height: 100vh;
  }

  h1 {
    padding-top: 6%;
  
  }

  .mision {
    height: 100vh;
    background-color: white;
  }

  .mision-y-vision {
    &--title{
      margin-top: 5vh;
      margin-bottom: 2vh;
      font-size: 3.5rem;
      line-height: 1.2;
      font-family: 'Helvetica-SOS';
      font-weight: 800;
      color: #C1272D;
    }
    &--subtitle{
      font-weight: bold;
      font-size: 2.2rem;
      font-family: 'Helvetica-SOS';
      margin-bottom: 2vh;
    }
    &--text{
      word-wrap: break-word;
      font-size: 1.5rem;
      width: 65vh;
    }
  }

  .fotosRandom {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10vh;
  }
  .carousel--container{
    background-image: linear-gradient(180deg, rgba(102,102,102,1) 0%, rgba(255,255,255,0) 100%);
    width: 100%;
  }

  .ver-mas {
    width: fit-content;
    padding: 10px 20px;
    background-color: #C1272D;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    font-size: 1.2rem;
    line-height: 1.2;

    &:hover {
    background-color: rgb(255, 255, 255);
    color: #C1272D;
    border: 1px solid #C1272D;
  }
  }

  .footersillo {
  width: 100%;
  height: 10vh;
  background-color: #C1272D;
}

  .img_Kubotalogo{
    position: absolute;
    right: -35px;
    top: 0;
    height: auto;
    max-width: 12%;
    margin-top: 14%;
    margin-right: 5%;
  }

  .img_sprinterlogo{
    position: absolute;
    right: 35px;
    top: 0;
    max-width: 12%;
    margin-top: 28%;
    margin-right: 2%;
  }

  .img_yanmarlogo{
    position: absolute;
    right: -35px;
    top: 1vh;
    max-width: 12%;
    margin-top: 17%;
    margin-right: 5%;
  }
</style>