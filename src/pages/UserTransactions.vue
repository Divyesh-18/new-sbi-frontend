<template>
  <!-- <link rel="stylesheet" :href="'/css/reward.css'" />
  <link rel="stylesheet" :href="'/css/chunk-vendors.css'" /> -->

  <div class="layout-content">
    <div class="envelope-context">
      <div class="appHeader1">
        <div class="left">
          <a href="#" v-on:click="router.go(-1)" class="icon goBack">
            <img :src="require('../assets/images/left.png')" />
          </a>
          <div class="pageTitle">Transactions</div>
        </div>
      </div>

      <div class="transactions-main-head">
        <div class="tab-content" style="padding: 10px" id="myTabContent">
          <div class="completed_list">
            <ul class="list_box transaction" style="padding: 7px;">
              <li v-for="item in RechargeList" :key="item.id">
                <ol style="margin-top:-15px">
                  <p>₹ {{ item.amount }}</p>
                  <p>₹ {{ item.wallet?.toFixed(2) }}</p>
                </ol>
                <ol style="margin-top:-15px">
                  <p v-if="item.actiontype === 'envelope'">Red Envlopes</p>
                  <p v-else-if="item.actiontype === 'interest'">Interest</p>
                  <p v-else-if="item.actiontype === 'recharge'">Recharge</p>
                  <p v-else-if="item.actiontype === 'bate-bonus'">Rebate</p>
                  <p v-else-if="item.actiontype === 'win'">win a prize</p>
                  <p v-else-if="item.actiontype === 'water reward'">Rebate</p>
                  <p v-else-if="item.actiontype === 'join'">Place Order</p>
                  <p v-else-if="item.actiontype === 'bonus'">Rebate</p>
                  <p v-else>{{ item.actiontype }}</p>

                  <p>₹ {{ item.wallet?.toFixed(2) }}</p>
                </ol>
                <ol style="margin-top:-15px">
                  <p>{{ formatDate(item.createdate) }}</p>
                </ol>
              </li>
            </ul>
            <p v-show="!RechargeList" class="null_data">No data available</p>
          </div>
          <div class="pagination">
            <ul class="page_box">
              <li class="page">
                <span>{{ RechargePage * RechargePageRow - RechargePageRow + 1 }}-{{
                  RechargePage * RechargePageRow
                }}</span>
                of {{ totalRecharge }}
              </li>
              <li class="page_btn">
                <i class="van-icon van-icon-arrow-left" v-on:click="handleRechargePageChange(RechargePage - 1)"></i>
                <i class="van-icon van-icon-arrow" v-on:click="handleRechargePageChange(RechargePage + 1)"></i>
              </li>
            </ul>
          </div>
          <div class="choose_page mine_page">
            <div class="choose_page_par">
              <span class="row-text">Rows per page:</span>
              <div class="page_box_two">
                <div class="van-dropdown-menu">
                  <div class="van-dropdown-menu__bar">
                    <div v-on:click="
                      RechargePageRowOpen = RechargePageRowOpen ? false : true
                      " role="button" tabindex="0" class="van-dropdown-menu__item">
                      <span class="van-dropdown-menu__title" :class="RechargePageRowOpen && 'pagination-up-arrow'">
                        <div class="van-ellipsis" :style="RechargePageRowOpen &&
                          'color: rgb(156, 39, 176) !important;'
                          ">
                          {{ RechargePageRow }}
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div v-show="RechargePageRowOpen" class="">
                    <div class="pagination-parent">
                      <div v-on:click="handleRechargePageRowChange(10)" role="button" tabindex="0"
                        class="van-cell van-cell--clickable van-dropdown-item__option van-dropdown-item__option--active">
                        <div class="van-cell__title">
                          <span :style="RechargePageRow === 10 &&
                            'color: rgb(156, 39, 176) !important;'
                            ">10</span>
                        </div>
                        <div v-show="RechargePageRow === 10" class="van-cell__value">
                          <i class="van-icon van-icon-success van-dropdown-item__icon"></i>
                        </div>
                      </div>
                      <div v-on:click="handleRechargePageRowChange(20)" role="button" tabindex="0"
                        class="van-cell van-cell--clickable van-dropdown-item__option van-dropdown-item__option--active">
                        <div class="van-cell__title">
                          <span :style="RechargePageRow === 20 &&
                            'color: rgb(156, 39, 176) !important;'
                            ">20</span>
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
  <div class="toast-content" v-show="isErrorShow" style="position: fixed; top: 0px; bottom: 0px; left: 0px; right: 0px">
    <div class="toast-message">{{ errorMessage }}</div>
  </div>

  <Footer />
  <PageReload />
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import Footer from "../components/CommonFooter.vue";
import PageReload from "../components/PageReload.vue";

export default {
  components: {
    Footer,
    PageReload,
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
    let isNoticeModalVisible = ref(false);

    const getRecharge = () => {
      axios
        .post("/transactions", {
          page: RechargePage.value,
          pagerow: RechargePageRow.value,
        })
        .then((response) => {
          if (response.data.success) {
            RechargeList.value = response.data.data;
            totalRecharge.value = response.data.total;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };
    const formatDate = (date) => {
      if (!date) return 'N/A';
      const d = new Date(date);

      // Format components
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');

      // Combine components into the desired format
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

    const setErrorMessage = (value) => {
      errorMessage.value = value;
      isErrorShow.value = true;
      setInterval(() => {
        errorMessage.value = "";
        isErrorShow.value = false;
      }, 2000);
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
      isNoticeModalVisible,
      formatDate
    };
  },
};
</script>
<style scoped>
/* @import "../assets/css/reward.css";
@import "../assets/css/chunk-vendors.css"; */

.list_box li ol p {
  line-height: normal;
  margin-bottom: 10px !important;
}
</style>
