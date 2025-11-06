<template>
  <!-- <link rel="stylesheet" :href="'/css/common-modal.css'" /> -->

  <div class="mine_top_mine_main ">
    <div class="appContent3 text-white">
      <div class="row">
        <div class="col-12 set-flex">
          <div class="user-details">
            <div class="user-block">
              <!-- <img class="img-circle img-bordered-lg" :src="'/images/avatar.svg'" /> -->
              <img :src="require('../assets/images/avatar.svg')" class="img-circle img-bordered-lg" />
            </div>
            User : 91{{ mineDashbordData.mobile || "-" }}<br />
            <!-- ID : {{ mineDashbordData.id || "-" }}<br /> -->
            ID : {{ mineDashbordData.loginId || "-" }}<br />
            <!-- Free Wallet : {{ mineDashbordData.free_amount || "-" }}<br />
              Win Wallet: {{ mineDashbordData.win_amount || "-" }} -->
          </div>
          <div class="notice">
            <router-link to="">
              <a v-on:click="(isNoticeModalVisible = true), showModal()" data-toggle="modal"
                data-target="#exampleModalCenter1">
                <img :src="require('../assets/images/notification.png')" class="dollar-img-bel-icon" />
              </a>
            </router-link>
          </div>
        </div>

        <div class="payment-mode">
          <div>
            <p>₹ {{ mineDashbordData.balance || "0.00" }}</p>
            <p>Balance</p>
            <router-link to="/recharge">
              <a class="btn btn-sm btn-success">Recharge</a>
            </router-link>
          </div>

          <div>
            <p>₹ {{ mineDashbordData.commission?.toFixed(2) || "0.00" }}</p>
            <p>Commission</p>
            <router-link to="/reward">
              <a class="btn btn-sm btn-success">See</a>
            </router-link>
          </div>

          <div>
            <p>₹ {{ mineDashbordData.intrast || "0.00" }}</p>
            <p>Interest</p>
            <router-link to="/interest">
              <a class="btn btn-sm btn-success">See</a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="contentBox long mb-1 mine-deshbord-prent mine_page">
    <div class="contentBox-body card-body">
      <div class="accordion" id="accordionExample">
        <div class="card-header">
          <h2 class="mb-0">
            <a class="btn btn-link collapsed" v-on:click="openSignInModal(), showModal()">
              <div class="set-i-width">
                <img :src="require('../assets/images/sign-in.png')" class="dollar-img add-margin" />
              </div>
              Sign In
            </a>
            <!-- <i class="fa fa-angle-down" aria-hidden="true"></i> -->
            <i class="bi bi-chevron-down add-icon-size"></i>
          </h2>
        </div>

        <!-- chat menu-->
        <!-- <router-link to="/chatapp-deskbord">
          <div class="card-header">
            <h2 class="mb-0">
              <a class="btn btn-link collapsed">
                <div class="set-i-width">
                  <img
                    :src="require('../assets/images/order.png')"
                    class="dollar-img add-margin"
                  />
                </div>
                Chat App
              </a>
              <i class="bi bi-chevron-down add-icon-size"></i>
            </h2>
          </div>
        </router-link> -->
        <router-link to="/fastwinorder">
          <div class="card-header">
            <h2 class="mb-0">
              <a class="btn btn-link collapsed">
                <div class="set-i-width">
                  <img :src="require('../assets/images/order.png')" class="dollar-img add-margin" />
                </div>
                Fast Win Orders
              </a>
              <i class="bi bi-chevron-down add-icon-size"></i>
            </h2>
          </div>
        </router-link>
        <router-link to="/oneminuteorder">
          <div class="card-header">
            <h2 class="mb-0">
              <a class="btn btn-link collapsed">
                <div class="set-i-width">
                  <img :src="require('../assets/images/order.png')" class="dollar-img add-margin" />
                </div>
                One Minute Order
              </a>
              <i class="bi bi-chevron-down add-icon-size"></i>
            </h2>
          </div>
        </router-link>
        <router-link to="/order">
          <div class="card-header">
            <h2 class="mb-0">
              <a class="btn btn-link collapsed">
                <div class="set-i-width">
                  <img :src="require('../assets/images/order.png')" class="dollar-img add-margin" />
                </div>
                Three Minute Order
              </a>
              <i class="bi bi-chevron-down add-icon-size"></i>
            </h2>
          </div>
        </router-link>
        <!-- <router-link to="/myteam">
          <div class="card-header">
            <h2 class="mb-0">
              <a class="btn btn-link collapsed">
                <div class="set-i-width">
                  <img
                    :src="require('../assets/images/team-icon.png')"
                    class="dollar-img add-margin"
                  />
                </div>
                My Team
              </a>
              <i class="bi bi-chevron-down add-icon-size"></i>
            </h2>
          </div>
        </router-link> -->

        <router-link to="/promotion">
          <div class="card-header">
            <h2 class="mb-0">
              <a class="btn btn-link collapsed">
                <div class="set-i-width">
                  <img :src="require('../assets/images/pramotion.png')" class="dollar-img add-margin" />
                </div>
                Promotion
              </a>
              <i class="bi bi-chevron-down add-icon-size"></i>
            </h2>
          </div>
        </router-link>

        <router-link to="/redenvelope">
          <div class="card-header">
            <h2 class="mb-0">
              <a class="btn btn-link collapsed">
                <div class="set-i-width">
                  <img :src="require('../assets/images/red-envelop.png')" class="dollar-img add-margin" />
                </div>
                Red Envelope
              </a>
              <i class="bi bi-chevron-down add-icon-size"></i>
            </h2>
          </div>
        </router-link>

        <div class="card-header" @pointerdown="isWalletCollapseActive = true" @pointerup="walletCollapseToggle()">
          <h2 class="mb-0">
            <div class="wallet-icons" :class="isWalletCollapseActive && 'wallet-active-focus'" id="headingThree">
              <a class="btn btn-link collapsed">
                <div class="set-i-width">
                  <img :src="require('../assets/images/wallet.png')" class="dollar-img add-margin" />
                </div>
                Wallet
              </a>
              <i v-show="!isWalletCollapseOpen" class="bi bi-chevron-down add-icon-size" aria-hidden="true"></i>
              <i v-show="isWalletCollapseOpen" class="bi bi-chevron-up add-icon-size" aria-hidden="true"></i>
            </div>
          </h2>
        </div>

        <div v-show="isWalletCollapseOpen">
          <router-link to="/recharge">
            <a class="sub-link"> Recharge </a>
          </router-link>
          <router-link to="/withdrawal">
            <a class="sub-link"> Withdrawal </a>
          </router-link>
          <!-- <router-link to="/wintransfer">
            <a class="sub-link"> Win Wallet Transfer </a>
          </router-link> -->
          <router-link to="/transactions">
            <a class="sub-link"> Transactions </a>
          </router-link>
        </div>

        <router-link to="/bankcard">
          <div class="card-header">
            <h2 class="mb-0">
              <a class="btn btn-link collapsed">
                <div class="set-i-width">
                  <img :src="require('../assets/images/bank-card.png')" class="dollar-img add-margin" />
                </div>
                Bank Card
              </a>
              <i class="bi bi-chevron-down add-icon-size" aria-hidden="true"></i>
            </h2>
          </div>
        </router-link>

        <router-link to="/address">
          <div class="card-header">
            <h2 class="mb-0">
              <a class="btn btn-link collapsed">
                <div class="set-i-width">
                  <img :src="require('../assets/images/address.png')" class="dollar-img add-margin" />
                </div>
                Address
              </a>
              <i class="bi bi-chevron-down add-icon-size" aria-hidden="true"></i>
            </h2>
          </div>
        </router-link>

        <div class="card-header" @pointerdown="isAccountCollapseActive = true" @pointerup="accountCollapseToggle()">
          <h2 class="mb-0">
            <div class="wallet-icons" :class="isAccountCollapseActive && 'wallet-active-focus'" id="headingThree">
              <a class="btn btn-link collapsed">
                <div class="set-i-width">
                  <img :src="require('../assets/images/account.png')" class="dollar-img add-margin" />
                </div>
                Account Security
              </a>
              <i v-show="!isAccountCollapseOpen" class="bi bi-chevron-down add-icon-size" aria-hidden="true"></i>
              <i v-show="isAccountCollapseOpen" class="bi bi-chevron-up add-icon-size" aria-hidden="true"></i>
            </div>
          </h2>
        </div>

        <div v-show="isAccountCollapseOpen">
          <router-link to="/forgotpass">
            <a class="sub-link"> Reset Password </a>
          </router-link>
        </div>

        <div class="card-header" id="headingThree" @pointerup="DownloadtCollapseToggle()">
          <h2 class="mb-0">
            <a @pointerdown="isDownloadCollapseActive = true" class="btn btn-link collapsed"
              :class="isDownloadCollapseActive && 'wallet-active-focus'">
              <div class="set-i-width">
                <img :src="require('../assets/images/download.png')" class="dollar-img add-margin" />
              </div>
              App Download
            </a>
            <i v-show="!isDownloadCollapseOpen" class="bi bi-chevron-down add-icon-size" aria-hidden="true"></i>
            <i v-show="isDownloadCollapseOpen" class="bi bi-chevron-up add-icon-size" aria-hidden="true"></i>
          </h2>
        </div>

        <div v-show="isDownloadCollapseOpen">
          <!-- <router-link to="/"> -->
          <!-- <a
            class="sub-link"
            href="/apk/Haier-Mall.apk"
            :download="Haier-Mall.apk"
          > -->
          <!-- <a :href="apkImageData" download="ColorGame.apk" class="sub-link">
            Android Download
          </a> -->
          <a class="sub-link" @click="getApkUrl" style="cursor: pointer;"> Android Download </a>
          <!-- </router-link> -->
        </div>

        <!-- <div class="card-header" id="headingThree">
          <h2 class="mb-0">
            <a href="#" class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapsefive1"
              aria-expanded="false" aria-controls="collapsefive">
              <div class="set-i-width">
                <img :src="'/images/download.png'" class="dollar-img add-margin" />
              </div>
              App Download
            </a>
            <i class="bi bi-chevron-down add-icon-size" aria-hidden="true"></i>
          </h2>
        </div>

        <div id="collapsefive1" class="collapse">
          <a href="#" class="sub-link"> Android Download </a>
        </div> -->

        <router-link to="/complaints">
          <div class="card-header" id="headingThree">
            <h2 class="mb-0">
              <a class="btn btn-link collapsed">
                <div class="set-i-width">
                  <img :src="require('../assets/images/complains.png')" class="dollar-img add-margin" />
                </div>
                Complaints & Suggestions
              </a>
              <i class="bi bi-chevron-down add-icon-size" aria-hidden="true"></i>
            </h2>
          </div>
        </router-link>

        <router-link to="/complaints">
          <div id="collapseadi" class="collapse">
            <a class="sub-link"> Complaints </a>
          </div>
        </router-link>

        <div class="card-header">
          <h2 class="mb-0">
            <div class="wallet-icons" :class="isAboutCollapseActive && 'wallet-active-focus'" id="headingThree">
              <a @pointerdown="isAboutCollapseActive = true" @pointerup="AboutCollapseToggle()"
                class="btn btn-link collapsed">
                <div class="set-i-width">
                  <img :src="require('../assets/images/about.png')" class="dollar-img add-margin" />
                </div>
                About
              </a>
              <i v-show="!isAboutCollapseOpen" class="bi bi-chevron-down add-icon-size" aria-hidden="true"></i>
              <i v-show="isAboutCollapseOpen" class="bi bi-chevron-up add-icon-size" aria-hidden="true"></i>
            </div>
          </h2>
        </div>

        <div v-show="isAboutCollapseOpen">
          <router-link to="/privacypolicy">
            <a class="sub-link"> Privacy Policy </a>
          </router-link>
          <router-link to="/riskagreement">
            <a class="sub-link"> Risk Disclosure Agreement </a>
          </router-link>
        </div>
      </div>
    </div>
    <div class="text-center">
      <a v-on:click="(isLogoutModalVisible = true), showModal()" class="btn btn-sm btn-logout" data-toggle="modal"
        data-target="#exampleModalCenter2">Logout</a>
    </div>
  </div>

  <a :href="telegramLink" class="fixed_kefu" target="_blank">
    <img src="@/assets/images/contect.png" class="dollar-img-bel-icon" />
  </a>
  <!-- Modal -->
  <div class="signin-modal">
    <Modal v-model:visible="isSignInModalVisible" :maskClosable="false" height="auto" width="70%" offsetTop="35%">
      <div style="background: #fff" class="modal-header">
        <h5 class="modal-title Modal_Title" id="exampleModalLabel" style="color: #000">
          Sign In
        </h5>
      </div>
      <div class="">
        <div class="sign-info">
          <p>Total: {{ signInData.total || 0 }} Days</p>
          <p>Today Rebates: ₹ {{ signInData.today_rebates || 0 }}</p>
          <p>Total Rebates: ₹ {{ signInData.total_rebates || 0 }}</p>
          <p>Status: {{ signInData.status || "-" }}</p>
        </div>
      </div>
      <form method="post">
        <div class="modal-footer">
          <button v-on:click="(isSignInModalVisible = false), hideModal()" type="button" class="btn btn-comman">
            CANCEL
          </button>
          <button v-on:click="addAttendance" type="button" name="sss" class="btn btn-comman active">
            Sign in
          </button>
        </div>
      </form>
    </Modal>
  </div>

  <!-- notification-Modal -->
  <div class="notification-modal">
    <Modal v-model:visible="isNoticeModalVisible" height="auto" width="70%" :maskClosable="false" offsetTop="25%">
      <div style="background: #fff" class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style="color: #000; font-size: 25px">
          {{ notificationdata.heading }}
        </h5>
      </div>
      <div class="modal-body">
        <div class="sign-info logout-info">
          <p style="color: #000">{{ notificationdata.content }}</p>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-comman active" data-dismiss="modal"
          v-on:click="(isNoticeModalVisible = false), hideModal()">
          Close
        </button>
      </div>
    </Modal>
  </div>

  <!-- logout-Modal -->
  <div class="confirm-passwrd">
    <Modal v-model:visible="isLogoutModalVisible" :maskClosable="false" height="auto" width="70%" offsetTop="40%">
      <div style="background: #fff" class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style="color: #000; font-size: 25px">
          Confirm
        </h5>
        <!-- <button type="button" class="close" v-on:click="isLogoutModalVisible = false" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> -->
      </div>
      <div class="modal-body py-0">
        <div class="sign-info logout-info">
          <p style="color: #000">Do you want to logout?</p>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-comman" v-on:click="(isLogoutModalVisible = false), hideModal()">
          CANCEL
        </button>
        <a class="btn btn-comman active" v-on:click="logout()">YES</a>
      </div>
    </Modal>
  </div>

  <Footer />

  <!-- loader -->
  <Loader :isShow="loader" />

  <div class="toast-content" v-show="isErrorShow">
    <div class="toast-message" style="
        top: 50% !important;
        font-size: 14px;
        min-width: 120px;
        padding: 7px 12px;
        text-align: center;
        margin: 0 auto;
        position: fixed;
      ">
      {{ errorMessage }}
    </div>
  </div>
  <PageReload />
  <div class="loading" v-show="apkLoader">
    <div class="v-dialog v-dialog--persistent" style="width: 300px; display: block">
      <div class="v-card v-sheet theme--dark teal">
        <div class="v-card__text">
          <span>Downloading</span>
          <div role="progressbar" aria-valuemin="0" aria-valuemax="100" class="v-progress-linear mb-0"
            style="height: 7px">
            <div class="v-progress-linear__background white" style="height: 7px; opacity: 0.3; width: 100%"></div>
            <div class="v-progress-linear__bar">
              <div class="v-progress-linear__bar__indeterminate v-progress-linear__bar__indeterminate--active">
                <div class="v-progress-linear__bar__indeterminate long white"></div>
                <div class="v-progress-linear__bar__indeterminate short white"></div>
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
import { useRouter } from "vue-router";
import { onMounted, ref, nextTick } from "vue";
import { Modal } from "usemodal-vue3";
import Footer from "../components/CommonFooter.vue";
import PageReload from "../components/PageReload.vue";
import Loader from "../components/UserLoader.vue";
export default {
  components: {
    Modal,
    Footer,
    PageReload,
    Loader
  },
  props: {
    toggleLoader: { type: Function },
  },
  setup() {
    // useMeta({ title: "Mine Page" });
    const router = useRouter();
    const mineDashbordData = ref({});
    const signInData = ref({});
    let isLogoutModalVisible = ref(false);
    let isNoticeModalVisible = ref(false);
    let isSignInModalVisible = ref(false);
    let isAboutCollapseOpen = ref(false);
    let isWalletCollapseOpen = ref(false);
    let isDownloadCollapseActive = ref(false);
    let isWalletCollapseActive = ref(false);
    let isAboutCollapseActive = ref(false);
    let isAccountCollapseActive = ref(false);
    let isAccountCollapseOpen = ref(false);
    let isDownloadCollapseOpen = ref(false);
    let loader = ref(false);
    let apkLoader = ref(false);

    const isErrorShow = ref(false);
    const errorMessage = ref("");
    const notificationdata = ref([]);
    const apkImageData = ref([]);
    let telegramLink = ref("");
    let apkBlobUrl = ref(null);

    const getTelegramLink = async () => {
      try {
        const response = await axios.get("/get-telegram-link");
        telegramLink.value = response?.data?.data?.telegram_link;
      } catch (error) {
        console.error("Error fetching Telegram link:", error);
      }
    };

    const logout = async () => {
      hideModal();
      await axios
        .get("/logout", {})
        .then((response) => {
          console.log("response", response);

          const userInfo = localStorage.getItem("authToken");
          if (!userInfo) {
            // alert("Admin Not Found");
          } else {
            localStorage.removeItem("authToken");
            router.push({ path: "/login" });
          }
        })
        .catch((error) => {
          console.log("logout error ", error);
        });
    };

    const getMineDashbordData = async () => {
      axios
        .get("/mine-dashbord", {})
        .then((response) => {
          if (response.data.success === true) {
            loader.value = true;
            setTimeout(function () {
              loader.value = false;
            }, 2000);
            mineDashbordData.value = response.data.data;
          } else {
            // alert(response.data.message);
            localStorage.removeItem("authToken");
            router.push({ path: "/login" });
          }
        })
        .catch(() => {
          localStorage.removeItem("authToken");
          router.push({ path: "/login" });
          // console.log(error);
        });
    };

    const getSignInModalData = async () => {
      axios
        .get("/getattendance", {})
        .then((response) => {
          if (response.data.success) {
            signInData.value = response.data.data;
          } else {
            localStorage.removeItem("authToken");
            router.push({ path: "/login" });
          }
        })
        .catch(() => {
          localStorage.removeItem("authToken");
          router.push({ path: "/login" });
          // console.log(error);
        });
    };

    const openSignInModal = async () => {
      await getSignInModalData();
      isSignInModalVisible.value = true;
      showModal();
    };

    const addAttendance = async () => {
      await axios
        .get("/attendance", {})
        .then(async (response) => {
          if (response.data.success) {
            isSignInModalVisible.value = false;
            hideModal();
            setErrorMessage(response.data.message);
            await getSignInModalData();
          } else {
            // isSignInModalVisible.value = false;
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const notificationdatafun = async () => {
      await axios
        .get("/notification-data", {})
        .then(async (response) => {
          notificationdata.value = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const setErrorMessage = async (value) => {
      errorMessage.value = value;
      isErrorShow.value = true;
      setInterval(() => {
        errorMessage.value = "";
        isErrorShow.value = false;
      }, 5000);
    };

    if (!localStorage.getItem("authToken")) {
      router.push({ path: "/login" });
    } else {
      notificationdatafun();
      getMineDashbordData();
    }

    const walletCollapseToggle = async () => {
      isWalletCollapseOpen.value = !isWalletCollapseOpen.value;
      isWalletCollapseActive.value = false;
      // setTimeout(() => {
      //   isWalletCollapseActive.value = false;
      // }, 300);
    };

    const DownloadtCollapseToggle = async () => {
      isDownloadCollapseOpen.value = !isDownloadCollapseOpen.value;
      isDownloadCollapseActive.value = false;
      // setTimeout(() => {
      //   isWalletCollapseActive.value = false;
      // }, 300);
      getApkImage();
    };
    const AboutCollapseToggle = async () => {
      isAboutCollapseOpen.value = !isAboutCollapseOpen.value;
      isAboutCollapseActive.value = false;
      // setTimeout(() => {
      //   isAboutCollapseActive.value = false;
      // }, 300);
    };
    const accountCollapseToggle = async () => {
      isAccountCollapseOpen.value = !isAccountCollapseOpen.value;
      isAccountCollapseActive.value = false;
      // setTimeout(() => {
      //   isAccountCollapseActive.value = false;
      // }, 300);
    };

    const getApkImage = async () => {
      await axios
        .post("/admin/admin-sitename-and-logoinformation")
        .then((response) => {
          if (response && response.data && response.data.data && response.data.data.apk) {
            apkImageData.value = response?.data?.data?.apk;
          } else {
            console.error("Invalid response from server");
          }
        })
        .catch((error) => {
          console.error("Error fetching APK image:", error);
        });
    };
    const getApkUrl = async () => {
      try {
        apkLoader.value = true;
        await nextTick();
        setTimeout(() => {
          if (apkBlobUrl.value) {
            const link = document.createElement("a");
            link.href = apkBlobUrl.value;
            link.setAttribute("download", "winWave.apk");
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            console.error("Download URL not available.");
          }
          apkLoader.value = false;
        }, 100);
      } catch (error) {
        console.error("Error during APK download:", error);
        apkLoader.value = false;
      }
    };
    const prepareApkBlob = async () => {
      try {
        const response = await axios.get("/get-apk");
        if (response.data.success) {
          const fileUrl = response.data.data;
          apkBlobUrl.value = fileUrl;
        }
      } catch (error) {
        console.error("Error preparing APK:", error);
      }
    };
    const showModal = () => {
      document.body.classList.add("modal-open");
    };
    const hideModal = () => {
      document.body.classList.remove("modal-open");
    };
    onMounted(async () => {
      await prepareApkBlob();
      await getApkImage();
      await getTelegramLink();
    });
    return {
      showModal,
      hideModal,
      logout,
      getMineDashbordData,
      telegramLink,
      mineDashbordData,
      isLogoutModalVisible,
      isNoticeModalVisible,
      isAboutCollapseOpen,
      isWalletCollapseOpen,
      isWalletCollapseActive,
      walletCollapseToggle,
      AboutCollapseToggle,
      isAboutCollapseActive,
      accountCollapseToggle,
      isAccountCollapseActive,
      isAccountCollapseOpen,
      isDownloadCollapseOpen,
      isSignInModalVisible,
      openSignInModal,
      signInData,
      addAttendance,
      loader,
      isErrorShow,
      errorMessage,
      setErrorMessage,
      DownloadtCollapseToggle,
      isDownloadCollapseActive,
      notificationdata,
      getApkImage,
      apkImageData,
      apkLoader,
      getApkUrl
    };
  },
};
</script>

<!-- <style scoped>
@import "../assets/css/mine.css";
</style> -->
