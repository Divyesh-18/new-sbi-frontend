<template>
  <!-- <link rel="stylesheet" :href="'/css/reward.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/complaints.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/chunk-vendors.css'" /> -->

  <div class="layout-content">
    <div class="envelope-context">
      <div class="appHeader1">
        <div class="left">
          <a href="#" v-on:click="router.go(-1)" class="icon goBack">
            <img :src="require('../assets/images/left.png')" />
          </a>
          <div class="pageTitle">Reward</div>
        </div>

        <router-link to="">
          <a v-on:click="showModal" data-toggle="modal" data-target="#exampleModalCenter1"
            class="header-right-que-icon">
            <div data-v-1301ec90="" class="right_info">?</div>
          </a>
        </router-link>
      </div>

      <div class="recharge_box-reward-list">
        <div class="tab-content" id="myTabContent">
          <div class="completed_list">
            <ul class="list_box" style="padding: 10px 10px 5px !important">
              <li v-for="item in RechargeList" :key="item.id">
                <ol>
                  <p>₹ {{ item.amount?.toFixed(2) }}</p>
                  <p>
                    ₹ {{ ((item.wallet || 0) - (item.amount || 0)).toFixed(2) }}
                  </p>
                </ol>
                <ol>
                  <p>₹ {{ item.wallet?.toFixed(2) || 0 }}</p>
                </ol>
                <ol>
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
          <div class="choose_page">
            <div class="choose_page_par">
              <span class="row-text">Rows per page:</span>
              <div class="page_box_two">
                <div class="van-dropdown-menu">
                  <div class="van-dropdown-menu__bar">
                    <div v-on:click="RechargePageRowOpen = !RechargePageRowOpen" role="button" tabindex="0"
                      class="van-dropdown-menu__item">
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

  <Footer />
  <div class="reward-explor-modal">
    <Modal v-model:visible="isNoticeModalVisible" :maskClosable="false" height="auto" width="70%" offsetTop="15%">
      <div class="Reward_Model">
        <h5 class="modal-title" id="exampleModalLabel">Explain</h5>
        <div class="modal_body">
          <div class="sign-info logout-info">
            <p class="Reward_Paragraph">
              When your friends trade, you will also receive a 30% commission.
              Therefore, the more friends you invite, the higher your
              commission. There is a fixed income every day, the commission is
              permanent, but the reward is only onceWhen they make money, they
              will invite their friends to join them, and then you can get a 20%
              commission. In this way, your team can spread quickly. Therefore,
              I hope everyone can use our platform to make money, make money,
              and make money!When they make money, they will invite their
              friends to join them, and then you can get a 20% commission. In
              this way, your team can spread quickly. Therefore, I hope everyone
              can use our platform to make money, make money, and make
              money!Level 1 commission: Friends who join through your own link
              belong to your level, when they trade, you will get 30%
              commission.Tier 2 commission: Friends who join through your friend
              link belong to your secondary commission. When they trade, you can
              get 20% commission.Level 3 commission: Friends who join through
              friends of friends belong to your level 3. When they trade, you
              get 10% commission.Promotional rewards: 10% bonus amount for the
              first recharge after the first-level lower level joins. If your
              friend joins through your invitation and recharges 1000 for the
              first time, you will get 200
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="Reward_Close_Btn" data-dismiss="modal" v-on:click="hideModal">
            CLOSE
          </button>
        </div>
      </div>
    </Modal>
  </div>
  <div class="toast-content" v-show="isErrorShow" style="position: fixed; top: 0px; bottom: 0px; left: 0px; right: 0px">
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
import { Modal } from "usemodal-vue3";

export default {
  components: {
    Modal,
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
        .post("/rewardrecord", {
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
      }, 4000);
    };

    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    } else {
      getRecharge();
    }
    const showModal = () => {
      isNoticeModalVisible.value = true;
      document.body.classList.add("modal-open");
    };
    const hideModal = () => {
      isNoticeModalVisible.value = false;
      document.body.classList.remove("modal-open");
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

    return {
      showModal,
      hideModal,
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
.completed_list .list_box li ol p {
  font-size: 14px;
  margin-bottom: -11px;
  color: #757575 !important;

}

.toast-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(50, 50, 51, 0.88);
  padding: 4px 20px;
  border-radius: 8px;
  color: white;
  min-width: 96px;
  padding: 8px 12px;
}
</style>
