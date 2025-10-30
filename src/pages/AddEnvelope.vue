<template>
  <!-- <link rel="stylesheet" :href="'/css/add-envelope.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/complaints.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/chunk-vendors.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/rechargerecord.css'" /> -->
  <div class="layout-content">
    <div class="envelope-context">
      <div class="appHeader1">
        <div class="left">
          <a href="#" v-on:click="router.go(-1)" class="icon goBack">
            <img :src="require('../assets/images/left.png')" alt="" />
          </a>
          <div class="pageTitle">RedEnvelope</div>
        </div>
        <div class="right">
          <div class="pluse-icons">
            <router-link to="/addredenvelope">
              <a><img :src="require('../assets/images/plus.png')" style="height: 100%; max-height: 24px" /></a>
            </router-link>
          </div>
        </div>
      </div>
      <div class="recharge_box" style="padding: 15px !important">
        <div class="completed_list">
          <ul class="list_box ">
            <li v-for="(item, index) in RechargeList" :key="index">
              <ol>
                <p class="remove_margin-block_start">₹ {{ item.distributed_amount }}</p>
                <p class="remove_margin-block_start" style="color: rgb(255, 168, 46) !important;"
                  v-if="item.status == '0' || item.status == '2'">Timeout
                </p>
                <button v-if="item.status == '1'"
                  style="font-size: smaller; border-radius: 16px;background-color: #2d9688;border: none; color: #fff"
                  @click="onCopy(item.code)">Copy Url</button>
              </ol>
              <ol>
                <p class="remove_margin-block_start">{{ item.code }}</p>
                <p class="times remove_margin-block_start">{{ item.expiry_date }}</p>
              </ol>
              <ol>
                <p class="addnum remove_margin-block_start">{{ item.created_at }}</p>
              </ol>
            </li>
          </ul>
        </div>
        <div class="table-responsive">
          <p v-show="!RechargeList" class="null_data "> No data available</p>
        </div>
        <div class="pagination">
          <ul class="page_box">
            <li class="page">
              <span>{{
                RechargePage * RechargePageRow -
                RechargePageRow +
                1
              }}-{{ RechargePage * RechargePageRow }}</span>
              of {{ totalRecharge }}
            </li>
            <li class="page_btn">
              <i class="van-icon van-icon-arrow-left" v-on:click="handleRechargePageChange(RechargePage - 1)"></i>
              <i class="van-icon van-icon-arrow" v-on:click="handleRechargePageChange(RechargePage + 1)"></i>
            </li>
          </ul>
        </div>
        <div class="choose_page">
          <div class="choose_page_par">
            <span class="row-text">Rows per page:</span>
            <div class="page_box_two">
              <div class="van-dropdown-menu">
                <div class="van-dropdown-menu__bar">
                  <div v-on:click="RechargePageRowOpen = (RechargePageRowOpen) ? false : true" role="button"
                    tabindex="0" class="van-dropdown-menu__item">
                    <span class="van-dropdown-menu__title" :class="RechargePageRowOpen && 'pagination-up-arrow'">
                      <div class="van-ellipsis" :style="RechargePageRowOpen && 'color: rgb(156, 39, 176) !important;'">
                        {{ RechargePageRow }}
                      </div>
                    </span>
                  </div>
                  <!-- <div v-on:click="RechargePageRowOpen = true" role="button" tabindex="0"
                    class="van-dropdown-menu__item">
                    <span class="van-dropdown-menu__title">
                      <div class="van-ellipsis" :style="RechargePageRowOpen && 'color: rgb(156, 39, 176) !important;'">
                          {{ RechargePageRow }}
                        </div>
                    </span>
                  </div> -->
                </div>
                <div>
                  <!-- <div v-show="RechargePageRowOpen" class="van-dropdown-item van-dropdown-item--down" style="top: 0px">
                    <div class="van-dropdown-item van-dropdown-item--down" style="top: 0px">
                      <div class="van-popup van-popup--top van-dropdown-item__content" style="transition-duration: 0.2s;z-index: 2001;">
                        <div v-on:click=" handleRechargePageRowChange( 10 )" role="button" tabindex="0"
                          class="van-cell van-cell--clickable van-dropdown-item__option van-dropdown-item__option--active"
                          style="color: rgb(156, 39, 176)">
                          <div class="van-cell__title">
                            <span :style="RechargePageRow === 10 && 'color: rgb(156, 39, 176) !important;'">10</span>
                          </div>
                          <div v-show="RechargePageRow === 10" class="van-cell__value">
                            <i class="van-icon van-icon-success van-dropdown-item__icon" style="color: rgb(156,39,176);"></i>
                          </div>
                        </div>
                        <div v-on:click="handleRechargePageRowChange( 20 )" role="button" tabindex="0"
                          class="van-cell van-cell--clickable van-dropdown-item__option">
                          <div class="van-cell__title">
                            <span :style="RechargePageRow === 20 && 'color: rgb(156, 39, 176) !important;'">20</span>
                          </div>
                          <div v-show="RechargePageRow === 20" class="van-cell__value">
                            <i class="van-icon van-icon-success van-dropdown-item__icon" style="color: rgb(156,39,176);"></i>
                          </div>
                        </div>
                        <div data-v-483dad1f="" class="content"></div>
                      </div>
                    </div>
                  </div> -->
                  <div v-show="RechargePageRowOpen" class="">
                    <div class="pagination-parent">
                      <div v-on:click="handleRechargePageRowChange(10)" role="button" tabindex="0"
                        class="van-cell van-cell--clickable van-dropdown-item__option van-dropdown-item__option--active">
                        <div class="van-cell__title">
                          <span :style="RechargePageRow === 10 && 'color: rgb(156, 39, 176) !important;'">10</span>
                        </div>
                        <div v-show="RechargePageRow === 10" class="van-cell__value">
                          <i class="van-icon van-icon-success van-dropdown-item__icon"></i>
                        </div>
                      </div>
                      <div v-on:click="handleRechargePageRowChange(20)" role="button" tabindex="0"
                        class="van-cell van-cell--clickable van-dropdown-item__option van-dropdown-item__option--active">
                        <div class="van-cell__title">
                          <span :style="RechargePageRow === 20 && 'color: rgb(156, 39, 176) !important;'">20</span>
                        </div>
                        <div v-show="RechargePageRow === 20" class="van-cell__value">
                          <i class="van-icon van-icon-success van-dropdown-item__icon"></i>
                        </div>
                      </div>
                      <div data-v-483dad1f="" class="content"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="toast-content" v-show="isErrorShow" style="position: fixed;top: 0px;bottom: 0px;left: 0px;right: 0px;">
    <div class="toast-message">{{ errorMessage }}</div>
  </div>

  <Footer />
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import Footer from "../components/CommonFooter.vue";

export default {
  components: {

    Footer,
  },
  props: {
    toggleLoader: { type: Function },
  },
  setup() {
    // useMeta({ title: "Recharge Record" });
    const router = useRouter();
    const RechargeList = ref([]);
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    const RechargePage = ref(1);
    const RechargePageRow = ref(10);
    const RechargePageRowOpen = ref(false);
    const totalRecharge = ref(0);

    const getRecharge = () => {
      axios
        .get("/get-red-envolop", {
          page: RechargePage.value,
          pagerow: RechargePageRow.value,
        })
        .then((response) => {
          if (response.data.success) {
            RechargeList.value = response.data.data;
            totalRecharge.value = response.data.total;
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };

    const handleRechargePageRowChange = (row) => {
      if (row) {
        RechargePageRow.value = row;
        RechargePageRowOpen.value = false;
        getRecharge();
      }
    };

    const handleRechargePageChange = (page) => {
      var page1 = totalRecharge.value / RechargePageRow.value;
      // const myArray = page1.split(".");
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }
      if (page > 0) {
        if (lastpage >= page) {
          RechargePage.value = page;
          getRecharge();
        } else {
          // alert('hnh');
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }

    };

    // const handleRechargePageChange = (page) => {
    //   if (page > 0) {
    //     RechargePage.value = page;
    //     getRecharge();
    //   } else {
    //     setErrorMessage("First Page Now!");
    //   }
    // };
    // const setErrorMessage = async (value) => {
    const setErrorMessage = (value) => {

      errorMessage.value = value;
      isErrorShow.value = true;
      setInterval(() => {
        errorMessage.value = "";
        isErrorShow.value = false;
      }, 2000);
    };
    const onCopy = async (value) => {
      try {
        // var curl = $("#text_element").html();
        var curl = 'http://' + location.host + '/#/redenvelopes?code=' + value;

        await navigator.clipboard.writeText(curl);
        setErrorMessage("Success");
      } catch ($e) {
        setErrorMessage("Cannot copy");
      }
    };

    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    } else {
      getRecharge();
    }
    return {
      RechargeList,
      router,
      RechargePage,
      RechargePageRow,
      getRecharge,
      handleRechargePageChange,
      RechargePageRowOpen,
      handleRechargePageRowChange,
      isErrorShow,
      errorMessage,
      setErrorMessage,
      totalRecharge,
      onCopy,
    };
  },
};
</script>
<!-- <style scoped>

@import "../assets/css/add-envelope.css";
@import "../assets/css/complaints.css";
@import "../assets/css/chunk-vendors.css";
@import "../assets/css/rechargerecord.css";

</style> -->