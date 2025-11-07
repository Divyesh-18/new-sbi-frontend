<template>
    <div class="payment-page d-flex justify-content-center align-items-start py-4">
        <div class="card shadow-lg payment-card">
            <!-- Header -->
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
                <h3 class="mb-0">₹{{ amount.toFixed(2) }}</h3>
                <div class="timer d-flex align-items-center">
                    <i class="bi bi-clock me-2"></i>
                    <span>{{ formattedTimer }}</span>
                </div>
            </div>

            <!-- Body -->
            <div class="card-body card-body-padding">
                <!-- QR Section -->
                <div class="border p-3 mb-4 text-center card-border mobile-card-padding">
                    <p class="fw-semibold text-primary text-size-color">Scan QR code to Pay:</p>
                    <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code" class="qr-image my-2" />
                    <p class="text-muted small">
                        Do not use the same QR code to pay multiple times.
                    </p>
                </div>

                <!-- Payment Options -->
                <div class="text-center p-3 mb-4 payment-card-boader mobile-card-padding">
                    <p class="fw-semibold text-primary text-size-color">Or Click a payment method</p>
                    <div class="d-flex justify-content-center gap-3 flex-wrap">
                        <button class="btn btn-outline-secondary d-flex align-items-center gap-2 px-3">
                            <img src="../assets/images/download (13).png" alt="Paytm" class="logo-img" />
                            <i class="bi bi-chevron-right"></i>
                        </button>
                        <button class="btn btn-outline-secondary d-flex align-items-center gap-2 px-3">
                            <img src="../assets/images/download (12).png" alt="PhonePe" class="logo-img" />
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>
                </div>

                <!-- UPI Info -->
                <div class="border p-3 mb-4 payment-bottom-card-boader mobile-card-padding">
                    <p class="fw-semibold text-primary text-size-color">
                        Or Copy UPI to Payment Software
                    </p>

                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <span class="fw-semibold semibold-front">UPI:</span>
                            <span class="sem-front">{{ upiId }}</span>
                        </div>
                        <button class="btn btn-sm btn-payment-copy" @click="copyToClipboard(upiId)">
                            Copy
                        </button>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="fw-semibold semibold-front">Amount:</span>
                            <span class="sem-front">₹{{ amount.toFixed(2) }}</span>
                        </div>
                        <button class="btn btn-sm btn-payment-copy" @click="copyToClipboard(amount.toFixed(2))">
                            Copy
                        </button>
                    </div>
                </div>

                <!-- UTR Input -->
                <div class="input-payment-top-bottom-padding mb-3">
                    <input type="text" v-model="utr" maxlength="12" placeholder="Please enter the UTR (12 digits)"
                        class="form-control payment-input" />
                </div>

                <button class="btn submit-btn w-100" @click="submitUTR">Submit UTR</button>

                <p class="text-danger small mt-3">
                    <strong>Notice:</strong> Please enter the UTR once you've paid. Doing so will ensure your order is
                    processed faster and more securely.
                </p>
            </div>
        </div>

        <!-- Toast -->
        <div v-if="toast.show" class="toast-popup">
            {{ toast.message }}
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

// State
const router = useRouter();
const route = useRoute();

const timer = ref(600); // 10 mins
const amount = ref(0);
const upiId = ref("");
const qrCodeUrl = ref("");
const utr = ref("");

const toast = ref({ show: false, message: "" });

// Computed timer
const formattedTimer = computed(() => {
    const minutes = Math.floor(timer.value / 60)
        .toString()
        .padStart(2, "0");
    const seconds = (timer.value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
});

// Timer countdown
let countdownInterval;
onMounted(() => {
    if (route.query.goodsId) {
        amount.value = parseFloat(route.query.goodsId);
    } else {
        router.push("/mine");
    }

    countdownInterval = setInterval(() => {
        if (timer.value > 0) {
            timer.value--;
        } else {
            clearInterval(countdownInterval);
            router.push("/mine");
        }
    }, 1000);

    getUpiId();
    getQrCode();
});

onUnmounted(() => {
    clearInterval(countdownInterval);
});

// ✅ Fetch UPI ID
const getUpiId = async () => {
    try {
        const res = await axios.get("/get-upi");
        upiId.value = res.data?.data?.UPI_ID || "upi@bank";
    } catch (err) {
        console.error(err);
    }
};

// ✅ Fetch QR Code
const getQrCode = async () => {
    try {
        const res = await axios.get("/get-qr-code");
        qrCodeUrl.value = res.data?.data || "";
    } catch (err) {
        console.error(err);
    }
};

// ✅ Copy function
const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        showToast("Copied successfully!");
    } catch {
        showToast("Failed to copy, please copy manually");
    }
};

// ✅ Submit UTR
const submitUTR = async () => {
    if (!utr.value || utr.value.length !== 12 || isNaN(utr.value)) {
        showToast("Invalid UTR (must be 12 digits)");
        return;
    }

    try {
        const res = await axios.post("/recharge", {
            amount: amount.value,
            rechargetype: "UPI Payment",
            reference: utr.value,
        });

        if (res.data?.success) {
            showToast(res.data.message || "Payment submitted successfully!");
            setTimeout(() => router.push("/mine"), 4000);
        } else {
            showToast(res.data.message || "Payment failed");
        }
    } catch (err) {
        console.error(err);
        showToast("An error occurred while processing payment");
    }
};

// ✅ Toast
const showToast = (message) => {
    toast.value = { show: true, message };
    setTimeout(() => (toast.value.show = false), 3000);
};
</script>

<style scoped>
.sem-front{
    font-size: 18px;
    font-weight: bold;
}
.semibold-front{
    font-size: 24px;
}
.payment-page {
    /* min-height: 100vh; */
    background: #f8f9fa;
}
.bg-primary{
    background-color: #1887ff !important;
}
.card-body-padding{
     padding: 30px;
}
.card-border{
        border: 10px solid #3a87ff !important;
        border-radius: 10px 10px 0 0;
}
.btn-outline-secondary{
    width: 100%;
    justify-content:space-between !important;
    border-radius: 10px !important;
    margin-bottom: 20px;
}
.mb-4{
    margin-bottom:  0px !important;
}
.submit-btn{ 
    background-color: #1887ff !important;
    color: white !important;
    font-weight: 600 !important;
    margin: 0px !important;
}
.btn-payment-copy{
    background-color: #1887ff !important;
    color: white !important;
    border-radius: 10px;
}
.payment-input{
        color: #1b2c42 !important;
        border-radius: 5px !important;
        width: 100% !important;
        font-size: 16px;
        line-height: unset;
        height: unset;
        padding: 10px !important;
        font-weight: unset;
        border: 2px solid #5f5f5f !important;
}
.text-size-color{
    font-size: 20px !important;
    font-weight: 800;
    text-align: start;
}
.payment-card-boader{
    border: 10px solid #3a87ff !important;
}
.payment-bottom-card-boader{
    border: 10px solid #3a87ff !important;
    border-radius: 0px 0px 10px 10px;   
}
.input-payment-top-bottom-padding{
     padding: 30px 0;
}
.timer{
    background: unset !important;
    color: #fff !important;
}
.payment-card {
    width: 100%;
    /* max-width: 420px; */
    border-radius: 1rem;
    overflow: hidden;
}

.card-header {
    border-bottom: none;
}

.qr-image {
    width: 150px;
    height: 150px;
    object-fit: contain;
}

.logo-img {
    height: 40px;
}
.bi-chevron-right{
     color: #000 !important;
     font-size: 25px;
}

.toast-popup {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    animation: fadeInOut 1.5s;
}
@media only screen and (max-width: 576px) {
     .card-body-padding{
         padding: 20px;
     }
     .mobile-card-padding{ 
        padding:10px !important;
     }
     .input-payment-top-bottom-padding {
        margin-bottom: 0px !important;
        padding-bottom: 25px;
     }
     .logo-img{
         height: 43px;
         width: 80px;
     }
}
@keyframes fadeInOut {
    0% {
        opacity: 0;
        transform: translate(-50%, 10px);
    }

    10% {
        opacity: 1;
        transform: translate(-50%, 0);
    }

    90% {
        opacity: 1;
        transform: translate(-50%, 0);
    }

    100% {
        opacity: 0;
        transform: translate(-50%, 10px);
    }
}
</style>
