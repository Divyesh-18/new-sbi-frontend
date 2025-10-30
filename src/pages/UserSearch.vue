<template>
  <!-- <link rel="stylesheet" :href="'/css/search.css'" /> -->

  <div class="search">
    <div class="search_box">
      <input v-model="searchKeyword" type="text" placeholder="Search for goods" />
    </div>
  </div>

  <div id="appCapsule">
    <div class="">
      <div class="sectionTitle mb-2">
        <div class="vcard search-card">
          <div class="row">
            <div class="col-6 {{ index % 2 == 0 ? 'pleft' : 'pright' }}" v-for="(item, index) in products" :key="index">
              <div class="vcard card text-center apply-img-center">
                <router-link :to="{
                  name: 'productDetails',
                  query: { goodsId: item.id },
                }" v-show="pd">
                  <a class="postItem">
                    <div class="imageWrapper">
                      <img :src="item.product_url" alt="image" class="image" />
                    </div>
                    <div class="text-center jewellery-name">
                      {{ item.name }}
                    </div>
                    <footer>₹ {{ item.price }}.00</footer>
                  </a>
                </router-link>
                <router-link :to="'/login'" v-show="!pd">
                  <a class="postItem">
                    <div class="imageWrapper">
                      <img :src="item.product_url" alt="image" class="image" />
                    </div>
                    <div class="text-center jewellery-name">
                      {{ item.name }}
                    </div>
                    <footer>₹ {{ item.price }}.00</footer>
                  </a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="p-2"></div>
      </div>
    </div>
  </div>
  <Footer />
  <PageReload />
</template>

<script>
import axios from 'axios';
import Footer from "../components/CommonFooter.vue";
import { watch, ref } from "vue";
import PageReload from "../components/PageReload.vue";

export default {
  components: {
    Footer,
    PageReload
  },
  props: {
    toggleLoader: { type: Function },
  },
  setup() {
    // useMeta({ title: "Search Page" });
    const searchKeyword = ref("");
    const products = ref([]);
    const pd = ref(false);
    const getProductData = async (value) => {
  try {
    const response = await axios.post("/get-all-product", { 
      searchTearms: { name: value }
    });

    if (response.data.success) {
      products.value = response.data.data;
    } else {
      // alert(response.data.message);
    }
  } catch (error) {
    // alert(error)
    console.error("Error fetching products:", error);
  }
};

    if (localStorage.getItem("authToken")) {
      pd.value = true;
    }

    watch(searchKeyword, (currentValue) => {
      getProductData(currentValue);
    });

    getProductData(searchKeyword.value);

    return {
      searchKeyword,
      products,
      pd,
    };
  },
};
</script>

<!-- <style scoped>

@import "../assets/css/search.css";


</style> -->
