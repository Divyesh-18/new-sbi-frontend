<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content}` : ``
      }}</template>
  </metainfo>
  <router-view />
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  components: {},

  data() {
    return {
      title: "Loading...",
      error: "",
      favicon: "",
      reload: false,
      themeColor: " var(--theme-color)",
      isValidColor: true,
    };
  },
  mounted() {
    this.featchSite();
    this.fetchThemeColor();
  },
  methods: {

    async featchSite() {
      await axios
        .post("/admin/admin-sitename-and-logoinformation")
        .then((response) => {
          const sitename = response?.data?.data?.sitename;
          const faviconUrl = response?.data?.data?.favicon;
          this.title = sitename;
          this.favicon = faviconUrl;
          document.title = sitename ? sitename : "";
          if (faviconUrl) {
            this.setFavicon(faviconUrl);
          }
        })

        .catch((error) => {
          console.log("error", error);
        });
    },
    async fetchThemeColor() {
      await axios
        .get("/get-color-code")
        .then((response) => {
          let colorCode = response?.data?.data?.theme_color;
          this.themeColor = colorCode;
          document.documentElement.style.setProperty("--theme-color", this.themeColor);
        })
    },
    setFavicon(url) {
      const favicon =
        document.querySelector("link[rel='icon']") ||
        document.createElement("link");
      favicon.href = url;
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    },
  },
};
</script>

<style scoped>
@import "./assets/css/font-awesome.min.css";

@import "./assets/css/add-address.css";
@import "./assets/css/add-bank-detail.css";
@import "./assets/css/add-envelope.css";
@import "./assets/css/add-redenvelope.css";
@import "./assets/css/AddComplaints.css";
@import "./assets/css/address.css";
@import "./assets/css/bank-card.css";
@import "./assets/css/bootstrap4.4.1.css";
@import "./assets/css/chunk-vendors.css";
@import "./assets/css/complaints.css";
@import "./assets/css/dataTables.bootstrap.min.css";
@import "./assets/css/ekpay.css";
@import "./assets/css/forgot-password.css";
@import "./assets/css/home.css";
@import "./assets/css/index.css";
@import "./assets/css/Interest.css";
@import "./assets/css/jquery.dataTables.min.css";
@import "./assets/css/login.css";
@import "./assets/css/mine.css";
@import "./assets/css/order.css";
@import "./assets/css/parity.css";
@import "./assets/css/privacy-policy.css";
@import "./assets/css/product-details.css";
@import "./assets/css/promotion.css";
@import "./assets/css/recharge.css";
@import "./assets/css/rechargerecord.css";
@import "./assets/css/redEnvelope.css";
@import "./assets/css/register.css";
@import "./assets/css/reward.css";
@import "./assets/css/search.css";
@import "./assets/css/style.css";
@import "./assets/css/Transactions.css";
@import "./assets/css/Win.css";
@import "./assets/css/Withdrawal.css";
</style>
