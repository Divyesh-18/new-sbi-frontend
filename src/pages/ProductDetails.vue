<template>
  <!-- <link rel="stylesheet" :href="'/css/product-details.css'" /> -->

  <div class="product-details-main">
    <div class="product">
      <nav class="top_nav">
        <div class="left">
          <a class="goBack" v-on:click="router.go(-1)">
            <img :src="'/images/left.png'" />
          </a>
          <span>Product</span>
        </div>
      </nav>
      <div class="product_info">
        <swiper :pagination="{
          dynamicBullets: true,
        }" :modules="modules" class="mySwiper"  :grabCursor="grabCursor"
    :effect="effect"
    :loop="loop"
    :centeredSlides=true
    :autoplay="autoplay">
          <swiper-slide v-for="(item, index) in productData.product_images" :key="index">
            <img :src="item.url" alt="image" class="image" />
          </swiper-slide>
        </swiper>
        <p class="info">{{ productData.name }}</p>
        <p class="price">₹ {{ productData.price }}</p>
        <div class="goshop_btn">
          <button class="disabled_btn">Sold Out</button>
        </div>
      </div>
      <div class="table_info">
        <table>
          <thead>
            <tr>
              <th>Product Specifications</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in productData.features" :key="index">
              <td>{{ item.title }}</td>
              <td>{{ item.feature }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <Footer />
  <PageReload />
</template>

<script>
import axios from 'axios';
import Footer from "../components/CommonFooter.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import PageReload from "../components/PageReload.vue";

import SwiperCore, {
  Autoplay
} from 'swiper/core';

SwiperCore.use([Autoplay]);

export default {
  components: {
    Footer,
    Swiper,
    SwiperSlide,
    PageReload
  },
  props: {
    toggleLoader: { type: Function },
  },
  setup() {
    // useMeta({ title: "Product Details" });
    const router = useRouter();
    const productData = ref({});

    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    }

    if (router.currentRoute._value.query.goodsId === undefined) {
      router.push("/");
    }

    const getProductData = async () => {
      axios
        .get(
          "/get-product-details/" +
          router.currentRoute._value.query.goodsId,
          {}
        )
        .then((response) => {
          if (response.data.success === true) {
            productData.value = response.data.data;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getProductData();

    return {
      router,
      productData,
      modules: [Pagination],
      effect: 'cube',
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
    };
  },
};
</script>
<!-- <style scoped>

@import "../assets/css/product-details.css";


</style> -->