<template>
  <div class="v2_71">

    <!-- TOP HEADER -->
    <div class="v2_137">
      <div class="v2_138"></div>
      <!-- <span class="v2_139">Payment</span>
      <span class="v2_140">LPI</span> -->
         <img :src="'upilogo.png'" style="width: 80px; height: 40px; " />
      <span class="v2_141">CNIPED PAADNTS INTERYACE</span>
    </div>

    <!-- MAIN PAYMENT BOX -->
    <div class="v2_74">

      <!-- QR + AMOUNT -->
      <div class="v2_131">
        <span class="v2_132">Use Mobile Scan code to pay</span>
      </div>

      <div class="v2_133">
        <span class="v2_134">₹{{ userammount }}</span>
      </div>

      <div class="v2_135">
        <span class="v2_136">{{ uniquePaymentId }}</span>
      </div>

      <!-- QR Section -->
      <div class="v2_122">
        <div class="v2_123"></div>

        <div class="v2_126">
          <div class="v2_127">
            <div class="v2_128"></div>
            <span class="v2_129">Save QRCode</span>
          </div>
          <div class="v2_130">
               <img :src="Qrcode"
            style="width: 170px; height: 190px; padding: 10px 0px;" />
          </div>
        </div>

        <span class="v2_125">
          1. For iOS phones, long-press the QR code to open wallet.<br>
          2. For Android, screenshot & upload in wallet.<br>
          3. Please avoid duplicate payments.
        </span>

        <span class="v2_124">
          4. After completing the payment, fill the 12-digit UTR below.
        </span>

        
      </div>

        <div class="pays" style="margin-top: 20px;">
    <ul>
      
      <!-- Paytm Option -->
      <li style="    padding: 8px 15px 8px 10px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    margin-bottom: 10px;">
        <div class="inner">
          <div>
            <img
              :src="'pytm.jpg'"
              alt="Paytm"
            />
            <span>Paytm</span>

            <input type="hidden" :value="paytmLink" />
          </div>

          <i class="van-icon van-icon-arrow"></i>
        </div>
      </li>

      <!-- PhonePe Option -->
      <li style="    padding: 8px 15px 8px 10px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    margin-bottom: 10px;">
        <div class="inner">
          <div>
            <img
              :src="'payIcon_2.ff616d58.png'"
              alt="PhonePe"
            />
            <span>PhonePe</span>

            <input type="hidden" :value="phonepeLink" />
          </div>

          <i class="van-icon van-icon-arrow"></i>
        </div>
      </li>

    </ul>
  </div>

      <!-- COPY UPI SECTION -->
      <div class="v2_92">
        <span class="v2_110">a.</span>
        <span class="v2_109">Copy the below given UPI.</span>

        <div class="v2_103">
          <div class="v2_104"></div>

          <div class="v2_105" @click="onCopy">
            <div class="v2_106"></div>
            <span class="v2_107">Copy</span>
          </div>

          <span class="v2_108">{{ UPIID }}</span>
        </div>

        <span class="v2_102">
          b. Select the app to do payment.
        </span>

        <div style="margin-top: 10px; margin-bottom: 10px; display: flex; justify-content: center;">

          <div class="v2_97">
            <img :src="'pytm.jpg'" style="width: 55px; height: 55px; " />
          </div>
          <div class="v2_98">
            <img :src="'payIcon_2.ff616d58.png'" style="width: 55px; height: 55px; " />
          </div>
          <div class="v2_99">
            <img :src="'gpay.jpg'" style="width: 55px; height: 55px; " />
          </div>
          <div class="v2_100">
            <img :src="'bhim.jpg'" style="width: 55px; height: 55px; " />
          </div>
          </div>
            <div>         
              <span class="v2_101">pay </span>
              <span class="v2_95">Submit utr after payment is completed</span>
          </div>
        <div class="v2_96"></div>
      </div>

      <!-- UTR INPUT -->
      <span class="v2_91">UTR</span>

      <span class="v2_90">How to find UTR? Click here.</span>

          <input type="text" id="upi-input" value="" name="channel_order" placeholder="Input 12-digit here" maxlength="12" oninput="this.value=this.value.replace(/[^\d]/g,'')" onchange="this.value=this.value.replace(/[^\d]/g,'')"
          style="
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    background: #f5f5f7;
    text-align: center;
    line-height: 50px;
    font-weight: 700;
    border-radius: 30px;
    color: #333;
    font-size: 16px;
"
          >

      <!-- SUBMIT UTR BUTTON -->
      <div class="v2_83" @click="onSubmit">
        <div class="v2_84"></div>
        <div class="v2_85">
          <span class="v2_86">Submit Ref Number</span>
        </div>
      </div>

      <!-- NOTICE BOX -->
      <div class="v2_77">
        <div class="v2_78">
          <div class="v2_79"></div>
          <span class="v2_80">
            2. Please select the payment method & ensure you have required wallet installed.
          </span>
          <span class="v2_81">
            1. If coins not credited, fill UTR to recover funds.
          </span>
        </div>

        <span class="v2_82">Notice</span>
      </div>
    </div>

    <!-- MODAL -->
    <Modal v-model:visible="isNoticeModalVisible" height="auto" width="70%">
      <div style="background: #fff" class="modal-header">
        <h5 class="modal-title">NOTICE</h5>
        <button class="close" @click="isNoticeModalVisible = false; hideModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body py-0">
        <div class="sign-info logout-info" style="font-weight: bold;">
          <p>1. Do not save this UPI for next time. Always use latest account.</p>
          <p>2. Any loss due to wrong UPI is not platform responsibility.</p>
          <p>3. For queries, contact customer service.</p>
        </div>
      </div>

      <div class="modal-footer" style="justify-content:center;">
        <button class="btn btn-comman active payment-btn text-white"
                @click="isNoticeModalVisible = false; hideModal()">
          Submit ({{ countDown1 }}s)
        </button>
      </div>
    </Modal>

    <!-- TOAST -->
    <div class="toast-content" v-show="isErrorShow">
      <div class="toast-message">{{ errorMessage }}</div>
    </div>

  </div>
</template>


<script :src="'https://gateway.ekpays.com/static/assets/js/jquery-2.1.4.min.js'"></script>
<script>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, onMounted, onBeforeUnmount } from "vue";
import $ from "jquery";
import Footer from "../components/CommonFooter.vue";
import { Modal } from "usemodal-vue3";

export default {
  components: { Footer, Modal },

  props: {
    toggleLoader: { type: Function },
  },

  setup() {
    const router = useRouter();

    const userammount = ref("");
    const UPIID = ref("");
    const Qrcode = ref("");

    const isErrorShow = ref(false);
    const errorMessage = ref("");

    const countDownMinute = ref(0);
    const countDownSecond = ref(0);
    const countDown = ref(1800);

    const countDown1 = ref(20);
    const isNoticeModalVisible = ref(true);

    let noticeInterval = null;
    let mainTimer = null;

    // ---------------------------
    // FETCH UPI FROM API
    // ---------------------------
    const getupiFun = async () => {
      axios
        .get("/get-upi")
        .then((response) => {
          UPIID.value = response.data.data.second_upi_id;
          Qrcode.value = response.data.data.thad_qr_code;
        })
        .catch((error) => {
          console.log(error.data?.error);
        });
    };

    // ---------------------------
    // COPY UPI
    // ---------------------------
    const onCopy = async () => {
      try {
        const curl = $("#upi").html();
        await navigator.clipboard.writeText(curl);
        setErrorMessage("UPI copied successfully");
      } catch (e) {
        setErrorMessage("Copy failed, please input manually");
      }
    };

    // ---------------------------
    // ERROR TOAST
    // ---------------------------
    const setErrorMessage = (value) => {
      errorMessage.value = value;
      isErrorShow.value = true;

      setTimeout(() => {
        errorMessage.value = "";
        isErrorShow.value = false;
      }, 3000);
    };

    // ---------------------------
    // SUBMIT UTR
    // ---------------------------
    const onSubmit = async () => {
      const utr = $("#upi-input").val();

      if (utr.length < 12) {
        return setErrorMessage("Invalid Ref Number");
      }

      axios
        .post("/recharge", {
          amount: userammount.value,
          rechargetype: "CSPay",
          reference: utr,
        })
        .then((response) => {
          if (response.data.success) {
            setErrorMessage(response.data.message);
            setTimeout(() => {
              router.push("/mine");
            }, 2000);
          } else {
            setErrorMessage(response.data.message);
          }
        })
        .catch(() => {
          setErrorMessage("Server error. Try again.");
        });
    };

    // ---------------------------
    // MODAL BODY SCROLL CONTROL
    // ---------------------------
    const showModal = () => {
      document.body.classList.add("modal-open");
    };

    const hideModal = () => {
      document.body.classList.remove("modal-open");
    };

    // ---------------------------
    // PAGE MOUNT
    // ---------------------------
    onMounted(() => {
      // AUTH CHECK
      if (!localStorage.getItem("authToken")) {
        router.push("/login");
      }

      // GET AMOUNT FROM ROUTER
      if (!router.currentRoute.value.query.goodsId) {
        router.push("/mine");
      } else {
        userammount.value = router.currentRoute.value.query.goodsId;
      }

      // FETCH UPI
      getupiFun();

      // ---------------------------
      // NOTICE TIMER 20s
      // ---------------------------
      noticeInterval = setInterval(() => {
        if (countDown1.value > 0) {
          countDown1.value--;
        }
        if (countDown1.value === 0) {
          clearInterval(noticeInterval);
        }
      }, 1000);

      // ---------------------------
      // MAIN TIMER 30 min
      // ---------------------------
      mainTimer = setInterval(() => {
        if (countDown.value <= 0) {
          clearInterval(mainTimer);
          router.push("/mine");
        } else {
          countDown.value--;
          countDownMinute.value = Math.floor(countDown.value / 60);
          countDownSecond.value = String(countDown.value % 60).padStart(2, "0");
        }
      }, 1000);
    });

    // ---------------------------
    // CLEANUP ON PAGE LEAVE
    // ---------------------------
    onBeforeUnmount(() => {
      clearInterval(noticeInterval);
      clearInterval(mainTimer);
    });

    return {
      router,
      userammount,
      UPIID,
      Qrcode,
      onCopy,
      onSubmit,
      isErrorShow,
      errorMessage,
      setErrorMessage,
      countDownMinute,
      countDownSecond,
      isNoticeModalVisible,
      countDown1,
      showModal,
      hideModal,
    };
  },
};
</script>


<style scoped>
/* Main page container */
.v2_71 {
  width: 100%;
  min-height: 100vh;
  background: #f4f4f4;
  padding-bottom: 40px;
  font-family: Arial, sans-serif;
}

/* Top header */
.v2_137 {
  width: 100%;
  padding: 18px 0;
  background: #2868f0;
  text-align: center;
  color: #fff;
  display: flex;
    justify-content: center;
}

.v2_139 {
  display: block;
  font-size: 18px;
  font-weight: bold;
}

.v2_140 {
  display: block;
  font-size: 22px;
  font-weight: bold;
}

.v2_141 {
  display: block;
  font-size: 10px;
  opacity: 0.8;
  letter-spacing: 1px;
  padding : 23px 0 0 0;
}

/* Main white card */
.v2_74 {
  width: 88%;
  margin: 20px auto;
  background: #fff;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

/* Heading: Use Mobile Scan code */
.v2_131 {
  text-align: center;
  margin-bottom: 6px;
}
.v2_132 {
  font-size: 15px;
  font-weight: 600;
}

/* Amount */
.v2_133 {
  text-align: center;
}
.v2_134 {
  font-size: 32px;
  font-weight: bold;
  color: #2868f0;
}

/* Payment ID */
.v2_135 {
  text-align: center;
  margin-bottom: 10px;
}
.v2_136 {
  color: #888;
  font-size: 13px;
}

/* QR and instructions box */
.v2_122 {
  margin-top: 15px;
  padding: 15px;
  background: #f8f8f8;
  border-radius: 12px;
}

.v2_125,
.v2_124 {
  font-size: 12px;
  color: #555;
  display: block;
  margin-top: 4px;
}

/* QR image placeholder */
.v2_130 {
  width: 170px;
  height: 170px;
  /* background: #ddd; */
  margin: 10px auto;
  border-radius: 10px;
}

/* Save QR button */
.v2_126 {
  text-align: center;
  margin-top: 10px;
}

.v2_127 {
  display: inline-flex;
  align-items: center;
  background: #e6eeff;
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
}
.v2_128 {
  width: 14px;
  height: 14px;
  background: #2868f0;
  border-radius: 50%;
  margin-right: 6px;
}
.v2_129 {
  font-size: 12px;
  color: #2868f0;
  font-weight: 600;
}

/* Notice box */
.v2_77 {
  background: #fff7e0;
  padding: 12px 14px;
  border-left: 4px solid #f0b928;
  border-radius: 10px;
  margin-top: 18px;
}

.v2_82 {
  font-size: 14px;
  font-weight: bold;
}

.v2_80,
.v2_81 {
  font-size: 12px;
  color: #444;
  display: block;
  margin-top: 4px;
}

/* UPI section */
.v2_92 {
  margin-top: 20px;
}

.v2_103 {
  background: #f0f6ff;
  border: 1px solid #dce7ff;
  border-radius: 8px;
  padding: 10px;
  position: relative;
  margin: 10px 0;
}

.v2_108 {
  font-size: 14px;
  font-weight: bold;
}

.v2_105 {
  position: absolute;
  right: 10px;
  top: 8px;
  background: #2868f0;
  color: #fff;
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
}

.v2_101,
.v2_95,
.v2_102 {
  font-size: 12px;
  color: #666;
}

/* Payment app icons placeholders */
.v2_97,
.v2_98,
.v2_99,
.v2_100 {
  width: 55px;
  height: 55px;
  background: #eee;
  border-radius: 12px;
  display: inline-block;
  margin-right: 8px;
}

/* UTR section */
.v2_91 {
  display: block;
  font-weight: bold;
  margin-top: 20px;
}

.v2_90 {
  display: block;
  font-size: 12px;
  color: #2868f0;
  margin-bottom: 6px;
}

.v2_87 {
  background: #f5f5f5;
  padding: 10px 12px;
  border-radius: 8px;
}

.v2_89 {
  font-size: 14px;
  color: #666;
}

/* Submit button */
.v2_83 {
  margin-top: 20px;
}

.v2_85 {
  background: #2868f0;
  padding: 12px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
}

.v2_86 {
  font-size: 15px;
  font-weight: bold;
  color: #fff;
}

/* Modal fade animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

/* Toast message */
/* .toast-content {
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);
  background: #333;
  padding: 12px 20px;
  border-radius: 6px;
  color: #fff;
  font-size: 13px;
  z-index: 999;
} */

 .pays ul {
  list-style: none;
  padding: 0;
}

.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}

.inner div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.inner img {
  width: 40px;
  height: 40px;
}
</style>
