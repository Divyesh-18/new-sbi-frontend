<template>
  <Navbar />
  <div class="admin-layout">
    <SaidMenuBar />

    <!-- sidenav -->

    <div class="main-content-wrapper main-content-table Period_History">
      <div class="period_history_table">
        <h3 class="p-1 mr-0 add-bg-color-sub-header admin-manage-banner-title">
          Manage Banner
        </h3>
        <nav class="navbar">
          <div class="d-flex" role="addnew">
            <button type="button" class="btn btn-outline-dark shadow admin-manage-banner-level-buttons"
              @click="addBanner">
              Add New
            </button>
          </div>

          <div class="admin-manage-banner-search-box d-flex ml-auto" role="search">
            <label>Search:</label>
            <input class="form-control p-1" v-model="searchTerm" @input="search" type="search" aria-label="Search"
              id="input" />
          </div>
        </nav>

        <div class="table-responsive">
          <table class="table admin-manage-banner-table" v-if="loader === false">
            <thead>
              <tr>
                <th scope="col" class="font-weight-bold text-center">
                  Sr.No
                </th>
                <th scope="col" class="font-weight-bold text-center">
                  Title
                </th>
                <th scope="col" class="font-weight-bold text-center">
                  Images
                </th>
                <th scope="col" class="font-weight-bold text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody v-if="data.length > 0">
              <tr v-for="(item, index) in data" :key="item._id">
                <td scope="col" class="text-center">{{ index + 1 }}</td>
                <td scope="col" class="text-center">
                  {{ item.banner_title }}
                </td>
                <td scope="col" class="text-center">
                  <img :src="item.material" alt="Banner Image" style="max-width: 100px; max-height: 50px" />
                </td>
                <td scope="col" class="text-center">
                  <i class="bi bi-pen p-1 cursor-pointer" @click="showModal(item._id)" data-toggle="modal"
                    data-target="#exampleModalCenter1"></i>
                  <i class="bi bi-trash cursor-pointer" @click="showDeleteModel(item._id)"></i>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="4" class="text-center">No Data Found</td>
              </tr>
            </tbody>
          </table>
          <div class="notification-modal">
            <Modal v-model:visible="isNoticeModalDelete" height="auto" width="10%" :maskClosable="false"
              offsetTop="25%">
              <div style="background: #fff" class="modal-header"></div>
              <b>Are You Sure You Want To Delete?</b>
              <div class="modal-footer">
                <button type="button" class="btn btn-comman active" data-dismiss="modal" @click="
                  (isNoticeModalDelete = false), hideModalDelete()
                  ">
                  Cancel
                </button>
                <button class="btn btn-comman active" @click="(isNoticeModalDelete = false), deleteBanner()">
                  Delete
                </button>
              </div>
            </Modal>
          </div>
          <div class="notification-modal">
            <Modal v-model:visible="isNoticeModalVisible" height="auto" width="10%" :maskClosable="false"
              offsetTop="25%">
              <div style="background: #fff" class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="color: #000; font-size: 25px">
                  Edit Banner
                </h5>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label for="title">Add Title<span class="text-danger h2">*</span></label>
                    <input type="text" class="form-control border" id="title" v-model="formData.banner_title"
                      required />
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label for="material">Images<span class="text-danger h2">*</span></label>
                    <input type="file" class="form-control border" @change="handleFileChange($event)" id="material" />
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 p-1 d-flex justify-content-center align-items-center">
                    <img :src="formData.material" alt="BannerImage" style="max-width: 100px; max-height: 50px" />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-comman active" data-dismiss="modal"
                  @click="(isNoticeModalVisible = false), hideModal()">
                  Close
                </button>
                <button class="btn btn-comman active" @click="(isNoticeModalVisible = false), updateBannerData()">
                  Submit
                </button>
              </div>
            </Modal>
          </div>
        </div>
        <nav aria-label="Page navigation" class="mt-2">
          <ul class="admin-manage-banner-pagination pagination justify-content-end">
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
              <button class="page-link" @click="gotoPage(totalPages)" v-if="totalPages > 2">
                {{ totalPages }}
              </button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="nextPage">Next</button>
            </li>
          </ul>
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
import { Modal } from "usemodal-vue3";
import Navbar from "./Navbar.vue";
import SaidMenuBar from "./SideMenuBar.vue";
import AdminLoader from "./AdminLoaders.vue";
export default {
  name: "AdminManageBanner",
  components: {
    Navbar,
    SaidMenuBar,
    AdminLoader,
    Modal,
  },
  data() {
    return {
      data: [],
      searchTerm: "",
      isNoticeModalVisible: false,
      isNoticeModalDelete: false,
      currentPage: 1,
      totalPages: 0,
      pagerow: 10,
      deleteItemId: null,
      formData: {
        _id: "",
        banner_title: "",
        material: null,
      },
      loader: false,
    };
  },
  methods: {
    async addBanner() {
      this.$router.push({ name: "AdminAddBanner" });
    },
    async getBannerData() {
      try {
        this.loader = true;
        const response = await axios.post(`/get-banners`, {
          page: this.currentPage,
          pagerow: this.pagerow,
        });
        this.data = response.data.data;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
        // console.log("response", response.data.data);
        this.loader = false;
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.material = file;
      }
    },
    async updateBannerData() {
      try {
        const formData = new FormData();
        formData.append("_id", this.formData._id);
        formData.append("banner_title", this.formData.banner_title);
        formData.append("material", this.formData.material);

        await axios.put("/admin/updatebanner", formData);
        this.getBannerData();
        this.hideModal();
      } catch (error) {
        console.error("Error occurred while updating banner:", error);
      }
    },
    showModal(_id) {
      const banner = this.data.find((item) => item._id === _id);
      if (banner) {
        this.formData = {
          _id: banner._id,
          banner_title: banner.banner_title,
          material: banner.material,
        };
      }
      this.isNoticeModalVisible = true;
      document.body.classList.add("modal-open");
    },
    async deleteBanner() {
      try {
        await axios.delete(`/admin/deletebanner`, {
          data: { _id: this.deleteItemId },
        });
        this.getBannerData();
        this.hideModalDelete();
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    },
    showDeleteModel(_id) {
      this.deleteItemId = _id;
      this.isNoticeModalDelete = true;
      document.body.classList.add("modal-open");
    },
    hideModalDelete() {
      this.isNoticeModalDelete = false;
      document.body.classList.remove("modal-open");
    },
    hideModal() {
      this.isNoticeModalVisible = false;
      document.body.classList.remove("modal-open");
    },
    search() {
      axios
        .post(`/get-banners?searchTerms=${this.searchTerms}`, {
          page: 1,
          pagerow: this.pagerow,
          searchTerms: {
            banner_title: this.searchTerm,
          },
        })
        .then((response) => {
          this.data = response.data.data;
          this.totalPages = response.data.totalPages;
          this.currentPage = response.data.currentPage;
        })
        .catch((error) => {
          console.error("Error searching banners:", error);
        });
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getBannerData();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getBannerData();
      }
    },
    gotoPage(page) {
      this.currentPage = page;
      this.getBannerData();
    },
  },
  mounted() {
    this.getBannerData();
  },
};
</script>
