<template>
  <div class="home">
    <Navbar></Navbar> <!-- TO add navbar to my project -->
    <Hero></Hero>
    <Products></Products>
    <div class="container h-100">
      <div class="row p-5 h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <img src="/img/svg/product.svg" alt="" width="400">
        </div>
        <div class="col-md-6">
          <h3>Learn More About us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
          </p>
            <button class="btn custom-btn btn-outline-primary mr-4">Browse Products</button>
        </div>
      </div>
    </div>
    <login></login>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Hero from '@/components/Hero.vue' //add header in home page
import Products from '@/sections/Products.vue' //add product view in home page
import Login from '@/components/Login.vue' //add login view in home page


export default {
  name: 'Home',
  components: {
    Hero, Products, Login
  }
}
</script>
