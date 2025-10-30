<template>
    <Navbar />
   <div class="admin-layout">
          <SaidManuBar />

    <!-- sidenav -->
    
        <div class="main-content-wrapper main-content-table">
          <h3 class="p-1 mr-0 add-bg-color-sub-header admin-referid-all-users-title">
            User Referid
          </h3>
          <div class="d-flex flex-wrap my-2">
            <div>
              <button v-on:click="(endLevel = 1), this.UserReferidLavel()" v-bind:class="endLevel == 1
                ? 'btn btn-outline-secondary text-dark'
                : 'admin-referid-all-users-level-buttons btn btn-secondary'
                ">
                Level 1
              </button>
            </div>
            <div>
              <button v-on:click="(endLevel = 2), this.UserReferidLavel()" v-bind:class="endLevel == 2
                ? 'btn btn-outline-secondary text-dark'
                : 'admin-referid-all-users-level-buttons btn btn-secondary'
                ">
                Level 2
              </button>
            </div>
            <div>
              <button v-on:click="(endLevel = 3), this.UserReferidLavel()" v-bind:class="endLevel == 3
                ? 'btn btn-outline-secondary text-dark'
                : 'admin-referid-all-users-level-buttons btn btn-secondary'
                ">
                Level 3
              </button>
            </div>
            <div>
              <button v-on:click="(endLevel = 4), this.UserReferidLavel()" v-bind:class="endLevel == 4
                ? 'btn btn-outline-secondary text-dark'
                : 'admin-referid-all-users-level-buttons btn btn-secondary'
                ">
                Level 4
              </button>
            </div>
            <div>
              <button v-on:click="(endLevel = 5), this.UserReferidLavel()" v-bind:class="endLevel == 5
                ? 'btn btn-outline-secondary text-dark'
                : 'admin-referid-all-users-level-buttons btn btn-secondary'
                ">
                Level 5
              </button>
            </div>
            <div>
              <button v-on:click="(endLevel = 6), this.UserReferidLavel()" v-bind:class="endLevel == 6
                ? 'btn btn-outline-secondary text-dark'
                : 'admin-referid-all-users-level-buttons btn btn-secondary'
                ">
                Level 6
              </button>
            </div>
            <div>
              <button v-on:click="(endLevel = 7), this.UserReferidLavel()" v-bind:class="endLevel == 7
                ? 'btn btn-outline-secondary text-dark'
                : 'admin-referid-all-users-level-buttons btn btn-secondary'
                ">
                Level 7
              </button>
            </div>
            <div>
              <button v-on:click="(endLevel = 8), this.UserReferidLavel()" v-bind:class="endLevel == 8
                ? 'btn btn-outline-secondary text-dark'
                : 'admin-referid-all-users-level-buttons btn btn-secondary'
                ">
                Level 8
              </button>
            </div>
            <div>
              <button v-on:click="(endLevel = 9), this.UserReferidLavel()" v-bind:class="endLevel == 9
                ? 'btn btn-outline-secondary text-dark'
                : 'admin-referid-all-users-level-buttons btn btn-secondary'
                ">
                Level 9
              </button>
            </div>
            <div>
              <button v-on:click="(endLevel = 10), this.UserReferidLavel()" v-bind:class="endLevel == 10
                ? 'btn btn-outline-secondary text-dark'
                : 'admin-referid-all-users-level-buttons btn btn-secondary'
                ">
                Level 10
              </button>
            </div>
          </div>
          <!-- <nav class="navbar pr-0 pl-0">
            <div
              class="admin-referid-all-users-search-box d-flex ml-auto"
              role="search"
            >
              <label>Search:</label>
              <input
                class="form-control p-1"
                v-model="searchTerms"
                @input="search()"
                type="search"
                aria-label="Search"
                id="input"
              />
            </div>
          </nav> -->
          <div class="table-responsive table-responsive-sm">
            <table class="table admin-referid-all-users-table" v-if="loader === false">
              <thead>
                <tr>
                  <th scope="col" class="font-weight-bold text-center">
                    Sr.No
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Level
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Phone
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Wallet
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    First Recharge
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Totle Recharge
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Totle Withdrwawal
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Create Data
                  </th>
                </tr>
              </thead>
              <tbody v-if="UserReferidLavelData?.length > 0">
                <tr v-for="(item, index) in UserReferidLavelData" :key="item">
                  <td scope="col" class="text-center">{{ index + 1 }}</td>
                  <td scope="col" class="text-center">{{ endLevel }}</td>
                  <td scope="col" class="text-center">{{ item?.mobile || "-" }}</td>
                  <td scope="col" class="text-center">
                    {{ item?.userTotalWallet?.totalWallet?.toFixed(2) || 0 }}
                  </td>
                  <td scope="col" class="text-center">
                    {{ item?.userFirstRechargeAmount?.amount?.toFixed(2) || 0 }}
                  </td>
                  <td scope="col" class="text-center">
                    {{
                      item?.userTotleRechargeAmount?.rechargeAmount?.toFixed(2) || 0
                    }}
                  </td>
                  <td scope="col" class="text-center">
                    {{
                      item?.userTotleWithdrawals?.totleWithdrawals?.toFixed(2) || 0
                    }}
                  </td>
                  <td scope="col" class="text-center">
                    {{ new Date(item?.created_at).toLocaleDateString() }}
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="8" class="text-center">No Data Found</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <nav aria-label="Page navigation">
            <ul
              class="admin-referid-all-users-pagination pagination justify-content-end"
            >
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="prevPage">&laquo;</button>
              </li>
              <li class="page-item">
                <button
                  class="page-link"
                  @click="gotoPage(currentPage - 1)"
                  v-if="currentPage > 1"
                >
                  {{ currentPage - 1 }}
                </button>
              </li>
              <li
                class="page-item active"
                v-if="currentPage === 1 || currentPage !== totalPages"
              >
                <button class="page-link" @click="gotoPage(currentPage)">
                  {{ currentPage }}
                </button>
              </li>
              <li class="page-item">
                <button
                  class="page-link"
                  @click="gotoPage(currentPage + 1)"
                  v-if="
                    currentPage < totalPages && currentPage + 1 !== totalPages
                  "
                >
                  {{ currentPage + 1 }}
                </button>
              </li>
              <li class="page-item">
                <button class="page-link" v-if="totalPages > 2">....</button>
              </li>
              <li
                class="page-item"
                :class="currentPage === totalPages && 'active'"
              >
                <button
                  class="page-link"
                  @click="gotoPage(totalPages)"
                  v-if="totalPages > 2"
                >
                  {{ totalPages }}
                </button>
              </li>
              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
              >
                <button class="page-link" @click="nextPage">&raquo;</button>
              </li>
            </ul>
          </nav> -->
        </div>
      
  </div>
  <!-- loader -->
  <div class="loadings" v-show="loader">
    <AdminLoader />
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import SaidManuBar from "./SideMenuBar.vue";
import axios from "axios";
import AdminLoader from "./AdminLoaders.vue";

export default {
  name: "AdminReferidAllUsers",
  data() {
    return {
      UserReferidLavelData: [],
      owncodeData: null,
      owncode: null,
      endLevel: 1,
      loader: false,
      searchTerms: null,
    };
  },
  components: {
    Navbar,
    SaidManuBar,
    AdminLoader,
  },
  created() {
    this.owncode = this.$route.params.owncode;
  },
  methods: {
    async UserReferidLavel() {
      try {
        this.loader = true;
        const response = await axios.post(
          "/admin/admin_get_allusers_referid_lavel",
          {
            owncode: this.owncode,
            endLevel: this.endLevel,
          }
        );
        this.loader = false;
        this.UserReferidLavelData = response?.data?.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async search() {
      try {
        if (this.searchTerms) {
          const response = await axios.post(
            `/admin/admin_get_allusers_referid_lavel`,
            {
              searchTerms: this.searchTerms,
            }
          );
          this.UserReferidLavelData = response.data.data;
        } else {
          this.UserReferidLavel();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },

  mounted() {
    this.UserReferidLavel();
  },
};
</script>
