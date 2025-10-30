<template>
  <Navbar />
  <div class="admin-layout">
  <!-- sidenav -->
        <SaidManuBar />
    
    
      <div class="main-content-wrapper main-content-table">
        <div class="d-flex justify-content-between align-items-center">
          <div class="font-weight-normal">
            <p class="mr-0 add-bg-color-sub-header font-weight-normal" style="font-size: 25px !important;">
              Red Envelope
            </p>
          </div>
          <div>
            <span style="font-size: 10px;"><i class="fa fa-dashboard mr-1"></i> Home > Dashboard > Add Envelope
              User</span>
          </div>
        </div>
        <div>
          <button class="btn" @click="addRedEnvelop">
            back
          </button>
        </div>
        <h3 class="periodhistory-title p-1 mr-0 m-1 ml-0 add-bg-color-sub-header">
          Envelope User
        </h3>
        <div class="custom-box-envelope">
          <div class="p-2 pl-3">
            <div class="fw-bold text-white text-start pb-1">Add Envelope User</div>
            <div class="col-lg-4 col-md-6 col-sm-12 report-filter">
              <select class="form-select" id="EnvelopeUser" v-model="selectedUser" data-placeholder="Select User">
                <option value="" disabled selected>Select User</option>
                <option v-for="user in filteredUsers" :key="user._id" :value="user._id">
                  {{ user.mobile }}
                </option>
              </select>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 mt-0 text-center">
              <button class="btn-envelop-submit" @click="addRedEnvelopUser">
                submit
              </button>
            </div>
          </div>
        </div>
        <div class="envelope-search" role="search">
          <label>Search:</label>
          <input class="form-control p-1" v-model="searchTerms" @input="getData()" type="search" aria-label="Search"
            id="input" />
        </div>
        <div class="table-responsive table-responsive-sm">
          <table class="periodhistory-table table" v-if="loader === false">
            <thead>
              <tr>
                <th scope="col" class="font-weight-bold text-center">
                  #
                </th>
                <th scope="col" class="font-weight-bold text-center">
                  UserId
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  Number
                </th>
                <th scope="col" class="font-weight-bold text-center add-table-data-in-center-width">
                  Active
                </th>
              </tr>
            </thead>
            <tbody v-if="data?.length > 0">
              <tr v-for="(item, index) in data" :key="item._id">
                <td scope="col" class="text-center">{{ index + 1 }}</td>
                <td scope="col" class="text-center">{{ item.loginId }}</td>
                <td scope="col" class="text-center">
                  {{ item.mobile }}
                </td>
                <td scope="col" class="text-center">
                  <button class="btn-envelop-submit" @click="removeRedEnvelopUser(item._id)">
                    Remove
                  </button>
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
        <nav aria-label="Page navigation" style="display: flex; justify-content:space-between; padding-bottom:40px;">
          <div>Showing 1 to {{ pageRow }} of {{ totalCount }}
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
  <!-- loader -->
  <div class="loadings" v-show="loader">
    <AdminLoader />
  </div>
</template>

<script>
import SaidManuBar from "./SideMenuBar.vue";
import Navbar from "./Navbar.vue";
import axios from "axios";
import AdminLoader from "./AdminLoaders.vue";
import $ from "jquery";

export default {
  name: "AdminAddRedEnvelope",
  data() {
    return {
      page: 1,
      pageRow: 10,
      totalCount: 0,
      searchTerms: null,
      loader: false,
      envelopeUsers: [],
      filteredUsers: [],
      data: []
    };
  },
  components: {
    Navbar,
    SaidManuBar,
    AdminLoader,
  },
  methods: {
    async addRedEnvelop() {
      this.$router.push({ name: "AdminRedEnvelope" });
    },
    async getEnvelopUserData() {
      try {
        const response = await axios.get("/admin/red-envelope-user-list");
        this.envelopeUsers = response.data.data;
        this.filteredUsers = response.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    filterUsers() {
      this.filteredUsers = this.envelopeUsers.filter(user =>
        user.mobile.includes(this.searchTerm)
      );
      this.$nextTick(() => {
        $('#EnvelopeUser').trigger('change');
      });
    },
    async addRedEnvelopUser() {
      const isConfirmed = window.confirm("Are you sure you want to add this user from the red envelope?");
      if (!isConfirmed) {
        return;
      }
      const userId = document.getElementById('EnvelopeUser').value;
      if (!userId) {
        alert("Please select a user.");
        return;
      }
      try {
        this.loader = true;
        await axios.get("/admin/add-red-envelop", {
          params: {
            userId: userId,
          },
        });
        this.getEnvelopUserData();
        this.getData();
      } catch (error) {
        console.error("Error adding red envelope user:", error);
      } finally {
        this.loader = false;
      }
    },
    async getData() {
      try {
        this.loader = true;
        const response = await axios.get(`/admin/red-envelope-list`, {
          params: {
            page: this.page,
            pagerow: this.pageRow,
            search: this.searchTerms,
          },
        });
        this.data = response.data.data;
        this.totalPages = response.data.metadata.totalPages;
        this.currentPage = response.data.metadata.page;
        this.totalCount = response.data.metadata.total;
        this.loader = false;
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.getData();
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.getData();
      }
    },
    gotoPage(page) {
      this.page = page;
      this.getData();
    },
    async removeRedEnvelopUser(userId) {
      const isConfirmed = window.confirm("Are you sure you want to remove this user from the red envelope?");

      if (!isConfirmed) {
        return;
      }
      try {
        await axios.get("/admin/remove-user-in-red-envelope", {
          params: {
            userId: userId,
          },
        });
        this.getEnvelopUserData();
        this.getData();
      } catch (error) {
        console.error("Error adding red envelope user:", error);
      }
    },
  },
  mounted() {
    this.getData();
    this.getEnvelopUserData();
    this.filterUsers()
    const user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "AdminLogin" });
    }
  },
  watch: {
    filteredUsers() {
      this.$nextTick(() => {
        $('#EnvelopeUser').select2();
      });
    }
  },
  updated() {
    this.$nextTick(() => {
      $('#EnvelopeUser').select2();
    });
  },
};
</script>

<style>
.custom-box-envelope {
  width: 100% !important;
  height: auto;
  border: 1px solid #ccc;
  margin: 10px 0;
  background-color: #111111;
}

.report-filter {
  padding: 10px 15px;
  font-size: 12px;
  outline: none;
  border-radius: 5px;
}

#EnvelopeUser {
  width: 100% !important;
  max-width: 500px;
}

.btn-envelop-submit {
  color: #fff;
  font-size: 15px;
  background-color: #318dbc;
  border: none;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;

}

.envelope-search {
  display: flex;
  justify-content: end;
  margin-bottom: 5px;
}

.envelope-search label {
  padding-top: 5px;
  margin-left: 2px;
}

.envelope-search input {
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  font-size: 20px;
  height: 30px;
  width: 150px;
}
</style>
