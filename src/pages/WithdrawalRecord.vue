<template>
  <!-- <link rel="stylesheet" :href="'/css/chunk-vendors.css'" />
  <link rel="stylesheet" :href="'/css/WithdrawalRecord.css'" /> -->

  <div class="appHeader1">
    <div class="left">
      <a href="#" v-on:click="router.go(-1)" class="icon goBack">
        <img :src="require('../assets/images/left.png')" alt="" />
      </a>
      <div class="pageTitle">Withdrawal Record</div>
    </div>
  </div>

  <div class="recharge_box-reward-list">
    <div class="tab-content" id="myTabContent">
      <div class="completed_list">
        <ul class="list_box withdrawal_list_box" style="padding: 15px !important;">
          <li v-for="(item) in WithdrawalList" :key="item.id">
            <ol>
              <p class="remove_margin-block_start">₹ {{ item.paybleamount.toFixed(2) }}</p>
              <p class="remove_margin-block_start" style="color: rgb(0, 150, 136) !important" v-if="item.status == '3'">
                Agree
              </p>
              <p class="remove_margin-block_start" style="color: rgb(255, 168, 46) !important"
                v-if="item.status == '2'">
                Applying</p>
              <p class="remove_margin-block_start" style="color: red !important" v-if="item.status == '0'">
                Rejected</p>
              <p style="color: rgb(156, 39, 176) !important" v-if="item.status == '1'">Withdrawing</p>

            </ol>
            <ol>
              <!-- <p class="remove_margin-block_start"> RWS2022031{{ (item.account === 'none') ? '' : item.account
                }}{{ index }}</p> -->
              <p class="remove_margin-block_start"> {{ item.code || '' }}</p>
              <p class="remove_margin-block_start">BankCard</p>
            </ol>
            <ol>
              <!-- <p class="remove_margin-block_start"> {{ item.type }}</p> -->
            </ol>
            <ol>
              <p class="remove_margin-block_start"> {{ formatDate(item.createdate) }}</p>
            </ol>
          </li>
          <li v-show="WithdrawalList.length == 0" class="null_data text-center" style="border-bottom: 0px;">
            No data available
          </li>
        </ul>
      </div>
      <div class="pagination">
        <ul class="page_box" style="padding: 0 15px;">
          <li class="page">
            <span>{{
              WithdrawalPage * WithdrawalPageRow -
              WithdrawalPageRow +
              1
              }}-{{ WithdrawalPage * WithdrawalPageRow }}</span>
            of {{ totalWithdrawal }}
          </li>
          <li class="page_btn">
            <i class="van-icon van-icon-arrow-left" v-on:click="
              handleWithdrawalPageChange(WithdrawalPage - 1)
              "></i>
            <i class="van-icon van-icon-arrow" v-on:click="
              handleWithdrawalPageChange(WithdrawalPage + 1)
              "></i>
          </li>
        </ul>
      </div>
      <div class="choose_page mine_page">
        <div class="choose_page_par">
          <span class="row-text">Rows per page:</span>
          <div class="page_box_two">
            <div class="van-dropdown-menu">
              <div class="van-dropdown-menu__bar">
                <div v-on:click="WithdrawalPageRowOpen = (WithdrawalPageRowOpen) ? false : true" role="button"
                  tabindex="0" class="van-dropdown-menu__item">
                  <span class="van-dropdown-menu__title" :class="WithdrawalPageRowOpen && 'pagination-up-arrow'">
                    <div class="van-ellipsis" :style="WithdrawalPageRowOpen && 'color: rgb(156, 39, 176) !important;'">
                      {{ WithdrawalPageRow }}
                    </div>
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <div v-show="WithdrawalPageRowOpen" class="">
                    <div class="pagination-parent">
                      <div v-on:click="handleWithdrawalPageRowChange(10)" role="button" tabindex="0"
                        class="van-cell van-cell--clickable van-dropdown-item__option van-dropdown-item__option--active">
                        <div class="van-cell__title">
                          <span :style="RechargePageRow === 10 && 'color: rgb(156, 39, 176) !important;'">10</span>
                        </div>
                        <div v-show="WithdrawalPageRow === 10" class="van-cell__value">
                          <i class="van-icon van-icon-success van-dropdown-item__icon"></i>
                        </div>
                      </div>
                      <div v-on:click="handleWithdrawalPageRowChange(20)" role="button" tabindex="0"
                        class="van-cell van-cell--clickable van-dropdown-item__option van-dropdown-item__option--active">
                        <div class="van-cell__title">
                          <span :style="RechargePageRow === 20 && 'color: rgb(156, 39, 176) !important;'">20</span>
                        </div>
                        <div v-show="WithdrawalPageRow === 20" class="van-cell__value">
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

  <Footer />
  <div class="toast-content" v-show="isErrorShow" style="position: fixed;top: 0px;bottom: 0px;left: 0px;right: 0px;">
    <div class="toast-message">{{ errorMessage }}</div>
  </div>
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
    // useMeta({ title: "Withdrawal Record" });
    const router = useRouter();
    const WithdrawalList = ref([]);
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    const WithdrawalPage = ref(1);
    const WithdrawalPageRow = ref(10);
    const WithdrawalPageRowOpen = ref(false);
    const totalWithdrawal = ref(0);

    const getWithdrawal = () => {
      axios
        .post("/withdrawal-record", {
          page: WithdrawalPage.value,
          pagerow: WithdrawalPageRow.value,
        })
        .then((response) => {
          if (response.data.success) {
            WithdrawalList.value = response.data.data;
            totalWithdrawal.value = response.data.total;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };

    const handleWithdrawalPageRowChange = (row) => {
      if (row) {
        WithdrawalPageRow.value = row;
        WithdrawalPageRowOpen.value = false;
        getWithdrawal();
      }
    };

    const handleWithdrawalPageChange = (page) => {
      var page1 = totalWithdrawal.value / WithdrawalPageRow.value;
      // const myArray = page1.split(".");
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          WithdrawalPage.value = page;
          getWithdrawal();
        } else {
          // alert('hnh');
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }

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
      // const seconds = String(d.getSeconds()).padStart(2, '0');

      // Combine components into the desired format
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    // const handleWithdrawalPageChange = (page) => {
    //   if (page > 0) {
    //     WithdrawalPage.value = page;
    //     getWithdrawal();
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
      getWithdrawal();
    }
    return {
      WithdrawalList,
      router,
      WithdrawalPage,
      WithdrawalPageRow,
      getWithdrawal,
      handleWithdrawalPageChange,
      WithdrawalPageRowOpen,
      handleWithdrawalPageRowChange,
      isErrorShow,
      errorMessage,
      setErrorMessage,
      totalWithdrawal,
      formatDate
    };
  },
};
</script>

<style scoped>
/* @import "../assets/css/chunk-vendors.css";
@import "../assets/css/WithdrawalRecord.css"; */


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
</style>
