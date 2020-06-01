import Dashboard from "views/Dashboard.jsx";
import LogIn from "components/LogIn/LogIn"

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "login",
    icon: "nc-icon nc-chart-pie-36",
    component: LogIn,
    layout: "/admin"
  },
];
export default routes;
