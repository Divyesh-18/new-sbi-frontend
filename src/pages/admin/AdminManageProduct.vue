<template>
  <Navbar />
  <div class="admin-layout">
    <SaidMenuBar />

    <!-- sidenav -->

    <div class="main-content-wrapper main-content-table Period_History">
      <div class="period_history_table">
        <h3 class="p-1 mr-0 add-bg-color-sub-header admin-manage-product-title">
          Manage Products
        </h3>

        <nav class="navbar">
          <div class="d-flex" role="addnew">
            <button type="button" class="btn btn-outline-dark shadow admin-manage-product-level-buttons"
              @click="addProduct">
              Add New
            </button>
          </div>

          <div class="admin-manage-product-search-box d-flex ml-auto" role="search">
            <label>Search:</label>
            <input class="form-control p-1" v-model="searchTearms" @input="search" type="search" aria-label="Search"
              id="input" />
          </div>
        </nav>
        <div class="table-responsive">
          <table class="table admin-manage-product-table" v-if="loader === false">
            <thead>
              <tr>
                <th scope="col" class="font-weight-bold text-center">
                  Product
                </th>
                <th scope="col" class="font-weight-bold text-center">
                  Price
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
              <tr v-for="item in data" :key="item._id">
                <td scope="col" class="text-center">{{ item.name }}</td>
                <td scope="col" class="text-center">{{ item.price }}</td>
                <td scope="col" class="text-center">
                  <img :src="item.product_url" alt="Banner Image" style="max-width: 100px; max-height: 50px" />
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
              <div class="modal-body">
                <b>Are You Sure You Want To Delete?</b>
              </div>
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
                  Edit Product
                </h5>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label for="Description">Description<span class="text-danger h2">*</span></label>
                    <textarea type="text" class="form-control border p-2" id="Description"
                      v-model="formData.description" required></textarea>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label for="Price">Price<span class="text-danger h2">*</span></label>
                    <input type="text" class="form-control border" id="Price" v-model="formData.price" required />
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label for="Image">Images<span class="text-danger h2">*Size(1500x1500)</span></label>
                    <input type="file" class="form-control border" id="Image" @change="handleFileChange($event)"
                      required />
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 p-1 d-flex justify-content-center align-items-center">
                    <img :src="formData.image" alt="BannerImage" style="max-width: 100px; max-height: 50px" />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-comman active" data-dismiss="modal"
                  @click="(isNoticeModalVisible = false), hideModal()">
                  Close
                </button>
                <button class="btn btn-comman active" @click="(isNoticeModalVisible = false), updateProductData()">
                  Submit
                </button>
              </div>
            </Modal>
          </div>
        </div>
        <nav aria-label="Page navigation" class="mt-2">
          <ul class="admin-manage-product-pagination pagination justify-content-end">
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

import Navbar from "./Navbar.vue";
import SaidMenuBar from "./SideMenuBar.vue";
import { Modal } from "usemodal-vue3";
import AdminLoader from "./AdminLoaders.vue";
export default {
  name: "AdminManageProduct",
  components: {
    Navbar,
    SaidMenuBar,
    Modal,
    AdminLoader
  },
  data() {
    return {
      data: [],
      isNoticeModalVisible: false,
      isNoticeModalDelete: false,
      deleteItemId: null,
      currentPage: 1,
      totalPages: 0,
      pagerow: 10,
      searchTearms: "",
      formData: {
        _id: "",
        description: "",
        price: null,
        image: null,
      },
      loader: false,
    };
  },
  methods: {
    addProduct() {
      this.$router.push({ name: "AdminAddProduct" });
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.product_url = file;
      }
    },
    async getProduct() {
      this.loader = true;
      const response = await axios.post(`/get-all-product`, {
        page: this.currentPage,
        pagerow: this.pagerow,
      });
      this.data = response.data.data;
      this.totalPages = response.data.totalPages;
      this.currentPage = response.data.currentPage;
      this.loader = false;
    },
    async search() {
      const response = await axios.post(
        `/get-all-product?searchTearms=${this.searchTearms}`,
        {
          page: this.currentPage,
          pagerow: this.pagerow,
          searchTearms: {
            price: this.searchTearms,
            name: this.searchTearms,
          },
        }
      );
      this.data = response.data.data;
      this.totalPages = response.data.totalPages;
      this.currentPage = response.data.currentPage;
    },
    async deleteBanner() {
      try {
        await axios.delete(`/admin/deleteproduct`, {
          data: { _id: this.deleteItemId },
        });
        this.getProduct();
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
    async updateProductData() {
      try {
        const formData = new FormData();
        formData.append("_id", this.formData._id);
        formData.append("name", this.formData.description);
        formData.append("price", this.formData.price);
        formData.append("image", this.formData.product_url);

        await axios.put("/admin/updateproduct", formData);
        this.getProduct();
        this.hideModal();
      } catch (error) {
        console.error("Error occurred while updating banner:", error);
      }
    },
    showModal(_id) {
      const Product = this.data.find((item) => item._id === _id);
      console.log("product", Product.product_url);
      if (Product) {
        this.formData = {
          _id: Product._id,
          description: Product.name,
          price: Product.price,
          image: Product.product_url,
        };
      }
      this.isNoticeModalVisible = true;
      document.body.classList.add("modal-open");
    },
    hideModal() {
      this.isNoticeModalVisible = false;
      document.body.classList.remove("modal-open");
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getProduct();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getProduct();
      }
    },
    gotoPage(page) {
      this.currentPage = page;
      this.getProduct();
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
