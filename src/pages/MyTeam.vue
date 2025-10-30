<template>
  <link rel="stylesheet" :href="'/css/promotion1.css'" />
  <!-- <link rel="stylesheet" :href="'/css/pagination.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/chunk-vendors.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/common-modal.css'" /> -->

  <div class="appHeader1">
    <div class="left">
      <a href="#" class="icon goBack" v-on:click="router.go(-1)">
        <img :src="require('../assets/images/left.png')" />
      </a>
      <div class="pageTitle">My Team</div>
    </div>
  </div>

  <!-- App Capsule -->
  <div id="appCapsule">
    <div class="">
      <!-- App Capsule -->

      <!-- appCapsule -->
      <div>
        <!-- <div v-if="1 === 0"> -->

        <div class="level-main-tab">
          <ul class="nav nav-tabs size2" id="myTab3" role="tablist">
            <li class="nav-item w-20">
              <a
                class="nav-link active"
                id="home-tab3"
                role="tab"
                v-on:click="(endLevel = 1), this.teemData()"
                :class="endLevel == 1 ? 'bg-#ddd' : 'bg-white'"
                >Level 1<span id="al1"></span
              ></a>
            </li>
            <li class="nav-item w-20">
              <a
                class="nav-link active"
                id="home-tab3"
                role="tab"
                v-on:click="(endLevel = 2), this.teemData()"
                :class="endLevel == 2 ? 'bg-#ddd' : 'bg-white'"
                >Level 2<span id="al1"></span
              ></a>
            </li>
            <li class="nav-item w-20">
              <a
                class="nav-link active"
                id="home-tab3"
                role="tab"
                v-on:click="(endLevel = 3), this.teemData()"
                :class="endLevel == 3 ? 'bg-#ddd' : 'bg-white'"
                >Level 3<span id="al1"></span
              ></a>
            </li>
            <li class="nav-item w-20">
              <a
                class="nav-link active"
                id="home-tab3"
                role="tab"
                v-on:click="(endLevel = 4), this.teemData()"
                :class="endLevel == 4 ? 'bg-#ddd' : 'bg-white'"
                >Level 4<span id="al1"></span
              ></a>
            </li>

            <li class="nav-item w-20">
              <a
                class="nav-link active"
                id="home-tab3"
                role="tab"
                v-on:click="(endLevel = 5), this.teemData()"
                :class="endLevel == 5 ? 'bg-#ddd' : 'bg-white'"
                >Level 5<span id="al1"></span
              ></a>
            </li>
            <li class="nav-item w-20">
              <a
                class="nav-link active"
                id="home-tab3"
                role="tab"
                v-on:click="(endLevel = 6), this.teemData()"
                :class="endLevel == 6 ? 'bg-#ddd' : 'bg-white'"
                >Level 6<span id="al1"></span
              ></a>
            </li>
            <li class="nav-item w-20">
              <a
                class="nav-link active"
                id="home-tab3"
                role="tab"
                v-on:click="(endLevel = 7), this.teemData()"
                :class="endLevel == 7 ? 'bg-#ddd' : 'bg-white'"
                >Level 7<span id="al1"></span
              ></a>
            </li>
            <li class="nav-item w-20">
              <a
                class="nav-link active"
                id="home-tab3"
                role="tab"
                v-on:click="(endLevel = 8), this.teemData()"
                :class="endLevel == 8 ? 'bg-#ddd' : 'bg-white'"
                >Level 8<span id="al1"></span
              ></a>
            </li>
            <li class="nav-item w-20">
              <a
                class="nav-link active"
                id="home-tab3"
                role="tab"
                v-on:click="(endLevel = 9), this.teemData()"
                :class="endLevel == 9 ? 'bg-#ddd' : 'bg-white'"
                >Level 9<span id="al1"></span
              ></a>
            </li>
            <li class="nav-item w-20">
              <a
                class="nav-link active"
                id="home-tab3"
                role="tab"
                v-on:click="(endLevel = 10), this.teemData()"
                :class="endLevel == 10 ? 'bg-#ddd' : 'bg-white'"
                >Level 10<span id="al1"></span
              ></a>
            </li>
          </ul>
        </div>

        <div class="mb-4 level-tables">
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade active show" id="level1" role="tabpanel">
              <div class="">
                <div class="">
                  <div
                    style="overflow-x: auto"
                    class="table-container listView set-shadow"
                  >
                    <!-- <div class="custom-search-my-team">
                      <div class="van-search__content van-search__content--square">
                        <div class="van-cell van-cell--borderless van-field">
                          <div class="van-field__left-icon">
                            <i class="van-icon van-icon-search" aria-hidden="true"></i>
                          </div>
                          <div
                            class="van-cell__value van-cell__value--alone van-field__value"
                          >
                            <div class="van-field__body search_bar">
                              <input
                                type="search"
                                placeholder="search"
                                class="van-field__control"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> -->
                    <table class="table" id="tl1">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Status</th>
                          <th scope="col">Total Recharge</th>
                        </tr>
                      </thead>
                      <tbody v-if="userTeemData?.length > 0">
                        <tr v-show="apirun">
                          <td colspan="4">
                            <div class="lds-ellipsis">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                          </td>
                        </tr>

                        <tr
                          v-for="(item, index) in userTeemData"
                          :key="index + 1"
                        >
                          <td>{{ index + 1 }}</td>

                          <td>
                            {{
                              endLevel == 1
                                ? item?.mobile
                                : hideMobile(item?.mobile.toString())
                            }}
                          </td>

                          <td>
                            <span
                              class="rewartdstatuts"
                              style="background: green"
                              v-if="
                                item?.userTotleRechargeAmount?.rechargeAmount
                              "
                            ></span>
                            <span
                              class="rewartdstatuts"
                              style="background: red"
                              v-else
                            ></span>
                          </td>
                          <td>
                            {{
                              item?.userTotleRechargeAmount
                                ? item?.userTotleRechargeAmount?.rechargeAmount
                                : 0
                            }}
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td>
                            <div>No Data Found</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- <div class="pagination">
                      <ul class="page_box">
                        <li class="page">
                          <span
                            >{{ page * pageSize - pageSize + 1 }}-{{
                              page * pageSize
                            }}
                          </span>
                          of {{ this.totalPage }}
                        </li>
                        <li class="page_btn">
                          <i
                            class="van-icon van-icon-arrow-left"
                            @click="page  && this.prevPage()"
                          ></i>
                          <i
                            class="van-icon van-icon-arrow"
                            @click="totalPage && this.nextPage()"
                          ></i>
                        </li>
                      </ul>
                    </div> -->
                    <!-- <div class="level-main-tab">
          <ul class="nav nav-tabs size2" id="myTab3" role="tablist">
            <li
              class="nav-item"
              v-for="(item, index) in mainlavel"
              :class="mainlavel.length % 2 === 0 ? 'w-20' : 'w-33'"
              :key="index"
            >
              <a
                v-on:click="
                  (levelTab = item.lavel_id),
                    (lavel1Page = 1),
                    getDashbordData()
                "
                :class="
                  item.lavel_id === levelTab ? 'nav-link active' : 'nav-link'
                "
                id="home-tab3"
                role="tab"
                >Level {{ item.lavel_id }}&nbsp; ({{
                  userscounts[item.lavel_id]
                }}) <span id="al1"></span
              ></a>
            </li>
          </ul>
        </div> -->
                    <!-- <tr
                          v-for="(item, index) in DashbordData.level1"
                          v-show="!apirun"
                          :Key="index"
                        >
                          <td>
                            {{
                              lavel1Page * lavel1PageRow -
                              lavel1PageRow +
                              1 +
                              index
                            }}
                          </td>

                          <td>
                            {{
                              levelTab === "1"
                                ? item.mobile
                                : item.mobile.slice(0, -8) +
                                  "******" +
                                  item.mobile.slice(-2)
                            }}
                          </td>
                          <td>
                            <span
                              class="rewartdstatuts"
                              style="background: green"
                              v-if="item.Water_reward"
                            ></span>
                            <span
                              class="rewartdstatuts"
                              style="background: red"
                              v-else
                            ></span>
                          </td>
                        <td>{{ item.Water_reward ? (item.Water_reward).toFixed(2) : 0 }}</td>

                          <td>
                            {{
                              item.First_reward
                                ? item.First_reward.toFixed(2)
                                : 0
                            }}
                          </td>
                        </tr> -->
                    <!-- <p
                      v-if="
                        DashbordData.level1 && DashbordData.level1.length <= 0
                      "
                      class="null-data"
                      style="
                        color: #000 !important;
                        font-size: 12px;
                        font-weight: 400;
                      "
                    >
                      No data available
                    </p> -->
                    <!-- <div class="pagination">
                      <ul class="page_box">
                        <li class="page">
                          <span
                            >{{ page * pageSize - pageSize + 1 }}-{{
                              page * pageSize
                            }}
                          </span>
                          of {{ totalpage }}
                        </li>
                        <li class="page_btn">
                          <i
                            class="van-icon van-icon-arrow-left"
                            v-on:click="handlegetlavel1Change(page - 1)"
                          ></i>
                          <i
                            class="van-icon van-icon-arrow"
                            v-on:click="handlegetlavel1Change(page + 1)"
                          ></i>
                        </li>
                      </ul>
                    </div> -->
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

  <div id="alert" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-body" id="alertmessage"></div>
        <div class="text-center pb-1">
          <a type="button" class="text-info" data-dismiss="modal">OK</a>
        </div>
      </div>
    </div>
  </div>

  <div class="toast-content" v-show="isErrorShow">
    <div
      class="toast-message"
      style="
        top: 50% !important;
        font-size: 14px;
        min-width: 120px;
        padding: 8px 12px;
        text-align: center;
        margin: 0 auto;
        position: fixed;
      "
    >
      {{ errorMessage }}
    </div>
  </div>

  <!-- loader -->
  <div class="loading" v-show="loader" style="/* display: none; */">
    <div
      class="v-dialog v-dialog--persistent"
      style="width: 300px; display: block"
    >
      <div class="v-card v-sheet theme--dark teal">
        <div class="v-card__text">
          <span>Loading</span>
          <div
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            class="v-progress-linear mb-0"
            style="height: 7px"
          >
            <div
              class="v-progress-linear__background white"
              style="height: 7px; opacity: 0.3; width: 100%"
            ></div>
            <div class="v-progress-linear__bar">
              <div
                class="v-progress-linear__bar__indeterminate v-progress-linear__bar__indeterminate--active"
              >
                <div
                  class="v-progress-linear__bar__indeterminate long white"
                ></div>
                <div
                  class="v-progress-linear__bar__indeterminate short white"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import { ref } from "vue";
import { useRouter } from "vue-router";
import Footer from "../components/CommonFooter.vue";

export default {
  data() {
    return {
      router: useRouter(),
      endLevel: 1,
      userTeemData: [],
      apirun: false,
      // page: 1,
      // pageSize: 1,
      // totalPage: 0,
      loader: false,
    };
  },
  components: {
    Footer,
  },
  methods: {
    async teemData() {
      try {
        this.apirun = true;
        this.loader = true;
        const response = await axios.post("/user_my_teem", {
          endLevel: this.endLevel,
          page: this.page,
          pageSize: this.pageSize,
        });
        this.userTeemData = response.data.data;
        // this.totalPage = Math.ceil(response.data.totleCount / this.pageSize);
        // console.log("this.totalPage", this.totalPage);
        this.apirun = false;
        this.loader = false;
      } catch (error) {
        console.log("Error", error);
      }
    },
    // prevPage() {
    //   if (this.page > 0) {
    //     this.page -= 1;
    //     this.teemData();
    //   }
    // },
    // nextPage() {
    //   if (this.page) {
    //     this.page += 1;
    //     this.teemData();
    //   }
    // },
    hideMobile(mobile) {
      if (typeof mobile === "string" && mobile.length >= 4) {
        const prefix = mobile.substring(0, 2);
        const suffix = mobile.substring(mobile.length - 2);
        const hiddenPart = "*".repeat(mobile.length - 4);
        return prefix + hiddenPart + suffix;
      } else {
        return "mobile";
      }
    },
  },

  mounted() {
    this.teemData();
  },

  // setup() {
  //   const router = useRouter();
  //   const DashbordData = ref([]);
  //   const levelTab = ref("1");
  //   let isNoticeModalVisible = ref(false);
  //   let drop = ref(false);
  //   const isErrorShow = ref(false);
  //   const errorMessage = ref("");

  //   const apirun = ref(true);
  //   const promotioncode = ref("");

  //   const lavel1Page = ref(1);
  //   const lavel1PageRow = ref(50);
  //   const totallavel1 = ref(0);

  //   const lavel2Page = ref(1);
  //   const lavel2PageRow = ref(10);
  //   const totallavel2 = ref(0);

  //   const lavel3Page = ref(1);
  //   const lavel3PageRow = ref(10);
  //   const totallavel3 = ref(0);

  //   const lavel4Page = ref(1);
  //   const lavel4PageRow = ref(10);
  //   const totallavel4 = ref(0);

  //   const lavel5Page = ref(1);
  //   const lavel5PageRow = ref(10);
  //   const totallavel5 = ref(0);
  //   const mainlavel = ref([]);
  //   const userscounts = ref([]);

  //   const getlavel = async () => {
  //     apirun.value = true;
  //     axios
  //       .get("/get-lavel", {})
  //       .then((response) => {
  //         mainlavel.value = response.data.data;
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   getlavel();
  //   const getDashbordData = async () => {
  //     console.log(levelTab.value);
  //     apirun.value = true;
  //     axios
  //       .post("/get-my-team", {
  //         lavel1Page: lavel1Page.value,
  //         lavel1PageRow: lavel1PageRow.value,
  //         levelTab: levelTab.value,
  //       })
  //       .then((response) => {
  //         if (response.data.success === true) {
  //           DashbordData.value = response.data.data;
  //           totallavel1.value = response.data.data.countlevel1;
  //           // userscounts.value = response.data.data.userscounts;
  //           apirun.value = false;
  //           // var origin = window.location.origin;
  //           // var url =
  //           //   origin +
  //           //   "/#/register?r_code=" +
  //           //   response.data.data.promotion_code;
  //           // $("#text_element").html(url);
  //         } else {
  //           alert(response.data.message);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   const getlavelcount = async () => {
  //     axios
  //       .post("/get-team-count", {})
  //       .then((response) => {
  //         if (response.data.success === true) {
  //           userscounts.value = response.data.data.userscounts;
  //         } else {
  //           alert(response.data.message);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   getlavelcount();

  //   if (!localStorage.getItem("authToken")) {
  //     router.push({ path: "/login" });
  //   } else {
  //     getDashbordData();
  //   }

  //   const setErrorMessage = (value) => {
  //     errorMessage.value = value;
  //     isErrorShow.value = true;
  //     setInterval(() => {
  //       errorMessage.value = "";
  //       isErrorShow.value = false;
  //     }, 2000);
  //   };

  //   const handlegetlavel1Change = (page) => {
  //     var page1 = totallavel1.value / lavel1PageRow.value;
  //     // const myArray = page1.split(".");
  //     var pagepoint = page1 - Math.floor(page1);
  //     var lastpage = Math.floor(page1);
  //     if (0 < pagepoint) {
  //       lastpage = lastpage + 1;
  //     }

  //     if (page > 0) {
  //       if (lastpage >= page) {
  //         lavel1Page.value = page;
  //         getDashbordData();
  //       } else {
  //         setErrorMessage("Last Page Now!");
  //       }
  //     } else {
  //       setErrorMessage("First Page Now!");
  //     }
  //   };

  //   const handlegetlavel2Change = (page) => {
  //     var page1 = totallavel2.value / lavel2PageRow.value;
  //     // const myArray = page1.split(".");
  //     var pagepoint = page1 - Math.floor(page1);
  //     var lastpage = Math.floor(page1);
  //     if (0 < pagepoint) {
  //       lastpage = lastpage + 1;
  //     }

  //     if (page > 0) {
  //       if (lastpage >= page) {
  //         lavel2Page.value = page;
  //         getDashbordData();
  //       } else {
  //         setErrorMessage("Last Page Now!");
  //       }
  //     } else {
  //       setErrorMessage("First Page Now!");
  //     }
  //   };

  //   const handlegetlavel3Change = (page) => {
  //     var page1 = totallavel3.value / lavel3PageRow.value;
  //     // const myArray = page1.split(".");
  //     var pagepoint = page1 - Math.floor(page1);
  //     var lastpage = Math.floor(page1);
  //     if (0 < pagepoint) {
  //       lastpage = lastpage + 1;
  //     }

  //     if (page > 0) {
  //       if (lastpage >= page) {
  //         lavel3Page.value = page;
  //         getDashbordData();
  //       } else {
  //         setErrorMessage("Last Page Now!");
  //       }
  //     } else {
  //       setErrorMessage("First Page Now!");
  //     }
  //   };

  //   const handlegetlavel4Change = (page) => {
  //     var page1 = totallavel4.value / lavel4PageRow.value;
  //     // const myArray = page1.split(".");
  //     var pagepoint = page1 - Math.floor(page1);
  //     var lastpage = Math.floor(page1);
  //     if (0 < pagepoint) {
  //       lastpage = lastpage + 1;
  //     }

  //     if (page > 0) {
  //       if (lastpage >= page) {
  //         lavel4Page.value = page;
  //         getDashbordData();
  //       } else {
  //         setErrorMessage("Last Page Now!");
  //       }
  //     } else {
  //       setErrorMessage("First Page Now!");
  //     }
  //   };

  //   const handlegetlavel5Change = (page) => {
  //     var page1 = totallavel5.value / lavel5PageRow.value;
  //     // const myArray = page1.split(".");
  //     var pagepoint = page1 - Math.floor(page1);
  //     var lastpage = Math.floor(page1);
  //     if (0 < pagepoint) {
  //       lastpage = lastpage + 1;
  //     }

  //     if (page > 0) {
  //       if (lastpage >= page) {
  //         lavel5Page.value = page;
  //         getDashbordData();
  //       } else {
  //         setErrorMessage("Last Page Now!");
  //       }
  //     } else {
  //       setErrorMessage("First Page Now!");
  //     }
  //   };

  //   const showModal = () => {
  //     document.body.classList.add("modal-open");
  //   };
  //   const hideModal = () => {
  //     document.body.classList.remove("modal-open");
  //   };

  //   return {
  //     showModal,
  //     hideModal,
  //     levelTab,
  //     drop,
  //     getDashbordData,
  //     DashbordData,
  //     router,
  //     isNoticeModalVisible,
  //     isErrorShow,
  //     errorMessage,
  //     setErrorMessage,
  //     handlegetlavel1Change,
  //     handlegetlavel2Change,
  //     handlegetlavel3Change,
  //     handlegetlavel4Change,
  //     handlegetlavel5Change,
  //     lavel1Page,
  //     lavel1PageRow,
  //     totallavel1,

  //     lavel2Page,
  //     lavel2PageRow,
  //     totallavel2,

  //     lavel3Page,
  //     lavel3PageRow,
  //     totallavel3,

  //     lavel4Page,
  //     lavel4PageRow,
  //     totallavel4,

  //     lavel5Page,
  //     lavel5PageRow,
  //     totallavel5,

  //     promotioncode,
  //     apirun,
  //     mainlavel,
  //     userscounts,
  //   };
  // },
};
</script>

<style scoped>
/* @import "../assets/css/promotion.css";
@import "../assets/css/pagination.css";
@import "../assets/css/chunk-vendors.css"; */

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 43px;
}

.lds-ellipsis div {
  position: absolute;
  top: 15px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #0f0d0d;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}

.no-data-text span {
  font-size: 12px;
  line-height: 15px;
  color: #000;
  padding: 13px 0 8px;
  text-align: center;
  display: block;
  margin-bottom: 0;
  width: 100%;
}

.rewartdstatuts {
  width: 15px;
  height: 15px;
  display: inline-block;
  border-radius: 50%;
  margin: 0 2px;
}
</style>
