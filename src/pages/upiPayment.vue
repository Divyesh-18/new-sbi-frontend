<template>
  <div class="n-config-provider" style="height: 100vh; overflow-x: hidden">
    <div data-v-58cd6e5d="" role="none" class="n-flex" style="
        display: flex;
        flex-flow: column;
        justify-content: start;
        align-items: center;
        gap: 0px;
      ">
      <!---->
      <header data-v-58cd6e5d="" class="header">
        <img data-v-58cd6e5d="" src="../assets/images/upi.png" /><span data-v-58cd6e5d="">Payment</span>
      </header>
      <div data-v-58cd6e5d="" class="payupi_expire" style="margin-bottom: 8px">
        <div data-v-58cd6e5d="" role="none" class="n-flex" style="
            display: flex;
            flex-flow: wrap;
            justify-content: space-between;
            gap: 8px 12px;
          ">
          <div data-v-58cd6e5d="" role="none" class="n-flex" style="
              display: flex;
              flex-flow: column;
              justify-content: start;
              gap: 0px;
            ">
            <div data-v-58cd6e5d="" class="amount">
              <span data-v-58cd6e5d="">₹</span> {{ userAmount }}
            </div>
            <!-- <span data-v-58cd6e5d="" class="old_amount">₹ 300.00</span> -->
          </div>
          <div data-v-58cd6e5d="" role="none" class="n-flex countdown" style="
              display: flex;
              flex-flow: wrap;
              justify-content: start;
              align-items: center;
              gap: 1px 15px;
              background-color: #305ac2;
              margin-top: 20px;
              margin-bottom: 10px;
              padding: 0px 10px 8px;
              border-radius: 10px;
            ">
            <i data-v-58cd6e5d="" role="img" class="n-icon" style="
                color: #fff;
                --n-bezier: cubic-bezier(0.4, 0, 0.2, 1);
                font-size: 2rem;
              "><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 1024 1024">
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
                  fill="currentColor"></path>
                <path
                  d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
                  fill="currentColor"></path>
              </svg></i>
            <span style="color: #fff; padding-top: 10px">{{
              formattedTimer
              }}</span>
          </div>
        </div>
        <div data-v-58cd6e5d="" role="none" class="n-flex" style="
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            gap: 0px;
          ">
          <div data-v-58cd6e5d="" class="order_title">UPI:</div>
          <div data-v-58cd6e5d="" role="none" class="n-flex" style="
              display: flex;
              flex-flow: wrap;
              justify-content: start;
              gap: 0px;
            ">
            <span data-v-58cd6e5d="" class="red_title">{{ UPIID }}</span><i data-v-58cd6e5d="" class="copy n-icon"
              @click="onCopy" role="img" style="
                --n-bezier: cubic-bezier(0.4, 0, 0.2, 1);
                font-size: 1.8rem;
              "><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512">
                <path
                  d="M408 480H184a72 72 0 0 1-72-72V184a72 72 0 0 1 72-72h224a72 72 0 0 1 72 72v224a72 72 0 0 1-72 72z"
                  fill="currentColor"></path>
                <path
                  d="M160 80h235.88A72.12 72.12 0 0 0 328 32H104a72 72 0 0 0-72 72v224a72.12 72.12 0 0 0 48 67.88V160a80 80 0 0 1 80-80z"
                  fill="currentColor"></path>
              </svg></i>
          </div>
        </div>
      </div>
      <div data-v-58cd6e5d="" class="payupi_content">
        <div data-v-58cd6e5d="" class="pay_title">
          Use Mobile Scan code to pay
        </div>
        <div data-v-58cd6e5d="" class="n-qr-code qr_scan" id="qr-code" style="
            background-color: rgb(255, 255, 255);
            width: 120px;
            height: 120px;
            --n-border-radius: 3px;
          ">
          <img width="240" height="240" :src="thad_qr_code"
            style="width: 120px; height: 120px; padding: 10px 0px;" />
        </div>
        <button data-v-58cd6e5d="" class="n-button n-button--default-type n-button--medium-type qr_scan" tabindex="0"
          type="button" style="
            --n-bezier: cubic-bezier(0.4, 0, 0.2, 1);
            --n-bezier-ease-out: cubic-bezier(0, 0, 0.2, 1);
            --n-ripple-duration: 0.6s;
            --n-opacity-disabled: 0.5;
            --n-wave-opacity: 0.6;
            --n-font-weight: 400;
            --n-color: #0000;
            --n-color-hover: #0000;
            --n-color-pressed: #0000;
            --n-color-focus: #0000;
            --n-color-disabled: #0000;
            --n-ripple-color: #305ac2;
            --n-text-color: #305ac2;
            --n-text-color-hover: #36ad6a;
            --n-text-color-pressed: #0c7a43;
            --n-text-color-focus: #36ad6a;
            --n-text-color-disabled: rgb(51, 54, 57);
            --n-border: 1px solid rgb(224, 224, 230);
            --n-border-hover: 1px solid #36ad6a;
            --n-border-pressed: 1px solid #0c7a43;
            --n-border-focus: 1px solid #36ad6a;
            --n-border-disabled: 1px solid rgb(224, 224, 230);
            --n-width: initial;
            --n-height: 34px;
            --n-font-size: 14px;
            --n-padding: 0 14px;
            --n-icon-size: 18px;
            --n-icon-margin: 6px;
            --n-border-radius: 3px;
          ">
          <span class="n-button__content"> Save QrCode </span>
          <div aria-hidden="true" class="n-base-wave"></div>
          <div aria-hidden="true" class="n-button__border"></div>
          <div aria-hidden="true" class="n-button__state-border"></div>
        </button>
      </div>
      <div data-v-58cd6e5d="" class="upipay">
        <div data-v-58cd6e5d="" class="upipay__title">UTR</div>
        <div data-v-58cd6e5d="" class="upipay__submit-input">
          <input data-v-58cd6e5d="" class="utr_number_input infinite-shake" type="text" inputmode="numeric"
            pattern="[0-9]*" placeholder="Input 12-digit here" show-count="" maxlength="12"
            oninput="this.value = this.value.replace(/[^0-9]/g, '')" v-model="refNo" @input="filterNumbers" />
        </div>
        <div data-v-58cd6e5d="" class="upi_button">
          <button data-v-58cd6e5d="" class="upipay__submit-button">
            <span data-v-58cd6e5d="" @click="submitPayment">Submit Ref Number</span>
          </button>
        </div>
      </div>
      <div data-v-58cd6e5d="" class="notice_paycard">
        <div data-v-58cd6e5d="" class="paycard_title">Notice</div>
        <div data-v-58cd6e5d="" class="upi__tips">
          <div data-v-58cd6e5d="" class="upi__tips__content">
            <ul data-v-58cd6e5d="">
              <li data-v-58cd6e5d="" style="word-break: break-word">
                Please select a payment method and make sure you has installed
                that wallet.
              </li>
              <li data-v-58cd6e5d="" style="word-break: break-word">
                Please enter the UTR to speed up your order callback.
              </li>
              <li data-v-58cd6e5d="" style="word-break: break-word">
                Once the UTR is submitted, your order will enter the
                verification process. Please avoid placing duplicate orders.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="toast-content" v-show="isErrorShow">
    <div class="toast-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const timer = ref(600);
const formattedTimer = computed(() => {
  const minutes = Math.floor(timer.value / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timer.value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});

let countdownInterval;

// router
const router = useRouter();
const route = useRoute();

// refs
const userAmount = ref("");
const UPIID = ref("");
const qrCode = ref("");
const thad_qr_code = ref("");
const refNo = ref("");
const isErrorShow = ref(false);
const errorMessage = ref("");

// Redirect if no auth token
if (!localStorage.getItem("authToken")) {
  router.push("/login");
}

// Get amount from query param
onMounted(() => {
  if (route.query.goodsId) {
    userAmount.value = route.query.goodsId;
  } else {
    router.push("/mine");
  }
  countdownInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(countdownInterval);
      router.push("/mine"); // Redirect after 10 mins
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(countdownInterval); // Cleanup when leaving the page
});

// Get UPI ID
const getUpiId = async () => {
  try {
    const res = await axios.get("/get-upi");
    UPIID.value = res.data?.data?.third_upi_id || "";
    thad_qr_code.value = res.data?.data?.thad_qr_code || "";

  } catch (err) {
    console.error(err);
  }
};

// Get QR Code
const getQrCode = async () => {
  try {
    const res = await axios.get("/get-qr-code");
    qrCode.value = res.data?.data || "";
  } catch (err) {
    console.error(err);
  }
};

// Copy UPI ID
const onCopy = async () => {
  try {
    await navigator.clipboard.writeText(UPIID.value);
    setErrorMessage("UPI copied successfully");
  } catch {
    setErrorMessage("Failed to copy UPI, please copy manually");
  }
};
const filterNumbers = () => {
    refNo.value = refNo.value.replace(/[^0-9]/g, '');
};

// Submit Payment
const submitPayment = async () => {
    if (!refNo.value || isNaN(refNo.value)) {
        setErrorMessage("Please enter a  UTR number");
        return;
    }
    if (refNo.value.length !== 12) {
        setErrorMessage("UTR number must be 12 digits");
        return;
    }

    try {
        const res = await axios.post("/recharge", {
            amount: userAmount.value,
            rechargetype: "Cash Pay",
            reference: refNo.value,
        });

        if (res.data?.success) {
            setErrorMessage(res.data.message);
            setTimeout(() => router.push("/mine"), 4000);
        } else {
            setErrorMessage(res.data.message || "Payment failed");
        }
    } catch (err) {
        console.error(err);
        setErrorMessage("An error occurred while processing payment");
    }
};

// Toast Message
const setErrorMessage = (msg) => {
  errorMessage.value = msg;
  isErrorShow.value = true;
  setTimeout(() => {
    isErrorShow.value = false;
    errorMessage.value = "";
  }, 5000);
};

// Load data on mount
onMounted(() => {
  getUpiId();
  getQrCode();
});
</script>

<style scoped>
.header[data-v-58cd6e5d] {
  position: relative;
  background: #305ac2;
  width: 100%;
  padding: 13px 0;
  text-align: center;
  font-size: 24px;
  color: #fff;
  font-weight: 700;
}

header {
  display: block;
  unicode-bidi: isolate;
}

.header img[data-v-58cd6e5d] {
  vertical-align: middle;
  border: 0;
  width: 100px;
  height: 37px;
  object-fit: contain;
  display: inline;
}

img {
  overflow-clip-margin: content-box;
  overflow: clip;
}

.header[data-v-58cd6e5d] {
  position: relative;
  background: #305ac2;
  width: 100%;
  padding: 13px 0;
  text-align: center;
  font-size: 24px;
  color: #fff;
  font-weight: 700;
}

.payupi_expire[data-v-58cd6e5d] {
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.amount[data-v-58cd6e5d] {
  color: red;
  font-size: 1.33rem;
  padding-top: 20px;
  font-family: m-700;
}

.old_amount[data-v-58cd6e5d] {
  text-decoration: line-through;
}

.n-icon {
  height: 1em;
  width: 1em;
  line-height: 1em;
  text-align: center;
  display: inline-block;
  position: relative;
  fill: currentColor;
  transform: translateZ(0);
}

.n-button {
  margin: 0;
  font-weight: var(--n-font-weight);
  line-height: 1;
  font-family: inherit;
  padding: var(--n-padding);
  height: var(--n-height);
  font-size: var(--n-font-size);
  border-radius: var(--n-border-radius);
  color: var(--n-text-color);
  background-color: var(--n-color);
  width: var(--n-width);
  white-space: nowrap;
  outline: none;
  position: relative;
  z-index: auto;
  border: none;
  display: inline-flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier),
    opacity 0.3s var(--n-bezier), border-color 0.3s var(--n-bezier);
}

.n-button:not(.n-button--disabled):hover {
  background-color: var(--n-color-hover);
  color: var(--n-text-color-hover);
}

.n-icon svg {
  height: 1em;
  width: 1em;
}

.payupi_expire .order_title[data-v-58cd6e5d] {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.8rem;
  height: 1.8rem;
  vertical-align: middle;
}

.red_title[data-v-58cd6e5d] {
  color: #305ac2;
  line-height: 1.8rem;
  height: 1.8rem;
  font-size: 1rem;
  font-weight: 550;
}

.copy[data-v-58cd6e5d] {
  color: #305ac2;
  margin-left: 0.75rem;
}

.n-icon {
  height: 1em;
  width: 1em;
  line-height: 1em;
  text-align: center;
  display: inline-block;
  position: relative;
  fill: currentColor;
  transform: translateZ(0);
}

.payupi_content[data-v-58cd6e5d] {
  width: 100%;
  padding: 0 16px;
}

.payupi_content .pay_title[data-v-58cd6e5d] {
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0;
  padding-bottom: 0;
}

.payupi_content .qr_scan[data-v-58cd6e5d] {
  margin: 0 auto;
  display: block;
}

.n-qr-code {
  background: #fff;
  border-radius: var(--n-border-radius);
  display: inline-flex;
}

.payupi_content .qr_scan[data-v-58cd6e5d] {
  margin: 0 auto;
  display: block;
}

.n-button .n-button__content {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  min-width: 0;
}

.n-button .n-base-wave {
  pointer-events: none;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation-iteration-count: 1;
  animation-duration: var(--n-ripple-duration);
  animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
}

.n-button .n-button__border {
  border: var(--n-border);
}

.n-button .n-button__border,
.n-button .n-button__state-border {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  transition: border-color 0.3s var(--n-bezier);
  pointer-events: none;
}

.n-button .n-button__state-border {
  border: var(--n-border);
  border-color: #0000;
  z-index: 1;
}

.n-button .n-button__border,
.n-button .n-button__state-border {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  transition: border-color 0.3s var(--n-bezier);
  pointer-events: none;
}

.upipay[data-v-58cd6e5d] {
  width: 100%;
}

.upipay__title[data-v-58cd6e5d] {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
  padding-left: 16px;
}

.upipay__submit-input[data-v-58cd6e5d] {
  margin: 10px auto;
  padding: 0 16px;
}

input.utr_number_input[data-v-58cd6e5d] {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: none;
  transition: border-color 0.3s ease;
  will-change: transform;
  transform-origin: center center;
  box-shadow: 0 4px 8px #0003;
}

.upipay__submit-input input[data-v-58cd6e5d] {
  width: 100%;
  height: 45px;
  background: #f5f5f7;
  opacity: 1;
  font-size: 16px;
  text-align: center;
  font-weight: 700;
  color: #333;
  border-radius: 30px;
  border: none;
}

.upi_button[data-v-58cd6e5d] {
  padding: 0 16px;
}

.upipay__submit-button[data-v-58cd6e5d] {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  background: #3c71ce;
  text-align: center;
  line-height: 50px;
  font-weight: 700;
  border-radius: 30px;
  color: #fff;
  font-size: 16px;
  border: none;
  padding: 0 16px;
  cursor: pointer;
}

.notice_paycard[data-v-58cd6e5d] {
  width: 100%;
  padding: 16px 16px 0;
  box-sizing: border-box;
  margin-bottom: 0;
}

.notice_paycard .paycard_title[data-v-58cd6e5d] {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}

.upi__tips[data-v-58cd6e5d] {
  padding: 16px 32px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.upi__tips ul[data-v-58cd6e5d] {
  list-style: auto;
  line-height: 1.3;
  word-break: break-all;
}

ol,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.infinite-shake {
  animation: infiniteShake-58cd6e5d 0.7s infinite ease-in-out;
}

@keyframes infiniteShake-58cd6e5d {
  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }
}
</style>
