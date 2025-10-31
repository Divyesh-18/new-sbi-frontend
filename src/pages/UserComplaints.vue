<template>
  <!-- <link rel="stylesheet" :href="'/css/order.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/complaints.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/chunk-vendors.css'" /> -->
  <!-- <link rel="stylesheet" :href="'/css/common-modal.css'" /> -->

  <div class="appHeader1">
    <div class="left">
      <a href="#" v-on:click="router.go(-1)" class="icon goBack">
        <img :src="require('../assets/images/left.png')" alt="" />
      </a>
      <div class="pageTitle" style="font-weight: 500">
        Complaints & Suggestions
      </div>
    </div>
    <div class="right" style="right: 15px; position: absolute; top: 15px">
      <div class="pluse-icons">
        <router-link to="/addcomplaints">
          <a>
            <img :src="require('../assets/images/plus.png')" style="height: 100%; max-height: 24px" />
          </a>
        </router-link>
      </div>
    </div>
  </div>
  <div class="complain-wrapper">
    <ul class="nav nav-tabs size2 level" id="myTab3" role="tablist">
      <li class="nav-item">
        <a v-on:click="tabb(1)" :class="levelTab === 1 ? 'nav-link active' : 'nav-link'" id="home-tab1"
          data-toggle="tab" role="tab">COMPLETED</a>
      </li>
      <li class="nav-item">
        <a v-on:click="tabb(2)" :class="levelTab === 2 ? 'nav-link active' : 'nav-link'" data-toggle="tab"
          role="tab">WAIT</a>
      </li>
    </ul>
  </div>
  <div class=".appContent1-addbankcard listView">
    <div class="tab-content" id="myTabContent">
      <div v-if="levelTab === 1" class="tab-pane fade active show" id="level1" role="tabpanel">
        <div>
          <ul class="list_box list_box-complaints">
            <li v-for="item in complitComplaintList" :key="item.complaint_id">
              <ol>
                <p>{{ item.complait_for }}</p>
                <p>{{ item.complait_time }}</p>
              </ol>
              <ol>
                <p>WhatsApp: {{ item.complait_subject }}</p>
                <p>{{ item.complaint_status }}</p>
              </ol>
              <ol>
                <p>{{ item.complait_id }}</p>
                <p>{{ item.complait_reply }}</p>
              </ol>
            </li>
          </ul>
          <p v-show="!complitComplaintList" class="null_data">
            No data available
          </p>
        </div>
        <div class="pagination">
          <ul class="page_box">
            <li class="page">
              <span>{{
                complitComplaintsPage * complitComplaintsPageRow -
                complitComplaintsPageRow +
                1
                }}-{{ complitComplaintsPage * complitComplaintsPageRow }}</span>
              of {{ totalComplitComplaints }}
            </li>
            <li class="page_btn">
              <i class="van-icon van-icon-arrow-left" v-on:click="
                  handleComplitComplaintsPageChange(complitComplaintsPage - 1)
                "></i>
              <i class="van-icon van-icon-arrow" v-on:click="
                  handleComplitComplaintsPageChange(complitComplaintsPage + 1)
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
                  <div v-on:click="
                      complitComplaintsPageRowOpen =
                        !complitComplaintsPageRowOpen
                    " role="button" tabindex="0" class="van-dropdown-menu__item">
                    <span class="van-dropdown-menu__title" :class="
                        complitComplaintsPageRowOpen && 'pagination-up-arrow'
                      ">
                      <div class="van-ellipsis" :style="
                          complitComplaintsPageRowOpen &&
                          'color: rgb(156, 39, 176) !important;'
                        ">
                        {{ complitComplaintsPageRow }}
                      </div>
                    </span>
                  </div>
                </div>
                <div>
                  <div v-show="complitComplaintsPageRowOpen" class="">
                    <div class="pagination-parent">
                      <div v-on:click="handleComplitComplaintsPageRowChange(10)" role="button" tabindex="0"
                        class="van-cell van-cell--clickable van-dropdown-item__option van-dropdown-item__option--active">
                        <div class="van-cell__title">
                          <span :style="
                              complitComplaintsPageRow === 10 &&
                              'color: rgb(156, 39, 176) !important;'
                            ">
                            10</span>
                        </div>
                        <div v-show="complitComplaintsPageRow === 10" class="van-cell__value">
                          <i class="van-icon van-icon-success van-dropdown-item__icon"></i>
                        </div>
                      </div>
                      <div v-on:click="handleComplitComplaintsPageRowChange(20)" role="button" tabindex="0"
                        class="van-cell van-cell--clickable van-dropdown-item__option van-dropdown-item__option--active">
                        <div class="van-cell__title">
                          <span :style="
                              complitComplaintsPageRow === 20 &&
                              'color: rgb(156, 39, 176) !important;'
                            ">20</span>
                        </div>
                        <div v-show="complitComplaintsPageRow === 20" class="van-cell__value">
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
      <div v-if="levelTab === 2" class="tab-pane fade active show" id="level2" role="tabpanel">
        <div>
          <ul class="list_box">
            <li v-for="item in waitComplaintList" :key="item.complaint_id" v-on:click="
                modeldata(item._id), (isComplenModalVisible = true), showModal()
              ">
              <ol>
                <p>{{ item.complait_for }}</p>
                <p>{{ item.complaint_time }}</p>
              </ol>
              <ol>
                <p>WhatsApp: {{ item.complait_subject }}</p>
                <p v-show="!loader">
                  <img :src="require('../assets/images/ghadi.png')" style="height: 100%; max-height: 24px" />
                </p>
                <p v-show="loader">
                  <img :src="require('../assets/images/sign-in.png')" style="height: 100%; max-height: 24px"
                    class="imgcolor" />
                </p>
              </ol>
              <ol>
                <p>{{ item.complait_id }}</p>
              </ol>
            </li>
          </ul>
          <p v-show="!waitComplaintList" class="null_data">No data available</p>
        </div>
        <!-- <div class="table-responsive">
          <table class="table table-borderless" id="myrecordparityt">
            <tbody>
              <tr v-for="item in waitComplaintList">
                <td colspan="2" v-on:click="modeldata(item.id)">
                  <div v-on:click="isComplenModalVisible = true">
                    <span>{{ item.complaint_for }}</span>
                    <span style="float: right">{{ item.complaint_time }}</span>
                    <br />
                    <br />
                    <span>WhatsApp:{{ item.complaint_subject }}</span>
                    <span style="float: right"><img :src="'/images/ghadi.png'"
                        style="height: 100%; max-height: 24px;" /></span>
                    <br />
                    <br />
                    <span>{{ item.complaint_id }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-show="!waitComplaintList" class="null_data">No data available</p>
        </div> -->
        <div class="pagination">
          <ul class="page_box">
            <li class="page">
              <span>{{
                waitComplaintsPage * waitComplaintsPageRow -
                waitComplaintsPageRow +
                1
                }}-{{ waitComplaintsPage * waitComplaintsPageRow }}</span>
              of {{ totalWaitComplaints }}
            </li>
            <li class="page_btn">
              <i class="van-icon van-icon-arrow-left" v-on:click="
                  handleWaitComplaintsPageChange(waitComplaintsPage - 1)
                "></i>
              <i class="van-icon van-icon-arrow" v-on:click="
                  handleWaitComplaintsPageChange(waitComplaintsPage + 1)
                "></i>
            </li>
          </ul>
        </div>
        <div class="choose_page">
          <div class="choose_page_par">
            <span>Rows per page:</span>
            <div class="page_box_two">
              <div class="van-dropdown-menu">
                <div class="van-dropdown-menu__bar">
                  <div v-on:click="
                      waitComplaintsPageRowOpen = !waitComplaintsPageRowOpen
                    " role="button" tabindex="0" class="van-dropdown-menu__item">
                    <span class="van-dropdown-menu__title" :class="
                        waitComplaintsPageRowOpen && 'pagination-up-arrow'
                      ">
                      <div class="van-ellipsis" :style="
                          waitComplaintsPageRowOpen &&
                          'color: rgb(156, 39, 176) !important;'
                        ">
                        {{ waitComplaintsPageRow }}
                      </div>
                    </span>
                  </div>
                </div>
                <div>
                  <div v-show="waitComplaintsPageRowOpen" class="">
                    <div class="pagination-parent">
                      <div v-on:click="handleWaitComplaintsPageRowChange(10)" role="button" tabindex="0"
                        class="van-cell van-cell--clickable van-dropdown-item__option van-dropdown-item__option--active">
                        <div class="van-cell__title">
                          <span :style="
                              waitComplaintsPageRow === 10 &&
                              'color: rgb(156, 39, 176) !important;'
                            ">
                            10</span>
                        </div>
                        <div v-show="waitComplaintsPageRow === 10" class="van-cell__value">
                          <i class="van-icon van-icon-success van-dropdown-item__icon"></i>
                        </div>
                      </div>
                      <div v-on:click="handleWaitComplaintsPageRowChange(20)" role="button" tabindex="0"
                        class="van-cell van-cell--clickable van-dropdown-item__option van-dropdown-item__option--active">
                        <div class="van-cell__title">
                          <span :style="
                              waitComplaintsPageRow === 20 &&
                              'color: rgb(156, 39, 176) !important;'
                            ">20</span>
                        </div>
                        <div v-show="waitComplaintsPageRow === 20" class="van-cell__value">
                          <i class="van-icon van-icon-success van-dropdown-item__icon"></i>
                        </div>
                      </div>
                      <div data-v-483dad1f="" class="content"></div>
                    </div>
                  </div>
                  <!-- <div v-show="waitComplaintsPageRowOpen" class="van-dropdown-item van-dropdown-item--down" style="top: 0px">
                    <div class="van-dropdown-item van-dropdown-item--down" style="top: 0px">
                      <div class="van-popup van-popup--top van-dropdown-item__content" style="transition-duration: 0.2s;z-index: 2001;">
                        <div v-on:click=" handleWaitComplaintsPageRowChange(10)" role="button" tabindex="0"
                          class="van-cell van-cell--clickable van-dropdown-item__option van-dropdown-item__option--active"
                          style="color: rgb(156,39,176);">
                          <div class="van-cell__title">
                            <span>10</span>
                          </div>
                          <div v-show="waitComplaintsPageRow ===10" class="van-cell__value">
                            <i class="van-icon van-icon-success van-dropdown-item__icon" style="color: rgb(156,39,176);"></i>
                          </div>
                        </div>
                        <div v-on:click="handleWaitComplaintsPageRowChange(20)" role="button" tabindex="0" class="van-cell van-cell--clickable van-dropdown-item__option">
                          <div class="van-cell__title">
                            <span>20</span>
                          </div>
                          <div v-show="waitComplaintsPageRow === 20" class="van-cell__value">
                            <i class="van-icon van-icon-success van-dropdown-item__icon" style="color: rgb(156,39,176);"></i>
                          </div>
                        </div>
                        <div class="content"></div>
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="complain-details">
    <Modal v-model:visible="isComplenModalVisible" height="auto" width="70%">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">
          Detail{{ modeldata1?.complaint_status }}
        </h5>
      </div>
      <div class="modal-body coustom-padding-add">
        <div class="form-group">
          <label for="name">Type</label>
          <Field type="text" disabled v-model="modeldata1.complait_for" :rules="validatetype" name="type" id="type"
            onKeyPress="" class="form-control" />
          <ErrorMessage name="type" />
        </div>
        <div class="form-group">
          <label for="ifsc">Out Id</label>
          <Field type="text" disabled v-model="modeldata1.complait_id" :rules="validateOutId" name="OutId" id="OutId"
            onKeyPress="" class="form-control" />
          <ErrorMessage name="OutId" />
        </div>
        <div class="form-group">
          <label for="bank">WhatsApp</label>
          <Field type="text" disabled v-model="modeldata1.complait_subject" :rules="validateWhatsApp" name="WhatsApp"
            id="WhatsApp" onKeyPress="" class="form-control" />
          <ErrorMessage name="WhatsApp" />
        </div>
        <div class="form-group">
          <label for="account">Description</label>
          <!-- <Field type="textarea" disabled v-model="modeldata1?.complaint_text" :rules="validateDescription"
            name="Description" id="Description" onKeyPress="" class="form-control" /> -->
          <textarea disabled v-model="modeldata1.complait_text" :rules="validateDescription" name="Description"
            id="Description" onKeyPress="" class="form-control"></textarea>
          <ErrorMessage name="Description" />
        </div>
        <div class="">
          <label for="account" class="tips">Waiting for reply</label>
          <!-- <Field type="text" disabled v-model="modeldata1?.complaint_reply" :rules="validateDescription"
            name="Description" id="Description" onKeyPress="" class="form-control" />
          <ErrorMessage name="Description" /> -->
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal"
          v-on:click="(isComplenModalVisible = false), hideModal()">
          Close
        </button>
      </div>
    </Modal>
  </div>

  <Footer />

  <div class="toast-content" v-show="isErrorShow">
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

  <!-- loader -->
  <Loader :isShow="loader" />
  <PageReload />
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import { Modal } from "usemodal-vue3";
import { Field, ErrorMessage } from "vee-validate";
import Footer from "../components/CommonFooter.vue";
import PageReload from "../components/PageReload.vue";
import Loader from "../components/UserLoader.vue";

export default {
  components: {
    Field,
    ErrorMessage,
    Modal,
    Footer,
    PageReload,
    Loader
  },
  props: {
    toggleLoader: { type: Function },
  },
  setup() {
    // useMeta({ title: "Complaints Page" });
    const router = useRouter();
    const levelTab = ref(1);
    const waitComplaintList = ref([]);
    const complitComplaintList = ref([]);
    let isComplenModalVisible = ref(false);
    let modeldata1 = ref();
    let OutId = ref("");
    const isErrorShow = ref(false);
    const errorMessage = ref("");
    const complitComplaintsPage = ref(1);
    const complitComplaintsPageRow = ref(10);
    const complitComplaintsPageRowOpen = ref(false);
    const totalComplitComplaints = ref(0);
    const waitComplaintsPage = ref(1);
    const waitComplaintsPageRow = ref(10);
    const waitComplaintsPageRowOpen = ref(false);
    const totalWaitComplaints = ref(0);
    let loader = ref(true);

    setTimeout(() => {
      loader.value = false;
    }, 2000);

    const tabb = (val) => {
      loader.value = true;
      setTimeout(function () {
        levelTab.value = val;
        loader.value = false;
      }, 1000);
    };

    const modeldata = async (id) => {
      await axios
        .post("/singalcomplaints", {
          _id: id,
        })
        .then((response) => {
          if (response.data.success) {
            modeldata1.value = response.data.data;
            console.log("response.data.data", response.data.data);
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };

    const getWaitComplaints = () => {
      axios
        .post("/wait-complaints", {
          page: waitComplaintsPage.value,
          pagerow: waitComplaintsPageRow.value,
        })
        .then((response) => {
          if (response.data.success) {
            waitComplaintList.value = response.data.data;
            totalWaitComplaints.value = response.data.totalDocumentsCount;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };

    const getComplitComplaints = () => {
      axios
        .post("/complit-complaints", {
          page: complitComplaintsPage.value,
          pagerow: complitComplaintsPageRow.value,
        })
        .then((response) => {
          if (response.data.success) {
            complitComplaintList.value = response.data.data;
            totalComplitComplaints.value = response.data.totalDocumentsCount;
          } else {
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.data.error);
        });
    };

    const handleComplitComplaintsPageRowChange = (row) => {
      if (row) {
        complitComplaintsPageRow.value = row;
        complitComplaintsPageRowOpen.value = false;
        getComplitComplaints();
      }
    };

    const handleComplitComplaintsPageChange = (page) => {
      var page1 = totalComplitComplaints.value / complitComplaintsPageRow.value;
      // const myArray = page1.split(".");
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          complitComplaintsPage.value = page;
          getComplitComplaints();
        } else {
          // alert('hnh');
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }
    };

    // const handleComplitComplaintsPageChange = (page) => {
    //   if (page > 0) {
    //     complitComplaintsPage.value = page;
    //     getComplitComplaints();
    //   } else {
    //     setErrorMessage("First Page Now!");
    //   }
    // };

    const handleWaitComplaintsPageRowChange = (row) => {
      if (row) {
        waitComplaintsPageRow.value = row;
        waitComplaintsPageRowOpen.value = false;
        getWaitComplaints();
      }
    };

    const handleWaitComplaintsPageChange = (page) => {
      var page1 = totalWaitComplaints.value / waitComplaintsPageRow.value;
      // const myArray = page1.split(".");
      var pagepoint = page1 - Math.floor(page1);
      var lastpage = Math.floor(page1);
      if (0 < pagepoint) {
        lastpage = lastpage + 1;
      }

      if (page > 0) {
        if (lastpage >= page) {
          waitComplaintsPage.value = page;
          getWaitComplaints();
        } else {
          // alert('hnh');
          setErrorMessage("Last Page Now!");
        }
      } else {
        setErrorMessage("First Page Now!");
      }
    };

    // const handleWaitComplaintsPageChange = (page) => {
    //   if (page > 0) {
    //     waitComplaintsPage.value = page;
    //     getWaitComplaints();
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
      getComplitComplaints();
      getWaitComplaints();
    }
    const showModal = () => {
      document.body.classList.add("modal-open");
    };
    const hideModal = () => {
      document.body.classList.remove("modal-open");
    };

    return {
      showModal,
      hideModal,
      OutId,
      modeldata1,
      modeldata,
      isComplenModalVisible,
      complitComplaintList,
      waitComplaintList,
      router,
      levelTab,
      complitComplaintsPage,
      complitComplaintsPageRow,
      getComplitComplaints,
      waitComplaintsPage,
      waitComplaintsPageRow,
      getWaitComplaints,
      handleComplitComplaintsPageChange,
      handleWaitComplaintsPageChange,
      complitComplaintsPageRowOpen,
      handleComplitComplaintsPageRowChange,
      handleWaitComplaintsPageRowChange,
      waitComplaintsPageRowOpen,
      isErrorShow,
      errorMessage,
      setErrorMessage,
      totalComplitComplaints,
      totalWaitComplaints,
      loader,
      tabb,
    };
  },
};
</script>

<style scoped>
/* @import "../assets/css/order.css";
@import "../assets/css/complaints.css";
@import "../assets/css/chunk-vendors.css"; */

.imgcolor {
  filter: invert(21%) sepia(100%) saturate(7414%) hue-rotate(297deg)
    brightness(108%) contrast(167%);
}

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
