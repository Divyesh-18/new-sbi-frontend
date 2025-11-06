<template>
    <div class="content">
        <div class="content_con">
            <div class="content_title">
                <img :src="require('../../../assets/images/win.png')" alt="" />
                <p>Parity Record</p>
            </div>
            <div class="parity">
                <table>
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>Price</th>
                            <th>Number</th>
                            <th>Result</th>
                        </tr>
                        <tr style="border: 0px; width: 100%; display: none">
                            <th colspan="4" style="height: 0px; line-height: 0">
                                <div class="table_loading">
                                    <div class="v-progress-linear__bar">
                                        <div
                                            class="v-progress-linear__bar__indeterminate v-progress-linear__bar__indeterminate--active">
                                            <div class="v-progress-linear__bar__indeterminate long1 primary"></div>
                                            <div class="v-progress-linear__bar__indeterminate short1 primary"></div>
                                        </div>
                                    </div>
                                </div>
                            </th>
                        </tr>

                        <tr style="border: 0px; width: 100%; display: none" id="blrow">
                            <th colspan="4" style="height: 0px; line-height: 0">
                                <div class="table_loading">
                                    <div class="v-progress-linear__bar">
                                        <div
                                            class="v-progress-linear__bar__indeterminate v-progress-linear__bar__indeterminate--active">
                                            <div class="v-progress-linear__bar__indeterminate long1 primary"></div>
                                            <div class="v-progress-linear__bar__indeterminate short1 primary"></div>
                                        </div>
                                    </div>
                                </div>
                            </th>
                        </tr>

                        <tr></tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in fastWinResultCategoryList" :key="item.periodid">
                            <td>{{ item.periodid }}</td>
                            <td>{{ item.randomprice }}</td>
                            <td :class="item.randomcolor == 'red++violet' ||
                                item.randomcolor == 'green++violet' ||
                                item.randomcolor == 'green+violet' ||
                                item.randomcolor == 'red+violet'
                                ? 'violet'
                                : item.randomcolor
                                ">
                                <div class="number-box" :class="item.randomcolor == 'red++violet' ||
                                    item.randomcolor == 'green++violet' ||
                                    item.randomcolor == 'green+violet' ||
                                    item.randomcolor == 'red+violet'
                                    ? 'violet'
                                    : item.randomcolor[0].toLowerCase() +
                                    item.randomcolor.slice(1)
                                    ">
                                    {{ item.randomresult }}
                                </div>
                            </td>
                            <td>
                                <span v-show="item.randomcolor === 'green'" class="red"
                                    style="background: green"></span>
                                <span v-show="item.randomcolor === 'red'" class="red" style="background: red"></span>
                                <span v-show="item.randomcolor === 'violet'" class="red"
                                    style="background: rgb(156, 39, 176)"></span>
                                <span v-show="item.randomcolor === 'red++violet'" class="red"
                                    style="background: red"></span>
                                <span v-show="item.randomcolor === 'red+violet'" class="red"
                                    style="background: red"></span>
                                <span v-show="item.randomcolor === 'red++violet'" class="red"
                                    style="background: rgb(156, 39, 176)"></span>
                                <span v-show="item.randomcolor === 'red+violet'" class="red"
                                    style="background: rgb(156, 39, 176)"></span>
                                <span v-show="item.randomcolor === 'green++violet'" class="red"
                                    style="background: green"></span>
                                <span v-show="item.randomcolor === 'green+violet'" class="red"
                                    style="background: green"></span>
                                <span v-show="item.randomcolor === 'green++violet'" class="red"
                                    style="background: rgb(156, 39, 176)"></span>
                                <span v-show="item.randomcolor === 'green+violet'" class="red"
                                    style="background: rgb(156, 39, 176)"></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <ul class="page_box">
                    <li class="page page-color">
                        <span>{{
    fastWinPage * fastWinPageRow -
    fastWinPageRow +
                            1
                        }}-{{ fastWinPage * fastWinPageRow }}
                        </span>
                        of {{ fastWinTotalResult }}
                    </li>
                    <li class="page_btn page-color">
                        <i class="van-icon van-icon-arrow-left cursor-pointer"
                            @click="fastWinPageChange(fastWinPage - 1)"></i>
                        <i class="van-icon van-icon-arrow cursor-pointer" @click="fastWinPageChange(fastWinPage + 1)"></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        fastWinResultCategoryList: {
            type: Object,
            required: true,
        },
        fastWinPage: {
            type: Number,
            required: true,
        },
        fastWinPageRow: {
            type: Number,
            required: true,
        },
        fastWinTotalResult: {
            type: Number,
            required: true, 
        },
        fastWinPageChange: {
            type: Function,
            required: true,
        },
    },
};
</script>
