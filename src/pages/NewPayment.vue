<template>
    <div class="payment-page">
        <div class="payment-card">
            <!-- Header -->
            <div class="payment-header">
                <h6>payment</h6>
            </div>

            <!-- Amount -->
            <div class="payment-amount mb-3">
                <p class="amount-label">Amount Payable</p>
                <p class="amount">₹{{ userAmount }}</p>
                <p class="payment-timer">{{ formattedTimer }}</p>
                <p>Use Mobile Scan code to pay</p>
            </div>

            <!-- QR Section -->
            <div class="qr-section">
                <img :src="qrCode" alt="QR Code" />
                <ul class="instructions mt-3">
                    <li>1. For iOS phones, long-press the QR code and enter the wallet for payment.</li>
                    <li>2. For Android phones, screenshot & manually upload the QR code.</li>
                    <!-- <li>3. Please avoid making duplicate payments.</li> -->
                    <li>3. After completing, fill in the 12-digit UTR below.</li>
                </ul>
            </div>

            <!-- Manual Transfer -->
            <div class="manual-transfer">
                <p class="step">1. Copy the below given UPI</p>
                <div class="input-row">
                    <input type="text" readonly :value="UPIID" />
                    <button @click="onCopy">COPY</button>
                </div>
                <p class="tip">Tip: Don't save the UPI, get new UPI every time.</p>

                <p class="step">2. Need to enter your 12 Ref No (UTR)</p>
                <input type="text" v-model="refNo" placeholder="Ref No." />
                <p class="tip">Tip: Open your UP wallet and complete the transfer. Record your reference No.</p>

                <button class="submit-btn" @click="submitPayment">Submit</button>
            </div>

            <!-- Notes -->
            <div class="notes">
                <p>1. Please make sure you have installed the app</p>
                <p>2. Don’t pay for the same link repeatedly</p>
            </div>

            <div class="notes2">
                <h3>Notice:</h3>
                <p>1. Please select the payment method you need and make sure your phone has the corresponding wallet
                    software installed.</p>
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
    const minutes = Math.floor(timer.value / 60).toString().padStart(2, "0");
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
        UPIID.value = res.data?.data?.UPI_ID || "";
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

// Submit Payment
const submitPayment = async () => {
    if (!refNo.value || refNo.value.length !== 12 || isNaN(refNo.value)) {
        setErrorMessage("Invalid Ref Number");
        return;
    }

    try {
        const res = await axios.post("/recharge", {
            amount: userAmount.value,
            rechargetype: "Qe Pay",
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
.payment-card {
    width: 100%;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px #ccc;
    box-sizing: border-box;
    padding-bottom: 100px;
    margin: 0 auto;
}

.payment-header {
    text-align: center;
    margin-bottom: 20px;
    background-color: #5f269f;
    padding: 25px;
}

.payment-header h6 {
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    margin: 0;
}

.payment-amount {
    text-align: center;
}

.amount-label {
    color: #666;
    font-size: 20px;
}

.amount {
    color: #6f2da8;
    font-size: 28px;
    font-weight: bold;
    margin: 10px 0;
}

.payment-timer {
    color: red;
    font-size: 20px;
}

.qr-section {
    text-align: center;
    margin: 20px;
    border: 1px solid #ababab;
    border-radius: 10px;
    padding: 20px;
}

.qr-section img {
    max-width: 250px;
    width: 100%;
    height: auto;
}

.qr-section .instructions {
    font-size: 15px;
    color: #555;
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: left;
}

.qr-section .instructions li {
    font-size: 15px;
    margin-bottom: 5px;
}

.manual-transfer {
    margin: 20px;
    border: 1px solid #ababab;
    border-radius: 10px;
    padding: 20px;
}

.step {
    font-size: 20px;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 5px;
}

.input-row {
    display: flex;
    margin-bottom: 5px;
}

.input-row input {
    flex: 1;
    padding: 6px;
    font-size: 12px;
}

.input-row button {
    background: #007bff;
    color: #fff;
    border: none;
    padding: 6px 20px;
    cursor: pointer;
    font-size: 12px;
    border-radius: 0 10px 10px 0px;
    margin-left: -7px;
}

.manual-transfer input[type="text"] {
    width: 100%;
    padding: 6px;
    font-size: 20px;
    margin-bottom: 0px;
    border-radius: 10px;
}

.tip {
    font-size: 12px;
    color: #ee955a;
    margin-bottom: 10px;
}

.submit-btn {
    width: 100%;
    padding: 12px;
    background: #99ccff;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    border-radius: 10px;
}

.notes,
.notes2 {
    margin: 20px;
    border: 1px solid #ababab;
    border-radius: 10px;
    padding: 10px 20px;
}

.notes p {
    font-size: 15px;
    color: #f33;
    margin: 0 0 5px 0;
}

.notes2 h3 {
    font-size: 20px;
    margin-bottom: 5px;
}

.notes2 p {
    font-size: 15px;
    color: #555;
    margin: 0;
}

@media (max-width: 768px) {
    .payment-card {
        /* padding: 15px; */
    }

    .qr-section img {
        max-width: 150px;
    }
    .manual-transfer input[type="text"][data-v-06b8beea]{
        font-size: 16px;
    }
    .manual-transfer input[type="text"] {
        font-size: 16px;
    }

    .submit-btn[data-v-06b8beea]{
        font-size: 16px;
        padding: 5px;
    }
    .payment-card[data-v-06b8beea] {
        padding-bottom: 50px;
    }
    .step[data-v-06b8beea]{
        font-size: 16px;
    }
    .notes2 p[data-v-06b8beea]{
        font-size: 14px;
    }
    .notes2 h3[data-v-06b8beea]{
        font-size: 18px;
        margin-bottom: 5px;
    }
    .qr-section .instructions li[data-v-06b8beea]{
        font-size: 14px;
    }
}
</style>
