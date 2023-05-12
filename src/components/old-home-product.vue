<template>
  <div class="row">
      <div class="container-img d-flex justify-content-center align-self-center">
        <img :src="imageUrl" alt="tractor image" class="img_tractor">  
      </div>
  </div>
</template>
 
 <script>
 export default {
   name: 'HomeProduct',
   props: {
     msg: String,
     imageUrl: String 
   },
 }
 </script>
 
 <style scoped>

   /* Media query para pantallas de hasta 768px de ancho (celulares en posición vertical)
   @media only screen and (max-width: 768px) {
     .img_tractor {
       margin-left: 0;
     }
   }*/
 
   /* Media query para pantallas de hasta 1024px de ancho (tablets y celulares en posición horizontal) */
   @media only screen and (max-width: 1024px) {
     .container-img {
       height: auto;
       max-width: 83%;
       margin-top: 32%;
       margin-left: auto;
       margin-right: auto;
     }
     
     .img_tractor {
       max-width: 80%;
       margin-top: 10%;
       margin-left: 5em;
     }
   }
 
   /* Media query para pantallas de más de 1024px de ancho (computadoras de escritorio y laptops) */
   @media only screen and (min-width: 992px) {
     .container-img {
       height: 100%;
     }
     
     .img_tractor {
       max-width: 35%;
       margin-top: 5%;
       margin-left: 10%;
     }
   }
 </style>