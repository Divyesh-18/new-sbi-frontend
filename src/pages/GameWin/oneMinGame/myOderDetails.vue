<template>
    <div class="content_con">
        <div class="content_title">
            <img :src="require('../../../assets/images/order.png')" alt="" />
            <p>My Record</p>
        </div>
        <div class="table-container custom-remove-shadow">
            <table class="table table-borderless" id="myrecordparityt">
                <thead style="display: none">
                    <tr>
                        <th class="kkk"></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <div id="paritywait"></div> -->
                    <tr v-on:click="toggleWaitCollapse(item._id)" v-for="item in oneMinUserWaitList" class="clickable"
                        :key="item.periodid">
                        <td class="myRecordTd" style="border: none; color: #fff">
                            <div class="myRecordTitle cursor-pointer">
                                <p>
                                    <span>{{ item.periodid }}
                                        <span class="text-warning">&nbsp;&nbsp;&nbsp; wait </span>
                                    </span>
                                </p>
                                <div :class="isResultCollapseOpen === item.id ? 'testing' : ''">
                                    <i class="van-icon van-icon-arrow van-cell__right-icon show-up-down-arrow"></i>
                                </div>
                            </div>
                            <div id="t" class="myRecordDetail detail mt-1 border-top-0"
                                v-show="iswaitCollapseOpen === item._id ? true : false">
                                <span style="color: #e5599c; font-size: 14px">Period Detail</span>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Period</div>
                                    <div class="point2">{{ item.periodid }}</div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Contract Money</div>
                                    <div class="point2">{{ item.amount.toFixed(2) }}</div>
                                </div>

                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Delivery</div>
                                    <div class="point2 orange" style="color: #f39839">
                                        {{ ((item.amount * 95) / 100).toFixed(2) }}
                                    </div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Fee</div>
                                    <div class="point2">
                                        {{ ((item.amount * 5) / 100).toFixed(2) }}
                                    </div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Open Price</div>
                                    <div class="point2">wait</div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Result</div>
                                    <div class="point2" style="color: #2197f3">Wait</div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Select</div>
                                    <div class="point2" style="color: #4caf50 !important" v-if="item.value === 'Green'">
                                        {{ item.value }}
                                    </div>
                                    <div class="point2" style="color: #ff0000 !important"
                                        v-else-if="item.value === 'Red'">
                                        {{ item.value }}
                                    </div>
                                    <div class="point2" style="color: rgb(156, 39, 176) !important"
                                        v-else-if="item.value === 'violet'">
                                        {{ item.value }}
                                    </div>
                                    <div class="point2" v-else>{{ item.value }}</div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Status</div>
                                    <div class="point2" style="color: #f39839 !important; font-size: 14px">
                                        Wait
                                    </div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Amount</div>
                                    <div class="point2" style="color: #4caf50 !important; font-size: 14px"
                                        v-if="item.status === 'success'"></div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Create Time</div>
                                    <div class="point2">{{ formatDate(item.created_at) }}</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-on:click="toggleResultCollapse(item.id)" v-for="item in oneMinUserResultList"
                        class="clickable" :key="item.periodid">
                        <td class="myRecordTd" style="border: none">
                            <div class="myRecordTitle cursor-pointer">
                                <p>
                                    <span>{{ item.periodid }} &nbsp; &nbsp;

                                        <span :class="'text-success'" v-if="item.status === 'success'">
                                            {{ item.status === "success" ? "success" : "Fail" }}
                                            &nbsp;&nbsp;&nbsp;
                                            <div class="number-record-box green">
                                                +{{ item.delivery }}
                                            </div>
                                        </span>

                                        <span :class="'text-danger'" v-else>
                                            {{ item.status === "success" ? "success" : "Fail" }}
                                            &nbsp;&nbsp;&nbsp;
                                            <div class="number-record-box red">
                                                -{{ item.delivery }}
                                            </div>
                                        </span>
                                    </span>
                                </p>
                                <div :class="isResultCollapseOpen === item.id ? 'testing' : ''">
                                    <i
                                        class="van-icon van-icon-arrow van-cell__right-icon show-up-down-arrow text-dark"></i>
                                </div>
                            </div>
                            <div id="t" class="myRecordDetail detail mt-1"
                                v-show="isResultCollapseOpen === item.id ? true : false">
                                <span style="color: #e5599c; font-size: 14px">Period Detail</span>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Period</div>
                                    <div class="point2">{{ item.periodid }}</div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Contract Money</div>
                                    <div class="point2">{{ item.contract_money }}</div>
                                </div>

                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Delivery</div>
                                    <div class="point2 orange" style="color: #f39839">
                                        {{ item.delivery }}
                                    </div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Fee</div>
                                    <div class="point2">{{ item.fee }}</div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Open Price</div>
                                    <div class="point2">{{ item.open_price }}</div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Result</div>
                                    <div class="point2" style="color: #2197f3">
                                        {{ item.result_number }}
                                        <span style="color: rgb(76, 175, 80)" v-if="item.result_color == 'green'">{{
                                            item.result_color
                                            }}</span>
                                        <span style="color: #ff0000" v-else-if="item.result_color == 'red'">{{
                                            item.result_color }}</span>
                                        <span style="color: rgb(156, 39, 176)"
                                            v-else-if="item.result_color == 'violet'">{{
                                            item.result_color }}</span>
                                    </div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Select</div>

                                    <div class="point2" style="color: #4caf50 !important"
                                        v-if="item.select === 'Green'">
                                        {{ item.select }}
                                    </div>
                                    <div class="point2" style="color: #ff0000 !important"
                                        v-else-if="item.select === 'Red'">
                                        {{ item.select }}
                                    </div>
                                    <div class="point2" style="color: rgb(156, 39, 176) !important"
                                        v-else-if="item.select === 'violet'">
                                        {{ item.select }}
                                    </div>
                                    <div class="point2" style="color: #2197f3" v-else>
                                        {{ item.select }}
                                    </div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Status</div>
                                    <div class="point2" style="color: #4caf50 !important; font-size: 14px"
                                        v-if="item.status === 'success'">
                                        {{ item.status }}
                                    </div>
                                    <div class="point2" style="color: #ff0000 !important; font-size: 14px" v-else>
                                        {{ item.status }}
                                    </div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Amount</div>
                                    <div class="point2" style="color: #4caf50 !important; font-size: 14px"
                                        v-if="item.status === 'success'">
                                        +{{ item.amount }}
                                    </div>
                                    <div class="point2" style="color: #ff0000 !important; font-size: 14px" v-else>
                                        -{{ item.amount }}
                                    </div>
                                </div>
                                <div class="mt-1" style="display: flex">
                                    <div class="point2">Create Time</div>
                                    <div class="point2">{{ formatDate(item.created_at) }}</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-show="oneMinUserWaitList?.length <= 0 && !oneMinUserResultList.length" class="no-data-text text-dark">
            <span>
                There is no unsettled order at present. If you want to query the settled
                order, please go to the order record to query
            </span>
        </div>

        <div class="pagination">
            <ul class="page_box">
                <li class="page text-white">
                    <span>{{
                        oneMinUserPage * oneMinUserPageRow - oneMinUserPageRow + 1
                        }}-{{ oneMinUserPage * oneMinUserPageRow }}
                    </span>
                    of {{ oneMinUserTotal }}
                </li>
                <li class="page_btn text-white">
                    <i class="van-icon van-icon-arrow-left cursor-pointer"
                        v-on:click="oneMinUserPageChange(oneMinUserPage - 1)"></i>
                    <i class="van-icon van-icon-arrow cursor-pointer"
                        v-on:click="oneMinUserPageChange(oneMinUserPage + 1)"></i>
                </li>
            </ul>
        </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: center;padding-bottom: 70px;">
        <router-link to="/oneminuteorder">
            <button class="order_btn one_btn">My Orders</button>
        </router-link>
    </div>
</template>
<script>
export default {
    props: {
        iswaitCollapseOpen: {
            type: String,
            required: true,
        },
        oneMinUserWaitList: {
            type: Array,
            required: true,
        },
        oneMinUserResultList: {
            type: Array,
            required: true,
        },
        isResultCollapseOpen: {
            type: String,
            required: true,
        }, 
        oneMinUserPage: {
            type: Number,
            required: true,
        },
        oneMinUserPageRow: {
            type: Number,
            required: true,
        },
        oneMinUserTotal: {
            type: Number,
            required: true,
        },
        oneMinUserPageChange: {
            type: Function,
            required: true,
        },
        oneMinRecordmsg: {
            type: Boolean,
            required: true,
        },
    },

    methods: {
        toggleWaitCollapse(itemId) {
            this.$emit(
                "update:iswaitCollapseOpen",
                this.iswaitCollapseOpen === itemId ? "" : itemId
            );
        },
        toggleResultCollapse(itemId) {
            this.$emit(
                "update:isResultCollapseOpen",
                this.isResultCollapseOpen === itemId ? "" : itemId
            );
        },
        formatDate(date) {
            if (!date) return 'N/A';
            const d = new Date(date);

            // Format components
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(d.getDate()).padStart(2, '0');
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            const seconds = String(d.getSeconds()).padStart(2, '0');

            // Combine components into the desired format
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
    },
};
</script>
