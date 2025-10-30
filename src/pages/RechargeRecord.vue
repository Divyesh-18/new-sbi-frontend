<template>
  <!-- <link rel="stylesheet" :href="'/css/complaints.css'" />
  <link rel="stylesheet" :href="'/css/chunk-vendors.css'" />
  <link rel="stylesheet" :href="'/css/rechargerecord.css'" /> -->

  <div class="appHeader1">
    <div class="left">
      <a href="#" class="icon goBack" v-on:click="router.go(-1)">
        <img :src="require('../assets/images/left.png')" alt="">
      </a>
      <div class="pageTitle">Recharge Record</div>
    </div>
  </div>

  <div class="recharge_box_recharge">
    <div class="tab-content" id="myTabContent">
      <!-- static- -->
      <div class="completed_list">
        <ul class="list_box" style="padding: 10px 10px 5px !important;">
          <li v-for="(item,index) in RechargeList" :key="index">
            <ol>
              <p>₹ {{ item.amount }}</p>
              <p style="color: rgb(255, 168, 46) !important;" v-if="item.actiontype == 'recharge-pending'">Unpaid</p>
              <p style="color: rgb(0, 150, 136) !important;" v-if="item.actiontype == 'recharge'">Success</p>
              <p style="color: rgb(255, 0, 0) !important;" v-if="item.actiontype == 'recharge-reject'">Reject</p>
            </ol>
            <ol>
              <p>
                <span class="times" v-if="item.rechargetype === 'USDTPAYMENT' && item.usdtAmount">
                  ₮{{item.usdtAmount}}</span><br>
                <span class="times" v-if="item.rechargetype !== null && item.rechargetype !== 'USDTPAYMENT'">SBI{{
                  item.rechargetype}}</span>
                <span class="times" v-else><span v-if="item.rechargetype !== 'USDTPAYMENT'">SBI</span></span>{{ item.orderid }}
              </p>
              <p class="times" v-if="item.rechargetype == NULL">QePay</p>
              <p class="times" v-if="item.rechargetype != NULL">{{ item.rechargetype }}</p>
            </ol>
            <ol>
              <p class="addnum">{{ dataFormate(item.createdate)}}</p>
            </ol>
          </li>
        </ul>
      </div>
      <!-- static-end- -->
      <div class="table-responsive">
        <p v-show="!RechargeList" class="null_data">
          No data available
        </p>
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
            <i class="van-icon van-icon-arrow-left" v-on:click="
              handleRechargePageChange(RechargePage - 1)
            "></i>
            <i class="van-icon van-icon-arrow" v-on:click="
              handleRechargePageChange(RechargePage + 1)
            "></i>
          </li>
        </ul>
      </div>
      <div class="choose_page">
        <div class="choose_page_par">
          <span class="row-text">Rows per page:</span>
          <div class="page_box_two">
            <div class="van-dropdown-menu">
              <div class="van-dropdown-menu__bar">
                <div v-on:click="RechargePageRowOpen = !RechargePageRowOpen" role="button" tabindex="0"
                  class="van-dropdown-menu__item">
                  <span class="van-dropdown-menu__title" :class="RechargePageRowOpen && 'pagination-up-arrow'">
                    <div class="van-ellipsis" :style="RechargePageRowOpen && 'color: rgb(156, 39, 176) !important;'">
                      {{ RechargePageRow }}
                    </div>
                  </span>
                </div>
              </div>
              <div>
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

  <Footer />

  <!-- <div class="toast-content" v-show="isErrorShow">
      <div class="toast-message">{{ errorMessage }}</div>
    </div> -->
  <div id="alert" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-body" id="alertmessage"></div>
        <div class="text-center pb-1">
          <a href="" type="button" class="text-info" data-dismiss="modal">OK</a>
        </div>
      </div>
    </div>
  </div>

  <div class="toast-content" v-show="isErrorShow" style="position: fixed;top: 0px;bottom: 0px;left: 0px;right: 0px;">
    <div class="toast-message">{{ errorMessage }}</div>
  </div>
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
    PageReload
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
    const totalRecharge = ref(0);
    const RechargePageRowOpen = ref(false);
    const getRecharge = () => {
      axios
        .post("/recharge-record", {
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
    const dataFormate =  (date) =>{
      const value = new Date(date);
      const year = value.getFullYear();
      const month = (value.getMonth() + 1).toString().padStart(2, '0'); 
      const day = value.getDate().toString().padStart(2, '0');
      const hours = value.getHours().toString().padStart(2, '0');
      const minutes = value.getMinutes().toString().padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;

      value.getHours();
      String(value.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = String(hours % 12 || 12).padStart(2, '0'); 

      const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
      return `${formattedDate} ${formattedTime}`;
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
      dataFormate
    };
  },
};
</script>

<style scoped>

/* @import "../assets/css/complaints.css";
@import "../assets/css/chunk-vendors.css";
@import "../assets/css/rechargerecord.css"; */
.nav-link {
  width: 50%;
  text-align: center;
  color: #fff;
  font-size: 15px;
}

.nav-link .active {
  width: 50%;
  text-align: center;
  color: #fff;
  font-size: 15px;
}




@media only screen and (max-width:480px) {
  .choose_page {
    padding: 12px 15px 7px !important;
  }
  .van-ellipsis{
    padding-right: 4px;
  }
}
</style>
