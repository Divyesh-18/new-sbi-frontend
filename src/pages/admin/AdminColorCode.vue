<template>
    <Navbar />
    <div class="admin-layout">
        <SaidMenuBar />

        <!-- sidenav -->

        <div class="main-content-wrapper main-content-table Period_History">
            <div class="period_history_table">
                <h3 class="mr-0 add-bg-color-sub-header admin-site-setting-title">
                    Admin Secret Setting
                </h3>
                <form class="mx-auto admin-site-setting-title" @submit.prevent="SubmitData">
                    <div class="row p-1">
                        <div class="col-md-6">
                            <div class="form-group add-form-groups">
                                <label for="theme_color" class="font-weight-bold h6">Theme Color</label>
                                <input type="color" class="form-control border px-2 py-1" id="color_code"
                                    v-model="theme_color" style="height: 50px; cursor: pointer; appearance: none;"
                                    @input="validateHexColor" required />
                            </div>
                            <div class="form-group add-form-groups">
                                <label for="theme_color" class="font-weight-bold h6">Color Hex Code</label>
                                <input type="text" class="form-control" v-model="theme_color" @input="validateHexColor"
                                    placeholder="#000000" required />
                            </div>
                            <div class="form-group add-form-groups">
                                <label for="minimum_recharge_amount" class="font-weight-bold h6"> Minimum Recharge
                                    Amount</label>
                                <input type="number" inputmode="numeric" class="form-control border px-2 py-1"
                                    id="minimum_recharge_amount" v-model="minimum_recharge_amount" required />
                            </div>
                            <div class="form-group add-form-groups">
                                <h3 class="mr-0 add-bg-color-sub-header admin-site-setting-title mt-4">
                                    Second Payment Get Way
                                </h3>
                            </div>
                            <div class="form-group add-form-groups">
                                <label for="second_upi_id" class="font-weight-bold h6">UPI ID</label>
                                <input type="text" class="form-control border px-2 py-1" id="second_upi_id"
                                    v-model="second_upi_id" required />
                            </div>
                            <div class="form-group add-form-groups">
                                <h3 class="mr-0 add-bg-color-sub-header admin-site-setting-title mt-4">
                                    USDT Payment Get Way
                                </h3>
                            </div>
                            <div class="form-group add-form-groups">
                                <label for="usdt_rate" class="font-weight-bold h6">USDT Rate</label>
                                <input type="number" inputmode="numeric" class="form-control border px-2 py-1"
                                    id="usdt_rate" v-model="usdt_rate" required />
                            </div>
                            <div class="form-group add-form-groups">
                                <label for="usdt_code" class="font-weight-bold h6">USDT TRON</label>
                                <input type="text" class="form-control border px-2 py-1" id="usdt_code"
                                    v-model="usdt_code" required />
                            </div>
                            <div class="form-group add-form-groups">
                                <label for="usdt_id" class="font-weight-bold h6">USDT CODE </label>
                                <input type="text" class="form-control border px-2 py-1" id="usdt_id" v-model="usdt_id"
                                    required />
                            </div>
                            <div class="form-group add-form-groups">
                                <label for="usdt_qr" class="font-weight-bold h6">USDT QRCode</label>
                                <input type="file" class="form-control border px-2 py-1" id="usdt_qr"
                                    @change="uploadFile('usdt_qr', $event)" />
                            </div>
                            <div class="form-group add-form-groups">
                                <button @click="confirmClearHistory" class="btn btn-danger d-block  mt-3">
                                    All User Delete
                                </button>
                            </div>

                        </div>
                        <div class="col-md-6">
                            <div class="form-group add-form-groups">
                                <label for="telegram_link" class="font-weight-bold h6">Telegram Link</label>
                                <input type="text" class="form-control border px-2 py-1" id="telegram_link"
                                    v-model="telegram_link" required />
                            </div>
                            <div class="form-group add-form-groups">
                                <label for="qr_code" class="font-weight-bold h6">QR Code</label>
                                <input type="file" class="form-control border px-2 py-1" id="qr_code"
                                    @change="uploadFile('qr_code', $event)" />
                            </div>
                            <div class="form-group add-form-groups">
                                <label for="minimum_withdrawal_amount" class="font-weight-bold h6"> Minimum Withdrawal
                                    Amount</label>
                                <input type="number" class="form-control border px-2 py-1"
                                    id="minimum_withdrawal_amount" v-model="minimum_withdrawal_amount" required />
                            </div>
                            <div class="form-group add-form-groups">
                                <h3 class="mr-0 add-bg-color-sub-header admin-site-setting-title mt-4">
                                    third Payment Get Way
                                </h3>
                            </div>
                            <div class="form-group add-form-groups">
                                <label for="third_upi_id" class="font-weight-bold h6">UPI ID</label>
                                <input type="text" class="form-control border px-2 py-1" id="third_upi_id"
                                    v-model="third_upi_id" required />
                            </div>
                            <div class="form-group add-form-groups">
                                <label for="thad_qr_code" class="font-weight-bold h6">QR Code</label>
                                <input type="file" class="form-control border px-2 py-1" id="thad_qr_code"
                                    @change="uploadFile('thad_qr_code', $event)" />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-outline-dark d-block mx-auto admin-site-setting-buttons">
                            Submit
                        </button>
                    </div>

                </form>

            </div>
        </div>

    </div>
    <div v-bind:class="this.tost ? 'login-set-tost bg-dark text-white' : 'd-none'">
        {{ this.tost }}
    </div>
    <div v-bind:class="this.filetost ? 'file-upload-error' : 'd-none'">
        {{ this.filetost }}
    </div>
    <!-- loader -->
    <div class="loadings" v-show="loader">
        <AdminLoader />
    </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar.vue";
import SaidMenuBar from "./SideMenuBar.vue";
import AdminLoader from "./AdminLoaders.vue";
export default {
    name: "AdminSetting",
    components: {
        Navbar,
        SaidMenuBar,
        AdminLoader,
    },
    data() {
        return {
            theme_color: "",
            telegram_link: "",
            formData: new FormData(),
            tost: "",
            filetost: "",
            loader: false,
            minimum_recharge_amount: 0,
            minimum_withdrawal_amount: 0,
            second_upi_id: "",
            third_upi_id: "",
            usdt_rate:1,
            usdt_code:"",
            usdt_id:"",
        };
    },
    methods: {
        uploadFile(type, event) {
            const file = event.target.files[0];
            this.formData.append(type, file);
        },
        async SubmitData() {
            try {
                this.formData.append("theme_color", this.theme_color);
                this.formData.append("telegram_link", this.telegram_link);
                this.formData.append("minimum_recharge_amount", this.minimum_recharge_amount);
                this.formData.append("usdt_rate", this.usdt_rate);
                this.formData.append("usdt_code", this.usdt_code);
                this.formData.append("usdt_id", this.usdt_id);
                this.formData.append("minimum_withdrawal_amount", this.minimum_withdrawal_amount);
                this.formData.append("second_upi_id", this.second_upi_id);
                this.formData.append("third_upi_id", this.third_upi_id);

                await axios.put(`admin/sitsetting`, this.formData);
                this.ResetForm();
                setTimeout(() => {
                    this.tost = "Form Upload Successfully";
                }, 1000);
                setTimeout(() => {
                    this.tost = "";
                }, 5000);
            } catch (error) {
                console.log(error);
                setTimeout(() => {
                    this.filetost = "Invalid file format";
                }, 1000);
                setTimeout(() => {
                    this.filetost = "";
                    this.ResetForm();
                }, 5000);
            }
        },
        async getPaymentSiteSettingData() {
            this.loader = true;
            const response = await axios.get("/admin/getSiteSettingInputDefaultData");
            this.paymentSiteSettingData = response?.data?.data;
            this.theme_color = this.paymentSiteSettingData.theme_color;
            this.telegram_link = this.paymentSiteSettingData?.telegram_link;
            this.minimum_withdrawal_amount = this.paymentSiteSettingData?.minimum_withdrawal_amount;
            this.minimum_recharge_amount = this.paymentSiteSettingData?.minimum_recharge_amount;
            this.usdt_rate = this.paymentSiteSettingData?.usdt_rate;
            this.usdt_code = this.paymentSiteSettingData?.usdt_code;
            this.usdt_id = this.paymentSiteSettingData?.usdt_id;
            this.second_upi_id = this.paymentSiteSettingData?.second_upi_id;
            this.third_upi_id = this.paymentSiteSettingData?.third_upi_id;
            this.loader = false;
        },
        confirmClearHistory() {
            if (confirm("Are you sure you want to clear the history?")) {
                this.clearHistoryData();
            }
        },
        async clearHistoryData() {
            try {
                this.loader = true;
                await axios.delete("/admin/clear-history");
                this.loader = false;
                this.tost = "History cleared successfully";
                setTimeout(() => { this.tost = ""; }, 5000);
            } catch (error) {
                console.error("Error clearing history:", error);
                this.loader = false;
                this.filetost = "Error clearing history";
                setTimeout(() => { this.filetost = ""; }, 5000);
            }
        },
        ResetForm() {
            this.formData = new FormData();
        },
    },
    created() {
        this.getPaymentSiteSettingData();
    },
};
</script>