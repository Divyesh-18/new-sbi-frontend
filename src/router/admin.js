// import Index from "../pages/MainIndex.vue";
// const Index = () =>
//     import ('../pages/Index.vue');

import AdminLogin from "../pages/admin/AdminLogin.vue";
import AdminDesktop from "../pages/admin/AdminDesktop.vue";
import AllUsers from "../pages/admin/AllUsers.vue";
import PeriodHistory from "../pages/admin/PeriodHistory.vue";
import SetResultGame from "../pages/admin/SetResultGame.vue";
import UserWalletHistory from "../pages/admin/UserWalletHistory.vue";
import AdminPendingRequest from "../pages/admin/AdminPendingRequest.vue";
import AdminRejectRequest from "../pages/admin/AdminRejectRequest.vue";
import AdminAcceptRecharge from "../pages/admin/AdminAcceptRecharge.vue";
import AdminRequestWithdrawal from "../pages/admin/AdminRequestWithdrawal.vue";
import AdminAcceptWithdrawal from "../pages/admin/AdminAcceptWithdrawal.vue";
import AdminRejectWithdrawal from "../pages/admin/AdminRejectWithdrawal.vue";
import AdminSetting from "../pages/admin/AdminSetting.vue";
import AdminNotification from "../pages/admin/AdminNotification.vue";
import AdminSetLavelUser from "../pages/admin/AdminSetLavelUser.vue";
import AdminLevelUser from "../pages/admin/AdminLevelUser.vue";
import AdminManageBanner from "../pages/admin/AdminManageBanner.vue";
import AdminAddBanner from "../pages/admin/AdminAddBanner.vue";
import AdminManageProduct from "../pages/admin/AdminManageProduct.vue";
import AdminAddProduct from "../pages/admin/AdminAddProduct.vue";
import period_bateing_history from "../pages/admin/period_bateing_history.vue";
import AdminQueries from "../pages/admin/AdminQueries.vue";
import AdminReferidAllUsers from "../pages/admin/AdminReferidAllUsers.vue";
import AdminUserGameHistory from "../pages/admin/AdminUserGameHistory.vue";
import AdminRedEnvelope from "../pages/admin/AdminRedEnvelope.vue";
import AdminAddRedEnvelope from "../pages/admin/AdminAddRedEnvelope.vue";
import adminEditRedEnvelope from "../pages/admin/adminEditRedEnvelope.vue";
import adminColorCode from "@/pages/admin/AdminColorCode.vue";
import oneMinutePeriod from "../pages/admin/oneMinuteGame/periodHistorty.vue";
import userWisePeriodHistory from "@/pages/admin/oneMinuteGame/userWisePeriodHistory.vue";
import oneMinResultSet from "../pages/admin/oneMinuteGame/SetResultGame.vue";
import fastWinResultSet from "../pages/admin/fastWinGame/SetResultGame.vue";
import fastWinPeriodHistory from "../pages/admin/fastWinGame/periodHistorty.vue";
import userWiseFastWinPeriodHistory from "@/pages/admin/fastWinGame/userWisePeriodHistory.vue";
export const routes = [
  // {
  //   path: "/",
  //   name: "index",
  //   component: Index,
  // },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot",
    name: "AdminLogin",
    component: AdminLogin,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/desktop",
    name: "AdminDesktop",
    component: AdminDesktop,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/alluser",
    name: "AllUsers",
    component: AllUsers,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/periodhistory",
    name: "PeriodHistory",
    component: PeriodHistory,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/setresultgame",
    name: "SetResultGame",
    component: SetResultGame,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/adminrequestpenddingwithdrawal",
    name: "AdminRequestWithdrawal",
    component: AdminRequestWithdrawal,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/adminacceptwithdrawal",
    name: "AdminAcceptWithdrawal",
    component: AdminAcceptWithdrawal,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/adminrejectwithdrawal",
    name: "AdminRejectWithdrawal",
    component: AdminRejectWithdrawal,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/userwallethistory",
    name: "UserWalletHistory",
    component: UserWalletHistory,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/pendingrequest",
    name: "PendingRequest",
    component: AdminPendingRequest,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/rejectrequest",
    name: "RejectRequest",
    component: AdminRejectRequest,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/acceptrequest",
    name: "AcceptRequest",
    component: AdminAcceptRecharge,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/setting",
    name: "setting",
    component: AdminSetting,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/adminnotification",
    name: "AdminNotification",
    component: AdminNotification,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/adminsetlaveluser",
    name: "AdminSetLavelUser",
    component: AdminSetLavelUser,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/adminleveluser",
    name: "AdminLevelUser",
    component: AdminLevelUser,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/adminmanagebanner",
    name: "AdminManageBanner",
    component: AdminManageBanner,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/adminaddbanner",
    name: "AdminAddBanner",
    component: AdminAddBanner,
  },

  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/adminmanageproduct",
    name: "AdminManageProduct",
    component: AdminManageProduct,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/adminaddproduct",
    name: "AdminAddProduct",
    component: AdminAddProduct,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/period_bateing_history/:periodid",
    name: "period_bateing_history",
    component: period_bateing_history,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/adminqueries",
    name: "AdminQueries",
    component: AdminQueries,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/adminreferidallusers/:owncode",
    name: "AdminReferidAllUsers",
    component: AdminReferidAllUsers,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/adminusergamehistory/:userId",
    name: "AdminUserGameHistory",
    component: AdminUserGameHistory,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/red-envelope",
    name: "AdminRedEnvelope",
    component: AdminRedEnvelope,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/add-red-envelope",
    name: "AdminAddRedEnvelope",
    component: AdminAddRedEnvelope,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/edit-red-envelope/:id",
    name: "adminEditRedEnvelope",
    component: adminEditRedEnvelope,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/vbfddrugirghrtbvbfkjb/admin/secret",
    name: "adminColorCode",
    component: adminColorCode,
  },
  {
    path:"/dgklhtobgoijbrtoidfbgfgerjot/one-minute-period-history",
    name: "oneMinutePeriod",
    component: oneMinutePeriod,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/user-wise-period-history/:periodid",
    name: "userWisePeriodHistory",
    component: userWisePeriodHistory,
  },
  {
    path:"/dgklhtobgoijbrtoidfbgfgerjot/oneMinResultSet",
    name:"oneMinResultSet",
    component: oneMinResultSet,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/fast/win/result/set",
    name: "fastWinResultSet",
    component: fastWinResultSet,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/fast/win/period/history/",
    name: "fastWinPeriodHistory",
    component: fastWinPeriodHistory,
  },
  {
    path: "/dgklhtobgoijbrtoidfbgfgerjot/fast/win/user/period/history/:periodid",
    name: "userWiseFastWinPeriodHistory",
    component: userWiseFastWinPeriodHistory,
  }
];
