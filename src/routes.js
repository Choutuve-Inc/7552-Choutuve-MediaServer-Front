import Dashboard from "views/Dashboard.jsx";
import Videos from "views/Videos.jsx";
import LogIn from "components/LogIn/LogIn";
import Users from "views/Users.jsx";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/videos",
    name: "Videos",
    icon: "nc-icon nc-camera-compact",
    component: Videos,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-chart-pie-36",
    component: LogIn,
    layout: "/admin"
  },
  {
    path: '/users',
    name: 'Users',
    icon: "nc-icon nc-chart-pie-36",
    component: Users,
    layout: "/admin"
  }
];
export default routes;
