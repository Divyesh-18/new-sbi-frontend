<template>
  <!-- <link rel="stylesheet" :href="'/css/redEnvelope.css'" /> -->

  <div class="appHeader1 redenvelope-banner">
    <div class="left">
      <a href="#" v-on:click="router.go(-1)" class="icon goBack">
        <img :src="require('../assets/images/left.png')" />
      </a>
      <div class="pageTitle">Red Envelopes</div>
    </div>
    <div class="rednvelop-vector">
      <img :src="require('../assets/images/rednvelop-vector 2.png')" alt="">
    </div>
  </div>
  <div class="layout-content">
    <div class="envelope-context">
      <div class="top custom-box">
        <div class="redenvelopes_box">
          <p class="title-surprice">Surprise</p>
          <div class="img_box">
            <div class="hb_img_box">
              <div class="price">
                ₹ <span>{{ amount }}</span>
              </div>
              <img :src="require('../assets/images/red-001 (1).png')">
            </div>
          </div>
          <router-link to="/login">
            <div class="btn_box">
              <a @click="handleContinue" :disabled="isLoading">
                {{ isLoading ? "Processing..." : "Continue" }}
              </a>
            </div>
          </router-link>
          <div class="toast-content" v-show="isErrorShow">
            <div class="toast-message">{{ errorMessage }}</div>
          </div>
          <h2 class="error_msg"></h2>
        </div>
      </div>
    </div>
  </div>
  <PageReload />
</template>


<script>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";

export default {
  setup() {
    const router = useRouter();
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    const amount = ref(0);
    const isLoading = ref(false);
    const routeCode = ref(router.currentRoute.value.query.code || "0");

    const getProductData = async () => {
      try {
        const response = await axios.get(`/get-envelope/${routeCode.value}`);
        if (response.data.success) {
          amount.value = response.data.data.amount;
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    };

    const setErrorMessage = (value) => {
      errorMessage.value = value;
      isErrorShow.value = true;
      setTimeout(() => {
        errorMessage.value = "";
        isErrorShow.value = false;
      }, 2000);
    };

    const handleContinue = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(`/get-envelope/${routeCode.value}`, {
          params: { Continue: true },
        });

        if (response.data.success) {
          router.push({ path: "/mine" });
          // router.replace({ query: { code: routeCode.value, statusUpdated: true } });
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to process the envelope. Please try again.");
      } finally {
        isLoading.value = false;
      }
    };

    if (!localStorage.getItem("authToken")) {
      setErrorMessage("Not valid");
    } else {
      getProductData();
    }

    return {
      isErrorShow,
      errorMessage,
      amount,
      isLoading,
      handleContinue,
    };
  },
};
</script>
<style scoped>
/* @import "../assets/css/redEnvelope.css"; */


@media only screen and (max-width:480px) {
  .pagination {
    padding: 0 15px !important;
  }

  .rednvelop-vector img {
    width: 100%;
    filter: invert(14%) sepia(97%) saturate(7200%) hue-rotate(95deg) brightness(92%) contrast(105%)
  }

  .choose_page {
    padding: 10px 15px !important;
  }
}
</style>