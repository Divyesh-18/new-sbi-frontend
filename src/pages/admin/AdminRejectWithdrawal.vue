<template>
    <Navbar />
 <div class="admin-layout">
          <SaidManuBar />

    <!-- sidenav -->
    
       
      <!--  <div class="col-lg-10 col-md-9 col-sm-8 col-12 p-1 bg-white bg-gradient withdrawal-reject-content">-->
        <div class="main-content-wrapper main-content-table Period_History">
          <div class="period_history_table">
            <h3 class="p-1 mr-0 add-bg-color-sub-header withdrawal-reject-title">
              Withdrawal Reject
            </h3>
            <nav class="navbar pr-0 pl-0">
              <div class="select_bar">
                Show
                <select v-model="pageSize" @change="fetchData">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
                entries
              </div>
              <div class="withdrawal-reject-search-box d-flex ml-auto" style="padding-top: 5px !important;" role="search">
                <label>Search:</label>
                <input class="form-control p-1" v-model="searchTerms" @input="search()" type="search" aria-label="Search"
                  id="input" />
              </div>
            </nav>
            <div class="table-responsive table-responsive-sm">
              <table class="table withdrawal-reject-table" v-if="loader === false">
                <thead>
                  <tr>
                    <th scope="col" class="font-weight-bold text-center">
                      Sr.No
                    </th>
                    <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                      <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('userid')"></i>
                      UserID(mobile)
                    </th>
                    <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                      <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('amount')"></i>
                      Amount
                    </th>
                    <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                      <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('payable_amount')"></i>
                      Payable Amount
                    </th>
                    <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                      <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('payout_type')"></i>
                      Payout Type
                    </th>
                    <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                      <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('wallet_type')"></i>
                      Wallet Type
                    </th>
                    <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                      Bank Details
                    </th>
                    <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                      <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('request_date')"></i>
                      Req.Date
                    </th>
                    <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                      <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('status')"></i>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody v-if="data.length > 0">
                  <tr v-for="(item, index) in data" :key="item._id">
                    <td scope="col" class="text-center">{{ index + 1 }}</td>
                    <td scope="col" class="text-center">{{ item?.mobile }}</td>
                    <td scope="col" class="text-center">
                      {{ item?.amount?.toFixed(2) || 0 }}
                    </td>
                    <td scope="col" class="text-center">
                      {{ item?.paybleamount?.toFixed(2) || 0 }}
                    </td>
                    <td scope="col" class="text-center">
                      {{ item?.payout || 0 }}
                    </td>
                    <td scope="col" class="text-center">{{ item?.type }}</td>
                    <td scope="col" class="setcoustomewith">
                      <div>
                        Bank :-
                        {{
                          item?.bank_code ? item?.bank_code?.toUpperCase() : " - "
                        }}
                      </div>
                      <div>
                        AC Number :-
                        {{ item?.bank_account || " - " }}
                      </div>
                      <div>
                        IFSC :-
                        {{ item?.ifsc_code || " - " }}
                      </div>
                      <div>
                        Name :-
                        {{ item?.name?.toUpperCase() || " - " }}
                      </div>
                    </td>
                    <td scope="col" class="text-center">
                      {{ new Date(item?.createdate).toLocaleDateString() }}
                    </td>
                    <td scope="col" class="text-center">withdrawal-reject</td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="9" class="text-center">No Data Found</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation" class="mt-2" style="display: flex; justify-content:space-between; align-items:center;">
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
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar.vue";
import SaidManuBar from "./SideMenuBar.vue";
import AdminLoader from "./AdminLoaders.vue";
import { ref } from "vue";

export default {
  name: "AdminAccepWithdrawal",
  data() {
    let isAmountActive = ref(false);

    const amountActive = async () => {
      isAmountActive.value = !isAmountActive.value;
    };
    return {
      data: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      amountActive,
      isAmountActive,
      sortBy: null,
      sortOrder: 1,
      searchTerms: null,
      loader: false,
      totalCount: 0,
    };
  },
  components: {
    Navbar,
    SaidManuBar,
    AdminLoader
  },
  methods: {
    async fetchData() {
      try {
        this.loader = true;
        const response = await axios.post(`admin/withdrawalreject`, {
          page: this.currentPage,
          pageSize: Number(this.pageSize),
        });
        this.data = response.data.data;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
        this.totalCount = response.data.totalCount;
        this.loader = false;
      } catch (error) {
        console.error("Error fetching data:", error);
        // alert("Error fetching data");
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchData();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchData();
      }
    },
    gotoPage(page) {
      this.currentPage = page;
      this.fetchData();
    },
    sort(field) {
      if (this.sortBy === field) {
        this.sortOrder *= -1;
      } else {
        this.sortBy = field;
        this.sortOrder = 1;
      }
      this.data.sort((a, b) => {
        const valueA = this.getNestedPropertyValue(a, field);
        const valueB = this.getNestedPropertyValue(b, field);
        if (valueA < valueB) {
          return -1 * this.sortOrder;
        }
        if (valueA > valueB) {
          return 1 * this.sortOrder;
        }
        return 0;
      });
    },
    getNestedPropertyValue(obj, path) {
      const properties = path.split(".");
      let value = obj;
      for (const prop of properties) {
        value = value[prop];
        if (value === undefined) {
          return "";
        }
      }
      return value;
    },
    async search() {
      try {
        if (this.searchTerms) {
          const response = await axios.post(`/admin/withdrawalreject`, {
            searchTerms: this.searchTerms,
          });
          this.data = response.data.data;
        } else {
          this.fetchData();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
