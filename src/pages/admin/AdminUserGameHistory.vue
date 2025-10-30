<template>
    <Navbar />
  <div class="admin-layout">
          <SaidMenuBar />

    <!-- sidenav -->
   
       
        <div class="main-content-wrapper main-content-table">
          <h3 class="p-1 mr-0 add-bg-color-sub-header admin-user-game-history-title">
            Users Mobile :-{{ mobile }}
          </h3>
          <!-- <nav class="navbar pr-0 pl-0">
            <div
              class="admin-user-game-history-search-box d-flex ml-auto"
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
            <table class="table admin-user-game-history-table" v-if="loader === false">
              <thead>
                <tr>
                  <th scope="col" class="font-weight-bold text-center">#</th>
                  <th scope="col" class="font-weight-bold text-center">
                    Periodid
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Value
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Amount
                  </th>
                  <th scope="col" class="font-weight-bold text-center">Tab</th>
                  <th scope="col" class="font-weight-bold text-center">
                    Paid Amount
                  </th>
                  <th scope="col" class="font-weight-bold text-center">Fee</th>
                  <th scope="col" class="font-weight-bold text-center">
                    Status
                  </th>
                  <th scope="col" class="w-20 font-weight-bold text-center">
                    Create Date
                  </th>
                </tr>
              </thead>

              <tbody v-if="usergamehistory?.length > 0">
                <tr v-for="(item, index) in usergamehistory" :key="item._id">
                  <td scope="col" class="text-center">{{ index + 1 }}</td>
                  <td scope="col" class="text-center">{{ item.periodid }}</td>
                  <td scope="col" class="text-center">{{ item.value }}</td>
                  <td scope="col" class="text-center">
                    {{ item.amount?.toFixed(2) }}
                  </td>
                  <td scope="col" class="text-center">{{ item.tab }}</td>
                  <td scope="col" class="text-center">
                    {{ item.paidamount?.toFixed(2) }}
                  </td>
                  <td scope="col" class="text-center">
                    {{ item.fee?.toFixed(2) }}
                  </td>
                  <td scope="col" class="text-center">{{ item.status }}</td>
                  <td scope="col" class="text-center">
                    {{ formatDate(item.created_at) }}
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
          <nav aria-label="Page navigation">
            <ul class="admin-user-game-history-pagination pagination justify-content-end">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="prevPage">&laquo;</button>
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
                <button class="page-link" @click="gotoPage(totalPages)" v-if="totalPages > 2">
                  {{ totalPages }}
                </button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="nextPage">&raquo;</button>
              </li>
            </ul>
          </nav>
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
import SaidMenuBar from "./SideMenuBar.vue";
import AdminLoader from "./AdminLoaders.vue";
export default {
  name: "AdminUserGameHistory",
  components: {
    Navbar,
    SaidMenuBar,
    AdminLoader,
  },
  data() {
    return {
      usergamehistory: [],
      userId: null,
      currentPage: 1,
      totalPages: 0,
      pagerow: 10,
      mobile: null,
      searchTerms: null,
      loader: false,
    };
  },
  created() {
    this.userId = this.$route.params.userId;
  },
  methods: {
    async getUserGameHistory() {
      this.loarder = true;
      const response = await axios.post("/admin/user_game_history", {
        userId: this.userId,
        page: this.currentPage,
        pageSize: this.pagerow,
      });
      this.usergamehistory = response?.data?.betting_history;
      this.mobile = response?.data?.betting_history[0]?.mobile;
      this.totalPages = response?.data?.totalPages;
      this.currentPage = response?.data?.currentPage;
      this.loarder = false;
    },
    async search() {
      try {
        if (this.searchTerms) {
          const response = await axios.post(`/admin/user_game_history`, {
            searchTerms: this.searchTerms,
          });
          this.usergamehistory = response.data.betting_history;
        } else {
          this.getUserGameHistory();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      const formattedDate = date.toLocaleString();
      return formattedDate;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getUserGameHistory();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getUserGameHistory();
      }
    },
    gotoPage(page) {
      this.currentPage = page;
      this.getUserGameHistory();
    },
  },

  mounted() {
    this.getUserGameHistory();
  },
};
</script>
