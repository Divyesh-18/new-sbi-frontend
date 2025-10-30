<template>
    <Navbar />
    <!-- sidenav -->
    <div class="admin-layout">
                <SaidManuBar />
           
            
            <div class="main-content-wrapper main-content-table">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="font-weight-normal">
                        <p class="mr-0 add-bg-color-sub-header font-weight-normal" style="font-size: 25px !important;">
                            Red Envelope
                        </p>
                    </div>
                    <div>
                        <span style="font-size: 10px;"><i class="fa fa-dashboard mr-1"></i> Home > Dashboard > Edit
                            Envelope</span>
                    </div>
                </div>
                <div>
                    <button class="btn" @click="goBack">
                        Back
                    </button>
                </div>
                <h3 class="edit-envelope-title p-1 mr-0 m-1 ml-0 add-bg-color-sub-header">
                    Edit Red Envelope
                </h3>
                <div class="custom-box">
                    <form @submit.prevent="submitForm">
                        <div class="p-2 pl-3">
                            <div class="form-group">
                                <label for="name" class="text-light">Name</label>
                                <input type="text" id="name" v-model="formData.name" class="form-control" required />
                            </div>
                            <div class="form-group">
                                <label for="code" class="text-light">Code</label>
                                <input type="text" id="code" v-model="formData.code" class="form-control" required />
                            </div>
                            <div class="form-group">
                                <label for="distributedAmount" class="text-light">Distributed Amount</label>
                                <input type="number" id="distributedAmount" v-model="formData.distributed_amount"
                                    class="form-control" required />
                            </div>
                            <button type="submit" class="btn btn-envelop-submit">Submit</button>
                        </div>
                    </form>
                </div>
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

export default {
    name: "AdminEditRedEnvelope",
    data() {
        return {
            loader: false,
            formData: {
                name: "",
                code: "",
                distributed_amount: 0,
            },
        };
    },
    components: {
        Navbar,
        SaidManuBar,
        AdminLoader,
    },
    methods: {
        async goBack() {
            this.$router.push({ name: "AdminRedEnvelope" });
        },
        async fetchData() {
            this.loader = true;
            try {
                const response = await axios.get(`/admin/get-single-red-envelope`, {
                    params: {
                        id: this.$route.params.id
                    },
                });
                this.formData = response.data.data;
            } catch (error) {
                console.error("Error fetching envelope data", error);
            } finally {
                this.loader = false;
            }
        },
        async submitForm() {
            this.loader = true;
            try {
                const response = await axios.put(`/admin/red-envelope-update?id=${this.$route.params.id}`, this.formData);
                if (response.data.success) {
                    alert("Red Envelope updated successfully");
                    this.goBack();
                }
            } catch (error) {
                console.error("Error updating red envelope", error);
                alert("Failed to update. Please try again.");
            } finally {
                this.loader = false;
            }
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>
<style>
.edit-envelope-title {
    background: linear-gradient(60deg, #222a30, rgb(42 109 207 / 87%));
    color: white;
    font-size: 1.25rem;
    padding: 10px 10px !important;
    border: none;
    width: 45%;
}

.custom-box {
    width: 45%;
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
    font-size: 10px;
    height: 30px;
    width: 150px;
}
</style>