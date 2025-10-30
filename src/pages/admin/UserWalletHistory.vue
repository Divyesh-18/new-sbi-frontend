<template>
  <Navbar />
  <div class="admin-layout">
    <SaidManuBar />

    <!-- Sidenav -->

    <!-- <div class="col-lg-10 col-md-9 col-sm-8 col-12 p-1 bg-white bg-gradient user-transaction-history-content">-->
    <div class="main-content-wrapper main-content-table Period_History">
      <div class="period_history_table">
        <!-- <h3 class="p-1 mr-0 user-transaction-history-title">
              User Transaction History
            </h3> -->
        <h5 class="p-1 mr-0 add-bg-color-sub-header user-transaction-history-result-box">
          User Wallet History
        </h5>
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
          <div class="user-transaction-history-search-box d-flex ml-auto" style="padding-top: 5px !important;"
            role="search">
            <label>Search:</label>
            <input class="form-control p-1" v-model="searchTerms" @input="search()" type="search" aria-label="Search"
              id="input" />
          </div>
        </nav>
        <div class="table-responsive table-responsive-sm">
          <table class="user-transaction-history-table table" id="mytable" v-if="loader === false">
            <thead>
              <tr>
                <th scope="col" class="font-weight-bold text-center">Sr.No</th>
                <th scope="col" class="font-weight-bold text-center">
                  <i class="bi bi-arrow-down-up mr-1 text-center cursor-pointer" @click="sort('userid')"></i>UserID
                </th>
                <th scope="col" class="font-weight-bold text-center cursor-pointer">
                  <i class="bi bi-arrow-down-up mr-1" @click="sort('orderid')"></i>OrderID
                </th>
                <th scope="col" class="font-weight-bold text-center cursor-pointer">
                  <i class="bi bi-arrow-down-up mr-1" @click="sort('amount')"></i>Amount
                </th>
                <th scope="col" class="font-weight-bold text-center cursor-pointer">
                  <i class="bi bi-arrow-down-up mr-1" @click="sort('wallet')"></i>Wallet
                </th>
                <th scope="col" class="font-weight-bold text-center cursor-pointer">
                  <i class="bi bi-arrow-down-up mr-1" @click="sort('type')"></i>Type
                </th>
                <th scope="col" class="font-weight-bold text-center cursor-pointer">
                  <i class="bi bi-arrow-down-up mr-1" @click="sort('actiontype')"></i>Status
                </th>
                <th scope="col" class="font-weight-bold text-center cursor-pointer">
                  <i class="bi bi-arrow-down-up mr-1" @click="sort('createdate')"></i>Create Date
                </th>
              </tr>
            </thead>
            <tbody v-if="data.length > 0">
              <tr v-for="(item, index) in data" :key="item._id">
                <td scope="col" class="text-center">{{ index + 1 }}</td>
                <td scope="col" class="text-center">{{ item.mobile }}</td>
                <td scope="col" class="text-center">
                  {{ item.orderid || "-" }}
                </td>
                <td scope="col" class="text-center">
                  {{ item.amount?.toFixed(2) || 0 }}
                </td>
                <td scope="col" class="text-center">
                  {{ item.wallet?.toFixed(2) || 0 }}
                </td>
                <td scope="col" class="text-center">{{ item.type }}</td>
                <td scope="col" class="text-center">{{ item.actiontype }}</td>
                <td scope="col" class="text-center">
                  {{ new Date(item.createdate).toLocaleDateString() }}
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
        <nav aria-label="Page navigation" style="display: flex; justify-content:space-between; align-items:center;">
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
  name: "WithdrawalHistory",
  data() {
    let isAmountActive = ref(false);
    const amountActive = async () => {
      isAmountActive.value = !isAmountActive.value;
    };
    return {
      data: [],
      searchTerms: null,
      amountActive,
      isAmountActive,
      sortBy: null,
      sortOrder: 1,
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      loader: false,
      totalCount: 0
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
        const response = await axios.post(`/admin/user-wallets`, {
          page: this.currentPage,
          pageSize: Number(this.pageSize),
          searchTerms: this.searchTerms || null
        });
        this.data = response.data.data;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
        this.totalCount = response.data.total;
        this.loader = false;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    search() {
      this.currentPage = 1;
      this.fetchData();
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
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchData();
      }
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
  },
  mounted() {
    this.fetchData();
  },
};
</script>
