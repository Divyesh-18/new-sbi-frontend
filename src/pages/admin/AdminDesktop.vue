<template>
  <Navbar />
  <div class="admin-layout">
    <!-- Sidebar -->
    <SaidManuBar />

    <!-- Main Content Area -->
    <div class="main-content-wrapper">
      <!-- Breadcrumb Header -->
      <div class="content_main">
        <div class="content-header">
          <div class="d-flex justify-content-between align-items-center pl-4 pr-3">
            <div>
              <h4 class="mb-0">Dashboard</h4>
            </div>
            <div>
              <span><i class="fa fa-dashboard me-1"></i> Home > Dashboard</span>
            </div>
          </div>
        </div>

        <div class="content-body">
          <div class="container-fluid">
            <div v-if="loader === false">
              <div class="container bg-secondary-subtle m-0">
                <h5 class="p-0 mr-0 dashboard-tiles-title">
                  Statistics of user data information.
                </h5>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  <div class="col-lg-3">
                    <div class="bg-info-subtle p-3 dashboard-tiles-card">
                      <h5>Total User</h5>
                      <!-- <p class="text-start">250000</p> -->
                      <p class="text-start">
                        {{ adminGetData.TotalUser }}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-3 ">
                    <div class="bg-info-subtle p-3 dashboard-tiles-card">
                      <h5>User Balance</h5>
                      <!-- <p class="text-start">50000</p> -->
                      <p class="text-start">
                        {{ adminGetData.TotalBalance.toFixed(2) }}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="bg-info-subtle p-3 dashboard-tiles-card">
                      <h5>Active User</h5>
                      <!-- <p class="text-start">1</p> -->
                      <p class="text-start">{{ adminGetData.ActiveUser }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container pt-3 bg-secondary-subtle m-0">
                <h5 class="p-0 mr-0 dashboard-tiles-title">
                  Statistics of today recharge and withdrawal
                </h5>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  <div class="col-lg-3">
                    <div class="bg-info-subtle p-3 dashboard-tiles-card">
                      <h5>Today Recharge</h5>
                      <!-- <p class="text-start">0</p> -->
                      <p class="text-start">
                        {{ adminGetData.TodayRecharge }}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="bg-info-subtle p-3 dashboard-tiles-card">
                      <h5>Today Withdrawal</h5>
                      <!-- <p class="text-start">0</p> -->
                      <p class="text-start">
                        {{ adminGetData.TodayWithdrawal }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container pt-3 bg-secondary-subtle m-0">
                <h5 class="p-0 mr-0 dashboard-tiles-title">
                  Statistics of today profit and loss
                </h5>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  <div class="col-lg-3">
                    <div class="bg-info-subtle p-3 dashboard-tiles-card">
                      <h5>Loss</h5>
                      <!-- <p class="text-start">-546456</p> -->
                      <p class="text-start">{{ adminGetData.Loss.toFixed(2) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container pt-3 bg-secondary-subtle m-0">
                <h5 class="p-0 mr-0 dashboard-tiles-title">
                  Statistics of recharge and withdrawal summary
                </h5>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  <div class="col-lg-3 mt-3">
                    <div class="bg-info-subtle p-3 dashboard-tiles-card">
                      <h5>Pending Recharges</h5>
                      <!-- <p class="text-start">0</p> -->
                      <p class="text-start">
                        {{ adminGetData.PendingRecharges }}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-3 mt-3">
                    <div class="bg-info-subtle p-3 dashboard-tiles-card">
                      <h5>Success Recharge</h5>
                      <!-- <p class="text-start">123242</p> -->
                      <p class="text-start">
                        {{ adminGetData.SuccessRecharge }}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-3 mt-3">
                    <div class="bg-info-subtle p-3 dashboard-tiles-card">
                      <h5>Reject Recharge</h5>
                      <!-- <p class="text-start">15436456</p> -->
                      <p class="text-start">
                        {{ adminGetData.RejectRecharge }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  <div class="col-lg-3 mt-3">
                    <div class="bg-info-subtle p-3 dashboard-tiles-card">
                      <h5>Pending Withdrawal Requests</h5>
                      <!-- <p class="text-start">1657576</p> -->
                      <p class="text-start">
                        {{ adminGetData.PendingWithdrawalRequests }}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-3 mt-3">
                    <div class="bg-info-subtle p-3 dashboard-tiles-card">
                      <h5>Approved Withdrawal Requests</h5>
                      <!-- <p class="text-start">1</p> -->
                      <p class="text-start">
                        {{ adminGetData.ApprovedWithdrawalRequests }}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-3 mt-3">
                    <div class="bg-info-subtle p-3 dashboard-tiles-card">
                      <h5>Reject Withdrawal Requests</h5>
                      <!-- <p class="text-start">1</p> -->
                      <p class="text-start">
                        {{ adminGetData.RejectWithdrawalRequests }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container pt-3 bg-secondary-subtle m-0">
                <h5 class="p-0 mr-0 dashboard-tiles-title">
                  Statistics of profit and loss
                </h5>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  <div class="col-lg-3">
                    <div class="bg-info-subtle p-3 dashboard-tiles-card">
                      <h5>Profit</h5>
                      <!-- <p class="text-start">546456</p> -->
                      <p class="text-start">
                        {{ adminGetData.Profit }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- loader -->
  <div class="custom-loader" v-show="loader">
    <AdminLoader />
  </div>


</template>

<script>
import SaidManuBar from "./SideMenuBar.vue";
import Navbar from "./Navbar.vue";
import axios from "axios";
import { ref } from "vue";
import AdminLoader from "./AdminLoaders.vue";
export default {
  name: "AdminDesktop",
  components: {
    Navbar: Navbar,
    SaidManuBar: SaidManuBar,
    AdminLoader: AdminLoader,
  },
  mounted() {
    const user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "AdminLogin" });
    }
  },
  setup() {
    const apiRun = ref(true);
    const loader = ref(false);
    const adminGetData = ref([]);

    const getAdminData = async () => {
      apiRun.value = true;
      loader.value = true;
      await axios
        .get("/admin/desktop", {})
        .then((response) => {
          adminGetData.value = response.data.data;

          loader.value = false;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAdminData();

    return {
      getAdminData,
      apiRun,
      adminGetData,
      loader,
    };
  },
};
</script>

<style>
@import "../../assets/css/admin-style/admin.css";
</style>