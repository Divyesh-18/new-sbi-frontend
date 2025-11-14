import Index from "../pages/MainIndex.vue";
// const Index = () =>
//     import ('../pages/Index.vue');

import Login from "../pages/UserLogin.vue";
import Register from "../pages/UserRegister.vue";
import AddAddress from "../pages/AddAddress.vue";
import AddBankDetail from "../pages/AddBankDetail.vue";
import editBankDetail from "@/pages/editBankDetail.vue";
import AddEnvelope from "../pages/AddEnvelope.vue";
import AddRedEnvelope from "../pages/AddRedEnvelope.vue";
import Address from "../pages/UserAddress.vue";
import BankCard from "../pages/BankCard.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import Mine from "../pages/MineDashbord.vue";
import Order from "../pages/UserOrder.vue";
import PrivacyPolicy from "../pages/PrivacyPolicy.vue";
import Promotion from "../pages/UserPromotion.vue";
import Search from "../pages/UserSearch.vue";
import ProductDetails from "../pages/ProductDetails.vue";
import Withdrawal from "../pages/WalletWithdrawal.vue";
import WithdrawalRecord from "../pages/WithdrawalRecord.vue";
import Transactions from "../pages/UserTransactions.vue";
import Wallet from "../pages/UserWallet.vue";
import RiskAgreement from "../pages/RiskAgreement.vue";
import Complaints from "../pages/UserComplaints.vue";
import AddComplaints from "../pages/AddComplaints.vue";
import BonusRecord from "../pages/BonusRecord.vue";
import ApplyRecord from "../pages/ApplyRecord.vue";
import Recharge from "../pages/UserRecharge.vue";
import Reward from "../pages/UserReward.vue";
import Interest from "../pages/UserInterest.vue";
import Win from "../pages/GameWin/GameWin.vue";
import Rechargerecord from "../pages/RechargeRecord.vue";
import RedEnvelope from "../pages/RedEnvelope.vue";
import FinalPayment from "../pages/FinalPayment.vue";
import Ekpay from "../pages/PaymentEkpay.vue";
import Sepay from "../pages/PaymentSepay.vue";
import Parity from "../pages/GameParity.vue";
import Emerd from "../pages/GameEmerd.vue";
import Myteam from "../pages/MyTeam.vue";
import WinTransfer from "../pages/WinTransfer.vue";
import UserChat from "../pages/UserChat.vue";
import ChatAppDefault from "../pages/ChatAppPage.vue";
import oneMinuteOrder from "../pages/GameWin/oneMinGame/oneMinuteOrder.vue";
import oneMinTrend from "@/pages/GameWin/oneMinGame/oneMinTrend.vue";
import NewPayment from "../pages/NewPayment.vue";
import UpiPayment from "../pages/upiPayment.vue";
import USDTPayment from "../pages/USDTpayment.vue";
import fastWinOrder from "../pages/GameWin/fastWinGame/oneMinuteOrder.vue";
import newPaymentGetWay from "../pages/newPaymentGetWay.vue";

export const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/riskagreement",
    name: "riskagreement",
    component: RiskAgreement,
  },
  {
    path: "/wintransfer",
    name: "wintransfer",
    component: WinTransfer,
  },
  {
    path: "/myteam",
    name: "Myteam",
    component: Myteam,
  },
  {
    path: "/emerd",
    name: "emerd",
    component: Emerd,
  },
  {
    path: "/Parity",
    name: "Parity",
    component: Parity,
  },
  {
    path: "/final-payment",
    name: "final-payment",
    component: FinalPayment,
  },
  {
    path: "/ekpay",
    name: "ekpay",
    component: Ekpay,
  },
  {
    path: "/sepay",
    name: "sepay",
    component: Sepay,
  },
  {
    path: "/redenvelopes",
    name: "redenvelopes",
    component: RedEnvelope,
  },
  {
    path: "/rechargerecord",
    name: "rechargerecord",
    component: Rechargerecord,
  },
  {
    path: "/interest",
    name: "interest",
    component: Interest,
  },
  {
    path: "/reward",
    name: "reward",
    component: Reward,
  },
  {
    path: "/recharge",
    name: "recharge",
    component: Recharge,
  },
  {
    path: "/complaints",
    name: "complaints",
    component: Complaints,
  },
  {
    path: "/addcomplaints",
    name: "addcomplaints",
    component: AddComplaints,
  },
  {
    path: "/bonusrecord",
    name: "bonusrecord",
    component: BonusRecord,
  },
  {
    path: "/applyrecord",
    name: "applyrecord",
    component: ApplyRecord,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/addaddress",
    name: "addAddress",
    component: AddAddress,
  },
  {
    path: "/addbankcard",
    name: "addBankDetail",
    component: AddBankDetail,
  },
  {
    path: "/editBankDetail",
    name: "editBankDetail",
    component: editBankDetail,
  },
  {
    path: "/redenvelope",
    name: "addEnvelope",
    component: AddEnvelope,
  },
  {
    path: "/addredenvelope",
    name: "addredenvelope",
    component: AddRedEnvelope,
  },
  {
    path: "/address",
    name: "UserAddress",
    component: Address,
  },
  {
    path: "/bankcard",
    name: "bankCard",
    component: BankCard,
  },
  {
    path: "/forgotpass",
    name: "forgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/mine",
    name: "mine",
    component: Mine,
  },
  {
    path: "/order",
    name: "order",
    component: Order,
  },
  {
    path: "/oneminuteorder",
    name: "oneminuteorder",
    component: oneMinuteOrder,
  },
  {
    path: "/privacypolicy",
    name: "privacyPolicy",
    component: PrivacyPolicy,
  },
  {
    path: "/promotion",
    name: "promotion",
    component: Promotion,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/product",
    name: "productDetails",
    component: ProductDetails,
  },
  {
    path: "/withdrawal",
    name: "withdrawal",
    component: Withdrawal,
  },
  {
    path: "/withdrawalrecord",
    name: "withdrawal-record",
    component: WithdrawalRecord,
  },
  {
    path: "/transactions",
    name: "transactions",
    component: Transactions,
  },
  {
    path: "/wallet",
    name: "wallet",
    component: Wallet,
  },
  {
    path: "/win",
    name: "win",
    component: Win,
  },
  {
    path: "/chat-app/:userid",
    name: "UserChat",
    component: UserChat,
  },
  // {
  //   path: "/chatapp-deskbord",
  //   name: "UserChat",
  //   component: UserChat,
  // },
  {
    path: "/chatapp-deskbord",
    name: "ChatAppDefault",
    component: ChatAppDefault,
  },
  {
    path: "/one/min/trend",
    name: "oneMinTrend",
    component: oneMinTrend,
  },
  {
    path: "/payment",
    name: "NewPayment",
    component: NewPayment,
  },
  {
    path: "/upi-payment",
    name: "UPIPayment",
    component: UpiPayment
  },
  {
    path: "/usdt-payment",
    name: "USDTPayment",
    component: USDTPayment
  },
  {
    path: "/fastwinorder",
    name: "fastWinOrder",
    component: fastWinOrder,
  },
  {
    path: "/payment-get-way",
    name: "newPaymentGetWay",
    component: newPaymentGetWay,
  },
];
