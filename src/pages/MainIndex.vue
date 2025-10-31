<template>
  <!-- <link rel="stylesheet" :href="'/css/index.css'" /> -->

  <a href="#" style="
      box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
        0 1px 10px 0 rgb(0 0 0 / 12%);
      display: flex;
      background: #eee;
    ">
    <div class="appHeader1 height add-box_shadow" style="width: 100%; background-color: rgb(238 238 238) !important">
      <div class="text-left">
        <div class="logo-img">
          <img :src="computedLogo" />
        </div>
        <div class="pageTitle" style="
            color: #616161;
            font-size: 20px;
            font-weight: 500;
          ">
          Open with an app
        </div>
      </div>
      <div class="download-icons" @click="getApkUrl()">
        <img :src="require('@/assets/images/download.png')" alt="" />
      </div>
    </div>
  </a>

  <div class="welcome-header">
    <h1>Welcome Back</h1>
    <h3>Quality Guarantee</h3>
  </div>

  <div id="appCapsule">
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <swiper :pagination="{
          dynamicBullets: true,
        }" :modules="modules" class="mySwiper" :loop="true" :autoplay="{ delay: 2500, disableOnInteraction: false }">
          <swiper-slide v-for="item in productData" :key="item.id">
            <div class="carousel-item active">
              <img class="d-block w-100" :src="item.material" alt="image" />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="sectionTitle mb-2">
      <div class="vcard mt-2">
        <div class="row">
          <div v-for="(item, index) in products" :key="index" :class="index % 2 == 0 ? 'col-6 pleft' : 'col-6 pright'">
            <div class="vcard card text-center apply-img-center">
              <!-- <router-link 
              :to="{
                name: 'productDetails',
                query: { goodsId: item.id },
              }" v-show="pd">
                <a class="postItem">
                  <div class="imageWrapper">
                    <img :src="item.product_url" alt="image" class="image" />
                  </div>
                  <div class="text-center jewellery-name">{{ item.name }}</div>
                  <footer>₹ {{ item.price }}.00</footer>
                </a>
              </router-link> -->
              <!-- <router-link :to="'/login'" v-show="!pd"> -->
              <!-- <router-link :to="'/login'" > -->
              <a class="postItem">
                <div class="imageWrapper">
                  <img :src="item.product_url" alt="image" class="image" />
                </div>
                <div class="text-center jewellery-name">{{ item.name }}</div>
                <footer>₹ {{ item.price }}.00</footer>
              </a>
              <!-- </router-link> -->
            </div>
          </div>
        </div>
      </div>
      <div class="p-2"></div>
    </div>
  </div>
  <Footer />
  <PageReload />
  <Loader :isShow="loader" />
</template>

<script>
// import { useMeta } from "vue-meta";
import Footer from "../components/CommonFooter.vue";
import { ref, computed, nextTick } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import PageReload from "../components/PageReload.vue";
import { Autoplay } from "swiper/modules";
import Loader from "../components/UserLoader.vue"
import axios from "axios";
export default {
  rules: {
    "vue/multi-word-component-names": 0,
  },
  components: {
    Footer,
    Swiper,
    SwiperSlide,
    PageReload,
    Loader
  },
  props: {
    toggleLoader: { type: Function },
  },
  setup() {
    // useMeta({ title: "Home Page" });
    const products = ref([]);
    const productData = ref([]);
    const apkImageData = ref([]);
    const logoimg = ref([]);
    const pd = ref(false);
    const modules = [Autoplay];
    const imagesLoading = ref(false);
    const loader = ref(false);
    const apkBlobUrl = ref(null);

    const getProductData = async () => {
      axios
        .post("/get-all-product", {})
        .then((response) => {
          if (response.data.success === true) {
            products.value = response.data.data;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (localStorage.getItem("authToken")) {
      pd.value = true;
    }
    const getProductData1 = async () => {
      axios
        .post("/get-banners")
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

    const getApkImage = async () => {
      imagesLoading.value = true;
      try {
        const response = await axios.post("/admin/admin-sitename-and-logoinformation");
        if (response.data?.data?.apk) {
          apkImageData.value = response.data.data.apk;
          logoimg.value = response.data.data.logo;
        }
      } catch (error) {
        console.error("Error fetching APK image:", error);
      } finally {
        imagesLoading.value = false;
      }
    };

    const computedLogo = computed(() => imagesLoading.value ? require("../assets/images/shared image.jpeg") : logoimg.value);

    const getApkUrl = async () => {
      try {
        loader.value = true;
        await nextTick();
        setTimeout(() => {
          if (apkBlobUrl.value) {
            const link = document.createElement("a");
            link.href = apkBlobUrl.value;
            link.setAttribute("download", "winWave.apk");
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            console.error("Download URL not available.");
          }
          loader.value = false;
        }, 100);
      } catch (error) {
        console.error("Error during APK download:", error);
        loader.value = false;
      }
    };
    const prepareApkBlob = async () => {
      try {
        const response = await axios.get("/get-apk");
        if (response.data.success) {
          const fileUrl = response.data.data;
          apkBlobUrl.value = fileUrl;
        }
      } catch (error) {
        console.error("Error preparing APK:", error);
      }
    };
    prepareApkBlob();
    getProductData1();
    getProductData();
    getApkImage();

    return {
      getApkImage,
      apkImageData,
      getProductData,
      products,
      productData,
      getProductData1,
      pd,
      modules,
      logoimg,
      imagesLoading,
      computedLogo,
      loader,
      getApkUrl
    };
  },
};
</script>
<!-- <style scoped>
@import "../assets/css/index.css";
</style> -->
