<template>
  <v-carousel cycle hide-delimiters show-arrows="hover" >
    <v-carousel-item class="w-100" v-for="(slide, i) in slides" :key="i" color="gray">
      <v-sheet class="carousel--sheet w-100 h-100">
        <v-card class="d-flex justify-center text-left h-75 carousel--card w-100">
          <div class="w-25 h-100">
            <v-card-item>
              <v-card-subtitle>{{ slide.marca }}</v-card-subtitle>
              <v-card-title>{{slide.code}}</v-card-title>
            </v-card-item>
            <v-card-text class="d-flex flex-column justify-space-between h-50">
              <p>{{ slide.description }}</p>
              <p class="mt-10">{{ slide.price }}</p>
            </v-card-text>
          </div>
          <div class="product--image--container">
            <img :src="slide.imageUrl" :alt="slide.description"/>
          </div>
        </v-card>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'CarouselComponent',
  data() {
    return {
      slides: [
        {imageUrl: require('@/assets/images/old_repo/img1.png'), description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.', price: '$10', marca: 'ejemploMarca', code: 'Numero de parte: #001'},
        {imageUrl: require('@/assets/images/old_repo/img2.png'), description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.', price: '$20', marca: 'ejemploMarca', code: 'Numero de parte: #002'},
        {imageUrl: require('@/assets/images/old_repo/img3.png'), description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.', price: '$30', marca: 'ejemploMarca', code: 'Numero de parte: #003'},
        {imageUrl: require('@/assets/images/old_repo/img4.png'), description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.', price: '$40', marca: 'ejemploMarca', code: 'Numero de parte: #004'},
        {imageUrl: require('@/assets/images/old_repo/img5.png'), description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut tellus vitae nibh tristique vestibulum. Sed facilisis ipsum nec metus placerat, eget aliquet lectus blandit.', price: '$50', marca: 'ejemploMarca', code: 'Numero de parte: #005'},
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel--sheet{
  display: flex;
  align-items: center;
}

.carousel--card{
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 1%;
}
.product--image--container{
  padding-left: 2vw;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }
}

</style>