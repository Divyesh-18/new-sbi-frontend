<template>
  <Navbar />
  <div class="admin-layout">
    <SaidMenuBar />

    <!-- sidenav -->

    <div class="main-content-wrapper main-content-table Period_History">
      <div class="period_history_table">
        <h3 class="mr-0 add-bg-color-sub-header admin-site-setting-title">
          Site Setting
        </h3>
        <form class="mx-auto admin-site-setting-title" @submit.prevent="SubmitData">
          <div class="row p-1">
            <div class="col-md-6">
              <div class="form-group add-form-groups">
                <label for="upiid" class="font-weight-bold h6">UPI ID</label>
                <input type="text" class="form-control border px-2 py-1" id="upiid" v-model="UPI_ID" required />
              </div>
              <!-- <div class="form-group add-form-groups">
                  <label for="minimumrecharge" class="font-weight-bold h6"
                    >Minimum Recharge Amount</label
                  >
                  <input
                    type="text"
                    class="form-control border px-2 py-1"
                    id="minimumrecharge"
                    v-model="rechargeAmount"
                    required
                  />
                </div> -->
              <!-- <div class="form-group add-form-groups">
                  <label for="minimumwithdrawal" class="font-weight-bold h6"
                    >Minimum Withdrawal Amount</label
                  >
                  <input
                    type="number"
                    class="form-control border px-2 py-1"
                    id="minimumwithdrawal"
                    v-model="withdrawalAmount"
                    required
                  /> 
                </div>-->
              <div class="form-group add-form-groups">
                <label for="withdrawalstatus" class="font-weight-bold h6">Withdrawal Status</label>
                <select id="withdrawalstatus" class="form-control border px-2 py-1" v-model="withdrawalStatus">
                  <option :value="true">On</option>
                  <option :value="false">Off</option>
                </select>
              </div>
              <!-- <div class="form-group add-form-groups">
                  <label for="commission" class="font-weight-bold h6"
                    >Commission Rate<span class="text-danger h6"
                      >[in %]</span
                    ></label
                  >
                  <input
                    type="number"
                    step="0.01"
                    class="form-control border px-2 py-1"
                    id="commission"
                    v-model="commissionRate"
                    required
                  />
                </div> -->
              <div class="form-group add-form-groups">
                <label for="interest" class="font-weight-bold h6">Interest Rate<span class="text-danger h6">[in
                    %]</span></label>
                <input type="number" step="0.01" class="form-control border px-2 py-1" id="interest"
                  v-model="interestRate" required />
              </div>
              <div class="form-group add-form-groups">
                <label for="rechargebonus1" class="font-weight-bold h6">Recharge Bonus<span class="text-danger h6">[in
                    %]</span></label>
                <input type="number" step="0.01" class="form-control border px-2 py-1" id="rechargebonus1"
                  v-model="rechargeBonus1" required />
              </div>
              <div class="form-group add-form-groups">
                <label for="batbonus" class="font-weight-bold h6">Bat Bonus<span class="text-danger h6">[in
                    %]</span></label>
                <input type="number" step="0.01" class="form-control border px-2 py-1" id="batbonus" v-model="batBonus"
                  required />
              </div>
              <div class="form-group add-form-groups">
                <label for="qr_code" class="font-weight-bold h6">QR Code</label>
                <input type="file" class="form-control border px-2 py-1" id="qr_code"
                  @change="uploadFile('qr_code', $event)" />
              </div>
              <div class="form-group add-form-groups">
                <h3 class="mr-0 add-bg-color-sub-header admin-site-setting-title mt-4">
                  Second Payment Get Way
                </h3>
              </div>
              <div class="form-group add-form-groups">
                <label for="second_upi_id" class="font-weight-bold h6">upi id</label>
                <input type="text" class="form-control border px-2 py-1" id="second_upi_id" v-model="second_upi_id"
                  required />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group add-form-groups">
                <label for="sitename" class="font-weight-bold h6">Site Name</label>
                <input type="text" class="form-control border px-2 py-1" id="sitename" v-model="siteName" required />
              </div>
              <div class="form-group add-form-groups">
                <label for="favicon" class="font-weight-bold h6">Favicon Icon</label>
                <input type="file" class="form-control border px-2 py-1" id="favicon"
                  @change="uploadFile('favicon', $event)" />
              </div>
              <div class="form-group add-form-groups">
                <label for="logo" class="font-weight-bold h6">Logo</label>
                <input type="file" class="form-control border px-2 py-1" id="logo"
                  @change="uploadFile('logo', $event)" />
              </div>
              <div class="form-group add-form-groups">
                <label for="apk" class="font-weight-bold h6">Apk</label>
                <input type="file" class="form-control border px-2 py-1" id="apk" @change="uploadFile('apk', $event)" />
              </div>
              <div class="form-group add-form-groups">
                <label for="signupbonusamount" class="font-weight-bold h6">Signup Bonus Amount</label>
                <input type="number" class="form-control border px-2 py-1" id="signupbonusamount"
                  v-model="signupBonusAmount" required />
              </div>
              <div class="form-group add-form-groups">
                <h3 class="mr-0 add-bg-color-sub-header admin-site-setting-title mt-4">
                  third Payment Get Way
                </h3>
              </div>
              <div class="form-group add-form-groups">
                <label for="third_upi_id" class="font-weight-bold h6">upi id</label>
                <input type="text" class="form-control border px-2 py-1" id="third_upi_id" v-model="third_upi_id"
                  required />
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
      imageUploadError: "",
      siteName: "",
      UPI_ID: "",
      //  commissionRate: "",
      // rechargeAmount: "",
      // withdrawalAmount: "",
      batBonus: "",
      interestRate: "",
      rechargeBonus1: "",
      signupBonusAmount: "",
      favicon: "",
      qr_code: "",
      logo: "",
      apk: "",
      formData: new FormData(),
      withdrawalStatus: true,
      paymentSiteSettingData: {},
      tost: "",
      filetost: "",
      loader: false,
      second_upi_id:"",
      third_upi_id:""
    };
  },
  methods: {
    uploadFile(type, event) {
      const file = event.target.files[0];
      this.formData.append(type, file);
    },
    async SubmitData() {
      try {
        this.formData.append("UPI_ID", this.UPI_ID);
        //  this.formData.append("commission_rate", this.commissionRate);
        // this.formData.append("rechargeamount", this.rechargeAmount);
        // this.formData.append("withdrawalamount", this.withdrawalAmount);
        this.formData.append("batbonus", this.batBonus);
        this.formData.append("interest_rate", this.interestRate);
        this.formData.append("rechargebonus1", this.rechargeBonus1);
        this.formData.append("sitename", this.siteName);
        this.formData.append("signupbonusamount", this.signupBonusAmount);
        this.formData.append("withdrawal_status", this.withdrawalStatus);
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
      this.siteName = this.paymentSiteSettingData?.sitename;
      this.UPI_ID = this.paymentSiteSettingData?.UPI_ID;
      // this.commissionRate = this.paymentSiteSettingData?.commission_rate;
      // this.rechargeAmount = this.paymentSiteSettingData?.rechargeamount;
      // this.withdrawalAmount = this.paymentSiteSettingData?.withdrawalamount;
      this.batBonus = this.paymentSiteSettingData?.batbonus;
      this.interestRate = this.paymentSiteSettingData?.interest_rate;
      this.rechargeBonus1 = this.paymentSiteSettingData?.rechargebonus1;
      this.signupBonusAmount = this.paymentSiteSettingData?.signupbonusamount;
      this.withdrawalStatus = this.paymentSiteSettingData?.withdrawal_status;
      this.second_upi_id = this.paymentSiteSettingData?.second_upi_id;
      this.third_upi_id = this.paymentSiteSettingData?.third_upi_id;
      this.loader = false;
    },
    ResetForm() {
      const formElements = ["favicon", "qr_code", "logo", "apk"];
      formElements.forEach((elementId) => {
        document.getElementById(elementId).value = "";
      });

      this.formData = new FormData();
    },
  },
  created() {
    this.getPaymentSiteSettingData();
  },
};
</script>
