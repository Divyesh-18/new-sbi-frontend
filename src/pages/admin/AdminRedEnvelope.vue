<template>
  <Navbar />
  <div class="admin-layout">
    <SaidManuBar />

    <!-- sidenav -->

    <!--<div class="col-lg-2 col-md-3 col-sm-4 col-12 pl-0">-->
    <!-- </div> -->

    <!-- <div class="col-lg-10 col-md-9 col-sm-8 col-12 p-1 bg-white bg-gradient periodhistory-content">-->
    <div class="main-content-wrapper main-content-table Period_History">
      <div class="period_history_table">

        <h3 class="periodhistory-title p-1 mr-0 m-1 ml-0 add-bg-color-sub-header" stylr=" text-transform: capitalize;">
          Red Envelope
        </h3>
        <nav class="navbar pr-0 pl-0">
          <div>
            <button class="btn btn-envelop" @click="addRedEnvelop" style="margin-right: 10px;">
              Envelope User
            </button>
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
                  #
                </th>
                <th scope="col" class="font-weight-bold text-center">
                  Name
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">Code
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">Distributed
                  Amount
                </th>
                <th scope="col" class="font-weight-bold text-center">Status
                </th>
                <th scope="col" class="font-weight-bold text-center">Active
                </th>
                <th scope="col" class="font-weight-bold text-center">Create Date
                </th>
                <th scope="col" class="font-weight-bold text-center">
                  Copy Url
                </th>
              </tr>
            </thead>
            <tbody v-if="data.length > 0">
              <tr v-for="(item, index) in data" :key="item._id">
                <td class="text-center">{{ (currentPage - 1) * pagerow + index + 1 }}</td>
                <td class="text-center" style="min-width:130px;">{{ item.name }}</td>
                <td class="text-center">{{ item.code.toLocaleLowerCase() }}</td>
                <td class="text-center">{{ item.distributed_amount }}</td>
                <td class="text-center">
                  <div class="btn-group" role="group">
                    <button class="btn btn-sm" :class="{
                      'btn-active': item.status == 1,
                      'btn-white': item.status !== 1
                    }" @click="updateStatus(item, 1)">
                      Activate
                    </button>
                    <button class="btn btn-sm" :class="{
                      'btn-active': item.status == 0,
                      'btn-white': item.status !== 0
                    }" @click="updateStatus(item, 0)">
                      Inactivate
                    </button>
                    <button class="btn btn-sm" :class="{
                      'btn-active': item.status == 2,
                      'btn-white': item.status !== 2
                    }" @click="updateStatus(item, 2)">
                      Stop
                    </button>
                  </div>
                </td>
                <td class="text-center">
                  <button class="btn-copy-envelope pl-2 pr-2" @click="onEdit(item?._id)">
                    Edit</button>
                </td>
                <td class="text-center">{{ new Date(item.created_at).toLocaleDateString() }}</td>
                <td class="text-center">
                  <ol>
                    <p class="remove_margin-block_start" style="color: rgb(255, 168, 46) !important;"
                      v-if="item.status == '0' || item.status == '2'">Timeout
                    </p>
                    <button v-if="item.status == '1'" class="btn-copy-envelope" @click="onCopy(item?.code)">Copy
                      Url</button>
                  </ol>
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
  <div class="toast-content" v-show="isErrorShow" style="position: fixed;top: 0px;bottom: 0px;left: 0px;right: 0px;">
    <div class="toast-message">{{ errorMessage }}</div>
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
  name: "AdminAccepWithdrawal",
  data() {
    return {
      data: [],
      currentPage: 1,
      totalPages: 0,
      pagerow: 10,
      searchTerms: "",
      loader: false,
      totalCount: 0,
      errorMessage: '',
      isErrorShow: false
    };
  },
  components: {
    Navbar,
    SaidManuBar,
    AdminLoader
  },
  methods: {
    async addRedEnvelop() {
      this.$router.push({ name: "AdminAddRedEnvelope" });
    },
    async onEdit(id) {
      this.$router.push({ name: "adminEditRedEnvelope", params: { id } });
    },
    async getPeriodIdData() {
      this.loader = true;
      try {
        const response = await axios.get("/admin/red-envelope-data-list", {
          params: {
            page: this.currentPage,
            pageRow: this.pagerow,
            search: this.searchTerms,
          },
        });
        if (response.data.success) {
          this.data = response.data.data;
          this.totalPages = response.data.totalPages;
          this.totalCount = response.data.total;
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loader = false;
      }
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
    search() {
      this.currentPage = 1;
      this.getPeriodIdData();
    },
    async updateStatus(item, status) {
      try {
        const response = await axios.put('/admin/red-envelope-status-update', null, {
          params: {
            id: item._id,
            status: status
          }
        });

        if (response.data.success) {
          item.status = status;
          this.setErrorMessage("Status updated successfully");
        }
      } catch (error) {
        console.error("Error updating status", error);
        this.setErrorMessage("Failed to update status");
      }
    },
    setErrorMessage(value) {
      this.errorMessage = value;
      this.isErrorShow = true;
      setTimeout(() => {
        this.errorMessage = "";
        this.isErrorShow = false;
      }, 2000);
    },
    async onCopy(value) {
      try {
        console.log("onCopy", value)
        var curl = 'http://' + location.host + '/#/redenvelopes?code=' + value;

        await navigator.clipboard.writeText(curl)
        this.setErrorMessage("Success");
      } catch ($e) {
        this.setErrorMessage("Cannot copy");
      }
    },
  },
  mounted() {
    this.getPeriodIdData();
  },
};
</script>

<style>
.btn-envelop {
  color: #fff;
  font-size: 12px;
  background-color: #318dbc;
  padding: 0px;
  width: 100%;
}

.btn-copy-envelope {
  color: #fff;
  font-size: 12px;
  background-color: #318dbc;
  padding-bottom: 10px;
  padding-top: 10px;
  border: none;
}

.btn-envelop:hover {
  color: #fff;
}

.btn-active {
  background-color: #dd4b39;
  color: white;
}

.btn-white {
  background-color: white;
  color: black;
  border: 1px solid #ccc;
}

.btn {
  border: none;
}

.btn:hover {
  opacity: 0.8;
}
</style>