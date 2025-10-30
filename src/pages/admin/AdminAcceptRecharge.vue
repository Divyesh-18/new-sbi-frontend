<template>
  <Navbar />
  <div class="admin-layout">

    <SaidManuBar />


    <!-- <div class="col-lg-10 col-md-9 col-sm-8 col-12 p-1 bg-white bg-gradient accept-recharge-content"> -->
    <div class="main-content-wrapper main-content-table Period_History">
      <div class="period_history_table">

        <h3 class="p-1 mr-0 add-bg-color-sub-header accept-recharge-title">
          Accept Recharge
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
          <div class="accept-recharge-search-box d-flex ml-auto" style="padding-top: 5px !important;" role="search">
            <label>Search:</label>
            <input class="form-control p-1" v-model="searchTerms" @input="search()" type="search" aria-label="Search"
              id="input" />
          </div>
        </nav>
        <div class="table-responsive table-responsive-sm">
          <table class="table accept-recharge-table" v-if="loader === false">
            <thead>
              <tr>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <span>Sr.No.</span>
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('usermobilenumber')"></i>User Mobile
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('usermobilenumber')"></i>Recharge type
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('usermobilenumber')"></i>USDT Amount
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('amount')"></i>Amount
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('orderid')"></i>Order ID
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('wallet')"></i>wallet
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('createdate')"></i>Req. Date
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  Status
                </th>
              </tr>
            </thead>
            <tbody v-if="data.length > 0">
              <tr v-for="(item, index) in data" :key="item._id">
                <td scope="col" class="text-center">{{ index + 1 }}</td>
                <td scope="col" class="text-center">
                  {{ item?.usermobilenumber }}
                </td>
                <td scope="col" class="text-center">
                  {{ item?.rechargetype }}
                </td>
                <td scope="col" class="text-center">
                  {{ item?.rechargetype == "USDTPAYMENT" && item?.usdtAmount ? ` ₮${item?.usdtAmount?.toFixed(2)}` : '-'
                  }}
                </td>
                <td scope="col" class="text-center">
                  ₹{{ item?.amount?.toFixed(2) }}
                </td>
                <td scope="col" class="text-center">{{ item?.orderid }}</td>
                <td scope="col" class="text-center">
                  {{ item?.wallet?.toFixed(2) }}
                </td>
                <td scope="col" class="text-center">
                  {{ new Date(item.createdate).toLocaleDateString() }}
                </td>
                <td scope="col" class="text-center">
                  {{ item?.actiontype + "-accept" }}
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="9" class="text-center">No Data Found</td>
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

export default {
  name: "AcceptRequest",
  components: {
    Navbar,
    SaidManuBar,
    AdminLoader,
  },
  data() {
    return {
      data: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      sortBy: null,
      sortOrder: 1,
      searchTerms: null,
      loader: false,
      totalCount: 0,
    };
  },
  methods: {
    async fetchData() {
      try {
        this.loader = true;
        const response = await axios.post(`/admin/rechargeaccept`, {
          searchTerms: this.searchTerms || null, // always send the correct key
          page: this.currentPage,
          pageSize: Number(this.pageSize),
        });
        const res = response.data;
        this.data = res.data || [];
        this.totalPages = res.totalPages || 1;
        this.totalCount = res.totalCount || 0;
        this.currentPage = res.currentPage || 1;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loader = false;
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
        if (valueA < valueB) return -1 * this.sortOrder;
        if (valueA > valueB) return 1 * this.sortOrder;
        return 0;
      });
    },

    getNestedPropertyValue(obj, path) {
      const properties = path.split(".");
      return properties.reduce((acc, prop) => (acc && acc[prop] !== undefined ? acc[prop] : ""), obj);
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

    search() {
      this.currentPage = 1; // Reset to first page on search
      this.fetchData();
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>
