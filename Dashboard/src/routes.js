
// import Dashboard from "views/Dashboard.jsx";
// import Notifications from "views/Notifications.jsx";
// import Icons from "views/Icons.jsx";
// import Typography from "views/Typography.jsx";
// import TableList from "views/Tables.jsx";
// import Maps from "views/Map.jsx";
// import UserPage from "views/User.jsx";
import home from "views/Home.js"
import SigninPage from "views/login"
 import SignupPage from "views/signup"
 import AdminPage from "views/Admin"
 import User_test from "views/User_test"
 import AdminTestPaperPage from "views/testpaper"
//import UpgradeToPro from "views/Upgrade.jsx";

var routes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-bank",
  //   component: Dashboard,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },
 
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin"
  // },
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-caps-small",
    component: home,
    layout: "/admin"
  },
  {
    path: "/SigninPage",
    name: "Sign In",
    icon: "nc-icon nc-caps-small",
    component: SigninPage,
    layout: "/admin"
  }
  ,
  {
    path: "/SignupPage",
    name: "Sign Up",
    icon: "nc-icon nc-caps-small",
    component: SignupPage,
    layout: "/admin"
  },
  {
    path: "/AdminPage",
    name: "Admin",
    icon: "nc-icon nc-caps-small",
    component: AdminPage,
    layout: "/admin"
  },
  {
    path: "/User_test",
    name: "User Page",
    icon: "nc-icon nc-caps-small",
    component: User_test,
    layout: "/admin"
  },
  {
    path: "/AdminTestPaperPage",
    name: "Test Paper Page",
    icon: "nc-icon nc-caps-small",
    component: AdminTestPaperPage,
    layout: "/admin"
  }
  
];
export default routes;
