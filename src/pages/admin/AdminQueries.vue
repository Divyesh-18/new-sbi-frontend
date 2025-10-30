<template>
    <Navbar />
 <div class="admin-layout">

          <SaidMenuBar />
    <!-- sidenav -->
   
        <div class="main-content-wrapper main-content-table Period_History">
        <div class="period_history_table">
          <h3 class="p-1 mr-0 add-bg-color-sub-header all-queries-title">
            All Queries
          </h3>

          <div class="table-responsive table-responsive-sm">
            <table class="table all-queries-table" v-if="loader === false">
              <thead>
                <tr>
                  <th scope="col" class="font-weight-bold text-center">#</th>
                  <th scope="col" class="font-weight-bold text-center">
                    Complaint ID
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Complaint For
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Member id
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    WhatsApp
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Complaint Time
                  </th>
                  <th scope="col" class="font-weight-bold text-center">
                    Status
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
                    {{ item.complait_id }}
                  </td>
                  <td scope="col" class="text-center">
                    {{ item.complait_for }}
                  </td>
                  <td scope="col" class="text-center">
                    Member {{ index + 1 }}
                  </td>
                  <td scope="col" class="text-center">
                    {{ item.complait_subject }}
                  </td>
                  <td scope="col" class="text-center">
                    {{ new Date(item.complaint_time).toLocaleDateString() }}
                  </td>
                  <td scope="col" class="text-center">
                    {{ item.complaint_status }}
                  </td>
                  <td scope="col" class="text-center">
                    <button class="btn btn-light action-alluser-btn" v-on:click="showModel(item._id)">
                      Resole
                    </button>
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
          <nav aria-label="Page navigation" class="mt-2">
            <ul class="all-queries-pagination pagination justify-content-end">
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
          <div class="notification-modal">
            <Modal v-model:visible="isNoticeModalVisible" height="auto" width="10%" :maskClosable="false"
              offsetTop="25%">
              <div style="background: #fff" class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="color: #000; font-size: 25px">
                  Complaint View
                </h5>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label for="title">Status :-</label>
                    <span>{{ formdata.complaint_status }}</span>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label for="title">mobile :-</label>
                    <span>{{ formdata.mobile }}</span>
                  </div>

                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label for="material">Complaint For:-</label>
                    <span>{{ formdata.complait_for }}</span>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label for="material">WhatsApp:-</label>
                    <span>{{ formdata.complait_subject }}</span>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <label for="material">Complaint:-</label>
                    <span>{{ formdata.complait_id }}</span>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <span>{{
                      new Date(formdata.complaint_time).toLocaleDateString()
                      }}</span>
                  </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <label for="material">Status :-</label>
                  <select id="withdrawalstatus" class="form-control border px-2 py-1"
                    v-model="formdata.complaint_status">
                    <option value="UnderReviews">UnderReviews</option>
                    <option value="Pendding">Pendding</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 p-1">
                  <textarea placeholder="admin replay" class="form-control border p-1" id="textAreaExample4" rows="3"
                    v-model="formdata.complait_reply"></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-comman active" data-dismiss="modal"
                  @click="(isNoticeModalVisible = false), hideModal()">
                  Close
                </button>
                <button class="btn btn-comman active" @click="
                  (isNoticeModalVisible = false),
                  updatecomplaint(formdata._id)
                  ">
                  Submit
                </button>
              </div>
            </Modal>
          </div>
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
  name: "AdminQueries",
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
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      loader: false,
      formdata: {
        _id: "",
        complait_for: "",
        complait_id: "",
        complait_subject: "",
        complait_text: "",
        complait_reply: "",
        complaint_status: "",
        complaint_time: null,
        mobile: null,
      },
    };
  },
  methods: {
    async getcomplit() {
      this.loader = true;
      const response = await axios.post("admin/getcomplaint", {
        page: this.currentPage,
        pageSize: this.pageSize,
      });
      this.data = response.data.data;
      this.totalPages = response.data.totalPages;
      this.currentPage = response.data.currentPage;
      this.loader = false;
    },
    async showModel(id) {
      const complaint = this.data.find((item) => item._id === id);
      console.log("complaint", complaint);
      if (complaint) {
        this.formdata = {
          _id: complaint._id,
          complaint_status: complaint.complaint_status,
          complait_id: complaint.complait_id,
          complait_subject: complaint.complait_subject,
          complait_text: complaint.complait_text,
          complait_for: complaint.complait_for,
          complaint_time: complaint.complaint_time,
          complait_reply: complaint.complait_reply,
          mobile: complaint.mobile,
        };
      }
      this.isNoticeModalVisible = true;
      document.body.classList.add("modal-open");
    },
    async hideModal() {
      this.isNoticeModalVisible = false;
      document.body.classList.remove("modal-open");
    },
    async updatecomplaint() {
      let formData = {
        _id: this.formdata._id,
        complaint_status: this.formdata.complaint_status,
        complait_reply: this.formdata.complait_reply,
      };

      await axios
        .put(`admin/updatecomplaint`, formData)
        .then((response) => {
          if (response.data.success) {
            this.getcomplit();
            this.hideModal();
          } else {
            console.error("Update failed: ", response.data.message);
            // Handle error as needed
          }
        })
        .catch((error) => {
          console.log(error);
          // Handle error as needed
        });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getcomplit();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getcomplit();
      }
    },
    gotoPage(page) {
      this.currentPage = page;
      this.getcomplit();
    },
  },
  mounted() {
    this.getcomplit();
  },
};
</script>
