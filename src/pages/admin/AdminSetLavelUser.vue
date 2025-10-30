<template>
    <Navbar />
  <div class="admin-layout">
          <SaidMenuBar />

    <!-- sidenav -->
  
        
        <div class="main-content-wrapper main-content-table Period_History">
               <div class="period_history_table">

          <h3 class="p-1 mr-0 add-bg-color-sub-header admin-set-level-user-title">
            Set Level User
          </h3>
          <nav class="navbar">
            <div class="d-flex" role="addnew">
              <button type="button" class="btn btn-outline-dark shadow admin-set-level-user-level-buttons"
                @click="addleveluser">
                Add New
              </button>
            </div>

            <div class="admin-set-level-user-search-box d-flex ml-auto" role="search">
              <label>Search:</label>
              <input class="form-control p-1" v-model="searchTerms" @input="search()" type="search" aria-label="Search"
                id="input" />
            </div>
          </nav>
          <div class="table-responsive">
            <table class="table admin-set-level-user-table" v-if="loader === false">
              <thead>
                <tr>
                  <th scope="col" class="font-weight-bold text-center">id</th>
                  <th scope="col" class="font-weight-bold text-center">
                    Level
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Percentage
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Amount
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody v-if="data.length > 0">
                <tr v-for="(item, index) in data" :key="item._id">
                  <td scope="col" class="text-center">{{ index + 1 }}</td>
                  <td scope="col" class="text-center">{{ item.lavel_id }}</td>
                  <td scope="col" class="text-center">
                    {{ item.percentage }}<span>%</span>
                  </td>
                  <td scope="col" class="text-center">{{ item.amount }}</td>
                  <td scope="col" class="text-center">
                    <i class="bi bi-pen p-1 cursor-pointer" @click="showModal(item._id)" data-toggle="modal"
                      data-target="#exampleModalCenter1"></i>
                    <i class="bi bi-trash cursor-pointer" v-show="index === data.length - 1"
                      @click="deleteleveluser(item._id)"></i>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="6" class="text-center">No Data Found</td>
                </tr>
              </tbody>
            </table>
            <div class="notification-modal">
              <Modal v-model:visible="isNoticeModalVisible" height="auto" width="10%" :maskClosable="false"
                offsetTop="25%">
                <div style="background: #fff" class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel" style="color: #000; font-size: 25px">
                    Edit UserLevel
                  </h5>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                      <label for="username">Level<span class="text-danger h2">*</span></label>
                      <input type="text" class="form-control border" id="title" v-model="formData.lavel_id" required />
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12">
                      <label for="username">Percentage<span class="text-danger h2">*</span></label>
                      <input type="text" class="form-control border" id="title" v-model="formData.percentage"
                        required />
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12">
                      <label for="username">Amount<span class="text-danger h2">*</span></label>
                      <input type="text" class="form-control border" id="title" v-model="formData.amount" required />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-comman active" data-dismiss="modal"
                    @click="(isNoticeModalVisible = false), hideModal()">
                    Close
                  </button>
                  <button class="btn btn-comman active" @click="(isNoticeModalVisible = false), updateleveluser()">
                    Submit
                  </button>
                </div>
              </Modal>
            </div>
          </div>
          <!-- <nav aria-label="Page navigation">
            <ul
              class="admin-set-level-user-pagination pagination justify-content-end"
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
import { Modal } from "usemodal-vue3";
import AdminLoader from "./AdminLoaders.vue";
export default {
  name: "AdminSetLavelUser",
  components: {
    Navbar,
    SaidMenuBar,
    Modal,
    AdminLoader
  },
  data() {
    return {
      isNoticeModalVisible: false,
      data: [],
      searchTerms: null,
      currentPage: 1,
      totalPages: 0,
      pagerow: 10,
      formData: {
        _id: "",
        lavel_id: null,
        percentage: null,
        amount: null,
      },
      loader: false,
    };
  },
  methods: {
    addleveluser() {
      this.$router.push({ name: "AdminLevelUser" });
    },
    async deleteleveluser(id) {
      try {
        await axios.delete(`/admin/deleteleveluser`, { data: { id } });
        this.getleveluser();
      } catch (error) {
        console.log(error);
      }
    },
    async getleveluser() {
      try {
        this.loader = true;
        const response = await axios.post("admin/getleveluser", {
          page: this.currentPage,
          pagerow: this.pagerow,
        });
        this.data = response.data.data;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
        this.loader = false;
      } catch (error) {
        console.error("Error fetching level users:", error);
      }
    },
    async updateleveluser() {
      try {
        const response = await axios.put(
          "/admin/updateleveluser",
          this.formData
        );
        const responseData = response.data;
        if (responseData.success) {
          this.getleveluser();
          this.hideModal();
        } else {
          console.error(responseData.message);
        }
      } catch (error) {
        console.error("Error occurred while updating user level:", error);
      }
    },
    hideModal() {
      this.isNoticeModalVisible = false;
      document.body.classList.remove("modal-open");
    },
    showModal(_id) {
      const userlevel = this.data.find((item) => item._id === _id);
      if (userlevel) {
        this.formData = {
          _id: userlevel._id,
          lavel_id: userlevel.lavel_id,
          percentage: userlevel.percentage,
          amount: userlevel.amount,
        };
      }
      this.isNoticeModalVisible = true;
      document.body.classList.add("modal-open");
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getleveluser();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getleveluser();
      }
    },
    gotoPage(page) {
      this.currentPage = page;
      this.getleveluser();
    },
    search() {
      if (this.searchTerms) {
        axios
          .post(`admin/getleveluser/?searchTerms=${this.searchTerms}`, {
            page: 1,
            pagerow: this.pagerow,
            searchTerms: {
              lavel_id: parseInt(this.searchTerms),
            },
          })
          .then((response) => {
            this.data = response.data.data;
            this.totalPages = response.data.totalPages;
            this.currentPage = response.data.currentPage;
          })
          .catch((error) => {
            console.error("Error searching:", error);
          });
      } else {
        this.getleveluser();
      }
    },
  },
  mounted() {
    this.getleveluser();
  },
};
</script>
