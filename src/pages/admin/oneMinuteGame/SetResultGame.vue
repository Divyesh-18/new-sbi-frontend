<template>
    <Navbar />
    <div class="admin-layout">
        <SaidManuBar />
        <!-- <div class="container-fluid"> -->
        <!--  <div class="row"> -->
        <!-- Sidebar -->
        <!-- <aside class="col-12 col-sm-4 col-md-3 col-lg-2 px-0"> -->
        <!-- <SaidManuBar /> -->
        <!-- </aside> -->

        <!-- Main Content -->
        <!--  <main class="col-12 col-sm-8 col-md-9 col-lg-10 px-2 bg-white bg-gradient mt-2"> -->
        <div class="main-content-wrapper main-content-table Period_History">
            <!-- Header -->
            <div class="period_history_table ">
                <header>
                    <h5 class="p-1 setresultgame-title">One Minute Set Result</h5>
                </header>

                <!-- Result Box -->
                <div class="setresultgame-result-box p-1 text-white add-bg-color-sub-header mb-1">
                    <div class="row g-3">
                        <!-- Countdown -->
                        <div class="col-12 col-sm-6 col-lg-3">
                            <div class="d-flex flex-column">
                                <label>Count Down :</label>
                                <div class="bot_ol">
                                    <button v-if="countcontinue" :class="continueClass"
                                        class="px-3 py-2 rounded-1 border-0" style="font-size: 14px;"
                                        @click="(countcontinue = false), (continueClass = '')">
                                        Continue
                                    </button>
                                    <div class="countdown" v-if="!countcontinue">
                                        <div class="van-count-down">
                                            <span class="span set-bg p-0" style="background-color:#318dbc; color: #fff">
                                                {{ countDownMinute > 9 ? countDownMinute.toString().charAt(0) : 0 }}
                                            </span>
                                            <span class="span set-bg p-0" style="background-color:#318dbc; color: #fff">
                                                {{ countDownMinute > 9 ? countDownMinute.toString().charAt(1) :
                                                    countDownMinute.toString().charAt(0) }}
                                            </span>
                                            <span class="text-white p-0">:</span>
                                            <span class="span set-bg" style="background-color:#318dbc; color: #fff">
                                                {{ countDownSecond.toString().charAt(0) ?
                                                countDownSecond.toString().charAt(0) : 0 }}
                                            </span>
                                            <span class="span set-bg p-0" style="background-color:#318dbc; color: #fff">
                                                {{ countDownSecond.toString().charAt(1) ?
                                                countDownSecond.toString().charAt(1) : 0 }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Period ID -->
                        <div class="col-12 col-sm-6 col-lg-3">
                            <div class="d-flex flex-column">
                                <label>Active Period Id :</label>
                                <div>{{ gameid }}</div>
                            </div>
                        </div>

                        <!-- Radio Groups -->
                        <div class="col-lg-6 d-none">
                            <div class="row">
                                <div class="col-auto" v-for="option in ['parity', 'sapre', 'bcone', 'emerd']"
                                    :key="option">
                                    <div class="text-capitalize">{{ option }}</div>
                                    <div>
                                        <input type="radio" :id="option" :value="option" name="check"
                                            @click="getTabsValue(option)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Table Section -->
                <div class="table-responsive">
                    <table class="table setresultgame-table mb-0">
                        <thead>
                            <tr>
                                <th class="text-center">Result</th>
                                <th class="text-center">Number</th>
                                <th class="text-center">No. of User</th>
                                <th class="text-center">Total Win Amount</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in data" :key="item._id">
                                <td class="text-center">
                                    <div v-html="item.color"></div>
                                </td>
                                <td class="text-center">{{ item.number }}</td>
                                <td class="text-center">{{ item.uniqueUserIds?.length || 0 }}</td>
                                <td class="text-center">{{ item.total?.toFixed(2) }}</td>
                                <td class="text-center">
                                    <input type="radio" :value="item.number" v-model="getNumbers"
                                        @click="getResultNumbers(item.number), updateResultStatus(item.number)" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <!-- </div> -->
        <!-- </div> -->
    </div>
</template>

<script>
import axios from "axios";
import Navbar from "../Navbar.vue";
import SaidManuBar from "../SideMenuBar.vue";
import io from "socket.io-client";
export default {
    name: "SetResultGame",
    components: {
        Navbar,
        SaidManuBar,
    },
    data() {
        // let socket = io("http://localhost:3004");
        return {
            countinue: false,
            currentPage: 1,
            totalPages: 0,
            pageSize: 10,
            data: [
                {
                    color:
                        '<span style="color:#f00;">Red</span> + <span style="color:#C71585;">Violet</span>',
                    value: "red+violet",
                    number: 0,
                    uniqueUserIds: [],
                    total: 0,
                },
                {
                    color:
                        '<span style="color:#090;">Green</span>',
                    value: "green",
                    number: 1,
                    uniqueUserIds: [],
                    total: 0,
                },
                {
                    color: '<span style="color:#f00;">Red</span>',
                    value: "red",
                    number: 2,
                    uniqueUserIds: [],
                    total: 0,
                },
                {
                    color: '<span style="color:#090;">Green</span>',
                    value: "green",
                    number: 3,
                    uniqueUserIds: [],
                    total: 0,
                },
                {
                    color: '<span style="color:#f00;">Red</span>',
                    value: "red",
                    number: 4,
                    uniqueUserIds: [],
                    total: 0,
                },
                {
                    color: '<span style="color:#090;">Green</span> + <span style="color:#C71585;">Violet</span>',
                    value: "green+Violet",
                    number: 5,
                    uniqueUserIds: [],
                    total: 0,
                },
                {
                    color: '<span style="color:#f00;">Red</span>',
                    value: "red",
                    number: 6,
                    uniqueUserIds: [],
                    total: 0,
                },
                {
                    color: '<span style="color:#090;">Green</span>',
                    value: "green",
                    number: 7,
                    uniqueUserIds: [],
                    total: 0,
                },
                {
                    color: '<span style="color:#f00;">Red</span>',
                    value: "red",
                    number: 8,
                    uniqueUserIds: [],
                    total: 0,
                },
                {
                    color: '<span style="color:#090;">Green</span>',
                    value: "green",
                    number: 9,
                    uniqueUserIds: [],
                    total: 0,
                },
            ],
            gameid: "",
            tabsValue: null,
            isyesnoopen: true,
            getNumbers: "",
            Isactive: false,
            continueClass: "",
            countcontinue: false,
            countDownMinute: 0,
            countDownSecond: 0,
            socket: null,
            reciveData: null,
            reciveDataValues: null,
            userID: [],
            loader: false,
        };
    },
    mounted() {
        this.socket = io(process.env.VUE_APP_SOCAT_URL, {transports: ['websocket']});
        // this.socket.connect();
        this.gameID()
            .then(() => {
                if (this.gameid) {
                    this.setResult();
                }
            })
            .catch((error) => {
                console.error("Error fetching gameID:", error);
            });
        this.intervalSet();
        this.showTimer();
        const user = localStorage.getItem("user-info");
        if (!user) {
            this.$router.push({ name: "AdminLogin" });
        }
    },
    methods: {
        async gameID() {
            try {
                const response = await axios.get(`admin/period-id`, {});
                if (response.data.success === true) {
                    this.gameid = await response?.data?.data?.gameid;
                    // this.setResult();
                } else {
                    console.log("gameid",response.data);
                }
            } catch (error) {
                console.log(error);
            }
        },

        async setResult() {
            try {
                // this.loader = true;
                let response = "";
                if (this.gameid && this.gameid != "") {
                    response = await axios.post(`admin/set-result-game`, {
                        actiontype: "getdata",
                        tab: "parity",
                        periodid: this.gameid,
                    });
                    this.data = response.data.data;
                    for (const iterator of this.data) {
                        if (iterator.status) {
                            this.getNumbers = iterator.number;
                            this.Isactive = true;
                        }
                    }
                    this.socket.on("oneMniBate", (data1) => {
                        if (data1.value.toLowerCase() == "violet") {
                            // violet
                            this.data[0].total += this.truncate(
                                (data1.amount / 100) * 95 * 4.5,
                                2
                            );
                            this.data[5].total += this.truncate(
                                (data1.amount / 100) * 95 * 4.5,
                                2
                            );

                            if (!this.data[0].uniqueUserIds.includes(data1.userid)) {
                                this.data[0].uniqueUserIds.push(data1.userid);
                            }
                            if (!this.data[5].uniqueUserIds.includes(data1.userid)) {
                                this.data[5].uniqueUserIds.push(data1.userid);
                            }

                            // red
                        } else if (data1.value.toLowerCase() == "red") {
                            this.data[2].total += this.truncate(
                                (data1.amount / 100) * 95 * 2,
                                2
                            );
                            this.data[4].total += this.truncate(
                                (data1.amount / 100) * 95 * 2,
                                2
                            );
                            this.data[6].total += this.truncate(
                                (data1.amount / 100) * 95 * 2,
                                2
                            );
                            this.data[8].total += this.truncate(
                                (data1.amount / 100) * 95 * 2,
                                2
                            );
                            this.data[0].total += this.truncate(
                                (data1.amount / 100) * 95 * 1.5,
                                2
                            );

                            if (!this.data[0].uniqueUserIds.includes(data1.userid)) {
                                this.data[0].uniqueUserIds.push(data1.userid);
                            }
                            if (!this.data[2].uniqueUserIds.includes(data1.userid)) {
                                this.data[2].uniqueUserIds.push(data1.userid);
                            }
                            if (!this.data[4].uniqueUserIds.includes(data1.userid)) {
                                this.data[4].uniqueUserIds.push(data1.userid);
                            }
                            if (!this.data[6].uniqueUserIds.includes(data1.userid)) {
                                this.data[6].uniqueUserIds.push(data1.userid);
                            }
                            if (!this.data[8].uniqueUserIds.includes(data1.userid)) {
                                this.data[8].uniqueUserIds.push(data1.userid);
                            }
                        } else if (data1.value.toLowerCase() == "green") {
                            this.data[1].total += this.truncate(
                                (data1.amount / 100) * 95 * 2,
                                2
                            );
                            this.data[3].total += this.truncate(
                                (data1.amount / 100) * 95 * 2,
                                2
                            );
                            this.data[7].total += this.truncate(
                                (data1.amount / 100) * 95 * 2,
                                2
                            );
                            this.data[9].total += this.truncate(
                                (data1.amount / 100) * 95 * 2,
                                2
                            );
                            this.data[5].total += this.truncate(
                                (data1.amount / 100) * 95 * 1.5,
                                2
                            );
                            if (!this.data[1].uniqueUserIds.includes(data1.userid)) {
                                this.data[1].uniqueUserIds.push(data1.userid);
                            }
                            if (!this.data[3].uniqueUserIds.includes(data1.userid)) {
                                this.data[3].uniqueUserIds.push(data1.userid);
                            }
                            if (!this.data[7].uniqueUserIds.includes(data1.userid)) {
                                this.data[7].uniqueUserIds.push(data1.userid);
                            }
                            if (!this.data[9].uniqueUserIds.includes(data1.userid)) {
                                this.data[9].uniqueUserIds.push(data1.userid);
                            }
                            if (!this.data[5].uniqueUserIds.includes(data1.userid)) {
                                this.data[5].uniqueUserIds.push(data1.userid);
                            }
                        } else if (
                            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
                                data1.value
                            )
                        ) {
                            this.data[data1.value].total += this.truncate(
                                (data1.amount / 100) * 95 * 9,
                                2
                            );
                            if (
                                !this.data[data1.value].uniqueUserIds.includes(data1.userid)
                            ) {
                                this.data[data1.value].uniqueUserIds.push(data1.userid);
                            }
                        }
                        // }
                    });
                    // this.loader = false;
                }
            } catch (error) {
                console.log("error", error);
            }
        },
        truncate(value, decimals) {
            // Helper function to truncate decimal places
            const multiplier = Math.pow(10, decimals);
            return Math.trunc(value * multiplier) / multiplier;
        },
        async updateResultStatus(number) {
            try {
                // this.loader = true;
                const response = await axios.post(`admin/select-result-number`, {
                    number: number,
                });
                this.data = response.data;
                this.setResult();
                // this.loader = false;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        showTimer() {
            var countDownDate = Date.parse(new Date()) / 1e3;
            var distance = 60 - (countDownDate % 60);
            var i = distance / 60,
                n = distance % 60;
            this.countDownMinute = Math.floor(i);
            this.countDownSecond = ("0" + Math.floor(n)).slice(-2);

            if (distance === 60) {
                this.countcontinue = true;
                this.continueClass = "Disabled";
            }

            if (distance === 56) {
                this.continueClass = "continue";
            }

            if (distance === 54) {
                this.countcontinue = false;
                this.continueClass = "";
                window.location.reload();
            }
        },

        intervalSet() {
            setInterval(() => {
                this.showTimer();
            }, 1e3);
        },

        getTabsValue(tabName) {
            this.tabsValue = tabName;
        },
        getResultNumbers(number) {
            if (this.Isactive) {
                if (this.getNumbers === number) {
                    this.Isactive = false;
                    this.getNumbers = null;
                } else {
                    this.Isactive = true;
                    this.getNumbers = number;
                }
            } else {
                this.Isactive = true;
                this.getNumbers = number;
            }
            console.log(this.getNumbers);
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        gotoPage(page) {
            this.currentPage = page;
        },
    },
};
</script>

<style>
@import "../../../assets/css/admin-style/admin.css";
</style>