<template>
    <Navbar />
    <div class="admin-layout">
        <SaidMenuBar />

        <!-- sidenav -->


        <div class="main-content-wrapper main-content-table">
            <h3 class="mr-0 add-bg-color-sub-header period-bateing-history-title">
                Period ID :- {{ this.periodid }}
            </h3>

            <!-- <nav class="navbar pr-0 pl-0">
            <div
              class="period-bateing-history-search-box d-flex ml-auto"
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
                <table class="table period-bateing-history-table">
                    <thead>
                        <tr>
                            <th scope="col" class="font-weight-bold text-center">#</th>
                            <th scope="col" class="font-weight-bold text-center">User</th>
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
                            <th scope="col" class="font-weight-bold text-center">
                                Create Date
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="data?.length > 0 && loader === false">
                        <tr v-for="(item, index) in data" :key="item._id">
                            <td scope="col" class="text-center">{{ index + 1 }}</td>
                            <td scope="col" class="text-center">
                                {{ item.user || "wait" }}
                            </td>
                            <td scope="col" class="text-center">
                                {{ item.value || "wait" }}
                            </td>
                            <td scope="col" class="text-center">
                                {{ item?.amount?.toFixed(2) || "wait" }}
                            </td>
                            <td scope="col" class="text-center">
                                {{ item.tab || "wait" }}
                            </td>
                            <td scope="col" class="text-center">
                                {{ item?.paidamount?.toFixed(2) || "wait" }}
                            </td>
                            <td scope="col" class="text-center">
                                {{ item.fee || "wait" }}
                            </td>
                            <td scope="col" class="text-center">{{ item.status }}</td>
                            <td scope="col" class="text-center">
                                {{
                                    new Date(item.created_at).toLocaleDateString() || "wait"
                                }}
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="9" class="text-center">No Data Founds</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav aria-label="Page navigation">
                <ul class="period-bateing-history-pagination pagination justify-content-end">
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
    <!-- loader -->
    <div class="loadings" v-show="loader">
        <AdminLoader />
    </div>
</template>

<script>
import axios from "axios";
import Navbar from "../Navbar.vue";
import SaidMenuBar from "../SideMenuBar.vue";
import AdminLoader from "../AdminLoaders.vue";
export default {
    name: "AdminPeriodIdUpdate",
    components: {
        Navbar,
        SaidMenuBar,
        AdminLoader
    },
    data() {
        return {
            data: [],
            searchTerms: null,
            periodid: null,
            currentPage: 1,
            totalPages: 0,
            pagerow: 10,
            loader: true,
        };
    },
    created() {
        this.periodid = parseInt(this.$route.params.periodid);
        console.log("game", this.periodid);
    },
    methods: {
        async getPeriodData() {
            try {
                this.loader = true;
                const response = await axios.post(`/admin/period-id-wise-user-history`, {
                    gameid: this.periodid,
                    page: this.currentPage,
                    pagerow: this.pagerow,
                });
                this.data = response.data.data;
                this.totalPages = response.data.totalPages;
                this.currentPage = response.data.currentPage;
                this.loader = false;
            } catch (error) {
                console.log(error)
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getPeriodData();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.getPeriodData();
            }
        },
        gotoPage(page) {
            this.currentPage = page;
            this.getPeriodData();
        },
        async search() {
            try {
                if (this.searchTerms) {
                    const response = await axios.post(`/admin/period-id-wise-user-history`, {
                        searchTerms: this.searchTerms,
                    });
                    this.data = response.data.data;
                } else {
                    this.getPeriodData();
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
    },
    mounted() {
        this.getPeriodData();
    },
};
</script>
