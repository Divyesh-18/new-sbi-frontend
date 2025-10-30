<template>
  <Navbar />
  <div class="admin-layout">
    <SaidManuBar />
    <!-- sidenav -->
    <!-- <div class="alluser-content col-lg-10 col-md-9 col-sm-8 col-12 p-1 bg-white bg-gradient proper-table"> -->
    <div class="main-content-wrapper main-content-table Period_History">
      <div class="period_history_table">

        <h3 class="alluser-title p-1 ml-0 mr-0 m-1 add-bg-color-sub-header">
          All Users
        </h3>
        <div class="d-flex align-items-start flex-column flex-sm-row gap-2">
          <label for="autoLoginId" style="min-width: 125px; padding-top: 2px;">
            Next Auto Login Id:
          </label>
          <div class="flex-grow-1">
            <input type="text" id="autoLoginId" v-model="autoLoginId" @input="autoId()" placeholder="Enter login id" />
            <p class="text-danger mt-1 mb-0" v-if="autoLoginError">
              {{ autoLoginError }}
            </p>
          </div>
        </div>
        <nav class="navbar pr-0 pl-0">
          <div class="select_bar">
            Show
            <select v-model="pagerow" @change="getAllUserInformation">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            entries
          </div>
          <div class="alluser-search-box d-flex ml-auto" role="search">
            <label>Search:</label>
            <input class="form-control p-1" v-model="searchTerms" @input="search()" type="search" aria-label="Search"
              id="input" />
          </div>
        </nav>
        <div class="table-responsive table-responsive-sm">
          <table class="alluser-table table" v-if="loader === false">
            <thead>
              <tr>
                <th scope="col" class="font-weight-bold text-center">
                  <span>#</span>
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('mobile')"></i>ID(Auto Login)
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('mobile')"></i>Phone
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('code')"></i>Referid
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('owncode')"></i>Referby
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('password')"></i>Password
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer"
                    @click="sort('userwallet.totalUserWallet')"></i>Wallet
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('userfirstrecharge.amount')"></i>First
                  Recharge
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer"
                    @click="sort('userrechargeamount.totalRechargeAmount')"></i>Total Recharge
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer"
                    @click="sort('userwithdrawals.userTotleWithdarawals')"></i>Total Withdrawal
                </th>
                <th scope="col" class="font-weight-bold text-center">Bank</th>
                <th scope="col" class="font-weight-bold text-center">
                  Action
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('created_at')"></i>Create Date
                </th>
              </tr>
            </thead>
            <tbody v-if="allUserData?.length > 0">
              <tr v-for="(data, index) in allUserData" :key="index">
                <td scope="col" class="text-center">{{ index + 1 }}</td>
                <td scope="col" class="text-center">
                  {{ data?.loginId || 0 }}
                </td>
                <td scope="col" class="text-center">
                  {{ data?.mobile || 0 }}
                </td>
                <td scope="col" class="text-center">
                  {{ data?.owncode || 0 }}
                </td>
                <td scope="col" class="text-center">
                  {{ data?.code || " - " }}
                </td>
                <td scope="col" class="text-center">
                  {{ data.password || 0 }}
                </td>
                <td scope="col" class="text-center cursor-pointer" @click="
                  (isEditWalletsModalVisible = true), openModal(data?._id)
                  ">
                  {{ (data?.userwallet?.totalUserWallet || 0)?.toFixed(2) }}
                  <i class="bi bi-pencil-square cursor-pointer"></i>
                </td>
                <td scope="col" class="text-center">
                  {{ data?.userfirstrecharge?.totalFirstRechargeAmount || 0 }}
                </td>
                <td scope="col" class="text-center">
                  {{ data?.userrechargeamount?.totalRechargeAmount || 0 }}
                </td>
                <td scope="col" class="text-center">
                  {{ data?.userwithdrawals?.withdrawalAmount || 0 }}
                </td>
                <td scope="col" class="setcoustomewith">
                  <div>
                    <span class="font-weight-bold pr-1">UPI:</span>
                    {{
                      data?.userbankdetail?.upi === undefined ||
                        data?.userbankdetail?.upi === null ||
                        data?.userbankdetail?.upi === ""
                        ? " - "
                        : data?.userbankdetail?.upi
                    }}
                  </div>
                  <div>
                    <span class="font-weight-bold pr-1">Bank:</span>
                    {{
                      data?.userbankdetail?.bank_code
                        ? data?.userbankdetail?.bank_code?.toUpperCase()
                        : " - "
                    }}
                  </div>
                  <div>
                    <span class="font-weight-bold pr-1">AC No:</span>
                    {{ data?.userbankdetail?.bank_account || " - " }}
                  </div>
                  <div>
                    <span class="font-weight-bold pr-1">IFSC:</span>
                    {{ data?.userbankdetail?.ifsc_code || " - " }}
                  </div>
                  <div>
                    <span class="font-weight-bold pr-1">Name:</span>
                    {{ data?.userbankdetail?.name?.toUpperCase() || " - " }}
                    <span>
                      <i class="h6 bi bi-pencil-square cursor-pointer" @click="() => openBankDetailModal(data?._id)">
                      </i>
                    </span>
                  </div>
                </td>
                <td>
                  <div class=" d-flex">
                    <div class="">
                      <router-link :to="`/dgklhtobgoijbrtoidfbgfgerjot/adminusergamehistory/${data?._id}`">
                        <button class="btn btn-success action-alluser-btn font-weight-bold">
                          Play History
                        </button>
                      </router-link>
                    </div>
                    <div class="ml-1">
                      <button v-bind:class="data?.status === true
                        ? 'btn btn-success action-alluser-btn font-weight-bold'
                        : 'btn btn-danger action-alluser-btn font-weight-bold'
                        " v-on:click="adminUpdateActive(data?._id)">
                        {{ data?.status === true ? "Active" : "Block" }}
                      </button>
                    </div>
                  </div>

                  <div class="d-flex">
                    <!-- <div class="mt-1">
                      <button class="btn btn-warning action-alluser-btn font-weight-bold" v-on:click="
                        (isEditUserModalVisible = true),
                        showModal(data?._id)
                        ">
                        Edit
                      </button>
                    </div> -->
                    <div class="mt-1">
                      <button v-bind:class="data?.play === false
                        ? 'btn btn-success action-alluser-btn font-weight-bold'
                        : 'btn btn-danger action-alluser-btn font-weight-bold'
                        " v-on:click="adminUpdatePlay(data?._id)">
                        {{ data?.play === false ? "Play" : "UnPlay" }}
                      </button>
                    </div>
                    <div class="mt-1 ml-1">
                      <router-link :to="`/dgklhtobgoijbrtoidfbgfgerjot/adminreferidallusers/${data?.owncode}`">
                        <button class="btn btn-secondary action-alluser-btn font-weight-bold">
                          Refral User
                        </button>
                      </router-link>
                    </div>
                  </div>
                </td>
                <td scope="col" class="text-center">
                  {{ new Date(data?.created_at).toLocaleDateString() }}
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="12" class="text-center">No Data Found</td>
              </tr>
            </tbody>
          </table>
          <div class="notification-modal">
            <Modal v-model:visible="isEditWalletsModalVisible" height="auto" width="40%" :maskClosable="false"
              offsetTop="25%">
              <div style="background: #fff" class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="color: #000; font-size: 25px">
                  Change Amount
                </h5>
              </div>
              <div class="modal-body">
                <div class="sign-info logout-info">
                  <p style="color: #000">
                    Mobile: {{ formData?.mobile }}
                  </p>
                </div>

                <div>
                  <h6 class="mt-4 font-weigth-bold">Amount</h6>
                  <input type="number" class="w-100" required v-model="formData.amount" />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-comman active" data-dismiss="modal" v-on:click="
                  (isEditWalletsModalVisible = false), closeModal()
                  ">
                  Close
                </button>
                <button class="btn btn-comman active" v-on:click="
                  (isEditWalletsModalVisible = false),
                  closeModal(),
                  adminUpdateWallets()
                  ">
                  Edit
                </button>
              </div>
            </Modal>
          </div>
          <div class="notification-modal">
            <Modal v-model:visible="isEditUserModalVisible" height="auto" width="40%" :maskClosable="false"
              offsetTop="25%">
              <div style="background: #fff" class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="color: #000; font-size: 25px">
                  Edit User
                </h5>
              </div>
              <div class="modal-body">
                <form class="mx-auto mt-5">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="upiid" class="font-weight-bold h5">Mobile Number</label>
                        <input type="number" class="form-control border px-2 py-1" id="mobile"
                          v-model="usersFormData.mobile" required />
                      </div>
                      <div class="form-group">
                        <label for="minimumrecharge" class="font-weight-bold h5">Email</label>
                        <input type="email" class="form-control border px-2 py-1" id="email"
                          v-model="usersFormData.email" required />
                      </div>
                      <div class="form-group">
                        <label for="minimumwithdrawal" class="font-weight-bold h5">Password</label>
                        <input type="text" class="form-control border px-2 py-1" id="password"
                          v-model="usersFormData.password" required />
                      </div>
                      <div class="form-group">
                        <label for="commission" class="font-weight-bold h5">Status</label>

                        <select v-model="usersFormData.status" class="form-select px-2 py-1 form-control border">
                          <option :value="true">True</option>
                          <option :value="false">False</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="name" class="font-weight-bold h5">Name</label>
                        <input type="text" class="form-control border px-2 py-1" id="name" v-model="usersFormData.name"
                          required />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="ifsc_code" class="font-weight-bold h5">IFSC</label>
                        <input type="text" class="form-control border px-2 py-1" id="ifsc_code"
                          v-model="usersFormData.ifsc_code" required />
                      </div>
                      <div class="form-group">
                        <label for="bank_code" class="font-weight-bold h5">Bank Name</label>
                        <input type="text" class="form-control border px-2 py-1" id="bank_code"
                          v-model="usersFormData.bank_code" required />
                      </div>
                      <div class="form-group">
                        <label for="bank_account" class="font-weight-bold h5">Account Number</label>
                        <input type="text" class="form-control border px-2 py-1" id="bank_account"
                          v-model="usersFormData.bank_account" required />
                      </div>
                      <div class="form-group">
                        <label for="upi" class="font-weight-bold h5">UPI Address</label>
                        <input type="text" class="form-control border px-2 py-1" id="upi" v-model="usersFormData.upi" />
                      </div>
                      <div class="form-group">
                        <label for="Type" class="font-weight-bold h5">Type</label>
                        <select v-model="usersFormData.type" class="form-select px-2 py-1 form-control border">
                          <option value="BANK">Bank</option>
                          <option value="UPI">UPI</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-comman active" data-dismiss="modal" v-on:click="
                  (isEditUserModalVisible = false), hideModal()
                  ">
                  Close
                </button>
                <button class="btn btn-comman active" type="submit" v-on:click="
                  (isEditUserModalVisible = false),
                  hideModal(),
                  SubmitData()
                  ">
                  Edit
                </button>
              </div>
            </Modal>
          </div>
        </div>
        <nav aria-label="Page navigation" class="mt-2"
          style="display: flex; justify-content:space-between; align-items:center;">
          <div>Showing 1 to {{ pagerow }} of {{ totalCount }}
            Entries
          </div>
          <div>
            <ul class="periodhistory-pagination pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="prevPage">Previous</button>
              </li>
              <li class="page-item">
                <button class="page-link" @click="gotoPage(currentPage - 1)" v-if="currentPage > 1">
                  {{ currentPage - 1 }}
                </button>
              </li>
              <li class="page-item active" v-if="currentPage === 1 || currentPage !== totalPages">
                <button class="page-link" @click="gotoPage(currentPage)">
                  {{ currentPage }}
                </button>
              </li>
              <li class="page-item">
                <button class="page-link" @click="gotoPage(currentPage + 1)" v-if="
                  currentPage < totalPages && currentPage + 1 !== totalPages
                ">
                  {{ currentPage + 1 }}
                </button>
              </li>
              <li class="page-item">
                <button class="page-link" v-if="totalPages > 2">....</button>
              </li>
              <li class="page-item" :class="currentPage === totalPages && 'active'">
                <button class="page-link" @click="gotoPage(totalPages)" v-if="totalPages > 1">
                  {{ totalPages }}
                </button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="nextPage">Next</button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
  <!-- loader -->
  <div class="loadings" v-show="loader">
    <AdminLoader />
  </div>
  <div id="myModal" class="custome-modal" v-if="isEditBankDetailVisible">
    <div class="custome-modal-content">
      <div class="custome-modal-header">
        <span class="modal-heding">Bank Details</span>
      </div>
      <div id="custome-modal-body">
        <div class="form-group">
          <label><strong>Name:</strong></label>
          <input v-model="bankDetail.name" type="text" placeholder="Enter name"
            style="width: 100%; padding: 3px; border-radius: 4px; border: 1px solid #ccc;" />
        </div>

        <div class="form-group">
          <label><strong>UPI:</strong></label>
          <input v-model="bankDetail.upi" type="text" placeholder="Enter UPI Id"
            style="width: 100%; padding: 3px; border-radius: 4px; border: 1px solid #ccc;" />
        </div>

        <div class="form-group">
          <label><strong>Bank Name:</strong></label>
          <input v-model="bankDetail.bankCode" type="text" placeholder="Enter bank name"
            style="width: 100%; padding: 3px; border-radius: 4px; border: 1px solid #ccc;" />
        </div>

        <div class="form-group">
          <label><strong>Account No:</strong></label>
          <input v-model="bankDetail.bankAccount" type="text" placeholder="Enter account no"
            style="width: 100%; padding: 3px; border-radius: 4px; border: 1px solid #ccc;" />
        </div>

        <div class="form-group">
          <label><strong>IFSC Code:</strong></label>
          <input v-model="bankDetail.ifscCode" type="text" placeholder="Enter IFSC code"
            style="width: 100%; padding: 3px; border-radius: 4px; border: 1px solid #ccc;" />
        </div>
      </div>

      <div class="custome-modal-footer">
        <button class="btn btn-success mr-2" @click="saveBankDetail">Save</button>
        <button class="btn export-color" @click="closeBankModal">Close</button>
      </div>
    </div>
  </div>

</template>
<script>
import axios from "axios";
import Navbar from "./Navbar.vue";
import SaidManuBar from "./SideMenuBar.vue";
import { Modal } from "usemodal-vue3";
import AdminLoader from "./AdminLoaders.vue";
export default {
  name: "AllUsers",
  components: { Navbar, SaidManuBar, Modal, AdminLoader },
  data() {
    return {
      allUserData: [],
      loader: false,
      searchTerms: null,
      autoLoginId: null,
      autoLoginError: '',
      isEditWalletsModalVisible: false,
      isEditBankDetailVisible: false,
      formData: { userid: "", amount: null, mobile: null },
      usersFormData: {
        _id: "", userid: "", mobile: null, password: "",
        email: "", status: true, name: "", ifsc_code: "",
        bank_code: "", bank_account: null, upi: null, type: "",
      },
      currentPage: 1,
      totalPages: 0,
      pagerow: 10,
      sortBy: null,
      sortOrder: 1,
      totalCount: 0,
      bankDetail: {
        userId: '',
        upi: '',
        bankCode: '',
        bankAccount: '',
        ifscCode: '',
        name: ''
      },
      isEditUserModalVisible: false,
    };
  },
  methods: {
    async openBankDetailModal(id) {
      try {
        const response = await axios.get(`/admin/get-bank-detail/${id}`);
        const data = response.data?.data;
        this.bankDetail = {
          userId: id || '',
          name: data?.name || '',
          upi: data?.upi || '',
          bankCode: data?.bank_code || '',
          bankAccount: data?.bank_account || '',
          ifscCode: data?.ifsc_code || '',
        };

        this.isEditBankDetailVisible = true;
      } catch (err) {
        console.error('Failed to fetch bank details:', err);
      }
    },
    closeBankModal() {
      this.isEditBankDetailVisible = false;
    },
    async saveBankDetail() {
      const { name, bankCode, bankAccount, ifscCode } = this.bankDetail;
      if (!name || !bankCode || !bankAccount || !ifscCode) {
        alert("Please fill in all required fields.");
        return;
      }
      try {
        const response = await axios.post(`/admin/update-bank-detail`, this.bankDetail);
        if (response) {
          this.getAllUserInformation();
          this.isEditBankDetailVisible = false;
        }
      } catch (error) {
        console.log("Error", error);
      }
    },
    async getAllUserInformation() {
      try {
        this.loader = true;
        const response = await axios.post("/admin/adminalluser", {
          page: this.currentPage,
          pageSize: this.pagerow,
          searchTerms: this.searchTerms || null,
        });
        const { data, totalPages, totalCount } = response.data;
        this.allUserData = data;
        this.totalPages = totalPages;
        this.totalCount = totalCount;
      } catch (error) {
        console.log("Error", error);
      } finally {
        this.loader = false;
      }
    },

    async search() {
      this.currentPage = 1;
      await this.getAllUserInformation();
    },

    async SubmitData() {
      try {
        const response = await axios.post("/admin/adminupdatealluser", this.usersFormData);
        if (response) this.getAllUserInformation();
      } catch (error) {
        console.log("error", error);
      }
    },

    async adminUpdateActive(_id) {
      try {
        const response = await axios.put("/admin/adminactiveunactiveuser", { _id });
        if (response) this.getAllUserInformation();
      } catch (error) {
        console.log("error", error);
      }
    },

    async adminUpdatePlay(_id) {
      try {
        const response = await axios.put("/admin/adminplay", { _id });
        if (response) this.getAllUserInformation();
      } catch (error) {
        console.log("Error", error);
      }
    },

    async adminUpdateWallets() {
      try {
        const response = await axios.put("/admin/adminupdatewallet", this.formData);
        if (response) this.getAllUserInformation();
      } catch (error) {
        console.log("Error", error);
      }
    },
    async getAutoLoginId() {
      try {
        const response = await axios.get("/admin/get-auto-login-id");
        if (response) {
          this.autoLoginId = response.data?.autoLoginId || '';
        }
      } catch (error) {
        console.log("Error", error);
      }
    },
    async autoId() {
      try {
        const response = await axios.post("/admin/auto-login-id", { autoLoginId: this.autoLoginId })
        if (response.data && response.data.success) {
          this.autoLoginError = '';
          this.getAllUserInformation();
          this.getAutoLoginId();
        } else {
          this.autoLoginError = response.data.message || "Something went wrong";
        }
      } catch (error) {
        this.autoLoginError = error.response?.data?.message || "Server error. Please try again.";
        console.log("Error", error);
      }
    },
    openModal(_id) {
      const user = this.allUserData.find((item) => item._id === _id);
      if (user) {
        this.formData = {
          userid: user._id,
          amount: user?.userwallet?.totalUserWallet,
          mobile: user.mobile,
        };
        this.isEditWalletsModalVisible = true;
        document.body.classList.add("modal-open");
      }
    },

    closeModal() {
      this.isEditWalletsModalVisible = false;
      document.body.classList.remove("modal-open");
    },

    showModal(_id) {
      const user = this.allUserData.find((item) => item._id === _id);
      if (user) {
        this.usersFormData = {
          _id: user._id,
          userid: user.userid,
          mobile: user.mobile,
          password: user.password,
          email: user.email,
          status: user.status,
          name: user?.userbankdetail?.name,
          ifsc_code: user?.userbankdetail?.ifsc_code,
          bank_code: user?.userbankdetail?.bank_code,
          bank_account: user?.userbankdetail?.bank_account,
          upi: user?.userbankdetail?.upi,
          type: user?.userbankdetail?.type,
        };
        this.isEditUserModalVisible = true;
        document.body.classList.add("modal-open");
      }
    },

    hideModal() {
      this.isEditUserModalVisible = false;
      document.body.classList.remove("modal-open");
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getAllUserInformation();
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getAllUserInformation();
      }
    },

    gotoPage(page) {
      this.currentPage = page;
      this.getAllUserInformation();
    },

    sort(field) {
      if (this.sortBy === field) {
        this.sortOrder *= -1;
      } else {
        this.sortBy = field;
        this.sortOrder = 1;
      }
      this.allUserData.sort((a, b) => {
        const valA = this.getNestedPropertyValue(a, field);
        const valB = this.getNestedPropertyValue(b, field);
        return (valA < valB ? -1 : valA > valB ? 1 : 0) * this.sortOrder;
      });
    },

    getNestedPropertyValue(obj, path) {
      return path.split(".").reduce((o, p) => (o ? o[p] : ""), obj);
    },
  },

  mounted() {
    this.getAllUserInformation();
    this.getAutoLoginId();
    const user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "AdminLogin" });
    }
  },
};
</script>

<style>
#custome-modal-body {
  display: flex;
  flex-direction: row;
  gap: 0px;
  flex-wrap: wrap;
}

#custome-modal-body .form-group {
  margin-bottom: 30px;
  position: relative;
  width: 50%;
  padding: 0 10px;
}

.custome-modal {
  position: fixed;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.custome-modal-content {
  background-color: #fefefe;
  padding: 10px 20px;
  width: 50%;
  border-radius: .2rem;
  z-index: 999999999;
}

.custome-modal-header {
  border-bottom: 1px solid #eff2f7;
  margin-bottom: 10px;
  text-align: center;
  padding-bottom: 10px;
}

.modal-heding {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px !important;
  color: #495057;
}

.custome-modal-footer {
  border-top: 1px solid #eff2f7;
  margin-top: 10px;
  padding-top: 10px;
  text-align: end;
}

.modal-close-btn {
  background-color: #1f528e;
  color: white;
  padding: .25rem .5rem;
  font-size: .71094rem;
  border-radius: .2rem;
}

.modal-close-btn:hover {
  color: white;
}

.error-message-auto-login {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
