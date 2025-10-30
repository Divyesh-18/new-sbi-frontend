<template>
  <Navbar />
  <div class="admin-layout">
    <SaidManuBar />
    <!-- sidenav -->

    <!--  <div class="col-lg-2 col-md-3 col-sm-4 col-12 pl-0"> -->
    <!--  <SaidManuBar /> -->
    <!--  </div> -->
    <!-- <div class="col-lg-10 col-md-9 col-sm-8 col-12 p-1 bg-white bg-gradient periodhistory-content"> -->
    <div class="main-content-wrapper main-content-table Period_History">
      <div class="period_history_table ">
        <h3 class="periodhistory-title  mr-0 m-1 ml-0 add-bg-color-sub-header">
          One Minute Period History
        </h3>
        <nav class="navbar pr-0 pl-0">
          <div class="select_bar">
            Show
            <select v-model="pagerow" @change="getPeriodIdData">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            entries
          </div>
          <div class="periodhistory-search-box d-flex ml-auto" role="search">
            <label>Search:</label>
            <input class="form-control p-1" v-model="searchTerms" @input="search()" type="search" aria-label="Search"
              id="input" />
          </div>
        </nav>
        <div class="table-responsive table-responsive-sm">
          <table class="periodhistory-table table" v-if="loader === false">
            <thead>
              <tr>
                <th scope="col" class="font-weight-bold text-center">
                  Sr.No
                </th>
                <th scope="col" class="font-weight-bold text-center">

                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('gameid')"></i>
                  Period ID

                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer " @click="sort('userTotleBateAmount')"></i>Total
                  Bate Amount

                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('TotalWinAmount')"></i>Total Win
                  Amount

                </th>
                <th scope="col" class="font-weight-bold text-center">

                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('profitLoss')"></i>Profit/Loss

                </th>
                <th scope="col" class="font-weight-bold text-center">

                  <i class="bi bi-arrow-down-up mr-1 cursor-pointer" @click="sort('created_at')"></i>Create Date

                </th>
                <th scope="col" class="font-weight-bold text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody v-if="data?.length > 0">
              <tr v-for="(item, index) in data" :key="item._id">
                <td scope="col" class="text-center">{{ index + 1 }}</td>
                <td scope="col" class="text-center">{{ item.gameid }}</td>
                <td scope="col" class="text-center">
                  {{ item.userTotalBateAmount?.toFixed(2) || 0 }}
                </td>
                <td scope="col" class="text-center">
                  {{ item.TotalWinAmount?.toFixed(2) || 0 }}
                </td>
                <td scope="col" class="text-center">
                  {{ item.profitLoss?.toFixed(2) || 0 }}
                </td>
                <td scope="col" class="text-center">
                  {{ new Date(item.createdAt).toLocaleDateString() }}
                </td>
                <td scope="col" class="text-center p-1 m-0">
                  <router-link :to="`/dgklhtobgoijbrtoidfbgfgerjot/user-wise-period-history/${item?.gameid}`">
                    <i class="bi bi-eye-fill h5 p-0 m-0" style="color: #97cbf6;"
                      v-on:click="period_bateing_history(item?.gameid)"></i>
                  </router-link>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7" class="text-center">No Data Found</td>
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
import Navbar from "../Navbar.vue";
import SaidManuBar from "../SideMenuBar.vue";
import AdminLoader from "../AdminLoaders.vue";

export default {
  name: "AdminAccepWithdrawal",
  data() {
    return {
      data: [],
      currentPage: 1,
      totalPages: 0,
      pagerow: 10,
      searchTerms: null,
      loader: false,
      totalCount: 0,
      sortBy: null,
      sortOrder: 1,
    };
  },
  components: {
    Navbar,
    SaidManuBar,
    AdminLoader,
  },
  methods: {
    async getPeriodIdData() {
      try {
        this.loader = true;
        const response = await axios.post("/admin/period-history", {
          page: this.currentPage,
          pagerow: Number(this.pagerow),
          searchTerms: this.searchTerms || null,
        });
        this.data = response.data.data;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
        this.totalCount = response.data.totalCount;
        this.loader = false;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async period_bateing_history(periodid) {
      const response = await axios.post(`/admin/period-id-wise-user-history`, {
        gameid: periodid,
      });
      this.UserReferidLavelData = response.data.data;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getPeriodIdData();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getPeriodIdData();
      }
    },
    gotoPage(page) {
      this.currentPage = page;
      this.getPeriodIdData();
    },
    sort(field) {
      if (this.sortBy === field) {
        this.sortOrder *= -1;
      } else {
        this.sortBy = field;
        this.sortOrder = 1;
      }
      this.data.sort((a, b) => {
        const valueA = typeof a[field] === "string" ? a[field].toUpperCase() : a[field];
        const valueB = typeof b[field] === "string" ? b[field].toUpperCase() : b[field];
        if (valueA < valueB) {
          return -1 * this.sortOrder;
        }
        if (valueA > valueB) {
          return 1 * this.sortOrder;
        }
        return 0;
      });
    },
    async search() {
      this.currentPage = 1;
      await this.getPeriodIdData();
    },
  },
  mounted() {
    this.getPeriodIdData();
  },
};
</script>
